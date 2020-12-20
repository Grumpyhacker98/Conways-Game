var grid = document.getElementById("gameGrid")

function startGrid() {
    // create grid
    grid.innerHTML = "";
    for (var i = 0; i < 15; i++) {
        row = grid.insertRow(i);
        for (var j = 0; j < 15; j++) {
            cell = row.insertCell(j);
            // cell.onclick = function () { clickCell(this) };
            cell.setAttribute("mine", false)
            cell.setAttribute("adjacent", 0)
            cell.setAttribute("row", i)
            cell.setAttribute("cell", j)
            cell.classList.add("box", "border", "text-center")
        }
    }
}

function lifeCycle() {
    var oldGrid = Object.create(grid)
    console.log(oldGrid)
}

$("#start").on("click", function () {
    startGrid()
})

$("#test").on("click", function () {
    lifeCycle()
})