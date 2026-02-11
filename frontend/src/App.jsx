import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
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

  const equipmentOptions = [
    { id: 'barbell', name: 'Barbell', icon: '🏋️' },
    { id: 'dumbbell', name: 'Dumbbells', icon: '💪' },
    { id: 'machine', name: 'Machines', icon: '🏗️' },
    { id: 'cable', name: 'Cable', icon: '⚙️' },
    { id: 'kettlebell', name: 'Kettlebells', icon: '🏋️‍♂️' },
    { id: 'body only', name: 'Body Weight', icon: '👤' },
    { id: 'bands', name: 'Resistance Bands', icon: '🔄' },
    { id: 'ez curl bar', name: 'EZ Curl Bar', icon: '🏋️‍♀️' },
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
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
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
    const shuffled = [...filteredExercises]
      .sort(() => Math.random() - 0.5)
    setFilteredExercises(shuffled)
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">MD</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Muscle Dynamics</h1>
                <p className="text-sm text-gray-400">Workout Generator</p>
              </div>
            </div>
            <button
              onClick={resetWorkout}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
            >
              Reset 🏠
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ProgressBar currentStep={currentStep} totalSteps={3} />
        
        <div className="mt-8">
          {renderStep()}
        </div>

        <div className="mt-12 flex justify-between">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 bg-gray-800 text-white rounded-lg ${currentStep === 1 ? 'opacity-50' : 'hover:bg-gray-700'}`}
          >
            ← Previous
          </button>
          
          <button
            onClick={handleNextStep}
            disabled={
              (currentStep === 1 && selectedEquipment.length === 0) ||
              (currentStep === 2 && selectedMuscles.length === 0) ||
              (currentStep === 3 && isLoading)
            }
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : currentStep === 3 ? 'Generate Workout' : 'Continue →'}
          </button>
        </div>

        {(selectedEquipment.length > 0 || selectedMuscles.length > 0) && (
          <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">Your Selection:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedEquipment.map(eq => (
                <span key={eq} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  {equipmentOptions.find(e => e.id === eq)?.icon} {equipmentOptions.find(e => e.id === eq)?.name}
                </span>
              ))}
              {selectedMuscles.map(muscle => (
                <span key={muscle} className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm">
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      {isModalOpen && selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Made with ❤️ by Pradeep Kumar • Muscle Dynamics Fitness App</p>
        </div>
      </footer>
    </div>
  )
}

export default App