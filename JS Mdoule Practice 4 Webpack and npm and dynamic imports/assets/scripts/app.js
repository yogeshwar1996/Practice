/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".app.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/scripts/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App/ProjectItem.js":
/*!********************************!*\
  !*** ./src/App/ProjectItem.js ***!
  \********************************/
/*! exports provided: ProjectItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProjectItem\", function() { return ProjectItem; });\n/* harmony import */ var _Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/DOMHelper */ \"./src/Utility/DOMHelper.js\");\n// import { Tooltip } from \"./Tooltip\";\n\n\nclass ProjectItem {\n  // this.hasActiveTooltip = false;\n\n  //Receives Project id , the switchProject method, project's  current type\n  constructor(id, updateProjectListsFunction, type) {\n    this.id = id;\n    this.hasActiveTooltip = false;\n    this.updateProjectListsHandler = updateProjectListsFunction;\n    this.connectMoreInfoButton();\n    this.connectSwitchButton(type);\n    this.connectDrag();\n  }\n\n  showMoreInfoHandler() {\n    if (this.hasActiveTooltip) {\n      return;\n    }\n    const projectElement = document.getElementById(this.id);\n    const tooltipText = projectElement.dataset.extraInfo;\n    __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./Tooltip */ \"./src/App/Tooltip.js\")).then((module) => {\n      const tooltip = new module.Tooltip(\n        () => {\n          this.hasActiveTooltip = false;\n        },\n        tooltipText,\n        this.id\n      );\n      tooltip.attach();\n      this.hasActiveTooltip = true;\n    });\n  }\n\n  //Find the project element and\n  //then the  more info button of then project and\n  //then add click handler\n  connectMoreInfoButton() {\n    // that triggers showMoreInfoHandler function\n    const projectItemElement = document.getElementById(this.id);\n    const moreInfoBtn = projectItemElement.querySelector(\n      \"button:first-of-type\"\n    );\n    moreInfoBtn.addEventListener(\"click\", this.showMoreInfoHandler.bind(this));\n  }\n\n  // Finds the project element\n  // and then the last button in it\n  // and clears event listners on it\n  // updates text on the button\n  // adds click listners updateProjectListsHandler\n  // (which is switchProject of active-project-list passed during project-item instance creation)\n  connectSwitchButton(type) {\n    console.log(\"Inside connectSwitchButton with type\", type);\n    const projectItemElement = document.getElementById(this.id);\n    let switchBtn = projectItemElement.querySelector(\"button:last-of-type\");\n    switchBtn = _Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_0__[\"DOMHelper\"].clearEventListeners(switchBtn);\n    console.log(\n      \"Change textContent on button to \",\n      type === \"active\" ? \"Finish\" : \"Activate\"\n    );\n    switchBtn.textContent = type === \"active\" ? \"Finish\" : \"Activate\";\n    switchBtn.addEventListener(\n      \"click\",\n      this.updateProjectListsHandler.bind(null, this.id)\n    );\n  }\n\n  connectDrag() {\n    //Add dragstart event listner on project\n    //Use setData to add info ie id to the event as a text\n    //Mention the effect for drag event\n    const projectItem = document.getElementById(this.id);\n    projectItem.addEventListener(\"dragstart\", (event) => {\n      console.log(\"Inside dragstart \", event);\n      event.dataTransfer.setData(\"text/plain\", this.id);\n      event.dataTransfer.effectAllowed = \"move\";\n    });\n\n    projectItem.addEventListener(\"dragend\", (event) => {\n      console.log(\"On dragend\", event);\n      //event.dataTransfer is none if dropped in a un-droppable area\n      //event.dataTransfer.dropeffect is move if dropped successfully\n    });\n  }\n\n  updateItem(updateProjectListsFn, type) {\n    console.log(\n      \"Inside update item with updateProjectListsFn \",\n      updateProjectListsFn.name,\n      \" and type\",\n      type\n    );\n    this.updateProjectListsHandler = updateProjectListsFn;\n    this.connectSwitchButton(type);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/App/ProjectItem.js?");

/***/ }),

/***/ "./src/App/ProjectList.js":
/*!********************************!*\
  !*** ./src/App/ProjectList.js ***!
  \********************************/
/*! exports provided: ProjectList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProjectList\", function() { return ProjectList; });\n/* harmony import */ var _ProjectItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectItem */ \"./src/App/ProjectItem.js\");\n/* harmony import */ var _Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/DOMHelper */ \"./src/Utility/DOMHelper.js\");\n\n\n\nclass ProjectList {\n  // projects = [];\n\n  constructor(type) {\n    this.type = type;\n    this.projects = [];\n    const prjItems = document.querySelectorAll(`#${type}-projects li`);\n    for (const prjItem of prjItems) {\n      this.projects.push(\n        //Creata a project item of type active\n        //pass project id active instance's switch project method, type i.e active\n        new _ProjectItem__WEBPACK_IMPORTED_MODULE_0__[\"ProjectItem\"](prjItem.id, this.switchProject.bind(this), this.type)\n      );\n    }\n    this.connectDroppable();\n  }\n\n  connectDroppable() {\n    const list = document.querySelector(`#${this.type}-projects ul`);\n    list.addEventListener(\"dragenter\", (event) => {\n      console.log(\"inside drag eneter\");\n      if (event.dataTransfer.types[0] === \"text/plain\") {\n        //Following will highlight the list where item is being dragged\n        list.parentElement.classList.add(\"droppable\");\n        event.preventDefault();\n      }\n    });\n    list.addEventListener(\"dragover\", (event) => {\n      console.log(\"inside drag over\");\n      if (event.dataTransfer.types[0] === \"text/plain\") {\n        list.parentElement.classList.add(\"droppable\");\n        event.preventDefault();\n      }\n    });\n\n    list.addEventListener(\"dragleave\", (event) => {\n      console.log(\"inside dragleave\");\n      //Following will remove  class highlighting the list if the project dragged goes out of it\n      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {\n        list.parentElement.classList.remove(\"droppable\");\n      }\n    });\n\n    list.addEventListener(\"drop\", (event) => {\n      console.log(\"inside drop\");\n      const projectId = event.dataTransfer.getData(\"text/plain\");\n      if (this.projects.find((p) => p.id == [projectId])) {\n        //if dropped project is in the current list only do nothing\n      } else {\n        //move the element to the other list which we can do by triggering clicking on the finish button\n        document\n          .getElementById(projectId)\n          .querySelector(\"button:last-of-type\")\n          .click();\n      }\n      //No matter dropped in the current list or the other list we still want to remove the highlighted background upon dropping the project\n      list.parentElement.classList.remove(\"droppable\");\n    });\n  }\n\n  //Assigns a function to callback\n  setSwitchHandlerFunction(switchHandlerFunction) {\n    //Assuming this is for active-project-list\n    //active-project-list.switchHandler = finished-project-list.addProject.bind(finished-project-list)\n    this.switchHandler = switchHandlerFunction;\n  }\n\n  //adds to the other list and performs dom movement and updates something (TODO)\n  addProject(project) {\n    // if current instance is active-project-list\n    // this here means finished-project-list and vice-versa\n    console.log(\n      \"Inside add project of type \",\n      this.type,\n      \" with project corsp to projectId \",\n      project.id\n    );\n\n    // push the project-item to finished-project-list.projects\n    console.log(this.type, \" Projects before \", this.projects);\n    this.projects.push(project);\n    console.log(this.type, \" Projects after \", this.projects);\n    //Perform the dom movement\n    _Utility_DOMHelper__WEBPACK_IMPORTED_MODULE_1__[\"DOMHelper\"].moveElement(project.id, `#${this.type}-projects ul`);\n    // trigger  project-item.updateItem with `this` now being finished-project\n    // with arguments\n    // 1. switch-project method from the finished-project-list instance\n    // 2. type of instance i.e finished\n    console.log(\"Calling update item on project \", project.id);\n    project.updateItem(this.switchProject.bind(this), this.type);\n  }\n\n  //Triggers callback method to add into other list and remove from current list\n  switchProject(projectId) {\n    //Here this is active-projects-list instance\n    console.log(\n      \"Inside switch project of \",\n      this.type,\n      \" with project id \",\n      projectId\n    );\n    // Trigger active-projects-list.switchHandler which is finished-projects-list.addProject\n    // Find and Pass the active-project as argument to func call based on project id\n    let project = this.projects.find((p) => p.id === projectId);\n    console.log(\n      \"Calling switch handler of \",\n      this.type,\n      \" with project corsp to projectId\",\n      projectId\n    );\n    this.switchHandler(project);\n    // update the active-projects-list and do not include the project of given id\n    this.projects = this.projects.filter((p) => p.id !== projectId);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/App/ProjectList.js?");

/***/ }),

/***/ "./src/Utility/DOMHelper.js":
/*!**********************************!*\
  !*** ./src/Utility/DOMHelper.js ***!
  \**********************************/
/*! exports provided: DOMHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMHelper\", function() { return DOMHelper; });\nclass DOMHelper {\n  static clearEventListeners(element) {\n    const clonedElement = element.cloneNode(true);\n    element.replaceWith(clonedElement);\n    return clonedElement;\n  }\n\n  static moveElement(elementId, newDestinationSelector) {\n    const element = document.getElementById(elementId);\n    const destinationElement = document.querySelector(newDestinationSelector);\n    destinationElement.append(element);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/Utility/DOMHelper.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App/ProjectList */ \"./src/App/ProjectList.js\");\n/*\nIn this project you learn implementing classes, \ncreating object instances,\ninheritance, \nadding removing event listners\npassing functions as arguments, ie callbacks\n*/\n\n\nclass App {\n  static init() {\n    const activeProjectsList = new _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__[\"ProjectList\"](\"active\");\n    const finishedProjectsList = new _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__[\"ProjectList\"](\"finished\");\n    activeProjectsList.setSwitchHandlerFunction(\n      finishedProjectsList.addProject.bind(finishedProjectsList)\n    );\n    finishedProjectsList.setSwitchHandlerFunction(\n      activeProjectsList.addProject.bind(activeProjectsList)\n    );\n  }\n}\n\nApp.init();\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });