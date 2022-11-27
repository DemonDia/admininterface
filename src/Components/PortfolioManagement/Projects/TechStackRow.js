import React, { useState, useEffect } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import TableCell from "@mui/material/TableCell";
import { TableRow } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import CancelIcon from "@mui/icons-material/Cancel";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

function TechStackRow(props) {
    // props: edit tech stack function, delete tech stack function, tech stack info + index
    const [editing, isEditing] = useState(false);
    const [techStackName, setTechStackName] = useState(props.tech_stack);
    const saveChanges = () => {
        props.saveChanges(techStackName, props.index);
        isEditing(false);
    };
    return (
        <TableRow>
            {!editing ? (
                <>
                    {" "}
                    <TableCell>{props.tech_stack}</TableCell>
                    <TableCell align={"center"}>
                        <Link
                            onClick={() => {
                                isEditing(true);
                            }}
                        >
                            <EditOutlinedIcon />
                        </Link>
                    </TableCell>
                    <TableCell align={"center"}>
                        <Link
                            onClick={() => {
                                props.deleteTechStack(props.tech_stack);
                            }}
                        >
                            <DeleteForeverOutlinedIcon />
                        </Link>
                    </TableCell>
                </>
            ) : (
                <>
                    {" "}
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
                    <TableCell align={"center"}>
                        <Link
                            onClick={() => {
                                saveChanges();
                            }}
                        >
                            <SaveIcon />
                        </Link>
                    </TableCell>
                    <TableCell align={"center"}>
                        <Link
                            onClick={() => {
                                isEditing(false);
                            }}
                        >
                            <CancelIcon />
                        </Link>
                    </TableCell>
                </>
            )}
        </TableRow>
    );
}

export default TechStackRow;
