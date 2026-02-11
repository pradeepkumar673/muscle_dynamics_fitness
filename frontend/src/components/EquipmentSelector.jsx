const EquipmentSelector = ({ equipmentOptions, selectedEquipment, onSelect }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Select Your Equipment</h2>
        <p className="text-gray-400">Choose the equipment you have access to</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {equipmentOptions.map((equipment) => {
          const isSelected = selectedEquipment.includes(equipment.id)
          
          return (
            <button
              key={equipment.id}
              onClick={() => onSelect(equipment.id)}
              className={`
                p-6 rounded-xl transition-all transform hover:scale-105
                ${isSelected 
                  ? 'bg-red-600/20 border-2 border-red-500 shadow-lg' 
                  : 'bg-gray-800/50 border border-gray-700'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="text-3xl">{equipment.icon}</div>
                <span className="font-medium text-white">
                  {equipment.name}
                </span>
                <span className={`text-sm ${isSelected ? 'text-red-300' : 'text-gray-500'}`}>
                  {isSelected ? 'Selected ✓' : 'Click to select'}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {selectedEquipment.length > 0 && (
        <div className="mt-8 p-4 bg-gray-800/30 rounded-lg">
          <p className="text-gray-400">Selected: {selectedEquipment.length} equipment types</p>
          <p className="text-green-400 font-medium">✓ Ready to proceed</p>
        </div>
      )}
    </div>
  )
}

export default EquipmentSelector