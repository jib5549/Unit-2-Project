const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // two dots because we are in test and we need to go order to app
const server = app.listen(5050, () => console.log(`Let's get ready to test`));

const Item = require('../models/items')
const User = require('../models/user')
const Cart = require('../models/cart')

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
    test('It should display all items', async() => {
    const user = new User({ name: 'John', email: 'bobby123@gmail.com', password: 'password' })
    await user.save()
    const token = await user.generateAuthToken()
    const item1 = new Item({ name: 'Pen', price: 5.99, description: 'write better', quantity: 10 })
    await item1.save()
    const item2 = new Item({ name: 'Glass', price: 599.99, description: 'see better', quantity: 1 })
    await item2.save()
    const response = await request(app)
        .get('/items')
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(200)
      expect.objectContaining(item1)
      expect.objectContaining(item2)
    })
    test('It should create an item', async () => {
      const user = new User({ name: 'John', email: 'bobbyyy@gmail.com', password: 'password' })
      await user.save()
      const token = await user.generateAuthToken()
      const response = await request(app)
        .post('/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Pen', price: 5.99, description: 'write better', quantity: 10 })

      expect(response.statusCode).toBe(200)
      expect(response.body.name).toEqual('Pen')
      expect(response.body.price).toEqual(5.99)
      expect(response.body.description).toEqual('write better')
      expect(response.body.quantity).toEqual(10)
    })
    test('It should update an item', async () => {
    const user = new User({ name: 'John', email: 'bobby@gmail.com', password: 'password' })
    await user.save()
    const token = await user.generateAuthToken()
    const item = new Item({ name: 'Pen', price: 5.99, description: 'can not erase', quantity: 1 })
    await item.save()
    const response = await request(app)
        .put(`/items/${item._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Pen', price: 2.99, description: 'can not erase', quantity: 1 })

    expect(response.body.price).toEqual(2.99)
    })
    test('It should delete an item', async () => {
      const user = new User({ name: 'Jun', email: 'jib57549@gmail.com', password: 'password' })
      await user.save()
      const token = await user.generateAuthToken()
      const item = new Item({ name: 'One Piece', price: 2147483647, description: 'Luffy got it', quantity: 1 })
      await item.save()
      const response = await request(app)
          .delete(`/items/${item._id}`)
          .set('Authorization', `Bearer ${token}`)

      expect.not.objectContaining(item)
    })
    test('It should display an item', async () => {
      const user = new User({ name: 'John', email: 'bobby123456@gmail.com', password: 'password' })
      await user.save()
      const token = await user.generateAuthToken()
      const item = new Item({ name: 'Pen', price: 5.99, description: 'write better', quantity: 10 })
      await item.save()
      const response = await request(app)
          .get(`/items/${item._id}`)
          .set('Authorization', `Bearer ${token}`)

    expect(response.body.name).toEqual('Pen')
    expect(response.body.description).toEqual('write better')
    expect(response.body.price).toEqual(5.99)
    expect(response.body.quantity).toEqual(10)
    })
})