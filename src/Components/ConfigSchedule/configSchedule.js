import { Button, Collapse, Divider, Form, message, Select, Tabs } from 'antd'
import React, { Component } from 'react'

import './configSchedule.css'

import { apiRequestGet, apiRequestPut } from '../../utils/api-request.js'

export default class Reports extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rooms: [],
            tasks: [],

            scheduleConfigForm: {
                cleaningWeek: [],
                week: [],
            },

            loading: false,
        }
    }

    componentDidMount = async () => {
        await this.getRooms();
        await this.getTasks();

        await this.getSchedule();
    }

    getRooms = async () => {

        const rooms = await apiRequestGet('/room-types')

        if (rooms) {
            this.setState({
                rooms: rooms.map(room => {
                    return {
                        name: room.name,
                        _id: room._id,
                    }
                })
            })
        }

    }

    getTasks = async () => {

        const tasks = await apiRequestGet('/room-tasks')

        if (tasks) {
            this.setState({
                tasks: tasks.map(room => {
                    return {
                        name: room.name,
                        _id: room._id,
                    }
                })
            })
        }

    }

    getSchedule = async () => {
        let scheduleConfigForm = await apiRequestGet('/configs/schedule')

        scheduleConfigForm['cleaningWeek'] = (scheduleConfigForm['cleaningWeek'] || []).map(room => {
            room['room'] = room['room']._id
            room['tasks'] = room['tasks'].map(task => task._id)

            return room
        })

        scheduleConfigForm['week'] = (scheduleConfigForm['week'] || []).map(room => {
            room['room'] = room['room']._id
            room['tasks'] = room['tasks'].map(task => task._id)

            return room
        })

        this.setState({ scheduleConfigForm })
    }

    saveScheduleConfigs = async () => {
        this.setState({ loading: true })

        await apiRequestPut('/configs/schedule', this.state.scheduleConfigForm)

        message.success('Cronograma salvo')

        this.setState({ loading: false })
    }

    render() {
        return (
            <div className='configSchedule-bg-card'>
                <div className='configSchedule-title'>Cronograma v1.0</div>
                <Divider />

                <Tabs type='card'>

                    <Tabs.TabPane tab='Semana da faxina' key='1'>
                        <Collapse>
                            {
                                this.state.rooms.map((room, roomIndex) => {
                                    return (
                                        <Collapse.Panel header={room.name} key={roomIndex}>
                                            <Form layout='vertical'>
                                                <Form.Item label='Tarefas'>
                                                    <Select
                                                        mode='tags'
                                                        style={{ width: '100%' }}
                                                        placeholder='Tarefas'
                                                        value={
                                                            this.state.scheduleConfigForm['cleaningWeek'].find(el => el.room === room._id)
                                                            && this.state.scheduleConfigForm['cleaningWeek'].find(el => el.room === room._id).tasks
                                                        }
                                                        onChange={e => {

                                                            const scheduleConfigForm = this.state.scheduleConfigForm
                                                            const hasRoom = scheduleConfigForm['cleaningWeek'].find(el => el.room === room._id)
                                                            if (hasRoom) {
                                                                scheduleConfigForm['cleaningWeek'] = scheduleConfigForm['cleaningWeek'].map(el => {
                                                                    if (el.room === room._id) el['tasks'] = e
                                                                    return el
                                                                })
                                                            } else {
                                                                scheduleConfigForm['cleaningWeek'].push({ room: room._id, tasks: e })
                                                            }

                                                            this.setState({ scheduleConfigForm })

                                                        }}
                                                    >
                                                        {
                                                            this.state.tasks.map((task, taskIndex) => {
                                                                return (
                                                                    <Select.Option
                                                                        key={`task-cleaning-week=${taskIndex}`}
                                                                        value={task._id}
                                                                    >
                                                                        {task.name}
                                                                    </Select.Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Form>
                                        </Collapse.Panel>
                                    )
                                })
                            }
                        </Collapse>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab='Demais semanas' key='2'>
                        <Collapse>
                            {
                                this.state.rooms.map((room, roomIndex) => {
                                    return (
                                        <Collapse.Panel header={room.name} key={roomIndex}>
                                            <Form layout='vertical'>
                                                <Form.Item label='Tarefas'>
                                                    <Select
                                                        mode='tags'
                                                        style={{ width: '100%' }}
                                                        placeholder='Tarefas'
                                                        value={
                                                            this.state.scheduleConfigForm['week'].find(el => el.room === room._id)
                                                            && this.state.scheduleConfigForm['week'].find(el => el.room === room._id).tasks
                                                        }
                                                        onChange={e => {

                                                            const scheduleConfigForm = this.state.scheduleConfigForm
                                                            const hasRoom = scheduleConfigForm['week'].find(el => el.room === room._id)
                                                            if (hasRoom) {
                                                                scheduleConfigForm['week'] = scheduleConfigForm['week'].map(el => {
                                                                    if (el.room === room._id) el['tasks'] = e
                                                                    return el
                                                                })
                                                            } else {
                                                                scheduleConfigForm['week'].push({ room: room._id, tasks: e })
                                                            }

                                                            this.setState({ scheduleConfigForm })

                                                        }}
                                                    >
                                                        {
                                                            this.state.tasks.map((task, taskIndex) => {
                                                                return (
                                                                    <Select.Option
                                                                        key={`task-week=${taskIndex}`}
                                                                        value={task._id}
                                                                    >
                                                                        {task.name}
                                                                    </Select.Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Form>
                                        </Collapse.Panel>
                                    )
                                })
                            }
                        </Collapse>
                    </Tabs.TabPane>

                </Tabs>

                <Button
                    type='primary'
                    onClick={() => this.saveScheduleConfigs()}
                    style={{ marginTop: '20px' }}
                    loading={this.state.loading}
                >
                    Salvar
                </Button>
            </div>
        )
    }

}