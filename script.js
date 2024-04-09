import {Inflation} from "./inflation.js";
import {Bet} from "./bet.js"



const multiplierText = document.querySelector("#multiplier-text");
const betValue = document.querySelector('#bet-value');
const autoCashoutValue = document.querySelector('#auto-cashout-value');
const betButton = document.querySelector('#bet-button');
const balanceText = document.querySelector("#balance-text")
const outcomeText = document.querySelector("#outcome-text")


const cvs = document.querySelector('#cvs');

const ctx = cvs.getContext('2d');


let isButtonCashout = false;

const cvsWidth = 600;
const cvsHeight = 600;

let balance = 200;
updateStats();

let bet;

let multiplier = 1;
let inflation = new Inflation();

function inflate() {

    if (bet.autoCashoutValue <= multiplier) {
        clearInterval(interval);
        inflation = new Inflation();
        multiplier = 1;
        outcomeText.innerHTML = "AUTO-CASHED OUT SUCCESSFULLY"
        balance += bet.value * bet.autoCashoutValue;
        updateStats();
        
        // balance
        // balanceText.innerHTML = balance + " Ft";
    }
    else if (multiplier <= inflation.crashAtValue) {
        drawGraph();
        multiplier += 0.01;
        multiplierText.innerHTML = multiplier;
        console.log(multiplier); 
        outcomeText.innerHTML = "TO BE DETERMINED"
    }
    else {
        clearInterval(interval);
        multiplier = 1;
        inflation = new Inflation();
        outcomeText.innerHTML = "CRASHED"
        balance -= bet.value;
        updateStats();
    }
       
}



let interval;
betButton.addEventListener('click', startInflation);

function startInflation() {
    
    if (betValue.value != "") {
        if (isButtonCashout == false) {
            bet = new Bet(betValue.value, autoCashoutValue.value);
            betButton.innerHTML = "CASHOUT";
            
            interval = setInterval(inflate, 10);

            isButtonCashout = true;
        }
        else {
            clearInterval(interval);
            inflation = new Inflation();
            balance += bet.value * multiplier;
            updateStats();
            multiplier = 1;
            outcomeText.innerHTML = "CASHED OUT MANUALLY"
            
            betButton.innerHTML = "Fogadás";
            isButtonCashout = false;
        }
        
    }
    
}

function updateStats() {
    balanceText.innerHTML = balance + "Ft";
}


function drawGraph() {
    
    ctx.clearRect(0, 0, cvsWidth, cvsHeight);

    ctx.beginPath(); // Start a new path
    ctx.moveTo(0, 600); // Move the pen to (30, 50)
    ctx.lineTo(600, 0); // Draw a line to (150, 100)
    ctx.stroke(); // Render the path

    ctx.beginPath();
    ctx.moveTo(0, 600);
    ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
    ctx.stroke();
}