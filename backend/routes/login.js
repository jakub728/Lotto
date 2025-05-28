import express from "express";
import path from "path";
import fs from "fs/promises";
import { v4 as newID } from "uuid";

const router = express.Router();

const loginPath = path.join(path.resolve(), "data", "logins.json");
let users = JSON.parse(await fs.readFile(loginPath, "utf-8"));

router.use(express.json());

router.get("/", (req, res) => {
  res.send(users);
});

// LOGIN USER
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ success: true, data: user.id });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// GET ALL SAVED NUMBERS OF USER
router.get("/:id", async (req, res) => {
  users = JSON.parse(await fs.readFile(loginPath, "utf-8"));
  const { id } = req.params;

  const user = users.find((u) => u.id === id);

  if (user) {
    res.json(
      user.saved.map((e) => ({
        date: e.date,
        five: e.five,
        two: e.two,
      }))
    );
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

// ADDING NEW NUMBERS
router.post("/:id", async (req, res) => {
  users = JSON.parse(await fs.readFile(loginPath, "utf-8"));

  const { id } = req.params;
  const { date, five, two } = req.body;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const newSaving = { numbersId: newID(), date: date, five: five, two: two };
  user.saved.push(newSaving);

  await fs.writeFile(loginPath, JSON.stringify(users, null, 2), "utf-8");
  res.send(user.saved);
});

// DELETING NUMBERS
router.delete("/:id", async (req, res) => {
  users = JSON.parse(await fs.readFile(loginPath, "utf-8"));

  const { id } = req.params;
  const { numbersId } = req.body;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  user.saved = user.saved.filter((item) => item.numbersId !== numbersId);

  await fs.writeFile(loginPath, JSON.stringify(users, null, 2), "utf-8");
  res.send(user.saved);
});

export default router;
