import * as funkce from "./funkce.js";
import * as nastaveni from "./nastaveni.js";
import * as tooltips from "./tooltips.js";
import * as ceny from "./ceny.js";

let hlavniObrazek = document.getElementById("hlavniObrazek");
let mistnostCislo = 1;
let mistnost = 1;
let penize = 20;
let energie = 100;
let level = 1;
let xp = 0;
let maxEnergie = energie;
let vsechnyCeny;

let zasazenaTrava=false;
let vydelanychPenez = 0;
let zabitychNepratel = 0;

document.getElementById("hudba").volume=0.05;
document.getElementById("hudba").currentTime = funkce.VygenerujRandomCislo(0,(41*60));
document.getElementById("hudba").loop=true;

let prices = new ceny.Ceny(400, 450, 500);
let penizeOdDo = [1, 10];

var vraceneHodnoty = nastaveni.NactiSave();
if (!isNaN(vraceneHodnoty["energie"])) {
    mistnost = vraceneHodnoty["mistnost"];
    penize = vraceneHodnoty["penize"];
    energie = vraceneHodnoty["energie"];
    mistnostCislo = vraceneHodnoty["mistnostCislo"];
    level = vraceneHodnoty["level"];
    xp = vraceneHodnoty["xp"];
    if (vraceneHodnoty["maxEnergie"] != null)
        maxEnergie = vraceneHodnoty["maxEnergie"];
    vsechnyCeny = String(vraceneHodnoty["vsechnyCeny"]).split('!');
    if (vsechnyCeny != null && !isNaN(vsechnyCeny)) {
        console.log(vsechnyCeny);
        prices = new ceny.Ceny(vsechnyCeny[0], vsechnyCeny[1], vsechnyCeny[2]);
    }

    if(vraceneHodnoty["vydelanychPenez"]!=null && !isNaN(vraceneHodnoty["vydelanychPenez"])) {
    vydelanychPenez = vraceneHodnoty["vydelanychPenez"];
    zabitychNepratel = vraceneHodnoty["zabitychnepratel"];
    }

    if(vraceneHodnoty["zasazenaTrava"]!=null && !isNaN(vraceneHodnoty["zasazenaTrava"])) zasazenaTrava = vraceneHodnoty["zasazenaTrava"];

    console.log(zasazenaTrava);

    console.log("místnost: " + mistnost + "\nPeníze: " + penize + "\nEnergie: " + energie);
    document.getElementById("levelLabel").innerText = level;
    console.log(maxEnergie);
    document.getElementById("energieProgress").max = maxEnergie;
}
else {
    tooltips.VypisZpravu("Zdarec kriminálníku", "Chceš se stát nejrespektovanějším kriminálníkem v tomto zkorumpovaném městě?<br>Tak jsi na správném místě.", "Začít", false, "images/other/uvodni-zprava.jpg", false);
}

AktualizujMistnost(false);
AktualizujStaty();

//  HRACÍ TLAČÍTKA - START
let hraciTlacitka = document.querySelectorAll(".hraci-tlacitko");
hraciTlacitka.forEach(btn => {
    btn.addEventListener('click', function () {
        if (energie > 0) {
            if (btn.id == "projitButton") {
                Projit();
            }
            else if (btn.id == "sebratButton") {
                Sebrat();
            }
            else if (btn.id = "utocitButton") {
                Utocit();
            }
        }
    })
})

function Sebrat() {
    if (mistnost == 1) {  //Prázdná místnost
        energie -= 10;
    }
    else if (mistnost == 2) { //Prachy
        let vydelek = funkce.VygenerujRandomCislo(penizeOdDo[0], penizeOdDo[1]);
        nastaveni.UlozitCookies("vydelek",vydelek);
        penize += vydelek;
        vydelanychPenez+=vydelek;
        xp += 2;
    }
    else if (mistnost == 3) { //Nepřítel
        energie -= 20;
    }
    AktualizujMistnost(true);
}

function Projit() {
    if (mistnost == 1) {  //Prázdná místnost
        energie -= 5;
        xp += 1;
    }
    else if (mistnost == 2) { //Prachy
        energie -= 10;
    }
    else if (mistnost == 3) { //Nepřítel
        energie -= 20;
    }
    AktualizujMistnost(true);
}

function Utocit() {
    if (mistnost == 1) {  //Prázdná místnost
        energie -= 15;
    }
    else if (mistnost == 2) { //Prachy
        energie -= 15;
    }
    else if (mistnost == 3) { //Nepřítel
        energie -= 10;
        if (funkce.VygenerujRandomCislo(1, 3) == 2) {
            let vydelek = funkce.VygenerujRandomCislo(penizeOdDo[0]/5, penizeOdDo[1]/5);
            nastaveni.UlozitCookies("vydelek",vydelek);
            penize += vydelek;
            vydelanychPenez+=vydelek;
        }
        xp += 2;
        zabitychNepratel++;
        nastaveni.UlozitCookies("zabitychNepratel",zabitychNepratel);
    }
    AktualizujMistnost(true);
}
//  HRACÍ TLAČÍTKA - KONEC


let buttons = document.querySelectorAll("button"); //Při každém kliknutí tlačítka aktualizuje staty a uloží cookies
buttons.forEach(btn => {
    btn.addEventListener('click', function () {
        AktualizujStaty();          //Aktualizace statů
        console.log("Klikls na " + btn.innerHTML);    //Consolový výpis pro vývojáře
    })
})

export function AktualizujStaty() {        //Aktualizuje staty a uloží cookies
    //Aktualizace statů
    if (energie < 0) energie = 0;
    if (xp >= level * 50) {
        var xpNavic = xp - (level * 50);
        xp = xpNavic;
        level++;
        penize += (50 * level);
        document.getElementById("levelLabel").innerText = level;
    }
    document.getElementById("levelProgress").value = Math.floor(xp * 2 / level);
    penize = Math.ceil(penize);
    document.getElementById("penizeLabel").innerText = penize;
    //document.getElementById("energieLabel").innerText=energie;
    document.getElementById("energieCislo").innerHTML = energie + "%";
    document.getElementById("energieProgress").value = energie;

    //Aktualizace Cookies
    nastaveni.UlozitCookies("mistnost", mistnost);
    nastaveni.UlozitCookies("penize", penize);
    nastaveni.UlozitCookies("energie", energie);
    nastaveni.UlozitCookies("mistnostCislo", mistnostCislo);
    nastaveni.UlozitCookies("level", level);
    nastaveni.UlozitCookies("xp", xp);
}

export function AktualizujMistnost(rozhodnuti) {//True - Aktualizuje NOVOU místnost; False - pouze znovu načte obrázek
    let idMistnosti;
    if (rozhodnuti) {
        idMistnosti = funkce.VygenerujRandomCislo(1, 6);
        mistnostCislo++;
    }
    document.getElementById("mistnostPocetLabel").innerText = "Ulice #" + mistnostCislo;

    if ((idMistnosti >= 1 && idMistnosti <= 3) || (!rozhodnuti && mistnost == 1)) //Prázdná místnost
    {
        mistnost = 1;
        hlavniObrazek.src = "images/main-images/level01/Prazdno2.jpg";
    }
    else if ((idMistnosti >= 4 && idMistnosti <= 5) || (!rozhodnuti && mistnost == 2)) {  //Peníze
        mistnost = 2;
        hlavniObrazek.src = "images/main-images/level01/Prachy2.jpg";
    }
    else if ((idMistnosti == 6) || (!rozhodnuti && mistnost == 3)) {   //Nepřítel
        mistnost = 3;
        hlavniObrazek.src = "images/main-images/level01/Nepritel2.jpg";
    }
}

//Cestování
let multiplier;
let vsechnyMista = [".main-game", ".klub", ".obchod", ".postava", ".cernyTrh",".byt"];
document.getElementById("obchodButton").onclick = function () {//OBCHOD
    JdiNa(".obchod", "flex");
    multiplier = 1 + ((Math.floor(mistnostCislo / 50)) / 10);
    document.getElementById("pivoButtonPrice").innerHTML = Math.floor(Number(10 * multiplier));
    document.getElementById("pizzaButtonPrice").innerHTML = Math.floor(Number(20 * multiplier));
    document.getElementById("kebabButtonPrice").innerHTML = Math.floor(Number(50 * multiplier));
    //seznamMistnosti.style.backgroundImage = "url(images/other/shop-pozadi.png)";
}

let obchodTlacitka = document.querySelectorAll(".obchodButton");
obchodTlacitka.forEach(btn => {
    btn.addEventListener('click', function () {
        console.log(multiplier);

        if (btn.id == "pivoButton") {
            if (penize >= 10 * multiplier && energie < maxEnergie) {
                penize -= (10 * multiplier);
                energie += 15;
                if (energie > maxEnergie) energie = maxEnergie;
            }
        }
        else if (btn.id == "pizzaButton") {
            if (penize >= 20 * multiplier && energie < maxEnergie) {
                penize -= 20 * multiplier;
                energie += 35;
                if (energie > maxEnergie) energie = maxEnergie;
            }
        }
        else if (btn.id == "kebabButton") {
            if (penize >= 50 * multiplier && energie < maxEnergie) {
                penize -= 50 * multiplier;
                energie += 100;
                if (energie > maxEnergie) energie = maxEnergie;
            }
        }
        else if (btn.id == "lepsiPenezenkyButton") {
            if (penize >= prices.lepsiPenezenky) {
                penize -= prices.lepsiPenezenky;
                prices.lepsiPenezenky = Math.floor((prices.lepsiPenezenky * 1.2));
                document.getElementById("lepsiPenezenkyButtonPrice").innerText = prices.lepsiPenezenky;
                penizeOdDo[0] += 5;
                penizeOdDo[1] += 5;
            }
        }
        else if (btn.id == "energieButton") {
            if (penize >= prices.energie) {
                penize -= prices.energie;
                prices.energie = Math.floor(prices.energie * 1.1);
                maxEnergie += 50;
                document.getElementById("energieProgress").max = maxEnergie;
                document.getElementById("energieButtonPrice").innerText = prices.energie;
                nastaveni.UlozitCookies("maxEnergie", maxEnergie);
            }
        }
        else if (btn.id == "drogyButton") {
            if (penize >= prices.drogy && energie < 750) {
                penize -= prices.drogy;
                prices.drogy = Math.floor(prices.drogy * 1.1);
                document.getElementById("drogyButtonPrice").innerText = prices.drogy;
                energie = 750;
            }
        }

        nastaveni.UlozitCookies("ceny", prices.drogy + "!" + prices.energie + "!" + prices.lepsiPenezenky);



        AktualizujStaty();
    })
})

document.getElementById("uliceButton").onclick = function () {
    JdiNa(".main-game", "block");
    //seznamMistnosti.style.backgroundImage = "url(images/other/mafia-pozadi.jpg)";
}

document.getElementById("klubButton").onclick = function () {
    JdiNa(".klub", "flex");
}

document.getElementById("postavaButton").onclick = function () {
    JdiNa(".postava", "flex");
    document.getElementById("playersLevel").innerText=level;
    document.getElementById("zabitychNepratelLabel").innerText=zabitychNepratel;
    document.getElementById("vydelanychPenezLabel").innerText=vydelanychPenez;
    document.getElementById("projetychMistnostiLabel").innerText=mistnostCislo;
}

document.getElementById("cernyTrhButton").onclick = function () {
    JdiNa(".cernyTrh", "flex");
    document.getElementById("lepsiPenezenkyButtonPrice").innerText = prices.lepsiPenezenky;
    document.getElementById("energieButtonPrice").innerText = prices.energie;
    document.getElementById("drogyButtonPrice").innerText = prices.drogy;
}

document.getElementById("bytButton").onclick = function() {
    JdiNa(".byt", "flex");

    if (typeof zasazenaTrava=="boolean" && zasazenaTrava==false) document.getElementById("travaCasLabel").style.visibility="hidden";
    
    let adresa = travaImg.src.split('/');
    if(Number(zasazenaTrava)>0 && adresa[adresa.length-1]=="trava-none.jpg") {
        ZacniPestovat();
    }
}

const travaImg = document.getElementById("travaImg");
const travaButton = document.getElementById("travaButton");

let interval;
let minuty;
let sekundy;

document.getElementById("bytButton").addEventListener("mouseover",function() {
    if(typeof zasazenaTrava=="number") {
        console.log("JOJO");
        document.getElementById("bytButton").innerText=minuty+":"+sekundy;
        if (sekundy<10) document.getElementById("bytButton").innerText=minuty+":0"+sekundy;
        interval = setInterval(function() {
            document.getElementById("bytButton").innerText=minuty+":"+sekundy;
        if (sekundy<10) document.getElementById("bytButton").innerText=minuty+":0"+sekundy;

        if(minuty<0) {
            document.getElementById("bytButton").innerText="Hotovo";
            clearInterval(interval);
        }
        },1000);
    }
})

document.getElementById("bytButton").addEventListener("mouseout",function() {
    clearInterval(interval);
    document.getElementById("bytButton").innerText="Byt";


})



document.getElementById("travaButton").onclick = function() {
    console.log(zasazenaTrava);

    if (typeof zasazenaTrava=="number" && zasazenaTrava==0) {   //Tráva je vyrostlá
        travaImg.src="images/main-images/byt/trava-none.jpg";
        travaButton.innerText="Zasadit Trávu";
        penize+=level*50;
        console.log("EHOY");
        AktualizujStaty();
        zasazenaTrava=false;
        document.getElementById("travaCasLabel").style.visibility="hidden";
    }
    else if (typeof zasazenaTrava=="boolean" && zasazenaTrava==false) { //Tráva není zasazená
        zasazenaTrava=60*45;
        ZacniPestovat();
    }
}

function ZacniPestovat() {
    let puvodniCas = zasazenaTrava;
    minuty = Math.floor(zasazenaTrava/60);
    sekundy = zasazenaTrava%60;
    document.getElementById("travaCasLabel").style.visibility="visible";
    travaImg.src="images/main-images/byt/trava-start.jpg";
    travaButton.innerText="Sklidit Trávu";
    let interval = setInterval(function() {
        document.getElementById("travaCasLabel").innerText=minuty+":"+sekundy;
        if (sekundy<10) document.getElementById("travaCasLabel").innerText=minuty+":0"+sekundy;

        sekundy--;
        if (sekundy<=0) {
            sekundy=59;
            minuty--;
        }
      zasazenaTrava--;
        if(zasazenaTrava<(puvodniCas)/2) travaImg.src="images/main-images/byt/trava-half.jpg";
        if(zasazenaTrava<=0) 
        {
            document.getElementById("travaCasLabel").innerText="00:00";
            travaImg.src="images/main-images/byt/trava-full.jpg";
            clearInterval(interval);
        }
        nastaveni.UlozitCookies("zasazenaTrava",zasazenaTrava);
    },1000)
}


function JdiNa(kam, styl) {
    console.log("jede se do " + kam);
    vsechnyMista.forEach(misto => {
        if (misto == kam) {
            document.querySelector(misto).style.display = styl;
        }
        else document.querySelector(misto).style.display = 'none';
    })
}
