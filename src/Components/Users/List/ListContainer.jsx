import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';


// Components
import ListView from './ListView';

const ListContainer = (props) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);

    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const getData = async () => {
        setLoading(true);

        const queryParams = new URLSearchParams(props.parent_props.location.search)
        setPage(queryParams.get('page'))

        let params = ''
        params += queryParams.get('email') ? `&email=${queryParams.get('email')}` : ''
        params += queryParams.get('username') ? `&username=${queryParams.get('username')}` : ''
        params += queryParams.get('userType') ? `&userType=${queryParams.get('userType')}` : ''
        params += queryParams.get('id') ? `&id=${queryParams.get('id')}` : ''
        params += queryParams.get('phone') ? `&phone=true` : ''
        params += queryParams.get('premiumFreebie') ? `&premiumFreebie=true` : ''

        // Call API
        if (page) {
            let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/users?limit=10&page=${page - 1}${params}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
                    },
                    method: 'GET',
                });
            apiResponse = await apiResponse.json();

            if (apiResponse.code === 200) {
                setData([...apiResponse.data.users]);
                setAllData([...apiResponse.data.users]);
                setTotalPages(apiResponse.data.total)
                setLoading(false);
            } else {
                message.error(apiResponse.message);
                setLoading(false);
            }
        }
    }

    useEffect(() => {

        getData();

    }, [page])

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

    const [searchField, setSearchField] = useState('email')
    const [searchTerm, setSearchTerm] = useState()
    const [searchPhone, setSearchPhone] = useState()
    const [searchFreebie, setSearchFreebie] = useState()
    const search = async () => {
        let params = `&${searchField}=${searchTerm}`
        if (searchPhone) params += `&phone=true`
        if (searchFreebie) params += `&premiumFreebie=true`
        setPage(1)
        props.parent_props.history.push(`/home/users?page=1${params}`)
    }

    const goToPage = (page) => {
        setPage(page)
        let params = (searchField && searchTerm) ? `&${searchField}=${searchTerm}` : ''
        if (searchPhone) params += `&phone=true`
        if (searchFreebie) params += `&premiumFreebie=true`
        props.parent_props.history.push(`/home/users?page=${page}${params}`)
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

            setSearchField={field => setSearchField(field)}
            setSearchTerm={term => setSearchTerm(term)}
            setSearchPhone={choose => setSearchPhone(choose)}
            setSearchFreebie={choose => setSearchFreebie(choose)}
            search={() => search()}

            stringToPhone={(phoneNumberString) => stringToPhone(phoneNumberString)}

            page={page}
            totalPages={totalPages}
            goToPage={(page) => goToPage(page)}
        />

    )

}

export default ListContainer