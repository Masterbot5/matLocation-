CREATE TABLE IF NOT EXISTS disponible (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    quantite INTEGER NOT NULL,
    categorie TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS location (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client TEXT NOT NULL,
    email TEXT NOT NULL,
    article_id INTEGER NOT NULL,
    quantite INTEGER NOT NULL,
    date_reservation TEXT NOT NULL,
    commentaire TEXT,
    FOREIGN KEY(article_id) REFERENCES disponible(id)
);

INSERT OR IGNORE INTO disponible (id, nom, quantite, categorie) VALUES
    (1, 'Table de mixage', 5, 'Sonorisation'),
    (2, 'Baffle', 12, 'Sonorisation'),
    (3, 'Bâche', 10, 'Tente de réception'),
    (4, 'Tente climatisée', 6, 'Tente de réception'),
    (5, 'Chaises bleues', 200, 'Chaises'),
    (6, 'Chaises en plastique', 400, 'Chaises'),
    (7, 'Podium', 3, 'Sonorisation');

