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

function SkillPage(props) {
    var baseURL = process.env.REACT_APP_BACKEND_API;
    const [skills, setSkills] = useState([]);
    const getSkills = async () => {
        await axios.get(baseURL + "/skills").then((res) => {
            console.log(res);
            if (res.data.success) {
                setSkills(res.data.data);
            }
        });
    };
    useEffect(() => {
        // console.log(env.BACKEND_API)
        // baseURL = env.BACKEND_API;
        getSkills();
    }, []);
    return (
        <div style={{ margin: "10px" }}>
            <h1>Skill Page</h1>
            <Button>
                <Link to={"/skills/add"}>Add Skill</Link>
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
                                    <Link to={`/skills/${skill._id}`}>
                                        <EditOutlinedIcon />
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    <DeleteForeverOutlinedIcon />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default SkillPage;
