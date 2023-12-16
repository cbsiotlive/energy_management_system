$(function () {

  $(document).on("click", function (e) {
    var $item = $(".rad-dropmenu-item");
    if ($item.hasClass("active")) {
      $item.removeClass("active");
    }
  });

  $(".rad-toggle-btn").on('click', function () {
    $(".rad-sidebar").toggleClass("rad-nav-min");
    $(".rad-body-wrapper").toggleClass("rad-nav-min");
    setTimeout(function () {
      initializeCharts();
    }, 200);
  });

  $(".rad-dropdown >.rad-menu-item").on('click', function (e) {
    e.stopPropagation();
    $(".rad-dropmenu-item").removeClass("active");
    $(this).next(".rad-dropmenu-item").toggleClass("active");
  });

  $(window).resize(function () {
    $.throttle(250, setTimeout(function () {
      initializeCharts();
    }, 200));
  });

  var colors = [
    '#E94B3B',
    '#39C7AA',
    '#1C7EBB',
    '#F98E33'
  ];

  var panelList = $('.row');

  panelList.sortable({
    handle: '.row',
    update: function () {
      $('.panel', panelList).each(function (index, elem) {
        var $listItem = $(elem),
          newIndex = $listItem.index();
      });
    }
  });


});
//-------------------------------------------------------------------------

 document.getElementById('inputState').addEventListener('change', function () {
        // Get the selected option value
        var selectedOption = this.value;

        // Update the card text based on the selected option
        document.getElementById('Airdata').style.display = (selectedOption === 'Air data') ? 'block' : 'none';
        document.getElementById('Weather').style.display = (selectedOption === 'Weather data') ? 'block' : 'none';
    });

//-------------------------------------------------------------------------
const urln = "//cbsiot.live/utkarsh/api.php";
function fetchDataAndRefreshChart() {
const requestData = {
  "operation": "read",
  "data": "aqms"
};

// Fetch the data from the URL
fetch(urln, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(requestData)
})
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(responseData => {
    if (Array.isArray(responseData) && responseData.length > 0) {
      const lastData = responseData[responseData.length - 1];

      // Define default values or handle missing properties gracefully
      const so2Value = lastData.so2 !== undefined ? lastData.so2 : 0;
      const no2Value = lastData.no2 !== undefined ? lastData.no2 : 0;
      const noValue = lastData.no !== undefined ? lastData.no : 0;
      const coValue = lastData.co !== undefined ? lastData.co : 0;
      const o3Value = lastData.o3 !== undefined ? lastData.o3 : 0;
      const pm2_5Value = lastData.pm2_5 !== undefined ? lastData.pm2_5 : 0;
      const pm10Value = lastData.pm10 !== undefined ? lastData.pm10 : 0;
      const nh3Value = lastData.nh3 !== undefined ? lastData.nh3 : 0;

      am4core.ready(function () {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0;
        chart.data = [
          {
            country: "SO2",
            visits: so2Value
          },
          {
            country: "NO2",
            visits: no2Value
          },
        //   {
        //     country: "NO",
        //     visits: noValue
        //   },
          {
            country: "CO",
            visits: coValue
          },
          {
            country: "O3",
            visits: o3Value
          },
          {
            country: "PM2_5",
            visits: pm2_5Value
          },
          {
            country: "PM10",
            visits: pm10Value
          },
        //   {
        //     country: "NH3",
        //     visits: nh3Value
        //   },
          
        ];

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.minGridDistance = 40;
        categoryAxis.fontSize = 11;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.max = 1200;
        valueAxis.strictMinMax = true;
        valueAxis.renderer.minGridDistance = 30;

        var axisBreak = valueAxis.axisBreaks.create();
        axisBreak.startValue = 2100;
        axisBreak.endValue = 22900;


        var d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
        axisBreak.breakSize = 0.05 * (1 - d) / d;

        var hoverState = axisBreak.states.create("hover");
        hoverState.properties.breakSize = 1;
        hoverState.properties.opacity = 0.1;
        hoverState.transitionDuration = 1500;

        axisBreak.defaultState.transitionDuration = 1000;


        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "country";
        series.dataFields.valueY = "visits";
        series.columns.template.tooltipText = "{valueY.value}";
        series.columns.template.tooltipY = 0;
        series.columns.template.strokeOpacity = 0;

        series.columns.template.adapter.add("fill", function (fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
        });

      });
    } else {
      console.error("No data or empty array received from the server");
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

fetchDataAndRefreshChart();
setInterval(fetchDataAndRefreshChart,300000);
//-------------------------------------------------------------------------
  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiUrlda = 'https://api.openweathermap.org/data/2.5/weather?lat=23.21164844388676&lon=72.64130812525333&appid=5bda7be1f4da2547c2b55d813d6da263';

    // Function to update HTML content with data
    function updateHtmlContent(data) {
        // Check if data and main property exist
        if (data && data.main) {
            // Extract values
            const humidity = data.main.humidity;
            const temp = data.main.temp-272.00999999999999;
            const pressure = data.main.pressure;

            // Update HTML content 120000000000005
            document.getElementById('humidity').textContent = humidity +'%';
            document.getElementById('temperature').textContent = temp +'°C';
            document.getElementById('pressure').textContent = pressure +'hpa';
        } else {
            // Handle the case where the expected properties are not available
            console.error('Error: Invalid or missing data structure.');
        }
    }

    // Fetch data from the OpenWeatherMap API
    fetch(apiUrlda)
        .then(response => response.json())
        .then(data => {
            // Update HTML content with data
            updateHtmlContent(data);
        })
        .catch(error => console.error('Error fetching data:', error));
        

//------------------------------------------------------------------------

//  --------------------- Solar battery------------------------
const urlb = "//cbsiot.live/utkarsh/api.php";
function fetchDataAndRefreshbattery() {
  const datab = {
    "operation": "read",
    "data": "energy"
  };

  fetch(urlb, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datab)
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
        if (lastData.battery_percentage !== undefined) {
          const battery_percentage = parseFloat(lastData.battery_percentage);
          if (!isNaN(battery_percentage)) {
            console.log('battery level: ' + battery_percentage);

            //-------------------------------------------------- 

            const val = battery_percentage;
            const [level, fill] = document.querySelectorAll('.level, .fill');

            const colors = {
              high: '#59ef0b',
              normal: '#d76a04',
              low: '#e70707'
            }

            const incBattery = batt => {
              const battlevel = (batt > 75 ? 'high' : (batt < 15 ? 'low' : 'normal'));
              fill.style.setProperty('--batteryLevel', `${~~batt}%`);
              fill.style.setProperty('--batteryColor', colors[battlevel]);
              level.dataset.level = fill.style.height = ``;
            }

            incBattery(val);

            if (val < 15) {
              level.classList.add('power');
            } else {
              level.classList.remove('power');
            }

            var element = document.getElementById("intValue");
            var value = val + "%";
            element.textContent = value;
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
setInterval(fetchDataAndRefreshbattery, 2000);
//---------------------power status------------------------------
const urlps = "//cbsiot.live/utkarsh/api.php";
function fetchDataAndRefreshpowerstatus() {
  const dataps = {
    "operation": "read",
    "data": "energy"
  };

  fetch(urlps, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataps)
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
        if (lastData.mains_status !== undefined) {
          const mains_status = parseFloat(lastData.mains_status);
          if (!isNaN(mains_status)) {
            console.log('power : ' + mains_status);

            //--------------------------------------------------
            let isPowerOn = mains_status;

            function togglePower() {
              isPowerOn = !isPowerOn; // Toggle the power status

              const powerStatusElement = document.getElementById("powerStatus");

              if (isPowerOn == 0) {
                powerStatusElement.innerHTML = "ON";
                powerStatusElement.style.color = "green";
              } else {
                powerStatusElement.textContent = "Off";
                powerStatusElement.style.color = "red";
              }
            }
            togglePower();
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
//---------------------power status------------------------------
//  --------------------- Solar battery end------------------------
const urly = "//cbsiot.live/utkarsh/api.php";
const datay = {
  "operation": "read",
  "data": "energy"
};

fetch(urly, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(datay)
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
      if (lastData.current !== undefined) {
        const current = parseFloat(lastData.current);
        if (!isNaN(current)) {


          //---------------------------------------------------------
          var root = am5.Root.new("chartdiv-meter-one");

          root.setThemes([
            am5themes_Animated.new(root)
          ]);

          var chart = root.container.children.push(
            am5radar.RadarChart.new(root, {
              panX: false,
              panY: false,
              startAngle: -180,
              endAngle: 0,
              innerRadius: -26
            })
          );

          var axisRenderer = am5radar.AxisRendererCircular.new(root, {
            strokeOpacity: 0.1,
            minGridDistance: 30
          });

          axisRenderer.ticks.template.setAll({
            visible: true,
            strokeOpacity: 0.5
          });

          axisRenderer.grid.template.setAll({
            visible: false
          });

          var axis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
              maxDeviation: 0,
              min: 0,
              max: 10,
              strictMinMax: true,
              renderer: axisRenderer
            })
          );

          function createRange(start, end, color, label) {

            var rangeDataItem = axis.makeDataItem({
              value: start,
              endValue: end
            });

            var range = axis.createAxisRange(rangeDataItem);

            rangeDataItem.get("axisFill").setAll({
              visible: true,
              fill: color,
              fillOpacity: 0.8
            });

            rangeDataItem.get("tick").setAll({
              visible: false
            });

            rangeDataItem.get("label").setAll({
              text: label,
              inside: true,
              radius: 8,
              fontSize: "0.9em",
              fill: am5.color(0xffffff)
            });

          }

          createRange(0, 6, am5.color(0x297373), "Safe");
          createRange(6, 8, am5.color(0x946B49), "Warning");
          createRange(8, 10, am5.color(0xff621f), "Danger");

          // Add clock hand
          var handDataItem = axis.makeDataItem({
            value: 0
          });

          var hand = handDataItem.set("bullet", am5xy.AxisBullet.new(root, {
            sprite: am5radar.ClockHand.new(root, {
              radius: am5.percent(99)
            })
          }));

          axis.createAxisRange(handDataItem);

          handDataItem.get("grid").set("visible", false);
          handDataItem.get("tick").set("visible", false);




          setInterval(() => {

            const urly = "//cbsiot.live/utkarsh/api.php";
            const datay = {
              "operation": "read",
              "data": "energy"
            };

            fetch(urly, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(datay)
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
                  if (lastData.current !== undefined) {
                    const current = parseFloat(lastData.current);
                    if (!isNaN(current)) {
                      handDataItem.animate({
                        key: "value",
                        to: current,
                        duration: 800,
                        easing: am5.ease.out(am5.ease.cubic)
                      });

                      var element = document.getElementById("Current-value");
                      var value = current + "A";
                      element.textContent = value;
                      console.log("current" + current);

                    } else {
                      console.error("Property 'l1_status' is not a valid number.");
                    }
                  }
                }
              })
              .catch(error => {
                console.error('Error:', error);
              });

          }, 2000);

          //--------------------------------------------------

        } else {
          console.error("Property 'l1_status' is not a valid number.");
        }
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


// -----------------------------meter two----------------------------------
const urlxp = "//cbsiot.live/utkarsh/api.php";
const dataxp = {
  "operation": "read",
  "data": "energy"
};

fetch(urlxp, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(dataxp)
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
      if (lastData.voltage !== undefined) {
        const voltage = parseFloat(lastData.voltage);
        if (!isNaN(voltage)) {
          //--------------------------------------------------
          var root = am5.Root.new("chartdiv-meter-two");

          root.setThemes([
            am5themes_Animated.new(root)
          ]);

          var chart = root.container.children.push(
            am5radar.RadarChart.new(root, {
              panX: false,
              panY: false,
              startAngle: -180,
              endAngle: 0,
              innerRadius: -26
            })
          );

          var axisRenderer = am5radar.AxisRendererCircular.new(root, {
            strokeOpacity: 0.1,
            minGridDistance: 30
          });

          axisRenderer.ticks.template.setAll({
            visible: true,
            strokeOpacity: 0.5
          });

          axisRenderer.grid.template.setAll({
            visible: false
          });

          var axis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
              maxDeviation: 0,
              min: 0,
              max: 280,
              strictMinMax: true,
              renderer: axisRenderer
            })
          );

          function createRange(start, end, color, label) {

            var rangeDataItem = axis.makeDataItem({
              value: start,
              endValue: end
            });

            var range = axis.createAxisRange(rangeDataItem);

            rangeDataItem.get("axisFill").setAll({
              visible: true,
              fill: color,
              fillOpacity: 0.8
            });

            rangeDataItem.get("tick").setAll({
              visible: false
            });

            rangeDataItem.get("label").setAll({
              text: label,
              inside: true,
              radius: 8,
              fontSize: "0.9em",
              fill: am5.color(0xffffff)
            });

          }

          createRange(0, 240, am5.color(0x297373), "Safe");
          createRange(240, 260, am5.color(0x946B49), "Warning");
          createRange(260, 280, am5.color(0xff621f), "Danger");

          // Add clock hand
          var handDataItem2 = axis.makeDataItem({
            value: 0
          });

          var hand = handDataItem2.set("bullet", am5xy.AxisBullet.new(root, {
            sprite: am5radar.ClockHand.new(root, {
              radius: am5.percent(99)
            })
          }));

          axis.createAxisRange(handDataItem2);

          handDataItem2.get("grid").set("visible", false);
          handDataItem2.get("tick").set("visible", false);

          setInterval(() => {
            const urlxp = "//cbsiot.live/utkarsh/api.php";
            const dataxp = {
              "operation": "read",
              "data": "energy"
            };

            fetch(urlxp, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(dataxp)
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
                  if (lastData.voltage !== undefined) {
                    const voltage = parseFloat(lastData.voltage);
                    if (!isNaN(voltage)) {

                      handDataItem2.animate({
                        key: "value",
                        to: voltage,
                        duration: 800,
                        easing: am5.ease.out(am5.ease.cubic)
                      });
                      var element = document.getElementById("voltage-value");
                      var value = voltage + "V";
                      element.textContent = value;
                      console.log("voltage" + voltage);

                    } else {
                      console.error("Property 'l1_status' is not a valid number.");
                    }
                  }
                }
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }, 2000);
          //---------------------------------------------------
        } else {
          console.error("Property 'l1_status' is not a valid number.");
        }
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
// ------------------------------------meter 3-----------------------------
const urlz = "//cbsiot.live/utkarsh/api.php";
const dataz = {
  "operation": "read",
  "data": "energy"
};

fetch(urlz, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(dataz)
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
      if (lastData.power !== undefined) {
        const power = parseFloat(lastData.power);
        if (!isNaN(power)) {





          //--------------------------------------------------
          var root = am5.Root.new("chartdiv-meter-three");

          root.setThemes([
            am5themes_Animated.new(root)
          ]);

          var chart = root.container.children.push(
            am5radar.RadarChart.new(root, {
              panX: false,
              panY: false,
              startAngle: -180,
              endAngle: 0,
              innerRadius: -26
            })
          );

          var axisRenderer = am5radar.AxisRendererCircular.new(root, {
            strokeOpacity: 0.1,
            minGridDistance: 30
          });

          axisRenderer.ticks.template.setAll({
            visible: true,
            strokeOpacity: 0.5
          });

          axisRenderer.grid.template.setAll({
            visible: false
          });

          var axis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
              maxDeviation: 0,
              min: 0,
              max: 5,
              strictMinMax: true,
              renderer: axisRenderer
            })
          );

          function createRange(start, end, color, label) {

            var rangeDataItem = axis.makeDataItem({
              value: start,
              endValue: end
            });

            var range = axis.createAxisRange(rangeDataItem);

            rangeDataItem.get("axisFill").setAll({
              visible: true,
              fill: color,
              fillOpacity: 0.8
            });

            rangeDataItem.get("tick").setAll({
              visible: false
            });

            rangeDataItem.get("label").setAll({
              text: label,
              inside: true,
              radius: 8,
              fontSize: "0.9em",
              fill: am5.color(0xffffff)
            });

          }

          createRange(0, 3, am5.color(0x297373), "Safe");
          createRange(3, 4, am5.color(0x946B49), "Warning");
          createRange(4, 5, am5.color(0xff621f), "Danger");

          // Add clock hand
          var handDataItem3 = axis.makeDataItem({
            value: 0
          });

          var hand = handDataItem3.set("bullet", am5xy.AxisBullet.new(root, {
            sprite: am5radar.ClockHand.new(root, {
              radius: am5.percent(99)
            })
          }));

          axis.createAxisRange(handDataItem3);

          handDataItem3.get("grid").set("visible", false);
          handDataItem3.get("tick").set("visible", false);

          setInterval(() => {
            const urlz = "//cbsiot.live/utkarsh/api.php";
            const dataz = {
              "operation": "read",
              "data": "energy"
            };

            fetch(urlz, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(dataz)
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
                  if (lastData.power !== undefined) {
                    const power = parseFloat(lastData.power);
                    if (!isNaN(power)) {
                      handDataItem3.animate({
                        key: "value",
                        to: power,
                        duration: 800,
                        easing: am5.ease.out(am5.ease.cubic)
                      });
                      var element = document.getElementById("power-value");
                      var value = power + "KW";
                      element.textContent = value;
                      console.log("power" + power);
                    } else {
                      console.error("Property 'l1_status' is not a valid number.");
                    }
                  }
                }
              })
              .catch(error => {
                console.error('Error:', error);
              });

          }, 2000);
          //----------------------------------------------------------
        } else {
          console.error("Property 'l1_status' is not a valid number.");
        }
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
//--------------------- EQMS status end------------------------
const alertDiv = document.getElementById("notification");
const text = document.getElementById("text");
// Define your request data
const requestDatal = {
  operation: "read",
  data: "lightstatus",
};

// Make an HTTP POST request to your API endpoint
fetch('//cbsiot.live/utkarsh/api.php', {
  method: 'POST',
  body: JSON.stringify(requestDatal),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    const lightvalue = data.value;
    const totalpower = data.power; // Get totalpower from the API response
    console.log("lightvalue" + lightvalue);
    console.log("totalpower" + totalpower);
    if (lightvalue == 3) {
      if (totalpower < 70) {
        console.log("warning");
        text.innerHTML = '3 lights off';
        alertDiv.style.display = "block";
      } else {
        console.log("power ok");
        alertDiv.style.display = "none";
      }
    } else if (lightvalue == 2) {
      if (totalpower < 45) {
        console.log("warning");
        text.innerHTML = '1 lights off';
        alertDiv.style.display = "block";
      } else {
        console.log("power ok");
        alertDiv.style.display = "none";
      }
    } else if (lightvalue == 1) {
      if (totalpower < 20) {
        console.log("warning");
        text.innerHTML = '2 lights off';
        alertDiv.style.display = "block";
      } else {
        console.log("power ok");
        alertDiv.style.display = "none";
      }
    } else if (lightvalue == 0) {
      if (totalpower == 0) {
        console.log("all light off");
        text.innerHTML = '3 lights off';
        alertDiv.style.display = "block";
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


const divToRemove = document.getElementById("notiDiv");
const removeButton = document.getElementById("removeButton");


removeButton.addEventListener("click", function () {
  divToRemove.remove();
});


const divToRemoveall = document.getElementById("notiDiv");
const removeButtonall = document.getElementById("removeButtonall");


removeButtonall.addEventListener("click", function () {
  divToRemoveall.remove();
});
//-------------------main body div end--------------------------------
  
function toggleTheme() {
    const body = document.body;

    body.classList.toggle('dark-theme');
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDarkTheme);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const isDarkTheme = localStorage.getItem('dark-theme') === 'true';
    if (isDarkTheme) {
      body.classList.add('dark-theme');
    }
  });
  //-------------------map--------------------------------
  
//   23.21164844388676&lon=72.64130812525333
        var lat = 23.21164844388676;
        var lng = 72.64130812525333;
        var mymap = L.map('map').setView([lat, lng], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(mymap);

        // Create a custom icon using the provided image
        var customIcon = L.icon({
            iconUrl: 'https://www.clipartmax.com/png/full/360-3607480_lamppost-free-icon-street-light-icon-png.png',
            iconSize: [62, 62], // Adjust the size as needed
            iconAnchor: [16, 16], // Adjust the anchor point if necessary
            popupAnchor: [0, -16] // Adjust the popup anchor point if necessary
        });

        // Add a marker with the custom icon
        var marker = L.marker([lat, lng], { icon: customIcon }).addTo(mymap);

        // Optional: You can add a popup to the marker
        marker.bindPopup("<b>Your Location</b>").openPopup();