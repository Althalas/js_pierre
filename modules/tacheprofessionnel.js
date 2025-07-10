import { Tache } from "./tache.js";

class TacheProfessionnelle extends Tache {
  constructor(titre, texte, date, projet) {
    super(titre, texte, date);
    this.projet = projet;
  }
  afficher() {
    return `${super.afficher()} Projet : ${this.projet}`;
  }
}
export { TacheProfessionnelle };
