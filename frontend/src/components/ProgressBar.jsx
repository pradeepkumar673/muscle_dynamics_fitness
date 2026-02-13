import { Check } from 'lucide-react'

const ProgressBar = ({ currentStep, totalSteps }) => {
  const steps = ['Equipment', 'Muscles', 'Workout']

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center">
        {steps.map((step, idx) => {
          const stepNumber = idx + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          return (
            <div key={step} className="flex flex-col items-center w-1/3">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${isCompleted ? 'bg-red-600 text-white' : ''}
                  ${isActive ? 'ring-2 ring-red-600 ring-offset-2 ring-offset-gray-950 bg-red-600 text-white' : ''}
                  ${!isCompleted && !isActive ? 'bg-gray-800 text-gray-500' : ''}
                `}
              >
                {isCompleted ? <Check size={16} /> : stepNumber}
              </div>
              <span className={`text-xs mt-2 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
          )
        })}
      </div>
      <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar