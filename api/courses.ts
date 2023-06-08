import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();

// ============================ GET ============================

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
          startsWith: name,
          mode: "insensitive",
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
          startsWith: number,
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

// get all courses for a professor
router.get("/professor/:professor", async (req, res) => {
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

// get semesters for a professor and course
// needs to be POST to use body :/
router.post("/professor/semesters", async (req, res) => {
  const { professor, name, number } = req.body;

  prisma.course
    .findMany({
      where: {
        professor: {
          name: professor,
        },
        name,
        number,
      },
    })
    .then((semesters) => {
      res.status(200).json(semesters);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// ============================ PUT ===========================
// ============================ DELETE ===========================

export default router;
