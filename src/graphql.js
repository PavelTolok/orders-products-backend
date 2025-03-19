const { gql } = require("graphql-tag");
const { products } = require("./data");

const typeDefs = gql`
  type Product {
    id: Int!
    name: String!
    type: String!
    price: Float!
    warranty: String!
    orderName: String!
  }

  type Query {
    products(type: String): [Product!]!
  }
`;

const resolvers = {
  Query: {
    products: (_, { type }) => {
      if (type) {
        return products.filter((p) => p.type === type);
      }
      return products;
    },
  },
};

module.exports = { typeDefs, resolvers };
