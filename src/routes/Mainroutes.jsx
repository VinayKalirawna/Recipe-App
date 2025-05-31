import { Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import Recipe from '../pages/Recipe'
import About from '../pages/About'
import Create from '../pages/Create'
import SingleRecipe from '../pages/SingleRecipe'
import CategoryPAge from '../pages/CategoryPAge'

const Mainroutes = () => {
  return (
    <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/category/:category' element={<CategoryPAge />} />
        
        <Route path='/recipe' element={<Recipe />} />
        <Route path='/recipes/details/:id' element={<SingleRecipe />} />
        <Route path='/create' element={<Create /> } />

        <Route path='/about' element={<About />} />
        
    </Routes>
  )
}

export default Mainroutes