// import { Tooltip } from "./Tooltip";
import { DOMHelper } from "../Utility/DOMHelper";

export class ProjectItem {
  // this.hasActiveTooltip = false;

  //Receives Project id , the switchProject method, project's  current type
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.hasActiveTooltip = false;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
    this.connectDrag();
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    import("./Tooltip").then((module) => {
      const tooltip = new module.Tooltip(
        () => {
          this.hasActiveTooltip = false;
        },
        tooltipText,
        this.id
      );
      tooltip.attach();
      this.hasActiveTooltip = true;
    });
  }

  //Find the project element and
  //then the  more info button of then project and
  //then add click handler
  connectMoreInfoButton() {
    // that triggers showMoreInfoHandler function
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      "button:first-of-type"
    );
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }

  // Finds the project element
  // and then the last button in it
  // and clears event listners on it
  // updates text on the button
  // adds click listners updateProjectListsHandler
  // (which is switchProject of active-project-list passed during project-item instance creation)
  connectSwitchButton(type) {
    console.log("Inside connectSwitchButton with type", type);
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    console.log(
      "Change textContent on button to ",
      type === "active" ? "Finish" : "Activate"
    );
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    switchBtn.addEventListener(
      "click",
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  connectDrag() {
    //Add dragstart event listner on project
    //Use setData to add info ie id to the event as a text
    //Mention the effect for drag event
    const projectItem = document.getElementById(this.id);
    projectItem.addEventListener("dragstart", (event) => {
      console.log("Inside dragstart ", event);
      event.dataTransfer.setData("text/plain", this.id);
      event.dataTransfer.effectAllowed = "move";
    });

    projectItem.addEventListener("dragend", (event) => {
      console.log("On dragend", event);
      //event.dataTransfer is none if dropped in a un-droppable area
      //event.dataTransfer.dropeffect is move if dropped successfully
    });
  }

  updateItem(updateProjectListsFn, type) {
    console.log(
      "Inside update item with updateProjectListsFn ",
      updateProjectListsFn.name,
      " and type",
      type
    );
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}
