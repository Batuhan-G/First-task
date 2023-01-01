const { ApolloServer } = require("apollo-server")
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")
const { typeDefs } = require('./schema.js')
const { events, users, participants, locations } = require("./data.json")

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, args) => users.find((user) => user.id === parseInt(args.id)),

        events: () => events,
        event: (parent, args) =>
            events.find((event) => event.id === parseInt(args.id)),

        locations: () => locations,
        location: (parent, args) =>
            locations.find((location) => location.id === parseInt(args.id)),

        participants: () => participants,
        participant: (parent, args) =>
            participants.find((participant) => participant.id === parseInt(args.id)),
    },

    User: {
        events:(parent) => events.filter(event => event.user_id === parent.id)
    },

    Event: {
        user: (parent) => users.find((user) => user.id === parent.user_id),
        participants: (parent) =>
            participants.filter(
                (participant) => participant.event_id === parseInt(parent.id)
            ),
        location: (parent) =>
            locations.find(
                (location) => location.id === parseInt(parent.location_id)
            ),
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({}),
    ],
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});