// create an array with nodes
var nodes = new vis.DataSet([
  { id: 100000, label: "Computer Engineering", group: 0 },

  { id: 100001, label: "Year 1", group: 1 },
  { id: 100002, label: "Year 2", group: 2 },
  { id: 100003, label: "Year 3", group: 3 },

  { id: 10001, label: "Semester 1", group: 1 },
  { id: 10002, label: "Semester 2", group: 1 },
  { id: 10003, label: "Semester 3", group: 2 },
  { id: 10004, label: "Semester 4", group: 2 },
  { id: 10005, label: "Semester 5", group: 3 },
  { id: 10006, label: "Semester 6", group: 3 },

  { id: 1, label: "Informatic Fundamentals I", group: 1 },
  { id: 2, label: "Calculus I", group: 1 },
  { id: 3, label: "Algebra and Geometry", group: 1 },
  { id: 4, label: "English", group: 1 },
  { id: 5, label: "Informatic Fundamentals II", group: 1 },
  { id: 6, label: "Calculus II", group: 1 },
  { id: 7, label: "Logic Networks", group: 1 },

  { id: 8, label: "Physics", group: 2 },
  { id: 9, label: "Applied Mathematics", group: 2 },
  { id: 10, label: "Computer Architecture", group: 2 },
  { id: 11, label: "Information Systems", group: 2 },
  { id: 12, label: "Telecommunication Fundamentals", group: 2 },
  { id: 13, label: "Operating Systems", group: 2 },
  { id: 14, label: "Electrical Engineering", group: 2 },
  { id: 15, label: "Economics and Business Organization", group: 2 },

  { id: 16, label: "Control Systems", group: 3 },
  { id: 17, label: "Computer Networks", group: 3 },
  { id: 18, label: "Eletronics", group: 3 },
  { id: 19, label: "Web Technologies", group: 3 },
  { id: 20, label: "Software Engineering", group: 3 },

  { id: 21, label: "Internship", group: 4 },
  { id: 22, label: "Thesis", group: 4 },
  { id: 23, label: "Erasmus", group: 4 },

  { id: 24, label: "Constraint Logic Programming", group: 5 },
  { id: 25, label: "Management Information Systems", group: 5 },
  { id: 26, label: "Communication Systems", group: 5 },
  { id: 27, label: "Mobile and Wireless Telecommunications Systems", group: 5 },

  { id: 28, label: "Cyberchallenge", group: 6 },

  { id: 29, label: "Introductionto Video Games Creation", group: 7 },

  { id: 30, label: "Logic and Argumentation", group: 8 },
  { id: 31, label: "Fundamentals of Industrial Cybersecurity", group: 8 },
  { id: 32, label: "Methods and Tools for Industrial Cybersecurity", group: 8 },
  { id: 33, label: "C# Programming", group: 8 },

  { id: 34, label: "Applied Data Science Lab", group: 9 },

  { id: 35, label: "Trailhead", group: 9 },
  { id: 36, label: "Quantum Computing", group: 10 },
  { id: 37, label: "Haskell", group: 10 },
  { id: 38, label: "Toefl", group: 10 },

  { id: 39, label: "B1", group: 10 },
  { id: 40, label: "B2", group: 10 },
  { id: 41, label: "Arduino", group: 10 },
  { id: 42, label: "Highschool thesis", group: 10 },
  /*
{ id: 35, label: "Introduction to Quantum Computing", group: 10 },
{ id: 37, label: "Quantum Winter", group: 10 },
{ id: 37, label: "Quantum Spring Challenge", group: 10 },

{ id: 36, label: "Quantum Computing", group: 10 },
{ id: 38, label: "Salesforce", group: 10 },
{ id: 39, label: "Prolog", group: 10 },
{ id: 40, label: "Python", group: 10 },
{ id: 41, label: "Qiskit", group: 10 },
{ id: 42, label: "Q#", group: 10 },
{ id: 43, label: "C#", group: 10 },
{ id: 44, label: "C", group: 10 },
{ id: 45, label: "Java", group: 10 },
{ id: 46, label: "Artificial Intelligence", group: 11 },
{ id: 47, label: "Machine Learning", group: 11 },
{ id: 48, label: "Haskell", group: 11 },
{ id: 49, label: "Cybersecurity", group: 11 },

Group tpoics like 
{ group: 'edges', data: { source: 'Software Engineering', target: 'C#' } },
    { group: 'edges', data: { source: 'C# Programming', target: 'C#' } },
    { group: 'edges', data: { source: 'Introduction to Quantum Computing', target: 'Qiskit' } },
    { group: 'edges', data: { source: 'Quantum Winter', target: 'Q#' } },
    { group: 'edges', data: { source: 'Introduction to Quantum Computing', target: 'Python' } },
    { group: 'edges', data: { source: 'Quantum Winter', target: 'Python' } },
    { group: 'edges', data: { source: 'Introduction to Quantum Computing', target: 'Quantum Computing' } },
    { group: 'edges', data: { source: 'Quantum Winter', target: 'Quantum Computing' } },
    { group: 'edges', data: { source: 'Informatic Fundamentals I', target: 'C' } },
    { group: 'edges', data: { source: 'Informatic Fundamentals II', target: 'Java' } },
    
    Development and implementation of the Salesforce platform and related applications
    thesis text
    */
]);

// create an array with edges
var edges = new vis.DataSet([
  { from: 100001, to: 100000 },
  { from: 100002, to: 100000 },
  { from: 100003, to: 100000 },

  { from: 10001, to: 100001 },
  { from: 10002, to: 100001 },
  { from: 10003, to: 100002 },
  { from: 10004, to: 100002 },
  { from: 10005, to: 100003 },
  { from: 10006, to: 100003 },

  { from: 1, to: 10001 },
  { from: 2, to: 10001 },
  { from: 3, to: 10001 },
  { from: 4, to: 10001 },

  { from: 5, to: 10002 },
  { from: 6, to: 10002 },
  { from: 7, to: 10002 },

  { from: 8, to: 10003 },
  { from: 9, to: 10003 },
  { from: 10, to: 10003 },
  { from: 11, to: 10003 },

  { from: 12, to: 10004 },
  { from: 13, to: 10004 },
  { from: 14, to: 10004 },
  { from: 15, to: 10004 },

  { from: 16, to: 10005 },
  { from: 17, to: 10005 },
  { from: 18, to: 10005 },
  { from: 19, to: 10005 },

  { from: 20, to: 10006 },

  { from: 24, to: 23 },
  { from: 25, to: 23 },
  { from: 26, to: 23 },
  { from: 27, to: 23 },

  { from: 21, to: 100000 },
  { from: 22, to: 100000 },
  { from: 23, to: 100000 },
]);

// create a network
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {
  interaction: { hover: true },
};
var network = new vis.Network(container, data, options);

//Get the canvas HTML element
var networkCanvas = document
  .getElementById("mynetwork")
  .getElementsByTagName("canvas")[0];
function changeCursor(newCursorStyle) {
  networkCanvas.style.cursor = newCursorStyle;
}
network.on("hoverNode", function () {
  changeCursor("grab");
});
network.on("blurNode", function () {
  changeCursor("default");
});
network.on("hoverEdge", function () {
  changeCursor("grab");
});
network.on("blurEdge", function () {
  changeCursor("default");
});
network.on("dragStart", function () {
  changeCursor("grabbing");
});
network.on("dragging", function () {
  changeCursor("grabbing");
});
network.on("dragEnd", function () {
  changeCursor("grab");
});
