const router = require("express").Router();
const Notes = require("../models/Notes");

const verifyToken = require("../middlewares/verifyToken");


router.get("/", verifyToken, async (req, res) => {
  try {
    const notes = await Notes.find({author: req.user._id }).sort({createdAt: -1});
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

router.get("/search", verifyToken, async (req, res) => {
  const { query } = req.query;
  try {
    const notes = await Notes.find({ author: req.user._id }).find({
      $text: { $search: query },
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


module.exports = router;
