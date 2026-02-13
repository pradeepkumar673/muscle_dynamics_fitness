import { ChevronDown, ChevronUp, ExternalLink, Trash2 } from 'lucide-react'

const ExerciseCard = ({ exercise, index, onDelete, onClick, isExpanded, onToggleExpand }) => {
  const primaryMuscle = exercise.primaryMuscles?.[0] || 'general'
  const muscleInitial = primaryMuscle
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white font-bold text-sm">
            {index}
          </div>
          <div>
            <h3 className="font-semibold text-white">{exercise.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-gray-300">
                {exercise.level || 'beginner'}
              </span>
              <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-gray-300">
                {exercise.equipment}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(exercise._id)}
          className="p-1.5 hover:bg-gray-800 rounded transition-colors"
          aria-label="Remove exercise"
        >
          <Trash2 size={16} className="text-gray-500 hover:text-red-400" />
        </button>
      </div>

      {/* Primary muscle indicator */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded bg-blue-500/20 flex items-center justify-center text-xs font-medium text-blue-400">
            {muscleInitial}
          </div>
          <span className="text-sm text-gray-400 capitalize">{primaryMuscle}</span>
        </div>
        <button
          onClick={onClick}
          className="text-xs text-red-400 hover:text-red-300 flex items-center space-x-1"
        >
          <span>Details</span>
          <ExternalLink size={12} />
        </button>
      </div>

      {/* Muscle tags – simplified */}
      <div className="mt-3 flex flex-wrap gap-1">
        {exercise.primaryMuscles?.slice(0, 2).map(muscle => (
          <span key={muscle} className="px-2 py-0.5 bg-blue-900/40 text-blue-300 rounded text-xs">
            {muscle}
          </span>
        ))}
        {exercise.secondaryMuscles?.slice(0, 1).map(muscle => (
          <span key={muscle} className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs">
            {muscle}
          </span>
        ))}
      </div>

      {/* Expand toggle */}
      <button
        onClick={onToggleExpand}
        className="mt-4 w-full flex items-center justify-center space-x-1 py-2 text-xs text-gray-500 hover:text-gray-300 border-t border-gray-800 transition"
      >
        <span>{isExpanded ? 'Show less' : 'Show more'}</span>
        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Expanded content – simplified */}
      {isExpanded && (
        <div className="mt-4 pt-2 border-t border-gray-800 space-y-3 text-sm">
          {exercise.instructions && exercise.instructions.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 mb-2">Instructions</h4>
              <ol className="space-y-2">
                {exercise.instructions.slice(0, 2).map((inst, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-gray-300 text-xs">{inst}</span>
                  </li>
                ))}
                {exercise.instructions.length > 2 && (
                  <p className="text-xs text-gray-500">+{exercise.instructions.length - 2} more steps</p>
                )}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ExerciseCard