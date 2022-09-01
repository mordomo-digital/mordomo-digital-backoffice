import React, { Component } from "react"
import { Divider } from "antd"
import { Chart } from 'react-google-charts'
import '../reports.css'

export default class ModulesChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            chartData: [
                ['Módulos', 'Uso']
            ],

            dataSource: this.props.dataSource,
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.dataSource !== this.props.dataSource) {
            this.setState({ loading: true, dataSource: nextProps.dataSource })

            const modulesUsed = [...new Set((nextProps.dataSource || []).map(el => this.translateModule(el.screen)))]
            const chartData = [
                ['Módulos', 'Uso'],
                ...modulesUsed.map(module => {
                    return [
                        module,
                        (nextProps.dataSource || []).reduce((prev, current) => {
                            return prev += (this.translateModule(current.screen) === module ? 1 : 0)
                        }, 0)
                    ]
                })
            ]

            this.setState({ chartData, loading: false })
        }
    }

    translateModule = (module) => {
        switch (module) {
            case 'bonus':
                return 'Bônus/Dicas'

            case 'market-list':
                return 'Lista de compras'

            case 'menu-list':
                return 'Cardápio'

            case 'today-schedule':
                return 'Tarefas de hoje'

            case 'week-schedule':
                return 'Cronograma semanal'

            default:
                return module
        }
    }

    render() {
        return (
            <div>
                <Divider />
                <div className="reports-chart-title">Módulos utilizados</div>
                <div className="reports-chart-subtitle">Percentual dos módulos utilizados no mês</div>

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