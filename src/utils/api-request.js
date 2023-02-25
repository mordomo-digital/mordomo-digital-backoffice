import { message } from "antd";

const apiRequestGet = async (route) => {
    let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}${route}`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
            },
            method: 'GET',
        });
    apiResponse = await apiResponse.json();

    if (apiResponse.code === 200) return apiResponse.data

    message.error(apiResponse.message);
    return null;
}

const apiRequestPost = async (route, body) => {
    let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}${route}`,
        {
            headers: {
                'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body),
        });
    apiResponse = await apiResponse.json();

    if (apiResponse.code === 200) return (apiResponse.data || {'data': 'created'})

    message.error(apiResponse.message);
    return null;
}

const apiRequestPut = async (route, body) => {
    let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}${route}`,
        {
            headers: {
                'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(body),
        });
    apiResponse = await apiResponse.json();

    if (apiResponse.code === 200) return (apiResponse.data || {'data': 'updated'})

    message.error(apiResponse.message);
    return null;
}

const apiRequestDelete = async (route) => {
    let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}${route}`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
            },
            method: 'DELETE',
        });
    apiResponse = await apiResponse.json();

    if (apiResponse.code === 200) return apiResponse.data

    message.error(apiResponse.message);
    return null;
}

export {
    apiRequestGet,
    apiRequestPost,
    apiRequestPut,
    apiRequestDelete,
}