import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function SkillForm(props) {
    const baseURL = process.env.REACT_APP_BACKEND_API;
    const navigate = useNavigate();
    const [skillName, setSkillName] = useState("");
    const [skillYear, setSkillYear] = useState("");

    useEffect(() => {
        // ==========if its to update==========
        if (props.skill) {
            setSkillName(props.skill.name);
            setSkillYear(props.skill.year_learnt);
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
                if (res.data.success) {
                    alert("Adding successful");
                    navigate("/portfolio/skills");
                } else {
                    alert("Adding unsuccessful");
                }
            })
            .catch((err) => {
                (err);
                alert("Adding unsuccessful");
            });
    };
    // ============update============
    const updateSkill = async () => {
        await axios
            .put(baseURL + "/skills", {
                skill_Id: props.skill._id,
                name: skillName,
                year_learnt: skillYear,
            })
            .then((res) => {
                (res);
                if (res.data.success) {
                    alert("Updating successful");
                    navigate("/portfolio/skills");
                } else {
                    alert("Updating unsuccessful");
                }
            })
            .catch((err) => {
                (err);
                alert("Updating unsuccessful");
            });
    };

    return (
        <Card sx={{ width: "50%", margin: "auto" }}>
            <CardContent>
                {!props.skill ? <h3>Add New Skill</h3> : <h3>Update Skill</h3>}
                {/* {skillName} */}
                <TextField
                    id="outlined-basic"
                    label="Skill Name"
                    variant="outlined"
                    value={skillName}
                    onChange={(e) => {
                        setSkillName(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                />
                {/* {skillYear} */}
                <TextField
                    id="outlined-basic"
                    label="Skill Year"
                    variant="outlined"
                    value={skillYear}
                    onChange={(e) => {
                        setSkillYear(e.target.value);
                    }}
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
                    <Button
                        onClick={() => {
                            updateSkill();
                        }}
                    >
                        Save
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

export default SkillForm;
