const request = require('request');
const Guest = require('./Guest');

class GuestServiceClient {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    getAllGuests() {
        return new Promise((resolve, reject) => {

            const options = {
                url: this.endpoint + '/guests/list',
                headers: {'Accept': 'application/json'}
            };

            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const parsedBody = JSON.parse(body);
                    const result = parsedBody.guests.map((data) => Guest.fromJson(data));

                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    }

    getGuestById(guestId) {
        return new Promise((resolve, reject) => {

            const options = {
                url: this.endpoint + '/guest/' + guestId,
                headers: {'Accept': 'application/json'}
            };

            request(options, (error, response, body) => {

                if (!error && response.statusCode == 200) {
                    const parsedBody = JSON.parse(body);
                    const result = Guest.fromJson(parsedBody.guest);
                    console.log(error);
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    }
}


module.exports = GuestServiceClient;
