class Inflation {
    constructor() {
        this.crashAtValue = this.generateCrash();
    }

    generateCrash() {
        let crashAtValue = 1;
        let chanceToCrash = 0.01;
        let hasCrashed = false;
        while (hasCrashed == false) {


            let t = chanceToCrash * 100;
            // console.log("t:" + t)
            let r = Math.random() * 100;
            if (r <= t) {
                hasCrashed = true;
                makeItRain();
            }
            

            crashAtValue += 0.1;
            chanceToCrash += Math.random() * (0.000002 - 0.0000005) + 0.0000005;;
            // console.log("chanceToCrash:" + chanceToCrash)
        }
        // console.log("crashAtValue" + crashAtValue);
        return crashAtValue;
    }
}

export {Inflation};