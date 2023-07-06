const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app"); // two dots because we are in test and we need to go order to app
const server = app.listen(3030, () => console.log(`Let's get ready to test`));

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
    test('It should delete a cart', async () => {
        const item = new Item({ name: 'One Piece', price: 2147483647, description: 'Luffy got it', quantity: 1 })
        await item.save()
        const response = await request(app)
            .delete(`/items/${item._id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual('You have successfully delete a item!') // we're testing the response of the body which is essential the request sent back when we made a good request
    })
    test('It should update a cart', async () => {
    const item = new Item({ name: 'Pen', price: 5.99, description: 'can not erase', quantity: 1 })
    await item.save()
    const response = await request(app)
        .put(`/items/${item._id}`)
        .send({ name: 'Pencil', price: 2.99, description: 'can erase', quantity: 2 })

    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('Pencil')
    expect(response.body.price).toEqual(2.99)
    expect(response.body.description).toEqual('can erase')
    expect(response.body.quantity).toEqual(2)
    })
    test('It should create a cart', async () => {
        const response = await request(app)
        .post('/items')
        .send({ name: 'Pen', price: 5.99, description: 'write better', quantity: 10 })
  
        expect(response.statusCode).toBe(200)
        expect(response.body.item.name).toEqual('Pen')
        expect(response.body.item.price).toEqual(5.99)
        expect(response.body.item.description).toEqual('write better')
        expect(response.body.item.quantity).toEqual(10)
      })
      test('It should display a cart', async () => {
        const item = new Item({ name: 'Pen', price: 5.99, description: 'write better', quantity: 10 })
        await item.save()
        const response = await request(app)
            .get(`/items/${item._id}`)

    expect(response.body.name).toEqual('Pen')
    expect(response.body.description).toEqual('write better')
    expect(response.body.price).toEqual(5.99)
    expect(response.body.quantity).toEqual(10)
    })
    test('It should display all carts', async() => {
        const item1 = new Item({ name: 'Pen', price: 5.99, description: 'write better', quantity: 10 })
        await item1.save()
        const item2 = new Item({ name: 'Glass', price: 599.99, description: 'see better', quantity: 1 })
        await item2.save()
        const response = await request(app)
            .get('/items')

        expect(response.statusCode).toBe(200)
        expect.objectContaining(item1)
        expect.objectContaining(item2)
    })
})