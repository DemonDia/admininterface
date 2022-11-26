import React, { useState, useEffect } from "react";
import { Card, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {loginPageAuthCheck} from "../Authenticated"
function Login(props) {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const login = () =>{
        if(password == process.env.REACT_APP_ADMIN_PASS){         
            localStorage.setItem("loggedIn", true);   
            alert("Logged in!")
            navigate("/home");
            // redirect
        }
        else{
            alert("Incorrect password!")
        }
    }
    useEffect(()=>{
        loginPageAuthCheck(navigate)        
    },[])
    return (
        <div>
            <Card
                sx={{
                    maxWidth: "80%",
                    margin: "10px auto",
                    padding: "10px",
                    alignItems: "middle",
                }}
            >
                <h1>Login</h1>
                <TextField
                    id="outlined-basic"
                    label="Enter password"
                    variant="outlined"
                    type="password"
                    sx = {{width:"100%"}}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <Button variant="contained" sx={{margin:"10px auto", display:"block"}}
                onClick = {()=>{login()}}>Login</Button>

            </Card>
        </div>
    );
}

export default Login;
