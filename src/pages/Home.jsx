import React from 'react'
import Header from '../components/common/Header/Header'
import Footer from '../components/common/Footer/Footer'
import CarouselDestaques from '../features/produto/components/CarouselDestaques/CarouselDestaques';

const Home = () => {
  return (
    <>
        <Header/>
        <CarouselDestaques />
        <Footer/>
    </>
  )
}

export default Home