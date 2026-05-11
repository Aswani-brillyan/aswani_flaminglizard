import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, [navigate]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + Number(item.product_cost) * item.quantity,
      0
    );
    setTotal(newTotal);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (productId, delta) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.product_id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCartItems((current) => current.filter((item) => item.product_id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    setSuccess("Cart cleared.");
    setError("");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setError("Add at least one product to the cart before checkout.");
      setSuccess("");
      return;
    }

    navigate("/makepayment", { state: { cart: cartItems } });
  };

  return (
    <div className="row justify-content-center mt-4 text-light">
      
      <div className="col-md-10 card shadow p-4">
        <h2>Shopping Cart</h2>
        <h6 className="text-warning">{loading}</h6>
        <h6 className="text-danger">{error}</h6>
        <h6 className="text-success">{success}</h6>

        {cartItems.length === 0 ? (
          <p>Your cart is empty. Add products from the menu to continue.</p>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.product_id}>
                      <td>{item.product_name}</td>
                      <td>{item.product_category}</td>
                      <td>{item.product_cost}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-secondary me-2"
                            type="button"
                            onClick={() => updateQuantity(item.product_id, -1)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-secondary ms-2"
                            type="button"
                            onClick={() => updateQuantity(item.product_id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{Number(item.product_cost) * item.quantity}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          type="button"
                          onClick={() => removeItem(item.product_id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                <button className="btn btn-outline-danger me-2" onClick={clearCart} type="button">
                  Clear Cart
                </button>
                <button className="btn btn-warning" onClick={handleCheckout} type="button">
                  Checkout All Items
                </button>
              </div>
              <div>
                <h4>Total: KES {total}</h4>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;


