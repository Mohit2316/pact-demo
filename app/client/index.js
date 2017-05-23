const GuestServiceClient = require('./GuestServiceClient');

const guestServiceClient = new GuestServiceClient('http://localhost:8081');

guestServiceClient.getAllGuests()
    .then((posts) => {
        console.log(posts);
    })
    .catch((error) => {
        console.log(error);
    });
