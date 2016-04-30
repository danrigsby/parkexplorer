int ledPin = 13;
int analogLedPin = 9;
int buttonPin = 8;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(analogLedPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  if(digitalRead(buttonPin)) {
    digitalWrite(analogLedPin, HIGH);
  } else {
    digitalWrite(analogLedPin, LOW);
  }
}
