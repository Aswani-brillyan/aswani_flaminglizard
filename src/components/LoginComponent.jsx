import axios from "axios";
import { useState } from "react";
import { Link, Links, useNavigate } from "react-router-dom";

const LoginComponent = () => {
    let [email, updateEmail] = useState('')
    let [password, updatePassword] = useState('')
    let [loading, setLoading] = useState('')
    let [error, setError] = useState('')
    let [success, setSuccess] = useState('')
    //creat varaible for use anvigate

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        setLoading('please wait...')
        setSuccess('')

        //try send data to the server

        try {
            //create form data
            const user_data = new FormData();
            user_data.append('email', email)
            user_data.append('password', password)

            const response = await axios.post('http://aswanibrillyan.alwaysdata.net/api/signin', user_data)
            console.log(response)

            if (response.status === 200) {
                if (response.data.user) {
                   
                    setSuccess(response.data.message)
                    navigate('/')

                }

            }



            //notify



        } catch (error) {
            console.log(error)
            setError(error.message)
            setLoading('')
        }

    }


    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Login:</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                <form onSubmit={handleSubmit} className="form-container">

                    <input
                        type="email"
                        placeholder="User email"
                        className="form-control"
                        required
                        onChange={(e) => { updateEmail(e.target.value) }}
                        value={email}
                    /><br /><br />
                    <input type="password"
                        placeholder="password"
                        className="form-control"
                        required
                        onChange={(e) => { updatePassword(e.target.value) }}
                        value={password}

                    />

                    <br /><br />
                    <button className="btn btn-dark">Login</button><br /><br />
                    <Link to='/signup'>Don't have an account</Link>
                </form>


            </div>


        </div>
    );
}

export default LoginComponent;