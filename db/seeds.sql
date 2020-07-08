USE cards_db;

INSERT INTO decks (name) VALUES ("Pokemon");

INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Sample name",
    "Sample description",
    "assets/img/The Challengers",
    NULL,
    '[
        {"attr": "Members", "val": "3"},
        {"attr": "Animal", "val": "Bear"}]'
);

INSERT INTO users (name) VALUES ("EddiEsteban");
INSERT INTO users (name) VALUES ("AllAroundD");
INSERT INTO users (name) VALUES ("SaquibCA");

SELECT * from cards;
SELECT * from decks;
SELECT * from users;
