import React from "react";
import { TaskList } from "./Tasklist";

export default {
  title: "Components/Tasklist",
  component: TaskList,
  argTypes: {},
};

const Template = (args) => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited from the Default story in task.stories.js.
  tasks: [
    {
      completed: false,
      _id: "1",
      description: "reading book",
      owner: "615a9d50334cdc00174ebe23",
      createdAt: "2021-10-04T06:23:08.857Z",
      updatedAt: "2021-10-04T06:23:08.857Z",
      __v: 0,
    },
    {
      completed: false,
      _id: "2",
      description: "buy milk",
      owner: "615a9d50334cdc00174ebe23",
      createdAt: "2021-10-04T06:23:08.857Z",
      updatedAt: "2021-10-04T06:23:08.857Z",
      __v: 0,
    },
    {
      completed: false,
      _id: "3",
      description: "clean house",
      owner: "615a9d50334cdc00174ebe23",
      createdAt: "2021-10-04T06:23:08.857Z",
      updatedAt: "2021-10-04T06:23:08.857Z",
      __v: 0,
    },
    {
      completed: true,
      _id: "4",
      description: "do the tasks",
      owner: "615a9d50334cdc00174ebe23",
      createdAt: "2021-10-04T06:23:08.857Z",
      updatedAt: "2021-10-04T06:23:08.857Z",
      __v: 0,
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Loaded = Template.bind({});
Loaded.args = {
  tasks: [...Default.args.tasks],
  loading: false,
};
