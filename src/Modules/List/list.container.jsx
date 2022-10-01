import React, { useEffect, useState } from 'react';
import ListView from './list.view';
import { apiRequestDelete, apiRequestGet } from '../../utils/api-request';

/**
 * List Module
 * @param {string} name ex.: "Clientes"
 * @param {string} route ex.: "/home/clients"
 * @param {string} apiRoute ex.: "/clients"
 * @param {string} apiRouteQueries ex.: "?name=teste"
 * @param {array} schema ex.: [{ title: 'Nome', key: 'name', render: (e){} }]
 * @returns 
 */
const ListModule = ({ name, route, apiRoute, apiRouteQueries, schema }) => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const getData = async () => {
        setLoading(true);

        const data = await apiRequestGet(`${apiRoute}${apiRouteQueries}`)
        if (data)
            setData([...data]);

        setLoading(false);

    };

    useEffect(() => {

        getData();

    }, []);

    const removeData = async (id) => {
        await apiRequestDelete(`${apiRoute}/${id}`)

        getData()

    }

    return (

        <ListView
            name={name}
            route={route}

            loading={loading}
            schema={schema}
            data={data}
            removeData={id => removeData(id)}

        />

    )

}

export default ListModule