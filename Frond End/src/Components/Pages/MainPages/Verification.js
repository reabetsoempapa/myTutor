import React, { useState } from 'react'
import UserController from '../../../Controllers/UserController';
import User from '../../../Models/Class files/User';
import { useLocation } from 'react-router-dom';
import LoadingPage from './LoadingPage';

const Verification = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const created = false;
    const [loading,setLoading] = useState(true);

    decryptInfo(searchParams);

    const decryptInfo = async (info) =>{
        console.log(info);
        //Code to decrypt info...
        created = await createUser(info);
        setLoading(false);
    }
    const createUser = async (details)=>{
        const userController = new UserController(); 
        return await userController.registerUser(new User(details.username,details.password,details.role));
    }
    const SuccessBar = () => {
        return (
            <div>
            Verification completed thank you!
            <button>Login</button>
            </div>
        )
    }
    const ErrorBar = () => {
        return (
            <div>
            Verification failed! it's either the token has expired, or a server issue please again later.
            <button>Home</button>
            </div>
        )
    }
    
    return (
        <div>
        {
            loading && <LoadingPage elementBeingLoaded={'verification. Might take some time'}/>
        }
        {
            (loading===false) && created && <SuccessBar/>
        }
        {
            (loading===false) && (created===false)  && <ErrorBar/>
        }
        </div>
    )
}

export default Verification
