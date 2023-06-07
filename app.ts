import express from "express";
import path from "path";
import cors from "cors";

const app = express();

// import endpoints
import users from "./api/users";
import professsors from "./api/professors";
import courses from "./api/courses";

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// attach endpoints to their functions
app.use("/users", users);
app.use("/professors", professsors);
app.use("/courses", courses);

// host basic webpage (can be updated later but not necessary)
app.get("/", (_, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

export default app;
