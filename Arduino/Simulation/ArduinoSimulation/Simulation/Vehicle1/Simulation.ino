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
String alerta = "robo";
//String latitud[] = {"-16.4433 -16.4432 lat:-16.4429"};
String ubicacion[] ={"-16.4433 -71.52257573",
                      "-16.4432 -71.52320271", 
                      "-16.4429 -71.52371267", 
                      "-16.4427 -71.52412541",
                      "-16.442360 -71.524774",
                      "-16.442257 -71.525059",
                      "-16.441824 -71.525204",
                      "-16.441351 -71.525343",
                      "-16.440898 -71.525543",
                      "-16.440934 -71.525902",
                      "-16.441053 -71.526203",
                      "-16.441161 -71.526605",
                      "-16.441454 -71.527399",
                      "-16.441722 -71.528305", 
                      "-16.441891 -71.528649", 
                      "-16.441953 -71.528842",
                      "-16.441399 -71.529069", 
                      "-16.440674 -71.529229", 
                      "-16.440324 -71.529347", 
                      "-16.439666 -71.529631", 
                      "-16.438766 -71.529932", 
                      "-16.438190 -71.530146", 
                      "-16.436393 -71.530684", 
                      "-16.434272 -71.531461", 
                      "-16.431926 -71.532333", 
                      "-16.430805 -71.532786", 
                      "-16.427733 -71.532930"}; /*
                        "lat:-16.425813" ,"lng:-71.533045", 
                        "lat:-16.425443" ,"lng:-71.532949", 
                        "lat:-16.424918" ,"lng:-71.533110", 
                        "lat:-16.424156" ,"lng:-71.532665", 
                        "lat:-16.422728" ,"lng:-71.531512", 
                        "lat:-16.421822" ,"lng:-71.531244", 
                        "lat:-16.420157" ,"lng:-71.531485", 
                        "lat:-16.418964" ,"lng:-71.531931", 
                        "lat:-16.417242" ,"lng:-71.532659", 
                        "lat:-16.415246" ,"lng:-71.534048", 
                        "lat:-16.413496" ,"lng:-71.534790",
                        "lat:-16.413512" ,"lng:-71.534772", 
                        "lat:-16.412579" ,"lng:-71.535114", 
                        "lat:-16.411766" ,"lng:-71.534695", 
                        "lat:-16.411261" ,"lng:-71.533665", 
                        "lat:-16.410798" ,"lng:-71.533269", 
                        "lat:-16.409646" ,"lng:-71.530986", 
                        "lat:-16.409173" ,"lng:-71.528959", 
                        "lat:-16.408586" ,"lng:-71.526985", 
                        "lat:-16.408117" ,"lng:-71.525748", 
                        "lat:-16.407561" ,"lng:-71.524857", 
                        "lat:-16.407427" ,"lng:-71.524535", 
                        "lat:-16.407036" ,"lng:-71.524836", 
                        "lat:-16.406449" ,"lng:-71.525168", 
                        "lat:-16.405669" ,"lng:-71.526028", 
                        "lat:-16.405031" ,"lng:-71.526618", 
                        "lat:-16.404599" ,"lng:-71.527240", 
                        "lat:-16.404372" ,"lng:-71.527358", 
                        "lat:-16.403847" ,"lng:-71.526768", 
                        "lat:-16.402870" ,"lng:-71.525609", 
                        "lat:-16.401184" ,"lng:-71.523506", 
                        "lat:-16.400371" ,"lng:-71.522487", 
                        "lat:-16.399702" ,"lng:-71.521865", 
                        "lat:-16.399452" ,"lng:-71.521682", 
                        "lat:-16.399205" ,"lng:-71.522026", 
                        "lat:-16.398907" ,"lng:-71.522691", 
                        "lat:-16.398629" ,"lng:-71.523077", 
                        "lat:-16.398434" ,"lng:-71.523453", 
                        "lat:-16.398207" ,"lng:-71.523828", 
                        "lat:-16.397559" ,"lng:-71.523367", 
                        "lat:-16.397507" ,"lng:-71.522830", 
                        "lat:-16.397991" ,"lng:-71.522240", 
                        "lat:-16.398516" ,"lng:-71.521393", 
                        "lat:-16.398732" ,"lng:-71.521071", 
                        "lat:-16.398938" ,"lng:-71.520491", 
                        "lat:-16.399000" ,"lng:-71.519944", 
                        "lat:-16.399216" ,"lng:-71.519837"};
                        "lat:-16.399576" ,"lng:-71.520041", 
                        "lat:-16.400029" ,"lng:-71.520277", 
                        "lat:-16.400266" ,"lng:-71.520341", 
                        "lat:-16.402118" ,"lng:-71.517605", 
                        "lat:-16.403021" ,"lng:-71.516359", 
                        "lat:-16.406366" ,"lng:-71.515147", 
                        "lat:-16.409652" ,"lng:-71.513667", 
                        "lat:-16.413398" ,"lng:-71.512068", 
                        "lat:-16.424853" ,"lng:-71.513077", 
                        "lat:-16.425470" ,"lng:-71.514836", 
                        "lat:-16.442814" ,"lng:-71.521668", 
                        "lat:-16.442845" ,"lng:-71.521399", 
                        "lat:-16.443009" ,"lng:-71.521357", 
                        "lat:-16.443205" ,"lng:-71.521357", 
                        "lat:-16.443297" ,"lng:-71.521839", 
                        "lat:-16.443328" ,"lng:-71.522268", 
                        "lat:-16.443349" ,"lng:-71.522558"};*/
                                        
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
  /*for (int i = 0; i < 20; i++){
    Serial.println(ubicacion[i]);
    lcd.setCursor(0,0);
    lcd.print("Ub: ");
    lcd.print(ubicacion[i]);
    delay(1000);
  }*/
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
        //Serial.print("Temperatura: ");
        //Serial.print(tempC);
        //Serial.print(" *C");
        Serial.println();
        Serial.println(alerta);
        Serial.println();
        if(tempC>37.0){
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
