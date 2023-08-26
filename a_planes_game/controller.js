class Controller {
    constructor(backgroundImg, planesImgs, cityImgs, backgroundColor) {
        this.backgroundImg = backgroundImg;
        this.planesImgs = planesImgs;
        this.myDrawer = new Drawer();
        this.myLoader = new Loader();
        this.cityImgs = cityImgs;
        this.planes = [];
        this.nodes = [];
        this.cities = [];
        this.init();
        this.backgroundColor = backgroundColor;
        this.io = new IO();
        this.coins = 100;
        this.speedMultiplier = 1;
        this.sizeMultiplier = 1;

        this.isDragging = false;
        this.draggedFrom = null;
    }
    init() {
        this.cities = this.myLoader.loadCities();
        this.nodes = this.myLoader.loadNodes(this.cities);
        this.airports = this.myLoader.loadAirports(this.cities, this.nodes);
        this.planes = this.myLoader.loadPlanes(this.cities, this.airports);
    }
    draw() {
        background(this.backgroundColor);
        background(this.backgroundImg);
        this.myDrawer.drawNodes(this.nodes);
        this.myDrawer.drawCities(this.cities, this.cityImgs, this.translateMultiplier(this.sizeMultiplier));
        this.myDrawer.drawPlanes(this.planesImgs, this.planes, this.translateMultiplier(this.sizeMultiplier));
        this.io.updateCoins(this.coins);
        this.io.updatePopulation(this.planes.map(plane => plane.maxPassengers*plane.level).reduce((a, b) => a + b, 0));
        this.myDrawer.drawDrag(this.draggedFrom);
    }
    move() {
        for (let i = 0; i < this.planes.length; i++) {
            if (this.planes[i].isFlying) {
                let xDir = 1;
                let yDir = 1;
                let deltaX = this.planes[i].route.departure.city.pos.x - this.planes[i].route.arrival.city.pos.x;
                let deltaY = this.planes[i].route.departure.city.pos.y - this.planes[i].route.arrival.city.pos.y;
                let angle = Math.atan2(deltaY, deltaX);
                if (this.planes[i].route.departure.city.pos.x > this.planes[i].route.arrival.city.pos.x) {
                    xDir = -1;
                } else { xDir = 1; }
                if (this.planes[i].route.departure.city.pos.y > this.planes[i].route.arrival.city.pos.y) {
                    yDir = -1;
                } else { yDir = 1; }
                this.planes[i].pos.x += xDir * (this.planes[i].speed * this.translateMultiplier(this.speedMultiplier)) * this.planes[i].level * abs(Math.cos(angle));
                this.planes[i].pos.y += yDir * (this.planes[i].speed * this.translateMultiplier(this.speedMultiplier)) * this.planes[i].level * abs(Math.sin(angle));
                if (dist(this.planes[i].pos.x, this.planes[i].pos.y, this.planes[i].route.arrival.city.pos.x, this.planes[i].route.arrival.city.pos.y) < (this.planes[i].speed*this.translateMultiplier(this.speedMultiplier)) * 2) {
                    this.planes[i].isFlying = false;
                    this.planes[i].pos.x = this.planes[i].route.arrival.city.pos.x;
                    this.planes[i].pos.y = this.planes[i].route.arrival.city.pos.y;
                    this.planes[i].whereStanding = this.getAirport(this.planes[i].route.arrival.city.name);
                    // TODO
                    //this.coins += this.planes[i].passengers;
                    this.coins += this.planes[i].maxPassengers * this.planes[i].level;
                }
            }
            else {
                if (this.planes[i].timer <= 0) {
                    this.planes[i].route = this.getRouteFromCitiesName(this.planes[i].whereStanding.city.name, this.randomAssignRouteFrom(this.planes[i].whereStanding.city.name));
                    this.planes[i].timer = 61;
                    this.planes[i].isFlying = true;
                }
                this.planes[i].timer--;
            }
        }
    }
    getAirport(name) {
        for (let i = 0; i < this.airports.length; i++) {
            if (name == this.airports[i].city.name) {
                return this.airports[i];
            }
        }
    }
    getCity(name) {
        for (let i = 0; i < this.cities.length; i++) {
            if (name == this.cities[i].name) {
                return this.cities[i];
            }
        }
    }
    randomAssignRouteFrom(cityName) {
        let tmp = [];
        for (let k = 0; k < this.nodes.length; k++) {
            if (this.nodes[k].a.name == cityName) {
                tmp.push(this.nodes[k].b.name);

            } else if (this.nodes[k].b.name == cityName) {
                tmp.push(this.nodes[k].a.name);
            }
        }
        return random(tmp);
    }
    getRouteFromCitiesName(a, b) {
        let tmp1, tmp2;
        for (let i = 0; i < this.airports.length; i++) {
            if (this.airports[i].city.name == a) {
                tmp1 = this.airports[i];
            }
            if (this.airports[i].city.name == b) {
                tmp2 = this.airports[i];
            }
        }
        return new Route(tmp1, tmp2);
    }
    translateMultiplier(multiplier) {
        switch (multiplier) {
            case "1":
                return 0.5;
            case "2":
                return 0.75;
            case "3":
                return 1;
            case "4":
                return 1.5;
            case "5":
                return 2;
            default:
                return 1;
        }
    }
    addRoute(from, to) {
        if(from.name == to.name) return;
        let tmp1, tmp2;
        for (let i = 0; i < this.airports.length; i++) {
            if (this.airports[i].city.name == from.name) {
                tmp1 = this.airports[i];
            }
            if (this.airports[i].city.name == to.name) {
                tmp2 = this.airports[i];
            }
        }
        this.nodes.push(new Node(tmp1.city, tmp2.city));
    }
}

class Loader {
    constructor() { }
    loadCities() {
        let result = [];
        for (let i = 0; i < data.cities.length; i++) {
            result.push(new City(data.cities[i].city, new Position(data.cities[i].x, data.cities[i].y)));
        }
        return result;
    }
    loadPlanes(myCities, myAirports) {
        let result = [];
        let tmp, tmpAirport;
        for (let i = 0; i < data.planes.length; i++) {
            for (let j = 0; j < myCities.length; j++) {
                if (data.planes[i].city == myCities[j].name) {
                    tmp = myCities[j];
                }
            }
            for (let k = 0; k < myAirports.length; k++) {
                if (tmp.name == myAirports[k].city.name) {
                    tmpAirport = myAirports[k];
                }
            }
            result.push(new Airplane(data.planes[i].name, tmp.pos, false, tmpAirport, null, int(data.planes[i].level), int(data.planes[i].speed)));
        }
        return result;
    }
    loadNodes(myCities) {
        let result = [];
        let tmp = [];
        for (let i = 0; i < data.nodes.length; i++) {
            for (let j = 0; j < myCities.length; j++) {
                if (data.nodes[i].a == myCities[j].name || data.nodes[i].b == myCities[j].name) {
                    tmp.push(myCities[j]);
                }
            }
            result.push(new Node(tmp[0], tmp[1]));
            tmp = [];
        }
        return result;
    }
    loadAirports(myCities, myNodes) {
        let result = [];
        let tmp = [];
        for (let i = 0; i < myCities.length; i++) {
            for (let j = 0; j < myNodes.length; j++) {
                if (myNodes[j].a.name == myCities[i].name) {
                    tmp.push(myNodes[j].b);
                } else if (myNodes[j].b.name == myCities[i].name) {
                    tmp.push(myNodes[j].a);
                }
            }
            result.push(new Airport(myCities[i], tmp));
            tmp = [];
        }
        return result;
    }
}

class Drawer {
    constructor() {
    }
    drawCities(myCities, cityImgs, sizeMultiplier) {
        noStroke();
        for (let i = 0; i < myCities.length; i++) {
            if (dist(myCities[i].pos.x * width / 100, myCities[i].pos.y * height / 100, mouseX, mouseY) < 15) {
                fill('green');
                circle(myCities[i].pos.x * width / 100, myCities[i].pos.y * height / 100, 15*sizeMultiplier);
                this.showLabel(myCities[i]);
            } else {
                fill('blue');
                circle(myCities[i].pos.x * width / 100, myCities[i].pos.y * height / 100, 15*sizeMultiplier);
            }
            //image(cityImgs, myCities[i].pos.x * width / 100 - 15/2, myCities[i].pos.y * height / 100 - 15/2, 15,15);
        }
    }
    showLabel(city) {
        fill('black');
        text(city.name, city.pos.x * width / 100 - 15, city.pos.y * height / 100 - 10);
    }
    drawNodes(myNodes) {
        stroke('black');
        for (let i = 0; i < myNodes.length; i++) {
            line(myNodes[i].a.pos.x * width / 100, myNodes[i].a.pos.y * height / 100, myNodes[i].b.pos.x * width / 100, myNodes[i].b.pos.y * height / 100);
        }
    }
    drawPlanes(myImgs, myPlanes, sizeMultiplier) {
        for (let i = 0; i < myPlanes.length; i++) {
            if (myPlanes[i].selected) {
                fill('white');
                noStroke();
            } else {
                fill('brown');
            }
            push();
            //translate(myPlanes[i].pos.x * width / 100 - 10, myPlanes[i].pos.y * height / 100 - 10);
            translate(myPlanes[i].pos.x * width / 100, myPlanes[i].pos.y * height / 100);
            rotate(myPlanes[i].route.getAngle());
            //image(myImgs[0], -10, -10, 20, 20);
            circle(0, 0, 10*sizeMultiplier);
            pop();
        }
    }
    drawDrag(from) {
        if (from && controller.isDragging) {
            stroke('red');
            line(from.pos.x * width / 100, from.pos.y * height / 100, mouseX, mouseY);
        }
    }
}

class IO {
    constructor() {
    }
    updateCoins(coins) {
        document.getElementById("coins").innerHTML = coins;
    }
    updatePopulation(people) {
        document.getElementById("people-travelling").innerHTML = people;
    }
}