import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function ExperienceForm(props) {
    const baseURL = process.env.REACT_APP_BACKEND_API;
    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [roleName, setRoleName] = useState("");
    const [details, setDetails] = useState([]);
    const [detailPoint, setDetailPoint] = useState("");

    const [startMonth, setStartMonth] = useState(11);
    const [startYear, setStartYear] = useState(2022);
    const [status, setStatus] = useState("Active");
    const [companyURL, setCompanyURL] = useState("");
    const [endMonth, setEndMonth] = useState(11);
    const [endYear, setEndYear] = useState(2022);

    const monthsDict = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const statusList = ["Active", "Completed"];

    useEffect(() => {
        // ==========if its to update==========
        if (props.experience) {
            setCompanyName(props.experience.companyName);
            console.log(props.experience.end.split(" "));
            const [startingMonth, startingYear] =
                props.experience.start.split(" ");
            console.log();
            setStartYear(startingYear);
            setStartMonth(getMonthFromString(startingMonth));

            const [endingMonth, endingYear] = props.experience.end.split(" ");
            setEndYear(endingYear);
            setEndMonth(getMonthFromString(endingMonth));

            setRoleName(props.experience.roleName);
            setDetails(props.experience.desc);
            // setStartDate(props.experience.start);
            // setEndDate(props.experience.end);
        }
    }, []);

    // ========================other functions========================
    const getMonthFromString = (mon) => {
        return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
    };

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
    };
    // ============add============
    const addExperience = async () => {
        await axios
            .post(baseURL + "/experiences", {
                company_name: toTitleCase(companyName),
                starting: getMonthName(startMonth) + " " + startYear,
                ending: getMonthName(endMonth) + " " + endYear,
                details: details,
                title: toTitleCase(roleName),
                website:companyURL,
                status:status
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
                company_name: toTitleCase(companyName),
                starting: getMonthName(startMonth) + " " + startYear,
                ending: getMonthName(endMonth) + " " + endYear,
                details: details,
                title: toTitleCase(roleName),
                website:companyURL,
                status:status
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

    // ============add detail============
    const addDetailPoint = () => {
        if (details.includes(detailPoint)) {
            alert("It exists");
        } else if (detailPoint == "") {
            alert("Detail cannot be empty");
        } else {
            details.push(detailPoint);
            setDetails(details);
            setDetailPoint("");
        }
    };
    // ============delete detail============
    const deleteDetailPoint = (currentDetail) => {
        const filteredDetails = details.filter((detail) => {
            return detail != currentDetail;
        });
        setDetails(filteredDetails);
    };

    return (
        <Card sx={{ width: "60%", margin: "auto" }}>
            <CardContent>
                {!props.experience ? (
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

                <label>Details</label>
                <TableContainer component={Paper}>
                    <Table sx={{ width: "100%" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Info</TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
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
                                <TableCell colSpan={2} align={"center"}>
                                    <Button
                                        onClick={() => {
                                            addDetailPoint();
                                        }}
                                    >
                                        Add
                                    </Button>
                                </TableCell>
                            </TableRow>
                            {details.map((detail) => {
                                return (
                                    <TableRow>
                                        <TableCell>{detail}</TableCell>
                                        <TableCell align={"center"}>
                                            <Link
                                                onClick={() => {
                                                    deleteDetailPoint(detail);
                                                }}
                                            >
                                                <DeleteForeverOutlinedIcon />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TextField
                    value={companyURL}
                    label="Company site"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setCompanyURL(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                >
                </TextField>

                <TextField
                    value={status}
                    label="Role status"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setStatus(e.target.value);
                    }}
                    sx={{ width: "100%" }}
                    select
                >
                    {statusList.map((status) => {
                        return <MenuItem value={status}>{status}</MenuItem>;
                    })}
                </TextField>
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
                    value={startMonth}
                    label="Start Month"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setStartMonth(e.target.value);
                    }}
                    sx={{ width: "50%" }}
                    select
                >
                    {monthsDict.map((month, number) => {
                        return <MenuItem value={number + 1}>{month}</MenuItem>;
                    })}
                </TextField>

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
                    value={endMonth}
                    label="Start Month"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setEndMonth(e.target.value);
                    }}
                    sx={{ width: "50%" }}
                    select
                >
                    {monthsDict.map((month, number) => {
                        return <MenuItem value={number + 1}>{month}</MenuItem>;
                    })}
                </TextField>

                {!props.experience ? (
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
