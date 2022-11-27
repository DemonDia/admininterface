import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import SkillForm from '../../../Components/PortfolioManagement/Skills/SkillForm';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../../Authenticated";
function EditSkill() {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BACKEND_API;
    const { skillId } = useParams();
    const [skill, setSkill] = useState(null);

    const getSkill = async () => {
        await axios.get(baseURL + `/skills/${skillId}`).then((res) => {
            if (res.data.success) {
                setSkill(res.data.data);
            }
        });
    };

    useEffect(() => {
        defaultAuthCheck(navigate);
        getSkill();
    }, []);
    return (
        <div>
            <h1>Edit Skill</h1>
            <Button>
                <Link to="/portfolio/skills">Back</Link>
            </Button>
            {skill ? <SkillForm skill={skill} /> : <h3>Loading ...</h3>}
        </div>
    );
}

export default EditSkill;
