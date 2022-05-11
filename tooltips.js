export async function VypisZpravu(nadpis,text,tlAno,tlNe,obrazek,barva) {
    document.getElementById("zprava-nadpis").innerHTML=nadpis;
    document.getElementById("zprava-text").innerHTML=text;
    document.getElementById("zpravaButton-ano").innerHTML=tlAno;
    if (tlNe!=false) {
        document.getElementById("zpravaButton-ne").innerHTML=tlNe;
        document.getElementById("zpravaButton-ne").style.display="block";
    }
    else document.getElementById("zpravaButton-ne").style.display="none";

    document.querySelector(".zprava-black").style.display="block";
    document.querySelector(".zprava-main").style.display="flex";

    const zpravaImage =document.getElementById("zprava-image");
    if (obrazek!=false) { 
        zpravaImage.src=obrazek;
        zpravaImage.style.display="block";
    }
    else {
        zpravaImage.style.display="none";
    }

    const zpravaPozadi =document.querySelector(".zprava-main");
    if (barva!=false) {
        zpravaPozadi.style.backgroundColor="#"+barva;
    }
    else zpravaPozadi.style.backgroundColor="#c3c3c3";

    let odpoved;
    let promise = new Promise((resolve) => {
        odpoved = document.getElementById("zpravaButton-ano").onclick =  function() {
            SchovejZpravu();
            resolve (true);
        }
        odpoved = document.getElementById("zpravaButton-ne").onclick =  function() {
            SchovejZpravu();
            resolve(false);
        }
    })
    odpoved = await promise;
    return odpoved;

    function SchovejZpravu(){
        document.querySelector(".zprava-black").style.display="none";
        document.querySelector(".zprava-main").style.display="none";
    }
}

//Lidi v klubu
document.querySelectorAll(".klub-clovek").forEach (clovek => {
    clovek.addEventListener("click", function() {ClovekVKlubu(clovek.id)})
})

function ClovekVKlubu(id) {
    switch(id){
        case 'klub-servirka':
            Servirka();
            break;
        case 'klub-ind':
            Pristehovalec();
            break;
        case 'klub-boss':
            Boss();
    }
}

async function Servirka() {
    let odpoved = await VypisZpravu("Coco","zzdarecc","šukat","nešukat","images/main-images/club/stripterka.png","FF6392");
}

async function Pristehovalec() {
    let odpoved = await VypisZpravu("Nelegální přistěhovalec","Hindiman","Jít pryč",false,false,false);
}

async function Boss() {
    let odpoved = await VypisZpravu/*Milazzo*/("Don ","Co se tu chceš? Tohle je klub jen pro vyšší společnost.<br>Ale když už jsi tady <strong>něco</strong> bych pro tebe měl. <br>V ulicích teď není moc bezpečno. Jestli chceš úkol, <strong>jdi to tam projít a trochu poklidit od špinavců a grázlů</strong>.","Beru","Neberu","images/main-images/club/mafia-boss.jpg","cc0000");
}
