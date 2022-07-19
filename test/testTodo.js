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

});

