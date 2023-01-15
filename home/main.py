import socketio
import serial
import time

ser = serial.Serial('COM3', 9600)
time.sleep(2)
sio = socketio.Client()

@sio.event
def connect():
    print('connection established')

@sio.event
def light(data):
    print('message received with ', data)
    if(data == "on"):
        ser.write(b'A')
        print("turning light on")
    if(data == "off"):
        ser.write(b'D')
        print("turning light off")
    if(data == "on2"):
        ser.write(b'H')
        print("turning light on")
    if(data == "off2"):
        ser.write(b'L')
        print("turning light off")
    

@sio.event
def disconnect():
    ser.close()
    print('disconnected from server')

sio.connect('http://localhost:3000?alias=arduino')
sio.wait()