import { Link } from "react-router-dom"

const RecipeCard = (props) => {
    const {id, Title, Image, Instructions, Ingredients, Chef, Category} = props.recipe
    
    return (
        <Link
            to={`/recipes/details/${id}`}
            className="group block w-80 bg-white/50 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden border border-gray-100 hover:border-orange-200"
        >
            <div className="relative overflow-hidden">
                <img 
                    className="w-full h-48 object-cover" 
                    src={Image} 
                    alt={Title}
                />
                <div className="absolute top-3 right-3">
                    <span className="bg-white/80 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
                        {Category}
                    </span>
                </div>
            </div>
            
            <div className="p-5">
                {/* Title */}
                <h1 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                    {Title}
                </h1>
                
                {/* Chef */}
                <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    <small className="text-gray-600 font-medium">Chef {Chef}</small>
                </div>
                
                {/* Instructions Preview */}
                <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
                    {Instructions.slice(0, 200)}...{" "}
                    <span className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
                        read more
                    </span>
                </p>
                
                {/* Ingredients */}
                <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                        Ingredients
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                        {Ingredients}
                    </p>
                </div>
                
                {/* Hover Arrow */}
                <div className="flex justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white transform translate-x-2 group-hover:translate-x-0 transition-transform duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard