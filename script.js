const mapboxApiKey =
  "pk.eyJ1IjoiamNjZGV2NDUiLCJhIjoiY2tjcHd5ZTJnMGJhZzJxb3k4NGlpcnYwYiJ9._IJ_xwjFQnQbx3p1EXeu_g";
const apiKey = "at_o4IbwYvg5Db1E5oQFA1JZfQbdVJHt";

const searchBtn = document.getElementById("searchBtn");
const ipEl = document.getElementById("ip");
const locationEl = document.getElementById("location");
const timezoneEl = document.getElementById("timezone");
const ispEl = document.getElementById("isp");

let ipMap = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxApiKey}`,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token",
  }
).addTo(ipMap);

async function fetchData() {
  try {
    await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => renderData(data));
  } catch (error) {
    console.log(error);
  }
}

function renderData(data) {
  console.log(data);

  let { ip, location, isp } = data;
  let { city, region, postalCode, timezone, lat, lng } = location;

  ipEl.innerText = ip;
  locationEl.innerText = `${city}, ${region} ${postalCode}`;
  timezoneEl.innerText = timezone;
  ispEl.innerText = isp;

  handleMapClick(lat, lng);
}

function handleMapClick(lat, lng) {
  ipMap.setView([lat, lng])
  return L.marker([lat, lng]).addTo(ipMap);
}

ipMap.on("click", handleMapClick);

searchBtn.addEventListener("click", fetchData);
