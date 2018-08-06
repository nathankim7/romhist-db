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
    id: ID! @unique
    birthYear: Year
}

type Year {
    value: Int!
    name: String! 
    id: ID! @unique
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
        person: (root, args, ctx, info) => {
            return Person.findById(args.id).populate('birthYear').exec().then(res => res)
        },
        year: (root, args, ctx, info) => {
            return Year.findById(args.id).populate('births').exec().then(res => res)
        },
        people: (root, args, ctx, info) => {
            if (args.nameF) 
                return Person.find({ name: new RegExp(args.nameF, 'i') }).then(res => res)
            else 
                return Person.find({}).then(res => res)
        },
        years: (root, args, ctx, info) => {
            if (args.nameF) 
                return Year.find({ name: new RegExp(args.nameF, 'i') }).then(res => res)
            else 
                return Year.find({}).then(res => res)
        },
    },
    Mutation: {
        createPerson: (root, args, ctx, info) => {
            const newPerson = new Person(args.input)
            newPerson.save(err => { console.log(err) })

            if (args.input.birthYear) 
                return Year.findByIdAndUpdate(args.input.birthYear, { $push: { births: newPerson._id } }).exec().then(res => {
                    return Person.populate(newPerson, { path: 'birthYear' }).then(res => res)
                })
            else
                return newPerson
        },
        createYear: (root, args, ctx, info) => {
            args.name = args.value + ''
            const newYear = new Year(args.input)
            newYear.save(err => { console.log(err) })

            if (args.input.births) {
                var completed = []

                for (let p of args.input.births) 
                    completed.push(Person.findByIdAndUpdate(p, { birthYear: newYear._id }))

                return Promise.all(completed).then((res) => { 
                    return Year.populate(newYear, { path: 'births' }).then(res => res)
                })
            }
            else
                return newYear
        }
    }
}

module.exports = { typeDefs, resolvers }
