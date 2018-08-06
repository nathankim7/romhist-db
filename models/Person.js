const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
    name: String,
    birthYear: { type: Schema.Types.ObjectId, ref: 'Year' },
    deathYear: { type: Schema.Types.ObjectId, ref: 'Year' },
})

module.exports = mongoose.model('Person', PersonSchema)
