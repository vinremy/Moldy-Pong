export class Interface {


    constructor() {

        this.socket = io('https://192.168.2.31:3000');

        // document.body.addEventListener("touchmove", this.gererMouvement.bind(this))


        //
        // navigator.permissions.query({name:'gyroscope'}).then(function(result) {
        //     if (result.state === 'granted') {
        //
        //         this.gyroscope = new Gyroscope({frequency: 60});
        //
        //        console.log("acces au gyroscope autorisé");
        //     } else if (result.state === 'prompt') {
        //         console.log("acces au gyroscope non autorisé");
        //     }
        //
        // });


        DeviceOrientationEvent.requestPermission()
            .then(state => {
                if (state === 'granted') {
                    window.addEventListener('deviceorientation', this.bougeOrientation.bind(this));
                }
            });


       window.addEventListener("deviceorientation", this.bougeOrientation.bind(this), true);


    }


    // gererMouvement(e) {
    //     console.log(e);
    //
    //     this.socket.emit(
    //         "position",
    //         {
    //             x: e.touches[0].clientX,
    //             y: e.touches[0].clientY,
    //         }
    //     );
    //
    //
    // }

    bougeOrientation(e) {

        // this.gyroscope = new Gyroscope({frequency: 60});
        //
        // this.gyroscope.addEventListener('reading', e => {
        //
        //     this.socket.emit(
        //         "position",
        //         {
        //             x: this.gyroscope.x,
        //             y: this.gyroscope.y
        //         }
        //     );
        //
        // });
        // this.gyroscope.start();

        this.socket.emit(
            "position",
            {
                x: e.beta

            }
        );


    }


}