import paho.mqtt.subscribe as subscribe
import serial
arduino = serial.Serial ('COM3',9600)
while True:
    msg = subscribe.simple("Lamp",hostname="54.81.179.17")
    arduino.write(msg.payload);
    print("%s %s" % (msg.topic, msg.payload))
