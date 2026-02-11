import { useState, useEffect } from 'react'
import { 
  Target, 
  Check, 
  X, 
  AlertCircle,
  Activity,
  Zap,
  Heart
} from 'lucide-react'

const MuscleSelector = ({ selectedMuscles, onSelect }) => {
  const [frontView, setFrontView] = useState(true)
  
  const muscleGroups = {
    chest: ['chest'],
    back: ['lats', 'traps', 'middle back', 'lower back'],
    shoulders: ['shoulders'],
    arms: ['biceps', 'triceps', 'forearms'],
    legs: ['quadriceps', 'hamstrings', 'calves', 'glutes', 'adductors', 'abductors'],
    core: ['abdominals'],
    neck: ['neck']
  }

  const muscleLabels = {
    chest: { x: '50%', y: '30%', label: 'Chest' },
    shoulders: { x: '50%', y: '20%', label: 'Shoulders' },
    biceps: { x: '25%', y: '40%', label: 'Biceps' },
    triceps: { x: '25%', y: '45%', label: 'Triceps' },
    forearms: { x: '25%', y: '65%', label: 'Forearms' },
    quadriceps: { x: '35%', y: '70%', label: 'Quads' },
    hamstrings: { x: frontView ? '35%' : '65%', y: '75%', label: 'Hamstrings' },
    calves: { x: '35%', y: '90%', label: 'Calves' },
    abdominals: { x: '50%', y: '45%', label: 'Abs' },
    lats: { x: '75%', y: '40%', label: 'Lats' },
    traps: { x: '50%', y: '15%', label: 'Traps' },
    glutes: { x: frontView ? '50%' : '50%', y: '60%', label: 'Glutes' },
    'middle back': { x: '50%', y: '35%', label: 'Middle Back' },
    'lower back': { x: '50%', y: '50%', label: 'Lower Back' },
  }

  const handleMuscleClick = (muscle) => {
    onSelect(muscle)
  }

  const getMuscleColor = (muscle) => {
    if (selectedMuscles.includes(muscle)) {
      return 'fill-blue-500 stroke-blue-300'
    }
    return 'fill-gray-700 stroke-gray-500'
  }

  const renderHumanBody = () => {
    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="relative">
          {/* Human Body SVG */}
          <svg 
            viewBox="0 0 200 400" 
            className="w-full h-auto max-h-[500px]"
          >
            {/* Body Outline */}
            <path
              d="M100,50 C120,50 140,70 140,100 L140,150 C140,180 130,200 100,220 C70,200 60,180 60,150 L60,100 C60,70 80,50 100,50 Z"
              fill="none"
              stroke="#4B5563"
              strokeWidth="2"
            />
            
            {/* Head */}
            <circle cx="100" cy="30" r="20" fill="none" stroke="#4B5563" strokeWidth="2" />
            
            {/* Arms */}
            <path d="M140,100 L180,80 L180,120 L140,140" fill="none" stroke="#4B5563" strokeWidth="2" />
            <path d="M60,100 L20,80 L20,120 L60,140" fill="none" stroke="#4B5563" strokeWidth="2" />
            
            {/* Legs */}
            <path d="M100,220 L120,300 L100,380 L80,300 L100,220" fill="none" stroke="#4B5563" strokeWidth="2" />
            
            {/* Muscle Groups */}
            {/* Chest */}
            <g onClick={() => handleMuscleClick('chest')} className="cursor-pointer hover:opacity-90">
              <path
                d="M80,90 C90,100 110,100 120,90 L120,130 C110,140 90,140 80,130 Z"
                className={`${getMuscleColor('chest')} transition-all duration-300`}
                strokeWidth="1"
              />
            </g>
            
            {/* Shoulders */}
            <g onClick={() => handleMuscleClick('shoulders')} className="cursor-pointer hover:opacity-90">
              <circle cx="100" cy="70" r="25" className={`${getMuscleColor('shoulders')} transition-all duration-300`} />
            </g>
            
            {/* Biceps */}
            <g onClick={() => handleMuscleClick('biceps')} className="cursor-pointer hover:opacity-90">
              <rect x="125" y="100" width="20" height="40" rx="10" transform="rotate(20 125 100)"
                className={`${getMuscleColor('biceps')} transition-all duration-300`} />
              <rect x="55" y="100" width="20" height="40" rx="10" transform="rotate(-20 55 100)"
                className={`${getMuscleColor('biceps')} transition-all duration-300`} />
            </g>
            
            {/* Triceps */}
            <g onClick={() => handleMuscleClick('triceps')} className="cursor-pointer hover:opacity-90">
              <rect x="130" y="140" width="15" height="30" rx="7" 
                className={`${getMuscleColor('triceps')} transition-all duration-300`} />
              <rect x="55" y="140" width="15" height="30" rx="7" 
                className={`${getMuscleColor('triceps')} transition-all duration-300`} />
            </g>
            
            {/* Forearms */}
            <g onClick={() => handleMuscleClick('forearms')} className="cursor-pointer hover:opacity-90">
              <rect x="135" y="170" width="10" height="40" rx="5" 
                className={`${getMuscleColor('forearms')} transition-all duration-300`} />
              <rect x="55" y="170" width="10" height="40" rx="5" 
                className={`${getMuscleColor('forearms')} transition-all duration-300`} />
            </g>
            
            {/* Abs */}
            <g onClick={() => handleMuscleClick('abdominals')} className="cursor-pointer hover:opacity-90">
              <rect x="85" y="130" width="30" height="50" rx="5" 
                className={`${getMuscleColor('abdominals')} transition-all duration-300`} />
            </g>
            
            {/* Quads */}
            <g onClick={() => handleMuscleClick('quadriceps')} className="cursor-pointer hover:opacity-90">
              <rect x="85" y="180" width="30" height="60" rx="10" 
                className={`${getMuscleColor('quadriceps')} transition-all duration-300`} />
            </g>
            
            {/* Calves */}
            <g onClick={() => handleMuscleClick('calves')} className="cursor-pointer hover:opacity-90">
              <rect x="90" y="240" width="20" height="40" rx="8" 
                className={`${getMuscleColor('calves')} transition-all duration-300`} />
            </g>
          </svg>
        </div>

        {/* View Toggle */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-700 p-1">
            <button
              onClick={() => setFrontView(true)}
              className={`px-4 py-2 rounded-md transition-all ${frontView ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Front View
            </button>
            <button
              onClick={() => setFrontView(false)}
              className={`px-4 py-2 rounded-md transition-all ${!frontView ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Back View
            </button>
          </div>
        </div>
      </div>
    )
  }

  const MuscleButton = ({ muscle, label }) => {
    const isSelected = selectedMuscles.includes(muscle)
    
    return (
      <button
        onClick={() => handleMuscleClick(muscle)}
        className={`
          flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300
          ${isSelected 
            ? 'bg-blue-600/20 border-2 border-blue-500' 
            : 'bg-gray-800/50 border border-gray-700 hover:border-gray-600'
          }
        `}
      >
        <div className="flex items-center space-x-3">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center
            ${isSelected ? 'bg-blue-500' : 'bg-gray-700'}
          `}>
            <Activity className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
          </div>
          <div className="text-left">
            <div className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
              {label}
            </div>
            <div className={`text-sm ${isSelected ? 'text-blue-300' : 'text-gray-500'}`}>
              {muscle}
            </div>
          </div>
        </div>
        
        {isSelected && (
          <Check className="w-5 h-5 text-blue-400" />
        )}
      </button>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Target Your Muscles</h2>
        <p className="text-gray-400">Click on muscle groups or use the quick select buttons below</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Panel - Muscle Groups */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-red-500" />
              <span>Muscle Groups</span>
            </h3>
            
            <div className="space-y-2">
              {Object.entries(muscleGroups).map(([group, muscles]) => (
                <div key={group} className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-300 mb-2 capitalize">
                    {group}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {muscles.map(muscle => (
                      <MuscleButton
                        key={muscle}
                        muscle={muscle}
                        label={muscle.split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Select */}
          <div className="card">
            <h3 className="text-lg font-bold text-white mb-3">Quick Select</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onSelect('chest')
                  onSelect('shoulders')
                  onSelect('triceps')
                }}
                className="btn-secondary text-sm py-2"
              >
                Push Day
              </button>
              <button
                onClick={() => {
                  onSelect('back')
                  onSelect('biceps')
                  onSelect('lats')
                }}
                className="btn-secondary text-sm py-2"
              >
                Pull Day
              </button>
              <button
                onClick={() => {
                  onSelect('quadriceps')
                  onSelect('hamstrings')
                  onSelect('glutes')
                  onSelect('calves')
                }}
                className="btn-secondary text-sm py-2"
              >
                Leg Day
              </button>
              <button
                onClick={() => {
                  onSelect('abdominals')
                  onSelect('shoulders')
                  onSelect('arms')
                }}
                className="btn-secondary text-sm py-2"
              >
                Core & Arms
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Body Visualization */}
        <div className="lg:col-span-2">
          <div className="card h-full">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>Interactive Muscle Map</span>
              </h3>
              
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${selectedMuscles.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
                <span className="text-sm text-gray-400">
                  {selectedMuscles.length} muscles selected
                </span>
              </div>
            </div>
            
            {renderHumanBody()}
            
            {/* Instructions */}
            <div className="mt-8 p-4 bg-gray-800/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white mb-1">How to use</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Click directly on muscle groups in the diagram</li>
                    <li>• Use quick select buttons for common workout splits</li>
                    <li>• Select multiple muscle groups for full-body workouts</li>
                    <li>• Click again to deselect a muscle group</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Muscles Bar */}
      {selectedMuscles.length > 0 && (
        <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span>Selected Muscle Groups</span>
            </h3>
            <span className="text-sm text-gray-400">
              {selectedMuscles.length} selected
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedMuscles.map(muscle => (
              <div
                key={muscle}
                className="group px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full flex items-center space-x-2 hover:bg-blue-800/40 transition-colors"
              >
                <Target className="w-3 h-3" />
                <span className="font-medium">
                  {muscle.split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
                <button
                  onClick={() => onSelect(muscle)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MuscleSelector