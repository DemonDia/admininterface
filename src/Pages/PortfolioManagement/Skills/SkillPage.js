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
function SkillPage() {
    var baseURL = process.env.REACT_APP_BACKEND_API;
    var navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const getSkills = async () => {
        await axios.get(baseURL + "/skills").then((res) => {
            console.log(res);
            if (res.data.success) {
                setSkills(res.data.data);
            }
        });
    };

    const deleteSkill = async (skillId) => {
        await axios
            .delete(baseURL + `/skills/${skillId}`)
            .then(async (res) => {
                console.log(res);
                if (res.data.success) {
                    alert("Skill deleted!");
                    await getSkills();
                } else {
                    alert("Failed to delete skill!");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to delete skill");
            });
    };

    const deleteAllSkills = async () => {
        console.log("clicked");
        var deleteKey = prompt(
            "Are you sure you want to delete?(Type 'yes' to delete all)"
        );
        if (deleteKey == "yes") {
            await axios
                .delete(baseURL + "/skills/")
                .then(async (res) => {
                    if (res.data.success) {
                        alert("Reset successfully");
                        await getSkills();
                    } else {
                        alert("Failed to reset");
                    }
                })
                .catch((err) => {
                    alert("Skills reset unsuccessfully");
                });
        }
    };

    useEffect(() => {
        defaultAuthCheck(navigate);
        getSkills();
    }, []);
    return (
        <div style={{ margin: "10px" }}>
            <h1>Skill Page</h1>
            <Button>
                <Link to={"/portfolio"}>Back</Link>
            </Button>
            <Button>
                <Link to={"/portfolio/skills/add"}>Add Skill</Link>
            </Button>
            <Button>
                <Link
                    onClick={() => {
                        deleteAllSkills();
                    }}
                >
                    Empty skill records
                </Link>
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Skill Name</TableCell>
                            <TableCell align="center">Skill Year</TableCell>
                            <TableCell align="center" colSpan={2}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {skills.map((skill) => (
                            <TableRow
                                key={skill._id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {skill.name}
                                </TableCell>
                                <TableCell align="left">
                                    {skill.year_learnt}
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`/portfolio/skills/${skill._id}`}>
                                        <EditOutlinedIcon />
                                    </Link>
                                </TableCell>
                                <TableCell
                                    align="center"
                                    onClick={() => {
                                        deleteSkill(skill._id);
                                    }}
                                >
                                    <Link>
                                        <DeleteForeverOutlinedIcon />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        {skills.length == 0 ? (
                            <TableRow>
                                <TableCell align="center" colSpan={4}>
                                    No skills to show
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

export default SkillPage;
