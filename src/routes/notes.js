const Notes = require("../models/Notes");

const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const notes = await Notes.find({ author: req.body.author });
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const newNote = new Notes(req.body);
  try {
    const saveNote = await newNote.save();
    res.status(200).json(saveNote);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json("Ok");
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const note = await Notes.findOne({_id: req.params.id});
    res.status(200).json(note);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
