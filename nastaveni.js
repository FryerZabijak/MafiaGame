import * as ceny from "./ceny.js";
import * as funkce from "./funkce.js";
import * as script from "./script.js";

export function NactiSave() {
    if (document.cookie!="") {
        let mistnost = Number(NactiCookies("mistnost"));
        let penize = Number(NactiCookies("penize"));
        let energie = Number(NactiCookies("energie"));
        let mistnostCislo = Number(NactiCookies("mistnostCislo"));
        let level = Number(NactiCookies("level"));
        let xp = Number(NactiCookies("xp"));

        let vsechnyCeny = NactiCookies("ceny");
        let maxEnergie = NactiCookies("maxEnergie");

        let zasazenaTrava = NactiCookies("zasazenaTrava");

        let vydelanychPenez = NactiCookies("vydelanychPenez");
        console.log(document.cookie);
        let zabitychNepratel = NactiCookies("zabitychNepratel");
        console.log(zabitychNepratel);

        let zivotyNepratel = NactiCookies("zivotyNepratel");
        let zivotyNepratelMax = NactiCookies("zivotyNepratelMax");

        let penizeOdDo = NactiCookies("penizeOdDo");
        let poskozeni = NactiCookies("poskozeni");


        var ulozeneHodnoty = {
        "mistnost":mistnost,
        "penize":penize,
        "energie":energie,
        "mistnostCislo":mistnostCislo,
        "level":level,
        "xp":xp,
        "vsechnyCeny":vsechnyCeny,
        "maxEnergie":maxEnergie,
        "zasazenaTrava":zasazenaTrava,
        "vydelanychPenez":vydelanychPenez,
        "zabitychNepratel":zabitychNepratel,
        "zivotyNepratel":zivotyNepratel,
        "zivotyNepratelMax":zivotyNepratelMax,
        "penizeOdDo":penizeOdDo,
        "prices":penizeOdDo,
        "poskozeni":poskozeni,

    };
        return ulozeneHodnoty;
    }
    else return "";
}

export function UlozitCookies(name, value) {     //Funkce na uložení cookies
    //var date = new Date();
    //date.setTime(date.getTime() + (days*24*60*60*1000));    //Přidá k datu počet dní
    //let expires="expires="+date.toUTCString();  //Expires hodnota
    document.cookie=name+"="+value+";"//+expires+";path=/";   //Nastavení cookies
}

export function UlozitCookiesNaCas(name, value, hours) {     //Funkce na uložení cookies
    var date = new Date();
    date.setTime(date.getTime() + (hours*60*60*1000));    //Přidá k datu počet dní
    let expires="expires="+date.toUTCString();  //Expires hodnota
    document.cookie=name+"="+value+";"+expires+";path=/";   //Nastavení cookies
}

export function NactiCookies(cookieName) {     //Načtení cookies
    let hodnota;
    let cookiesky = document.cookie.split(';'); //Rozdělení cookies
cookiesky.forEach(cookieska => {        //Pro každou nalezenou cookiesku
    while (cookieska.charAt(0) == ' ') cookieska = cookieska.substring(1); //Maže první mezery
    let cookieskaCast = cookieska.split('=');   //Rozdělení na název a výsledek
    if (cookieskaCast[0]==cookieName) {
        hodnota = cookieskaCast[1]; //Pokud je název cookiesky to, co hledáme, vrátí to
    }
})
return hodnota;
}