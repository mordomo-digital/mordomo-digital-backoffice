import React, { useEffect, useState } from "react"

import "./ListToPrintStyle.css"

const ListToPrint = (props) => {

    const [data, setData] = useState([])

    useEffect(() => {
        if (props.location.state) {
            const userTypeFilter = (props.location.state.filters.userType && props.location.state.filters.userType.length) ? props.location.state.filters.userType[0] : null
            const phoneFilter = (props.location.state.filters.personalDataPhone && props.location.state.filters.personalDataPhone.length) ? props.location.state.filters.personalDataPhone[0] : null

            const dataFiltered = props.location.state.data.filter(user => {
                return (
                    (!userTypeFilter || (userTypeFilter && (user.userType == userTypeFilter))) &&
                    (!phoneFilter || (phoneFilter && user.personalData && user.personalData.phone))
                )
            })
            setData(dataFiltered)

            setTimeout(() => {
                window.print()
            }, 1500)
        }
    }, [props.location.state])

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
        <div>
            <table className="user-list-table">
                <tr>
                    <th className="user-list-table-th">-</th>
                    <th className="user-list-table-th">E-mail</th>
                    <th className="user-list-table-th">Nome de usuário</th>
                    <th className="user-list-table-th">Tipo de usuário</th>
                    <th className="user-list-table-th" style={{ width: "150px" }}>Telefone</th>
                </tr>
                {
                    data.map((user, index) => {
                        return (
                            <tr>
                                <td className="user-list-table-td">{index + 1}</td>
                                <td className="user-list-table-td">{user && user.email}</td>
                                <td className="user-list-table-td">{user && user.username}</td>
                                <td className="user-list-table-td">{user && (user.userType === "free" ? "Gratuito" : "Premium")}</td>
                                <td className="user-list-table-td">{stringToPhone(user && user.personalData && user.personalData.phone)}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default ListToPrint