import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();

// ============================ GET ============================

// get all professors
router.get("/", async (req, res) => {
  prisma.professor
    .findMany()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get professor by name
router.get("/:name", async (req, res) => {
  const { name } = req.params;

  prisma.professor
    .findMany({
      where: {
        name: name,
      },
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get professor by id
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  prisma.professor
    .findUnique({
      where: {
        id,
      },
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// ============================ POST ===========================
// ============================ PUT ==========================
// ============================ DELETE ===========================

export default router;
