import axios from "axios";
import { useState } from "react";
import { REGISTER, baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading";
import Cookie from 'cookie-universal';
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export default function Register() {
    //states
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passConfirm: "",
    });
    const navigate = useNavigate();

   //Err
   const [err, setErr] = useState("");
   
     //loading
     const [loading, setLoading] = useState(false);
     // Cookie
     const cookie = Cookie();

    //Handle form Change
    function handleFormChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });

    }

    //Handle Submit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${baseURL}/${REGISTER}`, form);
            const token = res.data.token;
            setLoading(false);
            cookie.set("e-commerce", token);
            navigate("/dashboard/users", {replace: true});
        } catch (err) {
            // console.log(err);
            setLoading(false);
            if (err.response.status === 422) {
                setErr("Email is aleardy been taken");
            } else {
                setErr("Internal Server ERR");
            }
        }
    }

    return (
        <>
            {loading && <Loading></Loading>}
            <div className="container">
                <div className="row" style={{height: "100vh"}}>
                    <Form onSubmit={handleSubmit} className="form">
                        <div className="custom-form">
                            <h1 className="mb-5">Register Now</h1>
                            <Form.Group className="form-custom">
                                <Form.Control name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleFormChange} placeholder="Enter Your Name...." required />
                                <Form.Label>Name</Form.Label>
                            </Form.Group>

                            <Form.Group className="form-custom">
                                <Form.Control value={form.email}
                                    onChange={handleFormChange}
                                    name="email"
                                    type="email" placeholder="Enter Your email" required />
                                <Form.Label>Email</Form.Label>
                            </Form.Group>

                            <Form.Group className="form-custom">
                                <Form.Control value={form.password}
                                    name="password"
                                    onChange={handleFormChange} type="password" placeholder="Enter Your password...." minLength="6" required />
                                <Form.Label>Password</Form.Label>
                            </Form.Group>

                            <Form.Group className="form-custom">
                                <Form.Control
                                    type="password"
                                    name="passConfirm"
                                    value={form.passConfirm}
                                    onChange={handleFormChange}
                                    placeholder="passwordConfirmation.."
                                    minLength="6"
                                    required />
                                <Form.Label> Password Confirmation</Form.Label>
                            </Form.Group>
                            <button className="btn btn-primary">Register</button>
                            <div className="google-btn">
                                <a href={`http://127.0.0.1:8000/login-google`}>
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon" src="https://th.bing.com/th/id/OIP.734GRokuA276V_xdyc8HiQHaHa?rs=1&pid=ImgDetMain" alt="sign in with google"></img>
                                    </div>
                                    <p className="btn-text">
                                        <b>Sign in with google</b>
                                    </p>
                                </a>
                            </div>
                            {err !== "" && <span className="error">{err}</span>}
                        </div>
                    </Form>
                </div >
            </div >
        </>
    );
}
