const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  techs: [String],
  user: {
    // id do usuário que criou o spot
    type: mongoose.Schema.Types.ObjectId,
    // referência de qual model é essa informação
    ref: 'User',
  }
}, {
  toJSON: {
    virtuals: true,
  }
});

SpotSchema.virtual('thumbnail_url').get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);