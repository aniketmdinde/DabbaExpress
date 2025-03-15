import React from 'react';
import { UtensilsCrossed, Clock, MapPin, Shield, Heart, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <UtensilsCrossed className="h-8 w-8 text-orange-500" />,
      title: "Home-Cooked Meals",
      description: "Authentic and fresh meals prepared by passionate home chefs"
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      title: "Flexible Timing",
      description: "Order before cutoff time and get your meal when you need it"
    },
    {
      icon: <MapPin className="h-8 w-8 text-orange-500" />,
      title: "Multiple Delivery Options",
      description: "Choose from self-pickup, provider delivery, or delivery partner"
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Quality Assured",
      description: "Verified providers and hygiene standards for safe meals"
    },
    {
      icon: <Heart className="h-8 w-8 text-orange-500" />,
      title: "Customizable Portions",
      description: "Choose between full or half tiffin based on your appetite"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Local Community",
      description: "Support local home chefs and enjoy authentic regional cuisine"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose HomeTiffin?</h2>
          <p className="text-gray-600 text-lg">Experience the convenience of home-cooked meals with our unique features</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;