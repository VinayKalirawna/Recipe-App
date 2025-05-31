import { useNavigate } from 'react-router-dom';

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Beverage"];

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    if (cat === "All") {
      navigate("/recipe");
    } else {
      navigate(`/category/${cat}`);
    }
  };

  return (
    <>
  {/* Hero Section */}
  <div className="relative bg-white/50 py-16 px-4 rounded-3xl mb-12 overflow-hidden">    
    <div className="relative text-center">
      <div className="inline-flex items-center gap-3 mb-6">
        <span className="text-4xl md:text-6xl">🍽️</span>
        <span className="text-4xl md:text-6xl">👨‍🍳</span>
        <span className="text-4xl md:text-6xl">🥘</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 bg-clip-text text-transparent mb-6 leading-tight">
        Explore Recipes by Category
      </h1>
      
      <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
        Discover culinary masterpieces from around the world. Click on a category to view its 
        <span className="text-orange-600 font-semibold"> delicious recipes</span> and start your cooking adventure!
      </p>
      
      <div className="flex justify-center items-center gap-6 mt-8">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">Fresh Ingredients</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">Easy to Follow</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">Chef Approved</span>
        </div>
      </div>
    </div>
  </div>

  {/* Category Filter with Enhanced Design */}
  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
        🏷️ Choose Your Favorite Category
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto rounded-full"></div>
    </div>
    
    <div id="categories" className="flex flex-wrap justify-center gap-4 px-4">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className="px-4 py-2 rounded-full font-semibold bg-gray-200 text-gray-700 hover:bg-[#D2D0A0] transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
        >
          {cat}
        </button>
      ))}
    </div>
  </div>

  {/* Additional Home Page Content Suggestions */}
  
  {/* Stats Section */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 mb-12">
    <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-2xl text-center shadow-lg">
      <div className="text-3xl mb-2">🍳</div>
      <div className="text-2xl font-bold text-orange-700">500+</div>
      <div className="text-sm text-orange-600 font-medium">Recipes</div>
    </div>
    <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl text-center shadow-lg">
      <div className="text-3xl mb-2">👨‍🍳</div>
      <div className="text-2xl font-bold text-green-700">50+</div>
      <div className="text-sm text-green-600 font-medium">Expert Chefs</div>
    </div>
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl text-center shadow-lg">
      <div className="text-3xl mb-2">⭐</div>
      <div className="text-2xl font-bold text-blue-700">4.9</div>
      <div className="text-sm text-blue-600 font-medium">Rating</div>
    </div>
    <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl text-center shadow-lg">
      <div className="text-3xl mb-2">🌍</div>
      <div className="text-2xl font-bold text-purple-700">25+</div>
      <div className="text-sm text-purple-600 font-medium">Countries</div>
    </div>
  </div>

  {/* Featured Section */}
  <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-3xl p-8 mb-12 border border-gray-200">
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        ✨ Why Choose Our Recipes?
      </h2>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8">
      <div className="text-center">
        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚡</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Quick & Easy</h3>
        <p className="text-gray-600">Step-by-step instructions that anyone can follow</p>
      </div>
      
      <div className="text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🥗</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Healthy Options</h3>
        <p className="text-gray-600">Nutritious recipes for a balanced lifestyle</p>
      </div>
      
      <div className="text-center">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🌟</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Chef Tested</h3>
        <p className="text-gray-600">Every recipe is tested by professional chefs</p>
      </div>
    </div>
  </div>

  {/* Call to Action */}
  <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-3xl mb-12">
    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Cooking? 🚀</h2>
    <p className="text-lg mb-6 opacity-90">Join thousands of home cooks creating amazing dishes every day</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button 
        onClick={() => navigate("/recipe")}
        className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-orange-500 transition-all duration-300"
      >
        Browse All Recipes
      </button>
      <button 
        onClick={() => navigate("/create")}
        className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-orange-500 transition-all duration-300"
      >
        Create Your First Recipe
      </button>
    </div>
  </div>
</>
  )
};

export default Home;