import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const GetProduct = () => {
   let [products, setProducts] = useState([])
   let [loading, setLoading] = useState('')
   let [error, setError] = useState('')
   let[starters,setStarter] =useState([])
   let[main_dish,setMainDish] =useState([])
   let[dessert,setDessert] =useState([])



   //base url for image location
   const img_url='https://aswanibrillyan.alwaysdata.net/static/images/'
   let navigator = useNavigate()
   //function to fetch products from the server 
   const getProduct = async () => {
      setError('')
      setLoading('fetching product please wait...');

      try {
         const response = await axios.get("https://aswanibrillyan.alwaysdata.net/api/get_products")
         console.log(response)
         if (response.status === 200) {
            setLoading('')
            setProducts(response.data);

            let starters_products =response.data.filter((product)=>
               product.product_category === "starters"
            );
            
            setStarter(starters_products);

            

         }




      } catch (error) {
         setLoading('');
         setError(error.message);

      }
   };


   useEffect(() => { getProduct() }, [])




   return (
      <div className="row">
         <Navbar />
         <h2 className="text-warning">Le'Menu</h2>
         <h5 className="text-warning">{loading}</h5>
         <h5 className="text-danger">{error}</h5>


         {/* map /loop over products to access one at a time */}
         <h2 className="text-center my-3 p-4 bg-warning text-warning">Starters</h2>
         

         {products.map((product) => (
            <div className="col-md-3 justify-content-center mb-4">
               <div className="card shadow card-margin">
                  <img src={img_url+product.product_image} alt="product_img mt-4" />

                  <div className="card-body">
                     <h5 className="mt-2">{product.product_name}</h5>
                     <p className="text-muted">{product.product_description}</p>
                     <b className="text-warning">{product.product_cost}</b>
                     <br />
                     <button className="btn flaming-btn" onClick={()=>{navigator("/makepayment",{ state:{ product }})}}>Purchase now</button>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}

export default GetProduct;