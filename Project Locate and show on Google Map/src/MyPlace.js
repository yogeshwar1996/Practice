import { Map } from "./UI/Map.js";
class ShowMyLocation {
  constructor(coordinates, address) {
    console.log("coordinates and address are ", coordinates, address);
    //set address
    const headingElement = document.querySelector("header h1");
    headingElement.textContent = address;

    //Show map
    new Map(coordinates);
  }
}

const googleAPIKey = localStorage.getItem("googleAPIKey");
const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}`;
document.head.append(script);

script.onload = function () {
// We can acccesss URL using location.href and create a URL object
const url = new URL(location.href);
const queryParams = url.searchParams;
const coordinates = {
  lat: +queryParams.get("lat"), //  + converts string to number
  lng: +queryParams.get("lng"),
};
const address = queryParams.get("address");
//coordinates and address are present in the URL
new ShowMyLocation(coordinates, address);

}
