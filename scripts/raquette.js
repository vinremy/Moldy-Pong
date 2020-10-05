export class Raquette extends createjs.Bitmap{

    constructor(chargeur){

        super(chargeur.getResult('poele'));

        // this.addEventListener("added", this.initialiser.bind(this));
        window.addEventListener("keydown", this.mouvement.bind(this));
        window.addEventListener("keyup", this.toucheRelache.bind(this));
        createjs.Ticker.addEventListener("tick", this.actualiser.bind(this));

        this.direction = undefined;
        this.vitesse = 5;

        this.y = 800


        // socket.on("mouvement", this.bouge.bind(this));
    }


    bouge(e){

        this.x = e.beta
    }

    mouvement(e){

        if (e.key === "ArrowRight"){
            this.direction = "droite"
        }

        if (e.key === "ArrowLeft"){
            this.direction = "gauche"
        }



    }


    toucheRelache(e) {


       this.direction = undefined



    }



    actualiser(){
        if (this.direction === "droite"){
            this.x += this.vitesse
        }



        if (this.direction === "gauche"){
            this.x -= this.vitesse
        }

        if (this.x <= 0 ){

            this.x = 0
        }

        else if (this.x >= 334){
            this.x = 334
        }



    }


}