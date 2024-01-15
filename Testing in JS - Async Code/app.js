import { printTitle } from "./utils";

const button = document.querySelector('button');

button.addEventListener('click', printTitle);

exports.printTitle = printTitle;
