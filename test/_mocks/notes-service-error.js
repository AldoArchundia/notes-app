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
  createOne(note) {
    return new Promise((_, reject) => {
      reject(new Error("Internal server error"));
    });
  },
  deleteOneById(id) {
    return new Promise((_, reject) => {
      reject(new Error("Internal server error"));
    });
  },
  updateOneById(id, note) {
    return new Promise((_, reject) => {
      reject(new Error("Internal server error"));
    });
  }
};

module.exports = notesServiceError;
