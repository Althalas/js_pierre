import { Tache } from "./tache.js";

class TachePersonnelle extends Tache {
  constructor(titre, texte, date, lieu) {
    super(titre, texte, date);
    this.lieu = lieu;
  }
  afficher() {
    return `${super.afficher()} Lieu : ${this.lieu}`;
  }
}
export { TachePersonnelle };
