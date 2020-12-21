var grid = document.getElementById("gameGrid");

var timerVar;

var editArr = [];

var mapSize = {
    lat: 20,
    long: 20,
}

var clickSound = new sound("./sound/click.mp3")

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


function clickCell(cell) {
    if (cell.getAttribute("alive") === "true") {
        cell.setAttribute("alive", false)
        cell.classList.remove("purple")
    } else {
        cell.setAttribute("alive", true)
        cell.classList.add("purple")
    }
}

function startGrid() {
    // create grid
    grid.innerHTML = "";
    clearInterval(timerVar)
    for (var i = 0; i < mapSize.lat; i++) {
        row = grid.insertRow(i);
        for (var j = 0; j < mapSize.long; j++) {
            cell = row.insertCell(j);
            cell.onclick = function () { clickCell(this) };
            cell.setAttribute("alive", false);
            // cell.setAttribute("row", i)
            // cell.setAttribute("cell", j)
            cell.classList.add("box", "border");
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

    timerVar = setInterval(gameLifeCycle, 1000);
}

function gameLifeCycle() {
    clickSound.play()
    editArr = [];

    for (var i = 0; i < mapSize.lat; i++) {
        for (var j = 0; j < mapSize.long; j++) {
            cellLifeCheck(i, j)
        }
    }

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

$("#unpause").on("click", function () {
    clearInterval(timerVar)
    timerVar = setInterval(gameLifeCycle, 1000);
})

$("#pause").on("click", function () {
    clearInterval(timerVar)
})