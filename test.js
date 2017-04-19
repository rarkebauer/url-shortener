const request = require('supertest');
const express = require('express');
var chai = require('chai');
var expect = chai.expect;
var server = request.agent("http://localhost:3000") //super useful to avoid EADRRINUSE error
var url = require('./url.js')


const app = express();

describe('GET /', function() {
	it('respond with text', function(done) {
		server
		  .get('/')
		  .expect(200)
		  .end(function(err, res) {  //.expect() functions that fail will not throw instead they will return the assertion as an error to the .end() callback
		  	if(err) return done(err);
		  	expect(res.text).to.equal('Welcome to the URL shortener') 
		  	done();
		  });
	});
});

describe('GET /new/notaurl', function() { //testing routing of correct response from isaUrl
	it('respond with text', function(done) {
		server
		  .get('/new/notaurl')
		  .expect(200)
		  .expect("Content-type",/json/)
		  .end(function(err, res) {  //.expect() functions that fail will not throw instead they will return the assertion as an error to the .end() callback
		  	if(err) return done(err);
		  	console.log(res.text)
		  	expect(res.text).to.equal('{"error":"this is not a valid url"}') 
		  	done();
		  });
	});
});

describe('Verify if a parameter is a valid url', function() { //does checkUrl return the correct value?
	describe("checkUrl function", function() {
		it("checks if a route is a valid url", function() {
			var whoops = url.checkUrl('www.')
			var hooray = url.checkUrl('www.hooray.com')
			expect(whoops).to.deep.equal({ error: 'this is not a valid url' }) //need to use deep when comparing types of objects

			expect(hooray).to.equal("this IS a valid url")
		});
	});
});

