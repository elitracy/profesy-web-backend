import express from "express";
import { PrismaClient } from "@prisma/client";
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

// create user
router.post("/", async (req, res) => {
  const body = req.body;

  prisma.user
    .create({
      data: body,
    })
    .then((user) => {
      res.status(200).json(user);
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
