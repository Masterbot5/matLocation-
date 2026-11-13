const express = require("express");
const path = require("path");
const fonction = require("./fonction.js");

const app = express();
const port = process.env.PORT || 3000;
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
const SESSION_COOKIE_NAME = "matlocation_admin";

const parseCookies = (headerValue = "") => {
    return headerValue.split(";").reduce((cookies, chunk) => {
        const [key, ...rest] = chunk.split("=");
        if (!key) return cookies;
        const value = rest.join("=");
        cookies[key.trim()] = decodeURIComponent(value.trim());
        return cookies;
    }, {});
};

const isAdminLoggedIn = (req) => {
    const cookies = parseCookies(req.headers.cookie || "");
    return cookies[SESSION_COOKIE_NAME] === "connected";
};

const requireAdmin = (req, res, next) => {
    if (!isAdminLoggedIn(req)) {
        return res.status(401).json({ ok: false, message: "Accès interdit : identifiants administrateur requis." });
    }
    next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/disponible", (req, res) => {
    res.json(fonction.afficherListe());
});

app.get("/reservation", (req, res) => {
    res.json(fonction.reservation());
});

app.get("/ajouter", (req, res) => {
    const { nom, quantite, categorie } = req.query;
    res.json(fonction.ajouter(nom, quantite, categorie));
});

app.post("/ajouter", requireAdmin, (req, res) => {
    const { nom, quantite, categorie } = req.body;
    res.json(fonction.ajouter(nom, quantite, categorie));
});

app.get("/supprimer", (req, res) => {
    const { id } = req.query;
    res.json(fonction.supprimer(id));
});

app.post("/supprimer", requireAdmin, (req, res) => {
    const { id } = req.body;
    res.json(fonction.supprimer(id));
});

app.get("/modifier", (req, res) => {
    const { id, nom, quantite, categorie } = req.query;
    res.json(fonction.modifier(id, nom, quantite, categorie));
});

app.post("/modifier", requireAdmin, (req, res) => {
    const { id, nom, quantite, categorie } = req.body;
    res.json(fonction.modifier(id, nom, quantite, categorie));
});

app.post("/reserver", (req, res) => {
    res.json(fonction.creerReservation(req.body));
});

app.post("/admin/login", (req, res) => {
    const { username, password } = req.body || {};

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.setHeader(
            "Set-Cookie",
            `${SESSION_COOKIE_NAME}=connected; Path=/; HttpOnly; SameSite=Lax`
        );
        return res.json({ ok: true, message: "Connexion administrateur réussie." });
    }

    return res.status(401).json({ ok: false, message: "Identifiant ou mot de passe incorrect." });
});

app.post("/admin/logout", (req, res) => {
    res.clearCookie(SESSION_COOKIE_NAME, { path: "/" });
    return res.json({ ok: true, message: "Déconnecté." });
});

app.get("/admin/me", requireAdmin, (req, res) => {
    res.json({ ok: true, username: ADMIN_USERNAME });
});

app.get("/admin/articles", requireAdmin, (req, res) => {
    res.json(fonction.afficherListe());
});

app.listen(port, (erreur) => {
    if (erreur) {
        console.log("Erreur lors du démarrage du serveur", erreur.message);
        return;
    }
    console.log(`Serveur démarré sur http://localhost:${port}`);
});


