import React from "react";

// Modules
import { Card, Table, Breadcrumb, Space, Modal } from "antd";
import { Link } from "react-router-dom";

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
    </div>
  );
};

export default ListView;
