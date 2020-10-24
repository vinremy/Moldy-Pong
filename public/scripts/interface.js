export class Interface {


    constructor() {

        // Redirection vers la version sécurisée (ceci est exigée par l'API de mouvement et
        // d'orientation)
        if (location.protocol !== "https:") {
            location.href = "https:" + window.location.href.substring(window.location.protocol.length);
        }

        // Configuration
        this.config = {
            serveur: {
                protocole: "https://",
                adresse: "192.168.2.31",
                port: 3000
            }
        };

        // Instantiation du client Socket.IO pour communiquer avec le serveur
        this.socket = io(
            this.config.serveur.protocole +
            this.config.serveur.adresse + ":" +
            this.config.serveur.port
        );

        this.socket.on("exit",() => {
           console.log("Désolé pas de place disponible")
        });
        //

        //document.body.addEventListener("mousemove", this.gererMouvementSouris.bind(this));

        // Bouton pour demander la permission d'accéder aux données de positionnement
        document.querySelector("button").addEventListener("click", this.autoriser.bind(this));




    }



    autoriser(e) {

        // Vérifier si les événements d'orientation sont disponibles sur cette plateforme
        if (!window.DeviceOrientationEvent || !window.DeviceOrientationEvent.requestPermission) {
            alert("Oups! Votre fureteur ne supporte pas la détection d'orientation.");
            return;
        }

        // Demande de permission à l'usager pour l'utilisation des événements d'orientation
        DeviceOrientationEvent.requestPermission()
            .then(state => {
                if (state === 'granted') {
                    window.addEventListener('deviceorientation', this.gererOrientation.bind(this));
                }
            });

    }







    gererOrientation(e) {



        this.socket.emit("mouvement", {alpha: e.alpha, beta: e.beta, gamma: e.gamma});

    }



}