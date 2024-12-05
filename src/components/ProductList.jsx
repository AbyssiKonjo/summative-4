import { useContext, useEffect, useState } from 'react';
import wooCommerceApi from '../../woocommerceApi';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await wooCommerceApi.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, []);

  const handleAddToCart = (product) => {
    if (product && product.prices && product.prices.price) {
      addToCart({
        ...product,
        quantity: 1, // Default quantity
      });
    } else {
      console.error('Invalid product data:', product);
    }
  };

  return (
    <>
      <div id='pageContent'>
        <div className='product'>
          {products.map((product) => (
            <div id='productCard' key={product.id}>
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                />
              )}
              <div className='product-content'>
                <h4>{product.name}</h4>
                <p>Price: ${(product.prices.price / 100).toFixed(2)}</p>
                <button
                  className='primary-button'
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
