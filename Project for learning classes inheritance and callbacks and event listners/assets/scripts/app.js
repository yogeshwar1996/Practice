/*
In this project you learn implementing classes, 
creating object instances,
inheritance, 
adding removing event listners
passing functions as arguments, ie callbacks
*/

class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    console.log('hostElementId, insertBefore ', hostElementId, insertBefore)
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element);
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);  
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);
    
    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px'; // 500px
    tooltipElement.style.top = y + 'px';
    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  //Receives Project id , the switchProject method, project's  current type
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    }, tooltipText, this.id);
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  //Find the project element and 
  //then the  more info button of then project and
  //then add click handler
  connectMoreInfoButton() {
    // that triggers showMoreInfoHandler function
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      'button:first-of-type'
    );
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  // Finds the project element 
  // and then the last button in it
  // and clears event listners on it
  // updates text on the button
  // adds click listners updateProjectListsHandler 
  // (which is switchProject of active-project-list passed during project-item instance creation)
  connectSwitchButton(type) {
    console.log("Inside connectSwitchButton with type", type)
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    console.log("Change textContent on button to ",  type === 'active' ? 'Finish' : 'Activate')
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  updateItem(updateProjectListsFn, type) {
    console.log("Inside update item with updateProjectListsFn ", updateProjectListsFn.name , ' and type', type)
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
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
    console.log("Inside add project of type " ,this.type, " with project corsp to projectId ", project.id)
    
    // push the project-item to finished-project-list.projects
    console.log(this.type , " Projects before ", this.projects)
    this.projects.push(project); 
    console.log(this.type , " Projects after ", this.projects)
    //Perform the dom movement
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    // trigger  project-item.updateItem with `this` now being finished-project
    // with arguments 
    // 1. switch-project method from the finished-project-list instance
    // 2. type of instance i.e finished
    console.log("Calling update item on project ", project.id)
    project.updateItem(this.switchProject.bind(this), this.type);
  }

  //Triggers callback method to add into other list and remove from current list
  switchProject(projectId) {
    //Here this is active-projects-list instance
    console.log("Inside switch project of " ,this.type, " with project id ", projectId)
    // Trigger active-projects-list.switchHandler which is finished-projects-list.addProject
    // Find and Pass the active-project as argument to func call based on project id
    let project = this.projects.find(p => p.id === projectId)
    console.log("Calling switch handler of ", this.type, " with project corsp to projectId", projectId)
    this.switchHandler(project);
    // update the active-projects-list and do not include the project of given id
    this.projects = this.projects.filter(p => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
}

App.init();
