import { 
  Trash2, 
  ExternalLink, 
  ChevronUp, 
  ChevronDown,
  Target,
  Clock,
  Dumbbell,
  Zap,
  Heart,
  Award,
  Flame
} from 'lucide-react'

const ExerciseCard = ({ exercise, index, onDelete, onClick, isExpanded, onToggleExpand }) => {
  const getMuscleInitial = (muscle) => {
    if (!muscle) return 'G'
    const words = muscle.split(' ')
    if (words.length > 1) {
      return words[0][0] + words[1][0]
    }
    return muscle[0].toUpperCase()
  }

  const getPrimaryMuscle = () => {
    if (exercise.primaryMuscles && exercise.primaryMuscles.length > 0) {
      return exercise.primaryMuscles[0]
    }
    return 'general'
  }

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-green-500/20 text-green-400'
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'expert': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-700 text-gray-400'
    }
  }

  const getEquipmentColor = (equipment) => {
    const equipmentColors = {
      'barbell': 'bg-blue-500/20 text-blue-400',
      'dumbbell': 'bg-purple-500/20 text-purple-400',
      'machine': 'bg-orange-500/20 text-orange-400',
      'cable': 'bg-cyan-500/20 text-cyan-400',
      'kettlebell': 'bg-red-500/20 text-red-400',
      'body only': 'bg-green-500/20 text-green-400',
      'bands': 'bg-pink-500/20 text-pink-400',
    }
    return equipmentColors[equipment] || 'bg-gray-700 text-gray-400'
  }

  const primaryMuscle = getPrimaryMuscle()
  const muscleInitial = getMuscleInitial(primaryMuscle)

  return (
    <div className="card group hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300">
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white font-bold">
            {index}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white line-clamp-1">{exercise.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(exercise.level)}`}>
                {exercise.level || 'Beginner'}
              </span>
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${getEquipmentColor(exercise.equipment)}`}>
                {exercise.equipment}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleExpand}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          <button
            onClick={() => onDelete(exercise._id)}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group/delete"
          >
            <Trash2 className="w-4 h-4 text-gray-400 group-hover/delete:text-red-400" />
          </button>
        </div>
      </div>

      {/* Muscle Indicator */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <span className="text-blue-400 font-bold text-sm">{muscleInitial}</span>
          </div>
          <div>
            <p className="text-sm text-gray-400">Primary Muscle</p>
            <p className="font-medium text-white capitalize">{primaryMuscle}</p>
          </div>
        </div>
        
        <button
          onClick={onClick}
          className="text-sm text-red-400 hover:text-red-300 font-medium flex items-center space-x-1"
        >
          <span>View Details</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {exercise.primaryMuscles?.slice(0, 3).map(muscle => (
          <span key={muscle} className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded-md text-xs">
            {muscle}
          </span>
        ))}
        {exercise.secondaryMuscles?.slice(0, 2).map(muscle => (
          <span key={muscle} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs">
            {muscle}
          </span>
        ))}
        {exercise.category && (
          <span className="px-2 py-1 bg-red-900/30 text-red-300 rounded-md text-xs">
            {exercise.category}
          </span>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-700 space-y-4 animate-fade-in">
          {/* Instructions Preview */}
          {exercise.instructions && exercise.instructions.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Instructions</span>
              </h4>
              <ol className="space-y-2">
                {exercise.instructions.slice(0, 3).map((instruction, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-gray-300">{instruction}</span>
                  </li>
                ))}
                {exercise.instructions.length > 3 && (
                  <p className="text-sm text-gray-500 text-center">
                    +{exercise.instructions.length - 3} more steps
                  </p>
                )}
              </ol>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-gray-800/50 rounded-lg">
              <Target className="w-4 h-4 text-red-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Muscles</p>
              <p className="font-bold text-white">
                {(exercise.primaryMuscles?.length || 0) + (exercise.secondaryMuscles?.length || 0)}
              </p>
            </div>
            
            <div className="text-center p-2 bg-gray-800/50 rounded-lg">
              <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Sets</p>
              <p className="font-bold text-white">3-4</p>
            </div>
            
            <div className="text-center p-2 bg-gray-800/50 rounded-lg">
              <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Reps</p>
              <p className="font-bold text-white">8-12</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
        <button
          onClick={onToggleExpand}
          className="text-sm text-gray-400 hover:text-white flex items-center space-x-1"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              <span>Show More</span>
              <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onClick}
            className="text-sm btn-primary py-1 px-3"
          >
            Start Exercise
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExerciseCard