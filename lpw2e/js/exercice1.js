console.log("EXERCICE 01")
/*
note = 16;
if (note < 5) {
    console.log("Vous êtes nul a chier");
} 
else if (note < 10) {
    console.log("Un peu moins de la moitié que la moitié que j'ésperais");
}
else if (note > 12 && note !== 20) {
    console.log("Incroyable... mais pas pour moi");
}
else if (note > 15 && note !== 20) {
    console.log("T'y es presque ma geule");
}
else if (note == 20) {
    console.log("Bah vlà, encore un qui a triché!!");
}
else {
    console.log("Il n'y a pas de commentaire pour cette note");
}

console.log(note);
*/

const note = 20;
let message = "";

if (note == 20) {
    message = "Bah vlà, encore un qui a triché!";
} else if (note < 20 && note > 15) {
    message = "T'y es presque ma geule";
} else if (note < 15 && note > 12) {
    message = "Incroyable... mais pas pour moi";
} else if (note < 10 && note > 5 ) {
    message = "Un peu moins de la moitié que la moitié que j'ésperais";
} else if (note < 5) {
    message = "Vous êtes nul a chier";
} else {
    message = "Il n'y a pas de commentaire pour cette note";
}
console.log (message);

console.log("EXERCICE 2")

let motdepasse = "je vais biEntôt déménager(peut-être)";
let fauxmotdepasse = "Je Vais Bientôt déménager(peut-être)";
motdepasse = motdepasse.toLowerCase();
fauxmotdepasse = fauxmotdepasse.toLowerCase();

message = "";

if (fauxmotdepasse == motdepasse) {
    message = "bah c'est super...";

} else {
    message = "bah raté ducoup";

}
    console.log(motdepasse);
    console.log(fauxmotdepasse);
    console.log(message);

    console.log("Fin de l'exercice 2");

    console.log("EXERCICE 3");

const montableau = ["Frites", "Bicky", "Triple sauce"];

console.log (montableau);

console.log ("longueur du tableau:" + montableau.length);
console.log ("Position 2 du tableau : " + montableau[2]);

montableau.push("Ice tea (pétillant bordel) !!!!!!!");

console.log (montableau);
console.log ("longueur du tableau:" + montableau.length);
console.log ("Position 2 du tableau : " + montableau[2]);



