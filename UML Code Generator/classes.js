class CClass {
  constructor(name, vector, visibility) {
    this.name = name;
    this.v = vector;
    this.drag = false;
    this.inherits = false;
    this.inheritsFrom;
    this.implements = false;
    this.implementsFrom = [];
    this.attributes = [];
    this.methods = [];
    this.visibility = visibility;
  }
}

class AAttribute {
  constructor(name, type, visibility, value) {
    this.name = name;
    this.type = type;
    this.visibility = visibility;
    this.value = value;
  }
}

class MMethod {
  constructor(name, returnType, visibility, args) {
    this.name = name;
    this.returnType = returnType;
    this.visibility = visibility;
    this.args = args;
  }
}