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

});

