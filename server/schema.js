const { gql } = require('apollo-server')
const Person = require('./models/Person')
const Year = require('./models/Year')

const typeDefs = gql`
input PersonInput {
    name: String!
    birthYear: ID
}

input YearInput {
    value: Int!
    births: [ID]
}

type Person {
    name: String!
    id: ID!
    birthYear: Year
}

type Year {
    value: Int!
    name: String! 
    id: ID!
    births: [Person!]! 
}

type Query {
    person(id: ID!): Person
    people(nameF: String): [Person!]!
    year(id: ID!): Year
    years (nameF: String): [Year!]!
}

type Mutation {
    createPerson(input: PersonInput): Person
    createYear(input: YearInput): Year
}
`

const resolvers = {
    Query: {
        person: async (root, args, ctx, info) => {
            return await Person.findById(args.id).populate('birthYear').exec()
        },
        year: async (root, args, ctx, info) => {
            return await Year.findById(args.id).populate('births').exec()
        },
        people: async (root, args, ctx, info) => {
            if (args.nameF) 
                return await Person.find({ name: new RegExp(args.nameF, 'i') })
            else 
                return await Person.find({})
        },
        years: async (root, args, ctx, info) => {
            if (args.nameF) 
                return await Year.find({ name: new RegExp(args.nameF, 'i') })
            else 
                return await Year.find({})
        },
    },
    Mutation: {
        createPerson: async (root, args, ctx, info) => {
            const newPerson = new Person(args.input)

            if (args.input.birthYear) {
                newPerson.birthYear = args.input.birthYear
                await Year.findByIdAndUpdate(args.input.birthYear, { births: newPerson._id }, {new: true}).exec()
                await Person.populate(newPerson, { path: 'birthYear' })
            }

            newPerson.save(err => { console.log(err) })
            return newPerson
        },
        createYear: async (root, args, ctx, info) => {
            args.input.name = args.input.value + ''
            const newYear = new Year(args.input)

            if (args.input.births) {
                for (let p of args.input.births) 
                    await Person.findByIdAndUpdate(p, { birthYear: newYear._id })

                await Year.populate(newYear, { path: 'births' })
            }
            
            newYear.save(err => { console.log(err) })
            return newYear
        }
    }
}

module.exports = { typeDefs, resolvers }
