import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";

const AddProductComponent = () => {

    let [product_name, setProductName] = useState('');
    let [product_description, setProductDescription] = useState('');
    let [product_cost, setProductCost] = useState('');
    let [product_category, setProductCategory] = useState('');
    let [product_image, setProductImage] = useState('');

    let [loading, setLoading] = useState('')
    let [error, setError] = useState('')
    let [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        setSuccess('')
        setLoading('Please wait...');

        try {
            const product_data = new FormData()
            product_data.append('product_name', product_name)
            product_data.append('product_description', product_description)
            product_data.append('product_cost', product_cost)
            product_data.append('product_category', product_category)
            product_data.append('product_image', product_image)


            const response = await axios.post('https://aswanibrillyan.alwaysdata.net/api/add_product',product_data);
            console.log(response);
            if (response.status===200){
                setLoading('')
                setSuccess(response.data.message)

                //clear the form
                setProductName('')
                setProductDescription('')
                setProductCost('')
                setProductCategory('')
                
            }

        } catch (error) {
            setError(error.message)
            setLoading('');

        }

    }


    return (
        <div className="row justify-content-center mt-4">
            <Navbar />
            <div className="col-md-6 card shadow p-4">
                <h2>Add Product</h2>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-success">{success}</h5>

                <form action="" onSubmit={handleSubmit}className="form-container">
                    <input
                        className="form-control"
                        placeholder='Dish Name'
                        required
                        type="text"
                        onChange={(e) => { setProductName(e.target.value) }}
                        value={product_name} />

                    <br />
                    <textarea

                        placeholder="description"
                        className="form-control"
                        required
                        rows='7'
                        onChange={(e) => { setProductDescription(e.target.value) }}
                        value={product_description}
                    />
                    <input
                        type="number"
                        placeholder="Enter product cost/$"
                        className="form-control"
                        required
                        onChange={(e) => { setProductCost(e.target.value) }}
                        value={product_cost}
                    />
                    <br />

                    <label htmlFor="" className="form-label">Product Image</label>
                    <select
                        className="form-select"
                        required
                        onChange={(e) => { setProductCategory(e.target.value) }}
                    >
                        <option value="">Select category    </option>
                        <option value="starter">starter</option>
                        <option value="main dish">main dish</option>
                        <option value="dessert">dessert</option>
                        
                    </select>

                    <br />
                    <label htmlFor="" className="form-label">Product Image</label>
                    <input
                        type="file"
                        placeholder=""
                        className="form-control"
                        accept="image/*"

                        onChange={(e) => { setProductImage(e.target.files[0]) }}
                    />
                    <br />

                    <button className="btn btn-dark">Add Product</button>


                </form>


            </div>

        </div>
    );
}

export default AddProductComponent;