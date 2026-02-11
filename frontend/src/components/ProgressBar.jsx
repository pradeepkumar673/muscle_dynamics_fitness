const ProgressBar = ({ currentStep, totalSteps }) => {
  const steps = ['Equipment', 'Muscles', 'Workout']
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center mb-2
              ${index + 1 <= currentStep ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}
            `}>
              {index + 1 <= currentStep ? '✓' : index + 1}
            </div>
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-red-600 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
      <p className="text-center mt-2 text-gray-400">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  )
}

export default ProgressBar