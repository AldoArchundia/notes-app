const ObjectId = require("mongodb").ObjectId;
const notesMapper = require("../mappers/notes-mapper");

const NotesMongoService = db => {
  const getAll = () => {
    return new Promise((resolve, reject) => {
      db.collection("notes")
        .find({})
        .toArray((err, notes) => {
          if (err) {
            return reject(err);
          }
          const notesDtos = notes.map(notesMapper.toDto);
          resolve(notesDtos);
        });
    });
  };

  const getOneById = id => {
    return new Promise((resolve, reject) => {
      const _id = new ObjectId(id);
      db.collection("notes").findOne({ _id }, (err, note) => {
        if (err) {
          return reject(err);
        }
        const noteDto = note === null ? null : notesMapper.toDto(note);
        resolve(noteDto);
      });
    });
  };

  const createOne = note => {
    return new Promise((resolve, reject) => {
      db.collection("notes").insertOne(note, (err, r) => {
        if (err) {
          return reject(err);
        }

        const noteDto = notesMapper.toDto(r.ops[0]);
        resolve(noteDto);
      });
    });
  };

  const deleteOneById = id => {
    return new Promise((resolve, reject) => {
      const _id = new ObjectId(id);
      db.collection("notes").deleteOne({ _id }, (err, r) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  };

  const updateOneById = (id, note) => {
    new Promise((resolve, reject) => {
      const _id = new ObjectId(id);
      db.collection("notes").updateOne(
        { _id },
        { $set: { title: note.title, text: note.text } },
        (err, r) => {
          if (err) {
            return reject(err);
          }
        }
      );
      resolve(getOneById(id));
    });
  };

  return {
    getAll,
    getOneById,
    createOne,
    deleteOneById,
    updateOneById
  };
};

module.exports = NotesMongoService;
