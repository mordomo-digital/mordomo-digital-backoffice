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

    if (apiResponse.code === 200) return apiResponse.data

    message.error(apiResponse.message);
    return null;
}

export {
    apiRequestGet,
    apiRequestPut,
}