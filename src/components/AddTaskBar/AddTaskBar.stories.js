import React from "react";
import { AddTaskBar } from "./AddTaskBar";

export default {
  title: "Components/AddTaskBar",
  component: AddTaskBar,
  argTypes: {},
};

const Template = (args) => <AddTaskBar {...args} />;

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
