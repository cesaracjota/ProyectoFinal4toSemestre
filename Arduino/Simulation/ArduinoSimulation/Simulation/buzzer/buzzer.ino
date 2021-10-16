//BUZZER-PARA ADMINISTRAR SONIDOS
//20-06-2021
String msg;
int dato;
int buzzer = 10;
void setup() {
 Serial.begin(9600);
}
void loop() {
  msg = Serial.readStringUntil("\r\n");
  int valor = analogRead(A0);
  int frec = map(valor,0,1024,100,5000);
  int durac = 650;
  //Cuando recibe un mensaje de alerta de robo
  if (msg=="robo"){
    tone(buzzer,frec,durac);
    Serial.println("alerta hay robo en el bus...!");
    delay(1000);
  }
  else if (msg=="accidente"){
    tone(buzzer,frec,durac);
    Serial.println("alerta hay accidente...!");
    delay(1000);
  }
  else{
    Serial.println("TODO ESTA BIEN");
    delay(2000);
  }
}
