import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import SkillForm from "../../Components/Skills/SkillForm";
import { Button } from "@mui/material";
function EditSkill() {
    const baseURL = process.env.REACT_APP_BACKEND_API;
    const { skilId } = useParams();
    const [skill, setSkill] = useState(null);

    const getSkill = async () => {
        await axios
            .get(baseURL + `/skills/${skilId}`, 
            )
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    setSkill(res.data.data);
                }
            });
    };

    useEffect(() => {
        getSkill();
    }, []);
    return (
        <div>
            <h1>Edit Skill</h1>
            <Button>
                <Link to="/skills">Back</Link>
            </Button>
            {skill?<SkillForm skill={skill} />:<h3>Loading ...</h3>}
            
        </div>
    );
}

export default EditSkill;
