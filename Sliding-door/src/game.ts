////ground
const ground = new Entity()
ground.addComponent(new BoxShape())
ground.addComponent(
  new Transform({
    position:new Vector3(8,0,16),
    scale:new Vector3(16,0.1,32)
  })
)
const groundTexture = new Texture('src/materials/ground.jpg')
const GroundMaterial = new Material()
GroundMaterial.albedoTexture = groundTexture
ground.addComponent(GroundMaterial)
//enging
engine.addEntity(ground)


////dragon
const dragon = new Entity()
dragon.addComponent(new GLTFShape('src/models/dragon.gltf'))
//dragon.addComponent(new BoxShape())
dragon.addComponent(
  new Transform({
    position:new Vector3(8,0,16),
    scale:new Vector3(10,10,10)
  })
)
engine.addEntity(dragon)



//Text

const textDecentralinkEntity = new Entity()
const textDecentralink = new TextShape("Decentral.link")
textDecentralinkEntity.addComponent(textDecentralink)
textDecentralinkEntity.addComponent(
  new Transform({
    position:new Vector3(8,4,8),
    scale:new Vector3(2,2,2)
  })
)
engine.addEntity(textDecentralinkEntity)


//engine.addEntity(textDecentralinkEntity)
////Hole 3D model
/*
const hole = new GLTFShape("models/soviet_star/scene.gltf")
// Create entities
const holeEntity = new Entity()
holeEntity.addComponent(hole)
holeEntity.addComponent(
  new Transform({
    position:new Vector3(8,0,16),
    scale:new Vector3(16,0.1,32)
  })
)
engine.addEntity(holeEntity)
*/






/////Door operation
import utils from '../node_modules/decentraland-ecs-utils/index'
const scockeDoor
// Define fixed walls
const wall1 = new Entity()
wall1.addComponent(
  new Transform({
    position: new Vector3(9.75, 1, 8),
    scale: new Vector3(1.5, 2, 0.1)
  })
)
wall1.addComponent(new BoxShape())
engine.addEntity(wall1)

const wall2 = new Entity()
wall2.addComponent(
  new Transform({
    position: new Vector3(6.25, 1, 8),
    scale: new Vector3(1.5, 2, 0.1)
  })
)
wall2.addComponent(new BoxShape())
engine.addEntity(wall2)

// Add the two sides to the door
const doorL = new Entity()
doorL.addComponent(
  new Transform({
    position: new Vector3(0.5, 0, 0),
    scale: new Vector3(1.1, 2, 0.05)
  })
)
doorL.addComponent(new BoxShape())
engine.addEntity(doorL)

const doorR = new Entity()
doorR.addComponent(
  new Transform({
    position: new Vector3(-0.5, 0, 0),
    scale: new Vector3(1.1, 2, 0.05)
  })
)
doorR.addComponent(new BoxShape())
engine.addEntity(doorR)

// Define a material to color the doors red
const doorMaterial = new Material()
doorMaterial.albedoColor = Color3.Red()
doorMaterial.metallic = 0.9
doorMaterial.roughness = 0.1

// Assign the material to the doors
doorL.addComponent(doorMaterial)
doorR.addComponent(doorMaterial)

// Define open and closed positions for both doors
let doorLClosed = new Vector3(0.5, 0, 0)
let doorLOpen = new Vector3(1.25, 0, 0)
let doorRClosed = new Vector3(-0.5, 0, 0)
let doorROpen = new Vector3(-1.25, 0, 0)

// This parent entity holds the state for both door sides
const doorParent = new Entity()
doorParent.addComponent(
  new Transform({
    //position: new Vector3(4, 1, 3)
    position: new Vector3(8, 1, 8)
  })
)



/*
//toggle behavior for door
doorParent.addComponent(
  new utils.ToggleComponent(utils.ToggleState.Off, value => {
    if (value == utils.ToggleState.On) {
      doorL.addComponentOrReplace(
        new utils.MoveTransformComponent(doorLClosed, doorLOpen, 1)
      )
      doorR.addComponentOrReplace(
        new utils.MoveTransformComponent(doorRClosed, doorROpen, 1)
      )
    } else {
      doorL.addComponentOrReplace(
        new utils.MoveTransformComponent(doorLOpen, doorLClosed, 1)
      )
      doorR.addComponentOrReplace(
        new utils.MoveTransformComponent(doorROpen, doorRClosed, 1)
      )
    }
  })
)
*/
engine.addEntity(doorParent)

// Set the door as a child of doorPivot
doorL.setParent(doorParent)
doorR.setParent(doorParent)


/*
// Set the click behavior for the door
doorL.addComponent(
  new OnPointerDown(
    e => {

      doorParent.getComponent(utils.ToggleComponent).toggle()
    },
    { button: ActionButton.POINTER, hoverText: 'Open/Close' }
  )
)

doorR.addComponent(
  new OnPointerDown(
    e => {

      doorParent.getComponent(utils.ToggleComponent).toggle()

    },
    { button: ActionButton.POINTER, hoverText: 'Open/Close' }
  )
)
*/


//websocket Testing
/*
function runSocket1() {
  var socket = new WebSocket("ws://64.227.5.130:4567")
  socket.addEventListener('open', function (event) {
    socket.send('Hello Server!')
})
}
*/

/*
var serverData
function runSocket2() {
  var socket = new WebSocket("wss://test.decentral.link:8443/send")
  //var socket = new WebSocket("ws://64.227.5.130:4568")
  //var socket = new WebSocket("ws://192.168.0.10:4568")
  /*
  socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data)
      socket.close
      //if(event.data=='1'){doorParent.getComponent(utils.ToggleComponent).toggle()}
  })

  socket.onopen = function(e) {
  //alert("[open] Connection established");
  //alert("Sending to server");
  //socket.send("My name is John");
};

socket.onmessage = function(event) {
  console.log(`[message] Data received from server: ${event.data}`);
  ServerData = event.data
};

socket.onclose = function(event) {

};

socket.onerror = function(error) {

};

}
*/
const refreshInterval: number = 1
let refreshTimer: number = refreshInterval






export class SimpleMove implements ISystem {
  update(dt:number) {
    //runSocket1()
    refreshTimer -= dt

    if (refreshTimer < 0) {
      refreshTimer = refreshInterval


    var socket = new WebSocket("wss://test.decentral.link:443/send")


    socket.addEventListener('open', function (event) {
    socket.send("hello server")
    console.log("sended")
  })




///

    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data)


        //socket.close
        if(event.data=='1'){
           //doorParent.getComponent(utils.ToggleComponent).toggle()}
           doorL.addComponentOrReplace(
             new utils.MoveTransformComponent(doorLClosed, doorLOpen, 1)
           )
           doorR.addComponentOrReplace(
             new utils.MoveTransformComponent(doorRClosed, doorROpen, 1)
           )
    }

         if(event.data=='0'){
          doorL.addComponentOrReplace(
            new utils.MoveTransformComponent(doorLOpen, doorLClosed, 1)
          )
          doorR.addComponentOrReplace(
            new utils.MoveTransformComponent(doorROpen, doorRClosed, 1)
          )
  }
)

    }

}
}
}

////Connect to WebSocket
engine.addSystem(new SimpleMove())

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
// Add system to engine


//button
const button1 = new Entity()
button1.addComponent(new BoxShape())

button1.addComponent(
  new OnPointerDown(e => {
    log("myEntity was clicked", e)
  })
)

button1.addComponent(
  new Transform({
    position:new Vector3(8,0,5),
    scale:new Vector3(1,1,1)
  })
)
engine.addEntity(button1)
