import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";

function MainMenu(props) {
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
                <h1>Main Menu</h1>
                <div style={{ display: "grid" }}>
                    <Button variant="text">
                        <Link to="/skills">Manage Skills</Link>
                    </Button>
                    <Button variant="text">
                        <Link to="/projects">Manage Projects</Link>
                    </Button>
                    <Button variant="text">
                        <Link to="/experience">Manage Experiences</Link>
                    </Button>
                    {/* <Button variant="text">Manage Contacts</Button> */}
                </div>
            </Card>
        </div>
    );
}

export default MainMenu;
