const { json } = require("body-parser");
var generator = require("../util/generator");
var memStorage = require("../util/memoryStorage");
var model = require("../model/noteModel");


exports.getAllNotes = (req,res) => {
  // var seqId = generator.generate();
  // memStorage.store.setItem(seqId,"1st_key");
  // var seqId_2 = generator.generate();
  // memStorage.store.setItem(seqId_2,"2nd_key");

  var keys = memStorage.getKeys(memStorage.store);
  var values = memStorage.getValues(memStorage.store);

// var Note = model.Note;
// var noteObj = new Note(seqId,"elshayeb","mob&web devolper","abdallah elshayeb",new Date()
// );

  // console.log("values........." + JSON.stringify(values));
return res.status(200).send("All Notes is okkkk " + JSON.stringify(values));
}
exports.saveNotes = (req,res) => {
  var seqId = generator.generate();
var title = req.body.title;
var content = req.body.content;
var createdBy = "admin";
var createdOn = new Date();

if (!title || !content) {
  return res.status(500).send({error: "title and content should not be empty"});
}
var Note = model.Note;
var noteObj = new Note(seqId,title,content,createdBy,createdOn);
memStorage.store.setItem(seqId,noteObj);

return res.status(201).send("All Notes is saves");
}
exports.updateNotes = (req,res) => {
  var noteId = req.body.noteId;
  var title = req.body.title;
  var content = req.body.content;
  var createdBy = "admin";
  var createdOn = new Date();

  if (!title || !content) {
    return res.status(500).send({error: "title and content should not be empty"});
  }

  if(!noteId) {
    return res.status(500).send({error: "noteId should not be empty"});
  }

  var noteItem = memStorage.store.getItem(noteId);
  if (!noteItem) {
    return res.status(500).send({error: "noteId is not exist"});
  }
  var Note = model.Note;
  var noteObj = new Note(noteId,title,content,createdBy,createdOn);
  memStorage.store.setItem(noteId,noteObj);
res.send("All Notes is update");
}
exports.deleteNotes = (req,res) => {

  var noteId = req.params.noteId;

  if (!noteId) {
    return res.status(500).send({error: "can not delete empty noteId"})
  }
var noteItem = memStorage.store.getItem(noteId);

if (!noteItem) {
  return res.status(500).send({error: "noteId is not exist"});
}

memStorage.store.removeItem(noteId);

return res.status(200).send("note is deleted");
}