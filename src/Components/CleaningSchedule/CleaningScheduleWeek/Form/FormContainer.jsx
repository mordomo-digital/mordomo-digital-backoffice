import React, { useEffect, useState } from "react";

// Modules
import { message } from "antd";

// Components
import FormView from "./FormView";
import { apiRequestGet } from "../../../../utils/api-request";

const FormContainer = (props) => {
  props = props.parent_props;

  const [roomTypes, setRoomTypes] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [idToUpdate, setIdToUpdate] = useState(null);
  useEffect(() => {
    /**
     * Get data to update.
     */
    async function getDataToUpdate(id) {
      // Call API.
      let apiResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/cleaning-schedule/one/${id}`,
        {
          headers: {
            access_token:
              sessionStorage.getItem("access_token") ||
              localStorage.getItem("access_token"),
          },
          method: "GET",
        }
      );
      apiResponse = await apiResponse.json();

      // Check if response was successfuly
      if (apiResponse.code === 200) {
        setForm({
          ...form,
          dayWeekNumber: apiResponse.data["dayWeekNumber"],
          tasks: apiResponse.data["schedule"].map((schedule) => {
            schedule.multipleWeekCleaningTasks = schedule.multipleWeekCleaningTasks
              .map(option => option.map(day => 
                day.map((dayTask) => dayTask.task?._id)));
    
              schedule.tasks = schedule.tasks.map((dayTask) => dayTask.task?._id);
    
            return schedule;
          }),
        });
      } else {
        message.error(apiResponse.message);
      }
    }

    /**
     * Get room types.
     */
    async function getRoomTypes() {
      // Call API.
      let roomTypesApiResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/room-types`,
        {
          headers: {
            access_token:
              sessionStorage.getItem("access_token") ||
              localStorage.getItem("access_token"),
          },
          method: "GET",
        }
      );
      roomTypesApiResponse = await roomTypesApiResponse.json();
      if (roomTypesApiResponse.code === 200) {
        setRoomTypes([...roomTypesApiResponse.data]);
        if (!props.location.state) {
          let defaultTasks = roomTypesApiResponse.data.map((el) => {
            return {
              room: el._id,
              tasks: [],
              multipleWeekCleaningTasks: [
                [[], []],
                [[], [], []],
              ],
            };
          });
          setForm({ ...form, tasks: [...defaultTasks] });
        }
      }
    }

    getRoomTypes();
    getTasks();
    /**
     * Check if update or create form
     */
    if (props.location.state) {
      setIdToUpdate(props.location.state.id);
      getDataToUpdate(props.location.state.id);
    }
  }, [props.location.state]);

  /**
   * Set form.
   */
  const [form, setForm] = useState({ dayWeekNumber: "", tasks: [] });

  const [taskToAdd, setTaskToAdd] = useState(null);

  /**
   * Save.
   */
  const [loadingSaveButton, setLoadingSaveButton] = useState(false);
  const save = async () => {
    setLoadingSaveButton(true);

    // Method
    let method = idToUpdate ? "PUT" : "POST";
    let endpoint = idToUpdate
      ? `${process.env.REACT_APP_API_URL}/cleaning-schedule/${idToUpdate}`
      : `${process.env.REACT_APP_API_URL}/cleaning-schedule`;
    let formToSave = {
      type: "week",
      dayWeekNumber: form.dayWeekNumber,
      schedule: form.tasks.map((schedule) => {
        schedule.multipleWeekCleaningTasks = schedule.multipleWeekCleaningTasks
          .map(option => option.map(day => {
            return day.map((dayTask) => {
                return {
                  taskName: tasks.find(el => el._id === dayTask)?.name,
                  task: dayTask
                }
            })
          }))

          schedule.tasks = schedule.tasks.map((dayTask) => {
            return {
              taskName: tasks.find(el => el._id === dayTask)?.name,
              task: dayTask
            }
          });

        return schedule;
      }),
    };

    // Call API.
    let apiResponse = await fetch(endpoint, {
      headers: {
        access_token:
          sessionStorage.getItem("access_token") ||
          localStorage.getItem("access_token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      body: JSON.stringify(formToSave),
    });
    apiResponse = await apiResponse.json();

    // Check if response was successfuly
    if (apiResponse.code === 200) {
      message.success(
        idToUpdate
          ? "Registro atualizado com sucesso"
          : "Registro criado com sucesso"
      );
      setLoadingSaveButton(false);
      props.history.push("/home/cleaning-schedule-week");
    } else {
      setLoadingSaveButton(false);
      message.error(apiResponse.message);
    }
  };

  const getTasks = async () => {
    const tasks = await apiRequestGet('/room-tasks')
    if (tasks) setTasks([...tasks]);
  };

  return (
    <FormView
      tasks={tasks}
      idToUpdate={idToUpdate}
      roomTypes={roomTypes}
      form={form}
      setForm={(form) => setForm({ ...form })}
      taskToAdd={taskToAdd}
      setTaskToAdd={(task) => setTaskToAdd(task)}
      save={() => save()}
      loadingSaveButton={loadingSaveButton}
    />
  );
};

export default FormContainer;
