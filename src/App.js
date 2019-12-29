import React from "react";
import "./App.css";
import { ApolloProvider, Query } from "@apollo/react-components";
import client from "./apollo/apollo-config";
import gql from "graphql-tag";

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Query
          query={gql`
            {
              chats(userId: 2) {
                id
                name
                picture
                time
              }
            }
          `}
        >
          {({ data, loading, error }) => {
            if (loading) return <h2>Loading</h2>;
            if (error) return <h2>{JSON.stringify(error)}</h2>;
            return <h2>{`My first ${JSON.stringify(data.chats)} app 🚀`}</h2>;
          }}
        </Query>
      </div>
    </ApolloProvider>
  );
}
// {
//   chats(userId: 2) {
//     id
//     name
//     picture
//     time
//   }
// }
export default App;
