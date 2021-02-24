import React from "react";
import Dashboard from "./Dashboard";
import { Subheading } from "components/misc/Headings";
export default ({ subheading = "Manage all your orders here..." }) => {
  return (
    <Dashboard>
      <Subheading>{subheading}</Subheading>
    </Dashboard>
  );
};
