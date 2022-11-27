import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import TechStackRow from "./TechStackRow";
import ProjectLinkRow from "./ProjectLinkRow";
function ProjectForm(props) {
    const baseURL = process.env.REACT_APP_BACKEND_API;
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState("");
    const [projectYear, setProjectYear] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [projectImgLink, setProjectImgLink] = useState("");
    const [projectTechStacks, setProjectTechStacks] = useState([]);
    const [projectLinks, setProjectLinks] = useState([]);

    const [techStackName, setTechStackName] = useState("");

    const [projectLinkURL, setProjectLinkURL] = useState("");
    const [projectLinkName, setProjectLinkName] = useState("");

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

    // ===========add link ===========
    const addProjectLink = () => {
        const titleCaseProjectLinkName = toTitleCase(projectLinkName);
        const findDuplicates = projectLinks.filter((projectLink) => {
            return projectLink.name == titleCaseProjectLinkName;
        });
        console.log(findDuplicates);
        if (findDuplicates.length > 0) {
            alert("Duplicate found");
        } else if (titleCaseProjectLinkName == "") {
            alert("Link name cannot be empty");
        } else {
            projectLinks.push({
                name: titleCaseProjectLinkName,
                url: projectLinkURL,
            });
            setProjectLinks(projectLinks);
            setProjectLinkURL("");
            setProjectLinkName("");
        }
    };
    // ===========update project ===========
    const updateProjectLink = (projectLinkName,projectLinkURL,index) =>{
        if(projectLinkName!= "" && projectLinkURL!=""){
            projectLinks[index].name = projectLinkName;
            projectLinks[index].url = projectLinkURL;
        }

    }

    // ===========delete link ===========
    const deleteProjectLink = (currProjectLink) => {
        const newProjectLinks = projectLinks.filter((projectLink) => {
            return !(
                projectLink.name == currProjectLink.name &&
                projectLink.url == currProjectLink.url
            );
        });
        setProjectLinks(newProjectLinks);
    };

    // ============add tech stack============
    const addTechStack = () => {
        const titleCaseTechStack = toTitleCase(techStackName);

        if (projectTechStacks.includes(titleCaseTechStack)) {
            alert("It exists");
        } else if (titleCaseTechStack == "") {
            alert("Tech Stack cannot be empty");
        } else {
            projectTechStacks.push(titleCaseTechStack);
            setProjectTechStacks(projectTechStacks);
            setTechStackName("");
        }
        console.log(projectTechStacks);
    };
    // ============update tech stack============
    const updateTechStack = (newVal, index) => {
        if (newVal != "") {
            projectTechStacks[index] = newVal;
        }
    };

    // ============delete tech stack============
    const deleteTechStack = (currentTechStack) => {
        const techStacks = projectTechStacks.filter((tech_stack) => {
            return tech_stack != currentTechStack;
        });
        setProjectTechStacks(techStacks);
    };

    // ===========add project============
    const addProject = async () => {
        await axios
            .post(baseURL + "/projects", {
                name: toTitleCase(projectName),
                year: projectYear,
                desc: projectDesc,
                image: projectImgLink,
                tech_stack: projectTechStacks,
                links: projectLinks,
            })
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    alert("Adding successful");
                    navigate("/portfolio/projects");
                } else {
                    alert("Adding unsuccessful");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Adding unsuccessful");
            });
    };

    // ===========update project============
    const updateProject = async () => {
        await axios
            .put(baseURL + "/projects", {
                project_Id: props.project._id,
                name: toTitleCase(projectName),
                year: projectYear,
                desc: projectDesc,
                image: projectImgLink,
                tech_stack: projectTechStacks,
                links: projectLinks,
            })
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    alert("Updating successful");
                    navigate("/portfolio/projects");
                } else {
                    alert("Updating unsuccessful");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Updating unsuccessful");
            });
    };

    useEffect(() => {
        if (props.project) {
            setProjectName(props.project.name);
            setProjectDesc(props.project.desc);
            setProjectYear(props.project.year);
            setProjectImgLink(props.project.image);
            setProjectTechStacks(props.project.tech_stack);
            setProjectLinks(props.project.links);
        }
    }, []);
    return (
        <Card sx={{ width: "60%", margin: "auto" }}>
            <CardContent>
                {!props.project ? (
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
                <TableContainer component={Paper}>
                    <Table sx={{ width: "100%" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={3}>
                                    <h3>Tech Stacks</h3>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">
                                    Tech Stack Name
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        label="Tech Stack Name"
                                        sx={{ width: "100%" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={techStackName}
                                        onChange={(e) => {
                                            setTechStackName(e.target.value);
                                        }}
                                    />
                                </TableCell>
                                <TableCell colSpan={2} align={"center"}>
                                    <Button
                                        onClick={() => {
                                            addTechStack();
                                        }}
                                    >
                                        Add
                                    </Button>
                                </TableCell>
                            </TableRow>
                            {projectTechStacks.map((tech_stack, index) => {
                                return (
                                    <TechStackRow
                                        tech_stack={tech_stack}
                                        index={index}
                                        saveChanges={updateTechStack}
                                        deleteTechStack = {deleteTechStack}
                                    />
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer component={Paper}>
                    <Table sx={{ width: "100%" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={4}>
                                    <h3>Project Links</h3>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Link Name</TableCell>
                                <TableCell align="center">URL</TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        label="Link Name"
                                        sx={{ width: "100%" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={projectLinkName}
                                        onChange={(e) => {
                                            setProjectLinkName(e.target.value);
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="URL Name"
                                        sx={{ width: "100%" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={projectLinkURL}
                                        onChange={(e) => {
                                            setProjectLinkURL(e.target.value);
                                        }}
                                    />
                                </TableCell>
                                <TableCell colSpan={2} align={"center"}>
                                    <Button
                                        onClick={() => {
                                            addProjectLink();
                                        }}
                                    >
                                        Add
                                    </Button>
                                </TableCell>
                            </TableRow>
                            {projectLinks.map((projectLink,index) => {
                                return (
                                    <ProjectLinkRow projectLink = {projectLink}
                                    index = {index}
                                    saveChanges = {updateProjectLink}
                                    deleteProjectLink = {deleteProjectLink}/>
                                    // <TableRow>
                                    //     <TableCell>
                                    //         {projectLink.name}
                                    //     </TableCell>
                                    //     <TableCell>
                                    //         <a
                                    //             target="_blank"
                                    //             href={projectLink.url}
                                    //         >
                                    //             {projectLink.url}
                                    //         </a>
                                    //     </TableCell>
                                    //     <TableCell align={"center"}>
                                    //         <Link
                                    //             onClick={() => {
                                    //                 deleteProjectLink(
                                    //                     projectLink
                                    //                 );
                                    //             }}
                                    //         >
                                    //             <DeleteForeverOutlinedIcon />
                                    //         </Link>
                                    //     </TableCell>
                                    // </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {!props.project ? (
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
                            updateProject();
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
