import React from "react";
import { Heading } from "../ui/Heading";

export const Dashboard = () => {
  return (
    <React.Fragment>
      <Heading level="h1">Dashboard</Heading>
      <Heading level="h3" className="mt-2 mb-6 font-extralight text-zinc-500">
        Fill in the details below to create a new user account.
      </Heading>
    </React.Fragment>
  );
};
