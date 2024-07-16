import React from "react";

// Modules
import {
  Card,
  Table,
  Breadcrumb,
  Space,
  Modal,
  Row,
  Col,
  Button,
  Tabs,
} from "antd";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";

// Styles
import "./ListStyle.css";

const ListView = (props) => {
  const renderNote = (note) => {
    switch (note) {
      case 1:
        return "Insatisfeito";

      case 2:
        return "Neutro";

      case 3:
        return "Satisfeito";

      default:
        return "-";
    }
  };

  // Columns of the table list
  const columns = [
    {
      title: "Custo-Benefício",
      dataIndex: "costBenefit",
      key: "costBenefit",
      render: (e) => renderNote(e),
    },
    {
      title: "Atendeu as necessidades",
      dataIndex: "meetsYourNeeds",
      key: "meetsYourNeeds",
      render: (e) => renderNote(e),
    },
    {
      title: "Desempenho",
      dataIndex: "performance",
      key: "performance",
      render: (e) => renderNote(e),
    },
    {
      title: "Usabilidade",
      dataIndex: "usability",
      key: "usability",
      render: (e) => renderNote(e),
    },
    {
      title: "Funcionalidade",
      key: "functionalities",
      width: 100,
      render: (text, record) =>
        record.functionalities ? (
          <Space size="middle">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                Modal.info({
                  title: "Funcionalidade",
                  content: record.functionalities,
                });
              }}
            >
              Ver
            </span>
          </Space>
        ) : null,
    },
  ];

  const renderChart = (question) => {
    return (
      <Chart
        chartType="PieChart"
        width={750}
        height={500}
        data={[
          ["Avaliação", "Qtd"],
          [
            "Neutro",
            props.data.reduce(
              (prev, current) => (prev += current[question] === 2 ? 1 : 0),
              0
            ),
          ],
          [
            "Satisfeito",
            props.data.reduce(
              (prev, current) => (prev += current[question] === 3 ? 1 : 0),
              0
            ),
          ],
          [
            "Insatisfeito",
            props.data.reduce(
              (prev, current) => (prev += current[question] === 1 ? 1 : 0),
              0
            ),
          ],
        ]}
        options={{
          is3D: true,
        }}
      />
    );
  };

  return (
    <div className="home-out-card">
      <div className="home-in-card">
        <Card title="Pesquisa de satisfação">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">Início</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>Pesquisa de satisfação</Breadcrumb.Item>
          </Breadcrumb>
          <br />

          <Row gutter={24}>
            <Col span={16}></Col>
            <Col span={4}>
              <Button
                type="primary"
                className="csat-button"
                onClick={() => props.openCloseChartModal()}
              >
                Gráfico
              </Button>
            </Col>
            <Col span={4}>
              <Button
                className="csat-button"
                onClick={() => props.openCloseFunctionalitiesModal()}
              >
                Funcionalidades
              </Button>
            </Col>
          </Row>
          <br />

          <Table
            dataSource={props.data}
            columns={columns}
            loading={props.loading}
            locale={{
              emptyText: "Sem registros",
            }}
            onChange={(pagination, filters, sorter, currentState) => {
              props.setTotal(currentState.currentDataSource.length);
            }}
            footer={() => (
              <div style={{ textAlign: "right", marginTop: "16px" }}>
                Total de pesquisas respondidas:{" "}
                {props.total.toLocaleString("pt-BR")}
              </div>
            )}
          />
        </Card>
      </div>

      <Modal
        title="Gráfico"
        visible={props.chartModal}
        closable={true}
        cancelText="Fechar"
        onCancel={() => props.openCloseChartModal()}
        onOk={() => props.openCloseChartModal()}
        width={800}
      >
        <Tabs>
          <Tabs.TabPane tab="Custo-Benefício" key="costBenefit">
            {renderChart("costBenefit")}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Atendeu as necessidades" key="meetsYourNeeds">
            {renderChart("meetsYourNeeds")}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Desempenho" key="performance">
            {renderChart("performance")}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Usabilidade" key="usability">
            {renderChart("usability")}
          </Tabs.TabPane>
        </Tabs>
      </Modal>

      <Modal
        title="Funcionalidades"
        visible={props.functionalitiesModal}
        closable={true}
        cancelText="Fechar"
        onCancel={() => props.openCloseFunctionalitiesModal()}
        onOk={() => props.openCloseFunctionalitiesModal()}
      >
        <div>
          <ul>
            {props.data
              .filter((question) => question.functionalities)
              .map((question) => {
                return <li>{question.functionalities}</li>;
              })}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default ListView;
