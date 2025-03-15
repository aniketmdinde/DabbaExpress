import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Find Local Providers",
      description: "Search and browse through verified tiffin providers in your area"
    },
    {
      number: "02",
      title: "Choose Your Meal",
      description: "Select from daily menus and customize your portion size"
    },
    {
      number: "03",
      title: "Pick Delivery Option",
      description: "Choose how you want to receive your tiffin"
    },
    {
      number: "04",
      title: "Enjoy Home Food",
      description: "Receive your fresh, home-cooked meal at your convenience"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg">Simple steps to get your daily home-cooked meals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-orange-50 rounded-lg p-8 h-full">
                <div className="text-5xl font-bold text-orange-500 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-orange-500"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;