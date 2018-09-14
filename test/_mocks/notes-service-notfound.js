const notesServiceNotFound = {
  getOneById(id, cb) {
    return new Promise(resolve => {
      resolve(null);
    });
  }
};

module.exports = notesServiceNotFound;
