USE cards_db;

TRUNCATE TABLE cards;
TRUNCATE TABLE decks;

INSERT INTO decks (name) VALUES ("Classic");

INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Ace of Spades",
    NULL,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suite", "val": "Spade"},
        {"attr": "Value", "val": "Ace"}]'
);
INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Ace of Clubs",
    NULL,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suite", "val": "Club"},
        {"attr": "Value", "val": "Ace"}]'
);
INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Ace of Hearts",
    NULL,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suite", "val": "Heart"},
        {"attr": "Value", "val": "Ace"}]'
);
INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Ace of Diamonds",
    NULL,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suite", "val": "Diamond"},
        {"attr": "Value", "val": "Ace"}]'
);

INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "The Challengers",
    "Second project team",
    "assets/img/The Challengers.png",
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
