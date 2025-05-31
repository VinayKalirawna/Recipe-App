import { createContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';

export const recipecontext = createContext(null);

const RecipeContext = (props) => {
    const [data, setdata] = useState([])

    useEffect(() => {
        const q = query(collection(db, "recipes"), orderBy("createdAt", "asc")); // or "desc" for newest first

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const recipes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            }));
            setdata(recipes);
        });

        return () => unsubscribe();
    }, []);

    
    return (
        <recipecontext.Provider value={{ data, setdata}}>
            {props.children}
        </recipecontext.Provider>
    
  )
}

export default RecipeContext


//  {
//             id: 1,
//             Title: "Classic Margherita Pizza",
//             Ingredients: "Pizza dough, Tomato sauce, Fresh mozzarella cheese, Fresh basil leaves, Olive oil,Salt and pepper to taste",
//             Instructions: "Preheat the oven to 475°F (245°C), Roll out the pizza dough and spread tomato sauce evenly, Top with slices of fresh mozzarella and fresh basil leaves, Drizzle with olive oil and season with salt and pepper, Bake in the preheated oven for 12-15 minutes or until the crust is golden brown, Slice and serve hot.",
//             Image: "https://cdn.dummyjson.com/recipe-images/1.webp",
//             "rating": 4.6,
//             Chef: "Pankaj chamoli",
//             Category: "Dinner"
//         }