import React from "react";

import { FilterBar } from "./FilterBar";

export default {
  title: "Components/FilterBar",
  component: FilterBar,
  argTypes: {},
};

const Template = (args) => <FilterBar {...args} />;

export const NoFilterSet = Template.bind({});
NoFilterSet.args = {};

export const NoneFilterSet = Template.bind({});
NoneFilterSet.args = { activeFilter: "none" };

export const AllSet = Template.bind({});
AllSet.args = { activeFilter: "all" };

export const ActiveSet = Template.bind({});
ActiveSet.args = { activeFilter: "active" };

export const CompletedSet = Template.bind({});
CompletedSet.args = { activeFilter: "completed" };
