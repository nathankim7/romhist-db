const mongoose = require('mongoose')
const Schema = mongoose.Schema

const YearSchema = new Schema({
    name: { type: String, unique: true, dropDups: true },
    value: { type: Number, unique: true, dropDups: true },
    births: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    deaths: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    battles: [{ type: Schema.Types.ObjectId, ref: 'Battle' }]
})

module.exports = mongoose.model('Year', YearSchema)
