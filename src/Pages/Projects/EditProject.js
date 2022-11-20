import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ProjectForm from "../../Components/Projects/ProjectForm";
import { Button } from "@mui/material";
function EditProject() {
    const baseURL = process.env.REACT_APP_BACKEND_API;
    const { projectId } = useParams();
    const [project, setProject] = useState(null);

    const getProject = async () => {
        await axios
            .get(baseURL + `/projects/${projectId}`)
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    setProject(res.data.data);
                }
            });
    };
    useEffect(() => {
        getProject();
    }, []);
    return (
        <div>
            <h1>Edit Project</h1>
            <Button>
                <Link to="/projects">Back</Link>
            </Button>
            {project ? <ProjectForm project={project} /> : <h3>Loading ...</h3>}
        </div>
    );
}

export default EditProject;
