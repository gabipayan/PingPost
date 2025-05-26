import { Thought } from '../models/Thought.js';
import { User } from '../models/User.js';

export const thoughtController = {
  // GET all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a single thought by ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST create a new thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);

      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: newThought._id } },
        { new: true }
      );

      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // PUT update a thought
  async updateThought(req, res) {
    try {
      const updated = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE a thought
  async deleteThought(req, res) {
    try {
      const deleted = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deleted) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST add a reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE a reaction
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};