//--------------------- online offLine1------------------------
let isSwitchOn = false;
const toggleButton = document.getElementById("toggleButton");

function toggleSwitch() {
  isSwitchOn = !isSwitchOn;
  toggleButton.textContent = isSwitchOn ? "Switch On" : "Switch Off";
  sendSwitchState(isSwitchOn);
  updateBulbImage(isSwitchOn);
}

function sendSwitchState(isSwitchOn) {
  const apiUrl = "http://cbsiot.live/utkarsh/light.php";
  const requestData = {
    "light": "l1",
    "type": "update",
    "value": isSwitchOn ? "on" : "off"
  };

  // Send a POST request to the API
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  })
    .then(response => {
      if (response.ok) {
        console.log("Switch state sent successfully.");
      } else {
        console.error("Failed to send switch state.");
      }
    })
    .catch(error => {
      console.error("Error: " + error);
    });
}
toggleButton.addEventListener("click", toggleSwitch);
const urlon = "http://cbsiot.live/utkarsh/api.php";
function fetchDataAndRefresh() {
  const dataon = {
    "operation": "read",
    "data": "light"
  };

  fetch(urlon, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataon)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const lastData = data[data.length - 1];
        if (lastData.l1_update !== undefined) {
          const l1_update = lastData.l1_update;

          
          if (l1_update === "on") {
            document.getElementById('bulb').src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
          } else if (l1_update === "off") {
            document.getElementById('bulb').src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
          } else {
            console.error("Invalid value for 'l1_update'. Expected 'on' or 'off'.");
          }
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
setInterval(fetchDataAndRefresh, 2000);

//--------------------- online offLine2------------------------

let isSwitch = false;
const toggle = document.getElementById("toggleButton2");

function toggle2() {
  isSwitch = !isSwitch;
  toggle.textContent = isSwitch ? "Switch On" : "Switch Off";
  sendSwitch(isSwitch); // Change from updateBulbImage to sendSwitch
}

function sendSwitch(isSwitch) {
  const api = "http://cbsiot.live/utkarsh/light.php";
  const request = {
    "light": "l2",
    "type": "update",
    "value": isSwitch ? "on" : "off"
  };

  // Send a POST request to the API
  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  })
    .then(response => {
      if (response.ok) {
        console.log("Switch state sent successfully.");
      } else {
        console.error("Failed to send switch state.");
      }
    })
    .catch(error => {
      console.error("Error: " + error);
    });
}
toggle.addEventListener("click", toggle2);


const urlon2 = "http://cbsiot.live/utkarsh/api.php";
function fetchDataAndRefresh2() {
  const dataon2 = {
    "operation": "read",
    "data": "light"
  };

  fetch(urlon2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataon2)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const lastData = data[data.length - 1];
        if (lastData.l2_update !== undefined) {
          const l2_update = lastData.l2_update;

         
          if (l2_update === "on") {
            document.getElementById('bulb2').src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
          } else if (l2_update === "off") {
            document.getElementById('bulb2').src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
          } else {
            console.error("Invalid value for 'l2_update'. Expected 'on' or 'off'.");
          }
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
setInterval(fetchDataAndRefresh2, 2000);

//--------------------- online offLine3------------------------
let isSwitch3 = false;
const toggleButton3 = document.getElementById("toggleButton3");
const bulbImage3 = document.getElementById("bulb3");

function toggleSwitch3() {
  isSwitch3 = !isSwitch3;
  toggleButton3.textContent = isSwitch3 ? "Switch On" : "Switch Off";
  sendSwitch3(isSwitch3);

  // Update the bulb image based on the switch state
  if (isSwitch3) {
    bulbImage3.src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
  } else {
    bulbImage3.src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
  }
}

function sendSwitch3(isSwitch3) {
  const apiUrl3 = "http://cbsiot.live/utkarsh/light.php";
  const requestData3 = {
    "light": "l3",
    "type": "update",
    "value": isSwitch3 ? "on" : "off"
  };

  // Send a POST request to the API
  fetch(apiUrl3, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData3)
  })
    .then(response => {
      if (response.ok) {
        console.log("Switch state sent successfully.");
      } else {
        console.error("Failed to send switch state.");
      }
    })
    .catch(error => {
      console.error("Error: " + error);
    });
}

toggleButton3.addEventListener("click", toggleSwitch3);

const urlp3 = "http://cbsiot.live/utkarsh/api.php";

function fetchDataAndRefreshpowerstatus() {
  const dataps = {
    "operation": "read",
    "data": "light"
  };

  fetch(urlp3, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataps)
  })
    .then(response => {
      if (!response.ok) {
        throw Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const lastData = data[data.length - 1];
        if (lastData.l3_update !== undefined) {
          const l3_update = parseFloat(lastData.l3_update);
          if (!isNaN(l3_update)) {
           

            //--------------------------------------------------
            
            if (l3_update === "on") {
              bulbImage3.src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
            } else if (l3_update === "off") {
              bulbImage3.src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
            } else {
              console.error("Invalid value for 'l3_update'. Expected 'on' or 'off'.");
            }
            //---------------------------------------------------

          } else {
            console.error("Property is not a valid number.");
          }
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Fetch data and refresh at regular intervals (e.g., every 2000 ms)
setInterval(fetchDataAndRefreshpowerstatus, 2000);


//--------------------- online offLine4------------------------
let isSwitch4 = false;
const toggleButton4 = document.getElementById("toggleButton4");
const bulbImage4 = document.getElementById("bulb4");

function toggleSwitch4() {
  isSwitch4 = !isSwitch4;
  toggleButton4.textContent = isSwitch4 ? "Switch On" : "Switch Off";
  sendSwitch4(isSwitch4);

  // Update the bulb image based on the switch state
  if (isSwitch4) {
    bulbImage4.src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
  } else {
    bulbImage4.src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
  }
}

function sendSwitch4(isSwitch4) {
  const apiUrl4 = "http://cbsiot.live/utkarsh/light.php";
  const requestData4 = {
    "light": "l4",
    "type": "update",
    "value": isSwitch4 ? "on" : "off"
  };

  // Send a POST request to the API
  fetch(apiUrl4, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData4)
  })
    .then(response => {
      if (response.ok) {
        console.log("Switch state sent successfully.");
      } else {
        console.error("Failed to send switch state.");
      }
    })
    .catch(error => {
      console.error("Error: " + error);
    });
}

toggleButton4.addEventListener("click", toggleSwitch4);

const urlp4 = "http://cbsiot.live/utkarsh/api.php";

function fetchDataAndRefreshPowerStatus4() {
  const dataPower4 = {
    "operation": "read",
    "data": "light"
  };

  fetch(urlp4, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataPower4)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const lastData = data[data.length - 1];
        if (lastData.l4_update !== undefined) {
          const l4_update = parseFloat(lastData.l4_update);
          if (!isNaN(l4_update)) {
           
            // Update the bulb image based on the power status
            if (l4_update === "on") {
              bulbImage4.src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
            } else if (l4_update === "off") {
              bulbImage4.src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
            } else {
              console.error("Invalid value for 'l4_update'. Expected 'on' or 'off'.");
            }
          } else {
            console.error("Property is not a valid number.");
          }
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Fetch data and refresh at regular intervals (e.g., every 2000 ms)
setInterval(fetchDataAndRefreshPowerStatus4, 2000);

//--------------------- online offLine5------------------------

let isSwitch5 = false;
const toggleButton5 = document.getElementById("toggleButton5");
const bulbImage5 = document.getElementById("bulb5");

function toggleSwitch5() {
  isSwitch5 = !isSwitch5;
  toggleButton5.textContent = isSwitch5 ? "Switch On" : "Switch Off";
  sendSwitch5(isSwitch5);

  // Update the bulb image based on the switch state
  if (isSwitch5) {
    bulbImage5.src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
  } else {
    bulbImage5.src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
  }
}

function sendSwitch5(isSwitch5) {
  const apiUrl5 = "http://cbsiot.live/utkarsh/light.php";
  const requestData5 = {
    "light": "l5",
    "type": "update",
    "value": isSwitch5 ? "on" : "off"
  };

  // Send a POST request to the API
  fetch(apiUrl5, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData5)
  })
    .then(response => {
      if (response.ok) {
        console.log("Switch state sent successfully.");
      } else {
        console.error("Failed to send switch state.");
      }
    })
    .catch(error => {
      console.error("Error: " + error);
    });
}

toggleButton5.addEventListener("click", toggleSwitch5);

const urlp5 = "http://cbsiot.live/utkarsh/api.php";

function fetchDataAndRefreshPowerStatus5() {
  const dataPower5 = {
    "operation": "read",
    "data": "light"
  };

  fetch(urlp5, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataPower5)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const lastData = data[data.length - 1];
        if (lastData.l5_update !== undefined) {
          const l5_update = parseFloat(lastData.l5_update);
          if (!isNaN(l5_update)) {
           
            // Update the bulb image based on the power status
            if (l5_update === "on") {
              bulbImage5.src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
            } else if (l5_update === "off") {
              bulbImage5.src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
            } else {
              console.error("Invalid value for 'l5_update'. Expected 'on' or 'off'.");
            }
          } else {
            console.error("Property is not a valid number.");
          }
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Fetch data and refresh at regular intervals (e.g., every 2000 ms)
setInterval(fetchDataAndRefreshPowerStatus5, 2000);

//--------------------- online offLine6------------------------
let isSwitch6 = false;
const toggleButton6 = document.getElementById("toggleButton6");
const bulbImage6 = document.getElementById("bulb6");

function toggleSwitch6() {
  isSwitch6 = !isSwitch6;
  toggleButton6.textContent = isSwitch6 ? "Switch On" : "Switch Off";
  sendSwitch6(isSwitch6);

  // Update the bulb image based on the switch state
  if (isSwitch6) {
    bulbImage6.src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
  } else {
    bulbImage6.src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
  }
}

function sendSwitch6(isSwitch6) {
  const apiUrl6 = "http://cbsiot.live/utkarsh/light.php";
  const requestData6 = {
    "light": "l6",
    "type": "update",
    "value": isSwitch6 ? "on" : "off"
  };

  // Send a POST request to the API
  fetch(apiUrl6, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData6)
  })
    .then(response => {
      if (response.ok) {
        console.log("Switch state sent successfully.");
      } else {
        console.error("Failed to send switch state.");
      }
    })
    .catch(error => {
      console.error("Error: " + error);
    });
}

toggleButton6.addEventListener("click", toggleSwitch6);

const urlp6 = "http://cbsiot.live/utkarsh/api.php";

function fetchDataAndRefreshPowerStatus6() {
  const dataPower6 = {
    "operation": "read",
    "data": "light"
  };

  fetch(urlp6, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataPower6)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const lastData = data[data.length - 1];
        if (lastData.l6_update !== undefined) {
          const l6_update = parseFloat(lastData.l6_update);
          if (!isNaN(l6_update)) {
           
            // Update the bulb image based on the power status
            if (l6_update === "on") {
              bulbImage6.src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
            } else if (l6_update === "off") {
              bulbImage6.src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
            } else {
              console.error("Invalid value for 'l6_update'. Expected 'on' or 'off'.");
            }
          } else {
            console.error("Property is not a valid number.");
          }
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Fetch data and refresh at regular intervals (e.g., every 2000 ms)
setInterval(fetchDataAndRefreshPowerStatus6, 2000);

// --------------------- light box end------------------------ 