const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  console.log("➡️ Reached getAllPlayers");
  try {
    const db = mongodb.getDatabase().db();
    console.log("✅ DB accessed");

    const players = await db.collection("players").find().toArray();
    console.log("📦 Players fetched:", players.length);

    return res.status(200).json(players);
  } catch (err) {
    console.error("❌ Error in getAllPlayers:", err);
    return res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json("Must use a valid player id to find a profile.");
  }
  const playerId = new ObjectId(req.params.id);

  try {
    const db = mongodb.getDatabase().db();
    const player = await db.collection("players").findOne({ _id: playerId });

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    return res.status(200).json(player);
  } catch (err) {
    console.error("❌ Error in getSingle:", err);
    return res.status(500).json({ message: err.message });
  }
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
    const db = mongodb.getDatabase().db();
    const response = await db.collection("players").insertOne(player);

    if (response.acknowledged) {
      return res.status(201).json({ id: response.insertedId, ...player });
    } else {
      return res.status(500).json({ error: "Failed to create player." });
    }
  } catch (err) {
    console.error("❌ Error in createPlayer:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
};

const updatePlayer = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json("Must use a valid player id to update a profile.");
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

  try {
    const db = mongodb.getDatabase().db();
    const response = await db
      .collection("players")
      .replaceOne({ _id: userId }, player);

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      return res
        .status(404)
        .json({ message: "Player not found or no changes made." });
    }
  } catch (err) {
    console.error("❌ Error in updatePlayer:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
};

const deletePlayer = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json("Must use a valid player id to delete a profile.");
  }
  const userId = new ObjectId(req.params.id);

  try {
    const db = mongodb.getDatabase().db();
    const response = await db.collection("players").deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: "Player not found." });
    }
  } catch (err) {
    console.error("❌ Error in deletePlayer:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
