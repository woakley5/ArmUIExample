'use strict';


var floor = Math.floor;
var stage = new Stage();
// variables for scenes
var welcomeScreen, directionsScreen, homeScreen, armControlScene, machineControlScene;
var manager;
var attrs;
var logo;

function preload() {
	logo = loadImage("/ArmUIExample/miles.png");
}

function setup() {
  resizeCanvas(windowWidth, windowHeight);

  initMenuVariables();

	welcomeScreen = new ConsoleOpeningScene(moveToDirectionsScene);
	stage.addScene('welcomeScreen', welcomeScreen);

	directionsScreen = new ConsoleInstructionScene(homeAction);
	stage.addScene('directionsScreen', directionsScreen);

  var homeScreenButtonName = ["Arm", "Other One", "View Instructions"];
  var homeScreenButtonAction = [movetoArmScene, moveToMotionMachineScene, viewInstructions];
  homeScreen = new ButtonsScene("Machines!!!",
								"These machines do nothing!!",
								homeScreenButtonName,
								homeScreenButtonAction,
								null,
								null,
								null,
								{size:50, leading:50});
  stage.addScene('homeScreen', homeScreen)

  armControlScene = new ArmScene()
  stage.addScene('armControlScene', armControlScene);

  machineControlScene = new MotionMachineScene();
  stage.addScene('machineControlScene', machineControlScene);


  stage.transitionTo('welcomeScreen');
}

function viewInstructions(){
	stage.transitionTo('directionsScreen');
}

function draw() {
  stage.draw();
}

function homeAction(){
  stage.transitionTo('homeScreen');
  //    comm.pause();
}

function moveToDirectionsScene(){
	stage.transitionTo('directionsScreen');
}

function movetoArmScene()
{
  console.log("First button pressed");
  manager.changeState(ARM);
  ARM.master.events.resetArmPosition();
  stage.transitionTo('armControlScene');
}

function moveToMotionMachineScene()
{
  console.log("Second button pressed");
  manager.changeState(MOTIONMACHINE);
  stage.transitionTo('machineControlScene');
}

// all these are needed to handle touch/mouse events properly
window.touchStarted = stage.touchStarted.bind(stage);
window.touchMoved = stage.touchMoved.bind(stage);
window.touchEnded = stage.touchEnded.bind(stage);
window.mousePressed = stage.mousePressed.bind(stage);
window.mouseDragged = stage.mouseDragged.bind(stage);
window.mouseReleased = stage.mouseReleased.bind(stage);
