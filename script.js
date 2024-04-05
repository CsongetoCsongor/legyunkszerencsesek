import {Inflation} from "./inflation.js";



const multiplierText = document.querySelector("#multiplier-text");

let multiplier = 1;
let inflation = new Inflation();
function inflate() {


    if (multiplier <= inflation.crashAtValue) {
        multiplier += 0.01;
        multiplierText.innerHTML = multiplier;
        console.log(multiplier); 
    }
    
         
    
    
    
}


let interval = setInterval(inflate, 10);


