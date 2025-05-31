import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { recipecontext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard'; // Make sure this is imported

const CategoryPAge = () => {
  const { category } = useParams();
  const { data } = useContext(recipecontext);
  const [filtered, setfiltered] = useState([]); // ✅ FIXED HERE

  useEffect(() => {
    const filteredRecipe = data.filter(recipe => recipe.Category === category);
    setfiltered(filteredRecipe);
  }, [category, data]);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {filtered.length > 0 ? (
        filtered.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)
      ) : (
        <p className="text-gray-600 text-lg">No recipes found for this category.</p>
      )}
    </div>
  );
};

export default CategoryPAge;
