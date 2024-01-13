import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    this.addressInput = document.getElementById("address-input");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");
    this.googleAPIKeyButton = document.getElementById("google-map-api-key-submission-btn");
    this.sharedLinkInputElement = document.getElementById("share-link");
    this.googleAPIKeyInputElement = document.getElementById("google-map-api-key-input");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    this.googleAPIKeyInputElement.addEventListener("input", () => {
      const googleAPIKey = this.googleAPIKeyInputElement.value;
      if (googleAPIKey && googleAPIKey.trim().length > 0) {
        this.googleAPIKeyButton.disabled = false;
      }else{
        this.googleAPIKeyButton.disabled = true;
      }
    });
    this.googleAPIKeyButton.addEventListener("click", () => {
      const googleAPIKey = this.googleAPIKeyInputElement.value;
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}`;
      document.head.append(script);
      localStorage.setItem('googleAPIKey', googleAPIKey)
    });
  }

  selectPlace(coordinates, address) {
    console.log("Coordinated are ", coordinates);
    console.log("Address is ", address);
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;

    this.sharedLinkInputElement.value = `${
      location.origin
    }/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${
      coordinates.lng
    }`;
  }

  sharePlaceHandler() {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard
      .writeText(this.sharedLinkInputElement.value)
      .then(() => alert("Copied into clipboard"))
      .catch((err) => {
        console.log("Error copying to clipboard ", err);
      });
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Location feature is not available in your browser - please use a more modern browser or manually enter an address."
      );
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait!"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        let address;
        try {
          address = await getAddressFromCoords(coordinates);
          this.addressInput.value = address;
          this.selectPlace(coordinates, address);
        } catch (err) {
          console.log("Error getting address from coordinates ", err);
        }
        modal.hide();
      },
      (error) => {
        modal.hide();
        alert(
          "Could not locate you unfortunately. Please enter an address manually!"
        );
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("Invalid address entered - please try again!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait!"
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

const googleAPIKey = localStorage.getItem("googleAPIKey");
const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}`;
document.head.append(script);

script.onload = function () {
  console.log("Google Script loaded for Shareplace.js")
  const placeFinder = new PlaceFinder();
}
