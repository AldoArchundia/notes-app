const notesServiceError = {
  getAll(cb) {
    cb(new Error("whatever"));
  }
};

module.exports = notesServiceError;
