USE cards_db;

TRUNCATE TABLE cards;
TRUNCATE TABLE decks;
TRUNCATE TABLE users;

INSERT INTO decks (name) VALUES ("Classic");
INSERT INTO decks (name) VALUES ("Poker");
INSERT INTO decks (name) VALUES ("Traditional");

INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Ace of Spades",
    NULL,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suit", "val": "Spade"},
        {"attr": "Value", "val": "Ace"}]'
);
INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Ace of Clubs",
    NULL,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suit", "val": "Club"},
        {"attr": "Value", "val": "Ace"}]'
);
INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Ace of Hearts",
    NULL,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suit", "val": "Heart"},
        {"attr": "Value", "val": "Ace"}]'
);
INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Ace of Diamonds",
    NULL,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suit", "val": "Diamond"},
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

INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Queen of Spades",
    2,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suit", "val": "Spades"},
        {"attr": "Value", "val": "Queen"}]'
);
INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Queen of Clubs",
    2,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suit", "val": "Clubs"},
        {"attr": "Value", "val": "Queen"}]'
);
INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Queen of Hearts",
    2,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suit", "val": "Queen"},
        {"attr": "Value", "val": "Hearts"}]'
);
INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES (
    "Queen of Diamonds",
    2,
    "assets/img/The Challengers.png",
    1,
    '[
        {"attr": "Suit", "val": "Queen"},
        {"attr": "Value", "val": "Diamonds"}]'
);
INSERT INTO users (name) VALUES ("EddiEsteban");
INSERT INTO users (name) VALUES ("AllAroundD");
INSERT INTO users (name) VALUES ("SaquibCA");

SELECT * from cards;
SELECT * from decks;
SELECT * from users;
