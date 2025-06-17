const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDatabase()
    .db()
    .collection("players")
    .find()
    .toArray((err, players) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(players);
    });
};
const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid player id to find a profile.");
  }
  const playerId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection("players")
    .find({ _id: playerId })
    .toArray((err, player) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(player[0]);
    });
};
const createPlayer = async (req, res) => {
  const player = {
    name: req.body.name,
    position: req.body.position,
    team: req.body.team,
    age: req.body.age,
    appearance: req.body.appearance,
    goals: req.body.goals,
    assists: req.body.assists,
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("players")
      .insertOne(player);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId, ...player });
    } else {
      res.status(500).json({ error: "Failed to create player." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

const updatePlayer = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid player id to update a profile.");
  }
  const userId = new ObjectId(req.params.id);
  const player = {
    name: req.body.name,
    position: req.body.position,
    team: req.body.team,
    age: req.body.age,
    appearance: req.body.appearance,
    goals: req.body.goals,
    assists: req.body.assists,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("players")
    .replaceOne({ _id: userId }, player);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the profile");
  }
};

const deletePlayer = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid player id to delete a profile.");
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("players")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occured while deleting the player profile"
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
