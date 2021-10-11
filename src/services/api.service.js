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

const register = async function (username, password) {
  try {
    const isValidUsername = new RegExp(/^[A-Za-z]+$/);

    if (!isValidUsername.test(username))
      throw new Error(
        "Invalid Username, only characters are allowed. No spaces, dots, ..."
      );

    if (password.length < 7)
      throw new Error("Password length needs to be 7 chars minimum");

    const user = {
      email: `${username}.testing@testing.com`,
      password: password,
      name: username,
      age: 21,
    };

    const createdUser = await api.post("user/register", user);

    return createdUser;
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
    if (completed) patch.completed = completed;
    if (description) patch.description = description;

    setAuthHeader();
    const updatedTask = await api.put(`task/${id}`, patch);

    return updatedTask.data;
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

//TODO: Delete comments bellow
/* register("test", "1234567").then((user) => {
  console.log(user);
}); */

/* ONLY WITHOUT LOCALSTORAGE testable with node 
login("test", "1234567").then(async () => {
  console.log("LOGED IN");

  const me = await getLoggedInUserProfile();
  console.log("User ", me);

  const createdTask = await addTask("buy milk");
  console.log("Created ", createdTask);

  const tasks = await getTasks();
  console.log("Tasks ", tasks);

  const updated = await updateTask(tasks.data[0]._id, true, "changed via app");
  console.log("updated ", updated);

  const deletedTask = await deleteTask(tasks.data[tasks.data.length - 1]._id);
  console.log("deleted", deletedTask);

  const isLoggedOut = await logout();
  console.log("logged out ---> ", isLoggedOut);
});
*/

export { register, login, logout, getTasks, addTask, updateTask, deleteTask };
