  int value = 0.0;
  float C_Tokens = 0.0;
  float Watt_Hr = 0.0;
  
  unsigned int prev_time = 0; 
  unsigned int current_time = 0; 
  unsigned int time_interval = 0; 

void setup() 
{
  Serial.begin(9600);
  
  pinMode(8,OUTPUT);
  digitalWrite(8,LOW);
  //pinMode(4,OUTPUT);
  //digitalWrite(4,LOW);
  prev_time = millis();
}

void loop() 
{
 value = Serial.parseInt();
    Serial.println(value);
  
    if(value == 1)
    { 
    digitalWrite(8,HIGH);
    //digitalWrite(4,HIGH);
    }
    
   
    if(value == 2)
    {
      digitalWrite(8,LOW);
   //   digitalWrite(4,LOW);
      //Serial.println("hi");
      prev_time = millis();
      } 
}

