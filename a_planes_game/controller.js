class Controller {
    constructor(backgroundImg, planesImgs, backgroundColor) {
        this.backgroundImg = backgroundImg;
        this.planesImgs = planesImgs;
        this.myDrawer = new Drawer();
        this.myLoader = new Loader();
        this.planes = [];
        this.nodes = [];
        this.cities = [];
        this.init();
        this.backgroundColor = backgroundColor;
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
        this.myDrawer.drawCities(this.cities);
        this.myDrawer.drawNodes(this.nodes);
        this.myDrawer.drawPlanes(this.planesImgs,this.planes);
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
                this.planes[i].pos.x += xDir * this.planes[i].speed * this.planes[i].level * abs(Math.cos(angle));
                this.planes[i].pos.y += yDir * this.planes[i].speed * this.planes[i].level * abs(Math.sin(angle));
                if (dist(this.planes[i].pos.x, this.planes[i].pos.y, this.planes[i].route.arrival.city.pos.x, this.planes[i].route.arrival.city.pos.y) < this.planes[i].speed * 2) {
                    this.planes[i].isFlying = false;
                    this.planes[i].pos.x = this.planes[i].route.arrival.city.pos.x;
                    this.planes[i].pos.y = this.planes[i].route.arrival.city.pos.y;
                    this.planes[i].whereStanding = this.getAirport(this.planes[i].route.arrival.city.name);
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
    drawCities(myCities) {
        noStroke();
        for (let i = 0; i < myCities.length; i++) {
            if (dist(myCities[i].pos.x * width / 100, myCities[i].pos.y * height / 100, mouseX, mouseY) < 15) {
                fill('green');
                circle(myCities[i].pos.x * width / 100, myCities[i].pos.y * height / 100, 15);
                this.showLabel(myCities[i]);
            } else {
                fill('blue');
                circle(myCities[i].pos.x * width / 100, myCities[i].pos.y * height / 100, 15);
            }
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
    drawPlanes(myImgs,myPlanes) {
        for (let i = 0; i < myPlanes.length; i++) {/*
            push();
            translate(myPlanes[i].pos.x * width / 100, myPlanes[i].pos.y * height / 100);
            rotate(
                atan2(
                    myPlanes[i].route.arrival.city.pos.y - myPlanes[i].route.departure.city.pos.y,
                    myPlanes[i].route.arrival.city.pos.x - myPlanes[i].route.departure.city.pos.x
                )
            );
            console.log(myPlanes[i])
            image(myImgs[myPlanes[i].level], 0, 0, 20, 20);
            pop();*/
            image(myImgs[myPlanes[i].level], myPlanes[i].pos.x * width / 100, myPlanes[i].pos.y * height / 100, 20, 20);
        }
    }
}

