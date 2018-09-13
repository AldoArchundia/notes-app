const ObjectId = require("mongodb").ObjectId;
const notesMapper = require("../mappers/notes-mapper");

const NotesMongoService = db => {
  const getAll = cb => {
    db.collection("notes")
      .find({})
      .toArray((err, notes) => {
        if (err) {
          cb(err);
        }

        const notesDtos = notes.map(notesMapper.toDto);

        cb(null, notesDtos);
      });
  };

  const getOneById = (id, cb) => {
    const _id = new ObjectId(id);
    db.collection("notes").findOne({ _id }, (err, note) => {
      if (err) {
        return cb(err);
      }

      const noteDto = notesMapper.toDto(note);
      cb(null, noteDto);
    });
  };

  const createOne = (note, cb) => {
    db.collection("notes").insertOne(note, (err, r) => {
      if (err) {
        return cb(err);
      }

      const noteDto = notesMapper.toDto(r.ops[0]);
      cb(null, noteDto);
    });
  };

  return {
    getAll,
    getOneById,
    createOne
  };
};

module.exports = NotesMongoService;