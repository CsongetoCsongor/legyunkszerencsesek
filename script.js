import {Inflation} from "./inflation.js";
import {Bet} from "./bet.js"


 const canvas = document.getElementById('cvs');

//  const width = window.innerWidth;
//  const height = window.innerHeight;
//  const z = width / 2 - canvas.width / 2;
//  const y = height / 2 - canvas.height / 2;
 
//  canvas.style.position = 'absolute';
//  canvas.style.left = `${z}px`; 
//  canvas.style.top = `${y}px`;
 
const multiplierText = document.querySelector("#multiplier-text");
/**
 * Retrieves the value of the bet input element on the page.
 * @returns {number} The current value of the bet input.
 */
const betValue = document.querySelector('#bet-value');
const autoCashoutValue = document.querySelector('#auto-cashout-value');
const betButton = document.querySelector('#bet-button');
const balanceText = document.querySelector("#balance-text")
const outcomeText = document.querySelector("#outcome-text")
const prevGamesTable = document.querySelector("#prev-games-ul");

function checkHeight() {
    if (prevGamesTable.clientHeight > 600) {
        prevGamesTable.removeChild(prevGamesTable.firstElementChild); 
    }
}
  

prevGamesTable.addEventListener('DOMSubtreeModified', checkHeight); 
  

checkHeight();


const cvs = document.querySelector('#cvs');

const ctx = cvs.getContext('2d');


let isButtonCashout = false;

const cvsWidth = 600;
const cvsHeight = 600;





//CREATE

if(!localStorage.getItem('prevGames')) {

    let previousGames = [];
    let previousGamesString = JSON.stringify(previousGames);

    localStorage.setItem('prevGames', previousGamesString);
  
  }

// let previousGames = [];
// let previousGamesString = JSON.stringify(previousGames);

// localStorage.setItem('prevGames', previousGamesString);



// localStorage.clear();

let existingArray;
let newArrayString;
let getPreviousGamesString;
updatePrevGames();

// //EXPAND
// let existingArray = JSON.parse(localStorage.getItem('prevGames'));
// existingArray.push([7,8,9]);

// let newArrayString = JSON.stringify(existingArray);
// localStorage.setItem('prevGames', newArrayString);

// //GET
// let getPreviousGamesString = localStorage.getItem('prevGames');
// getPreviousGamesString = getPreviousGamesString.slice(1, -1);
// // let getPreviousGames = JSON.parse(getPreviousGamesString);

// console.log(getPreviousGamesString.slice(1, -1));
// console.log(stringToArray(getPreviousGamesString)[0], stringToArray(getPreviousGamesString)[1], stringToArray(getPreviousGamesString)[2]);






let currentTime;


const img_bad_luck = new Image();
img_bad_luck.src = 'images/stock_crash_bad_luck.png'; 

const img_luck = new Image();
img_luck.src = 'images/img_win.jpeg'; 

let cookie = document.cookie;
if (cookie[0] == undefined) {
    document.cookie = 200;
}
// document.cookie = 200;
updateStats();

let bet;

let multiplier = 1;
let inflation = new Inflation();
const [crashAtValue, hasCrashed] = inflation.generateCrash();

function stringToArray(str) {
    // Remove the surrounding square brackets
    str = str.slice(1, -1);
    
    // Split the string on commas
    return str.split(',');
}
  
function insertLetter(string, letter, position) {
    return string.slice(0, position) + letter + string.slice(position);
  }

function inflate() {


    const timeString = new Date().toLocaleString('en-US', {timeZone: 'Europe/Helsinki'}).slice(11,19).replace(/:/g, ':');

    

    let hours = timeString.substring(0, 2);
    hours = parseInt(hours) - 1;
    if(hours < 10) {
    hours = '0' + hours+":";
    }

    const updatedTime = hours + timeString.substring(2); 



    currentTime = updatedTime;
    if (bet.autoCashoutValue <= multiplier) {
        clearInterval(interval);
        inflation = new Inflation();
        const [crashAtValue, hasCrashed] = inflation.generateCrash();
        multiplier = 1;
        // outcomeText.innerHTML = "AUTO-CASHED OUT SUCCESSFULLY";
        document.cookie = Number(document.cookie) + Number(bet.value * bet.autoCashoutValue);
        updateStats();
        // localStorage.setItem("balance", balance);
        // console.log(localStorage.getItem("balance"));
        // balance += bet.value * bet.autoCashoutValue;
        
        isButtonCashout = false;
        betButton.innerHTML = "Fogadás";

        x = 0;

        ctx.clearRect(0, 0, cvsWidth, cvsHeight);

        ctx.drawImage(img_luck, 0, 0, cvsWidth, cvsHeight);

        ctx.textAlign = "center";
        ctx.font = "bold italic 40px Brush Script MT"
        ctx.fillStyle = 'white';
        let Win = Math.round(parseFloat(bet.value * bet.autoCashoutValue) )
        ctx.fillText("Ön ennyit nyert: " + Win + "Ft", cvsWidth/2, cvsHeight/2);
        if(Win > 10000){
            let WinCrashElement1 = document.querySelector(".GoldCoinSpin");
            WinCrashElement1.style.display = "flex";
        }

        cvs.style.boxShadow = '0 0 50px 15px green';



        let existingArray = JSON.parse(localStorage.getItem('prevGames'));
        existingArray.push(["WIN","+"+Math.round(parseFloat(bet.value * bet.autoCashoutValue)),currentTime]);

        let newArrayString = JSON.stringify(existingArray);
        localStorage.setItem('prevGames', newArrayString);

        let arrayString = localStorage.getItem('prevGames');
        let arrayOfArrays = JSON.parse(arrayString); 

        


        updatePrevGames();

        
        arrayOfArrays.forEach(element => {
            console.log(element[0], element[1], element[2]);
        });

        updateStats();
        
        // balance
        // balanceText.innerHTML = balance + " Ft";
    }
    else if (multiplier <= crashAtValue) {
        drawGraph();
        multiplier += 0.01;
        // multiplierText.innerHTML = multiplier;
        // console.log(multiplier); 
        // outcomeText.innerHTML = "TO BE DETERMINED"
    }
    else {
        clearInterval(interval);
        multiplier = 1;
        inflation = new Inflation();
        const [crashAtValue, hasCrashed] = inflation.generateCrash();
        // outcomeText.innerHTML = "CRASHED"
        betButton.innerHTML = "Fogadás";

        // balance -= bet.value;
        // localStorage.setItem("balance", balance);
        document.cookie = Number(document.cookie) - Number(bet.value);


        let existingArray = JSON.parse(localStorage.getItem('prevGames'));
        existingArray.push(["LOSE","-"+bet.value,currentTime]);

        let newArrayString = JSON.stringify(existingArray);
        localStorage.setItem('prevGames', newArrayString);

        let arrayString = localStorage.getItem('prevGames');
        let arrayOfArrays = JSON.parse(arrayString); 

        
        updatePrevGames();



        
        arrayOfArrays.forEach(element => {
            console.log(element[0], element[1], element[2]);
        });



        updateStats();
        updateStats();
        // console.log(localStorage.getItem("balance"));

        
        updateStats();

        isButtonCashout = false;

        x = 0;

        ctx.clearRect(0, 0, cvsWidth, cvsHeight);

        ctx.drawImage(img_bad_luck, 0, 0, cvsWidth, cvsHeight);

        
        ctx.textAlign = "center";
        ctx.font = "bold italic 40px Brush Script MT"
        ctx.fillStyle = 'white';
        ctx.fillText("Ön vesztett: " + bet.value + "Ft", cvsWidth/2, cvsHeight/2);
        if(hasCrashed){
            let crashElement1 = document.querySelector(".BadLuck");
            let crashElement2 = document.querySelector("#BadLuckStock");
            let crashElement3 = document.querySelector("#BadLuckCat");
            let crashElement4 = document.querySelector("#CurseOfRah");
            crashElement1.style.display = "flex";
            crashElement2.style.display = "flex";
            crashElement3.style.display = "flex";
            crashElement4.style.display = "flex";
        }

        ctx.textAlign = "center";
        ctx.font = "bold italic 60px Brush Script MT"
        ctx.fillStyle = 'white';
        ctx.fillText("A tőzsde összeomlott!", cvsWidth/2, cvsHeight/2 - 100);

        cvs.style.boxShadow = '0 0 50px 15px red'
    }
       
}



let interval;
betButton.addEventListener('click', startInflation);

function startInflation() {
    

    // console.log("betValue.value: " + betValue.value);
    // console.log("localStorage.getItem(balance): " + localStorage.getItem("balance"));
    if (Number(betValue.value) <= Number(document.cookie) && Number(betValue.value) > 0 && (autoCashoutValue.value >= 2 || autoCashoutValue.value == "")) {
        if (betValue.value != "") {
            if (isButtonCashout == false) {
                bet = new Bet(betValue.value, autoCashoutValue.value);
                betButton.innerHTML = "CASHOUT";
                
                interval = setInterval(inflate, 10);
    
                isButtonCashout = true;
    
                cvs.style.boxShadow = '0 0 50px 15px #3507b3'
            }
            else {
                clearInterval(interval);
                inflation = new Inflation();
                const [crashAtValue, hasCrashed] = inflation.generateCrash();
                // balance += bet.value * multiplier;
                // updateStats();
    
                // balance += bet.value * multiplier;
                // localStorage.setItem("balance", balance);
                // updateStats();
                // console.log(localStorage.getItem("balance"));
                document.cookie = Number(document.cookie) + Number(bet.value * multiplier);


                let existingArray = JSON.parse(localStorage.getItem('prevGames'));
                existingArray.push(["WIN","+"+Math.round(bet.value * multiplier),currentTime]);

                let newArrayString = JSON.stringify(existingArray);
                localStorage.setItem('prevGames', newArrayString);

                let arrayString = localStorage.getItem('prevGames');
                let arrayOfArrays = JSON.parse(arrayString); 

                updatePrevGames();

                arrayOfArrays.forEach(element => {
                    console.log(element[0], element[1], element[2]);
                });

                updateStats();
                
                // outcomeText.innerHTML = "CASHED OUT MANUALLY"
                
                betButton.innerHTML = "Fogadás";
                isButtonCashout = false;
    
                x = 0;
    
                ctx.clearRect(0, 0, cvsWidth, cvsHeight);
    
                ctx.drawImage(img_luck, 0, 0, cvsWidth, cvsHeight);
    
                ctx.textAlign = "center";
                ctx.font = "bold italic 40px Brush Script MT"
                ctx.fillStyle = 'white';
                let Win = Math.round(bet.value * multiplier)
                ctx.fillText("Ön ennyit nyert: " + Win + "Ft", cvsWidth/2, cvsHeight/2);
                if(Win > 10000){
                    let WinCrashElement1 = document.querySelector(".GoldCoinSpin");
                    WinCrashElement1.style.display = "flex";
                }
                // console.log(typeof(bet.value * bet.autoCashoutValue));
    
                cvs.style.boxShadow = '0 0 50px 15px green'
    
                multiplier = 1;
            }
            
        }
    }
    else {
        alert("Túl nagy tét! Kérjük, válasszon kisebb összeget.");
    }

    
    
}

function updateStats() {
    balanceText.innerHTML = Number(document.cookie).toFixed() + "Ft";
    // localStorage.setItem("balance", balance);
    // console.log(localStorage.getItem("balance"));
}


let x = 0;
const endX = cvsWidth;



function drawGraph() {
    
    ctx.clearRect(0, 0, cvsWidth, cvsHeight);
    

    //VERTICAL LINE
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(30, cvsHeight);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'white'; 
    ctx.stroke();


    ctx.moveTo(30, 0);
    ctx.lineTo(35, 0);

    ctx.moveTo(30, cvsHeight/4);
    ctx.lineTo(35, cvsHeight/4);

    ctx.moveTo(30, cvsHeight/2);
    ctx.lineTo(40, cvsHeight/2);

    ctx.moveTo(30, cvsHeight*3/4);
    ctx.lineTo(35, cvsHeight*3/4);

    ctx.moveTo(30, cvsHeight);
    ctx.lineTo(35, cvsHeight);

    ctx.stroke();




    //HORIZONTAL LINE
    
    const axisY = cvsHeight - 30;

    ctx.beginPath();
    ctx.moveTo(0, axisY);
    ctx.lineTo(cvsWidth, axisY);

    ctx.moveTo(0, axisY);
    ctx.lineTo(0, axisY - 5);

    ctx.moveTo(cvsWidth/4, axisY);
    ctx.lineTo(cvsWidth/4, axisY - 5); 

    ctx.moveTo(cvsWidth/2, axisY);
    ctx.lineTo(cvsWidth/2, axisY - 10);

    ctx.moveTo(cvsWidth*3/4, axisY);
    ctx.lineTo(cvsWidth*3/4, axisY - 5);

    ctx.moveTo(cvsWidth, axisY);  
    ctx.lineTo(cvsWidth, axisY - 5);

    ctx.stroke(); 




    ctx.textAlign = "center";
    ctx.font = "bold italic 100px Brush Script MT"
    ctx.fillStyle = 'white';
    ctx.fillText(multiplier.toFixed(2) + "×", cvsWidth/2, 100);
    



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
        let grd = ctx.createLinearGradient(0, 0, 0, cvsHeight);

        grd.addColorStop(0, "rgba(149,22,121,1)");
        grd.addColorStop(0.5, "rgba(13,11,11,1)"); 
        grd.addColorStop(1, "rgba(149,22,121,1)");

      
        ctx.lineTo(cvsWidth, cvsHeight); 
        ctx.lineTo(0, cvsHeight);
        ctx.closePath();
        ctx.fillStyle = grd;
        ctx.fill();


        ctx.globalAlpha = 1;
        ctx.textAlign = "center";
        ctx.font = "bold italic 100px Brush Script MT"
        ctx.fillStyle = 'white';
        ctx.fillText(multiplier.toFixed(2) + "×", cvsWidth/2, 100);
        


      
    }  

    

    
    
}




function updatePrevGames() {
    prevGamesTable.innerHTML="";
    let arrayString = localStorage.getItem('prevGames');
    let arrayOfArrays = JSON.parse(arrayString); 
    arrayOfArrays.forEach(element => {
        const tr = document.createElement("tr");
        element.forEach(subElement => {
            const td = document.createElement("td");
            if(subElement === "WIN") {
                td.style.color = "green";
            } else if (subElement == "LOSE") {
                td.style.color = "red";
            }
            else if ([...subElement[0]] == "+") {
                td.style.color = "green";
            } else if ([...subElement[0]] == "-") {
                td.style.color = "red";
            }
            else {
                td.style.color = "white";
            }
            
            td.innerHTML=subElement;
            tr.appendChild(td);
        });
        prevGamesTable.appendChild(tr);
    });
    
    
}
