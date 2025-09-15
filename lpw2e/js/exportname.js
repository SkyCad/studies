export function getName () {
    let name = prompt("Entrer votre nom");
    let firstname = prompt("Entrer votre prénom");
    name = firstname + " " + name;
    return name;
}