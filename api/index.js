const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const loadApiDataInDb = require("./src/utils/loadApiDataInDb.js");
require("dotenv").config();
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    await loadApiDataInDb();
    console.log("Server is listening at", PORT); // eslint-disable-line no-console
  });
});
