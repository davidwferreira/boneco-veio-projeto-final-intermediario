import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import HomeSection from '../components/HomeSection/HomeSection'
import HomeSection2 from '../components/HomeSection2/HomeSection2'
import CarouselDestaques from '../components/CarouselDestaques/CarouselDestaques';

const Home = () => {
  return (
    <>
        <Header/>
        <CarouselDestaques />
        <HomeSection2 />
        <HomeSection />
        <Footer/>
    </>
  )
}

export default Home