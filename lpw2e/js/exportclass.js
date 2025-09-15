export function setClassByAge(age) {
    let className;
    if (age < 13) {
        className = "1ère";
    } else if (age < 20) {
        className = "2ème";
    } else {
        className = "3ème";
    }
    return className;
}
