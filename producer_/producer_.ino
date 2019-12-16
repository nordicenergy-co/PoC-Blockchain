  int value = 0.0;
  float P_Tokens = 0.0;
  float Watt_Hr = 0.0;
  
  unsigned int prev_time = 0; 
  unsigned int current_time = 0; 
  unsigned int time_interval = 0; 

void setup() 
{
  Serial.begin(9600);
  
  pinMode(3,OUTPUT);
  digitalWrite(3,LOW);

}




void loop() 
{
  value = Serial.parseInt();
  
  while(value == 1)
  {
    digitalWrite(3,HIGH);
    
   } 

  while(value == 2)
  {
    digitalWrite(3,LOW);
    prev_time = millis();
  }
}

