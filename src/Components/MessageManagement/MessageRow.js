import React, { useState } from "react";
import { Link } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TextField, MenuItem,Box,Modal,Typography } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function MessageRow(props) {
    // const [status, setStatus] = useState(props.message.message_status);
    const statusList = ["Pending", "Accepted", "Rejected"];
    const changeMessageStatus = async (newStatus) => {
        await props.updateFunction(props.message.message_id, newStatus);
    };

    const deleteCurrentMessage = async () => {
        await props.deleteFunction(props.message.message_id);
    };
    
    return (
        <>
            <TableRow
                key={props.message.message_id}
                onClick={() => props.openModal(props.message)}
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0,
                    },
                }}
            >
                <TableCell component="th" scope="row" align="left">
                    {props.message.message_title}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                    {props.message.message_date}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                    <TextField
                        value={props.message.message_status}
                        label="Status"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => {
                            changeMessageStatus(e.target.value);
                        }}
                        sx={{ width: "50%" }}
                        select
                    >
                        {statusList.map((label, value) => {
                            return <MenuItem value={value}>{label}</MenuItem>;
                        })}
                    </TextField>
                </TableCell>
                <TableCell align="center">
                    <Link
                        onClick={() => {
                            deleteCurrentMessage();
                        }}
                    >
                        <DeleteForeverOutlinedIcon />
                    </Link>
                </TableCell>
            </TableRow>
        </>
    );
}

export default MessageRow;
