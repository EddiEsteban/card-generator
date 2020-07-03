USE cards_db;

INSERT INTO decks (name) VALUES ("Pokemon");

INSERT INTO cards (name, description, img, deck_id, attributes ) VALUES ("Charizard", "Energy Burn: As often as you like during your turn (before your attack), you may turn all Energy attached to Charizard into fire energy for the rest of the turn. This power can't be used if Charizard is Asleep, Confused, or Paralyzed.","https://upload.wikimedia.org/wikipedia/en/1/1f/Pok%C3%A9mon_Charizard_art.png", 1, "Fire Spin: Discard 2 Energy cards attached to Charizard in order to use this attack.");

INSERT INTO users (name) VALUES ("EddiEsteban");
INSERT INTO users (name) VALUES ("AllAroundD");

SELECT * from cards;
SELECT * from decks;
SELECT * from users;

