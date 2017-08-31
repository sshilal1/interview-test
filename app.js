// To Start application, run the following:
// npm install
// node app.js
// open localhost:3000

const express = require('express');
const app = express();
const http = require('http').Server(app);
const request = require('request-promise');

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
	res.sendFile('index.html', { root : __dirname });
})
app.get('/data', function(req, res) {
	request('https://private-f3b4b-interview2.apiary-mock.com/data', function(error, response){
		// request the data
		const body = JSON.parse(response.body);
		const data = body.players;
	}).then(function(data) {
		// send to client
		res.send(data);
	})
})

http.listen(3000, function(){
	console.log('listening on *:3000');
});