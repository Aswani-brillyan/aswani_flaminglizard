import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const SignUpCompenent = () => {

    let [username, updateUsername] = useState('');
    let [email, updateEmail] = useState('');
    let [phone, updatePhone] = useState('');
    let [password, updatePassword] = useState('');

    let [loading, setLoading] = useState('')

    let [error, setError] = useState('')

    let [success, setSuccess] = useState('')


    const handleSubmit = async (e) => {
        //prevent default behavoir

        e.preventDefault();
        console.log(e)
        //notify user to wait
        setError('');
        setLoading("Submitting data PLease wait...")


        //confirm user input
        console.log(username, email, phone, password)

        //try send data to server

        try {
            //creat form data
            const user_data =new FormData()
            user_data.append("username", username);

            user_data.append("email", email);
            user_data.append("phone", phone);
            user_data.append("password", password);



            //use axios to send data to server
            const response = await axios.post('https://aswanibrillyan.alwaysdata.net/api/signup', user_data)

            console.log(response)
            if (response.status ===200) {
                setSuccess(response.data.message)
                setLoading('')
                updateUsername('')
                updateEmail('')
                updatePassword('')
                updatePhone('')
            }

        } catch (error) {
            console.log(error)
            setError(error.message)
            setLoading('');

        }



    };









    return (
        <div className="row justify-content-center mt-4">
            <Navbar />
            <div className="col-md-6 card shadow p-4 ">
                <h2>SignUp</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                <form className="form-container" onSubmit={handleSubmit}>



                    <label htmlFor=""></label>
                    <input type="text"
                        placeholder="Your Name"
                        className="form-control"
                        id=""
                        required
                        onChange={(e) => { updateUsername(e.target.value) }}

                        value={username}

                    ></input><br /><br />
                    <label htmlFor=""></label><input type="email"
                        placeholder="Email"
                        className="form-control"
                        id=""
                        required
                        onChange={(e) => { updateEmail(e.target.value) }}

                        value={email}
                    ></input><br /><br />
                    <label htmlFor=""></label><input
                        type="password"
                        placeholder="password"
                        className="form-control"
                        id=""
                        required
                        onChange={(e) => { updatePassword(e.target.value) }}

                        value={password}
                    ></input><br /><br />
                    {/* -      */}

                    <label htmlFor=""></label><input
                        type="tel"
                        placeholder="Phone Number"
                        className="form-control"
                        id=""
                        required
                        onChange={(e) => { updatePhone(e.target.value) }}

                        value={phone}
                    ></input><br /><br />


                    <button className="btn btn-dark">Sign up</button>




                    <Link to='/login'>Already have an account</Link>
                </form>
            </div>


        </div>
    );
}

export default SignUpCompenent;