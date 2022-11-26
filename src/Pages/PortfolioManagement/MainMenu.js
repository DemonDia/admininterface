import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../Authenticated";
import axios from "axios";
function MainMenu(props) {
    const navigate = useNavigate();
    const [enableImport, setEnableImport] = useState(false);
    const toggleImport = (importStatus) => {
        localStorage.setItem("enableImport", importStatus);
        setEnableImport(importStatus);
    };


    useEffect(() => {
        defaultAuthCheck(navigate);
        const savedEnableImport = JSON.parse(
            localStorage.getItem("enableImport")
        );
        console.log(savedEnableImport);
        if (savedEnableImport == null) {
            localStorage.setItem("enableImport", false);
            setEnableImport(false);
        }
        setEnableImport(savedEnableImport);
    }, []);
    const viewUploadedFile = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            const jsonChunk = JSON.parse(e.target.result);
            const experiences = jsonChunk.experience;
            const projects = jsonChunk.project;
            const skillsChunk = jsonChunk.skill;

            console.log(experiences);
            console.log(projects);
            console.log(skillsChunk);

            var skills = [];

            // clean the skills
            for (var year in skillsChunk) {
                for (var skill in skillsChunk[year]) {
                    var newSkill = {
                        name: skillsChunk[year][skill].name,
                        year_learnt: year,
                    };
                    skills.push(newSkill);
                }
            }

            axios
                .post(process.env.REACT_APP_BACKEND_API + "/import", {
                    skills: skills,
                    experiences: experiences,
                    projects: projects,
                })
                .then((res) => {
                    if (res.data.success) {
                        console.log(res);
                        console.log("Skills imported successfully");
                        alert("Imported");
                    } else {
                        alert("Import failed");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("Import failed");
                });
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
                <h1>Portfolio Menu</h1>
                <div style={{ display: "grid" }}>
                    <Button variant="text">
                        <Link to="/portfolio/skills">Manage Skills</Link>
                    </Button>
                    <Button variant="text">
                        <Link to="/portfolio/projects">Manage Projects</Link>
                    </Button>
                    <Button variant="text">
                        <Link to="/portfolio/experience">Manage Experiences</Link>
                    </Button>
                    <FormControlLabel
                        sx={{ margin: "auto" }}
                        control={
                            <Switch
                                checked={enableImport}
                                onChange={() => toggleImport(!enableImport)}
                                color="primary"
                            />
                        }
                        label="Allow import"
                    />

                    <Button
                        variant="filled"
                        component="label"
                        disabled={!enableImport}
                    >
                        <input
                            hidden="true"
                            type="file"
                            accept="json"
                            onChange={(e) => viewUploadedFile(e)}
                        />
                        Import
                    </Button>
                    <Button variant="text">
                        <Link to="/home">Back</Link>
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default MainMenu;
