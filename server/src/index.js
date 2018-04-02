const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
require('dotenv').config()

const resolvers = {
  Query: {
    person(parent, args, ctx, info) {
      if (args.id)
        return ctx.db.query.person({ where: { id: args.id } }, info)
      
      if (args.name)
        return ctx.db.query.person({ where: { name: args.name } }, info)
    },
    year(parent, args, ctx, info) {
      if (args.id)
        return ctx.db.query.year({ where: { id: args.id } }, info)

      if (args.name)
        return ctx.db.query.year({ where: { name: args.name } }, info)
    },
    people(parent, args, ctx, info) {
      var filter = Object.assign({}, args);

      if (filter.birthId) {
        filter.birth = { id: args.birthId }
        delete filter.birthId
      }

      return ctx.db.query.persons({ where: filter }, info)
    },
    timeline(parent, args, ctx, info) {
      var filter = Object.assign({}, args);
      return ctx.db.query.years({ where: filter }, info)
    }
  },
  Mutation: {
    createPerson(parent, args, ctx, info) {
      var load = Object.assign({}, args)

      if (load.birthId) {
        load.birth = { connect: { id: args.birthId } }
        delete load.birthId
      }

      if (load.deathId) {
        load.death = { connect: { id: args.deathId } }
        delete load.deathId
      }

      return ctx.db.mutation.createPerson({ data: load }, info)
    },
    createYear(parent, { val }, ctx, info) {
      return ctx.db.mutation.createYear({ data: {
        val: val,
        name: (val < 0 ? `${-1 * val}BCE` : `${val}CE`)
      } }, info)
    },
    deleteYear(parent, { id }, ctx, info) {
      return ctx.db.mutation.deleteYear({ where: { id: id } }, info)
    },
    updatePerson(parent, args, ctx, info) {
      var load = Object.assign({}, args)

      if (load.birthId) {
        load.birth = { connect: { id: args.birthId } }
        delete load.birthId
      }

      if (load.deathId) {
        load.death = { connect: { id: args.deathId } }
        delete load.deathId
      }

      delete load.id
      return ctx.db.mutation.updatePerson({ data: load, where: { id: args.id } }, info)
    },
    updateYear(parent, args, ctx, info) {
      var load = Object.assign({}, args)
      delete load.id
      return ctx.db.mutation.updateYear({ data: load, where: { id: args.id } }, info)
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.ROMHIST_ENDPOINT,
      secret: process.env.ROMHIST_SECRET,
      debug: true,
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
