import React from "react";
import { Heading } from "../ui/Heading";
import { EmployeesTable } from "../features/employees/EmployeesTable";

export const Employees = () => {
  return (
    <React.Fragment>
      <Heading level="h1">Employee List</Heading>
      <EmployeesTable />
    </React.Fragment>
  );
};
