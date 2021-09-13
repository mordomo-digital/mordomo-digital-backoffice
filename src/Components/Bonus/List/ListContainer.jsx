import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';
import env from '../../../env.json';

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
        let apiResponse = await fetch(`${env.api_url}/bonus`,
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
        let apiResponse = await fetch(`${env.api_url}/bonus/${id}`,
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
     * Method to search by title
     * @param {String} searchTerm
     */
    const searchRegister = (searchTerm) => {
        searchTerm = searchTerm.toLowerCase();
        let localData = allData.filter(el => (el.title.toLowerCase().includes(searchTerm) || el.abstract.toLowerCase().includes(searchTerm)));
        setData(localData);
    }

    return (

        <ListView

            loading={loading}
            data={data}
            removeData={id => removeData(id)}
            searchRegister={searchTerm => searchRegister(searchTerm)}

        />

    )

}

export default ListContainer