

CREATE TABLE liste1  (
	id	INTEGER,
	"nom"	TEXT NOT NULL,
	"quantité"	INTEGER,
	"catégorie"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
/ données de la liste  des equipements 

INSERT INTO liste1 (id, nom, quantité, catégorie) VALUES
 (1, 'table de mixage', 5, 'sonorisation'),
 (2, 'baffle', 10, 'sonorisation'),
 (3, 'bache', 10, 'tente de reception'),
 (4, 'tente climatisée', 6, 'tente de reception'),
 (5, 'chaises bleue', 200, 'chaises'),
 (6, 'chaises en plastique', 400, 'chaises'),
 (7, 'Podium', 3, 'sonorisation');

