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


describe('Test the user endpoints', () => {
  test('It should create a new user and cart', async () => {
      const response = await request(app)
      .post('/users')
      .send({ name: 'Jun', password: 'password', email: 'jib5549@gmail.com' })

  expect(response.statusCode).toBe(200)
  expect(response.body.user.name).toEqual('Jun')
  expect(response.body.user.email).toEqual('jib5549@gmail.com')
  expect(response.body).toHaveProperty('token')
  expect(response.body.user.loggedIn).toEqual(false)
  })
  test('It should allow a user to log in', async () => {
      const user = new User({ name: 'Jun', password: 'password', email: 'jib5549@gmail.com' })
      await user.save()
      const response = await request(app)
          .post('/users/login')
          .send({ email: 'jib5549@gmail.com', password: 'password' })

      expect(response.statusCode).toBe(200)
      expect(response.body.user.name).toEqual('Jun')
      expect(response.body.user.email).toEqual('jib5549@gmail.com')
      expect(response.body).toHaveProperty('token')
      expect(response.body.user.loggedIn).toEqual(true)
  })
 test('It should update a user', async () => {
        const user = new User({ name: 'Jun', email: 'jib5549@gmail.com', password: 'password' })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .put(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Jane Doe', email: 'jane.doe@example.com' })

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Jane Doe')
        expect(response.body.email).toEqual('jane.doe@example.com')
    })
    test('It should delete a user', async () => {
        const user = new User({ name: 'Jun', email: 'jib5549@gmail.com', password: 'password' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .delete(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(204)
        
    })
    test('It should log out a user', async () => {
        const user = new User({ name: 'Jun', email: 'jib5549@gmail.com', password: 'password' });
         await user.save();
         const token = await user.generateAuthToken()
        const logoutResponse = await request(app)
          .post('/users/logout')
          .set('Authorization', `Bearer ${token}`);
          
        expect(logoutResponse.statusCode).toBe(200);
        expect(logoutResponse.body.message).toEqual('User successfully logged out!');
        expect(response.body.loggedIn).toEqual(false)
    })
})

