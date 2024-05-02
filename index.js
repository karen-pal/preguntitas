const pages = [
  // Add more pages as needed
"paisaje2.jpeg","process.GIF","colonizado.jpeg"
];

let currentPageIndex = 0;

const PageImg = document.getElementById('Page');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function loadPage(index) {
  const page = pages[index];
  PageImg.src = page; //.left;
}

function showPrevPage() {
  if (currentPageIndex > 0) {
    currentPageIndex--;
    loadPage(currentPageIndex);
  }
}

function showNextPage() {
  if (currentPageIndex < pages.length - 1) {
    currentPageIndex++;
  } else {
    currentPageIndex = 0;
  }
    loadPage(currentPageIndex);
}

prevBtn.addEventListener('click', showPrevPage);
nextBtn.addEventListener('click', showNextPage);

// Load initial page
loadPage(currentPageIndex);
    const words = ["paradoja", "trabajo", "paisaje", "dicotomia", "ciclo"];

    const links2 = words.map((word, index) => ({ source: 0, target: index + 1 }));
    const links = [
      { source: 0, target: 1 }, // Root to "ideas de nacion"
      { source: 0, target: 2 }, // Root to "trabajo"
      { source: 2, target: 3 }, // "trabajo" to "paisaje"
      { source: 2, target: 4 },  // "trabajo" to "dicotomia"
      { source: 1, target: 5 }, // Root to "trabajo"
    ];
    const nodes = [{ id: 0, name: "Ideas de Nación" }, ...words.map((word, index) => ({ id: index + 1, name: word }))];

    const svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height"),
          simulation = d3.forceSimulation(nodes)
                         .force("link", d3.forceLink(links).distance(100))
                         .force("charge", d3.forceManyBody().strength(-200))
                         .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.selectAll(".link")
                    .data(links)
                    .enter().append("line")
                    .attr("class", "link");

    const node = svg.selectAll(".node")
                    .data(nodes)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 10)
                    .style("fill", d => d.id === 0 ? "white" : "blue")
                    .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended));

    const label = svg.selectAll(".label")
                     .data(nodes)
                     .enter().append("text")
                     .attr("class", "label")
                     .text(d => d.name)
                     .style("text-anchor", "middle")
                     .style("font-size", "12px");

    simulation.on("tick", () => {
      link.attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      node.attr("cx", d => d.x)
          .attr("cy", d => d.y);

      label.attr("x", d => d.x)
           .attr("y", d => d.y - 15);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
