import React, { Fragment, useState } from "react";

// Modules
import {
  Card,
  Breadcrumb,
  Form,
  Select,
  Button,
  Divider,
  Tabs,
  Row,
  Col,
} from "antd";
import { Link } from "react-router-dom";

// Style
import "./FormStyle.css";

const FormView = (props) => {
  const [filteredTasksOptions, setFilteredTasksOptions] = useState(null);

  return (
    <div className="home-out-card">
      <div className="home-in-card">
        <Card title="Cronograma Express v2 - Faxina Semanal">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">Início</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
              <Link to="/home/cleaning-schedule-week">
                Cronograma Express v2 - Faxina Semanal
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

            {props.roomTypes?.length ? (
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
                          <Form.Item label="Tarefas">
                            <Select
                              mode="multiple"
                              placeholder="Escolha..."
                              value={props.form.tasks[roomIndex]?.tasks}
                              onChange={(e) => {
                                const tasks = props.form.tasks;
                                tasks[roomIndex].tasks = e;
                                props.setForm({ ...props.form, tasks });
                                setFilteredTasksOptions(props.tasks);
                              }}
                              onBlur={() => setFilteredTasksOptions(props.tasks)}
                              showSearch
                              onSearch={(value) => {
                                setFilteredTasksOptions(
                                  props.tasks.filter((option) =>
                                    option.name
                                      .toLowerCase()
                                      .includes(value.toLowerCase())
                                  )
                                );
                              }}
                              filterOption={false}
                            >
                              {(filteredTasksOptions ?? props.tasks).map(
                                (el, i) => {
                                  return (
                                    <Select.Option key={i} value={el._id}>
                                      {el.name}
                                    </Select.Option>
                                  );
                                }
                              )}
                            </Select>
                          </Form.Item>

                          {(
                            (props.form?.tasks[roomIndex]
                              ?.multipleWeekCleaningTasks?.length &&
                              props.form?.tasks[roomIndex]
                                ?.multipleWeekCleaningTasks) || [
                              [[], []],
                              [[], [], []],
                            ]
                          ).map((option, optionIndex) => {
                            return (
                              <Fragment>
                                <Divider />
                                <h1 style={{ fontSize: "larger" }}>
                                  {option?.length} dias de faxina por semana
                                </h1>
                                <Row gutter={24}>
                                  {option.map((day, dayIndex) => {
                                    return (
                                      <Fragment>
                                        <Col span={24 / option?.length}>
                                          <Row gutter={24}>
                                            <Col span={24}>
                                              <Form.Item label={`Tarefas - dia ${dayIndex + 1}`}>
                                              <Select
                                                mode="multiple"
                                                placeholder="Escolha..."
                                                value={props.form.tasks[roomIndex]?.multipleWeekCleaningTasks[optionIndex][dayIndex]}
                                                onChange={(e) => {
                                                  const tasks = props.form.tasks;
                                                  tasks[roomIndex].multipleWeekCleaningTasks[optionIndex][dayIndex] = e;
                                                  props.setForm({ ...props.form, tasks });
                                                  setFilteredTasksOptions(props.tasks);
                                                }}
                                                onBlur={() => setFilteredTasksOptions(props.tasks)}
                                                showSearch
                                                onSearch={(value) => {
                                                  setFilteredTasksOptions(
                                                    props.tasks.filter((option) =>
                                                      option.name
                                                        .toLowerCase()
                                                        .includes(value.toLowerCase())
                                                    )
                                                  );
                                                }}
                                                filterOption={false}
                                              >
                                                {(filteredTasksOptions ?? props.tasks).map(
                                                  (el, i) => {
                                                    return (
                                                      <Select.Option key={i} value={el._id}>
                                                        {el.name}
                                                      </Select.Option>
                                                    );
                                                  }
                                                )}
                                              </Select>
                                              </Form.Item>
                                            </Col>
                                          </Row>
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
