class Drawer {
    constructor() {
    }
    drawCities(myCities){
        for(let i = 0; i<myCities.length; i++){
            fill('white');
            circle(myCities[i].pos.x * width/10,myCities[i].pos.y * height/10,10);
        }
    }
    drawNodes(myNodes){
        for(let i = 0; i<myNodes.length; i++){
            line(myNodes[i].a.pos.x * width/10,myNodes[i].a.pos.y * height/10, myNodes[i].b.pos.x  * width/10,myNodes[i].b.pos.y * height/10);           
        }
    }
    drawPlanes(myPlanes){
        for(let i = 0; i<myPlanes.length; i++){
            if(myPlanes[i].isFlying){
                fill('red');
                circle(myPlanes[i].pos.x * width/10,myPlanes[i].pos.y * height/10, 5);
            }else{
                fill('blue');
                circle(myPlanes[i].pos.x * width/10,myPlanes[i].pos.y * height/10, 5);
            }
        }
    }
}