use egyptians;
db.dropDatabase();

db.gods.insert([

  {
    name: "Ra",
    god_of: ["sun", "creation"]
  },

  {
    name: "Set",
    god_of: ["chaos", "storms"]
  },

  {
    name: "Sobek",
    god_of: "crocodiles"
  },

  {
    name: "Osiris",
    god_of: ["underworld", "afterlife"]
  },

  {
    name: "Sekhmet",
    god_of: ["lions", "fire", "vengeance"]
  },

  {
    name: "Isis",
    god_of: ["magic", "marriage", "healing", "protection"]
  }

]);
