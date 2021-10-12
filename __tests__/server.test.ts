import {PORT} from '../server/server';
import request from 'supertest';

const server = `http://localhost:${PORT}`;

describe("router unit tests", () => {

  describe("GET", () => {
    it("should return with a status code of 200", (done) => {
      request(server).get('/')
        .send()
        .expect(200)
      done();
    });

    it("returns an html file", (done) => {
      request(server).get('/')
        .expect('text/html; charset=UTF-8')
      done();
    })
  })
});