const { ApolloServer, gql } = require("apollo-server-express");
const db = require("../database");

const typeDefs = gql`
  type Chat {
    id: Int!
    name: String!
    picture: String
    time: String!
  }

  type Query {
    chats(userId: Int!): [Chat!]!
    hello: String!
  }
`;

const resolvers = {
  Query: {
    chats: async (root, { userId = 2 }, context) => {
      const getChats = await db.query(
        "SELECT `chats`.`id`, `chats`.`name`, `chats`.`picture`, `messages`.`created_at` AS `time` FROM (SELECT `chat`.`id`, `chat`.`name`, `chat`.`picture` FROM `chat_users` INNER JOIN `chat` ON (`chat`.`id` = `chat_users`.`chat_id` AND `chat_users`.`user_id` = ?)) AS `chats` INNER JOIN (SELECT `chat_id`, MAX(`created_at`) AS `created_at` FROM `messages` GROUP BY `chat_id`) AS `messages` ON (`messages`.`chat_id` = `chats`.`id`) ORDER BY `created_at` DESC",
        [userId]
      );
      console.log(getChats);
      return "Hello, world!";
    },
    hello: async () => {
      return "hello";
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler();
