import asyncio
import json
import logging
import websockets

USERS = set()
 
async def register(websocket):
    USERS.add(websocket)
    for u in USERS:
        msg = {
            'isMsg':False,
            'isCount': True,
            'count': str(len(USERS))
        }
        await u.send(json.dumps(msg))
  
 
async def unregister(websocket):
    USERS.remove(websocket)
 
async def counter(websocket, path):
    # register(websocket) sends user_event() to websocket
    await register(websocket)
    try:
        if(path == '/msg'):
            async for message in websocket:
                print(message)
                for u in USERS:
                    await u.send(message)
            #donothing
    finally:
        await unregister(websocket)
 
asyncio.get_event_loop().run_until_complete(
    websockets.serve(counter, '0.0.0.0', 8080))
asyncio.get_event_loop().run_forever()
