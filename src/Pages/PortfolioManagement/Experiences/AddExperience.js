import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ExperienceForm from "../../../Components/PortfolioManagement/Experiences/ExperienceForm";
import { useNavigate } from "react-router-dom";
import {defaultAuthCheck} from "../../../Authenticated"
function AddExperience(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        defaultAuthCheck(navigate);
    })
    return (
        <div>
            <h1>Add Experience</h1>
            <Button>
                <Link to = "/portfolio/experience">Back</Link>
            </Button>
            <ExperienceForm experience = {null}></ExperienceForm>
        </div>
    );
}

export default AddExperience;