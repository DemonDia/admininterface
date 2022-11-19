import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function SkillForm(props) {
    const baseURL = process.env.REACT_APP_BACKEND_API;
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [haveError, setHaveError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [skillName, setSkillName] = useState("");
    const [skillYear, setSkillYear] = useState("");

    useState(() => {
        // ==========if its to update==========
        if (props.skill) {
            setSkillName(props.skill.name);
            setSkillName(props.skill.year_learnt);
        }
    }, []);

    // ========================other functions========================

    // ============add============
    const addSkill = async () => {
        await axios
            .post(baseURL + "/skills", {
                name: skillName,
                year_learnt: skillYear,
            })
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setSuccess(true);
                    setHaveError(false);
                    setErrorMessage("");
                    alert("Adding successful")
                    navigate("/skills");
                    
                } else {

                    setSuccess(false);
                    setHaveError(true);
                    setErrorMessage(res.message);
                    alert("Adding unsuccessful")
                }
            })
            .catch((err) => {
                console.log(err)
                setSuccess(false);
                setHaveError(true);
                setErrorMessage(err);
                alert("Adding unsuccessful")
            });
    };
    // ============update============
    return (
        <Card sx={{ width: "50%", margin: "auto" }}>
            <CardContent>
                {!props.skill ? <h3>Add New Skill</h3> : <h3>Update Skill</h3>}
                {/* {skillName} */}
                <TextField
                    id="outlined-basic"
                    label="Skill Name"
                    variant="outlined"
                    value = {skillName}
                    onChange = {(e)=>{setSkillName(e.target.value)}}
                    sx={{ width: "100%" }}
                />
                {/* {skillYear} */}
                <TextField
                    id="outlined-basic"
                    label="Skill Year"
                    variant="outlined"
                    value = {skillYear}
                    onChange = {(e)=>{setSkillYear(e.target.value)}}
                    sx={{ width: "100%" }}
                />
                {!props.skill ? (
                    <Button
                        onClick={() => {
                            addSkill();
                        }}
                    >
                        Add
                    </Button>
                ) : (
                    <Button>Save</Button>
                )}
            </CardContent>
        </Card>
    );
}

export default SkillForm;
