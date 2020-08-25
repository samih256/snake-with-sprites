const canvas = document.getElementById("gamescreen");
const ctx = canvas.getContext("2d");
const textures = document.querySelectorAll("#gamescreen img");
const startBtn = document.querySelector("#startBtn");

let player_input = "RIGHT";
document.addEventListener("keydown", function(){
    switch(event.keyCode){
    case 39:
        player_input = "RIGHT";
        break;
    case 37:
        player_input = "LEFT";
        break;
    case 40:
        player_input = "DOWN";
        break;
    case 38:
        player_input = "UP";
        break;
    }

    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }

}, false);

const tileWidth = 32;
const rows = 17;
const columns = 23;

canvas.width = tileWidth*columns;
canvas.height = tileWidth*rows;
ctx.imageSmoothingEnabled = false; //empêche le canvas de baiser la gueule à mon pixel art
ctx.fillStyle = "white";


//open world babyyyyyyyyyyyyyyyyyyy... or not.
let tileMap = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ];

var score = 0;

function clearScreen()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkLayout(tile_index){
    //disgusting if-else statement combo incoming...
    var current_tile = tileMap[tile_index];
    if(tile_index>=columns) var upper_tile = tileMap[tile_index-columns];
    else var upper_tile = "none";
    if(columns*rows-tile_index>=columns) var lower_tile = tileMap[tile_index+columns];
    else var lower_tile = "none";
    if(tile_index%columns < columns-1) var right_tile = tileMap[tile_index+1];
    else var right_tile = "none";
    if(tile_index%columns > 0) var left_tile = tileMap[tile_index-1];
    else var left_tile = "none";

    if( upper_tile == current_tile &&
        lower_tile == current_tile &&
        right_tile == current_tile - 1 &&
        left_tile != current_tile)
        return 5;
    else if(upper_tile == current_tile &&
            lower_tile == current_tile &&
            right_tile != current_tile &&
            left_tile == current_tile - 1)
        return 1;

    if( upper_tile != current_tile&&
        lower_tile == current_tile - 1 &&
        right_tile == current_tile &&
        left_tile == current_tile)
        return 6;
    else if(upper_tile == current_tile-1 &&
            lower_tile != current_tile &&
            right_tile == current_tile &&
            left_tile == current_tile)
        return 2;

    if( upper_tile == current_tile &&
        lower_tile != current_tile &&
        right_tile == current_tile &&
        left_tile != current_tile)
        return 7;

    if( upper_tile == current_tile &&
        lower_tile != current_tile &&
        right_tile != current_tile &&
        left_tile == current_tile)
        return 8;
    
    if( upper_tile != current_tile &&
        lower_tile == current_tile &&
        right_tile != current_tile &&
        left_tile == current_tile)
        return 9;

    if( upper_tile != current_tile &&
        lower_tile == current_tile &&
        right_tile == current_tile &&
        left_tile != current_tile)
        return 10;

    return 0;
}

function drawMap(){
    var x = 0;
    var y = 0;
    for(var i=0;i<(rows*columns);i++){
        x = i%columns;
        if(x == 0 && i != 0)
            y++;

        switch(tileMap[i]){
        case 0:
            ctx.drawImage(textures[4], 16, 16, 16, 16, tileWidth*x, tileWidth*y, tileWidth, tileWidth);
            break;
        case 1:
            switch(checkLayout(i)){
            case 1:
                ctx.drawImage(textures[4], 32, 16, 16, 16, tileWidth*x, tileWidth*y, tileWidth, tileWidth);
                break;
            case 2:
                ctx.drawImage(textures[4], 16, 32, 16, 16, tileWidth*x, tileWidth*y, tileWidth, tileWidth);
                break;
            case 5:
                ctx.drawImage(textures[4], 0, 16, 16, 16, tileWidth*x, tileWidth*y, tileWidth, tileWidth);
                break;
            case 6:
                ctx.drawImage(textures[4], 16, 0, 16, 16, tileWidth*x, tileWidth*y, tileWidth, tileWidth);
                break;
            case 7:
                ctx.drawImage(textures[4], 0, 32, 16, 16, tileWidth*x, tileWidth*y, tileWidth, tileWidth);
                break;
            case 8:
                ctx.drawImage(textures[4], 32, 32, 16, 16, tileWidth*x, tileWidth*y, tileWidth, tileWidth);
                break;
            case 9:
                ctx.drawImage(textures[4], 32, 0, 16, 16, tileWidth*x, tileWidth*y, tileWidth, tileWidth);
                break;
            case 10:
                ctx.drawImage(textures[4], 0, 0, 16, 16, tileWidth*x, tileWidth*y, tileWidth, tileWidth);
                break;
            }
            break;
        }
    }
}

// classe du serpent
function Snake(){
    this.length = 3;
    this.body = [26, 25, 24];
    this.direction = "RIGHT";
    this.isAlive = true;

    this.getSnakeShape = function(segment_index){
        //and another one... gets the shape of the snake's body to choose the right texture
        var current_pos = this.body[segment_index];
        if(segment_index!=0) var last_segment = this.body[segment_index-1];
        else var last_segment = "none";
        if(segment_index!=this.length-1) var next_segment = this.body[segment_index+1];
        else var next_segment = "none";

        if((last_segment == "none" &&
            next_segment == current_pos+1)||
            (last_segment == current_pos+1 &&
            next_segment == "none"))
            return 1;

        if((last_segment == "none" &&
            next_segment == current_pos-columns)||
            (last_segment == current_pos-columns &&
            next_segment == "none"))
            return 2;

        if((last_segment == "none" &&
            next_segment == current_pos-1)||
            (last_segment == current_pos-1 &&
            next_segment == "none"))
            return 3;

        if((last_segment == "none" &&
            next_segment == current_pos+columns)||
            (last_segment == current_pos+columns &&
            next_segment == "none"))
            return 4;

        if((last_segment == current_pos-columns &&
            next_segment == current_pos+columns)||
            (last_segment == current_pos+columns &&
            next_segment == current_pos-columns))
            return 5;

        if((last_segment == current_pos-1 &&
            next_segment == current_pos+1)||
            (last_segment == current_pos+1 &&
            next_segment == current_pos-1))
            return 6;

        if((last_segment == current_pos-columns &&
            next_segment == current_pos+1)||
            (last_segment == current_pos+1 &&
            next_segment == current_pos-columns))
            return 7;

        if((last_segment == current_pos-1 &&
            next_segment == current_pos-columns)||
            (last_segment == current_pos-columns &&
            next_segment == current_pos-1))
            return 8;

        if((last_segment == current_pos-1 &&
            next_segment == current_pos+columns)||
            (last_segment == current_pos+columns &&
            next_segment == current_pos-1))
            return 9;
        
        if((last_segment == current_pos+1 &&
            next_segment == current_pos+columns)||
            (last_segment == current_pos+columns &&
            next_segment == current_pos+1))
            return 10;
    }

    this.drawSnake = function(){
        for(var i=0;i<this.length;i++){
            switch(this.getSnakeShape(i)){
            case 1:
                if(i==0)
                    ctx.drawImage(textures[0], 16, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                else if(i==this.length-1)
                    ctx.drawImage(textures[2], 0, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                break;
            case 2:
                if(i==0)
                    ctx.drawImage(textures[0], 32, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                else if(i==this.length-1)
                    ctx.drawImage(textures[2], 16, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                break;
            case 3:
                if(i==0)
                    ctx.drawImage(textures[0], 0, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                else if(i==this.length-1)
                    ctx.drawImage(textures[2], 48, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                break;
            case 4:
                if(i==0)
                    ctx.drawImage(textures[0], 48, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                else if(i==this.length-1)
                    ctx.drawImage(textures[2], 32, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                break;
            case 5:
                ctx.drawImage(textures[1], 80, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                break;
            case 6:
                ctx.drawImage(textures[1], 64, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                break;
            case 7:
                ctx.drawImage(textures[1], 0, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                break;
            case 8:
                ctx.drawImage(textures[1], 16, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                break;
            case 9:
                ctx.drawImage(textures[1], 48, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                break;
            case 10:
                ctx.drawImage(textures[1], 32, 0, 16, 16, (this.body[i]%columns)*tileWidth, Math.floor(this.body[i]/columns)*tileWidth, tileWidth, tileWidth);
                break;
            }
        }
    }

    this.getDirection = function(){
        switch(player_input){
        case "RIGHT":
            if(this.direction != "LEFT")
                this.direction = "RIGHT";
            break;
        case "LEFT":
            if(this.direction != "RIGHT")
                this.direction = "LEFT";
            break;
        case "UP":
            if(this.direction != "DOWN")
                this.direction = "UP";
            break;
        case "DOWN":
            if(this.direction != "UP")
                this.direction = "DOWN";
            break;
        }
    }

    this.move = function(){
        prev_pos = this.body.slice();

        switch(this.direction){
        case "RIGHT":
            this.body[0]++;
            break;
        case "LEFT":
            this.body[0]--;
            break;
        case "UP":
            this.body[0]-=columns;
            break;
        case "DOWN":
            this.body[0]+=columns;
            break;
        }

        for(var i = 1 ; i < this.length ; i++){
            this.body[i] = prev_pos[i-1];
        }
    }
}

function spawnNewApple(apple, player_snake){
    var new_apple = 0;
    var spawned_on_player = false;

    do{
        spawned_on_player = false;
        new_apple = Math.floor(Math.random()*(columns*rows));

        for(var i=0;i<player_snake.length;i++){
            if(new_apple == player_snake.body[i]){
                spawned_on_player = true;
                break;
            }
        }
    } while(tileMap[new_apple] == 1 || spawned_on_player);

    //if the newly spawned apple is not within a wall nor onto the player...
    apple.push(new_apple);
    apple.shift(); //supprime la pomme précédente
}

function drawApple(apple){
    ctx.drawImage(textures[3], 0, 0, 16, 16, (apple[0]%columns)*tileWidth, Math.floor(apple[0]/columns)*tileWidth, tileWidth, tileWidth);
}

function drawScore(){
    ctx.fillText("score: "+score, 50, 30);
}

function updateGame(player_snake, move_cd, apple){
    if(move_cd == 0){
        player_snake.getDirection();
        player_snake.move();
        move_cd = 10;
    }
    else
        move_cd--;

    if(tileMap[player_snake.body[0]]==1){
        player_snake.isAlive = false;
        console.log("game over");
    }
    else{
        for(var i=4;i<player_snake.length;i++){
            if(player_snake.body[0] == player_snake.body[i]){
                player_snake.isAlive = false;
                console.log("game over");
                break;
            }
        }
    }
    
    if(player_snake.body[0]==apple[0]){
        spawnNewApple(apple, player_snake);
        player_snake.length++;
        score++;
        console.log("yummy");
    }

    //console.log("cooldown= "+move_cd);
    return move_cd;
}

function updateDisplay(player_snake, apple){
    clearScreen();
    drawMap();
    drawScore();
    drawApple(apple);
    player_snake.drawSnake();

    if(!player_snake.isAlive){
        ctx.font = "100px mc-pixels";
        ctx.fillText("u ded m8", 130, 330);
    }
        
    //console.log("display updated!");
}

function gameLoop(player_snake, move_cd, apple){
    move_cd = updateGame(player_snake, move_cd, apple);
    updateDisplay(player_snake, apple);

    if(player_snake.isAlive)
        window.requestAnimationFrame(function(){gameLoop(player_snake, move_cd, apple)});
    else
        startBtn.style.display = "block";
}

function startGame(){
    ctx.font = "20px mc-pixels";
    player_input = "RIGHT";
    startBtn.style.display = "none";
    var move_cd = 1;
    score = 0;
    var snake = new Snake();
    var apple = [0];
    spawnNewApple(apple, snake);
    gameLoop(snake, move_cd, apple);
}

startGame();
