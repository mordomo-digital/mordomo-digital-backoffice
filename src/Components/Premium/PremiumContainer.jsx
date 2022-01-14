import React, { useState } from 'react';

// Modules
import PremiumView from './PremiumView';
import { message } from 'antd';

const PremiumContainer = (props) => {

    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState('month');

    const subscribe = async () => {
        setLoading(true);
        // Get user Id
        const url = new URLSearchParams(props.location.search);
        await updateUserPaymentFrequency(url.get('id'), plan === 'month' ? 1 : 12);
        // Call API
        let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/premium/mp-link?id=${url.get('id')}&type=${plan}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });
        apiResponse = await apiResponse.json();
        // Check if response was successfuly
        if (apiResponse.code === 200) {
            setLoading(false);
            window.location.replace(apiResponse.data.checkoutLink);
        } else {
            message.error(apiResponse.message);
            setLoading(false);
        }
    }

    const updateUserPaymentFrequency = async (id, planNumber) => {
        // Call API
        let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify({ premiumSubscriptionFrequency: planNumber })
            });
        apiResponse = await apiResponse.json();
        // Check if response was successfuly
        if (!apiResponse.code === 200) message.error(apiResponse.message);
    }

    return <PremiumView
        loading={loading}
        selectPlan={plan => setPlan(plan)}
        plan={plan}

        subscribe={() => subscribe()}
    />
}

export default PremiumContainer;