const fs = require('fs');
const assert = require('assert');
const request = require('supertest');
const { createApp } = require('../src/todo.js');

const key = fs.readFileSync('./db/keys.json', 'utf-8');
const config = {
  path: 'public',
  db: './db/test.json',
  session: JSON.parse(key),
  env: 'development'
};

const content = {
  users: [{
    id: 1, name: 'name', username: 'user', password: 'pass'
  }],
  lists: [{
    id: 1, title: 'retail', username: 'user', items: [{ id: 1, name: 'buy', done: true }, { id: 1, name: 'sell', done: false }]
  }]
};

fs.writeFileSync(config.db, JSON.stringify(content));

describe('todo', () => {

  describe('GET /', () => {

    it('should redirect to login page if no cookie', (done) => {
      request(createApp(config))
        .get('/')
        .expect('location', '/login.html')
        .expect(302, done)
    });

  });

  describe('GET /login.html', () => {

    it('should open to login page', (done) => {
      request(createApp(config))
        .get('/login.html')
        .expect(/Login todo/)
        .expect(200, done)
    });

  });

  describe('GET /register.html', () => {

    it('should open to register page', (done) => {
      request(createApp(config))
        .get('/register.html')
        .expect(/Register todo/)
        .expect(200, done)
    });

  });

  describe('GET /something', () => {

    it('should redirect to 404 page', (done) => {
      request(createApp(config))
        .get('/something')
        .expect('location', '/404.html')
        .expect(302, done)
    });

  });

  describe('POST /register', () => {

    it('should redirect to home page', (done) => {
      request(createApp(config))
        .post('/register')
        .send('name=a&username=b&password=c')
        .expect('location', '/')
        .expect(302, done)
    });

  });

  describe('POST /login', () => {

    it('should redirect to home page', (done) => {
      request(createApp(config))
        .post('/login')
        .send('username=user&password=pass')
        .expect('location', '/')
        .expect(302, done)
    });

  });

  describe('POST /add-list', () => {

    it('should add list to home page', (done) => {
      request(createApp(config))
        .post('/add-list')
        .set('Cookie', 'session.sig=oj1giD3wyCfnzHQGTbACLoRIi6A;session=eyJ1c2VybmFtZSI6InVzZXIiLCJ0aW1lIjoiMjAyMi0wNy0yMFQwNDozNjoyOS4zMDdaIiwiaWQiOjE2NTgyOTE3ODkzMDd9')
        .send({ title: 'invitation' })
        .expect(/invitation/)
        .expect(200, done)
    });

  });

});

