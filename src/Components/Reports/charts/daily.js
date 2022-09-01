import React, { Component } from "react"
import { Chart } from 'react-google-charts'
import { Divider } from 'antd'
import '../reports.css'

export default class DailyChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            chartData: [
                ['Dia', 'Uso'],
                ...new Array(30).fill(1).map((el, i) => {
                    return [i + 1, 0]
                })
            ],

            dataSource: this.props.dataSource
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.dataSource !== this.props.dataSource) {
            this.setState({ loading: true, dataSource: nextProps.dataSource })

            // const daysUsed = [...new Set((nextProps.dataSource || []).map(el => new Date(el.date).getDate()))].sort()
            const daysUsed = new Array(30).fill(1).map((el, i) => i + 1)
            const chartData = [
                ['Dia', 'Uso'],
                ...daysUsed.map(day => {
                    return [
                        day,
                        (nextProps.dataSource || []).reduce((prev, current) => {
                            return prev += (new Date(current.date).getDate() === day ? 1 : 0)
                        }, 0)
                    ]
                })
            ]

            this.setState({ chartData, loading: false })
        }
    }

    render() {
        return (
            <div>
                <Divider />
                <div className="reports-chart-title">Uso por dia</div>
                <div className="reports-chart-subtitle">Utilização diária do app</div>

                <Chart
                    chartType="Line"
                    data={this.state.chartData}
                    width={'90%'}
                    height={'400px'}
                    loading={this.state.loading}
                />
            </div>
        )
    }

}