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
function ProjectLinkRow(props) {
    const [editing, isEditing] = useState(false);

    const [projectLinkURL, setProjectLinkURL] = useState(props.projectLink.url);
    const [projectLinkName, setProjectLinkName] = useState(
        props.projectLink.name
    );

    const saveChanges = () => {
        props.saveChanges( projectLinkName, projectLinkURL, props.index);
        isEditing(false);
    };
    return (
        <TableRow>
            {!editing ? (
                <>
                    {" "}
                    <TableCell>{props.projectLink.name}</TableCell>
                    <TableCell>
                        <a target="_blank" href={props.projectLink.url}>
                            {props.projectLink.url}
                        </a>
                    </TableCell>
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
                                props.deleteProjectLink(props.projectLink);
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

export default ProjectLinkRow;
