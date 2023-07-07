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
      const user = new User({ name: 'Jun', email: 'jib57323549@gmail.com', password: 'password' })
      await user.save()
      const token = await user.generateAuthToken()
      const item = new Item({ name: 'Pen', price: 5.99, description: 'write better', quantity: 10 })
      await item.save()
      const cart = new Cart({ totalItems: 1, totalPrice: 2, items: [item._id], user: user._id })
      await cart.save()
      const response = await request(app)
          .delete(`/cart/${cart._id}`)
          .set('Authorization', `Bearer ${token}`)

      expect.not.objectContaining(cart)
      expect(response.statusCode).toBe(302)

    })
    // test('It should update a cart', async () => {
    // const user = new User({ name: 'Jun', email: 'jib57354129@gmail.com', password: 'password' })
    // await user.save()
    // const token = await user.generateAuthToken()
    // const item = new Item({ name: 'Pen', price: 5.99, description: 'can not erase', quantity: 1 })
    // await item.save()
    // const response = await request(app)
    //     .put(`/cart/${cart._id}`)
    //     .set('Authorization', `Bearer ${token}`)
    //     .send({ name: 'Pencil', price: 2.99, description: 'can erase', quantity: 2 })

    // expect(response.statusCode).toBe(200)
    // expect(response.body.name).toEqual('Pencil')
    // expect(response.body.price).toEqual(2.99)
    // expect(response.body.description).toEqual('can erase')
    // expect(response.body.quantity).toEqual(2)
    // })
    test('It should create a cart', async () => {
        const user = new User({ name: 'Jun', email: 'jib57354439@gmail.com', password: 'password' })
        await user.save()
        const token = await user.generateAuthToken()
        const item = new Item({ name: 'Pen', price: 5.99, description: 'write better', quantity: 10 })
        await item.save()
        const response = await request(app)
        .post('/cart')
        .set('Authorization', `Bearer ${token}`)
        .send({ totalItems: 1, totalPrice: 2, items: [item._id], user: user._id })
  
        expect(response.statusCode).toBe(200)
        expect(response.body.totalItems).toEqual(1)
        expect(response.body.totalPrice).toEqual(2)
        // expect(response.body.item.description).toEqual('write better')
        // expect(response.body.item.quantity).toEqual(10)
      })
      test('It should display a cart', async () => {
        const user = new User({ name: 'Jun', email: 'jib57355449@gmail.com', password: 'password' })
        await user.save()
        const token = await user.generateAuthToken()
        const item = new Item({ name: 'Pen', price: 5.99, description: 'write better', quantity: 10 })
        await item.save()
        const cart = new Cart({ totalItems: 1, totalPrice: 2, items: [item._id], user: user._id })
        await cart.save()
        const response = await request(app)
            .get(`/cart/${cart._id}`)
            .set('Authorization', `Bearer ${token}`)

          expect(response.statusCode).toBe(200)  
          // expect(response.body.name).toEqual('Pen')
          // expect(response.body.description).toEqual('write better')
          // expect(response.body.price).toEqual(5.99)
          // expect(response.body.quantity).toEqual(10)
    })
    test('It should display all carts', async() => {
        const user = new User({ name: 'Jun', email: 'jib57343549@gmail.com', password: 'password' })
        await user.save()
        const token = await user.generateAuthToken()
        const item1 = new Item({ name: 'Pen', price: 5.99, description: 'write better', quantity: 10 })
        await item1.save()
        const item2 = new Item({ name: 'Glass', price: 599.99, description: 'see better', quantity: 1 })
        await item2.save()
        const cart1 = new Cart({ totalItems: 1, totalPrice: 2, items: [item1._id], user: user._id })
        await cart1.save()
        const cart2 = new Cart({ totalItems: 2, totalPrice: 3, items: [item2._id], user: user._id })
        await cart2.save()
        const response = await request(app)
            .get('/cart')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect.objectContaining(item1)
        expect.objectContaining(item2)
    })
})