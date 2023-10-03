const radioGroup = document.getElementsByName('radio-grp');
let oldRounds= document.querySelector('input[name=radio-grp]:checked').value;
const grid= document.querySelectorAll(".grid");
const userGridElement = grid[0];
const robotGridElement = grid[1];

grid.forEach(elm => {console.log("#######",elm);} )

const roundsSeloctor= document.querySelector(".roundsSeloctor");
const sectionCounter=document.querySelector(".section-counter");
const roundCount= document.querySelector(".count-round");

let round= Number(oldRounds);
let count=1;
let userNumber=0;
let userPoints=0,robotPoints=0;



console.log(radioGroup);

// Durchlaufe jedes Element in der Radio-Gruppe
for (let i = 0; i < radioGroup.length; i++) {
    // Füge einen Eventlistener für das "change"-Ereignis hinzu
    radioGroup[i].addEventListener('change', () => {
    // Wenn das "change"-Ereignis ausgelöst wird, wird diese Funktion aufgerufen
    
    console.log("last rounds :" + oldRounds);
    // Ich lösche alle Boxen, die in grid waren
    grid.forEach(elm => {
        for (let x = 1; x <= Number(oldRounds); x++) {
                let gridChild= document.querySelector(".box"+x);
                if (elm.contains(gridChild)) {
                    elm.removeChild(gridChild);
                }
            
        }
    })
    const newrounds = Number(document.querySelector('input[name=radio-grp]:checked').value);
    round= newrounds;
    count=1;

    //neue boxen werden in grid element hinzugefügt
    grid.forEach(elm => {
        console.log("gridelement ist", elm);
        elm.style.gridTemplateColumns=`repeat(${newrounds+1} , auto)`;
        for (let j = 1; j <= newrounds; j++) {
            let newDiv = document.createElement("div");
            newDiv.className="box"+j;
            elm.appendChild(newDiv);
        }
    })
    
    //grid.style.gridTemplateColumns=`repeat(${newrounds+1} , auto)`;

    // for (let j = 1; j <= newrounds; j++){
    //     let newDiv = document.createElement("div");
    //     newDiv.className="box";
    //     grid.forEach(elm => {
    //         elm.appendChild(newDiv);
    //     } )
    //     grid.appendChild(newDiv);
    // }

    oldRounds= document.querySelector('input[name=radio-grp]:checked').value;
    //console.log(rounds);
    });
}

const userStone = document.querySelector(".stone");
const userPaper = document.querySelector(".paper");
const userScissor = document.querySelector(".scissor");

// wenn das Stone ist gecklickt:
// 1. check ob eine runde vorbei ist?
// 2. section counter wird anstatt radio buttons angezeigt
// 3. Richtige nummer wird in counter-section angezeigt
// 4. wird in die result tabelle(Html) stone angezeight
// 5. counter + 1
// 6. function für Robot wird aufgeruft
userStone.addEventListener("click" , () => {
    //console.log("Stone ist clickt");
    if (!winCheck()) {
    userNumber=1; // heißt das user hat Stein gewählt
    roundsSeloctor.style.display= "none";
    sectionCounter.style.display="block";
    roundCount.innerHTML= `${count}/${round}`;
    // ich füge eine neue p element mit eintsprechende Symbole in erste zeile von result tabelle 
    const boxname= `.box${count}`;
    // userGridElement ist general definiert(ganze oben)
    const box = userGridElement.querySelector(boxname);
    let newStone= document.createElement("p");
    newStone.className="result-symbole";
    newStone.innerHTML="👊";
    if (count!== round+1) {
        box.appendChild(newStone);
        robotSpiel();
        count +=1;
    }
}
});
// wenn das Paper ist gecklickt:
// rest ist genau wie Stein
userPaper.addEventListener("click" , () => {
    if (!winCheck()) {
    userNumber=2; // heißt das user hat papier gewählt
    //console.log("Stone ist clickt");
    const boxname= `.box${count}`;
    // userGridElement ist general definiert(ganze oben)
    const box = userGridElement.querySelector(boxname);
    let newPaper= document.createElement("p");
    roundsSeloctor.style.display= "none";
    sectionCounter.style.display="block";
    roundCount.innerHTML= `${count}/${round}`;
    newPaper.className="result-symbole";
    newPaper.innerHTML="🤚";
    if (count!== round+1) {
        box.appendChild(newPaper);
        robotSpiel();
        count +=1;
    } 
}
});
// wenn das Schere ist gecklickt:
// rest ist genau wie Stein
userScissor.addEventListener("click" , () => {
    if (!winCheck()) {
        userNumber=3; // heißt das user hat Schere gewählt 
        //console.log("Stone ist clickt");
        const boxname= `.box${count}`;
        // userGridElement ist general definiert(ganze oben)
        const box = userGridElement.querySelector(boxname);
        let newScissor= document.createElement("p");
        roundsSeloctor.style.display= "none";
        sectionCounter.style.display="block";
        roundCount.innerHTML= `${count}/${round}`;
        newScissor.className="result-symbole";
        newScissor.innerHTML="✌️";
        if (count!== round+1) {
            box.appendChild(newScissor);
            robotSpiel();
            count +=1;
        } 
    }
});

// check ob eine runde vorbei ist? 
// rounde ist vorbei => Popup wird angezeigt && 
//                      section radio-buttons wird anstatt counter angezeigt &&
//                      return true 
// rounde ist noch nicht vorbei => return false 
const winCheck = () =>{
    if (count === round+1){
        if (userPoints > robotPoints) {
            window.alert("***** juhu Sie haben gewonnen *****");
            roundsSeloctor.style.display= "block";
            sectionCounter.style.display="none";
        }
        else if(userPoints< robotPoints){
            window.alert("----- Robot hat gewonnen ----")
            roundsSeloctor.style.display= "block";
            sectionCounter.style.display="none";
        } else if (userPoints === robotPoints){
            window.alert("##### beide haben gleich Punkte #####");
            roundsSeloctor.style.display= "block";
            sectionCounter.style.display="none";
        }
        userPoints=0;
        robotPoints=0;
        return true;
    } else {
        return false;
    }
}

// eine Random nummer zweichen 1 und 3
// 1 => stein   2=>papier 3=>schere
const robotSpiel = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1
    //console.log("Random ist ......" , randomNumber);
    const boxname= `.box${count}`;
    const box = robotGridElement.querySelector(boxname);
    let newSymbole= document.createElement("p");
    newSymbole.className="result-symbole";
    switch (randomNumber) {
        case 1:
            newSymbole.innerHTML="👊";
            box.appendChild(newSymbole);
        break;
        case 2:
            newSymbole.innerHTML="🤚";
            box.appendChild(newSymbole);
        break;
        case 3:
            newSymbole.innerHTML="✌️";
            box.appendChild(newSymbole);
        break;
        default:
            break;
    }
    CalculateResult(randomNumber);

}

// hier wird Punkte von user und Roboter gerechnet
const CalculateResult = (robot) =>{
    switch (userNumber) {
        case 1:
            if (robot === 1) {
                userPoints+=1;
                robotPoints +=1;
            } else if (robot === 2) {
                robotPoints+=1;
            } else if (robot === 3) {
                userPoints +=1 ;
            }
            break;
        case 2:
            if (robot === 1) {
                userPoints +=1 ;
            } else if (robot === 2) {
                userPoints+=1;
                robotPoints +=1;
            } else if (robot === 3) {
                robotPoints+=1;
            }
        break;
        case 3:
            if (robot === 1) {
                robotPoints+=1;
            } else if (robot === 2) {
                userPoints +=1 ;
            } else if (robot === 3) {
                userPoints+=1;
                robotPoints +=1;
            }
        break;
    
        default:
            break;
    }
}
