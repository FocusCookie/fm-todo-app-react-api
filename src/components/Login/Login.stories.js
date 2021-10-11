import React from "react";

import { Login } from "./Login";

export default {
  title: "Components/Login",
  component: Login,
  argTypes: {},
};

const Template = (args) => <Login {...args} />;

export const Default = Template.bind({});

export const ErrorMsgProvided = Template.bind({});
ErrorMsgProvided.args = {
  errorMsg: "Error property",
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
