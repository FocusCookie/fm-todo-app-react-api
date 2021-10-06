import React from "react";

import { Task } from "./Task";

export default {
  title: "Components/Task",
  component: Task,
  argTypes: {},
};

const Template = (args) => <Task {...args} />;

export const Completed = Template.bind({});
Completed.args = {
  task: { _id: "123", completed: true, description: "Task description" },
};

export const Incompleted = Template.bind({});
Incompleted.args = {
  task: { _id: "123", completed: false, description: "Task description" },
};
