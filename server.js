const fonction = require("./fonction.js");

const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {

    res.json({ message: "Bienvenue sur l'API de gestion des stocks" });
});
app.listen(3000, (erreur) => {
    if (erreur) {
        console.log("Erreur lors du démarrage du serveur", erreur.message);
        return;

    }
    console.log("Serveur démarré sur http://localhost:3000")
})

app.get("/disponible", (req, res) => {

    const liste = fonction.afficherListe();
    res.json(liste);
    // console.log(res.message);
    return res.json(liste);

})

app.get("/reservation", (req, res) => {
    const listeR = fonction.reservation();
    res.json(listeR);
})

app.get("/ajouter", (req, res) => {
    const { nom, quantité, categorie } = req.query;
    const ajout = fonction.ajouter(nom, quantité, categorie);
    res.json(ajout);
})

app.get("/supprimer", (req, res) => {
    const { nom, quantité, categorie } = req.query;
    const suppr = fonction.supprimer(nom, quantité, categorie);
    res.json(suppr);
})

app.get("/modifier", (req, res) => {
    const { nom, quantité, categorie } = req.query;
    const modif = fonction.modifier(nom, quantité, categorie);
    res.json(modif);
})


