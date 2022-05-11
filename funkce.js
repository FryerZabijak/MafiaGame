export function VygenerujRandomCislo(odKolika, doKolika) {
    return Math.floor((Math.random()*(doKolika-odKolika+1))+odKolika);
}