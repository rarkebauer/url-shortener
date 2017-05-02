const request = require('supertest');
const express = require('express');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose'); //need to require mongoose in order for tests to connect

var server = request.agent("http://localhost:3000") //super useful to avoid EADRRINUSE error
var url = require('./url.js')

var UrlEntry = require('./mongoose.js');

const app = express();


describe('UrlEntry', function() { //Url entries must contain an original url and a short code
	it('should be invalid if original or shortCode is empty', function(done) {
		var u = new UrlEntry();

		u.validate(function(err) {
			expect(err.errors.original && err.errors.shortCode).to.exist;
			done();
		});
	});
});

describe('GET /', function() { //welcome to the home page
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
		  .get('/new/www')
		  .expect(200)
		  .expect("Content-type",/json/)
		  .end(function(err, res) {  //.expect() functions that fail will not throw instead they will return the assertion as an error to the .end() callback
		  	if(err) return done(err);
		  	expect(res.text).to.equal('{"error":"this is not a valid url"}') 
		  	done();
		  });
	});
});

describe('GET /:shortie route', function() { //test the shortCode lookup route
	it('respond with text', function(done) {
		server
		  .get('/testShort')
		  .expect(200)
		  .expect("Content-type",/json/)
		  .end(function(err, res) {  //.expect() functions that fail will not throw instead they will return the assertion as an error to the .end() callback
		  	if(err) return done(err);
		  	expect(res.text).to.equal('{"error":"this is not a valid short code"}') 
		  	done();
		  });
	});
})

describe('Verify if a parameter is a valid url', function() { //does checkUrl return the correct value?
	describe("checkUrl function", function() {
		it("checks if a route is a valid url", function() {
			var whoops = url.checkUrl('www.');
			var hooray = url.checkUrl('www.hooray.com');

			expect(hooray).to.equal(true);
			expect(whoops).to.equal(undefined);
		});
	});
});

