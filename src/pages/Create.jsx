import { nanoid } from 'nanoid';
import { useForm} from 'react-hook-form';
import { useContext } from 'react';
import { recipecontext } from '../context/RecipeContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { db } from '../firebase';
import { collection, addDoc, serverTimestamp  } from 'firebase/firestore';


const Create = () => {
    const navigate = useNavigate()
    const {data, setdata} = useContext(recipecontext);

    const {register, handleSubmit, reset} = useForm();

    // SubmitHandlerUsing Firestore
    const SubmitHandler = async (formData) => {
        try {
            const cleanedRecipe = {
                Title: formData.Title || "",
                Chef: formData.Chef || "",
                Image: formData.Image || "",
                Instructions: formData.Instructions || "",
                Ingredients: formData.Ingredients || "",
                Category: formData.Category || "",
                createdAt: serverTimestamp()
            };
            

            const docRef = await addDoc(collection(db, "recipes"), cleanedRecipe);

            toast.success("New Recipe Created!");
            reset();
            navigate("/recipe"); // Your RecipeList page will now pull from Firestore
        } catch (error) {
            toast.error("Error creating recipe");
            console.error("Firestore error:", error);
        }
    };



    // SubmitHandler Using Local storage
    // const SubmitHandler = (recipe) => {
    //     recipe.id = nanoid()
    //     const copydata = [...data];
    //     copydata.push(recipe);
    //     setdata(copydata);
    //     // localStorage.setItem("recipes", JSON.stringify(copydata))

    //     toast.success("New Recipe Created!")
    //     reset();
    //     navigate("/recipe")
    // }
    
    return (
    <>
        <h1 className='text-xl sm:text-2xl lg:text-3xl text-white/70 font-bold text-center font-serif px-4'>Enter the Recipe you want to add</h1>
        <form onSubmit={handleSubmit(SubmitHandler)}
            className='bg-white/50 border p-4 sm:p-5 lg:p-6 rounded-md shadow-md w-[95%] sm:w-[90%] lg:w-[80%] xl:w-[70%] mx-auto mt-6 sm:mt-8 lg:mt-10 text-black font-serif'>
            <input 
                className='block border-b outline-0 p-2 sm:p-3 ml-2 sm:ml-5 mb-4 sm:mb-5 w-[90%] sm:w-[85%] lg:w-[80%] placeholder:italic text-sm sm:text-base'
                {...register('Image')}
                type="url" name='Image' placeholder='https://example.com/image.jpg'/>

            <input 
                className='block border-b outline-0 p-2 sm:p-3 ml-2 sm:ml-5 mb-5 sm:mb-7 w-[90%] sm:w-[85%] lg:w-[80%] placeholder:italic text-sm sm:text-base'
                {...register('Title')}
                type="text" name='Title' placeholder='Enter recipe title'
            />

            <input
                className='block border-b outline-0 p-2 sm:p-3 ml-2 sm:ml-5 mb-5 sm:mb-7 w-[90%] sm:w-[85%] lg:w-[80%] placeholder:italic text-sm sm:text-base'
                {...register('Chef')}
                type='text' name='Chef' placeholder='Enter chef name'
            />
            
            <textarea 
                className='block border-b outline-0 p-2 sm:p-3 ml-2 sm:ml-5 mb-5 sm:mb-7 w-[90%] sm:w-[85%] lg:w-[80%] placeholder:italic text-sm sm:text-base min-h-20 sm:min-h-24'
                {...register('Instructions')}
                name="Instructions" placeholder='Enter cooking instructions...'
            ></textarea>

            <input 
                className='block border-b outline-0 p-2 sm:p-3 ml-2 sm:ml-5 mb-5 sm:mb-7 w-[90%] sm:w-[85%] lg:w-[80%] placeholder:italic text-sm sm:text-base'
                {...register('Ingredients')}
                type="text" name='Ingredients' placeholder='flour, sugar, eggs (comma separated)'
            />

            <select 
                className='ml-2 sm:ml-5 mb-4 sm:mb-5 w-[90%] sm:w-[85%] lg:w-[80%] p-2 sm:p-3 border-b outline-0 italic text-sm sm:text-base'
                defaultValue=""
                {...register('Category')}
                name="Category"
            >
                <option value="" disabled>Choose a category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
                <option value="Beverage">Beverage</option>
            </select>
            <br />
            <button
                type='submit'
                className='bg-[#73946B] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-md hover:bg-[#9EBC8A] transition-colors duration-200 italic text-sm sm:text-base ml-2 sm:ml-5'
            >
                Save Recipe
            </button>
        </form>
    </>

  )
}

export default Create


// import React from 'react';

// // This is your enhanced UI code - copy this back to your Create component
// const EnhancedRecipeForm = () => {
//   // Your existing imports and logic go here:
//   // import { nanoid } from 'nanoid';
//   // import { useForm} from 'react-hook-form';
//   // import { useContext } from 'react';
//   // import { recipecontext } from '../context/RecipeContext';
//   // import { useNavigate } from 'react-router-dom';
//   // import { toast } from 'react-toastify';
//   // import { db } from '../firebase';
//   // import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

//   // Mock function for demo - replace with your actual SubmitHandler
//   const handleSubmit = (fn) => (e) => {
//     e.preventDefault();
//     console.log('Form submitted');
//   };
  
//   const register = (name) => ({ name });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mb-4 shadow-lg">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
//             Create New Recipe
//           </h1>
//           <p className="text-gray-600 text-lg">Share your culinary masterpiece with the world</p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//           <div className="bg-gradient-to-r from-orange-400 to-red-400 p-6">
//             <h2 className="text-xl font-semibold text-white flex items-center">
//               <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//               </svg>
//               Recipe Details
//             </h2>
//           </div>

//           <div className="p-8 space-y-6">
//             {/* Image URL Input */}
//             <div className="group">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 Recipe Image URL
//               </label>
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
//                 {...register('Image')}
//                 type="url" 
//                 name='Image' 
//                 placeholder="https://example.com/your-delicious-recipe.jpg"
//               />
//             </div>

//             {/* Recipe Title */}
//             <div className="group">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                 </svg>
//                 Recipe Title *
//               </label>
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
//                 {...register('Title')}
//                 type="text" 
//                 name='Title' 
//                 placeholder="Name of the Dish"
//               />
//             </div>

//             {/* Chef Name */}
//             <div className="group">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 Chef Name
//               </label>
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
//                 {...register('Chef')}
//                 type='text' 
//                 name='Chef' 
//                 placeholder="Name of Chef"
//               />
//             </div>

//             {/* Instructions */}
//             <div className="group">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Cooking Instructions
//               </label>
//               <textarea
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400 min-h-32 resize-y"
//                 {...register('Instructions')}
//                 name="Instructions" 
//                 placeholder="Step by step instructions... 
// 1. Preheat oven to 350°F
// 2. Mix dry ingredients in a large bowl
// 3. Add wet ingredients and stir until combined..."
//               />
//             </div>

//             {/* Ingredients */}
//             <div className="group">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//                 Ingredients
//               </label>
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400"
//                 {...register('Ingredients')}
//                 type="text" 
//                 name='Ingredients' 
//                 placeholder="2 cups flour, 1 cup sugar, 3 eggs, 1 tsp vanilla (comma separated)"
//               />
//             </div>

//             {/* Category */}
//             <div className="group">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                 </svg>
//                 Category
//               </label>
//               <div className="relative">
//                 <select
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white group-hover:border-gray-400 appearance-none cursor-pointer"
//                   defaultValue=""
//                   {...register('Category')}
//                   name="Category"
//                 >
//                   <option value="" disabled>Choose a category</option>
//                   <option value="Breakfast">🌅 Breakfast</option>
//                   <option value="Lunch">🍽️ Lunch</option>
//                   <option value="Dinner">🌙 Dinner</option>
//                   <option value="Dessert">🍰 Dessert</option>
//                   <option value="Snack">🥨 Snack</option>
//                   <option value="Beverage">🥤 Beverage</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type='submit'
//                 className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
//                 onClick={() => console.log('Recipe saved!')}
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//                 <span>Save Recipe</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="text-center mt-6">
//           <p className="text-gray-500 text-sm">
//             Fields marked with * are required. Your recipe will be saved to your collection.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnhancedRecipeForm;