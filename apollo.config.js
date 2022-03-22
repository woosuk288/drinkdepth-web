module.exports = {
  client: {
    includes: ['./apollo/**/*.{tsx,ts}'],
    tagName: 'gql',
    service: {
      name: 'drink-api',
      // url: "http://localhost:5001/deliverybook-e64d3/asia-northeast3/api/graphql",
      url: 'http://localhost:4010/graphql',
    },
  },
};
