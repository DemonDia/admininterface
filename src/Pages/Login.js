import React, { useState, useEffect } from "react";
import { Card, TextField, Button } from "@mui/material";
function Login(props) {
    const [password, setPassword] = useState("");
    const login = () =>{
        if(password == process.env.REACT_APP_ADMIN_PASS){            
            alert("Logged in!")
            // redirect
        }
        else{
            alert("Incorrect password!")
        }
    }
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
