import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../../Authenticated";
function ProjectPage() {
    var baseURL = process.env.REACT_APP_BACKEND_API;
    var navigate = useNavigate()
    const [projects, setProjects] = useState([]);
    const getProjects = async () => {
        await axios.get(baseURL + "/projects").then((res) => {
            if (res.data.success) {
                setProjects(res.data.data);
            }
        });
    };

    const deleteAllProjects = async () => {
        var deleteKey = prompt("Are you sure you want to delete?(Type 'yes' to delete all)")
        if(deleteKey =='yes'){
            await axios
            .delete(baseURL + "/projects/")
            .then(async (res) => {
                if (res.data.success) {
                    alert("Reset successfully");
                    await getProjects();
                }
                else{
                    alert("Failed to reset")
                }
            })
            .catch((err) => {
                alert("Projects reset unsuccessfully");
            });
        }
    };

    const deleteProject = async (projectId) => {
        await axios
            .delete(baseURL + `/projects/${projectId}`)
            .then(async (res) => {
                if (res.data.success) {
                    alert("Project deleted!");
                    await getProjects();
                } else {
                    alert("Failed to delete project!");
                }
            })
            .catch((err) => {
                alert("Failed to delete project");
            });
    };

    useEffect(() => {
        defaultAuthCheck(navigate)
        getProjects();
    }, []);
    return (
        <div style={{ margin: "10px" }}>
            <h1>Project Page</h1>
            <Button>
                <Link to={"/portfolio"}>Back</Link>
            </Button>
            <Button>
                <Link to={"/portfolio/projects/add"}>Add Project</Link>
            </Button>
            <Button>
                <Link
                    onClick={() => {
                        deleteAllProjects();
                    }}
                >
                    Empty project records
                </Link>
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Project Name</TableCell>
                            <TableCell align="center">Project Year</TableCell>
                            <TableCell align="center" colSpan={2}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow
                                key={project._id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {project.name}
                                </TableCell>
                                <TableCell align="left">
                                    {project.year}
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`/portfolio/projects/${project._id}`}>
                                        <EditOutlinedIcon />
                                    </Link>
                                </TableCell>
                                <TableCell
                                    align="center"
                                    onClick={() => {
                                        deleteProject(project._id);
                                    }}
                                >
                                    <Link>
                                        <DeleteForeverOutlinedIcon />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        {projects.length == 0 ? (
                            <TableRow>
                                <TableCell align="center" colSpan={4}>
                                    No projects to show
                                </TableCell>
                            </TableRow>
                        ) : (
                            <></>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ProjectPage;
