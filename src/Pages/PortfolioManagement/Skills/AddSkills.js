import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import SkillForm from '../../../Components/Skills/SkillForm';
import { useNavigate } from 'react-router-dom';
import { defaultAuthCheck } from "../../../Authenticated";
function AddSkills() {
    const navigate = useNavigate();
    useEffect(()=>{
        defaultAuthCheck(navigate)
    })
    return (
        <div>
            <h1>Add skills</h1>
            <Button>
                <Link to = "/portfolio/skills">Back</Link>
            </Button>
            <SkillForm skill = {null}></SkillForm>
        </div>
    );
}

export default AddSkills;