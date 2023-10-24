import React, { Fragment } from "react";

// Modules
import {
  Card,
  Breadcrumb,
  Form,
  Select,
  Input,
  Button,
  Divider,
  Modal,
  Tabs,
  Row,
  Col,
} from "antd";
import { Link } from "react-router-dom";
import {
  MinusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

// Style
import "./FormStyle.css";

const FormView = (props) => {
  return (
    <div className="home-out-card">
      <div className="home-in-card">
        <Card title="Cronograma Express - Faxina Semanal">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">Início</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
              <Link to="/home/express-schedule-week">
                Cronograma Express - Faxina Semanal
              </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
              {props.idToUpdate ? "Editar" : "Novo"}
            </Breadcrumb.Item>
          </Breadcrumb>

          <Form style={{ marginTop: 40 }} layout="vertical">
            <Form.Item label="Semana sugerida" style={{ width: 250 }}>
              <Select
                style={{ width: 250 }}
                onChange={(e) =>
                  props.setForm({ ...props.form, dayWeekNumber: e })
                }
                value={props.form.dayWeekNumber}
              >
                <Select.Option value={0}>1</Select.Option>
                <Select.Option value={1}>2</Select.Option>
                <Select.Option value={2}>3</Select.Option>
                <Select.Option value={3}>4</Select.Option>
                <Select.Option value={4}>5</Select.Option>
              </Select>
            </Form.Item>

            {props.roomTypes.length ? (
              <div>
                <Tabs defaultActiveKey="0">
                  {props.roomTypes
                    .filter((el) => el._id !== "60db71b6f7fd0600045f7edf")
                    .map((roomType, roomIndex) => {
                      return (
                        <Tabs.TabPane tab={roomType.name} key={roomIndex}>
                          <h1 style={{ fontSize: "larger" }}>
                            1 dia de faxina por semana
                          </h1>
                          <Form.Item
                            label="Tarefa"
                            style={{ width: 500, float: "left" }}
                          >
                            <Input
                              value={props.taskToAdd}
                              onChange={(e) =>
                                props.setTaskToAdd(e.target.value)
                              }
                            />
                          </Form.Item>

                          <Button
                            type="primary"
                            style={{
                              float: "left",
                              marginTop: "30px",
                              marginLeft: "10px",
                            }}
                            onClick={() => {
                              let tasksUpdated = props.form.tasks;

                              const hasRoomInlist = tasksUpdated.find(
                                (room) => room.room === roomType._id
                              );
                              if (hasRoomInlist) {
                                tasksUpdated = tasksUpdated.map((task) => {
                                  if (task.room === roomType._id) {
                                    task.tasks.push(props.taskToAdd);
                                  }
                                  return task;
                                });
                              } else {
                                tasksUpdated.push({
                                  room: roomType._id,
                                  tasks: [props.taskToAdd],
                                  tasksChecked: [],
                                });
                              }

                              props.setForm({
                                ...props.form,
                                tasks: [...tasksUpdated],
                              });
                              props.setTaskToAdd(null);
                            }}
                          >
                            Adicionar Tarefa
                          </Button>

                          <div style={{ clear: "both" }} />

                          <ul>
                            {(
                              props.form.tasks.find(
                                (el) => el.room === roomType._id
                              ) || { tasks: [] }
                            ).tasks.map((task, i) => {
                              return (
                                <li>
                                  {task}
                                  <MinusCircleOutlined
                                    style={{
                                      color: "red",
                                      cursor: "pointer",
                                      marginLeft: "10px",
                                    }}
                                    onClick={() => {
                                      Modal.confirm({
                                        title:
                                          "Tem certeza que deseja excluir esse registro?",
                                        icon: <ExclamationCircleOutlined />,
                                        content:
                                          "Essa ação não poderá ser desfeita",
                                        okText: "Sim",
                                        okType: "danger",
                                        cancelText: "Não",
                                        onOk() {
                                          let tasksUpdated = [
                                            ...props.form.tasks,
                                          ];
                                          tasksUpdated.map((el) => {
                                            if (el.room === roomType._id)
                                              el.tasks.splice(i, 1);
                                            return el;
                                          });
                                          props.setForm({
                                            ...props.form,
                                            tasks: [...tasksUpdated],
                                          });
                                        },
                                      });
                                    }}
                                  />
                                </li>
                              );
                            })}
                          </ul>
                          {(
                            props.form?.tasks[roomIndex]
                              ?.multipleWeekCleaningTasks || [
                              [[], []],
                              [[], [], []],
                            ]
                          ).map((option, optionIndex) => {
                            return (
                              <Fragment>
                                <Divider />
                                <h1 style={{ fontSize: "larger" }}>
                                  {option.length} dias de faxina por semana
                                </h1>
                                <Row gutter={24}>
                                  {option.map((day, dayIndex) => {
                                    return (
                                      <Fragment>
                                        <Col span={24 / option.length}>
                                          <Row gutter={24}>
                                            <Col span={16}>
                                              <Form.Item label="Tarefa">
                                                <input
                                                  placeholder="Ex.: Varrer o chão."
                                                  id={`task_${roomIndex}_${optionIndex}_${dayIndex}`}
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                              <Button
                                                type="primary"
                                                style={{
                                                  float: "left",
                                                  marginTop: "30px",
                                                  marginLeft: "10px",
                                                }}
                                                onClick={() => {
                                                  props.addTaskInMultipleWeekCleaningTasks(
                                                    roomIndex,
                                                    optionIndex,
                                                    dayIndex
                                                  );
                                                }}
                                              >
                                                Adicionar
                                              </Button>
                                            </Col>
                                          </Row>

                                          <ul>
                                            {day.map((task, i) => {
                                              return (
                                                <li>
                                                  {task}
                                                  <MinusCircleOutlined
                                                    style={{
                                                      color: "red",
                                                      cursor: "pointer",
                                                      marginLeft: "10px",
                                                    }}
                                                    onClick={() => {
                                                      Modal.confirm({
                                                        title:
                                                          "Tem certeza que deseja excluir esse registro?",
                                                        icon: (
                                                          <ExclamationCircleOutlined />
                                                        ),
                                                        content:
                                                          "Essa ação não poderá ser desfeita",
                                                        okText: "Sim",
                                                        okType: "danger",
                                                        cancelText: "Não",
                                                        onOk() {
                                                          props.removeTaskInMultipleWeekCleaningTasks(
                                                            roomIndex,
                                                            optionIndex,
                                                            dayIndex,
                                                            i
                                                          );
                                                        },
                                                      });
                                                    }}
                                                  />
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        </Col>
                                      </Fragment>
                                    );
                                  })}
                                </Row>
                              </Fragment>
                            );
                          })}
                        </Tabs.TabPane>
                      );
                    })}
                </Tabs>
              </div>
            ) : null}
          </Form>

          <Divider />

          <Button
            type="primary"
            onClick={() => props.save()}
            loading={props.loadingSaveButton}
          >
            {props.idToUpdate ? "Atualizar" : "Salvar"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default FormView;
