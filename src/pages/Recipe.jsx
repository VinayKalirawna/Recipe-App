import { useContext } from 'react'
import { recipecontext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';



const Reciepes = () => {

  const {data} = useContext(recipecontext)
  
  const renderrecipes = data.map((recipe) => {
    
    return(
        <RecipeCard key={recipe.id} recipe={recipe} />
    )
  })

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-10'>{data.length>0 ? renderrecipes : "No Recipes found"}</div>
  )
}

export default Reciepes

