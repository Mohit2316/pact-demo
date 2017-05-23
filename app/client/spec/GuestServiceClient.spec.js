const path = require('path');
const chai = require('chai');
const Pact = require('pact');
const chaiAsPromised = require('chai-as-promised');
const wrapper = require('@pact-foundation/pact-node');
const GuestServiceClient = require('../GuestServiceClient');
const Guest = require('../Guest');

const expect = chai.expect;

chai.use(chaiAsPromised);

describe('Pact', function () {
    let provider;
    this.timeout(40000);
    // Configure mock server
    const mockServer = wrapper.createServer({
        port: 8181,
        // log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
        dir: path.resolve(process.cwd(), 'pact-new'),
        spec: 2
    });

    // Define expected payloads
    const expectedGuestList = {
        guests: [
            {id: 1, name: 'Guest 1', age: '20'},
            {id: 2, name: 'Guest 2', age: '25'}
        ]
    };

    const expectedGuestById = {
        guest: {id: 1, name: 'Guest 1', age: '20'}
    };

    before((done) => {

        // Start mock server
        mockServer.start().then(() => {
            provider = Pact({consumer: 'Guest UI', provider: 'Guests Provider', port: 8181});

            // Add interactions
            provider.addInteraction({
                state: 'Has two Guests',
                uponReceiving: 'a request for all guests',
                withRequest: {
                    method: 'GET',
                    path: '/guests/list',
                    headers: {'Accept': 'application/json'}
                },
                willRespondWith: {
                    status: 200,
                    headers: {'Content-Type': 'application/json'},
                    body: expectedGuestList
                }
            }).then(() => {
                provider.addInteraction({
                    state: 'Has one guest',
                    uponReceiving: 'a request for one post',
                    withRequest: {
                        method: 'GET',
                        path: '/guest/1',
                        headers: {'Accept': 'application/json'}
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {'Content-Type': 'application/json'},
                        body: expectedGuestById
                    }
                }).then(() => done())
            })
        })
    });

    // Verify service client works as expected
    it('successfully receives all guests information', (done) => {
        const guestServiceClient = new GuestServiceClient('http://localhost:1234');
        const verificationPromise = guestServiceClient.getAllGuests();
        const expectedGuests = [
            Guest.fromJson(expectedGuestList.guests[0]),
            Guest.fromJson(expectedGuestList.guests[1])
        ];

        expect(verificationPromise).to.eventually.eql(expectedGuests).notify(done);
    });

    it('successfully receives one guest information', (done) => {
        const guestServiceClient = new GuestServiceClient('http://localhost:1234');
        const verificationPromise = guestServiceClient.getGuestById(1);
        const expectedGuest = Guest.fromJson(expectedGuestById.guest);

        expect(verificationPromise).to.eventually.eql(expectedGuest).notify(done);
    });

    after(() => {
        // Write pact files
        provider.finalize().then(() => {
            wrapper.removeAllServers()

        })
    });
});
