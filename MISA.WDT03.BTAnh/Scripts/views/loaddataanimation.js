
let positionX = 0;
function run() {
        positionX++;
        positionX = positionX % 500;
        $("pacman").css("left", positionX + "px")
        debugger
    }

