import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import ListView from './ListView';
import { apiRequestDelete, apiRequestGet } from '../../../../utils/api-request';

const ListContainer = (props) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const getData = async () => {
        setLoading(true);
        
        const products = await apiRequestGet('/mordomo-store?section=pdf')

        if(products){
            setData([...products]);
            setAllData([...products]);
            setLoading(false);
        } else {
            setLoading(false);
        }

    };

    useEffect(() => {

        getData();

    }, []);

    const removeData = async (id) => {
        await apiRequestDelete(`/mordomo-store/${id}`)
        getData()
    }

    const searchRegister = (searchTerm) => {
        searchTerm = searchTerm.toLowerCase();
        let localData = allData.filter(el => (el.title.toLowerCase().includes(searchTerm) || el.description.toLowerCase().includes(searchTerm)));
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