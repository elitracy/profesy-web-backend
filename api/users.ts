import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const router = express.Router();

// ============================ GET ============================

// get all users
router.get("/", async (_, res) => {
  prisma.user
    .findMany()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get user by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  prisma.user
    .findUnique({ where: { id } })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/login", async (req, res) => {
  const { usernameOrEmail } = req.body;

  const find_username = await prisma.user.findUnique({
    where: { username: usernameOrEmail },
  });

  const find_email = await prisma.user.findUnique({
    where: { email: usernameOrEmail },
  });

  if (!find_username && !find_email) {
    res
      .status(400)
      .json({ error: "Username or email does not exist.", data: null });
    return;
  }

  if (find_username) {
    res.status(200).json({ error: null, data: find_username });
    return;
  }

  if (find_email) {
    res.status(200).json({ error: null, data: find_email });
    return;
  }

  res.status(400).json({ error: "Internal Server Error.", data: null });
});

// ============================ POST ===============================

// get user by email
router.post("/email", async (req, res) => {
  const { email } = req.body;

  prisma.user
    .findUnique({ where: { email } })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get user by username
router.post("/username", async (req, res) => {
  const { username } = req.body;

  prisma.user
    .findUnique({ where: { username } })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// create user
router.post("/", async (req, res) => {
  const { name, username, email, password } = req.body;

  if (await prisma.user.findUnique({ where: { username } })) {
    res.status(400).json({ error: "username exists" });
    return;
  }
  if (await prisma.user.findUnique({ where: { email } })) {
    res.status(400).json({ error: "email exists" });
    return;
  }

  prisma.user
    .create({
      data: { name, username, email, password },
    })
    .then((user) => {
      res.status(200).json({ error: null, ...user });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// ============================ PUT ===============================

// ============================ DELETE ============================

// delete user by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  prisma.user
    .delete({ where: { id } })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default router;
