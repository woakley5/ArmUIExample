'use strict';


var floor = Math.floor;
var stage = new Stage();
// variables for scenes
var homeScreen, upDownControlScreen, rotationControlScene, electromagnetControlScene;
var manager;
var attrs;
var logo;

function preload() {
	logo = loadImage("/ArmUIExample/miles.png");
}




function setup() {
  resizeCanvas(windowWidth, windowHeight);

  initMenuVariables();
  
  var homeScreenButtonName = ["Lets Go!"];
  var homeScreenButtonAction = [firstButtonAction]
  homeScreen = new ButtonsScene("Arm Machine",
								null,
								homeScreenButtonName,
								homeScreenButtonAction,
								null,
								null,
								null,
								{size:100, leading:50});
  stage.addScene('homeScreen', homeScreen)
  
  var armControlButtonNames = ["Arm Up", "Arm Down"];
  var armControlButtonActions = [moveArmUp, moveArmDown];
  upDownControlScreen = new ButtonsScene("Up/Down Control",
									"Start by controlling the up & down motion of the arm.",
									armControlButtonNames,
									armControlButtonActions,
									homeAction,
									moveToScene3);
  stage.addScene('upDownControlScreen', upDownControlScreen);
  
  rotationControlScene = new rotationScene()
  stage.addScene('rotationControlScene', rotationControlScene);
  
  var electromagnetScreenButtonNames = ["Magnet On", "Magnet Off"];
  var electromagnetScreenButtonActions = [electromagnetOn, electromagnetOff];
  electromagnetControlScene = new ButtonsScene("Electromagnet Control",
												"Now lets try using the electromagnet.",
												electromagnetScreenButtonNames,
												electromagnetScreenButtonActions,
												homeAction,
												null);
   stage.addScene('electromagnetControlScene', electromagnetControlScene);
  
  stage.transitionTo('homeScreen');
}

function draw() {
  stage.draw();
}

function homeAction(){
  stage.transitionTo('homeScreen');
  //    comm.pause();
}

function nextAction(){
  stage.transitionTo('homeScreen');
  //    comm.pause();
}

function moveToScene3(){
	console.log("Moving to scene 3");
	stage.transitionTo('rotationControlScene');
}

function moveToScene4(){
	stage.transitionTo('electromagnetControlScene');
}

function firstButtonAction()
{
  console.log("First button pressed");
  manager.changeState(ARM);
  stage.transitionTo('upDownControlScreen');
}

function moveArmUp(){
	console.log("Arm Up pressed");
	ARM.master.events.raiseArm();
}

function moveArmDown(){
	console.log("Arm Down pressed");
	ARM.master.events.lowerArm();

}

function electromagnetOn(){
	ARM.master.events.enableElectromagnet();
}

function electromagnetOff(){
	ARM.master.events.disableElectromagnet();
}


// all these are needed to handle touch/mouse events properly
window.touchStarted = stage.touchStarted.bind(stage);
window.touchMoved = stage.touchMoved.bind(stage);
window.touchEnded = stage.touchEnded.bind(stage);
window.mousePressed = stage.mousePressed.bind(stage);
window.mouseDragged = stage.mouseDragged.bind(stage);
window.mouseReleased = stage.mouseReleased.bind(stage);
