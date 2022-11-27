import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function MessageList(props) {
    return (
        <div>
            <h1>Message List</h1>
            <Button>
                <Link to={"/home"}>Back</Link>
            </Button>
        </div>
    );
}

export default MessageList;
