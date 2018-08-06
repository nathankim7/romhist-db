const mongoose = require('mongoose')
const Schema = mongoose.Schema

const YearSchema = new Schema({
    name: String,
    value: Number,
    births: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    deaths: [{type: Schema.Types.ObjectId, ref: 'Person'}],
})

module.exports = mongoose.model('Year', YearSchema)
