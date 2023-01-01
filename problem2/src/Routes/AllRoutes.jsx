import React from 'react'
import {Routes,Route} from "react-router-dom"
import TaxCalculator from '../Components/TableTaxCalculator'
import FileUploaderPage from '../Pages/FileUploaderPage'
import HomePage from '../Pages/HomePage'
const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/file-upload' element={<FileUploaderPage/>}/>
    </Routes>
  )
}

export default AllRoutes