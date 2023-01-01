const { gql } = require("apollo-server")

const typeDefs = gql `
type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]!
  }
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int
    user_id: ID!
    user: User!
    participants: [Participant!]!
    location: Location!
  }
  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
  }
  type Query {   
    users: [User!]!
    user(id: ID!): User!
    
    events: [Event!]!
    event(id: ID!): Event
   
    locations: [Location!]!
    location(id: ID!): Location!
    
    participants: [Participant!]!
    participant(id: ID!): Participant
  }
`
module.exports = {
    typeDefs
}