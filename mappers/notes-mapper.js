const toDto = mongoObj => {
  return {
    id: mongoObj._id,
    title: mongoObj.title,
    text: mongoObj.text,
    _link: {
      rel: "self",
      url: `/notes/${mongoObj._id}`
    }
  };
};

module.exports = {
  toDto
};
