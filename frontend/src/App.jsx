import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import {
  Home,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  User,
  Zap,
  RefreshCw,
  Activity,
  Link,
  Circle
} from 'lucide-react'

import EquipmentSelector from './components/EquipmentSelector'
import MuscleSelector from './components/MuscleSelector'
import ExerciseList from './components/ExerciseList'
import ExerciseDetailModal from './components/ExerciseDetailModal'
import ProgressBar from './components/ProgressBar'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [selectedMuscles, setSelectedMuscles] = useState([])
  const [exercises, setExercises] = useState([])
  const [filteredExercises, setFilteredExercises] = useState([])
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Equipment options – all icons are widely available in lucide-react
  const equipmentOptions = [
    { id: 'barbell', name: 'Barbell', icon: Dumbbell },
    { id: 'dumbbell', name: 'Dumbbells', icon: Dumbbell },
    { id: 'machine', name: 'Machines', icon: Activity },
    { id: 'cable', name: 'Cable', icon: Link },
    { id: 'kettlebell', name: 'Kettlebells', icon: RefreshCw },
    { id: 'body only', name: 'Body Weight', icon: User },
    { id: 'bands', name: 'Resistance Bands', icon: Zap },
    { id: 'ez curl bar', name: 'EZ Curl Bar', icon: Dumbbell },
  ]

  const handleEquipmentSelect = (equipmentId) => {
    setSelectedEquipment(prev =>
      prev.includes(equipmentId)
        ? prev.filter(id => id !== equipmentId)
        : [...prev, equipmentId]
    )
  }

  const handleMuscleSelect = (muscle) => {
    setSelectedMuscles(prev =>
      prev.includes(muscle)
        ? prev.filter(m => m !== muscle)
        : [...prev, muscle]
    )
  }

  const handleNextStep = async () => {
    if (currentStep === 1 && selectedEquipment.length === 0) {
      alert('Please select at least one equipment type')
      return
    }
    if (currentStep === 2 && selectedMuscles.length === 0) {
      alert('Please select at least one muscle group')
      return
    }
    if (currentStep === 3) {
      await generateWorkout()
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const generateWorkout = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      selectedMuscles.forEach(muscle => params.append('muscles', muscle))
      selectedEquipment.forEach(eq => params.append('equipment', eq))
      params.append('limit', 15)

      const response = await axios.get(`${API_URL}/api/exercises?${params}`)
      const data = response.data.data || []
      setExercises(data)
      setFilteredExercises(data)
    } catch (error) {
      console.error('Error fetching exercises:', error)
      alert('Failed to generate workout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const shuffleExercises = () => {
    setFilteredExercises(prev => [...prev].sort(() => Math.random() - 0.5))
  }

  const deleteExercise = (exerciseId) => {
    setFilteredExercises(prev => prev.filter(ex => ex._id !== exerciseId))
  }

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise)
    setIsModalOpen(true)
  }

  const resetWorkout = () => {
    setCurrentStep(1)
    setSelectedEquipment([])
    setSelectedMuscles([])
    setExercises([])
    setFilteredExercises([])
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EquipmentSelector
            equipmentOptions={equipmentOptions}
            selectedEquipment={selectedEquipment}
            onSelect={handleEquipmentSelect}
          />
        )
      case 2:
        return (
          <MuscleSelector
            selectedMuscles={selectedMuscles}
            onSelect={handleMuscleSelect}
          />
        )
      case 3:
        return (
          <ExerciseList
            exercises={filteredExercises}
            onShuffle={shuffleExercises}
            onDelete={deleteExercise}
            onExerciseClick={handleExerciseClick}
            isLoading={isLoading}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">MD</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Muscle Dynamics</h1>
              <p className="text-xs text-gray-400">Workout Generator</p>
            </div>
          </div>
          <button
            onClick={resetWorkout}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition"
          >
            <Home size={16} />
            <span>Reset</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <ProgressBar currentStep={currentStep} totalSteps={3} />

        <div className="mt-8">{renderStep()}</div>

        {/* Navigation buttons */}
        <div className="mt-12 flex justify-between">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-5 py-2 bg-gray-800 rounded-md disabled:opacity-40 hover:bg-gray-700 transition"
          >
            <ChevronLeft size={18} />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNextStep}
            disabled={
              (currentStep === 1 && selectedEquipment.length === 0) ||
              (currentStep === 2 && selectedMuscles.length === 0) ||
              (currentStep === 3 && isLoading)
            }
            className="flex items-center space-x-2 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-40 transition"
          >
            <span>{isLoading ? 'Loading…' : currentStep === 3 ? 'Generate Workout' : 'Continue'}</span>
            {!isLoading && <ChevronRight size={18} />}
          </button>
        </div>

        {/* Selection summary (no emojis) */}
        {(selectedEquipment.length > 0 || selectedMuscles.length > 0) && (
          <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Your selection</h3>
            <div className="flex flex-wrap gap-2">
              {selectedEquipment.map(eq => {
                const option = equipmentOptions.find(e => e.id === eq)
                const Icon = option?.icon
                return (
                  <span key={eq} className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-700 rounded-md text-xs">
                    {Icon && <Icon size={14} />}
                    <span>{option?.name || eq}</span>
                  </span>
                )
              })}
              {selectedMuscles.map(muscle => (
                <span key={muscle} className="px-3 py-1 bg-blue-900/50 text-blue-200 rounded-md text-xs">
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Exercise detail modal */}
      {isModalOpen && selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-xs">
          Muscle Dynamics Fitness App
        </div>
      </footer>
    </div>
  )
}

export default App