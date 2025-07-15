import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import HomeSection from '../components/HomeSection/HomeSection'
import CarouselDestaques from '../components/CarouselDestaques/CarouselDestaques';

const Home = () => {
  return (
    <>
        <Header/>
        <CarouselDestaques />
        <HomeSection />
        <Footer/>
    </>
  )
}

export default Home