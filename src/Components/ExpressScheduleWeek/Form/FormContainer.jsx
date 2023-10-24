import React, { useEffect, useState } from "react";

// Modules
import { message } from "antd";

// Components
import FormView from "./FormView";

const FormContainer = (props) => {
  props = props.parent_props;

  const [roomTypes, setRoomTypes] = useState([]);

  const [idToUpdate, setIdToUpdate] = useState(null);
  useEffect(() => {
    /**
     * Get data to update.
     */
    async function getDataToUpdate(id) {
      // Call API.
      let apiResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/express-schedule/one/${id}`,
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
          tasks: apiResponse.data["tasks"],
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
            };
          });
          setForm({ ...form, tasks: [...defaultTasks] });
        }
      }
    }

    getRoomTypes();
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
      ? `${process.env.REACT_APP_API_URL}/express-schedule/${idToUpdate}`
      : `${process.env.REACT_APP_API_URL}/express-schedule`;
    let formToSave = {
      type: "week",
      dayWeekNumber: form.dayWeekNumber,
      tasks: form.tasks,
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
      props.history.push("/home/express-schedule-week");
    } else {
      setLoadingSaveButton(false);
      message.error(apiResponse.message);
    }
  };

  const addTaskInMultipleWeekCleaningTasks = (roomIndex, optionIndex, dayIndex) => {
    const inputElement = document.getElementById(
      `task_${roomIndex}_${optionIndex}_${dayIndex}`
    );
    const task = inputElement.value;

    if(task) {
      let tasks = form.tasks;
      if (!tasks[roomIndex].multipleWeekCleaningTasks)
        tasks[roomIndex].multipleWeekCleaningTasks = [
          [[], []],
          [[], [], []],
        ];
  
      tasks[roomIndex].multipleWeekCleaningTasks[optionIndex][dayIndex].push(task);    
      setForm({ ...form, tasks: [...tasks] });

      inputElement.value = "";
    }
  };

  const removeTaskInMultipleWeekCleaningTasks = (roomIndex, optionIndex, dayIndex, taskIndex) => {
      let tasks = form.tasks;
      tasks[roomIndex].multipleWeekCleaningTasks[optionIndex][dayIndex].splice(taskIndex, 1);    
      setForm({ ...form, tasks: [...tasks] });
  };

  return (
    <FormView
      idToUpdate={idToUpdate}
      roomTypes={roomTypes}
      form={form}
      setForm={(form) => setForm({ ...form })}
      taskToAdd={taskToAdd}
      setTaskToAdd={(task) => setTaskToAdd(task)}
      save={() => save()}
      loadingSaveButton={loadingSaveButton}
      addTaskInMultipleWeekCleaningTasks={addTaskInMultipleWeekCleaningTasks}
      removeTaskInMultipleWeekCleaningTasks={removeTaskInMultipleWeekCleaningTasks}
    />
  );
};

export default FormContainer;
