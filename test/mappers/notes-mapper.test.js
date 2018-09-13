const expect = require("chai").expect;
const notesMapper = require("../../mappers/notes-mapper");

describe("notes-mapper", () => {
  describe("#toDto()", () => {
    it("should convert a mongo-object into a note-dto", () => {
      // 1 Setup enviroment
      const mongoObj = {
        _id: "whatever_ID",
        title: "this_title",
        text: "sexy_body"
      };
      // 2 Eval
      const result = notesMapper.toDto(mongoObj);
      // 3 Set expectatives
      const expected = {
        id: "whatever_ID",
        title: "this_title",
        text: "sexy_body",
        _link: {
          rel: "self",
          url: "/notes/whatever_ID"
        }
      };
      // 4 Compare expectatives
      expect(result).to.be.deep.equal(expected);
    });
  });
});
