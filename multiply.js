var savedTime = 0;
var timePerRound = 0;
var rounds = 0;
var gridX = 0;
var gridY = 0;
var max = 0;
var xVal = new Array(gridX);
var yVal = new Array(gridY);
var isClassroomMode = false;

function startGame(difficulty){
    switch (difficulty){
        case 1:
            gridX = 3;
            gridY = 3;
            timePerRound = 60;
            max = 6;
            break;
        case 2:
            gridX = 4;
            gridY = 3;
            timePerRound = 60;
            max = 10;
            break;
        case 3:
            gridX = 4;
            gridY = 4;
            timePerRound = 40;
            max = 12;
            break;
        default:
            break;
    }
    startSection()
}
function startSection() {
    xVal = new Array(gridX);
    yVal = new Array(gridY);
    var i = 1;
    while (i <= gridX){
        var t = Math.floor(Math.random() * max) + 1;
            while (xVal.contains(t)){
                t = Math.floor(Math.random() * max) + 1;
            }
        xVal[i-1] = t;
        i++;
    }
    var j = 1;
    while (j <= gridY){
        t = Math.floor(Math.random() * max) + 1;
        while (yVal.contains(t)){
            t = Math.floor(Math.random() * max) + 1;
        }
        yVal[j-1] = t;
        j++;
    }
    document.getElementById("postsection").style.display = "none";
    document.getElementById("init").style.display = "none";
    document.getElementById("game").style.display = "flex";
    rounds++;
    var tableHTML = "<div class='game-row' id='timer'>" + timePerRound.toString() + "</div><div class='game-table'><div class='game-row'><p class='blank'></p>";
    i = 1;
    while (i <= gridX){
        tableHTML = tableHTML + "<p class='game-header-x'>" + xVal[i-1].toString() + "</p>";
        i++;
    }
    tableHTML = tableHTML + "</div>";

    j = 1;
    while (j <= gridY){
        tableHTML = tableHTML + "<div class='game-row'>";
        tableHTML = tableHTML + "<p class='game-header-y'>" + yVal[j-1].toString() + "</p>";
        i = 1;
        while (i <= gridX){
            tableHTML = tableHTML + "<input class='game-input' id='" + i.toString() + "-" + j.toString() + "' type='number' />";
            i++;
        }
        tableHTML = tableHTML + "</div>";
        j++;
    }

    tableHTML = tableHTML + "<div class='game-row'><img class='fw-button done-button' onclick='finish();' src='img/done.svg' </div></div>";
    document.getElementById("game").innerHTML = tableHTML;
    startTime();
}
var seconds_left;
function startTime(){
    seconds_left = timePerRound;
    var interval = setInterval(function() {
        document.getElementById('timer').innerHTML = --seconds_left;

        if (seconds_left <= 0)
        {
            finish();
            clearInterval(interval);
        }
    }, 1000);
}

function finish(){
    var isIncorrect = false;
    var remainingTime = seconds_left;
    seconds_left = 0;

    var j = 1;
    while (j <= gridY) {
        var i = 1;
        while (i <= gridX){
            console.log(roughScale(document.getElementById(i.toString() + "-" + j.toString()).value, 10)/100);
            console.log((xVal[i-1]*yVal[j-1]));
            console.log("------------------------");
            if (roughScale(document.getElementById(i.toString() + "-" + j.toString()).value, 10)/100 !== (xVal[i-1]*yVal[j-1])){
                isIncorrect = true;
            }
            i++;
        }
        j++;
    }
    if (!isIncorrect){
        savedTime += remainingTime;
    }
    document.getElementById("game").style.display = "none";
    document.getElementById("postsection").style.display = "flex";
    document.getElementById("score-total").innerHTML = savedTime.toString();
}

function levelUp(){
    //TODO modify params
    startSection()
}

function roughScale(x, base) {
    var parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0 }
    return parsed * 100;
}

function review(){
    //TODO action stub
}

function fireKeyPress(event){
    switch(event.keyCode){
        case 116:
            isClassroomMode = !isClassroomMode;
            if (isClassroomMode){
                //TODO display seed modal
            }
            else {
                //TODO change to toast
                alert("Classroom mode deactivated");
            }
            break;
        default:
            break;
    }
}

//PSEUDO_RANDOM SEED TEACHER MODE