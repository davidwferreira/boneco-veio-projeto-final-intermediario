import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CarouselDestaques from '../components/CarouselDestaques/CarouselDestaques';

const Home = () => {
  return (
    <>
        <Header/>
        <HomeSection />
        <CarouselDestaques />
        <Footer/>
    </>
  )
}

export default Home