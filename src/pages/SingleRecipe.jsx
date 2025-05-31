import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { recipecontext } from '../context/RecipeContext'
import { useForm} from 'react-hook-form';
import { toast } from 'react-toastify';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';


const SingleRecipe = () => {
    const navigate = useNavigate()
    const {data, setdata} = useContext(recipecontext)
    const params = useParams()
    const recipe = data.find(recipe => params.id == recipe.id)    
   
    const {register, handleSubmit, reset} = useForm();

    const UpdateHandler = async (updatedData) => {
        try {
            const recipeRef = doc(db, "recipes", params.id);

            await updateDoc(recipeRef, {
                Title: updatedData.Title || "",
                Chef: updatedData.Chef || "",
                Image: updatedData.Image || "",
                Instructions: updatedData.Instructions || "",
                Ingredients: updatedData.Ingredients || "",
                Category: updatedData.Category || ""
            });

            toast.success("Recipe Updated!");
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update recipe.");
        }
    };

    const DeleteHandler = async () => {
        try {
            await deleteDoc(doc(db, "recipes", params.id));
            toast.success("Recipe Deleted!");
            navigate("/recipe");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete recipe.");
        }
    };



    // using Local storage
    // const UpdateHandler = (recipe) => {
    //     const index = data.findIndex((recipe)=> params.id==recipe.id)
    //     const copydata = [...data]
    //     copydata[index] = { ...copydata[index], ...recipe}
    //     setdata(copydata)
    //     localStorage.setItem("recipes", JSON.stringify(copydata))
    //     toast.success("Recipe Updated!")
    // }

//    const DeleteHandler = () => {
//         const filterdata = data.filter(r => r.id != params.id)
//         setdata(filterdata)
//         localStorage.setItem("recipes", JSON.stringify(filterdata))
//         toast.success("Recipe Deleted!")
//         navigate("/recipe")
//    }

   useEffect(() => {
    if (recipe) {
        reset({
            Image: recipe.Image,
            Title: recipe.Title,
            Chef: recipe.Chef,
            Instructions: recipe.Instructions,
            Ingredients: recipe.Ingredients,
            Category: recipe.Category
        });
    }}, [recipe, reset]);


    return (recipe ? (
        <div className='p-4 sm:p-6 lg:p-10 gap-4 sm:gap-6 lg:gap-10'>
            <div className=''>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-20'>
                    {/* Recipe Display Section */}
                    <div className='bg-white/50 rounded-2xl shadow-2xl p-4 sm:p-5 lg:order-1 order-1'>
                        <div className='mb-4 sm:mb-6'>
                            <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 leading-tight'>{recipe.Title}</h1>
                            <p className='text-base sm:text-lg text-amber-600 font-medium'>by Chef {recipe.Chef}</p>
                        </div>
                        
                        <div className='mb-6 sm:mb-8'>
                            <img 
                                className='w-full h-48 sm:h-60 lg:h-80 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300' 
                                src={recipe.Image} 
                                alt={recipe.Title} 
                            />
                        </div>
                        
                        <div className='space-y-4 sm:space-y-6'>
                            <div>
                                <h3 className='text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-3 flex items-center'>
                                    <span className='w-2 h-2 bg-amber-500 rounded-full mr-3'></span>
                                    Instructions
                                </h3>
                                <p className='text-sm sm:text-base text-gray-800 bg-white/20 p-3 sm:p-4 rounded-lg'>{recipe.Instructions}</p>
                            </div>
                            
                            <div>
                                <h3 className='text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-3 flex items-center'>
                                    <span className='w-2 h-2 bg-green-500 rounded-full mr-3'></span>
                                    Ingredients
                                </h3>
                                <p className='text-sm sm:text-base text-gray-800 bg-white/20 p-3 sm:p-4 rounded-lg'>{recipe.Ingredients}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Edit Form Section */}
                    <div className='order-2 lg:order-2'>
                        <form onSubmit={handleSubmit(UpdateHandler)}
                            className='bg-white/50 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100'>
                            <div className='mb-6 sm:mb-8'>
                                <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2'>Edit Recipe</h2>
                                <p className='text-sm sm:text-base text-gray-600'>Update the recipe details below</p>
                            </div>
                            
                            <div className='space-y-4 sm:space-y-6'>
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Recipe Image</label>
                                    <input 
                                        className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 text-sm sm:text-base'
                                        {...register('Image')}
                                        type="url" 
                                        name='Image' 
                                        placeholder='https://example.com/image.jpg'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Recipe Title</label>
                                    <input 
                                        className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 text-sm sm:text-base'
                                        {...register('Title')}
                                        type="text" 
                                        name='Title' 
                                        placeholder='Enter recipe Name'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Chef Name</label>
                                    <input
                                        className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 text-sm sm:text-base'
                                        {...register('Chef')}
                                        type='text' 
                                        name='Chef' 
                                        placeholder='Enter chef name'
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Instructions</label>
                                    <textarea 
                                        className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 min-h-24 sm:min-h-32 resize-y text-sm sm:text-base'
                                        {...register('Instructions')}
                                        name="Description" 
                                        placeholder='Enter cooking instructions...'
                                    ></textarea>
                                </div>

                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Ingredients</label>
                                    <input 
                                        className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 text-sm sm:text-base'
                                        {...register('Ingredients')}
                                        type="text" 
                                        name='Ingredients' 
                                        placeholder='flour, sugar, eggs (comma separated)'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Category</label>
                                    <select 
                                        className='w-full bg-white/20 px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 bg-white cursor-pointer text-sm sm:text-base'
                                        {...register('Category')}
                                        name="Category"
                                    >
                                        <option value="" disabled>Choose a category</option>
                                        <option value="Breakfast">🌅 Breakfast</option>
                                        <option value="Lunch">🌞 Lunch</option>
                                        <option value="Dinner">🌙 Dinner</option>
                                        <option value="Dessert">🍰 Dessert</option>
                                        <option value="Snack">🥨 Snack</option>
                                        <option value="Beverage">🥤 Beverage</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8'>
                                <button
                                    type='submit'
                                    className='bg-[#73946B] text-white px-4 py-2 sm:py-3 rounded-md hover:bg-[#9EBC8A] transition-colors duration-200 italic hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base'
                                >
                                    ✨ Update Recipe
                                </button>
                                
                                <button
                                    type='button'
                                    onClick={DeleteHandler}
                                    className='bg-[#73946B] text-white px-4 py-2 sm:py-3 rounded-md hover:bg-[#9EBC8A] transition-colors duration-200 italic hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base'
                                >
                                    🗑️ Delete Recipe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>) : (
            <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-amber-500 border-t-transparent mx-auto mb-4'></div>
                    <p className='text-lg sm:text-xl text-gray-600 font-medium'>Loading recipe...</p>
                </div>
            </div>
        )
    )
}

export default SingleRecipe





// // import React, { useState } from 'react';

// // This is your enhanced UI code - copy this back to your SingleRecipe component
// const EnhancedSingleRecipe = () => {
//   // Mock data for demo - replace with your actual recipe data
//   const recipe = {
//     Title: "Grandma's Famous Chocolate Chip Cookies",
//     Chef: "Julia Child",
//     Image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     Instructions: "1. Preheat oven to 375°F. 2. In a large bowl, cream together butter and sugars until light and fluffy. 3. Beat in eggs one at a time, then vanilla. 4. In separate bowl, whisk together flour, baking soda, and salt. 5. Gradually mix dry ingredients into wet ingredients. 6. Stir in chocolate chips. 7. Drop rounded tablespoons onto ungreased baking sheets. 8. Bake 9-11 minutes until golden brown.",
//     Ingredients: "2 cups all-purpose flour, 1 cup butter, 3/4 cup brown sugar, 1/2 cup white sugar, 2 eggs, 2 tsp vanilla, 1 tsp baking soda, 1 tsp salt, 2 cups chocolate chips",
//     Category: "Dessert"
//   };

//   // Mock functions for demo - replace with your actual functions
//   const register = (name) => ({ name });
//   const handleSubmit = (fn) => (e) => {
//     e.preventDefault();
//     console.log('Form submitted');
//   };
//   const UpdateHandler = () => console.log('Update clicked');
//   const DeleteHandler = () => console.log('Delete clicked');

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mb-4 shadow-lg">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
//             Recipe Details & Editor
//           </h1>
//           <p className="text-gray-600 text-lg">View and modify your delicious creation</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
//           {/* Recipe Display Section */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//             <div className="bg-gradient-to-r from-green-400 to-teal-400 p-6">
//               <h2 className="text-2xl font-bold text-white flex items-center">
//                 <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                 </svg>
//                 {recipe.Title}
//               </h2>
//               <p className="text-green-50 mt-2 text-lg">Created by Chef {recipe.Chef}</p>
//             </div>
            
//             <div className="p-6 space-y-6">
//               {/* Recipe Image */}
//               <div className="relative overflow-hidden rounded-xl">
//                 <img 
//                   className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
//                   src={recipe.Image} 
//                   alt={recipe.Title}
//                 />
//                 <div className="absolute top-4 right-4">
//                   <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-lg">
//                     🍰 {recipe.Category}
//                   </span>
//                 </div>
//               </div>
              
//               {/* Instructions Section */}
//               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                   <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   Cooking Instructions
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed">{recipe.Instructions}</p>
//               </div>
              
//               {/* Ingredients Section */}
//               <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                   <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                   Ingredients List
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed">{recipe.Ingredients}</p>
//               </div>
//             </div>
//           </div>
          
//           {/* Edit Form Section */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//             <div className="bg-gradient-to-r from-orange-400 to-red-400 p-6">
//               <h2 className="text-xl font-semibold text-white flex items-center">
//                 <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                 </svg>
//                 Edit Recipe Details
//               </h2>
//               <p className="text-orange-50 mt-1">Update your recipe information below</p>
//             </div>

//             <div className="p-8 space-y-6">
              
//               {/* Image URL Input */}
//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   Recipe Image URL
//                 </label>
//                 <input
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
//                   {...register('Image')}
//                   type="url" 
//                   name='Image' 
//                   placeholder="https://example.com/your-delicious-recipe.jpg"
//                 />
//               </div>

//               {/* Recipe Title */}
//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                   </svg>
//                   Recipe Title
//                 </label>
//                 <input
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
//                   {...register('Title')}
//                   type="text" 
//                   name='Title' 
//                   placeholder="e.g., Grandma's Famous Chocolate Chip Cookies"
//                 />
//               </div>

//               {/* Chef Name */}
//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                   Chef Name
//                 </label>
//                 <input
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
//                   {...register('Chef')}
//                   type='text' 
//                   name='Chef' 
//                   placeholder="Your name or the recipe creator"
//                 />
//               </div>
              
//               {/* Instructions */}
//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   Cooking Instructions
//                 </label>
//                 <textarea
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400 min-h-32 resize-y"
//                   {...register('Instructions')}
//                   name="Instructions" 
//                   placeholder="Step by step instructions..."
//                 />
//               </div>

//               {/* Ingredients */}
//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                   Ingredients
//                 </label>
//                 <input
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
//                   {...register('Ingredients')}
//                   type="text" 
//                   name='Ingredients' 
//                   placeholder="2 cups flour, 1 cup sugar, 3 eggs (comma separated)"
//                 />
//               </div>

//               {/* Category */}
//               <div className="group">
//                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                   <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                   </svg>
//                   Category
//                 </label>
//                 <div className="relative">
//                   <select
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400 appearance-none cursor-pointer"
//                     {...register('Category')}
//                     name="Category"
//                   >
//                     <option value="" disabled>Choose a category</option>
//                     <option value="Breakfast">🌅 Breakfast</option>
//                     <option value="Lunch">🍽️ Lunch</option>
//                     <option value="Dinner">🌙 Dinner</option>
//                     <option value="Dessert">🍰 Dessert</option>
//                     <option value="Snack">🥨 Snack</option>
//                     <option value="Beverage">🥤 Beverage</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-4">
//                 <button
//                   type='submit'
//                   className="flex-1 bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
//                   onClick={UpdateHandler}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span>Update Recipe</span>
//                 </button>
                
//                 <button
//                   type='button'
//                   onClick={DeleteHandler}
//                   className="flex-1 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                   </svg>
//                   <span>Delete Recipe</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnhancedSingleRecipe;