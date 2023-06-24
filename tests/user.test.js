const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app"); // two dots because we are in test and we need to go order to app
const server = app.listen(8080, () => console.log(`Let's get ready to test`));
const User = require("../models/user");
let mongoServer; // put it in global scope so everybody can use it

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close(); // programmatic ctrl + c
  mongoServer.stop(); // getting rid of our MongoDB instance itself
  server.close();
});


// describe, test, afterAll, beforeAll ALL comes from Jest

