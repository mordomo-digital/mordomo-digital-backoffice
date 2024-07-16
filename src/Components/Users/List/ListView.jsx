import React, { useState } from "react";

// Modules
import {
  Card,
  Table,
  Space,
  Breadcrumb,
  Modal,
  Input,
  Row,
  Col,
  Button,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserDetailsModalContainer from "../UserDetailsModal/UserDetailsModalContainer";

// Styles
import "./ListStyle.css";

const ListView = (props) => {
  const [filters, setFilters] = useState({
    userType: [],
    personalDataPhone: [],
  });

  // Columns of the table list
  const columns = [
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Nome de usuário",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Tipo de usuário",
      dataIndex: "userType",
      key: "userType",
      render: (e) => {
        if (e === "free") return "Gratuito";
        if (e === "premium") return "Premium";
        return "-";
      },
      filters: [
        { text: "Gratuito", value: "free" },
        { text: "Premium", value: "premium" },
      ],
      onFilter: (value, record) => {
        if ((record && record.userType) === value) return true;
        return false;
      },
    },
    {
      title: "Cortesia",
      dataIndex: "premiumFreebie",
      key: "premiumFreebie",
      render: (e) => {
        if (e) return "Sim";
        return "";
      },
      filters: [{ text: "Cortesia", value: true }],
      onFilter: (value, record) => {
        if (value === true && record && record.premiumFreebie) return true;
        return false;
      },
    },
    {
      title: "Ativo",
      dataIndex: "premiumValidatedDate",
      key: "premiumValidatedDate",
      render: (e) => {
        if (e && new Date(e).getTime() > new Date().getTime()) return "Sim";

        return "";
      },
      filters: [{ text: "Ativo", value: true }],
      onFilter: (value, record) => {
        if (
          value === true &&
          record &&
          new Date(record.premiumValidatedDate).getTime() > new Date().getTime()
        )
          return true;
        return false;
      },
    },
    {
      title: "Tem empregada",
      dataIndex: "personalData",
      key: "hasHousekeeper",
      render: (e) => {
        if (e && e.hasHousekeeper) return "Sim";
      },
      filters: [{ text: "Sim", value: true }],
      onFilter: (value, record) => {
        if (
          value === true &&
          record &&
          record.personalData &&
          record.personalData.hasHousekeeper
        )
          return true;
        return false;
      },
    },
    {
      title: "Telefone",
      dataIndex: "personalData",
      key: "personalDataPhone",
      width: 200,
      align: "center",
      filters: [{ text: "Sim", value: true }],
      onFilter: (value, record) => {
        if (
          value === true &&
          record &&
          record.personalData &&
          record.personalData.phone
        )
          return true;
        return false;
      },
      render: (e) => {
        if (e && e.phone) return props.stringToPhone(e.phone);
      },
    },
    {
      title: "Ações",
      key: "actions",
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <UserDetailsModalContainer
            userData={record}
            stringToPhone={(e) => props.stringToPhone(e)}
          />

          <span
            style={{
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => {
              Modal.confirm({
                title: "Tem certeza que deseja excluir esse registro?",
                icon: <ExclamationCircleOutlined />,
                content: "Essa ação não poderá ser desfeita",
                okText: "Sim",
                okType: "danger",
                cancelText: "Não",
                onOk() {
                  props.removeData(record._id);
                },
              });
            }}
          >
            Deletar
          </span>
        </Space>
      ),
    },
  ];

  return (
    <div className="home-out-card">
      <div className="home-in-card">
        <Card title="Usuários">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">Início</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>Usuários</Breadcrumb.Item>
          </Breadcrumb>
          <br />
          <br />

          <Row gutter={24}>
            <Col span={20}>
              <Input.Search
                placeholder="Valor da buscar"
                onChange={(e) => props.setSearchTerm(e.target.value)}
                onSearch={() => props.search()}
                style={{ float: "left", clear: "both", marginBottom: "20px" }}
              />
            </Col>
            <Col span={4}>
              <Button className="user-list-print-button" type="primary">
                <Link
                  to={{
                    pathname: "/print-user-list",
                    state: { data: props.data, filters: filters },
                  }}
                >
                  Imprimir lista
                </Link>
              </Button>
            </Col>
          </Row>

          <Table
            dataSource={props.data}
            columns={columns}
            loading={props.loading}
            locale={{
              emptyText: "Sem registros",
            }}
            onChange={(pagination, filters, sorter, currentState) => {
              setFilters(filters);
              props.setTotalUsers(currentState.currentDataSource.length);
            }}
            footer={() => (
              <div style={{ textAlign: "right", marginTop: "16px" }}>
                Total de usuários: {props.totalUsers.toLocaleString("pt-BR")}
              </div>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default ListView;
