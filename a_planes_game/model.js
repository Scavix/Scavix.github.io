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
    getAngle(){
        //return atan2(this.city2.y - this.city1.y, this.city2.x - this.city1.x);
        return atan2(this.arrival.city.pos.y - this.departure.city.pos.y, this.arrival.city.pos.x - this.departure.city.pos.x);
    }
}