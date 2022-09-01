import React, { Component } from "react"
import { Divider } from "antd"
import { Chart } from 'react-google-charts'
import '../reports.css'

export default class PlatformChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            chartData: [
                ['Plataforma', 'Uso']
            ],

            dataSource: this.props.dataSource
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.dataSource !== this.props.dataSource) {
            this.setState({ loading: true, dataSource: nextProps.dataSource })

            const platformsUsed = [...new Set((nextProps.dataSource || []).map(el => this.translatePlatform(el.platform)))]
            const chartData = [
                ['Plataforma', 'Uso'],
                ...platformsUsed.map(platform => {
                    return [
                        platform,
                        (nextProps.dataSource || []).reduce((prev, current) => {
                            return prev += (this.translatePlatform(current.platform) === platform ? 1 : 0)
                        }, 0)
                    ]
                })
            ]

            this.setState({ chartData, loading: false })
        }
    }

    translatePlatform = (platform) => {
        switch (platform) {
            case 'android':
                return 'Android'

            case 'ios':
                return 'IOS'

            default:
                return 'Android'
        }
    }

    render() {
        return (
            <div>
                <Divider />
                <div className="reports-chart-title">Plataformas</div>
                <div className="reports-chart-subtitle">Percentual das plataformas utilizados no mês</div>

                <Chart
                    chartType="PieChart"
                    data={this.state.chartData}
                    options={{
                        is3D: true,
                    }}
                    width={'100%'}
                    height={'400px'}
                    loading={this.state.loading}
                />
            </div>
        )
    }

}