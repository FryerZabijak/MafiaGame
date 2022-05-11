import * as funkce from "./funkce.js";
import * as nastaveni from "./nastaveni.js";
import * as tooltips from "./tooltips.js";
import * as ceny from "./ceny.js";

let hlavniObrazek = document.getElementById("hlavniObrazek");
let mistnostCislo=1;
let mistnost = 1;
let penize = 20;
let energie = 100;
let level = 1;
let xp = 0;
let maxEnergie = energie;
let vsechnyCeny;

let prices = new ceny.Ceny(250,350,500);
let penizeOdDo= [1,10];

var vraceneHodnoty = nastaveni.NactiSave();
if (!isNaN(vraceneHodnoty["energie"])) {
    mistnost = vraceneHodnoty["mistnost"];
    penize = vraceneHodnoty["penize"];
    energie = vraceneHodnoty["energie"];
    mistnostCislo=vraceneHodnoty["mistnostCislo"];
    level = vraceneHodnoty["level"];
    xp = vraceneHodnoty["xp"];
    if (vraceneHodnoty["maxEnergie"]!=null)
    maxEnergie = vraceneHodnoty["maxEnergie"];
    vsechnyCeny = String(vraceneHodnoty["vsechnyCeny"]).split('!');
    if (vsechnyCeny!=null && !isNaN(vsechnyCeny)) {
    console.log(vsechnyCeny);
    prices = new ceny.Ceny(vsechnyCeny[0],vsechnyCeny[1],vsechnyCeny[2]);
    }
    console.log("místnost: "+mistnost+"\nPeníze: "+penize+"\nEnergie: "+energie);
    document.getElementById("levelLabel").innerText=level;
    console.log(maxEnergie);
    document.getElementById("energieProgress").max=maxEnergie;
}
else {
    tooltips.VypisZpravu("Zdarec kriminálníku","Chceš se stát nejrespektovanějším kriminálníkem v tomto zkorumpovaném městě?<br>Tak jsi na správném místě. Zadej, jak chceš aby si na ulici říkali a můžeš začít!<br>","Začít",false,"images/other/uvodni-zprava.jpg",false);
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
        penize+=funkce.VygenerujRandomCislo(penizeOdDo[0],penizeOdDo[1]);
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
        penize+=(50*level);
        document.getElementById("levelLabel").innerText=level;
    }
    document.getElementById("levelProgress").value=Math.floor(xp*2/level);
    document.getElementById("penizeLabel").innerText=penize;
    //document.getElementById("energieLabel").innerText=energie;
    document.getElementById("energieCislo").innerHTML=energie+"%";
    document.getElementById("energieProgress").value=energie;

    //Aktualizace Cookies
    nastaveni.UlozitCookies("mistnost",mistnost);
    nastaveni.UlozitCookies("penize",penize);
    nastaveni.UlozitCookies("energie",energie);
    nastaveni.UlozitCookies("mistnostCislo",mistnostCislo);
    nastaveni.UlozitCookies("level",level);
    nastaveni.UlozitCookies("xp",xp);
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
        hlavniObrazek.src = "images/main-images/level01/Prazdno2.jpg";
    }
    else if ((idMistnosti>=4 && idMistnosti<=5) || (!rozhodnuti && mistnost == 2)) {  //Peníze
        mistnost=2;
        hlavniObrazek.src = "images/main-images/level01/Prachy2.jpg";
    }
    else if((idMistnosti==6) || (!rozhodnuti && mistnost==3)) {   //Nepřítel
        mistnost=3;
        hlavniObrazek.src = "images/main-images/level01/Nepritel2.jpg";
    }
}

//Cestování
let multiplier;
let vsechnyMista = [".main-game",".klub",".obchod",".postava",".cernyTrh"];
document.getElementById("obchodButton").onclick = function() {//OBCHOD
    JdiNa(".obchod","flex");
    multiplier = 1+((Math.floor(mistnostCislo/50))/10);
    document.getElementById("pivoButtonPrice").innerHTML=Math.floor(Number(10*multiplier));
    document.getElementById("pizzaButtonPrice").innerHTML=Math.floor(Number(20*multiplier));
    document.getElementById("kebabButtonPrice").innerHTML=Math.floor(Number(50*multiplier));
    //seznamMistnosti.style.backgroundImage = "url(images/other/shop-pozadi.png)";
}

let obchodTlacitka = document.querySelectorAll(".obchodButton");
obchodTlacitka.forEach(btn => {
    btn.addEventListener('click',function() {
        console.log(multiplier);

        if (btn.id=="pivoButton") {
            if(penize>=10*multiplier && energie<maxEnergie) {
                penize-=(10*multiplier);
                energie+=15;
                if (energie>maxEnergie) energie=maxEnergie;
            }
        }
        else if (btn.id=="pizzaButton") {
            if(penize>=20*multiplier && energie<maxEnergie) {
                penize-=20*multiplier;
                energie+=35;
                if (energie>maxEnergie) energie=maxEnergie;
            }
        }
        else if (btn.id=="kebabButton") {
            if(penize>=50*multiplier && energie<maxEnergie) {
                penize-=50*multiplier;
                energie+=100;
                if (energie>maxEnergie) energie=maxEnergie;
            }
        }
        else if (btn.id=="lepsiPenezenkyButton") {
            if (penize>=prices.lepsiPenezenky) {
                penize-=prices.lepsiPenezenky;
                prices.lepsiPenezenky=Math.floor((prices.lepsiPenezenky*1.2));
                document.getElementById("lepsiPenezenkyButtonPrice").innerText=prices.lepsiPenezenky;
                penizeOdDo[0]+=5;
                penizeOdDo[1]+=5;
            }
        }
        else if (btn.id=="energieButton") {
            if (penize>=prices.energie) {
                penize-=prices.energie;
                prices.energie=Math.floor(prices.energie*1.1);
                maxEnergie+=50;
                document.getElementById("energieProgress").max=maxEnergie;
                document.getElementById("energieButtonPrice").innerText=prices.energie;
                nastaveni.UlozitCookies("maxEnergie",maxEnergie);
            }
        }
        else if (btn.id=="drogyButton") {
            if (penize>=prices.drogy && energie<750) {
                penize-=prices.drogy;
                prices.drogy=Math.floor(prices.drogy*1.1);
                document.getElementById("drogyButtonPrice").innerText=prices.drogy;
                energie=750;
            }
        }

        nastaveni.UlozitCookies("ceny",prices.drogy+"!"+prices.energie+"!"+prices.lepsiPenezenky);



        AktualizujStaty();
    })
})

document.getElementById("uliceButton").onclick = function() {
    JdiNa(".main-game","block");
    //seznamMistnosti.style.backgroundImage = "url(images/other/mafia-pozadi.jpg)";
}

document.getElementById("klubButton").onclick = function() {
    JdiNa(".klub","flex");
}

document.getElementById("postavaButton").onclick = function() {
    JdiNa(".postava","flex");
}

document.getElementById("cernyTrhButton").onclick = function() {
    JdiNa(".cernyTrh","flex");
    document.getElementById("lepsiPenezenkyButtonPrice").innerText=prices.lepsiPenezenky;
    document.getElementById("energieButtonPrice").innerText=prices.energie;
    document.getElementById("drogyButtonPrice").innerText=prices.drogy;
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