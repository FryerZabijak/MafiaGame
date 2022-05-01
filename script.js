import * as funkce from "./funkce.js";
import * as nastaveni from "./nastaveni.js";
import * as tooltips from "./tooltips.js";

let hlavniObrazek = document.getElementById("hlavniObrazek");
let mistnostCislo=1;
let mistnost = 1;
let penize = 5;
let energie = 100;
let level = 1;
let xp = 0;

var vraceneHodnoty = nastaveni.NactiSave();
if (!isNaN(vraceneHodnoty["energie"])) {
    mistnost = vraceneHodnoty["mistnost"];
    penize = vraceneHodnoty["penize"];
    energie = vraceneHodnoty["energie"];
    mistnostCislo=vraceneHodnoty["mistnostCislo"];
    level = vraceneHodnoty["level"];
    xp = vraceneHodnoty["xp"];
    console.log("místnost: "+mistnost+"\nPeníze: "+penize+"\nEnergie: "+energie);
    document.getElementById("levelLabel").innerText=level;
}
else {
    tooltips.VypisZpravu("Nazdar čuraku","toto jee moje pero","beru",false,"images/other/shop-pozadi.png",false);
}
AktualizujMistnost(false);
AktualizujStaty();

//  HRACÍ TLAČÍTKA - START
let hraciTlacitka = document.querySelectorAll(".hraci-tlacitko");
hraciTlacitka.forEach(btn => {
    btn.addEventListener('click',function() {
        if (energie>0) {
        if (btn.id=="projitButton") {
            Projit();
        }
        else if (btn.id=="sebratButton") {
            Sebrat();
        }
        else if (btn.id="utocitButton") {
            Utocit();
        }
    }
    })
})

function Sebrat() {
    if (mistnost==1) {  //Prázdná místnost
        energie-=10;
    }
    else if (mistnost==2) { //Prachy
        penize+=funkce.VygenerujRandomCislo(1,10);
        xp+=2;
    }
    else if (mistnost==3) { //Nepřítel
        energie-=20;
    }
    AktualizujMistnost(true);
}

function Projit() {
    if (mistnost==1) {  //Prázdná místnost
        energie-=5;
        xp+=1;
    }
    else if (mistnost==2) { //Prachy
        energie-=10;
    }
    else if (mistnost==3) { //Nepřítel
        energie-=20;
    }
    AktualizujMistnost(true);
}

function Utocit() {
    if (mistnost==1) {  //Prázdná místnost
        energie-=15;
    }
    else if (mistnost==2) { //Prachy
        energie-=15;
    }
    else if (mistnost==3) { //Nepřítel
        energie-=10;
        if (funkce.VygenerujRandomCislo(1,3)==2) penize+=funkce.VygenerujRandomCislo(1,10);
        xp+=2;
    }
    AktualizujMistnost(true);
}
//  HRACÍ TLAČÍTKA - KONEC


let buttons = document.querySelectorAll("button"); //Při každém kliknutí tlačítka aktualizuje staty a uloží cookies
buttons.forEach(btn => {
    btn.addEventListener('click',function() {
        AktualizujStaty();          //Aktualizace statů
        console.log("Klikls na "+btn.innerHTML);    //Consolový výpis pro vývojáře
    })
})

export function AktualizujStaty() {        //Aktualizuje staty a uloží cookies
    //Aktualizace statů
    if (energie<0) energie=0;
    if (xp>= level*50) {
        var xpNavic = xp-(level*50);
        xp=xpNavic;
        level++;
        penize+=50;
        document.getElementById("levelLabel").innerText=level;
    }
    document.getElementById("levelProgress").value=Math.floor(xp*2/level);

    document.getElementById("penizeLabel").innerText=penize;
    //document.getElementById("energieLabel").innerText=energie;
    document.getElementById("energieProgress").value=energie;

    //Aktualizace Cookies
    nastaveni.UlozitCookies("mistnost",mistnost,10);
    nastaveni.UlozitCookies("penize",penize,10);
    nastaveni.UlozitCookies("energie",energie,10);
    nastaveni.UlozitCookies("mistnostCislo",mistnostCislo,10);
    nastaveni.UlozitCookies("level",level,10);
    nastaveni.UlozitCookies("xp",xp,10);
}

export function AktualizujMistnost(rozhodnuti) {//True - Aktualizuje NOVOU místnost; False - pouze znovu načte obrázek
    let idMistnosti;
    if (rozhodnuti) 
    {
        idMistnosti = funkce.VygenerujRandomCislo(1,6);
        mistnostCislo++;
    }
    document.getElementById("mistnostPocetLabel").innerText="Ulice #"+mistnostCislo;

    if ((idMistnosti>=1 && idMistnosti<=3) || (!rozhodnuti && mistnost==1)) //Prázdná místnost
    {
        mistnost=1;
        hlavniObrazek.src = "images/main-images/level01/Prazdno.jpg";
    }
    else if ((idMistnosti>=4 && idMistnosti<=5) || (!rozhodnuti && mistnost == 2)) {  //Peníze
        mistnost=2;
        hlavniObrazek.src = "images/main-images/level01/Prachy.jpg";
    }
    else if((idMistnosti==6) || (!rozhodnuti && mistnost==3)) {   //Nepřítel
        mistnost=3;
        hlavniObrazek.src = "images/main-images/level01/Nepritel.jpg";
    }
}

//Cestování

let vsechnyMista = [".main-game",".klub",".obchod",".postava"];
document.getElementById("obchodButton").onclick = function() {//OBCHOD
    JdiNa(".obchod","flex");
    //seznamMistnosti.style.backgroundImage = "url(images/other/shop-pozadi.png)";
}

let obchodTlacitka = document.querySelectorAll(".obchodButton");
obchodTlacitka.forEach(btn => {
    btn.addEventListener('click',function() {
        if (btn.id=="pivoButton") {
            if(penize>=10) {
                penize-=10;
                energie+=15;
            }
        }
        else if (btn.id=="pizzaButton") {
            if(penize>=20) {
                penize-=20;
                energie+=35;
            }
        }
        else if (btn.id=="kebabButton") {
            if(penize>=50) {
                penize-=50;
                energie+=100;
            }
        }
        if (energie>100) energie=100;

        AktualizujStaty();
    })
})

document.getElementById("uliceButton").onclick = function() {
    JdiNa(".main-game","block");
    //seznamMistnosti.style.backgroundImage = "url(images/other/mafia-pozadi.jpg)";
}

document.getElementById("postavaButton").onclick = function() {
    JdiNa(".postava","flex");
}

document.getElementById("klubButton").onclick = function() {
    JdiNa(".klub","flex");
}

function JdiNa(kam, styl) {
    console.log("jede se do "+kam);
    vsechnyMista.forEach(misto => {
        if (misto==kam) {
            document.querySelector(misto).style.display=styl;
        }
        else document.querySelector(misto).style.display='none';
    })
}