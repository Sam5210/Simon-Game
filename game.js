var level = $("#level-title");
var randomColour = [];
var currentColourIndex = 0;
var count = 1;
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
    level.text("Level " + count.toString());
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
    var chosenColour = nextColour();
    $(".btn."+chosenColour).fadeOut(250).fadeIn(250);
    randomColour.push(chosenColour);
    console.log(randomColour);
}
function activateClickEffect(button){
    $(".btn."+button).toggleClass("pressed");
    setTimeout(function(){$(".btn."+button).toggleClass("pressed");}, 100);
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
function gameOverEffects(){
    $("body").toggleClass("game-over");
    setTimeout(function(){$("body").toggleClass("game-over");}, 200);
    gameOver.play();
}
function onButtonClicked(){
    $(".btn").off("click");
    console.log(this.className);
    var buttonClicked = this.className.slice(4);
    activateClickEffect(buttonClicked);
    checkAnswer(buttonClicked);
    if(success == true){
        if(currentColourIndex == randomColour.length){
            setTimeout(AddColour, 500);
            // console.log(randomColour[randomColour.length-1]);
            currentColourIndex = 0;
            count++;
            level.text("Level " + count.toString());
        }
        $(".btn").on("click", onButtonClicked);
    }
    if(success == false){
        level.text("Game Over, Press Any Key to Restart");
        gameOverEffects();
        randomColour = [];
        currentColourIndex = 0;
        count = 1;
        success = true;
        $(document).on("keydown", startGame);
        $(".btn").off("click");
    }
}
function nextColour(){
    var randomNumber = (Math.floor(Math.random() * 3) + 1);
    var allColours = ["green", "red", "blue", "yellow"];
    var Colour = allColours[randomNumber];
    return Colour;
}
