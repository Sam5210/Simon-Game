var level = $("#level-title");
var randomColour = [];
var currentColourIndex = 0;
var levelCount = 1;
var success = true;
var gameOver = new Audio("sounds/wrong.mp3");
var blueButtonAudio = new Audio("sounds/blue.mp3");
var redButtonAudio = new Audio("sounds/red.mp3"); 
var yellowButtonAudio = new Audio("sounds/yellow.mp3");
var greenButtonAudio = new Audio("sounds/green.mp3");
$(".btn").on("mouseover", function(){
    $(".btn").css("cursor", "pointer");
    
});
if(level.text() == "Press A Key to Start"){
    $(document).on("keydown", startGame);
}
function startGame (){
    $(document).off("keydown");
    console.log(this);
    level.text("Level " + levelCount.toString());
    AddColour();
    $(".btn").on("click", onButtonClicked);
}
function checkAnswer(userColour){
    if(userColour.search(randomColour[currentColourIndex])){
        success = false;
    }
    currentColourIndex++;
}
function AddColour(){
    var randomNumber = (Math.floor(Math.random() * 3) + 1);
    var allColours = ["green", "red", "blue", "yellow"];
    var chosenColour = allColours[randomNumber];
    playSound(chosenColour);
    $(".btn."+chosenColour).fadeOut(250).fadeIn(250);
    randomColour.push(chosenColour);
    console.log(randomColour);
}
function activateClickEffect(button){
    $(".btn."+button).toggleClass("pressed");
    setTimeout(function(){$(".btn."+button).toggleClass("pressed");}, 100);
    playSound(button);
}
function gameOverEffects(){
    $("body").toggleClass("game-over");
    setTimeout(function(){$("body").toggleClass("game-over");}, 200);
    gameOver.play();
}

function onButtonClicked(){
    $(".btn").off("click");
    console.log(this.className);
    var buttonClicked = this.id;
    activateClickEffect(buttonClicked);
    checkAnswer(buttonClicked);
    if(success == true){
        if(currentColourIndex == randomColour.length){
            setTimeout(AddColour, 1000);
            // console.log(randomColour[randomColour.length-1]);
            currentColourIndex = 0;
            levelCount++;
            level.text("Level " + levelCount.toString());
        }
        $(".btn").on("click", onButtonClicked);
    }
    if(success == false){
        level.text("Game Over, Press Any Key to Restart");
        gameOverEffects();
        randomColour = [];
        currentColourIndex = 0;
        levelCount = 1;
        success = true;
        $(document).on("keydown", startGame);
        $(".btn").off("click");
    }
}
function playSound(button){
    switch(button){
        case "blue":
            blueButtonAudio.currentTime = 0;
            blueButtonAudio.play();
            break;
        case "green":
            greenButtonAudio.currentTime = 0;
            greenButtonAudio.play();
            break;
        case "red":
            redButtonAudio.currentTime = 0;
            redButtonAudio.play();
            break;
        case "yellow":
            yellowButtonAudio.currentTime = 0;
            yellowButtonAudio.play();
            break;
    }
}