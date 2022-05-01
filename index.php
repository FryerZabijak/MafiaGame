<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/x-icon" href="images/favicon/favicon.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>FryerZabijak Game</title>
</head>
<body>
    <div class="container">


            <div class="zprava-black">
                <div class="zprava-main">

                    <div class="zprava-main-nadpis">
                        <h1 id="zprava-nadpis">Nazdar čuraku</h1>
                        <hr>
                    </div>

                    <p id="zprava-text">TOTO JE MOJE PERO</p>
                    <img id="zprava-image" src="images/other/shop-pozadi.png">
                    <div class="odpovedi">
                        <button id="zpravaButton-ano">beru</button>
                        <button id="zpravaButton-ne">neberu</button>
                    </div>
                </div>
            </div>


        <div class="seznam-mistnosti rozlozeni-layout">
            <ul>
                <li><button id="uliceButton">Ulice</button></li>
                <li><button id="obchodButton">Večerka</button></li>
                <li><button id="klubButton">Klub</button></li>
                <li><button id="postavaButton">Postava</button></li>

            </ul>
        </div>

        <div class="main">

            <div class="main-game">
                <div class="main-image">
                    <label id="mistnostPocetLabel">Lokace 1</label>
                    <img id="hlavniObrazek" src="images/main-images/level01/Prazdno.jpg" alt="Prázdná místnost">
                </div>
                <ul class="hraci-tlacitka">
                    <li><button id="sebratButton" class="hraci-tlacitko">Sebrat</button></li>
                    <li><button id="projitButton" class="hraci-tlacitko">Projít</button></li>
                    <li><button id="utocitButton" class="hraci-tlacitko">Útočit</button></li>
                </ul>
            </div>

            <div class="obchod misto">
                <label>Večerka</label>
                <img src="images/other/shop.png" alt="obchod">
                <div class="obchod-polozky">
                    <button id="pivoButton" class="obchodButton">$10 Pivo</button>
                    <button id="pizzaButton" class="obchodButton">$20 Pizza</button>
                    <button id="kebabButton" class="obchodButton">$50 Kebab</button>
                </div>
            </div>

            <div class="klub misto">
                <label>Klub</label>
                <img src="images/main-images/club/klub.jpg" alt="klub">

                
                <div id="klub-servirka" class="klub-clovek"></div>


                <div id="klub-ind" class="klub-clovek"></div>

                
                <div id="klub-boss" class="klub-clovek"></div>
            </div>

            <div class="cernyTrh misto">
                
            </div>

            <div class="postava">
                <div class="postava-info">
                <label id="playersName">Pepyk</label><br>
                <label class="jenomText">Úroveň - </label><label id="playersLevel">1</label>
                </div>
                    <div class="profile">
                        <img src="images/other/profile.jpg" alt="profilovka" id="profilePicture">
                        
                        <p>Úroveň: </label id="profileZbran">1</label></p>
                        <p>Zbraň: </label id="profileZbran">Pěsti</label></p>
                        <p>Respekt: </label id="profileZbran">Žádný</label></p>

                    </div>
                <div class="atributy">
                    <ul>
                        <div id="atributySila-tooltip" class="atribut-tooltip">+1 poškození nepřátelům<hr>Cena: <label id="atributSilaCena">50</label>$</div>
                        <li id="atributSila">Síla <button id="atributySila" class="tooltipButton" name="atributSila">+</button> <label id="atributEnergie">1</li>

                        <div id="atributyEnergie-tooltip" class="atribut-tooltip">+10 maximální energie<hr>Cena: <label id="atributEnergieCena">50</label>$</div>
                        <li id="atributEnergie">Energie <button id="atributyEnergie" class="tooltipButton">+</button> <label id="atributEnergie">1</label></li>
                        
                        <div id="atributyStesti-tooltip" class="atribut-tooltip">Šance na nalezení více peněz<hr>Cena: <label id="atributStestiCena">50</label>$</div>
                        <li id="atributStesti">Štěstí <button id="atributyStesti" class="tooltipButton">+</button> <label id="atributEnergie">1</label></li>
                        
                        <div id="atributyVyjednavani-tooltip" class="atribut-tooltip">Sníží se všechny ceny<hr>Cena: <label id="atributVyjednavaniCena">500</label>$</div>
                        <li id="atributVyjednavani">Vyjednávání <button id="atributyVyjednavani" class="tooltipButton">+</button> <label id="atributEnergie">1</label></li>
                    </ul>
                </div>
                
                <!--<div class="inventory">
                    <img src="images/min/inventory-slot.jpg" alt="inventory-slot-border">
                    <img src="images/min/inventory-slot.jpg" alt="inventory-slot-border">
                    <img src="images/min/inventory-slot.jpg" alt="inventory-slot-border">
                    <img src="images/min/inventory-slot.jpg" alt="inventory-slot-border">
                    <img src="images/min/inventory-slot.jpg" alt="inventory-slot-border">
                </div>-->
            </div>
        </div>

        <div class="informace-div rozlozeni-layout">

            <div class="ukazatele">
                <h2>Staty</h2>
                <hr>
                <ul>
                    <li>$ <label id="penizeLabel">5</label> </li>


                    <!--<li>⚡<label id="energieLabel">100</label> </li>-->
                    <li>⚡<progress id="energieProgress" value=100 max=100></progress>
                    <li>Úroveň <label id="levelLabel">1</label> </li>
                    <li><progress id="levelProgress" value=10 max=100 style=""></progress>
                </ul>
            </div>

            <div class="nastaveni">

            </div>

        </div>

    </div>
    <script src="script.js" type="module"></script>
    <script src="funkce.js" type="module"></script>
    <script src="nastaveni.js" type="module"></script>
    <script src="tooltips.js" type="module"></script>
<?php
include("game.php");
?>
</body>
</html>