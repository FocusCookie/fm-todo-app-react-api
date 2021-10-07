const axios = require("axios").default;
const api = axios.create({
  baseURL: "https://api-nodejs-todolist.herokuapp.com/",
});

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
    throw new Error("Api: register", error);
  }
};

const login = async function (username, password) {
  try {
    if (password.length < 7)
      throw new Error("Password length needs to be 7 chars minimum");

    const user = {
      email: `${username}.testing@testing.com`,
      password: password,
    };

    const loggedInUser = await api.post("user/login", user);

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loggedInUser.data.token}`;

    return loggedInUser.data;
  } catch (error) {
    throw new Error("Api: login", error);
  }
};

const logout = async function () {
  try {
    await api.post("user/logout");

    api.defaults.headers.common["Authorization"] = null;

    return true;
  } catch (error) {
    throw new Error("Api: logout", error);
  }
};

const getLoggedInUserProfile = async function () {
  try {
    const user = await api.get("user/me");

    return user.data;
  } catch (error) {
    throw new Error("Api: getLoggedInUserProfile", error);
  }
};

const getTasks = async function () {
  try {
    const tasks = await api.get("task/");
    return tasks.data;
  } catch (error) {
    throw new Error("Api: getLoggedInUserProfile", error);
  }
};

const addTask = async function (description) {
  try {
    if (!description) throw new Error("Api: addTask - no task given");

    const createdTasks = await api.post("task/", {
      description: `${description}`,
    });
    return createdTasks.data;
  } catch (error) {
    throw new Error("Api: addTask", error);
  }
};

const updateTask = async function (id, completed, description) {
  try {
    if (!id) throw new Error("Api: updateTask - no task given");

    let patch = {};
    if (completed) patch.completed = completed;
    if (description) patch.description = description;

    const updatedTask = await api.put(`task/${id}`, patch);

    return updatedTask.data;
  } catch (error) {
    throw new Error("Api: updateTask", error);
  }
};

const deleteTask = async function (id, completed, description) {
  try {
    if (!id) throw new Error("Api: deleteTask - no task given");

    const deleted = await api.delete(`task/${id}`);

    return deleted.data;
  } catch (error) {
    throw new Error("Api: updateTask", error);
  }
};

/* register("test", "1234567").then((user) => {
  console.log(user);
}); */

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
