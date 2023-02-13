import Login from "./components/Login";
import ProductDisplay from "./components/ProductDisplay";
import SearchNavBar from "./components/SearchNavBar";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'


function App() {

  const [searchKeyWord, setSearchKeyWord] = useState("")

  const auth = localStorage.getItem('react-demo-token')



  return (
    <>
      <Router>
        <SearchNavBar
          keyWord={searchKeyWord}
          setKeyWord={setSearchKeyWord}
        />
        <Routes>
          {
            auth ? (
              <Route path="/" element={<ProductDisplay searchKeyWord={searchKeyWord} />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )
          }
          {!auth && <Route path='/' element={<Navigate to='/login' />} />}
          <Route path='*' element={<Navigate to='/' />} />
          <Route path='/login' element={auth ? <Navigate to='/' /> : <Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;