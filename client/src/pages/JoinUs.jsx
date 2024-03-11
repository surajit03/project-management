import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


function JoinUs() {
    const [join, setJoin] = useState("signIn");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const { currentRole } = useSelector((state )=> state.user);


    const handleLogin = async (e,userRole) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("/auth/singIn", { email, password });
            dispatch(loginSuccess(res.data, userRole));
            console.log(res.data);
            navigate("/Navebar");
  console.log(currentRole);
        } catch (error) {
            dispatch(loginFailure());
        }
    };

    const handleSignup = async (e,userRole) => {
        e.preventDefault();

        dispatch(loginStart());
        try {
            const res = await axios.post("/auth/singUp", { name, email, password });
            dispatch(loginSuccess(res.data, userRole));
            console.log(res.data);
      navigate("/Navebar");
  console.log(currentRole);

           
        } catch (error) {
            dispatch(loginFailure());
        }
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow">
                {join === "signIn" ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ margin: "0.5rem" }}
                            ></input>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ margin: "0.5rem" }}
                            ></input>
                              <button
                                onClick={handleLogin}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Sign In
                            </button>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={handleShowPassword}
                                    className="mr-2"
                                />
                                <label>Show Password</label>
                            </div>
                          
                            <button
                                onClick={() => setJoin("signUp")}
                                className="text-blue-500 ml-2"
                            >
                                Switch to Sign Up
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                        <div className="space-y-4">
                            <input
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ margin: "0.5rem" }}
                            ></input>
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ margin: "0.5rem" }}
                            ></input>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ margin: "0.5rem" }}
                            ></input>
                            <button
                                onClick={handleSignup}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Sign Up
                            </button>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={handleShowPassword}
                                    className="mr-2"
                                />
                                <label>Show Password</label>
                            </div>
                        </div>
                        <button
                            onClick={() => setJoin("signIn")}
                            className="text-blue-500 ml-2"
                        >
                            Switch to Sign In
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default JoinUs;
