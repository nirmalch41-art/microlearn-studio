import { Sensor } from '../types';

export const SENSOR_CATEGORIES = [
  'All Categories',
  'Temperature Sensors',
  'Humidity & Moisture Sensors',
  'Light & Optical Sensors',
  'Distance & Proximity Sensors',
  'Motion & Inertial Sensors',
  'Gas & Air Quality Sensors',
  'Pressure & Environmental Sensors',
  'Force, Weight & Strain Sensors',
  'Water & Liquid Sensors',
  'Electrical & Energy Sensors',
  'Biomedical & Health Sensors',
  'Position & Navigation Sensors',
  'Sound & Acoustic Sensors',
  'Fire & Safety Sensors',
  'Security & Access Sensors',
  'Magnetic Sensors',
  'Robotics & Line Sensors',
  'Industrial & Chemical Sensors'
];

export const SENSORS: Sensor[] = [
  {
    id: 'dht11',
    name: 'DHT11 Temperature & Humidity Sensor',
    category: 'Temperature Sensors',
    measurement: 'Ambient Temperature (0°C to 50°C ±2°C) and Relative Humidity (20% to 90% RH ±5%)',
    workingPrinciple: 'Capacitive humidity sensing element paired with a negative temperature coefficient (NTC) thermistor and an integrated 8-bit OTP microcontroller.',
    internalExplanation: 'The humidity sensor consists of two electrodes separated by a moisture-holding substrate. As relative humidity changes, the dielectric permittivity of the substrate varies, modulating its electrical capacitance. The internal 8-bit chip measures this capacitance and thermistor resistance, converts the values to digital form, and transmits a 40-bit packet over a single wire bus.',
    pinConfiguration: [
      { pin: '1. VCC', function: 'Power Supply (3.3V to 5.5V DC)', type: 'Power' },
      { pin: '2. DATA', function: 'Single-wire bidirectional serial data bus with pull-up resistor', type: 'Digital IO' },
      { pin: '3. NC', function: 'No Connection (present on 4-pin packages)', type: 'Not Connected' },
      { pin: '4. GND', function: 'Power supply ground (0V)', type: 'Ground' }
    ],
    operatingVoltage: '3.3V – 5.5V DC',
    outputType: 'Digital',
    communicationProtocol: 'Custom Single-Wire Proprietary Serial Protocol',
    wiringDescription: 'Connect VCC to 3.3V or 5V, GND to Ground, and DATA to any GPIO. Place a 5kΩ - 10kΩ pull-up resistor between DATA and VCC if the sensor breakout module does not include one.',
    supportedMcus: ['ESP32', 'STM32', 'Arduino Uno (AVR)', 'Raspberry Pi Pico (RP2040)', 'MSP430', '8051', 'PIC16'],
    exampleApplications: ['HVAC automated air conditioning control', 'Greenhouse climate monitoring', 'Smart home weather stations', 'Egg incubator thermostats'],
    arduinoCode: `#include <DHT.h>
#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  Serial.println(F("DHT11 Sensor Test Starting..."));
}

void loop() {
  delay(2000); // 2-second sampling interval
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println(F("Failed to read from DHT sensor! Check wiring."));
    return;
  }

  Serial.print(F("Humidity: "));
  Serial.print(humidity);
  Serial.print(F("%  Temperature: "));
  Serial.print(temperature);
  Serial.println(F("°C"));
}`,
    esp32Code: `#include "DHT.h"
#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  Serial.println("ESP32 DHT11 Monitor Active");
}

void loop() {
  delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (!isnan(h) && !isnan(t)) {
    Serial.printf("Temp: %.1f °C | Humidity: %.1f %%\\r\\n", t, h);
  }
}`,
    stm32Code: `// Low-level GPIO timing for STM32 HAL
void DHT11_Start(void) {
  Set_Pin_Output(DHT11_PORT, DHT11_PIN);
  HAL_GPIO_WritePin(DHT11_PORT, DHT11_PIN, GPIO_PIN_RESET);
  HAL_Delay(18); // Pull low for 18ms
  HAL_GPIO_WritePin(DHT11_PORT, DHT11_PIN, GPIO_PIN_SET);
  delay_us(30);
  Set_Pin_Input(DHT11_PORT, DHT11_PIN);
}`,
    sampleData: [
      { timestamp: '10:00:00', temperature: 24.2, humidity: 55, status: 'Normal' },
      { timestamp: '10:01:00', temperature: 24.5, humidity: 56, status: 'Normal' },
      { timestamp: '10:02:00', temperature: 25.1, humidity: 58, status: 'Normal' },
      { timestamp: '10:03:00', temperature: 26.8, humidity: 64, status: 'Normal' },
      { timestamp: '10:04:00', temperature: 29.4, humidity: 72, status: 'Elevated' },
      { timestamp: '10:05:00', temperature: 32.1, humidity: 82, status: 'Warning' }
    ],
    troubleshooting: [
      { problem: 'Reads "nan" (Not a Number) or timeout error', solution: 'Verify the 4.7kΩ pull-up resistor between DATA and VCC. Check for loose jumper wires and do not read faster than once per 1.5 seconds.' },
      { problem: 'Humidity sticks at 99% or 1%', solution: 'Condensation has bridged the capacitive substrate. Power down the sensor and allow it to dry in a ventilated area for 1 hour.' }
    ],
    miniProject: {
      title: 'Automated Humidifier & Fan Regulator',
      description: 'Actuates a 5V relay module to power a cooling fan when temperature exceeds 28°C, and switches on an ultrasonic mist maker when humidity drops below 40% RH.',
      schematicTip: 'Drive relay coil through an optocoupler or NPN transistor (2N2222) with flyback diode 1N4007 across coil terminals.'
    }
  },
  {
    id: 'hc-sr04',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    category: 'Distance & Proximity Sensors',
    measurement: 'Non-contact distance from 2 cm to 400 cm with 3 mm resolution',
    workingPrinciple: 'Time-of-Flight (ToF) acoustic echo. Emits an ultrasonic 40 kHz burst and measures the transit time elapsed before the reflected sound wave strikes the receiver transducer.',
    internalExplanation: 'The sensor board contains an ultrasonic transmitter transducer (T) and receiver transducer (R). When the MCU applies a 10 µs pulse to the TRIG pin, the onboard MAX232-like charge pump and LM324 quad op-amp drive the transmitter to emit 8 sonic cycles at 40 kHz. The ECHO pin goes HIGH and stays HIGH until the receiver detects the reflected wave, terminating the pulse. The distance is calculated using the speed of sound in air (343 m/s at 20°C).',
    pinConfiguration: [
      { pin: '1. VCC', function: 'Positive 5V DC power supply', type: 'Power' },
      { pin: '2. TRIG', function: 'Trigger input pulse (10 µs TTL pulse)', type: 'Digital Input' },
      { pin: '3. ECHO', function: 'Echo output pulse width proportional to distance (5V TTL)', type: 'Digital Output' },
      { pin: '4. GND', function: 'Power supply ground (0V)', type: 'Ground' }
    ],
    operatingVoltage: '5.0V DC (Standard). Some RCWL-9610 variants support 3.3V.',
    outputType: 'Pulse/PWM',
    communicationProtocol: 'High-Level Pulse Width Timing (Time of Flight)',
    wiringDescription: 'Connect VCC to 5V and GND to GND. Connect TRIG to an MCU output pin. CRITICAL: ECHO outputs 5V TTL pulses. For 3.3V microcontrollers (ESP32, Pico, STM32), pass ECHO through a voltage divider (1kΩ in series and 2kΩ to GND) to output a safe 3.3V level.',
    supportedMcus: ['Arduino Uno', 'ESP32 (with divider)', 'STM32 (with divider or 5V-FT pin)', 'RP2040 Pico (with divider)', '8051', 'PIC16'],
    exampleApplications: ['Autonomous robot obstacle avoidance', 'Automated parking garage distance assistant', 'Industrial water tank level gauging', 'Smart trash can automatic lid opener'],
    arduinoCode: `const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Clear trigger
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Send 10µs HIGH trigger
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read echo duration in microseconds
  long duration = pulseIn(echoPin, HIGH);
  // Distance = (Time * Speed of Sound 0.0343 cm/µs) / 2
  float distanceCm = duration * 0.0343 / 2.0;

  Serial.print("Distance: ");
  Serial.print(distanceCm);
  Serial.println(" cm");
  delay(100);
}`,
    esp32Code: `const int trigPin = 5;
const int echoPin = 18; // Voltage divider protected

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH, 30000); // 30ms timeout
  float distanceCm = duration * 0.0343 / 2.0;
  Serial.printf("Distance: %.2f cm\\r\\n", distanceCm);
  delay(150);
}`,
    sampleData: [
      { timestamp: '00:01', distance_cm: 125.4, status: 'Clear' },
      { timestamp: '00:02', distance_cm: 95.2, status: 'Clear' },
      { timestamp: '00:03', distance_cm: 58.7, status: 'Object Approaching' },
      { timestamp: '00:04', distance_cm: 24.1, status: 'Obstacle Warning' },
      { timestamp: '00:05', distance_cm: 8.5, status: 'Collision Imminent' }
    ],
    troubleshooting: [
      { problem: 'ECHO pulseIn always returns 0', solution: 'Check if VCC is getting a full 5.0V. The ultrasonic transducers fail to ring below 4.5V. Verify TRIG wire continuity.' },
      { problem: 'Random spikes showing 0 cm or 400 cm', solution: 'Sound waves are reflecting at angles off soft cloth or oblique acoustic surfaces. Add median filtering across 5 consecutive samples in software.' }
    ],
    miniProject: {
      title: 'Automated Reverse Parking Distance Indicator',
      description: 'Displays real-time distance on an I2C LCD and beeps a buzzer with increasing frequency (from 1 Hz to continuous tone) as distance drops below 15 cm.',
      schematicTip: 'Wire active buzzer to MCU PWM pin with a 220Ω resistor and tie LCD SCL/SDA to hardware I2C.'
    },
    voltageWarning: 'WARNING: ECHO pin outputs 5V signals. Always step down with a voltage divider before connecting to ESP32 or RP2040!'
  },
  {
    id: 'mq135',
    name: 'MQ-135 Hazardous Gas & Air Quality Sensor',
    category: 'Gas & Air Quality Sensors',
    measurement: 'NH3, NOx, Alcohol, Benzene, Smoke, CO2 (10 - 1000 ppm)',
    workingPrinciple: 'Tin Dioxide (SnO2) semiconductor gas sensor with internal heater coil.',
    internalExplanation: 'The sensor utilizes a micro-ceramic tube coated with a sensitive Tin Dioxide (SnO2) layer and an internal Nichrome heating loop. In clean air, atmospheric oxygen adsorbs onto the SnO2 surface, trapping conduction electrons and creating a high potential barrier (high electrical resistance). When reducing gases (NH3, alcohol, smoke) interact with the adsorbed oxygen, electrons are released back into the conduction band, significantly decreasing surface resistance and causing a proportional analog voltage rise across load resistor RL.',
    pinConfiguration: [
      { pin: '1. VCC', function: '5V DC power supply (heats coil ~150mA)', type: 'Power' },
      { pin: '2. GND', function: 'Power supply ground (0V)', type: 'Ground' },
      { pin: '3. DO (Digital Out)', function: 'Digital comparator threshold output (LM393 onboard)', type: 'Digital Output' },
      { pin: '4. AO (Analog Out)', function: 'Analog voltage output proportional to gas concentration (0-5V)', type: 'Analog Output' }
    ],
    operatingVoltage: '5.0V ± 0.1V DC (Strictly required for 5V heating loop)',
    outputType: 'Analog',
    communicationProtocol: 'Analog Voltage (0-5V) / Digital Threshold Comparator',
    wiringDescription: 'Connect VCC to 5V (requires ~160mA heater current). Connect GND to Ground. Connect AO to an ADC pin. For 3.3V MCUs like ESP32, use a voltage divider (10k / 20k) or calibrate RL so AO never exceeds 3.3V.',
    supportedMcus: ['Arduino Uno', 'ESP32 (with analog divider)', 'STM32', 'Raspberry Pi Pico (with divider)', '8051 (via external ADC0804)'],
    exampleApplications: ['Domestic air pollution monitor', 'Industrial ammonia leakage detector in refrigeration', 'Automatic kitchen ventilation control', 'Indoor air quality (IAQ) smart building sensors'],
    arduinoCode: `const int analogPin = A0;
const int digitalPin = 2;

void setup() {
  Serial.begin(9600);
  pinMode(digitalPin, INPUT);
  Serial.println("MQ-135 Preheating... (Requires 24-48 hrs for stable calibration)");
}

void loop() {
  int rawADC = analogRead(analogPin);
  float voltage = rawADC * (5.0 / 1023.0);
  int thresholdTripped = digitalRead(digitalPin);

  Serial.print("Raw ADC: ");
  Serial.print(rawADC);
  Serial.print(" | Sensor Voltage: ");
  Serial.print(voltage);
  Serial.print("V | Air Quality: ");
  if (rawADC < 350) {
    Serial.println("Clean Air (Good)");
  } else if (rawADC < 600) {
    Serial.println("Moderate Pollution");
  } else {
    Serial.println("HAZARDOUS AIR QUALITY ALERT!");
  }
  delay(1000);
}`,
    esp32Code: `const int mqPin = 34; // ESP32 ADC1_CH6 (Input only)

void setup() {
  Serial.begin(115200);
  analogReadResolution(12); // 12-bit ADC (0 - 4095)
}

void loop() {
  int raw = analogRead(mqPin);
  float volt = raw * (3.3 / 4095.0);
  Serial.printf("MQ-135 ESP32 ADC: %d | Voltage: %.2f V\\r\\n", raw, volt);
  delay(1000);
}`,
    sampleData: [
      { timestamp: '08:00', rawAdc: 240, ppmEstimate: 18, status: 'Clean Air' },
      { timestamp: '08:15', rawAdc: 320, ppmEstimate: 32, status: 'Normal Room' },
      { timestamp: '08:30', rawAdc: 580, ppmEstimate: 110, status: 'Ventilation Needed' },
      { timestamp: '08:45', rawAdc: 890, ppmEstimate: 290, status: 'Hazardous (Spike)' },
      { timestamp: '09:00', rawAdc: 410, ppmEstimate: 55, status: 'Recovering' }
    ],
    troubleshooting: [
      { problem: 'Sensor body feels hot to the touch', solution: 'This is completely normal. The sensor incorporates an internal 5V heating element to maintain 150°C operating temperature for tin dioxide gas desorption.' },
      { problem: 'Readings drift constantly after startup', solution: 'The MQ-135 requires at least 24 hours of continuous "burn-in" preheating before calibration values (R0 in clean air) stabilize.' }
    ],
    miniProject: {
      title: 'Smart Classroom Air Quality & CO2 Sentinel',
      description: 'Monitors classroom air quality index (AQI) and automatically illuminates red, yellow, or green indicator LEDs, sounding a gentle chime when ventilation is urgently needed.',
      schematicTip: 'Wire green LED to pin 5, yellow LED to pin 6, red LED to pin 7, and drive a small buzzer via pin 8.'
    }
  },
  {
    id: 'mpu6050',
    name: 'MPU-6050 6-Axis Accelerometer & Gyroscope',
    category: 'Motion & Inertial Sensors',
    measurement: '3-Axis Angular Acceleration (±2g, ±4g, ±8g, ±16g) & 3-Axis Angular Velocity (±250, ±500, ±1000, ±2000 °/s)',
    workingPrinciple: 'Micro-Electro-Mechanical Systems (MEMS) capacitive sensing and Coriolis acceleration effect.',
    internalExplanation: 'The MPU-6050 houses silicon MEMS structures where tiny suspended proof masses move relative to fixed capacitive plates under acceleration, altering capacitance detected by on-chip differential charge amplifiers. The gyroscope measures the Coriolis effect on vibrating micro-structures during rotation. An onboard Digital Motion Processor (DMP) computes 6-axis sensor fusion algorithms to output accurate orientation Quaternions directly via I2C.',
    pinConfiguration: [
      { pin: '1. VCC', function: 'Power Supply (3.3V to 5V DC via onboard LDO)', type: 'Power' },
      { pin: '2. GND', function: 'Ground (0V)', type: 'Ground' },
      { pin: '3. SCL', function: 'I2C Serial Clock', type: 'I2C Clock' },
      { pin: '4. SDA', function: 'I2C Serial Data', type: 'I2C Data' },
      { pin: '5. XDA', function: 'Auxiliary I2C Master Data (for external magnetometer)', type: 'Aux I2C' },
      { pin: '6. XCL', function: 'Auxiliary I2C Master Clock', type: 'Aux I2C' },
      { pin: '7. AD0', function: 'I2C Address Select (GND = 0x68, VCC = 0x69)', type: 'Digital Input' },
      { pin: '8. INT', function: 'Motion Interrupt Output Pin', type: 'Digital Output' }
    ],
    operatingVoltage: '3.0V – 5.0V (Breakout module contains 3.3V LDO regulator)',
    outputType: 'I2C',
    communicationProtocol: 'I2C Fast Mode (Up to 400 kHz)',
    wiringDescription: 'Connect VCC to 3.3V (or 5V on breakout), GND to Ground, SCL to MCU SCL, and SDA to MCU SDA. Connect AD0 to GND for default 0x68 I2C address.',
    supportedMcus: ['ESP32', 'STM32', 'Arduino Uno', 'RP2040 Pico', 'PIC32'],
    exampleApplications: ['Quadcopter drone flight stabilization', 'Self-balancing two-wheeled robot (Inverted Pendulum)', 'Hand-gesture VR game controllers', 'Earthquake and seismic structural vibration monitoring'],
    arduinoCode: `#include <Wire.h>
const int MPU_ADDR = 0x68;
int16_t AcX, AcY, AcZ, Tmp, GyX, GyY, GyZ;

void setup() {
  Wire.begin();
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x6B); // PWR_MGMT_1 register
  Wire.write(0);    // Wake up MPU-6050
  Wire.endTransmission(true);
  Serial.begin(115200);
}

void loop() {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B); // Start at register 0x3B (ACCEL_XOUT_H)
  Wire.endTransmission(false);
  Wire.requestFrom(MPU_ADDR, 14, true); // Read 14 bytes

  AcX = Wire.read()<<8 | Wire.read();
  AcY = Wire.read()<<8 | Wire.read();
  AcZ = Wire.read()<<8 | Wire.read();
  Tmp = Wire.read()<<8 | Wire.read();
  GyX = Wire.read()<<8 | Wire.read();
  GyY = Wire.read()<<8 | Wire.read();
  GyZ = Wire.read()<<8 | Wire.read();

  Serial.print("AccX: "); Serial.print(AcX);
  Serial.print(" | AccY: "); Serial.print(AcY);
  Serial.print(" | AccZ: "); Serial.println(AcZ);
  delay(100);
}`,
    esp32Code: `// ESP32 High-speed MPU6050 I2C Reading
#include <Wire.h>
void setup() {
  Wire.begin(21, 22); // SDA=21, SCL=22
  Serial.begin(115200);
  Wire.beginTransmission(0x68);
  Wire.write(0x6B);
  Wire.write(0);
  Wire.endTransmission();
}`,
    sampleData: [
      { timestamp: '0.00s', roll: 0.1, pitch: 0.0, yaw: 0.0, tempC: 28.5 },
      { timestamp: '0.05s', roll: 1.2, pitch: -0.5, yaw: 0.1, tempC: 28.5 },
      { timestamp: '0.10s', roll: 3.8, pitch: -1.2, yaw: 0.3, tempC: 28.6 },
      { timestamp: '0.15s', roll: 12.4, pitch: -3.8, yaw: 1.2, tempC: 28.6 },
      { timestamp: '0.20s', roll: 25.1, pitch: -6.4, yaw: 2.5, tempC: 28.6 }
    ],
    troubleshooting: [
      { problem: 'I2C Device Not Found at 0x68', solution: 'Check AD0 pin connection. If left floating or tied HIGH to 3.3V, the I2C address changes to 0x69. Verify SDA/SCL pull-up resistors.' },
      { problem: 'Gyroscope readings slowly drift over time', solution: 'All MEMS gyroscopes exhibit thermal bias drift. Run a static calibration routine at boot to calculate and subtract zero-rate offsets.' }
    ],
    miniProject: {
      title: 'Self-Balancing Inverted Pendulum Robot',
      description: 'Uses a complementary filter to merge accelerometer angle and gyroscope angular rate, driving dual DC gearmotors via an L298N H-bridge using high-speed PID control.',
      schematicTip: 'Power DC motors from dedicated 7.4V LiPo battery pack; never draw motor surge current from microcontroller 5V rail.'
    }
  },
  {
    id: 'ldr',
    name: 'LDR (Light Dependent Resistor / Photoresistor)',
    category: 'Light & Optical Sensors',
    measurement: 'Ambient Light Intensity (1 Lux dark to > 10,000 Lux sunlight)',
    workingPrinciple: 'Cadmium Sulfide (CdS) photoconductivity.',
    internalExplanation: 'The sensor is made from a serpentine track of Cadmium Sulfide (CdS). When photons with energy greater than the semiconductor bandgap strike the CdS material, valence electrons absorb photon energy and jump to the conduction band, creating electron-hole pairs. This drastically increases electrical conductivity, lowering resistance from > 1 MΩ in darkness to under 1 kΩ in bright daylight.',
    pinConfiguration: [
      { pin: 'Pin 1 (Leg 1)', function: 'Terminal 1 (Non-polarized resistor)', type: 'Passive' },
      { pin: 'Pin 2 (Leg 2)', function: 'Terminal 2 (Non-polarized resistor)', type: 'Passive' }
    ],
    operatingVoltage: 'Any DC voltage (0V to 30V DC)',
    outputType: 'Analog',
    communicationProtocol: 'Analog Voltage Divider (Vout = VCC * R_fixed / (R_LDR + R_fixed))',
    wiringDescription: 'Create a voltage divider: Connect one leg of LDR to 5V (or 3.3V). Connect the other leg to both the MCU ADC pin and a 10kΩ fixed resistor. Connect the other end of the 10kΩ resistor to GND.',
    supportedMcus: ['Arduino Uno', 'ESP32', 'STM32', 'RP2040 Pico', 'MSP430', '8051 (with external ADC)'],
    exampleApplications: ['Automatic highway streetlight controllers', 'Solar panel single/dual-axis solar trackers', 'Camera automatic flash triggers', 'Night-light energy saving switches'],
    arduinoCode: `const int ldrPin = A0;
const int streetLightLed = 13;

void setup() {
  Serial.begin(9600);
  pinMode(streetLightLed, OUTPUT);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  Serial.print("Ambient Light ADC: ");
  Serial.println(ldrValue);

  // When dark, resistance increases, voltage drops below threshold
  if (ldrValue < 400) {
    digitalWrite(streetLightLed, HIGH); // Turn ON light at dusk
    Serial.println("Streetlight Status: ON [NIGHT]");
  } else {
    digitalWrite(streetLightLed, LOW);  // Turn OFF light at dawn
    Serial.println("Streetlight Status: OFF [DAY]");
  }
  delay(500);
}`,
    esp32Code: `const int ldrPin = 36; // ADC1_CH0
void setup() {
  Serial.begin(115200);
}
void loop() {
  int val = analogRead(ldrPin);
  Serial.printf("LDR Raw Value: %d\\r\\n", val);
  delay(500);
}`,
    sampleData: [
      { timestamp: '17:30', lux: 850, rawAdc: 820, lightStatus: 'Bright Sunlight' },
      { timestamp: '18:00', lux: 420, rawAdc: 650, lightStatus: 'Dusk' },
      { timestamp: '18:30', lux: 110, rawAdc: 380, lightStatus: 'Twilight (Streetlight ON)' },
      { timestamp: '19:00', lux: 15, rawAdc: 120, lightStatus: 'Night' },
      { timestamp: '19:30', lux: 2, rawAdc: 45, lightStatus: 'Pitch Black' }
    ],
    troubleshooting: [
      { problem: 'ADC reading does not change with light', solution: 'Verify you have constructed a voltage divider with a 10kΩ fixed resistor. Connecting an LDR directly between VCC and ADC without a resistor to GND will always read maximum VCC.' },
      { problem: 'Streetlight oscillates rapidly ON and OFF at dusk', solution: 'Add software hysteresis in code (e.g. Turn ON at < 350, Turn OFF at > 450) to prevent fluttering near threshold.' }
    ],
    miniProject: {
      title: 'Dual-Axis Solar Tracker with Servo Motors',
      description: 'Uses four LDRs arranged in a cross partition to compare light angles and commands two servo motors (azimuth and elevation) to tilt a solar panel towards maximum sunlight.',
      schematicTip: 'Place cardboard cross dividers between LDRs to cast shadows when the sun angle is off-center.'
    }
  },
  {
    id: 'ina219',
    name: 'INA219 High-Side DC Current & Power Sensor',
    category: 'Electrical & Energy Sensors',
    measurement: 'Bus Voltage (0V to 26V), Shunt Voltage (±320mV), Current (up to ±3.2A with 0.1Ω shunt)',
    workingPrinciple: 'High-side precision differential amplification across a low-resistance shunt resistor.',
    internalExplanation: 'The INA219 monitors shunt voltage drop across a precision 0.1Ω 1% sense resistor placed in the positive supply rail. An internal 12-bit delta-sigma ADC with programmable gain amplifier (PGA) converts differential shunt voltage and bus voltage, calculating current and power internally via dedicated multiplier registers.',
    pinConfiguration: [
      { pin: '1. VCC', function: 'Power Supply (3.0V to 5.5V)', type: 'Power' },
      { pin: '2. GND', function: 'Ground (0V)', type: 'Ground' },
      { pin: '3. SCL', function: 'I2C Clock line', type: 'I2C Clock' },
      { pin: '4. SDA', function: 'I2C Data line', type: 'I2C Data' },
      { pin: '5. VIN+', function: 'Positive high-side voltage from power source', type: 'Power Input' },
      { pin: '6. VIN-', function: 'High-side voltage out to load circuit', type: 'Power Output' }
    ],
    operatingVoltage: '3.0V – 5.5V DC (Senses up to 26V DC bus)',
    outputType: 'I2C',
    communicationProtocol: 'I2C (Default address 0x40; configurable to 0x41, 0x44, 0x45)',
    wiringDescription: 'Connect VCC to 3.3V/5V, GND to GND, SCL/SDA to MCU I2C bus. Insert VIN+ and VIN- in series with the positive lead of the load circuit being monitored.',
    supportedMcus: ['ESP32', 'STM32', 'Arduino Uno', 'RP2040 Pico'],
    exampleApplications: ['Solar panel power & battery charge logging', 'Drone battery energy state-of-charge gauge', 'USB port overcurrent protector', 'EV battery capacity testing'],
    arduinoCode: `#include <Wire.h>
#include <Adafruit_INA219.h>

Adafruit_INA219 ina219;

void setup() {
  Serial.begin(115200);
  if (!ina219.begin()) {
    Serial.println("Failed to find INA219 chip");
    while (1) delay(10);
  }
  Serial.println("INA219 Power Monitor Initialized");
}

void loop() {
  float busVoltage = ina219.getBusVoltage_V();
  float current_mA = ina219.getCurrent_mA();
  float power_mW = ina219.getPower_mW();

  Serial.print("Bus: "); Serial.print(busVoltage); Serial.print(" V | ");
  Serial.print("Current: "); Serial.print(current_mA); Serial.print(" mA | ");
  Serial.print("Power: "); Serial.print(power_mW); Serial.println(" mW");
  delay(1000);
}`,
    esp32Code: `// ESP32 INA219 Power Telemetry
#include <Wire.h>
#include <Adafruit_INA219.h>
Adafruit_INA219 ina219;
void setup() {
  Wire.begin(21, 22);
  Serial.begin(115200);
  ina219.begin();
}`,
    sampleData: [
      { timestamp: '12:00', busVoltage: 12.45, current_mA: 450, power_mW: 5602, loadStatus: 'Nominal' },
      { timestamp: '12:01', busVoltage: 12.38, current_mA: 780, power_mW: 9656, loadStatus: 'Nominal' },
      { timestamp: '12:02', busVoltage: 12.10, current_mA: 1850, power_mW: 22385, loadStatus: 'High Load' },
      { timestamp: '12:03', busVoltage: 11.20, current_mA: 3100, power_mW: 34720, loadStatus: 'Overcurrent Alert' }
    ],
    troubleshooting: [
      { problem: 'Current reading is zero even when load is on', solution: 'Ensure the load circuit negative return wire is connected to the common ground of the MCU and power supply.' }
    ],
    miniProject: {
      title: 'IoT Solar Energy Datalogger with OLED',
      description: 'Calculates cumulative watt-hours (energy yield) and displays real-time battery voltage, charging current, and efficiency metrics on an SSD1306 OLED.',
      schematicTip: 'Wire INA219 and SSD1306 display on the same I2C bus (INA219 at 0x40 and OLED at 0x3C).'
    }
  },
  {
    id: 'max30102',
    name: 'MAX30102 Pulse Oximeter & Heart Rate Sensor',
    category: 'Biomedical & Health Sensors',
    measurement: 'Heart Pulse Rate (BPM) & Blood Oxygen Saturation (SpO2 percentage)',
    workingPrinciple: 'Photoplethysmography (PPG) using Red (660nm) and Infrared (880nm) LEDs.',
    internalExplanation: 'Oxygenated hemoglobin (HbO2) absorbs more infrared light and allows more red light to pass through. Deoxygenated hemoglobin (Hb) absorbs more red light. By pulsing the 660nm Red LED and 880nm IR LED through capillary blood vessels in a fingertip and capturing the optical transmission on a high-sensitivity photodetector, the internal 18-bit delta-sigma ADC measures the arterial blood pulsation wave.',
    pinConfiguration: [
      { pin: '1. VIN', function: 'Power Supply (3.3V to 5V)', type: 'Power' },
      { pin: '2. GND', function: 'Ground (0V)', type: 'Ground' },
      { pin: '3. SCL', function: 'I2C Serial Clock', type: 'I2C Clock' },
      { pin: '4. SDA', function: 'I2C Serial Data', type: 'I2C Data' },
      { pin: '5. INT', function: 'Active-Low FIFO Data Ready Interrupt', type: 'Digital Output' }
    ],
    operatingVoltage: '1.8V core, 3.3V – 5.0V on breakout board',
    outputType: 'I2C',
    communicationProtocol: 'I2C (Address 0x57)',
    wiringDescription: 'Connect VIN to 3.3V, GND to GND, SCL to MCU I2C Clock, SDA to MCU I2C Data.',
    supportedMcus: ['ESP32', 'STM32', 'Arduino Uno', 'RP2040 Pico'],
    exampleApplications: ['Wearable fitness smartwatches', 'Hospital ICU pulse oximetry monitors', 'Sleep apnea monitoring systems'],
    arduinoCode: `#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"

MAX30105 particleSensor;

void setup() {
  Serial.begin(115200);
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30102 was not found. Check wiring.");
    while (1);
  }
  particleSensor.setup(); // Configure sensor with default settings
  particleSensor.setPulseAmplitudeRed(0x0A);
  particleSensor.setPulseAmplitudeGreen(0);
}

void loop() {
  long irValue = particleSensor.getIR();
  if (checkForBeat(irValue) == true) {
    Serial.println("Heart Beat Detected!");
  }
  delay(20);
}`,
    esp32Code: `// ESP32 PPG Streamer
#include <Wire.h>
#include "MAX30105.h"
MAX30105 sensor;
void setup() {
  Wire.begin(21, 22);
  Serial.begin(115200);
  sensor.begin();
}`,
    sampleData: [
      { timestamp: '10:00:01', heartRate_BPM: 72, spo2_percent: 98.5, status: 'Normal' },
      { timestamp: '10:00:02', heartRate_BPM: 74, spo2_percent: 98.2, status: 'Normal' },
      { timestamp: '10:00:03', heartRate_BPM: 85, spo2_percent: 97.8, status: 'Active' },
      { timestamp: '10:00:04', heartRate_BPM: 112, spo2_percent: 96.5, status: 'Elevated HR' }
    ],
    troubleshooting: [
      { problem: 'Readings jump wildly when finger touches sensor', solution: 'Do not press your finger down too firmly, as this occludes capillary blood flow. Maintain light, steady contact.' }
    ],
    miniProject: {
      title: 'IoT Hospital Patient Vital Signs Telemetry',
      description: 'Measures SpO2 and pulse rate continuously, publishing real-time telemetry over Wi-Fi MQTT to a hospital nurses dashboard.',
      schematicTip: 'Wire MAX30102 on ESP32 I2C pins (GPIO 21/22) with a 3.3V low-noise power rail.'
    }
  },
  {
    id: 'vl53l0x',
    name: 'VL53L0X Time-of-Flight (ToF) Laser Distance Sensor',
    category: 'Distance & Proximity Sensors',
    measurement: 'Absolute Distance (3 cm to 200 cm) immune to target color and reflectance',
    workingPrinciple: 'Infrared VCSEL Laser (940nm) Time-of-Flight with Single Photon Avalanche Diode (SPAD) array.',
    internalExplanation: 'Unlike ultrasonic or triangulation sensors, the VL53L0X uses a 940nm Vertical Cavity Surface Emitting Laser (VCSEL) that emits sub-nanosecond pulses of invisible light. An array of SPADs detects the reflected photons. By measuring the flight time with picosecond accuracy, the distance is calculated with millimeter precision regardless of whether the object is pitch black or reflective mirror.',
    pinConfiguration: [
      { pin: '1. VCC', function: 'Power Supply (2.6V to 5.0V with onboard LDO)', type: 'Power' },
      { pin: '2. GND', function: 'Ground (0V)', type: 'Ground' },
      { pin: '3. SCL', function: 'I2C Clock line', type: 'I2C Clock' },
      { pin: '4. SDA', function: 'I2C Data line', type: 'I2C Data' },
      { pin: '5. XSHUT', function: 'Shutdown pin (Active Low) for changing I2C address', type: 'Digital Input' },
      { pin: '6. GPIO1', function: 'Programmable interrupt threshold output', type: 'Digital Output' }
    ],
    operatingVoltage: '2.8V – 5.0V DC',
    outputType: 'I2C',
    communicationProtocol: 'I2C (Default address 0x29)',
    wiringDescription: 'Connect VCC to 3.3V or 5V, GND to GND, SCL/SDA to MCU I2C pins. If using multiple sensors, toggle XSHUT sequentially to assign unique addresses.',
    supportedMcus: ['ESP32', 'STM32', 'Arduino Uno', 'RP2040 Pico'],
    exampleApplications: ['Precision industrial liquid level gauging', 'Smartphone camera laser autofocus assist', 'Autonomous mobile robot wall-following', 'Touchless sanitary gesture buttons'],
    arduinoCode: `#include <Wire.h>
#include <VL53L0X.h>

VL53L0X sensor;

void setup() {
  Serial.begin(115200);
  Wire.begin();
  sensor.setTimeout(500);
  if (!sensor.init()) {
    Serial.println("Failed to detect VL53L0X laser sensor!");
    while (1);
  }
  sensor.startContinuous();
}

void loop() {
  uint16_t distanceMm = sensor.readRangeContinuousMillimeters();
  Serial.print("Laser Distance: ");
  Serial.print(distanceMm);
  Serial.println(" mm");
  if (sensor.timeoutOccurred()) { Serial.println(" TIMEOUT"); }
  delay(100);
}`,
    esp32Code: `// ESP32 Laser ToF
#include <Wire.h>
#include <VL53L0X.h>
VL53L0X sensor;
void setup() {
  Wire.begin(21, 22);
  Serial.begin(115200);
  sensor.init();
  sensor.startContinuous();
}`,
    sampleData: [
      { timestamp: '0.1s', distanceMm: 245, status: 'Precise Target' },
      { timestamp: '0.2s', distanceMm: 246, status: 'Precise Target' },
      { timestamp: '0.3s', distanceMm: 180, status: 'Approaching' },
      { timestamp: '0.4s', distanceMm: 95, status: 'Close Proximity' }
    ],
    troubleshooting: [
      { problem: 'Reads 8190 mm continuously', solution: '8190 is the out-of-range flag. Target is either further than 2000 mm or obscured by intense direct outdoor sunlight saturating SPADs.' }
    ],
    miniProject: {
      title: 'Touchless Sanitary Elevator Button',
      description: 'Detects a passenger finger hovering within 50 mm without physical contact, lighting a confirmation LED and triggering an elevator call relay.',
      schematicTip: 'Wire XSHUT to MCU GPIO so MCU can reset the sensor on startup.'
    }
  }
];
