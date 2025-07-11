export class utilisateur {
  constructor(nom, email) {
    this.nom = nom;
    this.email = email;
  }
  async getUser() {
    let rep = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
    });
    const result = await rep.json();
    return result;
  }
  afficherUser() {
    const affichageutilisateur = document.getElementById("liste-utilisateur");
    affichageutilisateur.innerHTML = "";

    // Afficher le message de chargement
    const messageChargement = document.createElement("p");
    messageChargement.textContent = "Chargement en cours...";
    affichageutilisateur.appendChild(messageChargement);

    // Simuler un délai et récupérer les utilisateurs
    setTimeout(() => {
      this.getUser()
        .then((tableauuser) => {
          console.log(tableauuser);
          // Supprimer le message de chargement
          affichageutilisateur.innerHTML = "";

          // Créer la liste et afficher les utilisateurs
          const liste = document.createElement("li");
          affichageutilisateur.appendChild(liste);

          tableauuser.forEach((user) => {
            const p = document.createElement("p");
            p.textContent = `${user.name} - ${user.email}`;
            liste.appendChild(p);
          });
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des utilisateurs:", error);
          affichageutilisateur.innerHTML =
            "<p>Erreur lors du chargement des utilisateurs</p>";
        });
    }, 1000);
  }

  ajouterUser(nom, email) {
    const affichageutilisateur = document.getElementById("liste-utilisateur");
    const messageChargement = document.createElement("p");
    messageChargement.textContent = "Ajout de l'utilisateur en cours...";
    affichageutilisateur.appendChild(messageChargement);

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: nom,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Utilisateur ajouté:", result);

        affichageutilisateur.innerHTML = "";

        const messageConfirmation = document.createElement("p");
        messageConfirmation.textContent = `Utilisateur ${nom} ajouté avec succès !`;
        messageConfirmation.style.color = "green";
        affichageutilisateur.appendChild(messageConfirmation);

        setTimeout(() => {
          this.afficherUser();
        }, 2000);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error);
        affichageutilisateur.innerHTML =
          "<p>Erreur lors de l'ajout de l'utilisateur</p>";
      });
  }
}