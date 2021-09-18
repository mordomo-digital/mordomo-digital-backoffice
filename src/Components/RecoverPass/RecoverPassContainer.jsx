import React, { useState } from 'react';

// Modules
import env from '../../env.json';
import { message } from 'antd';

// Components
import RecoverPassView from './RecoverPassView';

const RecoverPassContainer = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [newPass, setNewPass] = useState('');
    const [success, setSuccess] = useState(false);

    const updatePass = async () => {
        setIsLoading(true);

        // Check if pass has 3 characters
        if (newPass.length < 3) {
            message.error('A senha deve ter no mínimo 3 caracteres');
            setSuccess(false);
            setIsLoading(false);
        } else {
            // Get token
            const recoveryToken = props.location.search.split('=')[1];

            // Call API
            let apiResponse = await fetch(`${env.api_url}/auth/update-pass/${recoveryToken}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
                    },
                    method: 'POST',
                    body: JSON.stringify({ 'password': newPass })
                });
            apiResponse = await apiResponse.json();
            // Check if response was successfuly
            if (apiResponse.code === 200) {

                setSuccess(true);
                setIsLoading(false);

            } else {

                setIsLoading(false);
                message.error(apiResponse.message);

            }
        }


    };

    return (

        <RecoverPassView
            isLoading={isLoading}
            setNewPass={pass => setNewPass(pass)}
            updatePass={() => updatePass()}
            success={success}
        />

    )

};

export default RecoverPassContainer;