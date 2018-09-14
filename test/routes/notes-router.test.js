const request = require("supertest");
const express = require("express");
const expect = require("chai").expect;
const bodyParser = require("body-parser");
const notesServiceGood = require("../_mocks/notes-service-good");
const notesServiceError = require("../_mocks/notes-service-error");
const notesServiceNotFound = require("../_mocks/notes-service-notfound");
const NotesRouter = require("../../routes/notes-router");

describe("notes-router", () => {
  let app = null;

  before(() => {
    app = express();
    const notesRouterGood = NotesRouter(notesServiceGood);
    const notesRouterError = NotesRouter(notesServiceError);
    const notesRouterNotFound = NotesRouter(notesServiceNotFound);

    app.use(bodyParser.json());
    app.use("/notes", notesRouterGood);
    app.use("/notes-error", notesRouterError);
    app.use("/notes-404", notesRouterNotFound);
  });

  describe("GET /", () => {
    it("should return a list of notes", done => {
      request(app)
        .get("/notes")
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(Object.keys(res.body.notes)).to.be.an("Array");
          done();
        });
    });
    it("should return an error", done => {
      request(app)
        .get("/notes-error")
        .expect(500)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.be.deep.equal({ error: "Internal server error" });
          done();
        });
    });
  });

  describe("GET /:id", () => {
    it("should return the note that matches the provided ID", done => {
      request(app)
        .get("/notes/1")
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.body.note).to.be.deep.equal({
            id: "1",
            title: "Title_1",
            text: "Body_1"
          });
          done();
        });
    });
    it("should return an error", done => {
      request(app)
        .get("/notes-error/2")
        .expect(500)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.body).to.be.deep.equal({ error: "Internal server error" });
          done();
        });
    });
    it("should return not found", done => {
      request(app)
        .get("/notes-404/1")
        .expect(404)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.body).to.be.deep.equal({ message: "Note not found" });
          done();
        });
    });
  });

  describe("POST /", () => {
    it("should return the note that was created", done => {
      request(app)
        .post("/notes")
        .send({ title: "Title_1", text: "Body_1" })
        .expect(201)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.body.note.title).to.be.equal("Title_1");
          expect(res.body.note.text).to.be.equal("Body_1");
          expect(res.body.note.id).to.be.ok;
          done();
        });
    });
    it("should return an error", done => {
      request(app)
        .post("/notes-error")
        .send({ title: "Title_1", text: "Body_1" })
        .expect(500)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.body).to.be.deep.equal({ error: "Internal server error" });
          done();
        });
    });
  });

  describe("DELETE /:id", () => {
    it("should return the note that matches the provided ID", done => {
      request(app)
        .delete("/notes/1")
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.body).to.be.deep.equal({});
          done();
        });
    });
    it("should return an error", done => {
      request(app)
        .delete("/notes-error/1")
        .expect(500)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.body).to.be.deep.equal({ error: "Internal server error" });
          done();
        });
    });
  });

  describe("PUT /:id", () => {
    it("should return the note that was updated", done => {
      request(app)
        .put("/notes/1")
        .send({ title: "Title_1", text: "Body_1" })
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.body.note.title).to.be.equal("Title_1");
          expect(res.body.note.text).to.be.equal("Body_1");
          expect(res.body.note.id).to.be.equal("1");
          done();
        });
    });
    it("should return an error", done => {
      request(app)
        .put("/notes-error/1")
        .send({ title: "Title_1", text: "Body_1" })
        .expect(500)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res.body).to.be.deep.equal({ error: "Internal server error" });
          done();
        });
    });
  });
});
