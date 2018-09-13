const notesServiceError = {
  getAll() {
    return new Promise((_, reject) => {
      reject(new Error("whatever"));
    });
  }
};

module.exports = notesServiceError;
