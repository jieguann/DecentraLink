import asyncio
import websockets


text = None
async def hello(websocket, path):
    global text
    text = await websocket.recv()

    print(text)




async def hello2(websocket, path):
    global text
    if not text:
        await websocket.send('0')
    else:
        await websocket.send('1')
        text = None




event1 = websockets.serve(hello, "0.0.0.0", 4567)
event2 = websockets.serve(hello2,"0.0.0.0",4568)

asyncio.get_event_loop().run_until_complete(event1)
asyncio.get_event_loop().run_until_complete(event2)
asyncio.get_event_loop().run_forever()
