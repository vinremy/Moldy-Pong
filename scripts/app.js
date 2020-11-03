import {Serveur} from "./Serveur.js";
import {Raquette} from "./raquette.js";
import {Tomate} from "./tomate.js";

export class Application {

    constructor() {
        nw.Window.get().showDevTools();

        //
        // this.serveur = new Serveur(this.raquette1);
        // this.serveur.demarrer();

        this.canvas = document.querySelector("canvas");

        this.cadence =60;
        this.formatPolice = "90px 'Share Tech Mono'";

        this.initialiser();

        this.jeuDemarrer= false
    }


    initialiser() {
        this.stage = new createjs.StageGL(this.canvas);

        createjs.Ticker.addEventListener("tick", this.actualiser.bind(this));



        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.framerate = this.cadence;

        this.chargeur = new createjs.LoadQueue();

        this.chargeur.installPlugin(createjs.Sound);

        this.chargeur.loadManifest("ressources/manifest.json");
        this.chargeur.addEventListener('error', this.interrompre);
        this.chargeur.addEventListener('complete', this.demarrer.bind(this));

    //    commande pour developpement
        window.addEventListener("keydown", this.lancementJeu.bind(this));
        console.log(this.canvas.width, this.canvas.height);

        this.pointsJ1 = 0;
        this.pointsJ2 = 0;

        document.fonts.load(this.formatPolice);

    }



    interrompre(e) {
        alert(e.data.src);
    }

    demarrer(){
        console.log("jeu demarrer");
        this.raquette1 = new Raquette(this.chargeur , "poele");
        this.raquette2 = new Raquette(this.chargeur , "poele");

        this.ajoutDecor();
        this.ajoutRaquette1();
        this.ajoutRaquette2();



        this.serveur = new Serveur(this.raquette1, this.raquette2);
        this.serveur.demarrer();
    }




    ajoutDecor(){
        this.decor = new createjs.Bitmap(this.chargeur.getResult('decor'), true);

        this.stage.addChild(this.decor);

        console.log("decor ajouté");

        this.pointageJ1 = new createjs.Text(this.pointsJ1, "64px Share Tech Mono", "white");
        this.pointageJ2 = new createjs.Text(this.pointsJ2, "64px Share Tech Mono", "white");

        this.pointageJ1.cache(0, 0, this.pointageJ1.getBounds().width, 50);
        this.pointageJ2.cache(0, 0, this.pointageJ2.getBounds().width, 50);

        this.stage.addChild(this.pointageJ1, this.pointageJ2);
        this.pointageJ1.y = this.canvas.height/2;
        this.pointageJ2.y = this.canvas.height/2;

        this.pointageJ1.x = 500;
        this.pointageJ2.x = 1300;

        console.log(this.pointsJ1)

    }


    ajoutRaquette1(){

        console.log("ajoutRaquette1");
        // this.raquette1 = new Raquette(this.chargeur);
        this.stage.addChild(this.raquette1);

        console.log(this.raquette1)

    }


    ajoutRaquette2(){

        console.log("ajoutRaquette2");
        // this.raquette1 = new Raquette(this.chargeur);
        this.stage.addChild(this.raquette2);
        this.raquette2.x = this.canvas.width - 120;
        console.log(this.raquette2.x)

        console.log(this.raquette2)
    }


    lancementJeu(e){
        if (e.key === "o"){
            this.balle = new Tomate(this.chargeur, this.canvas, this.raquette1, this.raquette2, this.pointsJ1, this.pointsJ2, this, this.pointageJ1, this.pointageJ2);

            this.stage.addChild(this.balle);



            this.jeuDemarrer = true;

            console.log("ajoutBalle")
        }
    }




    actualiser(e){
        this.stage.update(e);



        if (this.jeuDemarrer === true){




        }


    }



    augmenterPointJ2(){
        this.pointsJ2 += 1;


        this.pointageJ2.text = this.pointsJ2;
        this.pointageJ2.updateCache();


    }

    augmenterPointJ1(){
        this.pointsJ1 += 1;


        this.pointageJ1.text = this.pointsJ1;
        this.pointageJ1.updateCache();

    }

}

