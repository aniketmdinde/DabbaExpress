import React from 'react';
import { UtensilsCrossed, Clock, MapPin, Shield, Heart, Users } from 'lucide-react';
import Lottie from "lottie-react";
import animation1 from "./../../public/animations/meal1.json";
import animation2 from "./../../public/animations/time4.json";
import animation3 from "./../../public/animations/delivery.json";
import animation4 from "./../../public/animations/quality.json";
import animation5 from "./../../public/animations/lunch.json"
import animation6 from "./../../public/animations/community.json";

const Features = () => {
  const features = [
    {
      animation: animation1,
      title: "Home-Cooked Meals",
      description: "Authentic and fresh meals prepared by passionate home chefs"
    },
    {
      animation: animation2,
      title: "Flexible Timing",
      description: "Order before cutoff time and get your meal when you need it"
    },
    {
      animation: animation3,
      title: "Multiple Delivery Options",
      description: "Choose from self-pickup, provider delivery, or delivery partner"
    },
    {
      animation: animation4,
      title: "Quality Assured",
      description: "Verified providers and hygiene standards for safe meals"
    },
    {
      animation: animation5,
      title: "Customizable Portions",
      description: "Choose between full or half tiffin based on your appetite"
    },
    {
      animation: animation6,
      title: "Local Community",
      description: "Support local home chefs and enjoy authentic regional cuisine"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-orange-500 mb-4">Why Choose HomeTiffin?</h2>
          <p className="text-gray-600 text-lg">Experience the convenience of home-cooked meals with our unique features</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-b from-orange-500 to-orange-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center mb-4">
              <Lottie animationData={feature.animation} style={{ width: 200, height: 200 }} />
              </div>
              <h3 className="text-xl font-semibold text-orange-500 mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;