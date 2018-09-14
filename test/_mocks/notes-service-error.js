const notesServiceError = {
  getAll() {
    return new Promise((_, reject) => {
      reject(new Error("whatever"));
    });
  },
  getOneById(id) {
    return new Promise((_, reject) => {
      reject(new Error("whatever2"));
    });
  },
  createOne(note, cb) {
    cb(new Error("Internal server error"));
  },
  deleteOneById(id, cb) {
    cb(new Error("Internal server error"));
  }
};

module.exports = notesServiceError;
