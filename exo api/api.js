import { utilisateur } from "./user.js";

const btnsubmit = document.getElementById("form");
const btnchargement = document.getElementById("charge-contact");
const inputnom = document.getElementById("nom");
const inputemail = document.getElementById("email");

/*fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    "utilisateur :", data;
  })
  .catch((error) => {
    "erreur :", error;
  });*/

const user = new utilisateur();

btnchargement.addEventListener("click", (event) => {
  event.preventDefault();
  user.afficherUser();
});

btnsubmit.addEventListener("click", (event) => {
  event.preventDefault();
  user.ajouterUser(inputnom.value, inputemail.value);
});
