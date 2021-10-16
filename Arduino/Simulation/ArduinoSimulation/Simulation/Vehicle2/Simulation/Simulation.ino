#include <LiquidCrystal.h>
// Interfacing Arduino with NEO-6M GPS module 
#include <TinyGPS++.h>           // Include TinyGPS++ library
#include<TinyGPS.h>
#include <SoftwareSerial.h>      // Include software serial library 
TinyGPSPlus gps;
TinyGPS gps2;
LiquidCrystal lcd(8,9,10,11,12,13);
#define S_RX    4                // Define software serial RX pin
#define S_TX    3                // Define software serial TX pin
SoftwareSerial SoftSerial(S_RX, S_TX);    // Configure SoftSerial library
void getgps(TinyGPS &gps2);
float tempC;
float val;
int dato = 5;
String ubicacion[17] ={"-16.413130 -71.529107",
                      "-16.412135 -71.528377",
                      "-16.410983 -71.528591",
                      "-16.409933 -71.528999",
                      "-16.409089 -71.529192",
                      "-16.408780 -71.527668",
                      "-16.408369 -71.526252",
                      "-16.407833 -71.525415",
                      "-16.407216 -71.524514",
                      "-16.406207 -71.525523",
                      "-16.404646 -71.527225",
                      "-16.403369 -71.526281",
                      "-16.401846 -71.524135",
                      "-16.399788 -71.521903",
                      "-16.397770 -71.523749",
                      "-16.396782 -71.526238",
                      "-16.395424 -71.527397"};
                                        
void setup() {
  Serial.begin(9600);
  SoftSerial.begin(9600);
  pinMode(5, OUTPUT);
  pinMode(A0, INPUT);
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  lcd.begin(16,2);
}
void getgps(TinyGPS &gps2){
  float latitude, longitude;
  gps2.f_get_position(&latitude,&longitude);
  lcd.setCursor(0,0);
  lcd.print("Lat: ");
  lcd.print(latitude,5);
  lcd.setCursor(0,1);
  lcd.print("Long: ");
  lcd.print(longitude,5);
}
 
void loop() {
  val = analogRead (A0);        
  //float milliV = (val/1023.0)*5000;
  //tempC = milliV/10;
  float dato_volt = val * 5.0 / 1023.0;
  tempC = dato_volt * 10;
  
  for (int i = 0; i < 17; i++){
    Serial.println(ubicacion[i]);
    lcd.setCursor(0,0);
    lcd.print("Ub: ");
    lcd.print(ubicacion[i]);
    delay(1000);
}
  while (SoftSerial.available() > 0) {
    if (gps.encode(SoftSerial.read())) {
      digitalWrite(5, HIGH);
      if (gps.location.isValid()) {
        lcd.setCursor(0,0);
        lcd.print("Lat: ");
        lcd.print(gps.location.lat(), 6);
        lcd.setCursor(0,1);
        lcd.print("Long: ");
        lcd.print(gps.location.lng(), 6);
        Serial.print(gps.location.lat(), 6);
        Serial.print(" ");
        Serial.print(gps.location.lng(), 6);
        Serial.println();
        Serial.print("Temperatura: ");
        Serial.print(tempC);
        Serial.print(" *C");
        //Serial.println();
        //Serial.println(dato);
        Serial.println();
        if(tempC>25.0){
          digitalWrite(6,LOW);
          digitalWrite(7,HIGH);
        }else{
          digitalWrite(6,HIGH);
          digitalWrite(7,LOW);
        }
        delay(100);
        digitalWrite(5, LOW);
        delay(100);
      }
      else
        Serial.println("Location Invalid");
    }
  }
}
