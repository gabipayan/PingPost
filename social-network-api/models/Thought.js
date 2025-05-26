import { Schema, model } from 'mongoose';
import reactionSchema from './Reaction.js';

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

export const Thought = model('Thought', thoughtSchema);
