const { gql } = require('apollo-server')
const Person = require('./models/Person')
const Year = require('./models/Year')
const Battle = require('./models/Battle')

const typeDefs = gql`
input PersonInput {
    name: String!
    birthYear: Int
    deathYear: Int
    battles: [ID]
}

input YearInput {
    value: Int!
    births: [ID]
}

input BattleInput {
    name: String!
    yearOccur: Int!
    attackers: [ID!]!
    defenders: [ID!]!
}

type Person {
    name: String!
    id: ID!
    birthYear: Year
    deathYear: Year
    battles: [Battle!]!
}

type Year {
    value: Int!
    name: String! 
    id: ID!
    births: [Person!]! 
    deaths: [Person!]!
    battles: [Battle!]!
}

type Battle {
    name: String!
    id: ID!
    year: Year
    attackers: [Person!]!
    defenders: [Person!]!
}

type Query {
    person(id: ID!): Person
    people(nameF: String): [Person!]!
    year(id: ID!): Year
    years (nameF: String): [Year!]!
    battle(id: ID!): Battle
    battles(nameF: String): [Battle!]!
}

type Mutation {
    createPerson(input: PersonInput): Person
    createYear(input: YearInput): Year
    createBattle(input: BattleInput): Battle
}
`

const resolvers = {
    Query: {
        person: async (root, args, ctx, info) => {
            return Person.findById(args.id).populate('birthYear').populate('deathYear').populate('battles').exec()
        },
        year: async (root, args, ctx, info) => {
            return Year.findById(args.id).populate('births').populate('deaths').populate('battles').exec()
        },
        battle: async (root, args, ctx, info) => {
            return Battle.findById(args.id).populate('year').populate('attackers').populate('defenders').exec()
        },
        people: async (root, args, ctx, info) => {
            if (args.nameF) 
                return Person.find({ name: new RegExp(args.nameF, 'i') })
            else 
                return Person.find({})
        },
        years: async (root, args, ctx, info) => {
            if (args.nameF) 
                return Year.find({ name: new RegExp(args.nameF, 'i') })
            else 
                return Year.find({})
        },
        battles: async (root, args, ctx, info) => {
            if (args.nameF) 
                return Battle.find({ name: new RegExp(args.nameF, 'i') })
            else 
                return Battle.find({})
        },
    },
    Mutation: {
        createPerson: async (root, args, ctx, info) => {
            const newPerson = new Person(args.input)

            if (args.input.birthYear) {
                var birthYear = await Year.findOne({ value: parseInt(args.input.birthYear) }).exec()
                newPerson.birthYear = birthYear._id
                birthYear.births.push(newPerson._id)
                await Promise.all([Person.populate(newPerson, { path: 'birthYear' }), birthYear.save()])
            }

            if (args.input.deathYear) {
                var deathYear = await Year.findOne({ value: parseInt(args.input.deathYear) }).exec()
                newPerson.deathYear = deathYear._id
                deathYear.deaths.push(newPerson._id)
                await Promise.all([Person.populate(newPerson, { path: 'deathYear' }), deathYear.save()])
            }

            await newPerson.save(err => { console.log(err) })
            return newPerson
        },
        createYear: async (root, args, ctx, info) => {
            args.input.name = (args.input.value >= 0 ? args.input.value + ' CE' : -args.input.value + ' BC')
            const newYear = new Year(args.input)

            if (args.input.births) {
                promises = [Year.populate(newYear, { path: 'births' })]

                for (let p of args.input.births) {
                    var person = await Person.findById(p).exec()
                    person.birthYear = newYear._id
                    newYear.births.push(person._id)
                    promises.push(person.save())
                }

                await Promise.all(promises)
            }
            
            await newYear.save(err => { console.log(err) })
            return newYear
        },
        createBattle: async (root, args, ctx, info) => {
            const newBattle = new Battle(args.input)
            promises = []
            year = await Year.findOne({ value: parseInt(args.input.yearOccur) }).exec()
            year.battles.push(newBattle._id)
            newBattle.year = year._id
            promises.push(year.save())

            for (let i = 0; i < args.input.attackers.length; i++) {
                var person = await Person.findById(args.input.attackers[i]).exec()
                person.battles.push(newBattle._id)
                promises.push(person.save())
            }

            for (let i = 0; i < args.input.defenders.length; i++) {
                var person = await Person.findById(args.input.defenders[i]).exec()
                person.battles.push(newBattle._id)
                promises.push(person.save())
            }

            promises.push([Battle.populate(newBattle, [{ path: 'year' }, { path: 'attackers' }, { path: 'defenders' }]), newBattle.save()])
            await Promise.all(promises)
            return newBattle
        }
    }
}

module.exports = { typeDefs, resolvers }
