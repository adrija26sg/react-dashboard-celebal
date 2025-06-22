import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import Tables from './pages/Tables'
import Charts from './pages/Charts'
import Calendar from './pages/Calendar'
import Kanban from './pages/Kanban'
import Settings from './pages/Settings'

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Box>
  )
}

export default App 