import { useState, useEffect } from 'react'
import { Shuffle, Target, Clock, Filter, Search, Play, Printer } from 'lucide-react'
import ExerciseCard from './ExerciseCard'

const ExerciseList = ({ exercises, onShuffle, onDelete, onExerciseClick, isLoading }) => {
  const [filtered, setFiltered] = useState(exercises)
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    setFiltered(exercises)
  }, [exercises])

  const handleSearch = (term) => {
    setSearch(term)
    const lower = term.toLowerCase()
    const result = exercises.filter(ex =>
      ex.name.toLowerCase().includes(lower) ||
      ex.primaryMuscles?.some(m => m.toLowerCase().includes(lower)) ||
      ex.equipment?.toLowerCase().includes(lower)
    )
    setFiltered(result)
  }

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400 text-sm">Generating workout…</p>
      </div>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="text-center py-16">
        <Target size={40} className="text-gray-700 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No exercises found</h3>
        <p className="text-gray-400 text-sm mb-6">Try adjusting your equipment or muscle selection</p>
        <button onClick={() => window.location.reload()} className="px-5 py-2 bg-red-600 rounded-md text-sm">
          Start over
        </button>
      </div>
    )
  }

  const totalTime = filtered.length * 3 // rough estimate

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Your workout</h2>
          <p className="text-gray-400 text-sm">{filtered.length} exercises · approx. {totalTime} min</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={onShuffle} className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-md text-sm hover:bg-gray-700">
            <Shuffle size={16} />
            <span>Shuffle</span>
          </button>
          <button onClick={() => window.print()} className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-md text-sm hover:bg-gray-700">
            <Printer size={16} />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Search & filter bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search exercises…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-sm focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      {/* Exercise grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Filter size={32} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No exercises match your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((ex, idx) => (
            <ExerciseCard
              key={ex._id || idx}
              exercise={ex}
              index={idx + 1}
              onDelete={onDelete}
              onClick={() => onExerciseClick(ex)}
              isExpanded={expandedId === ex._id}
              onToggleExpand={() => setExpandedId(expandedId === ex._id ? null : ex._id)}
            />
          ))}
        </div>
      )}

      {/* Footer CTA */}
      {filtered.length > 0 && (
        <div className="mt-10 p-5 bg-gray-900 border border-gray-800 rounded-lg flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-3 sm:mb-0">
            <h3 className="font-semibold text-white">Ready to start?</h3>
            <p className="text-sm text-gray-400">{filtered.length} exercises · {totalTime} minutes</p>
          </div>
          <button className="flex items-center space-x-2 px-5 py-2 bg-red-600 rounded-md text-sm hover:bg-red-700">
            <Play size={16} />
            <span>Begin workout</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default ExerciseList