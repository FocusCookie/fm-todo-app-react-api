import React from "react";

import { Overview } from "./Overview";

export default {
  title: "Components/Overview",
  component: Overview,
  argTypes: {},
};

const Template = (args) => <Overview {...args} />;

export const TaskLeftFilled = Template.bind({});
TaskLeftFilled.args = { tasksLeft: 5 };
