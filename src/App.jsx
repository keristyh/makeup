import { useState } from 'react'
import './App.css'
import Product from './components/Product';
import banner from './assets/banner.jpg';

function App() {

  const [currentProduct, setCurrentProduct] = useState(null);
  const [prevProducts, setPrevProducts] = useState([]);
  const [banned, setBanned] = useState({ "Brand": [], "Product Type": [], "Category": [] });

  const handleBan = (key, value) => {
    setBanned((prev) => ({
      ...prev, [key]: [...new Set([...prev[key], value])]
    }))
  }



  const callAPI = async () => {
    const response = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json");
    const json = await response.json();

    if (!json || json.length == 0) {
      alert("Oops! No products found!");
      return;
    }

    let filteredProducts = json.filter((p) =>
      !banned["Brand"].includes(p.brand) &&
      !banned["Product Type"].includes(p.product_type) &&
      !banned["Category"].includes(p.category || "N/A"))

    if (filteredProducts.length == 0) {
      alert("All products have been banned or filtered out!")
      return;
    }

    const randomProduct = filteredProducts[Math.floor(Math.random() * filteredProducts.length)]

    if (!randomProduct.image_link) {
      alert("Oops! This product has no image.")
    }

    setCurrentProduct(randomProduct);
    setPrevProducts((products) => [...products, randomProduct])
  }

  return (
    <div className='whole-page'>
      <img src={banner} alt='Makeup Banner' className='banner'></img>
      <h1>Search for Makeup Products! 💄</h1>
      <button className='random-button' onClick={callAPI}>
        Get Random Product
      </button>

      <Product product={currentProduct} onBan={handleBan} />

      <h2>Ban List</h2>
      <ul>
        {Object.entries(banned).map(([key, list]) =>
          list.map((item, index) => (
            <li key={`${key}-${index}`}>{key}: {item || "N/A"}</li>
          )))}
      </ul>

      {prevProducts.length > 0 && (
        <div className='previous-products'>
          <h2>Previous Products</h2>
          {prevProducts.map((product, index) => (
            <div className='product-history'>
              <img src={product.image_link} alt={`Product ${index}`} width="150" />
              <h3>{product.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App;
