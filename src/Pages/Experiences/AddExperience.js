import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ExperienceForm from "../../Components/Experiences/ExperienceForm"
function AddExperience(props) {
    return (
        <div>
            <h1>Add Experience</h1>
            <Button>
                <Link to = "/experience">Back</Link>
            </Button>
            <ExperienceForm experience = {null}></ExperienceForm>
        </div>
    );
}

export default AddExperience;