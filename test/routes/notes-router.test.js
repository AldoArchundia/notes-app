const request = require("supertest");
const express = require("express");
const expect = require("chai").expect;
const notesServiceGood = require("../_mocks/notes-service-good");
const notesServiceError = require("../_mocks/notes-service-error");
const NotesRouter = require("../../routes/notes-router");

describe("notes-router", () => {
  let app = null;

  before(() => {
    app = express();
    const notesRouterGood = NotesRouter(notesServiceGood);
    const notesRouterError = NotesRouter(notesServiceError);

    app.use("/notes", notesRouterGood);
    app.use("/notes-error", notesRouterError);
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
});
