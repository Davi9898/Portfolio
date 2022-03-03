//console.log(document.querySelector(".button1"));

var bodyElement = document.querySelector("body");
var pElementSeizoen = document.querySelector(".seizoenstekst");


document.querySelector(".button1").addEventListener("click", seizoenen);

/**
 * Functie voegt en verwijderd classes waardoor de seizoenen veranderen.
 */

function seizoenen() {
  if (bodyElement.classList.contains("zomer")) {
    bodyElement.classList.remove("zomer");
    bodyElement.classList.add("herfst");
    pElementSeizoen.textContent = "Huidig seizoen : Herfst";
  } else if (bodyElement.classList.contains("herfst")) {
    bodyElement.classList.remove("herfst");
    bodyElement.classList.add("winter");
    pElementSeizoen.textContent = "Huidig seizoen : Winter";
  } else if (bodyElement.classList.contains("winter")) {
    bodyElement.classList.remove("winter");
    bodyElement.classList.add("lente");
    pElementSeizoen.textContent = "Huidig seizoen : Lente";
  } else if (bodyElement.classList.contains("lente")) {
    bodyElement.classList.remove("lente");
    bodyElement.classList.add("zomer");
    pElementSeizoen.textContent = "Huidig seizoen : Zomer";
  }
}

//Click op button 2 voor een salto!
document.querySelector(".button2").addEventListener("click", salto);

var boomContainerEl = document.querySelector(".boom_container");

/**
 * Functie voegt een css animatie toe genaamd salto aan de boomcontainer.
 */

function salto() {
  boomContainerEl.classList.add("salto");
  bodyElement.classList.remove("schudtekst1");
  bodyElement.classList.remove("schudtekst2");
  bodyElement.classList.remove("schudtekst3");
  setTimeout(function () {
    boomContainerEl.classList.remove("salto");
  }, 1000);
}

//Click op button 3 om te schudden

var audio = document.getElementById("audioBoom")

// https://www.fesliyanstudios.com/royalty-free-sound-effects-download/foliage-270

document.querySelector(".button3").addEventListener("click", schudwaarde);

var schud_niveau = 0;

function schudwaarde() {
  schud(2);
}

/**
 *  functie zorgt er voor dat de boom schud doormiddel van de parameter.
 */

function schud(schuddingen) {
  schud_niveau += schuddingen;
  console.log(schud_niveau);
  if (schud_niveau == 2) {
    bodyElement.classList.add("schudtekst1");
    boomContainerEl.classList.add("schudanimatie1");
    boomContainerEl.classList.remove("beweging");
    audio.play();
  }

  if (schud_niveau == 4) {
    bodyElement.classList.remove("schudtekst1");
    bodyElement.classList.add("schudtekst2");
    boomContainerEl.classList.remove("schudanimatie1");
    boomContainerEl.classList.add("schudanimatie2");
    audio.play();
  }

  if (schud_niveau == 6) {
    bodyElement.classList.remove("schudtekst2");
    bodyElement.classList.add("schudtekst3");
    boomContainerEl.classList.remove("schudanimatie2");
    boomContainerEl.classList.add("schudanimatie3");
    audio.play();
  }
  if (schud_niveau == 8) {
    boomContainerEl.classList.remove("schudanimatie3");
    bodyElement.classList.remove("schudtekst3");
    boomContainerEl.classList.add("beweging");
    setTimeout(function () {
      alert("Niet pesten....");
      schud_niveau = 0;
    }, 5000);
  }
}
