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

import { TextField, MenuItem, Box, Modal, Typography } from "@mui/material";

import MessageRow from "../../Components/MessageManagement/MessageRow";
function MessageList(props) {
    const statusList = ["Pending", "Accepted", "Rejected"];
    const baseURL = process.env.REACT_APP_MESSAGING_API;
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
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

    const openMessageModal = (message) => {
        setModalOpen(true);
        setCurrentMessage(message);
    };

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
                                    openModal={openMessageModal}
                                    deleteFunction={deleteMessage}
                                    updateFunction={updateMessageStatus}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {currentMessage ? (
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        component={Paper}
                        sx={{ padding: "10px", margin: "10px auto" }}
                    >
                        <h2> Message</h2>
                        <hr></hr>
                        <label>Message Title: </label>
                        {currentMessage.message_title}
                        <br></br>
                        <label>Message: </label>
                        {currentMessage.message_content}
                        <br></br>
                        <label>Sender Name: </label>
                        {currentMessage.sender_name}
                        <br></br>
                        <label>Sender Email: </label>
                        {currentMessage.sender_contact}
                        <br></br>
                        <label>Status: </label>
                        {statusList[currentMessage.message_status]}
                    </Box>
                </Modal>
            ) : (
                <></>
            )}
        </div>
    );
}

export default MessageList;
