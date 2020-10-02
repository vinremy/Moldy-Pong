const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

export class Serveur {


    constructor() {

        this.app = express();

        // Si vous devez utiliser SSL car le client l'exige (comme pour l'API qui permet de détecter
// l'orientation de l'appareil), vous aurez besoin de certificats de sécurité. Dans ce cas,
// consulter le dossier "certificat" et, en particulier, les fichiers creer.zsh ou creer.cmd.

        let key = fs.readFileSync(path.resolve() + '/certificats/certificat.key');
        let cert = fs.readFileSync(path.resolve() + '/certificats/certificat.pem');

        this.serveur = https.createServer(
            {key: key, cert: cert},
            this.app
        );

        console.log('1');

        this.serveur = https.createServer(this.app);
        this.io = require('socket.io')(this.serveur);

        console.log('2');
        this.app.use(express.static('public'));

        console.log('3');
    }


    demarrer() {

        console.log('4');
        this.serveur.listen('3000', '192.168.2.31', () => {
            console.log('serveur pret');

            this.io.on("connection", socket => {

                console.log("Un nouveau client s'est connecté");
                socket.on("position", this.deplacer.bind(this));


            });


        });
        console.log('5');





    }

    deplacer(e) {

        console.log("recu");

        let cible = document.getElementById("cible");
        cible.style.left = e.x + "px";
       
    }


}