const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// GET all exercises with filtering
router.get('/', async (req, res) => {
  try {
    const { muscles, equipment, category, limit = 50, page = 1 } = req.query;
    const query = {};
    
    // Filter by muscles (search in both primary and secondary muscles)
    if (muscles) {
      const muscleArray = Array.isArray(muscles) ? muscles : [muscles];
      query.$or = [
        { primaryMuscles: { $in: muscleArray } },
        { secondaryMuscles: { $in: muscleArray } }
      ];
    }
    
    // Filter by equipment
    if (equipment) {
      const equipmentArray = Array.isArray(equipment) ? equipment : [equipment];
      query.equipment = { $in: equipmentArray };
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const exercises = await Exercise.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ name: 1 })
      .select('-__v');
    
    const total = await Exercise.countDocuments(query);
    
    res.json({
      success: true,
      data: exercises,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
    
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch exercises',
      message: error.message 
    });
  }
});

// GET random exercises
router.get('/random', async (req, res) => {
  try {
    const { count = 10, muscles, equipment } = req.query;
    const query = {};
    
    if (muscles) {
      const muscleArray = Array.isArray(muscles) ? muscles : [muscles];
      query.$or = [
        { primaryMuscles: { $in: muscleArray } },
        { secondaryMuscles: { $in: muscleArray } }
      ];
    }
    
    if (equipment) {
      const equipmentArray = Array.isArray(equipment) ? equipment : [equipment];
      query.equipment = { $in: equipmentArray };
    }
    
    const exercises = await Exercise.aggregate([
      { $match: query },
      { $sample: { size: parseInt(count) } }
    ]);
    
    res.json({
      success: true,
      data: exercises
    });
    
  } catch (error) {
    console.error('Error fetching random exercises:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch random exercises' 
    });
  }
});

// GET single exercise by ID
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id).select('-__v');
    
    if (!exercise) {
      return res.status(404).json({ 
        success: false, 
        error: 'Exercise not found' 
      });
    }
    
    res.json({
      success: true,
      data: exercise
    });
    
  } catch (error) {
    console.error('Error fetching exercise:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch exercise' 
    });
  }
});

// GET all unique equipment types
router.get('/equipment/all', async (req, res) => {
  try {
    const equipment = await Exercise.distinct('equipment');
    res.json({
      success: true,
      data: equipment.sort()
    });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch equipment list' 
    });
  }
});

// GET all unique muscle groups
router.get('/muscles/all', async (req, res) => {
  try {
    const muscles = await Exercise.distinct('primaryMuscles');
    res.json({
      success: true,
      data: muscles.sort()
    });
  } catch (error) {
    console.error('Error fetching muscles:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch muscle list' 
    });
  }
});

module.exports = router;