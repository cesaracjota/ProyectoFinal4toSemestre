import paho.mqtt.publish as publish
import serial

arduino = serial.Serial ('COM2',9600)
while True:
    msg = arduino.readline()
    publish.single("Lamp", msg, hostname="23.20.206.201")
    print (msg)
