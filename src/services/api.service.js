const axios = require("axios").default;
const api = axios.create({
  baseURL: "https://api-nodejs-todolist.herokuapp.com/",
});

function setAuthHeader() {
  const token = localStorage.getItem("token");

  if (token !== "") {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

const register = async function (email, password) {
  try {
    const user = {
      email: email,
      password: password,
      name: email.split(".")[0],
      age: 21,
    };

    const createdUser = await api.post("user/register", user);

    return createdUser.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const login = async function (email, password) {
  try {
    if (password.length < 7)
      throw new Error("Password length needs to be 7 chars minimum");

    const user = {
      email: `${email}`,
      password: password,
    };

    const loggedInUser = await api.post("user/login", user);

    return loggedInUser.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const logout = async function () {
  try {
    setAuthHeader();
    await api.post("user/logout");

    return true;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

/* const getLoggedInUserProfile = async function () {
  try {
    setAuthHeader();
    const user = await api.get("user/me");

    return user.data;
  } catch (error) {
    throw new Error("Api: getLoggedInUserProfile", error);
  }
}; */

const getTasks = async function () {
  try {
    setAuthHeader();
    const tasks = await api.get("task/");
    return tasks.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const addTask = async function (description) {
  try {
    if (!description) throw new Error("Api: addTask - no task given");

    setAuthHeader();

    const createdTasks = await api.post("task/", {
      description: `${description}`,
    });
    return createdTasks.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const updateTask = async function (id, completed, description) {
  try {
    if (!id) throw new Error("Api: updateTask - no task given");

    let patch = {};
    if (completed !== undefined || completed !== null)
      patch.completed = completed;
    if (description) patch.description = description;

    setAuthHeader();
    const updatedTask = await api.put(`task/${id}`, patch);

    return updatedTask.data.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const deleteTask = async function (id, completed, description) {
  try {
    if (!id) throw new Error("Api: deleteTask - no task given");

    setAuthHeader();
    const deleted = await api.delete(`task/${id}`);

    return deleted.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export { register, login, logout, getTasks, addTask, updateTask, deleteTask };
