import {Raquette} from "./raquette.js";

const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

export class Serveur {

    constructor(raquette1, raquette2) {
        this.joueur1 = null;
        this.joueur2 = null;


        this.raquette1 = raquette1;
        this.raquette2 = raquette2;

        // Définition de paramètres de configuration pour l'application
        this.config = {
            racine: "public",
            adresse: "192.168.2.31", // cette adresse doit correspondre à l'adresse locale de votre ordinateur
            port: 3000
        };

        // Tableau des clients connectés
       // this.clients = [];

        // Canevas pour afficher la position spatiale de l'appareil
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");

        // Instantiation du module Express qui facilite la création d'un serveur https (serveur web)
        this.app = express();

        // Pour utiliser l'API DeviceOrientation ou celui du gyroscope, il faut que la connexion soit
        // sécurisée. Consultez le dossier "certificat" et, en particulier, les fichiers creer.zsh
        // (macOS) ou creer.cmd (Windows).
        let key = fs.readFileSync(path.resolve() + '/certificats/certificat.key');
        let cert = fs.readFileSync(path.resolve() + '/certificats/certificat.pem');

        this.serveur = https.createServer(
            {key: key, cert: cert},
            this.app
        );

        // Importation et instantiation du module Socket.IO qui facilite la mise en place d'une
        // communication bidirectionnelle (websocket) entre les clients et le serveur.
        this.io = require('socket.io')(this.serveur);

        // Activation de la livraison de fichiers statiques à partir du dossier racine. C'est à cet
        // endroit que serons placés les fichiers de l'interface.
        this.app.use(express.static('public'));

        this.demarrer();

    }

    demarrer() {

        // Démarrage du serveur https sur l'adresse et le port configurés
        this.serveur.listen(this.config.port, this.config.adresse, () => {

            console.log(
                `Le serveur est prêt et écoute à l'adresse ${this.config.adresse}:${this.config.port}.`
            );

            this.ajouterEcouteurs();

        });


    }

    ajouterEcouteurs() {

        // Mise en place d'écouteurs pour traiter les connexions de client et les données envoyées par
        // ceux-ci.
        this.io.on("connection", socket => {

            // On garde une référence au client dans un tableau de tous les clients
           // this.clients.push(socket);
            if (this.joueur1 == null){
                this.joueur1 = socket;
                socket.on("mouvement", this.dessiner.bind(this));
                socket.on('disconnect', () => {
                    console.log(`Déconnexion d'un client / ${this.joueur1!= null} client(s) restant(s)`);
                    // this.clients = this.clients.filter(item => item !== socket)
                    this.joueur1 = null
                });

            }

            else if ((this.joueur2 == null)){
                this.joueur2 = socket;
                socket.on("mouvement", this.dessiner2.bind(this));
                socket.on('disconnect', () => {
                    console.log(`Déconnexion d'un client / ${this.joueur2!= null} client(s) restant(s)`);
                    // this.clients = this.clients.filter(item => item !== socket)
                    this.joueur2 = null
                });
            }

            else {
                socket.emit("exit");
                socket.disconnect()
            }





            // Affichage d'un message dans la console
            console.log(`Connexion d'un client / ${this.joueur1 != null} client(s) connecté(s)`);

            // Ajout d'écouteurs sur les événements "position" (tactile) et "mouvement' (device orientation)



            // Lors d'une déconnexion du client


        });

    }


    dessiner(e) {


        if (e.beta <= -45) {


           this.raquette1.y = 0


        }

        if (e.beta >= 45){
            this.raquette1.y = 760
        }



        if (e.beta >= -45 && e.beta <= 45) {


            this.raquette1.y = (e.beta + 45)/100 * this.canvas.height;


        }

       

    }


    dessiner2(e) {


        if (e.beta <= -45) {


            this.raquette2.y = 0


        }

        if (e.beta >= 45){
            this.raquette2.y = 760
        }



        if (e.beta >= -45 && e.beta <= 45) {


            this.raquette2.y = (e.beta + 45)/100 * this.canvas.height;


        }



    }
}
