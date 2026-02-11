import { useState, useEffect } from 'react'
import { 
  Shuffle, 
  Trash2, 
  ExternalLink, 
  Play,
  Target,
  Clock,
  TrendingUp,
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  Award,
  Flame,
  Zap,
  Heart
} from 'lucide-react'
import ExerciseCard from './ExerciseCard'

const ExerciseList = ({ exercises, onShuffle, onDelete, onExerciseClick, isLoading }) => {
  const [filteredExercises, setFilteredExercises] = useState(exercises)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState('all')
  const [selectedEquipmentFilter, setSelectedEquipmentFilter] = useState('all')
  const [expandedCard, setExpandedCard] = useState(null)

  useEffect(() => {
    setFilteredExercises(exercises)
  }, [exercises])

  // Extract unique muscles and equipment for filters
  const uniqueMuscles = [...new Set(exercises.flatMap(ex => 
    [...(ex.primaryMuscles || []), ...(ex.secondaryMuscles || [])]
  ))].sort()

  const uniqueEquipment = [...new Set(exercises.map(ex => ex.equipment))].sort()

  const handleSearch = (term) => {
    setSearchTerm(term)
    const filtered = exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(term.toLowerCase()) ||
      exercise.primaryMuscles?.some(muscle => 
        muscle.toLowerCase().includes(term.toLowerCase())
      ) ||
      exercise.equipment?.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredExercises(filtered)
  }

  const handleSort = (criteria) => {
    setSortBy(criteria)
    let sorted = [...filteredExercises]
    
    switch (criteria) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'difficulty':
        // Assuming level field exists
        const difficultyOrder = { beginner: 1, intermediate: 2, expert: 3 }
        sorted.sort((a, b) => 
          (difficultyOrder[a.level] || 0) - (difficultyOrder[b.level] || 0)
        )
        break
      case 'equipment':
        sorted.sort((a, b) => a.equipment.localeCompare(b.equipment))
        break
      default:
        // Default order (as fetched)
        sorted = exercises.filter(ex => filteredExercises.includes(ex))
    }
    
    setFilteredExercises(sorted)
  }

  const handleMuscleFilter = (muscle) => {
    setSelectedMuscleFilter(muscle)
    if (muscle === 'all') {
      setFilteredExercises(exercises)
    } else {
      const filtered = exercises.filter(exercise =>
        exercise.primaryMuscles?.includes(muscle) ||
        exercise.secondaryMuscles?.includes(muscle)
      )
      setFilteredExercises(filtered)
    }
  }

  const handleEquipmentFilter = (equipment) => {
    setSelectedEquipmentFilter(equipment)
    if (equipment === 'all') {
      setFilteredExercises(exercises)
    } else {
      const filtered = exercises.filter(exercise =>
        exercise.equipment === equipment
      )
      setFilteredExercises(filtered)
    }
  }

  const calculateWorkoutStats = () => {
    const totalTime = filteredExercises.length * 3 // 3 minutes per exercise average
    const muscleGroups = new Set(
      filteredExercises.flatMap(ex => 
        [...(ex.primaryMuscles || []), ...(ex.secondaryMuscles || [])]
      )
    )
    const equipmentCount = new Set(filteredExercises.map(ex => ex.equipment)).size
    
    return {
      totalExercises: filteredExercises.length,
      totalTime,
      muscleGroups: muscleGroups.size,
      equipmentCount,
      difficulty: filteredExercises.length > 12 ? 'Advanced' : 
                filteredExercises.length > 8 ? 'Intermediate' : 'Beginner'
    }
  }

  const stats = calculateWorkoutStats()

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-400">Generating your perfect workout...</p>
      </div>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="text-center py-16">
        <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">No Exercises Found</h3>
        <p className="text-gray-400 mb-6">Try selecting different equipment or muscle groups</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Start Over
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Stats */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">Your Workout Plan</h2>
            <p className="text-gray-400">{filteredExercises.length} exercises generated</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onShuffle}
              className="btn-secondary flex items-center space-x-2"
            >
              <Shuffle className="w-4 h-4" />
              <span>Shuffle Order</span>
            </button>
            
            <button
              onClick={() => window.print()}
              className="btn-secondary flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Print Workout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Target className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Exercises</p>
                <p className="text-2xl font-bold text-white">{stats.totalExercises}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Time</p>
                <p className="text-2xl font-bold text-white">{stats.totalTime} min</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Difficulty</p>
                <p className="text-2xl font-bold text-white">{stats.difficulty}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Flame className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Muscle Groups</p>
                <p className="text-2xl font-bold text-white">{stats.muscleGroups}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="default">Sort by</option>
              <option value="name">Name A-Z</option>
              <option value="difficulty">Difficulty</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleMuscleFilter('all')}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              selectedMuscleFilter === 'all' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Muscles
          </button>
          
          {uniqueMuscles.slice(0, 6).map(muscle => (
            <button
              key={muscle}
              onClick={() => handleMuscleFilter(muscle)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedMuscleFilter === muscle
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {muscle}
            </button>
          ))}
          
          {uniqueMuscles.length > 6 && (
            <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-400">
              +{uniqueMuscles.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Exercises Grid */}
      {filteredExercises.length === 0 ? (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No exercises match your filters</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise._id || index}
              exercise={exercise}
              index={index + 1}
              onDelete={() => onDelete(exercise._id)}
              onClick={() => onExerciseClick(exercise)}
              isExpanded={expandedCard === exercise._id}
              onToggleExpand={() => setExpandedCard(
                expandedCard === exercise._id ? null : exercise._id
              )}
            />
          ))}
        </div>
      )}

      {/* Empty State for No Exercises */}
      {filteredExercises.length > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Your workout is ready! 💪
              </h3>
              <p className="text-gray-400">
                {stats.totalExercises} exercises • {stats.totalTime} minutes • {stats.difficulty} level
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onShuffle}
                className="btn-secondary flex items-center space-x-2"
              >
                <Shuffle className="w-4 h-4" />
                <span>Shuffle Again</span>
              </button>
              
              <button
                onClick={() => window.print()}
                className="btn-primary flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Start Workout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExerciseList