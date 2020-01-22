const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  date: String,
  approved: Boolean,
  user: {
    // id do usuário que solicitou a reserva do spot
    type: mongoose.Schema.Types.ObjectId,
    // referência de qual model é essa informação
    ref: 'User',
  },
  spot: {
    // id do spot 
    type: mongoose.Schema.Types.ObjectId,
    // referência de qual model é essa informação
    ref: 'Spot',
  }
})

module.exports = mongoose.model('Booking', BookingSchema);