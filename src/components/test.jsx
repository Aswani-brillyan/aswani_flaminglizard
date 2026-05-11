import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const MakePayment = () => {
    const { product, cart } = useLocation().state || {};
    const navigate = useNavigate();
    const isBulkOrder = !!cart && cart.length > 0;
    const items = isBulkOrder ? cart : (product ? [product] : []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) {
            navigate("/login", { replace: true });
            return;
        }

        if (!product && !cart) {
            navigate("/", { replace: true });
        }
    }, [navigate, product, cart]);

    const img_url = "https://aswanibrillyan.alwaysdata.net/static/images/";
    let [phone, setPhone] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");
    let [loading, setLoading] = useState('')

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + (Number(item.product_cost) * (item.quantity || 1)), 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading("please wait...");

        if (!product?.product_id) {
            setError("Product not found. Please return to the product list.");
            setLoading('');
            return;
        }

        try {
            const data = new FormData();
            
            if (isBulkOrder) {
                data.append('items', JSON.stringify(cart.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity || 1
                }))));
            } else {
                data.append('product_id', product.product_id);
            }
            
            data.append('phone', phone);

            const response = await axios.post('https://aswanibrillyan.alwaysdata.net/api/mpesa_payment', data);
            console.log(response);
            if (response.status === 200) {
                setLoading('');
                setSuccess(response.data.message);
                setPhone('');
                if (isBulkOrder) {
                    localStorage.removeItem('cart');
                }
            }
        } catch (error) {
            setLoading('');
            setError(error.message);
        }
    }







    return (
        <div className="row justify-content-center mt-4 text-light">
            <Navbar />
            <h2>{isBulkOrder ? "Order Summary" : "LIPA NA MPESA"}</h2>
            
            {isBulkOrder ? (
                <div className="col-md-8 card shadow p-4">
                    <h4>Items in Order</h4>
                    <div className="table-responsive">
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.product_id}>
                                        <td>{item.product_name}</td>
                                        <td>{item.product_cost}</td>
                                        <td>{item.quantity || 1}</td>
                                        <td>{Number(item.product_cost) * (item.quantity || 1)}</td>
                                    </tr>
                                ))}
                                <tr className="table-warning">
                                    <td colSpan="3"><strong>Total</strong></td>
                                    <td><strong>KES {calculateTotal()}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <hr />
                    <h6 className="text-warning">{loading}</h6>
                    <h6 className="text-danger">{error}</h6>
                    <h6 className="text-success">{success}</h6>

                    <form action="" onSubmit={handleSubmit}>
                        <input type="tel"
                            required
                            placeholder="enter Mpesa Number +254 xxxxxxxxx"
                            className="form-control text-dark"
                            onChange={(e) => { setPhone(e.target.value) }}
                            value={phone}
                        />
                        <br />
                        <button className="btn btn-warning">Proceed to Payment</button>
                    </form>
                </div>
            ) : (
                <>
                    <div className="col-md-3">
                        <img src={img_url + product?.product_image} alt="" className="rounded img-thumbnail" />
                    </div>

                    <div className="col-md-3 p-4">
                        <h2 className="text-dark">{product?.product_name}</h2>
                        <h4 className="text-primary">{product?.product_category}</h4>
                        <p className="text-warning">{product?.product_description} </p>
                        <h4 className="text-warning">{product?.product_cost}</h4>

                        <hr />
                        <h6 className="text-warning">{loading}</h6>
                        <h6 className="text-danger">{error}</h6>
                        <h6 className="text-success">{success}</h6>

                        <form action="" onSubmit={handleSubmit} >
                            <input type="hidden" value={product?.product_id || ""} />
                            <input type="number"
                                readOnly
                                placeholder="Product_Id"
                                className="form-control "
                                value={product?.product_id || ""}
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
                </>
            )}
        </div>
    );
}

export default MakePayment

