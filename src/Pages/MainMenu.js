import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";

import axios from "axios";
function MainMenu(props) {
    const viewUploadedFile = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            const jsonChunk = JSON.parse(e.target.result)
            const experiences = jsonChunk.experience
            const projects = jsonChunk.project
            const skills = jsonChunk.skill

            console.log(experiences)
            console.log(projects)
            console.log(skills)
            // upload the experiences, project into json
        };
    };

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
                    <Button variant="text" component="label">
                        <input
                            type="file"
                            accept="json"
                            onChange={(e) => viewUploadedFile(e)}
                        />
                    </Button>

                    <Button variant="filled" component="label">
                        Import
                    </Button>
                    {/* <Button variant="text">Manage Contacts</Button> */}
                </div>
            </Card>
        </div>
    );
}

export default MainMenu;
