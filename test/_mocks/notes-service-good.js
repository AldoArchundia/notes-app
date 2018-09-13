const notes = [
  {
    _id: "1",
    text: "WE",
    title: "WUZ"
  },
  {
    _id: "2",
    text: "KINGS",
    title: "ANDSHIT"
  }
];

const notesServiceGood = {
  getAll(cb) {
    cb(null, notes);
  }
};

module.exports = notesServiceGood;
