let citiesData = {
  "cities": [
    {
      "name": "Paris",
      "x": 16,
      "y": 32
    },
    {
      "name": "London",
      "x": 14,
      "y": 28
    },
    {
      "name": "Berlin",
      "x": 26,
      "y": 27
    },
    {
      "name": "Rome",
      "x": 25,
      "y": 42
    },
    {
      "name": "Warsaw",
      "x": 32,
      "y": 27
    },
    {
      "name": "Lisbon",
      "x": 2,
      "y": 44
    },
    {
      "name": "Barcelona",
      "x": 14,
      "y": 42
    },
    {
      "name": "Stockholm",
      "x": 29,
      "y": 18
    },
    {
      "name": "Amsterdam",
      "x": 19,
      "y": 27
    },
    {
      "name": "Athens",
      "x": 39,
      "y": 46
    },
    {
      "name": "Helsinki",
      "x": 33,
      "y": 15
    },
    {
      "name": "Oslo",
      "x": 23,
      "y": 17
    },
    {
      "name": "Istanbul",
      "x": 44,
      "y": 41
    },
    {
      "name": "Kiev",
      "x": 41,
      "y": 28
    },
    {
      "name": "Moscow",
      "x": 45,
      "y": 20
    },
    {
      "name": "Vienna",
      "x": 29,
      "y": 33
    },
    {
      "name": "Bucharest",
      "x": 39,
      "y": 36
    },
    {
      "name": "Minsk",
      "x": 38,
      "y": 23
    },
    {
      "name": "Reykjavik",
      "x": 4,
      "y": 7
    }
  ]
};
let routesData = {
  "data": [
    { "data": ["Amsterdam", "London"] },
    { "data": ["London", "Lisbon"] },
    { "data": ["Oslo", "Amsterdam"] },
    { "data": ["Rome", "Barcelona"] },
    { "data": ["Istanbul", "Athens"] },
    { "data": ["Stockholm", "Oslo"] },
    { "data": ["Rome", "Athens"] },
    { "data": ["Istanbul", "Kiev"] },
    { "data": ["Stockholm", "Helsinki"] },
    { "data": ["Moscow", "Helsinki"] },
    { "data": ["Moscow", "Kiev"] },
    { "data": ["Barcelona", "Lisbon"] },
    { "data": ["Paris", "Berlin"] },
    { "data": ["Paris", "Vienna"] },
    { "data": ["Bucharest", "Vienna"] },
    { "data": ["Bucharest", "Warsaw"] },
    { "data": ["Berlin", "Warsaw"] },
    { "data": ["Vienna", "Rome"] },
    { "data": ["Stockholm", "Berlin"] },
    { "data": ["Bucharest", "Athens"] },
    { "data": ["London", "Paris"] },
    { "data": ["Barcelona", "Paris"] },
    { "data": ["Moscow", "Minsk"] },
    { "data": ["Warsaw", "Minsk"] },
    { "data": ["Warsaw", "Helsinki"] },
    { "data": ["Bucharest", "Kiev"] },
    { "data": ["Reykjavik", "London"] },
    { "data": ["Oslo", "Reykjavik"] },
    { "data": ["Reykjavik", "Lisbon"] },
    { "data": ["Helsinki", "Reykjavik"] }
  ]
}
let euImage, airplaneImage, cities, routes, airplanes, varSize, xSpeed, ySpeed, errorCorrection;

function preload() {
  euImage = loadImage('eu.jpg');
  airplaneImage = loadImage('airplane.png');
}

function setup() {
  createCanvas(500, 500);
  varSize = width / 50;
  xSpeed = varSize / 250;
  ySpeed = varSize / 250;
  errorCorrection = 1 / 50;
  cities = new CitiesManager()
  for (let i = 0; i < citiesData.cities.length; i++) {
    cities.addCity(new City(citiesData.cities[i].name, citiesData.cities[i].x, citiesData.cities[i].y));
  }
  routes = new RoutesManager()
  for (let i = 0; i < routesData.data.length; i++) {
    routes.addRoute(new Route(cities.getFromName(routesData.data[i].data[0]), cities.getFromName(routesData.data[i].data[1])));
    routes.addRoute(new Route(cities.getFromName(routesData.data[i].data[1]), cities.getFromName(routesData.data[i].data[0])));
  }
  airplanes = new AirplanesManager();
  airplanes.addAirplane(new Airplane(routes.getRandomFrom("Paris")));
  airplanes.addAirplane(new Airplane(routes.getRandomFrom("Athens")));
  airplanes.addAirplane(new Airplane(routes.getRandomFrom("Reykjavik")));
  airplanes.addAirplane(new Airplane(routes.getRandomFrom("Moscow")));
  populateDropDownList();
}

function draw() {
  image(euImage, 0, 0);
  routes.show();
  cities.show();
  airplanes.show();
  airplanes.move();
}

class City {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
  show() {
    fill('white');
    ellipse(this.x * varSize, this.y * varSize, varSize + 2, varSize + 2);
  }
}

class CitiesManager {
  constructor() {
    this.cities = [];
  }
  addCity(city) {
    this.cities.push(new City(city.name, city.x, city.y));
  }
  show() {
    for (let i = 0; i < this.cities.length; i++) {
      this.cities[i].show();
    }
  }
  getFromName(name) {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name == name) {
        return this.cities[i];
      }
    }
  }
  getRandomName() {
    let citiesNames = [];
    for (let i = 0; i < this.cities.length; i++) {
      citiesNames.push(this.cities[i].name);
    }
    let result = citiesNames[Math.floor(Math.random() * citiesNames.length)]
    return result;
  }
  getCityFromCoordinates(x, y) {
    for (let i = 0; i < this.cities.length; i++) {
      if (abs(this.cities[i].x - x) < 2 && (this.cities[i].y - y) < 2) {
        return this.cities[i].name;
      }
    }
  }
  getNames() {
    let result = [];
    for (let i = 0; i < this.cities.length; i++) {
      result.push(this.cities[i].name);
    }
    return result;
  }
  isPresent(name) {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name == name) {
        return true;
      }
    }
    return false;
  }
}

class Route {
  constructor(city1, city2) {
    this.city1 = city1;
    this.city2 = city2;
  }
  show() {
    fill('black');
    line(this.city1.x * varSize, this.city1.y * varSize, this.city2.x * varSize, this.city2.y * varSize);
  }
  getAngle() {
    return atan2(this.city2.y - this.city1.y, this.city2.x - this.city1.x);
  }
}

class RoutesManager {
  constructor() {
    this.routes = [];
  }
  addRoute(route) {
    this.routes.push(new Route(new City(route.city1.name, route.city1.x, route.city1.y), new City(route.city2.name, route.city2.x, route.city2.y)));
  }
  show() {
    for (let i = 0; i < this.routes.length; i++) {
      this.routes[i].show();
    }
  }
  getRandomFrom(cityName) {
    let routesFromCity = [];
    for (let i = 0; i < this.routes.length; i++) {
      if (this.routes[i].city1.name == cityName) {
        routesFromCity.push(this.routes[i]);
      }
    }
    let result = routesFromCity[Math.floor(Math.random() * routesFromCity.length)]
    console.log("Going from", result.city1.name, "to", result.city2.name, "with orientation", (result.getAngle() * 180 / Math.PI).toFixed(2), "°");
    return result;
  }
  contains(city1, city2) {
    if (cities.isPresent(city1) && cities.isPresent(city2)) {
      for (let i = 0; i < this.routes.length; i++) {
        if ((this.routes[i].city1.name == city1 && this.routes[i].city2.name == city2) || this.routes[i].city1.name == city2 && this.routes[i].city2.name == city1) {
          return true;
        }
      }
    }
    return false;
  }
}

class Airplane {
  constructor(route) {
    this.x = route.city1.x;
    this.y = route.city1.y;
    this.route = route;
  }
  show() {
    push();
    translate(this.x * varSize, this.y * varSize);
    rotate(this.route.getAngle());
    image(airplaneImage, 0, 0, varSize * 2, varSize * 2);
    pop();
  }
  move() {
    let angle = Math.atan2(this.route.city2.y - this.y, this.route.city2.x - this.x);
    this.x += xSpeed * Math.cos(angle);
    this.y += ySpeed * Math.sin(angle);
  }
}

class AirplanesManager {
  constructor() {
    this.airplanes = [];
  }
  addAirplane(airplane) {
    this.airplanes.push(new Airplane(airplane.route));
  }
  show() {
    for (let i = 0; i < this.airplanes.length; i++) {
      this.airplanes[i].show();
    }
  }
  move() {
    for (let i = 0; i < this.airplanes.length; i++) {
      this.airplanes[i].move();
      if (abs(this.airplanes[i].x - this.airplanes[i].route.city2.x) < (errorCorrection) && abs(this.airplanes[i].y - this.airplanes[i].route.city2.y) < (errorCorrection)) {
        this.airplanes[i].x = this.airplanes[i].route.city2.x;
        this.airplanes[i].y = this.airplanes[i].route.city2.y;
        this.airplanes[i].route = routes.getRandomFrom(this.airplanes[i].route.city2.name);
      }
    }
  }
}

function onClickAddPlane() {
  airplanes.addAirplane(new Airplane(routes.getRandomFrom(cities.getRandomName())));
}

function onClickRemovePlane() {
  airplanes.airplanes.pop();
}

function onClickIncreaseSpeed() {
  if (xSpeed * 1.5 < 0.5 && ySpeed * 1.5 < 0.5) {
    xSpeed *= 1.5;
    ySpeed *= 1.5;
    errorCorrection *= 1.5;
  }
}

function onClickDecreaseSpeed() {
  if (xSpeed / 1.5 > 0.05 && ySpeed / 1.5 > 0.05) {
    xSpeed /= 1.5;
    ySpeed /= 1.5;
    errorCorrection /= 1.5;
  }
}

function populateDropDownList() {
  var from = document.getElementById("from");
  var to = document.getElementById("to");
  var options = cities.getNames();

  for (var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el1 = document.createElement("option");
    el1.textContent = opt;
    el1.value = opt;
    var el2 = document.createElement("option");
    el2.textContent = opt;
    el2.value = opt;
    from.appendChild(el1);
    to.appendChild(el2);
  }
}

function onClickAddRoute() {
  var from = document.getElementById("from");
  var to = document.getElementById("to");
  if ((!routes.contains(from.value, to.value)) && (from.value != to.value)) {
    routes.addRoute(new Route(cities.getFromName(from.value), cities.getFromName(to.value)));
  }
}