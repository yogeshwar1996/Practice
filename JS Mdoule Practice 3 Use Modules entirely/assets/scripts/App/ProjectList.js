import { ProjectItem } from "./ProjectItem.js";
import { DOMHelper } from "../Utility/DOMHelper.js";

export class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        //Creata a project item of type active
        //pass project id active instance's switch project method, type i.e active
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);
    list.addEventListener("dragenter", (event) => {
      console.log("inside drag eneter");
      if (event.dataTransfer.types[0] === "text/plain") {
        //Following will highlight the list where item is being dragged
        list.parentElement.classList.add("droppable");
        event.preventDefault();
      }
    });
    list.addEventListener("dragover", (event) => {
      console.log("inside drag over");
      if (event.dataTransfer.types[0] === "text/plain") {
        list.parentElement.classList.add("droppable");
        event.preventDefault();
      }
    });

    list.addEventListener("dragleave", (event) => {
      console.log("inside dragleave");
      //Following will remove  class highlighting the list if the project dragged goes out of it
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove("droppable");
      }
    });

    list.addEventListener("drop", (event) => {
      console.log("inside drop");
      const projectId = event.dataTransfer.getData("text/plain");
      if (this.projects.find((p) => p.id == [projectId])) {
        //if dropped project is in the current list only do nothing
      } else {
        //move the element to the other list which we can do by triggering clicking on the finish button
        document
          .getElementById(projectId)
          .querySelector("button:last-of-type")
          .click();
      }
      //No matter dropped in the current list or the other list we still want to remove the highlighted background upon dropping the project
      list.parentElement.classList.remove("droppable");
    });
  }

  //Assigns a function to callback
  setSwitchHandlerFunction(switchHandlerFunction) {
    //Assuming this is for active-project-list
    //active-project-list.switchHandler = finished-project-list.addProject.bind(finished-project-list)
    this.switchHandler = switchHandlerFunction;
  }

  //adds to the other list and performs dom movement and updates something (TODO)
  addProject(project) {
    // if current instance is active-project-list
    // this here means finished-project-list and vice-versa
    console.log(
      "Inside add project of type ",
      this.type,
      " with project corsp to projectId ",
      project.id
    );

    // push the project-item to finished-project-list.projects
    console.log(this.type, " Projects before ", this.projects);
    this.projects.push(project);
    console.log(this.type, " Projects after ", this.projects);
    //Perform the dom movement
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    // trigger  project-item.updateItem with `this` now being finished-project
    // with arguments
    // 1. switch-project method from the finished-project-list instance
    // 2. type of instance i.e finished
    console.log("Calling update item on project ", project.id);
    project.updateItem(this.switchProject.bind(this), this.type);
  }

  //Triggers callback method to add into other list and remove from current list
  switchProject(projectId) {
    //Here this is active-projects-list instance
    console.log(
      "Inside switch project of ",
      this.type,
      " with project id ",
      projectId
    );
    // Trigger active-projects-list.switchHandler which is finished-projects-list.addProject
    // Find and Pass the active-project as argument to func call based on project id
    let project = this.projects.find((p) => p.id === projectId);
    console.log(
      "Calling switch handler of ",
      this.type,
      " with project corsp to projectId",
      projectId
    );
    this.switchHandler(project);
    // update the active-projects-list and do not include the project of given id
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}
