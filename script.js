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
        // console.log(multiplier); 
        outcomeText.innerHTML = "TO BE DETERMINED"
    }
    else {
        clearInterval(interval);
        multiplier = 1;
        inflation = new Inflation();
        outcomeText.innerHTML = "CRASHED"
        betButton.innerHTML = "Fogadás";
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


let x = 0;
const endX = cvsWidth;

let lineFillerGradPoint1 = 0;
let lineFillerGradPoint2 = 0.5;
let lineFillerGradPoint3 = 1;


function drawGraph() {
    
    ctx.clearRect(0, 0, cvsWidth, cvsHeight);
    
  

    ctx.textAlign = "center";
    ctx.font = "bold italic 100px Brush Script MT"
    ctx.fillStyle = 'white';
    ctx.fillText(multiplier.toFixed(2), cvsWidth/2, 100);
    



    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(0, cvsHeight - 30);
    ctx.bezierCurveTo(x, cvsHeight, x, 0, x, 0);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white'; 
    ctx.stroke();




    x += 5;


    if(x >= endX) {
        x = endX;
        ctx.globalAlpha = 0.5;
        const grd = ctx.createLinearGradient(0, 0, 0, cvsHeight);

        grd.addColorStop(lineFillerGradPoint1, "rgba(149,22,121,1)");
        grd.addColorStop(lineFillerGradPoint2, "rgba(13,11,11,1)"); 
        grd.addColorStop(lineFillerGradPoint3, "rgba(149,22,121,1)");
        
        ctx.lineTo(cvsWidth, cvsHeight); 
        ctx.lineTo(0, cvsHeight);
        ctx.closePath();
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.textAlign = "center";
        ctx.font = "bold italic 100px Brush Script MT"
        ctx.fillStyle = 'white';
        ctx.fillText(multiplier.toFixed(2), cvsWidth/2, 100);
        
        manageFillerPoint(lineFillerGradPoint1);
        manageFillerPoint(lineFillerGradPoint2);
        manageFillerPoint(lineFillerGradPoint3);

        console.log(lineFillerGradPoint1);

    }  

    
    
}

function manageFillerPoint(fillerpoint) {
    // if(fillerpoint <= 0) {
    //     fillerpoint += 0.001;
    //     return fillerpoint;
    // }
    // else if(fillerpoint >= 1) {
    //     fillerpoint -= 0.001;
    //     return fillerpoint;
    // }
    // else {
    //     fillerpoint += 0.001;
    //     return fillerpoint;
    // }
    fillerpoint += 1;
    return fillerpoint;
}