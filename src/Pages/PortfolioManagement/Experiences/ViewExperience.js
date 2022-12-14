import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ExperienceForm from "../../../Components/PortfolioManagement/Experiences/ExperienceForm";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {defaultAuthCheck} from "../../../Authenticated"

function ViewExperience() {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BACKEND_API;
    const { experienceId } = useParams();
    const [experience, setExperience] = useState(null);

    const getSkill = async () => {
        await axios.get(baseURL + `/experiences/${experienceId}`).then((res) => {
            if (res.data.success) {
                setExperience(res.data.data);
            }
        });
    };

    useEffect(() => {
        defaultAuthCheck(navigate);
        getSkill();
    }, []);
    return (
        <div>
            <h1>Edit Experience</h1>
            <Button>
                <Link to="/portfolio/experience">Back</Link>
            </Button>
            {experience?<ExperienceForm experience={experience} />:<h3>Loading ...</h3>}
        </div>
    );
}

export default ViewExperience;
