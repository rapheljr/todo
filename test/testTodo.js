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
    id: 1, title: 'retail', username: 'user', items: ['buy', 'sell']
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

  describe('POST /register', () => {

    it('should redirect to home page', (done) => {
      request(createApp(config))
        .post('/register')
        .send('name=a&username=b&password=c')
        .expect('location', '/home')
        .expect(302, done)
    });

  });

  describe('POST /login', () => {

    it('should redirect to home page', (done) => {
      request(createApp(config))
        .post('/login')
        .send('username=user&password=pass')
        .expect('location', '/home')
        .expect(302, done)
    });

  });

});

