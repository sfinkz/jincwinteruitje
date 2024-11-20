// Helper Components
const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="block text-gray-700 font-medium">{label}</label>
    <input
      {...props}
      className="w-full p-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

const RadioGroup = ({ label, options, ...props }) => (
  <div className="space-y-3">
    <label className="block text-gray-700 font-medium">{label}</label>
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
          <input
            type="radio"
            value={option.value}
            {...props}
            className="mr-3"
          />
          <div>
            <span className="font-medium">{option.label}</span>
            {option.description && (
              <p className="text-sm text-gray-500">{option.description}</p>
            )}
          </div>
        </label>
      ))}
    </div>
  </div>
);

const TextArea = ({ label, description, ...props }) => (
  <div className="space-y-2">
    <label className="block text-gray-700 font-medium">{label}</label>
    {description && (
      <p className="text-sm text-gray-600">{description}</p>
    )}
    <textarea
      {...props}
      className="w-full p-2 min-h-[100px] border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

// Main App Component
function App() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    attending: '',
    foodPreference: '',
    dietaryRequirements: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For now, just log the data and show success message
    console.log('Form submitted:', formData);
    alert('Bedankt voor je aanmelding!');
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      attending: '',
      foodPreference: '',
      dietaryRequirements: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur shadow-lg rounded-lg border-t-4 border-blue-500">
          <div className="text-center space-y-4 p-8">
            <h1 className="text-3xl font-bold text-blue-900">JINC Winteruitje</h1>
            <div className="space-y-1">
              <p className="text-xl text-gray-600">19 december 2024</p>
              <p className="text-sm text-gray-500">14:30 - 23:00 uur</p>
            </div>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Voornaam"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                  placeholder="Je voornaam"
                />
                <Input
                  label="Achternaam"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                  placeholder="Je achternaam"
                />
              </div>

              <RadioGroup
                label="Aanwezigheid"
                name="attending"
                value={formData.attending}
                onChange={(e) => setFormData({...formData, attending: e.target.value})}
                required
                options={[
                  {
                    value: 'yes',
                    label: 'Ja, ik ben erbij!',
                    description: 'Op 19 december in Rotterdam'
                  },
                  {
                    value: 'no',
                    label: 'Helaas kan ik niet komen'
                  }
                ]}
              />

              {formData.attending === 'yes' && (
                <div className="space-y-6">
                  <RadioGroup
                    label="Maaltijdvoorkeur"
                    name="foodPreference"
                    value={formData.foodPreference}
                    onChange={(e) => setFormData({...formData, foodPreference: e.target.value})}
                    required
                    options={[
                      { value: 'meat-halal', label: 'Vlees (Halal)' },
                      { value: 'vegetarian', label: 'Vegetarisch' }
                    ]}
                  />

                  <TextArea
                    label="Specifieke dieetwensen"
                    description="Heb je andere dieetwensen of allergieën? Laat het ons hier weten."
                    value={formData.dietaryRequirements}
                    onChange={(e) => setFormData({...formData, dietaryRequirements: e.target.value})}
                    placeholder="Bijvoorbeeld: veganistisch, glutenvrij, notenallergie..."
                  />
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium p-3 rounded-lg transition-colors"
              >
                RSVP Versturen
              </button>

              <p className="text-center text-sm text-gray-500">
                Graag aanmelden vóór 29 november
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
