import ListModule from "../../Modules/List/list.container"
import { Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const roomTypesList = () => {
    return ListModule({
        name: 'Tipos de cômodos',
        route: '/home/room-types',
        apiRoute: '/room-types',
        apiRouteQueries: '?withDisabled=true',
        schema: [
            { title: 'Nome', key: 'name' },
            {
                title: 'Tarefas',
                key: 'tasks',
                render: (tasks) => {
                    return (
                        <span>

                            {tasks.map(el => {
                                return (
                                    <Tag
                                        color='blue'
                                        key={el._id}
                                    >
                                        {el.name}
                                    </Tag>
                                )
                            })}

                        </span>
                    )
                }
            },
            {
                title: 'Exclusivo Premium',
                key: 'isAPremiumRoomType',
                align: 'center',
                width: 100,
                render: (e) => {
                    if (e)
                        return <CheckCircleOutlined style={{ color: 'green' }} />
                    return ''
                }
            },
            {
                title: 'Disponível',
                key: 'disabled',
                align: 'center',
                width: 100,
                render: (e) => {
                    if (e)
                        return <CloseCircleOutlined style={{ color: 'red' }} />
                    return <CheckCircleOutlined style={{ color: 'green' }} />
                }
            },
        ]
    })
}

export {
    roomTypesList
}