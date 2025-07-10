class GestionnaireTaches {
  #tableauTaches = [];

  get tableautaches() {
    return this.#tableauTaches;
  }
  set tableautaches(tableautaches) {
    this.#tableauTaches = tableautaches;
  }

  ajouterTache(tache) {
    this.#tableauTaches.push(tache);
    this.sauvegarderTaches();
  }

  supprimerTache(titre) {
    this.#tableauTaches = this.#tableauTaches.filter(
      (tache) => tache.titre !== titre
    );
    this.sauvegarderTaches();
  }

  filtrerParMots(chaine) {
    return this.#tableauTaches.filter((tache) => tache.contientMot(chaine));
  }

  filtrerParDate(dateDebut, dateFin) {
    return this.#tableauTaches.filter((tache) =>
      tache.estEntreDates(dateDebut, dateFin)
    );
  }

  afficherToutes() {
    const listetache = document.getElementById("liste-taches");
    listetache.innerHTML = "";
    const compteur = document.createElement("p");
    compteur.textContent = `${this.compterTaches(
      this.#tableauTaches
    )} taches au total`;
    listetache.appendChild(compteur);

    this.#tableauTaches.forEach((tache) => {
      const liste = document.createElement("li");
      liste.textContent = tache.afficher();
      listetache.appendChild(liste);
    });
  }

  compterTaches(taches) {
    return taches.length;
  }

  sauvegarderTaches() {
    // je créer un autre tableautaches dans une const
    const tachesJSON = this.#tableauTaches.map((tache) => {
      // vérif du type
      let type;
      if (tache.lieu) {
        type = "perso";
      } else if (tache.projet) {
        type = "pro";
      } else {
        type = "tache";
      }

      return {
        type: type,
        titre: tache.titre,
        texte: tache.texte,
        date: tache.date.toISOString(), //format de la date
        lieu: tache.lieu || null, // null sauf si perso
        projet: tache.projet || null, // null sauf si pro
      };
    });
    localStorage.setItem("taches", JSON.stringify(tachesJSON));
  }

  chargerTaches(Tache, TachePersonnelle, TacheProfessionnelle) {
    const tachesJSON = localStorage.getItem("taches");
    if (tachesJSON) {
      const tachesData = JSON.parse(tachesJSON); // je le repasse en tableau
      console.log("Données chargées depuis localStorage:", tachesData);

      this.#tableauTaches = tachesData.map((tacheData) => {
        const { type, titre, texte, date, lieu, projet } = tacheData;
        console.log("Création tâche:", { type, titre, lieu, projet });

        switch (type) {
          case "perso":
            return new TachePersonnelle(titre, texte, date, lieu);
          case "pro":
            return new TacheProfessionnelle(titre, texte, date, projet);
          default:
            return new Tache(titre, texte, date);
        }
      });
    }
  }
}
export { GestionnaireTaches };
