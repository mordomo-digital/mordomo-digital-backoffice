import React, { useState, useEffect } from 'react';

// Modules

// Components
import VerifyUserView from './VerifyUserView';

const VerifyUserContainer = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const checkToken = async () => {
        setIsLoading(true);

        // Get token
        const token = props.location.search.split('=')[1];

        // Call API
        let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/check-verification-token/${token}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
                },
                method: 'GET',
            });
        apiResponse = await apiResponse.json();
        // Check if response was successfuly
        if (apiResponse.code === 200) {

            setSuccess(true);
            setIsLoading(false);

        } else {

            setSuccess(false);
            setIsLoading(false);

        }

    };

    useEffect(() => {
        checkToken();
    }, []);

    return (

        <VerifyUserView
            isLoading={isLoading}
            success={success}
        />

    )

};

export default VerifyUserContainer;