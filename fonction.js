const db = required("./db");

const afficherListe = () => {
    db.prepare("SELECT * FROM disponible").all();
};

afficherListe(); //affiche le Materiel disponible

const reservation = () => {
    db.prepare("SELECT nom_id,nom,quantite FROM location")
    JOIN("disponible ON location.nom_id = disponible.id").all()

} // Faire une demande de Materiel

const ajouter = (nom, quantité, categorie) => {
    const info = db
        .prepare("INSERT INTO disponible (nom, quantié, caégorie) VALUES (?, ?, ?)")
        .run(nom, quantité, categorie);
    return ajouter(info.lastInsertRowid);
};

const supprimer = (nom, quantité, categorie) => {
    const info = db
        .prepare("DELETE FROM disponible WHERE nom = ? AND quantité = ? AND catégorie = ?")
        .run(nom, quantité, categorie);
    return supprimer(info.changes);
}
const modifier = (nom, quantité, categorie) => {
    const info = db
        .prepare("UPDATE disponible SET quantité = ? WHERE nom = ? AND catégorie = ?")
        .run(quantité, nom, categorie);
    return modifier(info.changes);
};

