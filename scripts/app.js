import {Serveur} from "./Serveur.js";
import {Raquette} from "./raquette.js";

export class Application {

    constructor() {
        nw.Window.get().showDevTools();

        //
        // this.serveur = new Serveur(this.raquette1);
        // this.serveur.demarrer();

        this.canvas = document.querySelector("canvas");

        this.cadence =60;


        this.initialiser();
    }


    initialiser() {
        this.stage = new createjs.StageGL(this.canvas);

        createjs.Ticker.addEventListener("tick", e => {
            this.stage.update(e)

        });
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.framerate = this.cadence;

        this.chargeur = new createjs.LoadQueue();

        this.chargeur.installPlugin(createjs.Sound);

        this.chargeur.loadManifest("ressources/manifest.json");
        this.chargeur.addEventListener('error', this.interrompre);
        this.chargeur.addEventListener('complete', this.demarrer.bind(this));
    }


    interrompre(e) {
        alert(e.data.src);
    }

    demarrer(){
        console.log("jeu demarrer");
        this.raquette1 = new Raquette(this.chargeur);
        this.ajoutDecor();
        this.ajoutRaquette1();



        this.serveur = new Serveur(this.raquette1);
        this.serveur.demarrer();
    }


    ajoutDecor(){
        // this.decor = new createjs.Bitmap(this.chargeur.getResult('decor'), true);
        //
        // this.stage.addChild(this.decor);

        console.log("decor ajouté")


    }


    ajoutRaquette1(){

        console.log("ajoutRaquette1");
        // this.raquette1 = new Raquette(this.chargeur);
        this.stage.addChild(this.raquette1);

        console.log(this.raquette1)
    }

}

