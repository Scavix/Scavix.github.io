class Loader {
    constructor() {}
    loadCities() {
        let result = [];
        for (let i = 0; i < data.cities.length; i++) {
            result.push(new City(data.cities[i].city, new Position(data.cities[i].x, data.cities[i].y)));
        }
        return result;
    }
    loadPlanes(myCities,myAirports) {
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
                    console.log(myAirports[k]);
                    tmpAirport = myAirports[k];
                }
            }
            result.push(new Airplane(data.planes[i].name, tmp.pos, false, tmpAirport, new Model(data.planes[i].model)));
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