import React from 'react'
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Topbar from './scenes/global/Topbar'
import {Routes, Route, useLocation} from "react-router-dom"
import Dashboard from './scenes/dashboard/index'
import Sidebar from './scenes/global/Sidebar'
import Team from './scenes/team'
import Scholarships from './scenes/Scholarships'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Mentors from './scenes/Mentors'

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <div className="app">
      {window.location.pathname  != '/login' ? <Sidebar/> :undefined}
      <main className='content' >
        {location.pathname != '/login' ? <Topbar/>:undefined}
        <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path="/" element={<Dashboard/>} />
          {/* <Route exact path="/users" element={<Team/>} /> */}
          <Route exact path="/1st" element={<Scholarships yearOfStudy="1st"/>} />
          <Route exact path="/2nd" element={<Scholarships yearOfStudy="2nd"/>} />
          <Route exact path="/3rd" element={<Scholarships yearOfStudy="3rd"/>} />
          <Route exact path="/4th" element={<Scholarships yearOfStudy="4th"/>} />
          <Route path="/mentors" element={<Mentors/>} />
          {/* <Route path="/form" element={<Form/>} /> */}
          {/* <Route path="/bar" element={<Bar/>} /> */}
          {/* <Route path="/pie" element={<Pie/>} /> */}
          {/* <Route path="/line" element={<Line/>} /> */}
          {/* <Route path="/faq" element={<FAQ/>} /> */}
          {/* <Route path="/geography" element={<Geography/>} /> */}
          {/* <Route path="/calendar" element={<Calendar/>} /> */}
        </Routes>
      </main>
    </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
    
  )
}

export default App
