import {Inflation} from "./inflation.js";
import {Bet} from "./bet.js"



const multiplierText = document.querySelector("#multiplier-text");
const betValue = document.querySelector('#bet-value');
const autoCashoutValue = document.querySelector('#auto-cashout-value');
const betButton = document.querySelector('#bet-button');
const balanceText = document.querySelector("#balance-text")


const cvs = document.querySelector('#cvs');

const ctx = cvs.getContext('2d');

const cvsWidth = 1000;
const cvsHeight = 1000;

let balance = 200;

let bet;

let multiplier = 1;
let inflation = new Inflation();

function inflate() {

    if (bet.autoCashoutValue <= multiplier) {
        clearInterval(interval);
        inflation = new Inflation();
        multiplier = 1;
        
        // balance
        // balanceText.innerHTML = balance + " Ft";
    }
    else if (multiplier <= inflation.crashAtValue) {
        multiplier += 0.01;
        multiplierText.innerHTML = multiplier;
        console.log(multiplier); 
    }
    else {
        clearInterval(interval);
        multiplier = 1;
        inflation = new Inflation();
    }
       
}



let interval;
betButton.addEventListener('click', startInflation);

function startInflation() {
    bet = new Bet(betValue.value, autoCashoutValue.value);
    if (bet.value != "") {
        interval = setInterval(inflate, 10);
    }
    
}
