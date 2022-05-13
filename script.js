/*
#### ##     ## ########   #######  ########  ######## ##    ## 
 ##  ###   ### ##     ## ##     ## ##     ##    ##     ##  ##  
 ##  #### #### ##     ## ##     ## ##     ##    ##      ####   
 ##  ## ### ## ########  ##     ## ########     ##       ##    
 ##  ##     ## ##        ##     ## ##   ##      ##       ##    
 ##  ##     ## ##        ##     ## ##    ##     ##       ##    
#### ##     ## ##         #######  ##     ##    ##       ##    
*/

import * as funkce from "./funkce.js";
import * as nastaveni from "./nastaveni.js";
import * as tooltips from "./tooltips.js";
import * as ceny from "./ceny.js";

/*

########  ########   #######  ##     ## ######## ##    ## ##    ## ######## 
##     ## ##     ## ##     ## ###   ### ##       ###   ## ###   ## ##       
##     ## ##     ## ##     ## #### #### ##       ####  ## ####  ## ##       
########  ########  ##     ## ## ### ## ######   ## ## ## ## ## ## ######   
##        ##   ##   ##     ## ##     ## ##       ##  #### ##  #### ##       
##        ##    ##  ##     ## ##     ## ##       ##   ### ##   ### ##       
##        ##     ##  #######  ##     ## ######## ##    ## ##    ## ######## 
*/


let hlavniObrazek = document.getElementById("hlavniObrazek");
let mistnostCislo = 1;
let mistnost = 1;
let penize = 20;
let energie = 100;
let level = 1;
let xp = 0;
let maxEnergie = energie;
let vsechnyCeny;

let zasazenaTrava = false;
let interval;
let minuty;
let sekundy;
const travaImg = document.getElementById("travaImg");
const travaButton = document.getElementById("travaButton");

let penizeOdDo = [1, 10];
let vydelanychPenez = Number(0);
let zabitychNepratel = 0;
let poskozeni = 1;
let zbrane = ["Nic", "Baseballová Pálka", "Nůž", "Colt", "Samopal", "Brokovnice", "Útočná Puška", "Sniperka", "Raketomet", "Minigun", "Avadakedavra"];
let zivotyNepratel;
let zivoty;
let zivotyNacteny = false;

const zivotyNepratelProgress = document.getElementById("zivotyNepratel");
const zivotyNepratelMaxLabel = document.getElementById("zivotyNepratelMax");
const zivotyNepratelNowLabel = document.getElementById("zivotyNepratelNow");

/*
##        #######     ###    ########  ######## ########  
##       ##     ##   ## ##   ##     ## ##       ##     ## 
##       ##     ##  ##   ##  ##     ## ##       ##     ## 
##       ##     ## ##     ## ##     ## ######   ########  
##       ##     ## ######### ##     ## ##       ##   ##   
##       ##     ## ##     ## ##     ## ##       ##    ##  
########  #######  ##     ## ########  ######## ##     ## 
*/

var loader = document.getElementById("loader");
var zprava = false;
if (nastaveni.NactiCookies("loader")) loader.style.display = "none";

window.addEventListener("load", function () {
    var imgs = document.querySelectorAll(".loader-loading-img");
    imgs.forEach(img => {
        img.style.display = "none";
    })
    document.getElementById("playButton").style.display = "block";
    document.querySelector(".loader-loading").style.backgroundColor = "#000000";
})

document.getElementById("playButton").onclick = function () {
    loader.style.animation = "HideOpacity 1.5s ease-in forwards";
    if (zprava == false) {
        setTimeout(function () {
            loader.style.display = "none";
            nastaveni.UlozitCookiesNaCas("loader", true, 1);
            if (isNaN(vraceneHodnoty["energie"])) {
                tooltips.VypisZpravu("Zdarec kriminálníku", "Chceš se stát nejrespektovanějším kriminálníkem v tomto zkorumpovaném městě?<br>Tak jsi na správném místě.", "Začít", false, "images/other/uvodni-zprava.jpg", false);
            }
        }, 1500);
        zprava = true;
    }
}

/*
##     ## ##     ## ########  ########     ###    
##     ## ##     ## ##     ## ##     ##   ## ##   
##     ## ##     ## ##     ## ##     ##  ##   ##  
######### ##     ## ##     ## ########  ##     ## 
##     ## ##     ## ##     ## ##     ## ######### 
##     ## ##     ## ##     ## ##     ## ##     ## 
##     ##  #######  ########  ########  ##     ## 
*/

document.getElementById("hudba").volume = 0.05;
document.getElementById("hudba").currentTime = funkce.VygenerujRandomCislo(0, (41 * 60));
document.getElementById("hudba").loop = true;

/*

 ######  ######## ##    ## ##    ##     ######  ######## ########  ##     ## 
##    ## ##       ###   ##  ##  ##     ##    ##    ##    ##     ## ##     ## 
##       ##       ####  ##   ####      ##          ##    ##     ## ##     ## 
##       ######   ## ## ##    ##       ##          ##    ########  ######### 
##       ##       ##  ####    ##       ##          ##    ##   ##   ##     ## 
##    ## ##       ##   ###    ##       ##    ##    ##    ##    ##  ##     ## 
 ######  ######## ##    ##    ##        ######     ##    ##     ## ##     ## 
*/
let prices = new ceny.Ceny(300, 350, 400);


/*
 ######     ###    ##     ## ######## 
##    ##   ## ##   ##     ## ##       
##        ##   ##  ##     ## ##       
 ######  ##     ## ##     ## ######   
      ## #########  ##   ##  ##       
##    ## ##     ##   ## ##   ##       
 ######  ##     ##    ###    ######## 
*/
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
        prices = new ceny.Ceny(vsechnyCeny[0], vsechnyCeny[1], vsechnyCeny[2]);
    }
    console.log(vraceneHodnoty["vydelanychPenez"]);
    if (JeValidni(vraceneHodnoty["vydelanychPenez"])) {
        vydelanychPenez = Number(vraceneHodnoty["vydelanychPenez"]);
    }
    console.log(vraceneHodnoty["zabitychNepratel"]);
    if (JeValidni(vraceneHodnoty["zabitychNepratel"])) {
        zabitychNepratel = vraceneHodnoty["zabitychNepratel"];
        console.log(zabitychNepratel);
    }

    if (JeValidni(vraceneHodnoty["zasazenaTrava"])) {
        zasazenaTrava = vraceneHodnoty["zasazenaTrava"];
        ZacniPestovat();
    }
    if (JeValidni(vraceneHodnoty["zivotyNepratel"])) {
        zivotyNepratel = vraceneHodnoty["zivotyNepratel"]
        zivoty = vraceneHodnoty["zivotyNepratelMax"];
        zivotyNacteny = true;
    }

    if (vraceneHodnoty["penizeOdDo"] != null) {
        let prachy = vraceneHodnoty["penizeOdDo"].split('!');
        penizeOdDo[0] = prachy[0];
        penizeOdDo[1] = prachy[1];
    }

    if (JeValidni(vraceneHodnoty["poskozeni"])) {
        poskozeni = vraceneHodnoty["poskozeni"];
    }

    console.log("místnost: " + mistnost + "\nPeníze: " + penize + "\nEnergie: " + energie);
    document.getElementById("levelLabel").innerText = level;
    document.getElementById("energieProgress").max = maxEnergie;
}


function JeValidni(co) {
    return (co != null && !isNaN(co) && typeof co != "undefined");
}

AktualizujMistnost(false);
AktualizujStaty();

/*
##     ## ########     ###     ######  ####    ######## ##       
##     ## ##     ##   ## ##   ##    ##  ##        ##    ##       
##     ## ##     ##  ##   ##  ##        ##        ##    ##       
######### ########  ##     ## ##        ##        ##    ##       
##     ## ##   ##   ######### ##        ##        ##    ##       
##     ## ##    ##  ##     ## ##    ##  ##        ##    ##       
##     ## ##     ## ##     ##  ######  ####       ##    ######## 
*/

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
        let vydelek = funkce.VygenerujRandomCislo(Number(penizeOdDo[0]), penizeOdDo[1]);
        penize += vydelek;
        vydelanychPenez += vydelek;
        xp += 2;
        nastaveni.UlozitCookies("vydelanychPenez", vydelanychPenez);
    }
    else if (mistnost == 3) { //Nepřítel
        energie -= 20;
    }

    if (zivotyNepratel <= 0 || isNaN(zivotyNepratel)) AktualizujMistnost(true);
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
    if (zivotyNepratel <= 0 || isNaN(zivotyNepratel)) AktualizujMistnost(true);
}

function Utocit() {
    if (mistnost == 1) {  //Prázdná místnost
        energie -= 15;
    }
    else if (mistnost == 2) { //Prachy
        energie -= 15;
    }
    else if (mistnost == 3) { //Nepřítel
        zivotyNepratel -= poskozeni;
        zivotyNepratelProgress.value = zivotyNepratel;
        zivotyNepratelNowLabel.innerText = zivotyNepratel;
        nastaveni.UlozitCookies("zivotyNepratel", zivotyNepratel);
        if (zivotyNepratel <= 0) {
            document.getElementById("zivotyNepratelP").style.visibility = "hidden";
            zivotyNepratelProgress.style.visibility = "hidden";
            zivotyNepratel = 0;
        }
        energie -= 10;
        xp += 2;
        zabitychNepratel++;
        nastaveni.UlozitCookies("zabitychNepratel", zabitychNepratel);
    }

    if (zivotyNepratel <= 0 || isNaN(zivotyNepratel)) {
        AktualizujMistnost(true);

        if (funkce.VygenerujRandomCislo(1, 3) == 2) {
            let vydelek = funkce.VygenerujRandomCislo(Number(penizeOdDo[0]) / 2, penizeOdDo[1] / 2);
            penize += vydelek;
            vydelanychPenez += vydelek;
            nastaveni.UlozitCookies("vydelanychPenez", vydelanychPenez);
        }
    }
}
//  HRACÍ TLAČÍTKA - KONEC


let buttons = document.querySelectorAll("button"); //Při každém kliknutí tlačítka aktualizuje staty a uloží cookies
buttons.forEach(btn => {
    btn.addEventListener('click', function () {
        AktualizujStaty();          //Aktualizace statů
        console.log("Klikls na " + btn.innerHTML);    //Consolový výpis pro vývojáře
    })
})

/*
   ###    ##    ## ########     ######  ########    ###    ########  ######  
  ## ##   ##   ##     ##       ##    ##    ##      ## ##      ##    ##    ## 
 ##   ##  ##  ##      ##       ##          ##     ##   ##     ##    ##       
##     ## #####       ##        ######     ##    ##     ##    ##     ######  
######### ##  ##      ##             ##    ##    #########    ##          ## 
##     ## ##   ##     ##       ##    ##    ##    ##     ##    ##    ##    ## 
##     ## ##    ##    ##        ######     ##    ##     ##    ##     ######  
*/

export function AktualizujStaty() {        //Aktualizuje staty a uloží cookies
    //Aktualizace statů
    if (energie < 0) energie = 0;
    if (xp >= level * 50) {
        var xpNavic = xp - (level * 50);
        xp = xpNavic;
        level++;
        penize += (50 * level);
        vydelanychPenez += (50 * level);
        nastaveni.UlozitCookies("vydelanychPenez", vydelanychPenez);
        document.getElementById("levelLabel").innerText = level;
    }
    document.getElementById("levelProgress").value = Math.floor(xp * 2 / level);
    penize = Math.round(penize);
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

/*
   ###    ##    ## ########    ########   #######   #######  ##     ## 
  ## ##   ##   ##     ##       ##     ## ##     ## ##     ## ###   ### 
 ##   ##  ##  ##      ##       ##     ## ##     ## ##     ## #### #### 
##     ## #####       ##       ########  ##     ## ##     ## ## ### ## 
######### ##  ##      ##       ##   ##   ##     ## ##     ## ##     ## 
##     ## ##   ##     ##       ##    ##  ##     ## ##     ## ##     ## 
##     ## ##    ##    ##       ##     ##  #######   #######  ##     ## 
*/


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

        let algoritmusZivotyNepratel = 1 + (Math.floor(level / 3));

        if (zivotyNacteny == false) {
            zivoty = funkce.VygenerujRandomCislo(Math.ceil(algoritmusZivotyNepratel / 3), algoritmusZivotyNepratel);
        }
        zivotyNacteny = false;
        nastaveni.UlozitCookies("zivotyNepratelMax", zivoty);

        if (nastaveni.NactiCookies("zivotyNepratel") == null || zivotyNepratel <= 0)
            zivotyNepratel = zivoty;

        document.getElementById("zivotyNepratelP").style.visibility = "visible";
        zivotyNepratelMaxLabel.innerText = zivoty;
        zivotyNepratelNowLabel.innerText = zivotyNepratel;
        zivotyNepratelProgress.max = zivoty;
        zivotyNepratelProgress.value = zivotyNepratel;
        zivotyNepratelProgress.style.visibility = "visible";

        mistnost = 3;
        hlavniObrazek.src = "images/main-images/level01/Nepritel2.jpg";
    }
}

/*
 #######  ########   ######  ##     ##  #######  ########  
##     ## ##     ## ##    ## ##     ## ##     ## ##     ## 
##     ## ##     ## ##       ##     ## ##     ## ##     ## 
##     ## ########  ##       ######### ##     ## ##     ## 
##     ## ##     ## ##       ##     ## ##     ## ##     ## 
##     ## ##     ## ##    ## ##     ## ##     ## ##     ## 
 #######  ########   ######  ##     ##  #######  ########  
 */
//Cestování
let multiplier;

document.getElementById("obchodButton").onclick = function () {//OBCHOD
    JdiNa(".obchod", "flex");
    multiplier = 1 + ((Math.floor(mistnostCislo / 50)) / 10);
    document.getElementById("pivoButtonPrice").innerHTML = Math.floor(Number(5 * multiplier));
    document.getElementById("pizzaButtonPrice").innerHTML = Math.floor(Number(10 * multiplier));
    document.getElementById("kebabButtonPrice").innerHTML = Math.floor(Number(25 * multiplier));
    //seznamMistnosti.style.backgroundImage = "url(images/other/shop-pozadi.png)";
}


let obchodTlacitka = document.querySelectorAll(".obchodButton");
obchodTlacitka.forEach(btn => {
    btn.addEventListener('click', function () {

        if (btn.id == "pivoButton") {
            if (penize >= 5 * multiplier && energie < maxEnergie) {
                penize -= (5 * multiplier);
                energie += 15;
                if (energie > maxEnergie) energie = maxEnergie;
            }
        }
        else if (btn.id == "pizzaButton") {
            if (penize >= 10 * multiplier && energie < maxEnergie) {
                penize -= 10 * multiplier;
                energie += 35;
                if (energie > maxEnergie) energie = maxEnergie;
            }
        }
        else if (btn.id == "kebabButton") {
            if (penize >= 25 * multiplier && energie < maxEnergie) {
                penize -= 25 * multiplier;
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
                nastaveni.UlozitCookies("penizeOdDo", penizeOdDo[0] + "!" + penizeOdDo[1]);
                nastaveni.UlozitCookies("prices", prices.vratHodnoty());
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
                nastaveni.UlozitCookies("prices", ceny.vratHodnoty());
            }
        }
        else if (btn.id == "drogyButton") {
            if (penize >= prices.drogy && energie < 750) {
                penize -= prices.drogy;
                prices.drogy = Math.floor(prices.drogy * 1.1);
                document.getElementById("drogyButtonPrice").innerText = prices.drogy;
                energie = 750;
                nastaveni.UlozitCookies("prices", ceny.vratHodnoty());
            }
        }
        else if (btn.id == "koupitZbranButton") {
            let cenaZbrane = ((poskozeni * 300) - 150);
            if (penize >= cenaZbrane) {
                penize -= cenaZbrane;
                poskozeni++;
                cenaZbrane = ((poskozeni * 300) - 150);
                nastaveni.UlozitCookies("poskozeni", poskozeni);
                AktualizujZbrane();
            }
        }

        nastaveni.UlozitCookies("ceny", prices.drogy + "!" + prices.energie + "!" + prices.lepsiPenezenky);



        AktualizujStaty();
    })
})

/*
##     ## ##       ####  ######  ######## 
##     ## ##        ##  ##    ## ##       
##     ## ##        ##  ##       ##       
##     ## ##        ##  ##       ######   
##     ## ##        ##  ##       ##       
##     ## ##        ##  ##    ## ##       
 #######  ######## ####  ######  ######## 
*/

document.getElementById("uliceButton").onclick = function () {
    JdiNa(".main-game", "block");
    //seznamMistnosti.style.backgroundImage = "url(images/other/mafia-pozadi.jpg)";
}

/*
##    ## ##       ##     ## ########  
##   ##  ##       ##     ## ##     ## 
##  ##   ##       ##     ## ##     ## 
#####    ##       ##     ## ########  
##  ##   ##       ##     ## ##     ## 
##   ##  ##       ##     ## ##     ## 
##    ## ########  #######  ########  
*/

document.getElementById("klubButton").onclick = function () {
    JdiNa(".klub", "flex");
}
/*
########   #######   ######  ########    ###    ##     ##    ###    
##     ## ##     ## ##    ##    ##      ## ##   ##     ##   ## ##   
##     ## ##     ## ##          ##     ##   ##  ##     ##  ##   ##  
########  ##     ##  ######     ##    ##     ## ##     ## ##     ## 
##        ##     ##       ##    ##    #########  ##   ##  ######### 
##        ##     ## ##    ##    ##    ##     ##   ## ##   ##     ## 
##         #######   ######     ##    ##     ##    ###    ##     ## 
*/

document.getElementById("postavaButton").onclick = function () {
    JdiNa(".postava", "flex");
    document.getElementById("playersLevel").innerText = level;
    document.getElementById("zabitychNepratelLabel").innerText = zabitychNepratel;
    document.getElementById("vydelanychPenezLabel").innerText = vydelanychPenez;
    document.getElementById("projetychMistnostiLabel").innerText = mistnostCislo;
    document.getElementById("vlastnenaZbranLabel").innerText = zbrane[poskozeni - 1] + " (Poškození: " + poskozeni + ")";
}
/*
 ######      ######## ########  ##     ## 
##    ##        ##    ##     ## ##     ## 
##              ##    ##     ## ##     ## 
##              ##    ########  ######### 
##              ##    ##   ##   ##     ## 
##    ## ###    ##    ##    ##  ##     ## 
 ######  ###    ##    ##     ## ##     ## 
*/

document.getElementById("cernyTrhButton").onclick = function () {
    JdiNa(".cernyTrh", "flex");
    document.getElementById("lepsiPenezenkyButtonPrice").innerText = prices.lepsiPenezenky;
    document.getElementById("energieButtonPrice").innerText = prices.energie;
    document.getElementById("drogyButtonPrice").innerText = prices.drogy;
}
/*
########  ##    ## ######## 
##     ##  ##  ##     ##    
##     ##   ####      ##    
########     ##       ##    
##     ##    ##       ##    
##     ##    ##       ##    
########     ##       ##    
*/



document.getElementById("bytButton").onclick = function () {     //Jít do bytu
    JdiNa(".byt", "flex");

    if (typeof zasazenaTrava == "boolean" && zasazenaTrava == false) document.getElementById("travaCasLabel").style.visibility = "hidden";    //Pokud není zasazená tráva, nezobrazí se čas

    let adresa = travaImg.src.split('/');       //Cesta k SRC obrázku
    if (typeof zasazenaTrava != "boolean" && adresa[adresa.length - 1] == "trava-none.jpg") {  //Pokud scr obrázku je žádná trává a přitom by se měla pěstovat
        ZacniPestovat();    //začíná se pěstovat
    }
}

document.getElementById("bytButton").addEventListener("mouseover", function () {      //Najede se na byt myší, zobrazí se čas pěstování
    if (typeof zasazenaTrava == "number" && minuty > 0) {
        document.getElementById("bytButton").innerText = minuty + ":" + sekundy;
        if (sekundy < 10) document.getElementById("bytButton").innerText = minuty + ":0" + sekundy;
        interval = setInterval(function () {
            document.getElementById("bytButton").innerText = minuty + ":" + sekundy;
            if (sekundy < 10) document.getElementById("bytButton").innerText = minuty + ":0" + sekundy;

            if (minuty < 0) {
                document.getElementById("bytButton").innerText = "Hotovo";
                clearInterval(interval);
            }
        }, 1000);
    }
})

document.getElementById("bytButton").addEventListener("mouseout", function () {       //Zmizne čas pěstování pokud myš pujde pryč
    clearInterval(interval);
    document.getElementById("bytButton").innerText = "Byt";


})



document.getElementById("travaButton").onclick = function () {       //Stisknutí na pěstování/sklizení trávy
    if (typeof zasazenaTrava == "number" && zasazenaTrava <= 0) {   //Tráva je vyrostlá
        travaImg.src = "images/main-images/byt/trava-none.jpg";   //Nastaví se obrázek na ŽÁDNÁ TRÁVA
        travaButton.innerText = "Zasadit Trávu";                  //Změní se text tlačítka "Zasadit Trávu"
        penize += level * 50;                                       //Přibudou peníze v hodnotě 50*LEVEL
        AktualizujStaty();                                      //Aktualizace Statů
        zasazenaTrava = false;                                    //Tráva pestovani je false
        document.getElementById("travaCasLabel").style.visibility = "hidden"; //Zmizne čas
        nastaveni.UlozitCookies("zasazenaTrava", zasazenaTrava);
    }
    else if (typeof zasazenaTrava == "boolean" && zasazenaTrava == false) { //Tráva není zasazená
        zasazenaTrava = 60 * 10;                                            //10 Minut pěstování
        ZacniPestovat();
    }
}

function ZacniPestovat() {
    //let puvodniCas = zasazenaTrava;         //Uložíme si původní čas (sekundy), aby jsme věděli v jaké fázi růstu tráva je
    minuty = Math.floor(zasazenaTrava / 60);  //  Sekundy/60=minuty
    sekundy = zasazenaTrava % 60;             // Zbytek jsou sekundy
    document.getElementById("travaCasLabel").style.visibility = "visible";        //Zobrazí se časovač
    travaImg.src = "images/main-images/byt/trava-start.jpg";                      //Obrázek startu pěstování
    travaButton.innerText = "Sklidit Trávu";                                      //Text tlačítka - Sklidit trávu
    let interval = setInterval(function () {
        document.getElementById("travaCasLabel").innerText = minuty + ":" + sekundy;  //Aktualizace časovače
        if (sekundy < 10) document.getElementById("travaCasLabel").innerText = minuty + ":0" + sekundy; //Pokud v sekundách je jenom jedno číslo, tak místo toho aby se zobrazilo např(5:7), tak se zobrazí (5:07)

        sekundy--;                  //Odečet sekundy za jeden interval
        if (sekundy < 0) {            //Pokud sekundy jsou pod nulu tak se nastaví na 59 a odečte se jedna minuta
            sekundy = 59;
            minuty--;
        }
        zasazenaTrava--;              //Sekunda pro pěstování trávy
        if (zasazenaTrava < ((60 * 10) / 2)) travaImg.src = "images/main-images/byt/trava-half.jpg";  //Pokud pěstování je v polovině, změní se obrázek na větší trávu
        if (zasazenaTrava <= 0)            //Pokud tráva dorostla
        {
            document.getElementById("travaCasLabel").innerText = "00:00";     //Čas fixně na 00:00
            travaImg.src = "images/main-images/byt/trava-full.jpg";           //Full obrázek vyrostlé trávy
            clearInterval(interval);                                        //Interval skončí
        }
        nastaveni.UlozitCookies("zasazenaTrava", zasazenaTrava);             //Uložíme do cookies čas pěstování trávy
    }, 1000)
}

/*
######## ########  ########     ###    ##    ## ######## 
     ##  ##     ## ##     ##   ## ##   ###   ## ##       
    ##   ##     ## ##     ##  ##   ##  ####  ## ##       
   ##    ########  ########  ##     ## ## ## ## ######   
  ##     ##     ## ##   ##   ######### ##  #### ##       
 ##      ##     ## ##    ##  ##     ## ##   ### ##       
######## ########  ##     ## ##     ## ##    ## ######## 
*/

document.getElementById("prodejZbraniButton").onclick = function () {
    JdiNa(".prodejnaZbrani", "flex");
    AktualizujZbrane();
}

function AktualizujZbrane() {
    let cenaZbrane = ((poskozeni * 300) - 150);
    if (poskozeni < zbrane.length) {
        document.getElementById("nazevZbraneLabel").innerText = zbrane[poskozeni];
        document.getElementById("zbranCenaLabel").innerText = cenaZbrane;
    }
    else {
        document.getElementById("koupitZbranButton").style.visibility = "hidden";
    }
}


/*
 ######  ########  ######  ########  #######  ##     ##    ###    ##    ## 
##    ## ##       ##    ##    ##    ##     ## ##     ##   ## ##   ###   ## 
##       ##       ##          ##    ##     ## ##     ##  ##   ##  ####  ## 
##       ######    ######     ##    ##     ## ##     ## ##     ## ## ## ## 
##       ##             ##    ##    ##     ##  ##   ##  ######### ##  #### 
##    ## ##       ##    ##    ##    ##     ##   ## ##   ##     ## ##   ### 
 ######  ########  ######     ##     #######     ###    ##     ## ##    ## 
*/

let vsechnyMista = [".main-game", ".klub", ".obchod", ".postava", ".cernyTrh", ".byt", ".prodejnaZbrani"];
function JdiNa(kam, styl) {
    console.log("jede se do " + kam);
    vsechnyMista.forEach(misto => {
        if (misto == kam) {
            document.querySelector(misto).style.display = styl;
        }
        else document.querySelector(misto).style.display = 'none';
    })
}