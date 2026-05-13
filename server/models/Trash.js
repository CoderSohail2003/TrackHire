const mongoose = require('mongoose');

const TrashSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalJob: { type: Object, required: true },
  deletedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trash', TrashSchema);