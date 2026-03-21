import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const MakePayment = () => {
    const { product } = useLocation().state || {}
    console.log(product)
    const img_url = "https://aswanibrillyan.alwaysdata.net/static/images/"
    let [phone, setPhone] = useState("")
    let [error, setError] = useState("")
    let [success, setSuccess] = useState("")
    let [loading, setLoading] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();


        setError('')
        setSuccess('')
        setLoading("please wait...")

        try {
            const data = new FormData();
            data.append('amount', product.product_cost)
            data.append('phone', phone)


            const response = await axios.post('https://aswanibrillyan.alwaysdata.net/api/mpesa_payment', data)
            console.log(response)
            if (response.status === 200) {
                setLoading('')
                setSuccess(response.data.message);

                setPhone('')
            }
        } catch (error) {
            setLoading('')
            setError(error.message)

        }
    }







    return (
        <div className="row justify-content-center mt-4 text-light">
            <h2>LIPA NA MPESA</h2>
            <div className="col-md-3">
                <img src={img_url + product.product_image} alt="" className="rounded img-thumbnail" />
            </div>

            <div className="col-md-3 p-4">
                <h2 className="text-dark">{product.product_name}</h2>
                <h4 className="text-primary">{product.product_category}</h4>
                <p className="text-warning">{product.product_description} </p>
                <h4 className="text-warning">{product.product_cost}</h4>

                <hr />
                <h6 className="text-warning">{loading}</h6>
                <h6 className="text-danger">{error}</h6>
                <h6 className="text-success">{success}</h6>




                <form action="" onSubmit={handleSubmit} >
                    <input type="number"
                        readOnly
                        placeholder="Enter amount"
                        className="form-control "
                        value={product.product_cost}
                    />

                    <br />

                    <input type="tel"
                        required
                        placeholder="enter Mpesa Number +254 xxxxxxxxx"

                        className="form-control text-dark"
                        onChange={(e) => { setPhone(e.target.value) }}
                        value={phone}

                    />

                    <button className="btn form-container text-warning ">Pay now</button>

                </form>
            </div>

        </div>
    );
}

export default MakePayment;