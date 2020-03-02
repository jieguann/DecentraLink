import asyncio
import websockets
import keyboard

async def hello():
    uri = "ws://64.227.5.130:4567"
    async with websockets.connect(uri) as websocket:
        name


        if keyboard.is_pressed('q'):


            name = "Hello Decentraland"

        if keyboard.is_pressed('w'):

            name = 'Hello'

        await websocket.send(name)
        print("name")




        #greeting = await websocket.recv()
        #print(greeting)

asyncio.get_event_loop().run_until_complete(hello())
