import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { redirectAuthCheck } from '../../Authenticated';
function Redirection(props) {
    const navigate = useNavigate()
    useEffect(()=>{
        redirectAuthCheck(navigate)
    })
    return (
        <div>
            
        </div>
    );
}

export default Redirection;