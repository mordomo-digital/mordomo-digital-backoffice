import ListModule from "../../Modules/List/list.container"
import { Tag } from 'antd'

const roomItemsList = () => {
    return ListModule({
        name: 'Itens dos cômodos',
        route: '/home/room-items',
        apiRoute: '/room-items',
        apiRouteQueries: '',
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
        ]
    })
}

export {
    roomItemsList
}