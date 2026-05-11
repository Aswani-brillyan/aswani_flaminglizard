import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const GetProduct = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState('');
   const [error, setError] = useState('');
   const [currentFilter, setCurrentFilter] = useState('all');

   const img_url = 'https://aswanibrillyan.alwaysdata.net/static/images/';
   const navigate = useNavigate();

   const getProduct = async () => {
      setError('');
      setLoading('Fetching products...');

      try {
         const response = await axios.get("https://aswanibrillyan.alwaysdata.net/api/get_products");

         if (response.status === 200) {
            setProducts(response.data);
            setLoading('');
         }
      } catch (err) {
         setLoading('');
         setError(err.message);
      }
   };

   const addToCart = (product)=>{
      const cart =JSON.parse(localStorage.getItem("cart")||"[]");
      const existingItem = cart.find((item)=>item.product_id===product.product_id);

      if (existingItem){
         existingItem.quantity += 1;
      } else {
         cart.push({...product, quantity: 1});
      }

      localStorage.setItem("cart",JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"))

   };

   useEffect(() => {
      getProduct();
   }, []);

   const displayedProducts = products.filter(p =>
      currentFilter === "all" || p.product_category === currentFilter
   );

   return (
      <div className="row">
         

         <h2 className="text-warning">Le'Menu</h2>
         <h5 className="text-warning">{loading}</h5>
         <h5 className="text-danger">{error}</h5>

         <div className="d-flex justify-content-center mb-3">
            <button className={`btn ${currentFilter === 'all' ? 'btn-warning' : 'btn-outline-warning'} me-2`} onClick={() => setCurrentFilter('all')}>All</button>
            <button className={`btn ${currentFilter === 'starter' ? 'btn-warning' : 'btn-outline-warning'} me-2`} onClick={() => setCurrentFilter('starter')}>Starter</button>
            <button className={`btn ${currentFilter === 'main dish' ? 'btn-warning' : 'btn-outline-warning'} me-2`} onClick={() => setCurrentFilter('main dish')}>Main Dish</button>
            <button className={`btn ${currentFilter === 'dessert' ? 'btn-warning' : 'btn-outline-warning'} me-2`} onClick={() => setCurrentFilter('dessert')}>Dessert</button>
         </div>

         {displayedProducts.map((product) => (
            <div key={product.product_id} className="col-md-3 justify-content-center mb-4 d-flex">
               <div className="card shadow card-margin h-100 d-flex flex-column">
                  <img
                     className="product_img"
                     src={img_url + product.product_image}
                     alt={product.product_name}
                  />

                  <div className="card-body d-flex flex-column">
                     <h5 className="mt-2">{product.product_name}</h5>
                     {/* <p className="text-muted">{product.product_description}</p> */}
                     <b className="text-warning">{product.product_cost}</b>


                     <button className="btn btn-warning me-2" onClick={()=>addToCart(product)}>Add to Cart</button>
                     <button
                        className="btn flaming-btn mt-auto text-light"
                        onClick={() => navigate("/makepayment", { state: { product } })}
                     >
                        Purchase now
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default GetProduct;