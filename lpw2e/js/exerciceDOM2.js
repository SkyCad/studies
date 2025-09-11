console.log("ready")
const bicky = document.getElementById("p1");
const frite = document.getElementById("p2");
const sauce = document.getElementById("p3");
const element = document.querySelector("#p1");
const element2 = document.querySelector("#p2");
const element3 = document.querySelector("#p3");
const price = element.dataset.price;
const price2 = element2.dataset.price;
const price3 = element3.dataset.price;
let div = document.getElementById("details");
div.innerHTML = (`Goutez notre ${bicky.dataset.label} <strong>${bicky.textContent}</strong> au prix de ${price}€, nos ${frite.textContent} en ${frite.dataset.label} à ${price2}€.<br/>
${sauce.dataset.label}, notre ${sauce.textContent} à ${price3}€`);