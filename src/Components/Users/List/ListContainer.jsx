import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';


// Components
import ListView from './ListView';

const ListContainer = (props) => {

    /**
     * Get data.
     */
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const getData = async () => {
        setLoading(true);

        // Call API
        let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/users`,
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

            setData([...apiResponse.data]);
            setAllData([...apiResponse.data]);
            setLoading(false);

        } else {

            message.error(apiResponse.message);
            setLoading(false);

        }

    };

    useEffect(() => {

        getData();

    }, []);

    /**
     * Method to remove.
     * @param {String} id
     */
    const removeData = async (id) => {

        // Call API
        let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
                },
                method: 'DELETE',
            });
        apiResponse = await apiResponse.json();

        // Check if response was successfuly
        if (apiResponse.code === 200) {

            getData()

        } else {

            message.error(apiResponse.message);

        }

    }

    /**
     * Method to search by e-mail and username
     * @param {String} searchTerm
     */
    const searchRegister = (searchTerm) => {
        searchTerm = searchTerm.toLowerCase();
        let localData = allData.filter(el => el.email.toLowerCase().includes(searchTerm) || (el.username && el.username.toLowerCase().includes(searchTerm)));
        setData(localData);
    }

    /**
     * Method to convert a string to a phone number
     * @param {String} phoneNumberString
     */
    const stringToPhone = (phoneNumberString) => {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '');
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return null;
    }

    return (

        <ListView

            loading={loading}
            data={data}
            removeData={id => removeData(id)}
            searchRegister={searchTerm => searchRegister(searchTerm)}

            stringToPhone={phoneString => stringToPhone(phoneString)}

        />

    )

}

export default ListContainer