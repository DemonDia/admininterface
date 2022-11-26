import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../Authenticated";
function HomeMenu(props) {
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.setItem("loggedIn", false);
        alert("Logged out")
        navigate("/login");
    };

    useEffect(() => {
        defaultAuthCheck(navigate);
    });
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
                <h1>Welcome, where would you like to go?</h1>
                <div style={{ display: "grid" }}>
                    <Button variant="text">
                        <Link to="/portfolio">Portfolio Management</Link>
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => {
                            logoutUser();
                        }}
                    >
                        <Link>Logout</Link>
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default HomeMenu;
