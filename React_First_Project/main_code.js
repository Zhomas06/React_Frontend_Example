var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var fetch = require('node-fetch');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
require('dotenv').config();

let client_id = process.env.client_id
let client_secret = process.env.client_secret
let redirect_uri = process.env.redirect_uri
let BASIC_AUTH = process.env.BASIC_AUTH

var myHeaders = new fetch.Headers();
myHeaders.append("Authorization", "Basic" + BASIC_AUTH);
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "refresh_token");
urlencoded.append("refresh_token", "{{refresh_token}}");

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
};

fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));