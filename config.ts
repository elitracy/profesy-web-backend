import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

export default {
  NODE_ENV: process.env.NODE_ENV || "production",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
};
