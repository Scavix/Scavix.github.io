var cy = cytoscape({
    container: document.getElementById('cy'),
    style: [
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(id)'
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'curve-style': 'bezier'
            }
        }],
    layout: {
        name: 'grid'
    }
});

let options = {
    name: 'circle',

    fit: true, // whether to fit the viewport to the graph
    padding: 30, // the padding on fit
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    radius: undefined, // the radius of the circle
    startAngle: 3 / 2 * Math.PI, // where nodes start in radians
    sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled
    animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 

};

var eles = cy.add([
    { group: 'nodes', data: { id: 'Informatic Fundamentals I' } },
    { group: 'nodes', data: { id: 'Calculus I' } },
    { group: 'nodes', data: { id: 'Linear Algebra and Analitic Geometry' } },
    { group: 'nodes', data: { id: 'English' } },
    { group: 'nodes', data: { id: 'Informatic Fundamentals II' } },
    { group: 'nodes', data: { id: 'Calculus II' } },
    { group: 'nodes', data: { id: 'Logic Networks' } },

    { group: 'nodes', data: { id: 'Physics' } },
    { group: 'nodes', data: { id: 'Electrical Engineering' } },
    { group: 'nodes', data: { id: 'Economics and Business Organization' } },
    { group: 'nodes', data: { id: 'Computer Architecture' } },
    { group: 'nodes', data: { id: 'Telecomunication Fundamentals' } },
    { group: 'nodes', data: { id: 'Operating Systems' } },
    { group: 'nodes', data: { id: 'Information Systems' } },
    { group: 'nodes', data: { id: 'Applied Mathemathics' } },

    { group: 'nodes', data: { id: 'Control Systems' } },
    { group: 'nodes', data: { id: 'Software Engineering' } },
    { group: 'nodes', data: { id: 'Eletronics' } },
    { group: 'nodes', data: { id: 'Web Technologies' } },
    { group: 'nodes', data: { id: 'Computer Networks' } },

    { group: 'nodes', data: { id: 'Intership' } },
    { group: 'nodes', data: { id: 'Thesis' } },

    { group: 'nodes', data: { id: 'Constraint Logic Programming' } },
    { group: 'nodes', data: { id: 'Management Information Systems' } },
    { group: 'nodes', data: { id: 'Communication Systems' } },
    { group: 'nodes', data: { id: 'Mobile and Wireless Telecomunications Systems' } },

    { group: 'nodes', data: { id: 'Cyberchallenge' } },

    { group: 'nodes', data: { id: 'Introduction to Video Games Creation' } },

    { group: 'nodes', data: { id: 'Logic and Argumentation' } },
    { group: 'nodes', data: { id: 'Fundamentals of Industrial Cybersecurity    ' } },
    { group: 'nodes', data: { id: 'Methods and Tools for Industrial Cybersecurity' } },
    { group: 'nodes', data: { id: 'C# Programming' } },
    
    { group: 'nodes', data: { id: 'Applied Data Science Lab' } },

    { group: 'nodes', data: { id: 'Trailhead' } },

    /*{ group: 'nodes', data: { id: 'Introduction to Quantum Computing' } },
    { group: 'nodes', data: { id: 'Quantum Computing' } },
    { group: 'nodes', data: { id: 'Quantum Winter' } },
    { group: 'nodes', data: { id: 'Salesforce' } },
    { group: 'nodes', data: { id: 'Prolog' } },
    { group: 'nodes', data: { id: 'Python' } },
    { group: 'nodes', data: { id: 'Qiskit' } },
    { group: 'nodes', data: { id: 'Q#' } },
    { group: 'nodes', data: { id: 'C#' } },
    { group: 'nodes', data: { id: 'C' } },
    { group: 'nodes', data: { id: 'Java' } },
    { group: 'nodes', data: { id: 'Artificial Intelligence' } },
    { group: 'nodes', data: { id: 'Machine Learning' } },
    { group: 'nodes', data: { id: 'Haskell' } },
    { group: 'nodes', data: { id: 'Cybersecurity' } },
    { group: 'edges', data: { source: 'Software Engineering', target: 'C#' } },
    { group: 'edges', data: { source: 'C# Programming', target: 'C#' } },
    { group: 'edges', data: { source: 'Introduction to Quantum Computing', target: 'Qiskit' } },
    { group: 'edges', data: { source: 'Quantum Winter', target: 'Q#' } },
    { group: 'edges', data: { source: 'Introduction to Quantum Computing', target: 'Python' } },
    { group: 'edges', data: { source: 'Quantum Winter', target: 'Python' } },
    { group: 'edges', data: { source: 'Introduction to Quantum Computing', target: 'Quantum Computing' } },
    { group: 'edges', data: { source: 'Quantum Winter', target: 'Quantum Computing' } },
    { group: 'edges', data: { source: 'Informatic Fundamentals I', target: 'C' } },
    { group: 'edges', data: { source: 'Informatic Fundamentals II', target: 'Java' } },*/

]);

cy.layout(options).run();
console.log(cy.getElementById('C#'))