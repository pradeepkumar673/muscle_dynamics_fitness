import { useState } from 'react'
import { 
  X, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Target,
  Clock,
  Dumbbell,
  Award,
  Heart,
  Share2,
  Bookmark,
  Maximize2,
  Volume2,
  RotateCw
} from 'lucide-react'

const ExerciseDetailModal = ({ exercise, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)

  if (!isOpen || !exercise) return null

  const images = exercise.images || []
  const imageUrl = images[currentImageIndex] 
    ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${images[currentImageIndex]}`
    : null

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
  }

  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
  }

  const handlePrevStep = () => {
    if (exercise.instructions && exercise.instructions.length > 0) {
      setCurrentStep(prev => prev === 0 ? exercise.instructions.length - 1 : prev - 1)
    }
  }

  const handleNextStep = () => {
    if (exercise.instructions && exercise.instructions.length > 0) {
      setCurrentStep(prev => prev === exercise.instructions.length - 1 ? 0 : prev + 1)
    }
  }

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const getMuscleColor = (muscle) => {
    if (exercise.primaryMuscles?.includes(muscle)) {
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
    return 'bg-gray-800 text-gray-400 border-gray-700'
  }

  const getEquipmentColor = () => {
    const equipmentColors = {
      'barbell': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'dumbbell': 'bg-red-500/20 text-red-400 border-red-500/30',
      'machine': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'cable': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'kettlebell': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    }
    return equipmentColors[exercise.equipment] || 'bg-gray-800 text-gray-400 border-gray-700'
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-6xl bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{exercise.name}</h2>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEquipmentColor()}`}>
                      {exercise.equipment}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-400">
                      {exercise.level || 'Beginner'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                      {exercise.category || 'Strength'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Media & Controls */}
              <div>
                {/* Image/Video Container */}
                <div className="relative bg-gray-800 rounded-xl overflow-hidden mb-4">
                  {imageUrl ? (
                    <div className="relative aspect-video">
                      <img
                        src={imageUrl}
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Image Controls */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/70"
                          >
                            <SkipBack className="w-5 h-5 text-white" />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/70"
                          >
                            <SkipForward className="w-5 h-5 text-white" />
                          </button>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                      
                      <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-lg hover:bg-black/70">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="text-center">
                        <Dumbbell className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-600">No image available</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Playback Controls */}
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white">Exercise Instructions</h3>
                      <p className="text-sm text-gray-400">
                        Step {currentStep + 1} of {exercise.instructions?.length || 0}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button className="p-2 hover:bg-gray-700 rounded-lg">
                        <Volume2 className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded-lg">
                        <RotateCw className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-6">
                    <button
                      onClick={handlePrevStep}
                      className="p-3 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <SkipBack className="w-6 h-6 text-gray-400" />
                    </button>
                    
                    <button
                      onClick={handleTogglePlay}
                      className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </button>
                    
                    <button
                      onClick={handleNextStep}
                      className="p-3 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <SkipForward className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-600 transition-all duration-300"
                        style={{ 
                          width: `${((currentStep + 1) / (exercise.instructions?.length || 1)) * 100}%` 
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Start</span>
                      <span>Complete</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div>
                {/* Muscle Groups */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>Target Muscles</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {/* Primary Muscles */}
                    {exercise.primaryMuscles?.map(muscle => (
                      <span
                        key={muscle}
                        className="px-3 py-2 rounded-lg border bg-blue-500/10 text-blue-400 border-blue-500/30 flex items-center space-x-2"
                      >
                        <Target className="w-3 h-3" />
                        <span className="capitalize">{muscle}</span>
                        <span className="text-xs bg-blue-500/20 px-1 rounded">Primary</span>
                      </span>
                    ))}
                    
                    {/* Secondary Muscles */}
                    {exercise.secondaryMuscles?.map(muscle => (
                      <span
                        key={muscle}
                        className="px-3 py-2 rounded-lg border bg-gray-800 text-gray-400 border-gray-700 flex items-center space-x-2"
                      >
                        <Target className="w-3 h-3" />
                        <span className="capitalize">{muscle}</span>
                        <span className="text-xs bg-gray-700 px-1 rounded">Secondary</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Instruction Step */}
                {exercise.instructions && exercise.instructions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Step {currentStep + 1}
                    </h3>
                    <div className="bg-gray-800/50 rounded-xl p-6">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {exercise.instructions[currentStep]}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <button
                          onClick={handlePrevStep}
                          disabled={currentStep === 0}
                          className="text-sm text-gray-400 hover:text-white disabled:opacity-50"
                        >
                          ← Previous Step
                        </button>
                        <button
                          onClick={handleNextStep}
                          disabled={currentStep === exercise.instructions.length - 1}
                          className="text-sm text-gray-400 hover:text-white disabled:opacity-50"
                        >
                          Next Step →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Exercise Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <Award className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Recommended</p>
                        <p className="text-lg font-bold text-white">3 Sets × 10-12 Reps</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">For muscle growth</p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Rest Time</p>
                        <p className="text-lg font-bold text-white">60-90 seconds</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Between sets</p>
                  </div>
                </div>

                {/* Tips & Notes */}
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                  <h4 className="font-semibold text-white mb-2">💡 Pro Tips</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>• Keep your core engaged throughout the movement</li>
                    <li>• Maintain proper form over heavy weights</li>
                    <li>• Control the eccentric (lowering) phase</li>
                    <li>• Breathe out during exertion, breathe in during relaxation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* All Instructions */}
            {exercise.instructions && exercise.instructions.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">Complete Instructions</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {exercise.instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className={`bg-gray-800/30 rounded-xl p-4 border transition-all ${
                        index === currentStep 
                          ? 'border-red-500/50 bg-red-500/5' 
                          : 'border-gray-700'
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === currentStep 
                            ? 'bg-red-600 text-white' 
                            : 'bg-gray-700 text-gray-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Step {index + 1}</h4>
                          <p className="text-gray-300 text-sm">{instruction}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="btn-secondary">
                  <SkipBack className="w-4 h-4" />
                  Previous
                </button>
                <button className="btn-primary flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Add to Workout</span>
                </button>
                <button className="btn-secondary">
                  Next
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseDetailModal