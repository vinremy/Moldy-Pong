export class Tomate extends createjs.Bitmap {

    constructor(chargeur, canvas, raquette1, raquette2, point1, point2, app, pointage1, pointage2) {
        super(chargeur.getResult('tomate'));


        this.raquette1 = raquette1;
        this.raquette2 = raquette2;
        this.canvas = canvas;
        this.point1 = point1;
        this.point2 = point2;
        this.app = app;
        this.pointage1 = pointage1;
        this.pointage2 = pointage2;


        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;

        this.min = Math.ceil(5);
        this.max = Math.floor(20);

        this.directionX = Math.floor(Math.random() * Math.floor(this.max - this.min)+ this.min) * ((Math.floor(Math.random() -0.5) *2) + 1);
        this.directionY = Math.floor(Math.random() * Math.floor(this.max - this.min)+ this.min) * ((Math.floor(Math.random() -0.5) *2) + 1);

        createjs.Ticker.addEventListener("tick", this.deplacerBalle.bind(this));



    }


    deplacerBalle(){




        this.x +=  this.directionX;
        this.y +=  this.directionY;

        this.collision = ndgmr.checkRectCollision(this, this.raquette1);
        this.collision2 = ndgmr.checkRectCollision(this, this.raquette2);

        if (this.collision || this.collision2){
            console.log("collision");
            this.directionX = - this.directionX;
            this.directionY = - this.directionY
        }


        if (this.y <= 0){
            this.directionY = -this.directionY
        }


        if (this.y >= 912){
            this.directionY = -this.directionY
        }



    //


        if (this.x <= 0){
            console.log(this.point2)
            this.point2 += 1;
            this.pointage2.text = this.point2;
            this.pointage2.updateCache();

            this.app.stage.removeChild(this);
            //
            // this.directionY = 0;
            // this.directionX = 0;

            // this.x = this.canvas.width/2;
            // this.y = -100;

            console.log(this.point2)


        }

        if(this.x >= this.canvas.width){

            console.log(this.point1)
            this.point1 += 1;
            this.pointage1.text = this.point1;
            this.pointage1.updateCache();

            this.app.stage.removeChild(this);

            // this.directionY = 0;
            // this.directionX = 0;

            // this.x = this.canvas.width/2;
            // this.y = -100;

            console.log(this.point1)

        }

     }


}