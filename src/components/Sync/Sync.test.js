import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Sync from "./Sync";
// import intl from "./helper";
import { act } from "react-dom/test-utils";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Setup funtion for app component
 * @returns {ShallowWrapper}
 */

describe("Sync component tests", () => {
  const projects = [
    {
      project: "Project Malayalam",
      files: ["Gen.usfm", "Exo.usfm", "Readme.md"],
    },
    {
      project: "Project Arabic",
      files: [
        "Lev.usfm",
        "Psa.usfm",
        "Isa.usfm",
        "Mat.usfm",
        "Luk.usfm",
        "Tit.usfm",
      ],
    },
    {
      project: "Project English",
      files: ["Mat.usfm", "Luk.usfm", "Tit.usfm"],
    },
    {
      project: "Project Urdu",
      files: [],
    },
  ];
  test("Sync component renders without error", () => {
    render(<Sync projects={projects} />);
  });
  describe("Test autographa projects and files in it.", () => {
    test("First project should be Malyalam", async () => {
      render(<Sync projects={projects} />);
      const agProjects = document.querySelector("#project-id");
      expect(agProjects.textContent).toBe("Project Malayalam");
    });
    test("Project Arabic should have 6 files", async () => {
      render(<Sync projects={projects} />);
      const agFiles = document.querySelector("#project-id");
      await act(async () => {
        fireEvent.change(agFiles, { target: { index: 1 } });
      });
      expect(projects[agFiles.index].files.length).toBe(6);
    });
  });
});
