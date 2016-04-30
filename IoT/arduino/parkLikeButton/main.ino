int notificationLED = 9;
int likeButton = 8;
volatile int likeCount = 0;
#include <Wire.h>
#include "rgb_lcd.h"
rgb_lcd lcd;
const int colorR = 134;
const int colorG = 81;
const int colorB = 165;

void setup() {
  pinMode(notificationLED, OUTPUT);
  pinMode(likeButton, INPUT);
  lcd.begin(16, 2);
  lcd.setRGB(colorR, colorG, colorB);
  writeLikes(likeCount);
}

void writeLikes(int likes) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("   Park Likes");
  lcd.setCursor(0, 1);
  lcd.print(String(likes));
}

void breath(unsigned char color) {
    for (int i=0; i<255; i++) {
        lcd.setPWM(color, i);
        delay(5);
    }
    delay(500);
    for (int i=254; i>=0; i--) {
        lcd.setPWM(color, i);
        delay(5);
    }
    delay(500);
}

void loop() {
  if(digitalRead(likeButton)) {
    likeCount = likeCount + 1;
    writeLikes(likeCount);
    digitalWrite(notificationLED, HIGH);
    breath(REG_BLUE);
    digitalWrite(notificationLED, LOW);
  } else if(digitalRead(notificationLED)) {
    digitalWrite(notificationLED, LOW);
  }
}
