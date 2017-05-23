const verifier = require('pact').Verifier
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiAsPromised)

const GuestService = require('../GuestService');

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of Matching Service', function () { // lexical binding required here
    this.timeout(30000)

    let opts = {
      provider: 'Guests%20Provider',
      providerBaseUrl: 'http://localhost:8081',
      providerStatesUrl: 'http://localhost:8081/states',
      providerStatesSetupUrl: 'http://localhost:8081/setup',
      // Fetch pacts from broker
      pactBrokerUrl: 'https://test.pact.dius.com.au/',
      // Fetch from broker with given tags
      tags: ['prod', 'sit5'],
      // Specific Remote pacts (doesn't need to be a broker)
      // pactUrls: ['https://test.pact.dius.com.au/pacts/provider/Animal%20Profile%20Service/consumer/Matching%20Service/latest'],
      // Local pacts
      // pactUrls: [path.resolve(process.cwd(), './pact-new/.json')],
      pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
      pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1',
      publishVerificationResult: true,
      providerVersion: "1.0.0"
    }

    return verifier.verifyProvider(opts)
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})
