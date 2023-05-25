// DOM element where the Timeline will be attached
var container = document.getElementById("visualization");
var groups = new vis.DataSet();
var names = ["Bologna", "Thessaloniki", "Milan", "Uppsala", "Other"];

groups.add([
  {
    id: "HighSchool",
    content: "High School Period",
    showNested: false,
    nestedGroups: [
      "School",
      "Courses",
    ]
  },
  {
    id: "Bologna",
    content: "Bologna",
    nestedGroups: ["Year1", "Year2", "Year3"],
  },
  {
    id: "Thessaloniki",
    content: "Thessaloniki",
    nestedGroups: ["Erasmus"],
  },
  {
    id: "Year1",
    content: "Year 1",
    nestedGroups: ["Semester1", "Semester2"],
  },
  {
    id: "Year2",
    content: "Year 2",
    nestedGroups: ["Semester3", "Semester4"],
  },
  {
    id: "Year3",
    content: "Year 3",
    nestedGroups: ["Semester5", "Semester6"],
  },
  {
    id: "Semester1",
    content: "Semester 1",
  },
  {
    id: "Semester2",
    content: "Semester 2",
  },
  {
    id: "Semester3",
    content: "Semester 3",
  },
  {
    id: "Semester4",
    content: "Semester 4",
  },
  {
    id: "Semester5",
    content: "Semester 5",
  },
  {
    id: "Semester6",
    content: "Semester 6",
  },
  {
    id: "Erasmus",
    content: "Erasmus",
  },
  {
    id: "School",
    content: "School",
  },
  {
    id: "Courses",
    content: "Courses",
  },
]);

for (var g = 2; g < names.length; g++) {
  groups.add({ id: names[g], content: names[g] });
}

// Create a DataSet (allows two way data-binding)
var items = new vis.DataSet([
  /*{ id: "B1", content: "B1 English", start: "2016-09", end: "2019-03", group: "Semester1"},


  { id: "Car_License", content: "Car License", start: "2017-09", end: "2019-03", group: "Semester1"},

  license
b1
b2
90
ARduino
thesis*/

  {
    id: "Informatic_Fundamentals_I",
    content: "Informatic Fundamentals I",
    start: "2018-09",
    end: "2019-03",
    group: "Semester1",
  },
  {
    id: "Calculus_I",
    content: "Calculus I",
    start: "2018-09",
    end: "2019-03",
    group: "Semester1",
  },
  {
    id: "Algebra_and_Geometry",
    content: "Algebra and Geometry",
    start: "2018-09",
    end: "2019-03",
    group: "Semester1",
  },
  {
    id: "English",
    content: "English",
    start: "2018-09",
    end: "2019-03",
    group: "Semester1",
  },
  {
    id: "Informatic_Fundamentals_II",
    content: "Informatic Fundamentals II",
    start: "2019-03",
    end: "2019-08",
    group: "Semester2",
  },
  {
    id: "Calculus_II",
    content: "Calculus II",
    start: "2019-03",
    end: "2019-08",
    group: "Semester2",
  },
  {
    id: "Logic_Networks",
    content: "Logic Networks",
    start: "2019-03",
    end: "2019-08",
    group: "Semester2",
  },

  {
    id: "Physics",
    content: "Physics",
    start: "2019-09",
    end: "2020-03",
    group: "Semester3",
  },
  {
    id: "Applied_Mathematics",
    content: "Applied Mathematics",
    start: "2019-09",
    end: "2020-03",
    group: "Semester3",
  },
  {
    id: "Computer_Architecture",
    content: "Computer Architecture",
    start: "2019-09",
    end: "2020-03",
    group: "Semester3",
  },
  {
    id: "Information_Systems",
    content: "Information Systems",
    start: "2019-09",
    end: "2020-03",
    group: "Semester3",
  },
  {
    id: "Telecommunication_Fundamentals",
    content: "Telecommunication Fundamentals",
    start: "2020-03",
    end: "2020-08",
    group: "Semester4",
  },
  {
    id: "Operating_Systems",
    content: "Operating Systems",
    start: "2020-03",
    end: "2020-08",
    group: "Semester4",
  },
  {
    id: "Electrical_Engineering",
    content: "Electrical Engineering",
    start: "2020-03",
    end: "2020-08",
    group: "Semester4",
  },
  {
    id: "Economics_and_Business_Organization",
    content: "Economics and Business Organization",
    start: "2020-03",
    end: "2020-08",
    group: "Semester4",
  },

  {
    id: "Computer_Networks",
    content: "Computer Networks",
    start: "2020-09",
    end: "2021-03",
    group: "Semester5",
  },
  {
    id: "Web_Technologies",
    content: "Web Technologies",
    start: "2020-09",
    end: "2021-03",
    group: "Semester5",
  },
  {
    id: "Control_Systems",
    content: "Control Systems",
    start: "2020-09",
    end: "2021-03",
    group: "Semester5",
  },
  {
    id: "Electronics",
    content: "Electronics",
    start: "2020-09",
    end: "2021-03",
    group: "Semester5",
  },

  {
    id: "Software_Engineering",
    content: "Software Engineering",
    start: "2021-03",
    end: "2021-08",
    group: "Semester6",
  },
  {
    id: "Thesis",
    content: "Thesis",
    start: "2021-03",
    end: "2021-08",
    group: "Semester6",
  },

  {
    id: "Constraint_Logic_Programming",
    content: "Constraint Logic Programming",
    start: "2021-02",
    end: "2021-8",
    group: "Erasmus",
  },
  {
    id: "Management_Information_Systems",
    content: "Management Information Systems",
    start: "2021-02",
    end: "2021-8",
    group: "Erasmus",
  },
  {
    id: "Communication_Systems",
    content: "Communication Systems",
    start: "2021-02",
    end: "2021-8",
    group: "Erasmus",
  },
  {
    id: "Mobile_and_Wireless_Telecommunications_Systems",
    content: "Mobile and Wireless Telecommunications Systems",
    start: "2021-02",
    end: "2021-8",
    group: "Erasmus",
  },

  {
    id: "Internship",
    content: "Internship",
    start: "2021-08",
    end: "2021-10",
    group: "Milan",
  },
  {
    id: "Job",
    content: "Job",
    start: "2021-10",
    end: "2022-11",
    group: "Milan",
  },
  {
    id: "Cyberchallenge",
    content: "Cyberchallenge 2022",
    start: "2022-02",
    end: "2022-08",
    group: "Milan",
  },

  {
    id: "Logic_and_Argumentation",
    content: "Logic and Argumentation",
    start: "2022-11",
    end: "2023-03",
    group: "Uppsala",
  },
  {
    id: "Fundamentals_of_Industrial_Cybersecurity",
    content: "Fundamentals of Industrial Cybersecurity",
    start: "2022-11",
    end: "2023-03",
    group: "Uppsala",
  },
  {
    id: "Methods_and_Tools_for_Industrial_Cybersecurity",
    content: "Methods and Tools for Industrial Cybersecurity",
    start: "2022-11",
    end: "2023-03",
    group: "Uppsala",
  },
  {
    id: "C#_Programming",
    content: "C# Programming",
    start: "2022-11",
    end: "2023-03",
    group: "Uppsala",
  },

  {
    id: "Quantum",
    content: "Quantum Computing",
    start: "2022-09",
    end: "2023-05",
    group: "Other",
  },
  {
    id: "Introduction_to_Video_Games_Creation",
    content: "Introduction to Video Games Creation",
    start: "2021-08",
    end: "2022-09",
    group: "Other",
  },
  {
    id: "Toefl",
    content: "Toefl 90",
    start: "2022-01",
    end: "2022-03",
    group: "Other",
  },
  {
    id: "License",
    content: "Car License",
    start: "2018-01",
    end: "2018-11",
    group: "Courses",
  },
  {
    id: "Arduino",
    content: "Arduino Course",
    start: "2017-01",
    end: "2018-06",
    group: "Courses",
  },
  {
    id: "B1",
    content: "B1 English",
    start: "2017-01",
    end: "2017-05",
    group: "School",
  },
  {
    id: "B2",
    content: "B2 English",
    start: "2018-01",
    end: "2018-05",
    group: "School",
  },
  {
    id: "Highschool_Thesis",
    content: "Thesis",
    start: "2018-01",
    end: "2018-07",
    group: "School",
  },
]);

// Configuration for the Timeline
var options = {
  start: "2023-01",
  end: "2023-05",
  horizontalScroll: true,
  zoomKey: "ctrlKey",
  orientation: "both",
  zoomMin: 1000 * 60 * 60 * 240,
  maxHeight: "100%",
  minHeight: "100%",
};
// Create a Timeline
var timeline = new vis.Timeline(container);
timeline.setOptions(options);
timeline.setGroups(groups);
timeline.setItems(items);
timeline.setWindow("2018-09", "2021-08", { animation: true });
