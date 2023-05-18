import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();

// ============================ GET ============================
// ============================ POST ===========================

// get all courses
router.get("/", async (req, res) => {
  prisma.course
    .findMany()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get all courses in department (name)
router.get("/:name", async (req, res) => {
  const { name } = req.params;

  prisma.course
    .findMany({
      where: {
        name: {
          search: name,
        },
      },
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get course by department (name) and number
router.get("/:name/:number", async (req, res) => {
  const { name, number } = req.params;

  prisma.course
    .findMany({
      where: {
        name: {
          search: name,
        },
        number: {
          search: number,
        },
      },
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get all courses by professor
router.get("/:professor", async (req, res) => {
  const { professor } = req.params;

  prisma.course
    .findMany({
      where: {
        professor: {
          name: {
            search: professor,
          },
        },
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

export default router;
