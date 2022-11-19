import React, { useState, useEffect } from "react";
import env from "react-dotenv";

import axios from "axios";
function SkillPage(props) {
    const baseURL = env.BACKEND_API;
    const [skills, setSkills] = useState([]);
    const getSkills = async () => {
        await axios.get(baseURL + "/skills").then((res) => {
            console.log(res);
            if (res.data.success) {
                setSkills(res.data.data);
            }
        });
    };
    useEffect(() => {
        // console.log(env.BACKEND_API)
        getSkills();
    }, []);
    return (
        <div>
            <h1>Skill Page</h1>
        </div>
    );
}

export default SkillPage;
