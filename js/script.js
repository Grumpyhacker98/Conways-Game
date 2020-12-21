var grid = document.getElementById("gameGrid");

var timerVar;

var editArr = [];

var mapSize = $("#gameSize").val()

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

// click functions
$("#start").on("click", function () {
    startGrid()
})

$("#unpause").on("click", function () {
    clearInterval(timerVar)
    let time = parseFloat($("#gameTime").val()) * 1000;
    timerVar = setInterval(gameLifeCycle, time);
})

$("#pause").on("click", function () {
    clearInterval(timerVar)
})

$("#test").on("click", function () {
    // console.log($("#mapLength").val())
})

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
    mapSize = $("#gameSize").val()

    grid.innerHTML = "";
    clearInterval(timerVar)
    // create grid
    for (var i = 0; i < mapSize; i++) {
        row = grid.insertRow(i);
        for (var j = 0; j < mapSize; j++) {
            cell = row.insertCell(j);
            cell.onclick = function () { clickCell(this) };
            cell.setAttribute("alive", false);
            cell.classList.add("box", "border");
        }
    }

    let time = parseFloat($("#gameTime").val()) * 1000;
    timerVar = setInterval(gameLifeCycle, time);

    // some examples

    // static lifeform
    if (mapSize >= 6) {
        grid.rows[1].cells[2].classList.add("purple")
        grid.rows[1].cells[2].setAttribute("alive", true)

        grid.rows[2].cells[1].classList.add("purple")
        grid.rows[2].cells[1].setAttribute("alive", true)

        grid.rows[2].cells[3].classList.add("purple")
        grid.rows[2].cells[3].setAttribute("alive", true)

        grid.rows[3].cells[2].classList.add("purple")
        grid.rows[3].cells[2].setAttribute("alive", true)

    }

    // occilating lifeform
    if (mapSize >= 20) {
        grid.rows[2].cells[9].classList.add("purple")
        grid.rows[2].cells[9].setAttribute("alive", true)

        grid.rows[2].cells[7].classList.add("purple")
        grid.rows[2].cells[7].setAttribute("alive", true)

        grid.rows[2].cells[8].classList.add("purple")
        grid.rows[2].cells[8].setAttribute("alive", true)

    }

    // gosper glider gun
    if (mapSize >= 40) {
        // left box
        grid.rows[10].cells[1].classList.add("purple")
        grid.rows[10].cells[1].setAttribute("alive", true)
        grid.rows[10].cells[2].classList.add("purple")
        grid.rows[10].cells[2].setAttribute("alive", true)
        grid.rows[11].cells[1].classList.add("purple")
        grid.rows[11].cells[1].setAttribute("alive", true)
        grid.rows[11].cells[2].classList.add("purple")
        grid.rows[11].cells[2].setAttribute("alive", true)
        // left occilator
        grid.rows[10].cells[11].classList.add("purple")
        grid.rows[10].cells[11].setAttribute("alive", true)
        grid.rows[11].cells[11].classList.add("purple")
        grid.rows[11].cells[11].setAttribute("alive", true)
        grid.rows[12].cells[11].classList.add("purple")
        grid.rows[12].cells[11].setAttribute("alive", true)
        grid.rows[9].cells[12].classList.add("purple")
        grid.rows[9].cells[12].setAttribute("alive", true)
        grid.rows[13].cells[12].classList.add("purple")
        grid.rows[13].cells[12].setAttribute("alive", true)
        grid.rows[8].cells[13].classList.add("purple")
        grid.rows[8].cells[13].setAttribute("alive", true)
        grid.rows[14].cells[13].classList.add("purple")
        grid.rows[14].cells[13].setAttribute("alive", true)
        grid.rows[8].cells[14].classList.add("purple")
        grid.rows[8].cells[14].setAttribute("alive", true)
        grid.rows[14].cells[14].classList.add("purple")
        grid.rows[14].cells[14].setAttribute("alive", true)
        grid.rows[11].cells[15].classList.add("purple")
        grid.rows[11].cells[15].setAttribute("alive", true)
        grid.rows[9].cells[16].classList.add("purple")
        grid.rows[9].cells[16].setAttribute("alive", true)
        grid.rows[13].cells[16].classList.add("purple")
        grid.rows[13].cells[16].setAttribute("alive", true)
        grid.rows[10].cells[17].classList.add("purple")
        grid.rows[10].cells[17].setAttribute("alive", true)
        grid.rows[11].cells[17].classList.add("purple")
        grid.rows[11].cells[17].setAttribute("alive", true)
        grid.rows[12].cells[17].classList.add("purple")
        grid.rows[12].cells[17].setAttribute("alive", true)
        grid.rows[11].cells[18].classList.add("purple")
        grid.rows[11].cells[18].setAttribute("alive", true)
        // right occilator
        grid.rows[8].cells[21].classList.add("purple")
        grid.rows[8].cells[21].setAttribute("alive", true)
        grid.rows[9].cells[21].classList.add("purple")
        grid.rows[9].cells[21].setAttribute("alive", true)
        grid.rows[10].cells[21].classList.add("purple")
        grid.rows[10].cells[21].setAttribute("alive", true)
        grid.rows[8].cells[22].classList.add("purple")
        grid.rows[8].cells[22].setAttribute("alive", true)
        grid.rows[9].cells[22].classList.add("purple")
        grid.rows[9].cells[22].setAttribute("alive", true)
        grid.rows[10].cells[22].classList.add("purple")
        grid.rows[10].cells[22].setAttribute("alive", true)
        grid.rows[7].cells[23].classList.add("purple")
        grid.rows[7].cells[23].setAttribute("alive", true)
        grid.rows[11].cells[23].classList.add("purple")
        grid.rows[11].cells[23].setAttribute("alive", true)
        grid.rows[6].cells[25].classList.add("purple")
        grid.rows[6].cells[25].setAttribute("alive", true)
        grid.rows[7].cells[25].classList.add("purple")
        grid.rows[7].cells[25].setAttribute("alive", true)
        grid.rows[11].cells[25].classList.add("purple")
        grid.rows[11].cells[25].setAttribute("alive", true)
        grid.rows[12].cells[25].classList.add("purple")
        grid.rows[12].cells[25].setAttribute("alive", true)
        // right box
        grid.rows[8].cells[35].classList.add("purple")
        grid.rows[8].cells[35].setAttribute("alive", true)
        grid.rows[9].cells[35].classList.add("purple")
        grid.rows[9].cells[35].setAttribute("alive", true)
        grid.rows[9].cells[36].classList.add("purple")
        grid.rows[9].cells[36].setAttribute("alive", true)
        grid.rows[8].cells[36].classList.add("purple")
        grid.rows[8].cells[36].setAttribute("alive", true)
    }

}

function gameLifeCycle() {
    clickSound.play()
    editArr = [];

    for (var i = 0; i < mapSize; i++) {
        for (var j = 0; j < mapSize; j++) {
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
        editArr.push({
            lat: lat,
            long: long,
            alive: true,
        })
    } else if (cellAlive && adjacentLife <= 1) {
        // Death by isolation: Each live cell with one or fewer live neighbors will die in the next generation.
        editArr.push({
            lat: lat,
            long: long,
            alive: false,
        })
    } else if (cellAlive && adjacentLife <= 3 && adjacentLife >= 2) {
        // Survival: Each live cell with either two or three live neighbors will remain alive for the next generation.
    } else if (cellAlive && adjacentLife > 3) {
        // Death by overcrowding: Each live cell with four or more live neighbors will die in the next generation
        editArr.push({
            lat: lat,
            long: long,
            alive: false,
        })
    }
}

function callAdjacent(lat, long) {
    if (lat > mapSize - 1 || lat < 0 || long > mapSize - 1 || long < 0) return 0;
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