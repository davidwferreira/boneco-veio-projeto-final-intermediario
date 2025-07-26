import React from 'react'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Prateleira from '../components/Prateleira/Prateleira.jsx';
const Home = () => {
  return (
    <>   
      <Header />
        <Prateleira></Prateleira>  
      <Footer />
    </>
  )
}

export default Home