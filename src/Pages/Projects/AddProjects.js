import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ProjectForm from "../../Components/Projects/ProjectForm"
function AddProjects(props) {
    return (
        <div>
            <h1>Add projects</h1>
            <Button>
                <Link to = "/skills">Back</Link>
            </Button>
            <ProjectForm project = {null}></ProjectForm>
        </div>
    );
}

export default AddProjects;