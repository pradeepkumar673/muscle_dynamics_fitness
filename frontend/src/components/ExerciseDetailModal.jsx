import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Target, Dumbbell } from 'lucide-react'

const ExerciseDetailModal = ({ exercise, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  if (!isOpen || !exercise) return null

  const images = exercise.images || []
  const imageUrl = images[currentImageIndex]
    ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${images[currentImageIndex]}`
    : null

  const handlePrevImage = () =>
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  const handleNextImage = () =>
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))

  const handlePrevStep = () =>
    setCurrentStep(prev => (prev === 0 ? exercise.instructions.length - 1 : prev - 1))
  const handleNextStep = () =>
    setCurrentStep(prev => (prev === exercise.instructions.length - 1 ? 0 : prev + 1))

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded bg-red-600 flex items-center justify-center">
                <Target size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{exercise.name}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-gray-300">
                    {exercise.equipment}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-gray-300">
                    {exercise.level || 'beginner'}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-800 rounded transition">
              <X size={18} className="text-gray-400" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 grid md:grid-cols-2 gap-6">
            {/* Left – image */}
            <div>
              <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
                {imageUrl ? (
                  <>
                    <img src={imageUrl} alt={exercise.name} className="w-full h-full object-cover" />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/60 rounded-full hover:bg-black/80"
                        >
                          <ChevronLeft size={20} className="text-white" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/60 rounded-full hover:bg-black/80"
                        >
                          <ChevronRight size={20} className="text-white" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                          {images.map((_, idx) => (
                            <span
                              key={idx}
                              className={`block w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Dumbbell size={40} className="text-gray-700" />
                    <p className="text-gray-600 text-sm mt-2">No image</p>
                  </div>
                )}
              </div>

              {/* Muscle groups */}
              <div className="mt-5">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Primary muscles</h3>
                <div className="flex flex-wrap gap-2">
                  {exercise.primaryMuscles?.map(m => (
                    <span key={m} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-md text-xs border border-blue-500/30">
                      {m}
                    </span>
                  ))}
                </div>
                {exercise.secondaryMuscles?.length > 0 && (
                  <>
                    <h3 className="text-sm font-medium text-gray-400 mt-3 mb-2">Secondary muscles</h3>
                    <div className="flex flex-wrap gap-2">
                      {exercise.secondaryMuscles.map(m => (
                        <span key={m} className="px-3 py-1 bg-gray-800 text-gray-400 rounded-md text-xs">
                          {m}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right – instructions */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3">Instructions</h3>
              {exercise.instructions && exercise.instructions.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500">Step {currentStep + 1} of {exercise.instructions.length}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={handlePrevStep}
                          disabled={exercise.instructions.length === 1}
                          className="p-1 hover:bg-gray-700 rounded disabled:opacity-30"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={handleNextStep}
                          disabled={exercise.instructions.length === 1}
                          className="p-1 hover:bg-gray-700 rounded disabled:opacity-30"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {exercise.instructions[currentStep]}
                    </p>
                  </div>

                  {/* All steps list – compact */}
                  <div className="max-h-64 overflow-y-auto pr-1 space-y-2">
                    {exercise.instructions.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentStep(idx)}
                        className={`w-full text-left p-3 rounded-md border transition ${
                          idx === currentStep
                            ? 'bg-red-600/10 border-red-600/50'
                            : 'bg-gray-800/30 border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                            idx === currentStep ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="text-xs text-gray-300 line-clamp-2">{step}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No instructions available.</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-4 border-t border-gray-800">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseDetailModal