import React from "react";
import { useOrders } from "../../services/apiOrders";
import Table from "../../ui/Table";
import { employeeHeader, orderHeader } from "../../data/table-headers";
import type { Employees, Order } from "../../types/types";
import { EmployeeRow } from "./EmployeeRow";
import { useEmployees } from "../../services/apiEmployees";

export const EmployeesTable = () => {
  const { data: employees, isLoading } = useEmployees();

  if (employees) console.log(employees);

  return (
    <React.Fragment>
      <Table
        isLoading={isLoading}
        columns="0.4fr 3fr 2.5fr 2.5fr 2.5fr 2fr 2.5fr 1.5fr 1.5fr"
      >
        <Table.Header data={employeeHeader} />
        <Table.Body
          data={employees}
          render={(employee: Employees) => (
            <EmployeeRow employee={employee} key={employee.id} />
          )}
        />
      </Table>
    </React.Fragment>
  );
};
