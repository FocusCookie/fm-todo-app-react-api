import React from "react";

import { Overview } from "./Overview";

export default {
  title: "Components/Overview",
  component: Overview,
  argTypes: {},
};

const Template = (args) => <Overview {...args} />;

export const NoTask = Template.bind({});

export const WithTasksLeft = Template.bind({});
WithTasksLeft.args = { tasksLeft: 5 };

export const NoFilterSet = Template.bind({});
NoFilterSet.args = { tasksLeft: 5 };

export const FilterSet = Template.bind({});
FilterSet.args = { tasksLeft: 5, activeFilter: "all" };
