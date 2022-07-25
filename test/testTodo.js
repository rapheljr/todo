const fs = require('fs');
const request = require('supertest');
const { createApp } = require('../src/todo.js');
require('dotenv').config();

const { path, sessionKeys } = process.env;

const config = {
  path, db: './db/test.json',
  session: JSON.parse(sessionKeys),
  env: 'development'
};

const setup = () => {
  const content = {
    users: [{
      id: 1, name: 'name', username: 'user', password: 'pass'
    }],
    lists: [{
      id: 1, title: 'retail', username: 'user', deleted: false, done: true
    }],
    items: [
      { id: 1, name: 'buy', list: 1, done: false, deleted: false },
      { id: 2, name: 'sell', list: 1, done: false, deleted: false }]
  };

  fs.writeFileSync(config.db, JSON.stringify(content));
};

const cookie = 'session.sig=oj1giD3wyCfnzHQGTbACLoRIi6A;session=eyJ1c2VybmFtZSI6InVzZXIiLCJ0aW1lIjoiMjAyMi0wNy0yMFQwNDozNjoyOS4zMDdaIiwiaWQiOjE2NTgyOTE3ODkzMDd9';

describe('todo', () => {

  beforeEach(setup);

  describe('GET /', () => {

    it('should redirect to login page if no cookie', (done) => {
      request(createApp(config))
        .get('/')
        .expect('location', '/login.html')
        .expect(302, done);
    });

    it('should show home page if cookie is present', (done) => {
      request(createApp(config))
        .get('/')
        .set('Cookie', cookie)
        .expect(/Welcome/)
        .expect(200, done);
    });

  });

  describe('GET /login.html', () => {

    it('should open to login page', (done) => {
      request(createApp(config))
        .get('/login.html')
        .expect(/Login todo/)
        .expect(200, done);
    });

  });

  describe('GET /register.html', () => {

    it('should open to register page', (done) => {
      request(createApp(config))
        .get('/register.html')
        .expect(/Register todo/)
        .expect(200, done);
    });

  });

  describe('GET /logout', () => {

    it('should redirect to login page', (done) => {
      request(createApp(config))
        .get('/logout')
        .expect('location', '/login.html')
        .expect(302, done);
    });

  });

  describe('GET /something', () => {

    it('should redirect to 404 page', (done) => {
      request(createApp(config))
        .get('/something')
        .expect('location', '/404.html')
        .expect(302, done);
    });

  });

  describe('POST /register', () => {

    it('should redirect to home page', (done) => {
      request(createApp(config))
        .post('/register')
        .send('name=a&username=b&password=c')
        .expect('location', '/')
        .expect(302, done);
    });

    it('should redirect to invalid page if username is invalid', (done) => {
      request(createApp(config))
        .post('/register')
        .send('username=user&password=pass')
        .expect('location', '/invalidUsername.html')
        .expect(302, done);
    });

  });

  describe('POST /login', () => {

    it('should redirect to home page if credentials is valid', (done) => {
      request(createApp(config))
        .post('/login')
        .send('username=user&password=pass')
        .expect('location', '/')
        .expect(302, done);
    });

    it('should redirect to invalid page if credentials is invalid', (done) => {
      request(createApp(config))
        .post('/login')
        .send('username=use&password=pas')
        .expect('location', '/invalidLogin.html')
        .expect(302, done);
    });

  });

  describe('POST /api/add-list', () => {

    it('should add list to home page', (done) => {
      request(createApp(config))
        .post('/api/add-list')
        .set('Cookie', cookie)
        .send({ title: 'wedding' })
        .expect(/wedding/)
        .expect(200, done);
    });

  });

  describe('POST /api/add-item', () => {

    it('should add list to home page', (done) => {
      request(createApp(config))
        .post('/api/add-item')
        .set('Cookie', cookie)
        .send({ item: 'invitation', list: 1 })
        .expect(/invitation/)
        .expect(200, done);
    });

  });

  describe('POST /api/mark-item', () => {

    it('should mark item in the list', (done) => {
      request(createApp(config))
        .post('/api/mark-item')
        .set('Cookie', cookie)
        .send({ id: 2 })
        .expect(/done/)
        .expect(200, done);
    });

  });

  describe('DELETE /api/delete-item', () => {

    it('should delete item in the list', (done) => {
      request(createApp(config))
        .delete('/api/delete-item')
        .set('Cookie', cookie)
        .send({ id: 2 })
        .expect(/deleted/)
        .expect(200, done);
    });

  });

  describe('DELETE /api/delete-list', () => {

    it('should delete list in the page', (done) => {
      request(createApp(config))
        .delete('/api/delete-list')
        .set('Cookie', cookie)
        .send({ id: 1 })
        .expect(/deleted/)
        .expect(200, done);
    });

  });

});
