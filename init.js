    //import * as <namespace> from "./<filename>.js"; 
    //import * from "./<filename>.js"; ???

    //Blast2d.js
    //Blast3d.js
    //BlastMath.js
    //drawTools.js


    //rename to blastInit
    
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
//-----------------------------------------
var limit = canvas.getBoundingClientRect()
// Track the mouse position
var mice = {x:0,y:0}


//system
function yIsUpScreen() {
    ctx.translate(canvas.width / 2, canvas.height / 2); //move origin
    origin(0, canvas.height); //move origin
    flipScreen();
}

/// canvas element in DOM
// var canvas1 = document.getElementById('canvas1');
// var context1 = canvas1.getContext('2d');

/// buffer canvas
// var canvas2 = document.createElement('canvas');
// canvas2.width = 150;
// canvas2.height = 150;
// var context2 = canvas2.getContext('2d');

/// create something on the canvas
// context2.beginPath();
// context2.moveTo(10,10);
// context2.lineTo(10,30);
// context2.stroke();

///render the buffered canvas onto the original canvas element
// context1.drawImage(canvas2, 0, 0);
function flipScreen(){
    ctx.scale(1,-1) //flip canvas
}
function originBL(){
    origin(0,canvas.height)
    flipScreen()
}

function deg(angle){
    const deg = tau / 360
    return angle * deg
}


//-----------------------------------------
// update
function refresh(execute) {
    if (execute) {execute()}
    requestAnimationFrame(() => {refresh(execute)});
  }
  
  // Start the refresh loop
// function update(){
//     requestAnimationFrame(refresh(body));
// }

function  basicScreen(){
    graphics(400,400)
    //originBL()
    whiteBackground()
}

function TrackMice(){
    limit = canvas.getBoundingClientRect()
    canvas.addEventListener("mousemove", (event) => {
        mice.x = event.clientX - limit.left
        mice.y = event.clientY - limit.top
        });
        // mice = {x:mouseX, y:mouseY}
    }

//------flow tools----------------------------------------------

function loop2d(xloopmax, yloopmax, execute){
    for (let xloop = 0; xloop <xloopmax; xloop++) {
        for (let yloop = 0; yloop < yloopmax; yloop++) {
            execute(xloop, yloop)                
        }
    }
}


//     One possible way to achieve what you want is to use a closure to create a function that can be called only once. A closure is a function that has access to the variables from another function’s scope. You can use a closure to store a flag that indicates whether the internal start() function has been executed or not, and check that flag before calling it. For example:

// function outer() {
//   // declare a variable to store the flag
//   let executed = false;
//   // define the internal start() function
//   function start() {
//     console.log("start");
//   }
//   // return a function that checks the flag and calls start() if not executed
//   return function() {
//     if (!executed) {
//       executed = true;
//       start();
//     }
//   };
// }

// // create an instance of the outer() function
// let refresh = outer();
// // call the refresh() function multiple times
// refresh(); // prints "start"
// refresh(); // does nothing
// refresh(); // does nothing
// This is similar to the once() function that some libraries provide, as mentioned in 1. I hope this helps you with your problem.😊

//#region
//unity script lifecycle flowchart
    //legend:
        //-> user call back
        //- internal function (rounded gray)
        //+ internal multithreaded function (square gray)
    //===================================================
    //initialization
        //-> awake ||<----
        //-> OnEnable
    //editor
        //-> Reset
    //initialization
        //-> Start
    //Physics ||<----
        //-> FixedUpdate
        //internal animation update
            //+ state machine update
            //-> OnStateMachineEnterExit
            //+ processGraph
            //-> Fire animation events
            //-> StateMachineBehavior Callbacks
            //-> OnAnimatorMove
        //- internal physics update
        //internal animation update
            //+processAnimation
            //loop
                //-> OnanimatorIK
                //+ WriteTransform
            //- writeProperties
        //-> OnTriggerXXX
        //-> OnCollisionXXX
        //-> Yield WaitForFixedUpdate
        // ||----> Goto Physics
    //input events
        //-> OnMouseXXX
    //Game Logic
        //-> Update
        //-> yield null
        //-> yield WaitForSeconds
        //-> yield WWW
        //-> yield StartCoroutine
        //internal animation update
            //+ state machine update
            //-> OnStateMachineEnterExit
            //+ processGraph
            //-> Fire animation events
            //-> StateMachineBehavior Callbacks
            //-> OnAnimatorMove
            //+ processAnimation
            //loop
                //-> OnanimatorIK
                //+ WriteTransform
            //- writeProperties
        //-> LateUpdate
    //Scene rendering
        //-> OnPreCull
        //-> OnWillRenderObject
        //-> OnBecomeVisible
        //-> OnBecomeInvisible
        //-> OnPreRender
        //-> OnRenderObject
        //-> OnPostRender
        //-> OnRenderImage
    //Gizmo Rendering
        //-> OnDrawGizmos
    //GUI rendering
        //-> OnGUI (Loop)
    //End Of frame
        //-> Yield WaitForEndOfFrame
    //Pausing
        //-> OnApplicationPause
    // ||----> Goto Physics
    //Decommissioning
        //-> OnApplicationQuit
        //-> OnDisable
        //-> OnDestroy ||----> Goto awake
//#endregion
