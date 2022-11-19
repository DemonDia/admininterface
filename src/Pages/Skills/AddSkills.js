import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import SkillForm from "../../Components/Skills/SkillForm"

function AddSkills() {
    return (
        <div>
            <h1>Add skills</h1>
            <Button>
                <Link to = "/skills">Back</Link>
            </Button>
            <SkillForm skillId = {null}></SkillForm>
        </div>
    );
}

export default AddSkills;