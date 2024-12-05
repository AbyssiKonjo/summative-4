import './App.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useCustomizer from './hooks/useCustomizer'

import Navbar from './components/Navbar'
import Links from './Links'
import Footer from './components/Footer'

function App() {
  const {bgColor, fontFamilyH1, fontFamilyH2, fontFamilyH3, fontFamilyBody, navColor, primaryButtonColor} = useCustomizer();
  const location = useLocation();

  useEffect(() => {
    // Change background color to the body:
    document.body.style.backgroundColor = `#${bgColor}`
    
    // Body Font
    document.body.style.fontFamily = fontFamilyBody;
    
    // Title Font
    document.querySelectorAll('h1').forEach((title) => {
      title.style.fontFamily = fontFamilyH1;
    });

    // Header Font
    document.querySelectorAll('h2').forEach((header) => {
      header.style.fontFamily = fontFamilyH2;
    });

    // Sub-header Font
    document.querySelectorAll('h3').forEach((subHeader) => {
      subHeader.style.fontFamily = fontFamilyH3;
    });

    document.querySelector('nav').style.backgroundColor = navColor;
    document.querySelector('footer').style.backgroundColor = navColor;

    // document.querySelector('#primaryButton').style.backgroundColor = primaryButtonColor;

    // Change color of the Header and Mobile menu
    // document.getElementById('topNav').style.backgroundColor = `#${navColor}`;
    
  }, [bgColor, fontFamilyH1, fontFamilyH2, fontFamilyH3, fontFamilyBody, navColor, location]);

  return (
    <>
      <Navbar/>
      <Links/>
      <Footer/>      
    </>
  )
}

export default App
