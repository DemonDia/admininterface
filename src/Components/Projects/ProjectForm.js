import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
function ProjectForm(props) {
    const baseURL = process.env.REACT_APP_BACKEND_API;
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState("");
    const [projectYear, setProjectYear] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [projectImgLink, setProjectImgLink] = useState("");
    const [projectTechStacks, setProjectTechStacks] = useState([]);
    const [projectLinks, setProjectLinks] = useState([]);

    // ========================other functions========================
    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(" ")
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
    };

    // ============add============

    const addProject = async () => {
        await axios
            .post(baseURL + "/projects", {
                name: toTitleCase(projectName),
                year: projectYear,
                desc: projectDesc,
                imageLink: projectImgLink,
            })
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    alert("Adding successful");
                    navigate("/projects");
                } else {
                    alert("Adding unsuccessful");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Adding unsuccessful");
            });
    };
    return (
        <Card sx={{ width: "50%", margin: "auto" }}>
            <CardContent>
                {!props.experience ? (
                    <h3>Add New Project</h3>
                ) : (
                    <h3>Update Project</h3>
                )}

                <TextField
                    id="outlined-basic"
                    label="Project Name"
                    variant="outlined"
                    value={projectName}
                    onChange={(e) => {
                        setProjectName(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                />

                <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    multiline
                    minRows={2}
                    value={projectDesc}
                    onChange={(e) => {
                        setProjectDesc(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                />
                <TextField
                    type="number"
                    label="Project Year"
                    sx={{ width: "100%" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ maxLength: 4 }}
                    value={projectYear}
                    onChange={(e) => {
                        setProjectYear(e.target.value);
                    }}
                />

                <TextField
                    id="outlined-basic"
                    label="Image Link"
                    variant="outlined"
                    value={projectImgLink}
                    onChange={(e) => {
                        setProjectImgLink(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                />

                {!props.projects ? (
                    <Button
                        onClick={() => {
                            addProject();
                        }}
                    >
                        Add
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            // updateProject();
                        }}
                    >
                        Save
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

export default ProjectForm;
