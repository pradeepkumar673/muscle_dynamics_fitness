const EquipmentSelector = ({ equipmentOptions, selectedEquipment, onSelect }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Select equipment</h2>
        <p className="text-gray-400 text-sm">Choose the equipment you have access to</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {equipmentOptions.map(({ id, name, icon: Icon }) => {
          const isSelected = selectedEquipment.includes(id)
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`
                p-5 rounded-lg border transition-all
                ${isSelected
                  ? 'bg-red-600/10 border-red-500 ring-1 ring-red-500/50'
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                {Icon && <Icon size={28} className={isSelected ? 'text-red-400' : 'text-gray-400'} />}
                <span className="font-medium text-sm text-white">{name}</span>
                <span className="text-xs text-gray-500">
                  {isSelected ? 'Selected' : 'Click to select'}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {selectedEquipment.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-400">
          {selectedEquipment.length} equipment type{selectedEquipment.length > 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  )
}

export default EquipmentSelector