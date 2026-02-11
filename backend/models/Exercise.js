const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  primaryMuscles: [{
    type: String,
    enum: ['abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower back', 'middle back', 'neck', 'quadriceps', 'shoulders', 'traps', 'triceps']
  }],
  secondaryMuscles: [{
    type: String,
    enum: ['abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower back', 'middle back', 'neck', 'quadriceps', 'shoulders', 'traps', 'triceps']
  }],
  equipment: {
    type: String,
    required: true
  },
  instructions: [{
    type: String
  }],
  images: [{
    type: String
  }],
  category: {
    type: String,
    default: 'strength'
  },
  force: {
    type: String,
    enum: ['pull', 'push', 'static', null]
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert']
  },
  mechanic: {
    type: String,
    enum: ['compound', 'isolation', null]
  }
}, {
  timestamps: true
});

// Create indexes for better performance
exerciseSchema.index({ primaryMuscles: 1 });
exerciseSchema.index({ equipment: 1 });
exerciseSchema.index({ name: 'text' });

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;