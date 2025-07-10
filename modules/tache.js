class Tache {
  constructor(titre, texte, date) {
    this.titre = titre;
    this.texte = texte;
    this.date = new Date(date);
  }
  afficher() {
    return `${this.titre} : ${this.texte} créer le : ${new Date(
      this.date
    ).toLocaleDateString()}`;
  }
  contientMot(mot) {
    const normalize = (str) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    const motnorm = normalize(mot);
    return (
      normalize(this.titre).includes(motnorm) ||
      normalize(this.texte).includes(motnorm)
    );
  }
  estEntreDates(dateDebut, dateFin) {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    return this.date >= debut && this.date <= fin;
  }
}
export { Tache };
