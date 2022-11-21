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
function ExperiencePage() {
    var baseURL = process.env.REACT_APP_BACKEND_API;
    const [experiences, setExperience] = useState([]);
    const getExperience = async () => {
        await axios.get(baseURL + "/experiences").then((res) => {
            console.log(res);
            if (res.data.success) {
                setExperience(res.data.data);
            }
        });
    };

    const deleteExperience = async (experienceId) => {
        await axios
            .delete(baseURL + `/experiences/${experienceId}`)
            .then(async (res) => {
                console.log(res);
                if (res.data.success) {
                    alert("Experience deleted!");
                    await getExperience();
                } else {
                    alert("Failed to delete experience!");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to delete experience");
            });
    };

    const deleteAllExperiences = async () => {
        var deleteKey = prompt(
            "Are you sure you want to delete?(Type 'yes' to delete all)"
        );
        if (deleteKey == "yes") {
            await axios
                .delete(baseURL + "/experiences/")
                .then(async (res) => {
                    if (res.data.success) {
                        alert("Reset successfully");
                        await getExperience();
                    } else {
                        alert("Failed to reset");
                    }
                })
                .catch((err) => {
                    alert("Experiences reset unsuccessfully");
                });
        }
    };

    useEffect(() => {
        getExperience();
    }, []);
    return (
        <div style={{ margin: "10px" }}>
            <h1>Experience Page</h1>
            <Button>
                <Link to={"/"}>Home</Link>
            </Button>
            <Button>
                <Link to={"/experience/add"}>Add Experience</Link>
            </Button>

            <Button>
                <Link
                    onClick={() => {
                        deleteAllExperiences();
                    }}
                >
                    Empty experience records
                </Link>
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Company Name</TableCell>
                            <TableCell align="center">Start Date</TableCell>
                            <TableCell align="center">End Date</TableCell>
                            <TableCell align="center">Role Name</TableCell>
                            <TableCell align="center" colSpan={2}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {experiences.map((experience) => (
                            <TableRow
                                key={experience._id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {experience.company_name}
                                </TableCell>
                                <TableCell align="left">
                                    {experience.starting}
                                </TableCell>
                                <TableCell align="left">
                                    {experience.starting}
                                </TableCell>
                                <TableCell align="left">
                                    {experience.title}
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`/experience/${experience._id}`}>
                                        <EditOutlinedIcon />
                                    </Link>
                                </TableCell>
                                <TableCell
                                    align="center"
                                    onClick={() => {
                                        deleteExperience(experience._id);
                                    }}
                                >
                                    <Link>
                                        <DeleteForeverOutlinedIcon />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        {experiences.length == 0 ? (
                            <TableRow>
                                <TableCell align="center" colSpan={7}>
                                    No experiences to show
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

export default ExperiencePage;
