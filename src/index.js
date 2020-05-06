import { GraphQLServer } from "graphql-yoga";

/** Type definitions (data schema) */
// Support Scalar Type => String, Boolean, Int, Float, ID
// No ! is an optional.
// make an optional parameters by do not add !
const typeDefs = `
    type Query {
       greeting(name: String, position: String): String! 
       me: User!
       post: Post!
       add(a: Float!, b:Float!): Float!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

/** Resolver */
const resolvers = {
  Query: {
    me() {
      return {
        id: "18376",
        name: "Anan",
        email: "anan@mail.com",
      };
    },
    post() {
      return {
        id: "XN765",
        title: `How to sleep`,
        body: `Just a sleep`,
        published: true,
      };
    },
    greeting(parent, args, ctx, info) {
      let str = `Hello `;
      if (args.name) {
        str += `${args["name"]} `;
      }
      if (args.position) {
        str += args["position"];
      }
      return `${str}!`;
    },
    add(parent, args, ctx, info) {
      return args["a"] + args["b"];
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log(`the server is up in port 4000!`);
});
