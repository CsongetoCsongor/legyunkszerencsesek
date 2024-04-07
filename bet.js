class Bet {
    constructor(value, autoCashoutValue) {
        this.value = value;
        if (autoCashoutValue != "" ) {
            this.isAutoCashout = true;
            this.autoCashoutValue = autoCashoutValue;
        }
        else {
            this.isAutoCashout = false;
        }
        
    }
}

export {Bet};