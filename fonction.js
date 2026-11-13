const db = require("./db");

const ensurePositiveNumber = (value, label) => {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue) || numericValue <= 0) {
        throw new Error(`${label} doit être un nombre positif.`);
    }
    return numericValue;
};

const afficherListe = () => {
    return db.prepare("SELECT * FROM disponible ORDER BY id ASC").all();
};

const reservation = () => {
    return db.prepare(`
        SELECT l.id, l.client, l.email, d.nom AS article, l.quantite, l.date_reservation, l.commentaire
        FROM location l
        JOIN disponible d ON d.id = l.article_id
        ORDER BY l.id DESC
    `).all();
};

const ajouter = (nom, quantite, categorie) => {
    const nomValue = String(nom ?? "").trim();
    const categorieValue = String(categorie ?? "").trim();

    if (!nomValue || !categorieValue) {
        return { ok: false, message: "Le nom et la catégorie sont obligatoires." };
    }

    try {
        const quantiteValue = ensurePositiveNumber(quantite, "Quantité");
        const info = db
            .prepare("INSERT INTO disponible (nom, quantite, categorie) VALUES (?, ?, ?)")
            .run(nomValue, quantiteValue, categorieValue);

        return {
            ok: true,
            id: info.lastInsertRowid,
            message: "Article ajouté avec succès."
        };
    } catch (error) {
        return { ok: false, message: error.message };
    }
};

const supprimer = (id) => {
    const articleId = Number(id);

    if (!Number.isInteger(articleId) || articleId <= 0) {
        return { ok: false, message: "Identifiant invalide." };
    }

    const info = db.prepare("DELETE FROM disponible WHERE id = ?").run(articleId);
    return {
        ok: info.changes > 0,
        message: info.changes > 0 ? "Article supprimé." : "Aucun article trouvé."
    };
};

const modifier = (id, nom, quantite, categorie) => {
    const articleId = Number(id);
    const nomValue = String(nom ?? "").trim();
    const categorieValue = String(categorie ?? "").trim();

    if (!Number.isInteger(articleId) || articleId <= 0) {
        return { ok: false, message: "Identifiant invalide." };
    }

    if (!nomValue || !categorieValue) {
        return { ok: false, message: "Le nom et la catégorie sont obligatoires." };
    }

    try {
        const quantiteValue = ensurePositiveNumber(quantite, "Quantité");
        const info = db
            .prepare("UPDATE disponible SET nom = ?, quantite = ?, categorie = ? WHERE id = ?")
            .run(nomValue, quantiteValue, categorieValue, articleId);

        return {
            ok: info.changes > 0,
            message: info.changes > 0 ? "Article modifié." : "Aucun article à mettre à jour."
        };
    } catch (error) {
        return { ok: false, message: error.message };
    }
};

const creerReservation = ({ name, email, article, quantity, date, comment }) => {
    if (!name || !email || !article || !date) {
        return { ok: false, message: "Les champs nom, email, article et date sont obligatoires." };
    }

    try {
        const articleId = Number(article);
        const quantite = ensurePositiveNumber(quantity, "Quantité demandée");

        const articleExiste = db.prepare("SELECT id FROM disponible WHERE id = ?").get(articleId);
        if (!articleExiste) {
            return { ok: false, message: "L'article sélectionné est introuvable." };
        }

        const result = db.prepare(`
            INSERT INTO location (client, email, article_id, quantite, date_reservation, commentaire)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(
            String(name).trim(),
            String(email).trim(),
            articleId,
            quantite,
            String(date),
            comment ? String(comment).trim() : ""
        );

        return {
            ok: true,
            id: result.lastInsertRowid,
            message: "Réservation enregistrée avec succès."
        };
    } catch (error) {
        return { ok: false, message: error.message };
    }
};

module.exports = {
    afficherListe,
    reservation,
    ajouter,
    supprimer,
    modifier,
    creerReservation
};

