const GuestRepository = require('./GuestRepository');
const Guest = require('./Guest');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const guestRepository = new GuestRepository();

app.use(bodyParser.json());
app.get('/guests/list', function (req, res) {
    const response = {
        guests: guestRepository.fetchAll()
    };

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
});

app.get('/guest/:guestId', function (req, res) {
    const response = {
        guest: guestRepository.getById(req.params.guestId)
    };

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
});

app.get('/states', function (req, res) {
    const response = {
        'Guest UI': ["Has two Guests", "Has one guest"]
    };

    res.end(JSON.stringify(response));
});

app.post('/setup', function (req, res) {
    const state = req.body.state;

    guestRepository.clear();
    switch (state) {
        case 'Has two Guests':
            guestRepository.insert(new Guest('Guest 1', '20'));
            guestRepository.insert(new Guest('Guest 2', '25'));
            break;
        case 'Has one guest':
            guestRepository.insert(new Guest('Guest 1', '20'));
            break;
    }

    res.end();
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})
