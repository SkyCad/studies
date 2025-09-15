import { getName } from "./exportname.js";
import { getAge } from "./exportage.js";
import { setClassByAge } from "./exportclass.js";

function main() {
    let name = getName();
    let age = getAge();
    let className = setClassByAge(age);
    console.log(`Bonjour ${name}, vous avez ${age} ans et vous êtes en ${className} année.`);
}
main();