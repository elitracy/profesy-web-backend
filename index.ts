import app from "./app";

import config from "./config";
const port = process.env.PORT || 3000;

console.log(`Using ${config.NODE_ENV} environment.`);
app.listen(port, () =>
  console.log(`🦧 Server ready at: http://localhost:${port}`)
);
