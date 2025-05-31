import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: "📚",
      title: "Handpicked Recipes",
      description: "Curated and tested recipes by real users from around the world"
    },
    {
      icon: "🍽️",
      title: "All Categories", 
      description: "From breakfast to dinner, snacks to desserts - we've got it all"
    },
    {
      icon: "🏆",
      title: "Chef Tips",
      description: "Professional tips, quick ideas, and healthy cooking options"
    },
    {
      icon: "❤️",
      title: "Free Access",
      description: "Completely free and accessible to all food enthusiasts"
    }
  ];

  return (
    <div className="min-h-screen bg-white/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-20 rounded-full p-4 backdrop-blur-sm">
              <span className="text-4xl">👨‍🍳</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            About MyRecipeBook
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
            Your personal recipe vault built by food lovers, for food lovers. 
            Discover, create, and share incredible culinary experiences.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <span className="text-5xl">✨</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            To make cooking fun, accessible, and creative. We bring people together through 
            shared meals and unforgettable flavors, promoting a culture of healthy and happy eating 
            that connects communities one recipe at a time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What You'll Discover</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Creator Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-3xl font-bold">
                  V
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <span className="text-orange-400">👥</span>
                  <span className="text-orange-400 font-medium">Meet the Creator</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">Hi, I'm Vinay</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  A passionate developer and food enthusiast who believes in the power of combining 
                  technology with culinary arts. This project represents the perfect blend of my two 
                  greatest passions: creating innovative solutions and celebrating incredible food.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8 lg:p-12">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8 border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0 mt-1">☕</span>
                <div>
                  <p className="text-lg text-gray-700 italic leading-relaxed mb-4">
                    "Cooking is an art, and every recipe tells a story. Each dish carries memories, 
                    traditions, and love from one generation to the next. Let your culinary story 
                    begin here, and may it inspire countless others to create, share, and connect 
                    through the universal language of food."
                  </p>
                  <p className="text-gray-600 font-medium">- Vinay, Creator of MyRecipeBook</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Built with ❤️ for food lovers everywhere</p>
              <div className="flex justify-center gap-2 flex-wrap">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Portfolio Project</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">Open Source</span>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">Community Driven</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Culinary Journey?</h3>
            <p className="text-orange-100 mb-6">Join thousands of home cooks sharing their favorite recipes</p>
            <button 
              onClick={() => navigate("/recipe")}
              className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors duration-300 hover:scale-105 transform cursor-pointer">
              Explore Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;