class Controller {
    constructor() {
        this.myDrawer = new Drawer();
        this.myLoader = new Loader();
        this.planes=[];
        this.nodes=[];
        this.cities=[];
        this.init();
    }
    init() {
        this.cities = this.myLoader.loadCities();
        this.nodes = this.myLoader.loadNodes(this.cities);
        this.airports = this.myLoader.loadAirports(this.cities, this.nodes);
        //this.planes = this.myLoader.loadPlanes(this.cities,this.airports);
    }
    draw() {
        background(italy);
        this.myDrawer.drawCities(this.cities);
        this.myDrawer.drawNodes(this.nodes);
        this.myDrawer.drawPlanes(this.planes);
    }
    move() {
        for (let i = 0; i < this.planes.length; i++) {
            if (this.planes[i].isFlying) {
                let xDir = 1;
                let yDir = 1;
                let speed = 0.05;
                let deltaX = this.planes[i].route.departure.city.pos.x - this.planes[i].route.arrival.city.pos.x;
                let deltaY = this.planes[i].route.departure.city.pos.y - this.planes[i].route.arrival.city.pos.y;
                let angle = Math.atan2(deltaY, deltaX);
                if(this.planes[i].route.departure.city.pos.x>this.planes[i].route.arrival.city.pos.x){
                    xDir = -1;
                }else {xDir = 1;}
                if(this.planes[i].route.departure.city.pos.y>this.planes[i].route.arrival.city.pos.y){
                    yDir = -1;
                }else {yDir = 1;}
                this.planes[i].pos.x += xDir * speed * abs(Math.cos(angle));
                this.planes[i].pos.y += yDir * speed * abs(Math.sin(angle));
                if (dist(this.planes[i].pos.x, this.planes[i].pos.y, this.planes[i].route.arrival.city.pos.x, this.planes[i].route.arrival.city.pos.y) < 0.1) {
                    this.planes[i].isFlying = false;
                    this.planes[i].pos.x = this.planes[i].route.arrival.city.pos.x;
                    this.planes[i].pos.y = this.planes[i].route.arrival.city.pos.y;
                    this.planes[i].whereStanding = this.getAirport(this.planes[i].route.arrival.city.name);
                }
            }
            else{
                if(this.planes[i].timer<=0){
                    console.log(this.planes[i].whereStanding);
                    this.planes[i].route = this.getRouteFromCitiesName(this.planes[i].whereStanding.city.name,this.randomAssignRouteFrom(this.planes[i].whereStanding.city.name));
                    this.planes[i].timer=61;
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
    randomAssignRouteFrom(cityName){
        let tmp = [];
        for (let k = 0; k < this.nodes.length; k++) {
            if(this.nodes[k].a.name==cityName){
                tmp.push(this.nodes[k].b.name);
                
            }else if(this.nodes[k].b.name==cityName){
                tmp.push(this.nodes[k].a.name);
            }
        }
        return random(tmp);
    }
    getRouteFromCitiesName(a,b){
        let tmp1,tmp2;
        for (let i = 0; i < this.airports.length; i++) {
            if(this.airports[i].city.name==a){
                tmp1=this.airports[i];
            }
            if(this.airports[i].city.name==b){
                tmp2=this.airports[i];
            }
        }
        return new Route(tmp1,tmp2);
    }
    findRoute(from,to){
        for (let i = 0; i < this.nodes.length; i++) {
            if((this.nodes[i].a.name==from && this.nodes[i].b.name==to)||(this.nodes[i].a.name==to && this.nodes[i].b.name==from)){
                this.nodes[i].isMarked=true;
            }
        }
    }
}