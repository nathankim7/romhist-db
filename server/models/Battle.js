const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BattleSchema = new Schema({
    name: String,
    year: { type: Schema.Types.ObjectId, ref: 'Year' },
    attackers: [{type: Schema.Types.ObjectId, ref: 'Person'}],
    defenders: [{type: Schema.Types.ObjectId, ref: 'Person'}],
})

module.exports = mongoose.model('Battle', BattleSchema)