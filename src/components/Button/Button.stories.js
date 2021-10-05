import React from "react";

import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
};

const Template = (args) => <Button {...args} />;

export const Active = Template.bind({});
Active.args = {
  active: true,
  label: "Button",
};

export const Inactive = Template.bind({});
Inactive.args = {
  active: false,
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};

export const Normal = Template.bind({});
Normal.args = {
  size: "normal",
  label: "Button",
};
