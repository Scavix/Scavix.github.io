class City{
    constructor(name,pos){
        this.name=name;
        this.pos=pos;
    }
}

class Airport{
    constructor(city,connections){
        this.city=city;
        this.connections=connections;
    }
}

class Airplane{
    constructor(name,pos,isFlying,whereStanding,route,level,speed,maxPassengers){
        this.name=name;
        this.pos=pos;
        this.isFlying=isFlying;
        this.whereStanding=whereStanding;
        this.route=route;
        this.level=level;
        this.maxPassengers=maxPassengers;
        this.passengers=0;
        this.speed=speed;
        this.timer = 101;
    }
}

class Node{
    constructor(a,b){
        this.a=a;
        this.b=b;
    }
}

class Position{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

class Route{
    constructor(departure,arrival){
        this.departure=departure;
        this.arrival=arrival;
    }
}