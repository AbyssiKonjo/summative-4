import React from 'react'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'

import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'

const Shop = () => {
  return (
    <>
      <Seo
        title="Shop - The Kindness Institute"
        description="Browse the custom site I created for The Kindness Institute for my final summative."
        url={window.location.href}
      />
      <PageHeader title='Shop'/>
      <div className='product-and-cart-container'>
        <ProductList/>
        <div className="vl"></div>
        <Cart/>
      </div>
      
    </>
  )
}

export default Shop
