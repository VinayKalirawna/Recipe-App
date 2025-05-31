import Mainroutes from "./routes/Mainroutes"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div className="h-screen w-screen p-5 mb-10">
      <Navbar />
      <Mainroutes />
      
    </div>
  )
}

export default App