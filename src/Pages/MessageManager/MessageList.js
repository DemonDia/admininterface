import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../Authenticated";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import MessageRow from "../../Components/MessageManagement/MessageRow";
function MessageList(props) {
    const baseURL = process.env.REACT_APP_MESSAGING_API;
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const getMessages = async () => {
        await axios.get(baseURL + "/messages").then((res) => {
            if (res.data.success) {
                setMessages(res.data.data);
            }
        });
    };

    useEffect(() => {
        defaultAuthCheck(navigate);
        getMessages();
    }, []);

    const updateMessageStatus = async (id, status) => {
        await axios
            .put(baseURL + `/messages/${id}`, {
                status: status,
            })
            .then(async (res) => {
                alert(res.data.message);
                await getMessages();
            })
            .catch((err) => {
                alert(err);
            });
    };

    const deleteMessage = async (id) => {
        await axios
            .delete(baseURL + `/messages/${id}`)
            .then(async (res) => {
                alert(res.data.message);
                await getMessages();
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div>
            <h1>Message List</h1>
            <Button>
                <Link to={"/home"}>Back</Link>
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Message Title</TableCell>
                            <TableCell align="left">Message Date</TableCell>
                            <TableCell align="left">Message Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messages.map((message) => {
                            return (
                                <MessageRow
                                    message={message}
                                    deleteFunction={deleteMessage}
                                    updateFunction={updateMessageStatus}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default MessageList;
