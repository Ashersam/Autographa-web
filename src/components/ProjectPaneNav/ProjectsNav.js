import * as React from "react";
// import { logger } from "../../logger";
import CreateProjectAccordions from "../CreateProject/CreateProjectAccordions";
import Profile from "../ProjectsPane/Profile";
import TableData from "../ProjectsPane/TableData";
import List from "../Sync/List";

export const ProjectsNav = ({ title }) => {
  return (
    <>
      {(() => {
        switch (title) {
          case "Profile":
            return <Profile />;
          case "Sync":
            return <List />;
          case "Projects":
            return <TableData />;
          case "Create New Project":
            return <CreateProjectAccordions />;
          default:
            return null;
        }
      })()}
    </>
  );
};
