// implement your API here
const express = require("express");

const server = express();

const db = require("./data/db");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("HOME");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "error getting data" });
    });
});

server.post("/api/users", (req, res) => {
  const data = req.body;
  console.log(data);
  if (data.name && data.bio) {
    db.insert(data)
      .then(() => {
        res.status(201).json({ message: "user added" });
      })
      .catch(() => {
        res.status(500).json({ message: "server error" });
      });
  } else {
    res.status(401).json({ message: "name and bio required" });
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({ message: "server error" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(() => {
      res.status(200).json({ message: "successfully deleted" });
    })
    .catch(() => {
      res.status(500).json({ message: "could not delete" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ message: "successfully updated" });
      } else {
        res.status(401).json({ message: "user not found" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "server error" });
    });
});

server.listen(4000, () => {
  console.log("listening on port 4000");
});
