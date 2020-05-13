import { GraphQLServer } from "graphql-yoga";

/** Type definitions (data schema) */
// Support Scalar Type => String, Boolean, Int, Float, ID
// No ! is an optional.
// make an optional parameters by do not add !

const users = [
  {
    id: "1",
    name: "anan",
    email: "anan@mail.com",
  },
  {
    id: "2",
    name: "Test",
    email: "Test@mail.com",
    age: 30,
  },
  {
    id: "3",
    name: "ABC",
    email: "ABC@mail.com",
    age: 32,
  },
];

const posts = [
  {
    id: "1",
    title: "JavaScript",
    body: "How to write a Javascript in best practice.",
    published: true,
    author: "1"
  },
  {
    id: "2",
    title: "Java",
    body: "Java is an OOP programing language",
    published: true,
    author: "1"
  },
  {
    id: "3",
    title: "Angular",
    body: "Angular is a frontend framework to build a webapp",
    published: true,
    author: "2"
  },
];

const typeDefs = `
    type Query {
       me: User!
       post: Post!
       users(query: String): [User!]!
       posts(query: String): [Post!]!
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
        author: User!
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
    users(parent, agrs, ctx, info) {
      if (!agrs.query) return users;
      return users.filter((user) => {
        return user.name.toLowerCase().includes(agrs.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) return posts;
      return posts.filter((post) => {
        const query = args.query.toLowerCase();
        const bodyMatched = post.body.toLowerCase().includes(query);
        const titleMatched = post.title.toLowerCase().includes(query);
        return bodyMatched || titleMatched;
      });
    },
  },
  Post: {
    author(parent, args, ctx, info) {
        return users.find(user => {
          return user.id === parent.author
        })
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log(`the server is up in port 4000!`);
});
