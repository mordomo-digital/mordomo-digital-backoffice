import { Button, Col, Divider, Form, Row, Select, message } from 'antd'
import React, { Component } from 'react'
import ModulesChart from './charts/modules'
import DailyChart from './charts/daily'

import './reports.css'
import PlatformChart from './charts/platform'

export default class Reports extends Component {

    constructor(props) {
        super(props)

        this.state = {
            month: null,
            year: null,

            loadingReports: false,

            dataSource: null,
        }
    }

    componentDidMount = async () => {

    }

    generateReports = async () => {

        this.setState({ loadingReports: true })

        let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/usage-info/month-reports?month=${this.state.month}&year=${this.state.year}`,
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
            console.log(apiResponse.data.screenReport)
            this.setState({
                dataSource: apiResponse.data.screenReport
            })

        } else {

            message.error(apiResponse.message);

        }

        this.setState({ loadingReports: false })
    }

    render() {
        return (
            <div className='reports-bg-card'>
                <div className='reports-title'>Relatórios</div>
                <Divider />

                <Form layout='vertical'>

                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label='Mês'>
                                <Select
                                    value={this.state.month}
                                    onChange={(month) => this.setState({ month })}
                                >
                                    {
                                        [
                                            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                                            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
                                        ].map((label, value) => {
                                            return <Select.Option value={value} key={label}>{label}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label='Ano'>
                                <Select
                                    value={this.state.year}
                                    onChange={(year) => this.setState({ year })}
                                >
                                    {
                                        new Array(20).fill(1)
                                            .map((label, index) => {
                                                return <Select.Option value={2021 + index} key={2021 + index}>{2021 + index}</Select.Option>
                                            })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Button
                                type='primary'
                                className='reports-button'
                                onClick={() => this.generateReports()}
                                loading={this.state.loadingReports}
                            >
                                Gerar relatórios
                            </Button>
                        </Col>
                    </Row>

                    <ModulesChart dataSource={this.state.dataSource} />

                    <DailyChart dataSource={this.state.dataSource} />

                    <PlatformChart dataSource={this.state.dataSource} />
                </Form>
            </div>
        )
    }

}