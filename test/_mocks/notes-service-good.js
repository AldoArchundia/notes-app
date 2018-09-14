const notes = [
  {
    id: "1",
    title: "Title_1",
    text: "Body_1"
  },
  {
    id: "2",
    title: "Title_2",
    text: "Body_2"
  }
];

const notesServiceGood = {
  getAll() {
    return new Promise(resolve => {
      resolve(notes);
    });
  },
  getOneById(id) {
    return new Promise(resolve => {
      resolve(notes[0]);
    });
  },
  createOne(note, cb) {
    cb(null, { ...note, id: "1" });
  },
  deleteOneById(id, cb) {
    cb(null, {});
  },
  updateOneById(id, note, cb) {
    cb(null, { ...note, id });
  }
};

module.exports = notesServiceGood;
