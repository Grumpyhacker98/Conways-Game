var grid = document.getElementById("gameGrid");

var editArr = [];

function startGrid() {
    // create grid
    grid.innerHTML = "";
    for (var i = 0; i < 15; i++) {
        row = grid.insertRow(i);
        for (var j = 0; j < 15; j++) {
            cell = row.insertCell(j);
            // cell.onclick = function () { clickCell(this) };
            cell.setAttribute("alive", false)
            // cell.setAttribute("row", i)
            // cell.setAttribute("cell", j)
            cell.classList.add("box", "border", "text-center")
        }
    }
    // static lifeform
    grid.rows[1].cells[2].classList.add("purple")
    grid.rows[1].cells[2].setAttribute("alive", true)

    grid.rows[2].cells[1].classList.add("purple")
    grid.rows[2].cells[1].setAttribute("alive", true)

    grid.rows[2].cells[3].classList.add("purple")
    grid.rows[2].cells[3].setAttribute("alive", true)

    grid.rows[3].cells[2].classList.add("purple")
    grid.rows[3].cells[2].setAttribute("alive", true)


    // occilating lifeform
    grid.rows[2].cells[9].classList.add("purple")
    grid.rows[2].cells[9].setAttribute("alive", true)

    grid.rows[2].cells[7].classList.add("purple")
    grid.rows[2].cells[7].setAttribute("alive", true)

    grid.rows[2].cells[8].classList.add("purple")
    grid.rows[2].cells[8].setAttribute("alive", true)

}

function gameLifeCycle() {
    editArr = [];

    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            cellLifeCheck(i, j)
        }
    }
    console.log(editArr)

    gridEdit(editArr)
}

function cellLifeCheck(lat, long) {
    let adjacentLife = 0
    adjacentLife += callAdjacent(lat + 1, long + 1)
    adjacentLife += callAdjacent(lat + 1, long)
    adjacentLife += callAdjacent(lat + 1, long - 1)
    adjacentLife += callAdjacent(lat - 1, long + 1)
    adjacentLife += callAdjacent(lat - 1, long)
    adjacentLife += callAdjacent(lat - 1, long - 1)
    adjacentLife += callAdjacent(lat, long + 1)
    adjacentLife += callAdjacent(lat, long - 1)

    let cellAlive
    if (grid.rows[lat].cells[long].getAttribute('alive') === 'true') {
        cellAlive = true
    } else {
        cellAlive = false
    }

    if (!cellAlive && adjacentLife === 3) {
        // Births: Each dead cell adjacent to exactly three live neighbors will become live in the next generation.
        console.log(lat, long, "has been born")
        editArr.push({
            lat: lat,
            long: long,
            alive: true,
        })
    } else if (cellAlive && adjacentLife <= 1) {
        // Death by isolation: Each live cell with one or fewer live neighbors will die in the next generation.
        console.log(lat, long, "has died alone")
        editArr.push({
            lat: lat,
            long: long,
            alive: false,
        })
    } else if (cellAlive && adjacentLife <= 3 && adjacentLife >= 2) {
        // Survival: Each live cell with either two or three live neighbors will remain alive for the next generation.
        console.log(lat, long, "has survived")
        // editArr.push({
        //     lat: lat,
        //     long: long,
        //     alive: true,
        // })
    } else if (cellAlive && adjacentLife > 3) {
        // Death by overcrowding: Each live cell with four or more live neighbors will die in the next generation
        console.log(lat, long, "has died overcrowded")
        editArr.push({
            lat: lat,
            long: long,
            alive: false,
        })
    }

}

function callAdjacent(lat, long) {
    if (lat > 14 || lat < 0 || long > 14 || long < 0) return 0

    cell = grid.rows[lat].cells[long]
    if (cell.getAttribute("alive") === "true") {
        return 1
    } else {
        return 0
    }
}

function gridEdit(arr) {
    for (i in arr) {
        cell = grid.rows[arr[i].lat].cells[arr[i].long]

        // if (cell.getAttribute("alive") === "true" && arr[i].alive) {

        // } else if (cell.getAttribute("alive") === "true" && !arr[i].alive) {
        //     cell.setAttribute("alive", false)
        //     cell.classList.remove("purple")
        // } else if (cell.getAttribute("alive") === "false" && arr[i].alive) {
        //     cell.setAttribute("alive", true)
        //     cell.classList.add("purple")
        // } else if (cell.getAttribute("alive") === "false" && !arr[i].alive) {

        // }

        if (!arr[i].alive) {
            cell.setAttribute("alive", false)
            cell.classList.remove("purple")
        } else {
            cell.setAttribute("alive", true)
            cell.classList.add("purple")
        }

    }
}

$("#start").on("click", function () {
    startGrid()
})

$("#test").on("click", function () {
    gameLifeCycle()
})