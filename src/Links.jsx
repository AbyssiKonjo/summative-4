import { Route, Routes } from 'react-router-dom'
// Pages
import Home from './pages/Home'
import About from './pages/About'
import Programmes from './pages/Programmes'
import Shop from './pages/Shop'
import Team from './pages/Team'
import Board from './pages/Board'
import Founder from './pages/Founder'
import Sponsors from './pages/Sponsors'
import Mentors from './pages/Mentors'
import Tuakana from './pages/Tuakana'

import Donations from './pages/Donations'
import Contact from './pages/Contact'

// Single Page
import Programme from './components/Programme'

// Single Page

const Links = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/programmes' element={<Programmes/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/donate' element={<Donations/>}/>
        
        {/* About page secondary links */}
        <Route path='/team' element={<Team/>}/>
        <Route path='/board' element={<Board/>}/>
        <Route path='/founder' element={<Founder/>}/>
        <Route path='/sponsors' element={<Sponsors/>}/>
        <Route path='/mentors' element={<Mentors/>}/>
        <Route path='/tuakana' element={<Tuakana/>}/>

        {/* Single Page */}
        <Route path='/programme/:id' element={<Programme/>}/>

    </Routes>
  )
}

export default Links
