const {Schema, model} = require('mongoose');

const schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  // id page where comment left
  pageId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // id user who left comment
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: {createdAt: 'created_at'},
});

module.exports = model('Comment', schema);
