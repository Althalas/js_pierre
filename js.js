import { Tache } from "./modules/tache.js";
import { GestionnaireTaches } from "./modules/gestionnairetaches.js";
import { TachePersonnelle } from "./modules/tachepersonnel.js";
import { TacheProfessionnelle } from "./modules/tacheprofessionnel.js";

const gestionnaire = new GestionnaireTaches();

gestionnaire.chargerTaches(Tache, TachePersonnelle, TacheProfessionnelle); // je charge les tache avant de faire l'affichage
gestionnaire.afficherToutes();

const form = document.getElementById("form-tache");
const titre = document.getElementById("titre");
const texte = document.getElementById("texte");
const date = document.getElementById("date");
const lieu = document.getElementById("lieu");
const projet = document.getElementById("projet");
const type = document.getElementById("type");
const btnfilter = document.getElementById("btn-filtrer");
const inputfiltre = document.getElementById("filtre-mot");
const btnfilterdate = document.getElementById("btn-filtrerdate");
const inputfiltredate = document.getElementById("filtre-date");
const listeTaches = document.getElementById("liste-taches");
const btnvider = document.getElementById("btn-vider");

function afficherTachesAvecCompteur(taches, message = "") {
  listeTaches.innerHTML = "";
  const compteur = document.createElement("p");
  compteur.textContent = `${message}${gestionnaire.compterTaches(
    taches
  )} taches trouvées`;
  listeTaches.appendChild(compteur);

  taches.forEach((tache) => {
    const li = document.createElement("li");
    li.textContent = tache.afficher();
    listeTaches.appendChild(li);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titre1 = titre.value;
  const texte1 = texte.value;
  const date1 = date.value;
  const lieu1 = lieu.value;
  const projet1 = projet.value;
  const type1 = type.value;
  let tache;
  if (type1 === "perso") {
    tache = new TachePersonnelle(titre1, texte1, date1, lieu1);
  } else if (type1 === "pro") {
    tache = new TacheProfessionnelle(titre1, texte1, date1, projet1);
  } else {
    tache = new Tache(titre1, texte1, date1);
  }
  gestionnaire.ajouterTache(tache);
  gestionnaire.afficherToutes();
  form.reset();
});

btnfilter.addEventListener("click", (event) => {
  const mot = inputfiltre.value;
  if (mot === "") {
    gestionnaire.afficherToutes();
  } else {
    const tachesFiltrees = gestionnaire.filtrerParMots(mot);
    afficherTachesAvecCompteur(
      tachesFiltrees,
      `Filtre par mot-clé : ${mot} : `
    );
  }
});

btnfilterdate.addEventListener("click", (event) => {
  const periode = inputfiltredate.value;
  if (periode === "") {
    gestionnaire.afficherToutes();
  } else {
    const dates = periode.split(" a "); // je sépare en deux
    if (dates.length === 2) {
      const dateDebut = new Date(dates[0]); // la premiere date
      const dateFin = new Date(dates[1]); // la deuxieme date
      const tachesFiltrees = gestionnaire.filtrerParDate(dateDebut, dateFin); // j'utilise le filtre
      afficherTachesAvecCompteur(
        tachesFiltrees,
        `Filtre par période : ${periode} : ` // j'affiche
      );
    }
  }
});

btnvider.addEventListener("click", () => {
  // vide la liste
  localStorage.removeItem("taches");
  gestionnaire.tableautaches = [];
  gestionnaire.afficherToutes();
});

/*zone audio*/
const btnPlay = document.getElementById("btn-play");
const btnPause = document.getElementById("btn-pause");
const btnReset = document.getElementById("btn-reset");
const audio = document.getElementById("audio");
const temps = document.getElementById("temps");

btnPlay.addEventListener("click", () => {
  audio.play();
});

btnPause.addEventListener("click", () => {
  audio.pause();
});

btnReset.addEventListener("click", () => {
  audio.currentTime = 0;
  audio.pause();
});

let chronoaudio;
function startchrono() {}
function pausechrono() {}
function resetchrono() {}

/*4 géoloc*/
const btngeoloc = document.getElementById("btn-geoloc");
const coordonnees = document.getElementById("coordonnees");

btngeoloc.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const precision = position.coords.accuracy;

    coordonnees.innerHTML = `
      <p>position :</p>
      <p>Latitude : ${latitude.toFixed(6)}</p>
      <p>Longitude : ${longitude.toFixed(6)}</p>
      <p>Précision : ${precision}</p>
    `;
    // merci la doc de : https://leafletjs.com/examples/quick-start/
    let carte = L.map("carte").setView([latitude, longitude], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(carte);

    let marqueur = L.marker([latitude, longitude]).addTo(carte);
    marqueur.bindPopup("Votre position actuelle").openPopup();
  });
});

/*3 gestion media*/
const btnwebcam = document.getElementById("btn-webcam");
const btnphoto = document.getElementById("btn-photo");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

btnwebcam.addEventListener("click", (event) => {
  let stream = navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
  video.onloadedmetadata = video.play();
});
