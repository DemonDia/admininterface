import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function ExperienceForm(props) {
    const baseURL = process.env.REACT_APP_BACKEND_API;
    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [roleName, setRoleName] = useState("");
    const [description, setDescription] = useState("");

    const [startMonth, setStartMonth] = useState(11);
    const [startYear, setStartYear] = useState(2022);
    const [endMonth, setEndMonth] = useState(11);
    const [endYear, setEndYear] = useState(2022);

    useEffect(() => {
        // ==========if its to update==========
        if (props.experience) {
            setCompanyName(props.experience.companyName);
            const { startingMonth, startingYear } =
                props.experience.start.split(" ");
            setRoleName(props.experience.roleName);
            setDescription(props.experience.desc);
            // setStartDate(props.experience.start);
            // setEndDate(props.experience.end);
        }
    }, []);

    // ========================other functions========================

    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString("en-US", { month: "long" });
    };

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(" ")
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
    }
    // ============add============
    const addExperience = async () => {
        await axios
            .post(baseURL + "/experiences", {
                companyName: toTitleCase(companyName),
                roleName: toTitleCase(roleName),
                desc: description,
                start: getMonthName(startMonth) + " " + startYear,
                end: getMonthName(endMonth) + " " + endYear,
            })
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    alert("Adding successful");
                    navigate("/experience");
                } else {
                    alert("Adding unsuccessful");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Adding unsuccessful");
            });
    };
    // ============update============
    const updateExperience = async () => {
        await axios
            .put(baseURL + "/experiences", {
                experience_Id: props.experience._id,
                companyName: toTitleCase(companyName),
                roleName: toTitleCase(roleName),
                desc: description,
                start: getMonthName(startMonth) + " " + startYear,
                end: getMonthName(endMonth) + " " + endYear,
            })
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    alert("Updating successful");
                    navigate("/experience");
                } else {
                    alert("Updating unsuccessful");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Updating unsuccessful");
            });
    };

    return (
        <Card sx={{ width: "50%", margin: "auto" }}>
            <CardContent>
                {!props.skill ? (
                    <h3>Add New Experience</h3>
                ) : (
                    <h3>Update Experience</h3>
                )}

                <TextField
                    id="outlined-basic"
                    label="Company Name"
                    variant="outlined"
                    value={companyName}
                    onChange={(e) => {
                        setCompanyName(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                />
                <TextField
                    id="outlined-basic"
                    label="Role Name"
                    variant="outlined"
                    value={roleName}
                    onChange={(e) => {
                        setRoleName(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                />
                <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    multiline
                    minRows={2}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                />
                <TextField
                    type="number"
                    label="Start Year"
                    sx={{ width: "50%" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ maxLength: 4 }}
                    value={startYear}
                    onChange={(e) => {
                        setStartYear(e.target.value);
                    }}
                />

                <TextField
                    id="outlined-basic"
                    type="number"
                    label="Start Month"
                    variant="outlined"
                    value={startMonth}
                    inputProps={{ min: 1, max: 12, maxLength: 2 }}
                    onChange={(e) => {
                        setStartMonth(e.target.value);
                    }}
                    sx={{ width: "50%" }}
                />

                <TextField
                    type="number"
                    label="End Year"
                    sx={{ width: "50%" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ maxLength: 4 }}
                    value={endYear}
                    onChange={(e) => {
                        setEndYear(e.target.value);
                    }}
                />

                <TextField
                    id="outlined-basic"
                    type="number"
                    label="End Month"
                    variant="outlined"
                    value={endMonth}
                    inputProps={{ min: 1, max: 12, maxLength: 2 }}
                    onChange={(e) => {
                        setEndMonth(e.target.value);
                    }}
                    sx={{ width: "50%" }}
                />

                {!props.skill ? (
                    <Button
                        onClick={() => {
                            addExperience();
                        }}
                    >
                        Add
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            updateExperience();
                        }}
                    >
                        Save
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

export default ExperienceForm;
