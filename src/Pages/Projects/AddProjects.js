import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ProjectForm from "../../Components/PortfolioManagement/Projects/ProjectForm";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../Authenticated";
function AddProjects(props) {
    const navigate = useNavigate();
    useEffect(() => {
        defaultAuthCheck(navigate);
    },[]);
    return (
        <div>
            <h1>Add projects</h1>
            <Button>
                <Link to="/projects">Back</Link>
            </Button>
            <ProjectForm project={null}></ProjectForm>
        </div>
    );
}

export default AddProjects;
