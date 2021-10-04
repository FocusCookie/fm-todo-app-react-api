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
