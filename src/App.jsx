
import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import Features from './components/Features'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import FloatingImage from './components/Story'

function App() {
 

  return (
 <main className='relative min-h-screen w-screen overflow-x-hidden'>
  <Navbar/>
 <Hero/>
<About/>
<Features/>
<FloatingImage/>
<Contact/>
 </main>
  )
}

export default App
