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

function DetailRow(props) {
    const [editing, isEditing] = useState(false);

    const [detailPoint, setDetailPoint] = useState(props.detail);
    const saveChanges = () => {
        props.saveChanges(detailPoint, props.index);
        isEditing(false);
    };
    return (
        <TableRow>
            {!editing ? (
                <>
                    {" "}
                    <TableCell>{props.detail}</TableCell>
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
                                props.deleteDetailPoint(props.detail);
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
                            label="Detail"
                            sx={{ width: "100%" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={detailPoint}
                            onChange={(e) => {
                                setDetailPoint(e.target.value);
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

export default DetailRow;
