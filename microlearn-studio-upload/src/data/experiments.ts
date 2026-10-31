import { Experiment } from '../types';

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'exp-1',
    experimentNumber: 1,
    title: 'ESP32 + DHT11 Temperature & Humidity Monitoring',
    mcuId: 'esp32-wroom-32',
    boardName: 'ESP32 DevKit V1',
    sensorId: 'dht11',
    sensorName: 'DHT11 Sensor',
    difficulty: 'Beginner',
    aim: 'To interface a DHT11 digital temperature and humidity sensor with the ESP32 microcontroller, read single-wire digital packets, and stream environmental telemetry over the serial monitor.',
    requiredComponents: [
      'ESP32 DevKit V1 development board',
      'DHT11 Temperature & Humidity Sensor module',
      '4.7kΩ pull-up resistor (if using raw sensor)',
      'Solderless breadboard',
      'Connecting jumper wires (Male-to-Male)',
      'Micro-USB programming cable'
    ],
    circuitDiagramText: `+-------------------+         +--------------------+
|  ESP32 DevKit V1  |         |    DHT11 Sensor    |
|                   |         |                    |
|      3V3 (Pin 16) |-------->| Pin 1 (VCC)        |
|      GND (Pin 14) |-------->| Pin 4 (GND)        |
|  GPIO 4  (Pin 21) |<------->| Pin 2 (DATA)       |
|                   |         | [4.7kΩ to 3.3V]    |
+-------------------+         +--------------------+`,
    pinConnections: [
      { sensorPin: 'Pin 1 (VCC)', mcuPin: '3V3 (Pin 16)', wireColor: '#EF4444', functionDesc: 'Regulated 3.3V DC Power' },
      { sensorPin: 'Pin 2 (DATA)', mcuPin: 'GPIO 4 (Pin 21)', wireColor: '#06B6D4', functionDesc: 'Single-wire bidirectional data line' },
      { sensorPin: 'Pin 4 (GND)', mcuPin: 'GND (Pin 14)', wireColor: '#1F2937', functionDesc: 'System Common Ground' }
    ],
    workingPrinciple: 'The ESP32 initiates communication by pulling GPIO 4 LOW for 18 ms, then releasing it. The 4.7kΩ resistor pulls the line HIGH for 20-40 µs. The DHT11 responds by pulling the line LOW for 80 µs then HIGH for 80 µs. Next, it transmits 40 bits of data (16 bits humidity, 16 bits temperature, 8 bits parity check). A bit 0 is represented by 50 µs LOW + 26-28 µs HIGH, while a bit 1 is 50 µs LOW + 70 µs HIGH.',
    stepByStepProcedure: [
      'Place the ESP32 DevKit V1 firmly into the breadboard bridging the center divider.',
      'Mount the DHT11 sensor onto the breadboard.',
      'Connect the DHT11 VCC pin to the ESP32 3V3 power rail using a red jumper wire.',
      'Connect the DHT11 GND pin to the ESP32 GND rail using a black jumper wire.',
      'Connect the DHT11 DATA pin to ESP32 GPIO 4 using a cyan jumper wire.',
      'If using a bare 4-pin DHT11, insert a 4.7kΩ resistor between VCC and DATA pins.',
      'Connect the ESP32 to your PC via USB cable and launch Arduino IDE / PlatformIO.',
      'Select board "ESP32 Dev Module" and select the appropriate COM port.',
      'Compile and upload the source code, then open Serial Monitor at 115200 baud.'
    ],
    sourceCode: {
      esp32: `#include "DHT.h"

#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println(F("=========================================="));
  Serial.println(F(" MicroLearn: ESP32 + DHT11 Telemetry Lab "));
  Serial.println(F("=========================================="));
  dht.begin();
}

void loop() {
  delay(2000); // 2-second sampling interval

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println(F("[ERROR] Failed to read from DHT sensor! Check wiring."));
    return;
  }

  // Compute Heat Index in Celsius
  float hic = dht.computeHeatIndex(temperature, humidity, false);

  Serial.printf("[DATA] Temp: %.1f °C | Humidity: %.1f %% | Heat Index: %.1f °C\\r\\n",
                temperature, humidity, hic);
}`,
      arduino: `#include <DHT.h>
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
void setup() {
  Serial.begin(9600);
  dht.begin();
}
void loop() {
  delay(2000);
  Serial.print("T: "); Serial.println(dht.readTemperature());
}`
    },
    expectedOutput: `==========================================
 MicroLearn: ESP32 + DHT11 Telemetry Lab 
==========================================
[DATA] Temp: 25.4 °C | Humidity: 58.0 % | Heat Index: 25.7 °C
[DATA] Temp: 25.5 °C | Humidity: 58.2 % | Heat Index: 25.8 °C
[DATA] Temp: 26.1 °C | Humidity: 59.0 % | Heat Index: 26.5 °C`,
    observations: [
      'The sensor reading stabilizes within 2-3 seconds after power-up.',
      'Blowing air gently across the sensor shows an immediate humidity rise from 58% to over 80%.',
      'Data reading frequency must not exceed 0.5 Hz (1 sample every 2 seconds) to avoid self-heating errors.'
    ],
    applications: [
      'IoT smart agriculture green-house climate regulation',
      'Pharmaceutical medicine storage warehouse monitoring',
      'HVAC thermostat control in smart buildings'
    ],
    conclusion: 'The single-wire handshake protocol between the ESP32 and DHT11 was verified successfully. The 40-bit packet transmission accurately provided relative humidity and ambient temperature values with parity checksum validation.',
    wokwiId: 'esp32-dht22',
    simulationConfig: {
      stimulusName: 'Ambient Temperature (°C)',
      stimulusMin: 10,
      stimulusMax: 60,
      stimulusStep: 1,
      stimulusUnit: '°C',
      defaultStimulus: 25,
      computeReading: (val: number) => {
        const rawAdc = Math.round(val * 40.95);
        const hum = Math.max(20, Math.min(95, Math.round(40 + (val - 20) * 1.4)));
        const isWarning = val > 40 || val < 15;
        return {
          rawAdc,
          processedValue: `${val.toFixed(1)} °C | ${hum}% RH`,
          status: isWarning ? 'Warning' : 'Normal',
          logMessage: `[DHT11] Temperature: ${val.toFixed(1)} °C | Humidity: ${hum} % RH | Checksum: OK`,
          pinVoltage: 3.3,
          indicatorActive: val > 35
        };
      }
    }
  },
  {
    id: 'exp-2',
    experimentNumber: 2,
    title: 'STM32F103 + HC-SR04 Distance Measurement',
    mcuId: 'stm32f103c6t6a',
    boardName: 'STM32F103C6T6A (Blue Pill)',
    sensorId: 'hc-sr04',
    sensorName: 'HC-SR04 Ultrasonic Sensor',
    difficulty: 'Intermediate',
    aim: 'To interface the HC-SR04 ultrasonic distance sensor with the STM32F103 microcontroller using hardware timers and input capture, safely stepping down the 5V ECHO pulse for 3.3V GPIO compatibility.',
    requiredComponents: [
      'STM32F103C6T6A Blue Pill board',
      'HC-SR04 Ultrasonic Distance Sensor',
      '1kΩ and 2kΩ resistors (for 5V to 3.3V voltage divider)',
      'ST-Link V2 USB debugger / programmer',
      'Breadboard and jumper wires',
      '5V external DC power supply or USB 5V pin'
    ],
    circuitDiagramText: `+-----------------------+              +-------------------+
|  STM32F103 Blue Pill  |              |   HC-SR04 Sensor  |
|                       |              |                   |
|       5V (Pin 21)     |------------->| Pin 1 (VCC)       |
|       GND (Pin 20)    |------------->| Pin 4 (GND)       |
|  PA1 (Pin 6) - TRIG   |------------->| Pin 2 (TRIG)      |
|  PA0 (Pin 5) - ECHO   |<--[1kΩ]--+---| Pin 3 (ECHO 5V)   |
|                       |          |   +-------------------+
|                       |        [2kΩ]
|                       |          |
|                       |        (GND)
+-----------------------+`,
    pinConnections: [
      { sensorPin: 'Pin 1 (VCC)', mcuPin: '5V (Pin 21)', wireColor: '#EF4444', functionDesc: '5V Power Supply for Transducers' },
      { sensorPin: 'Pin 2 (TRIG)', mcuPin: 'PA1 (Pin 6)', wireColor: '#F59E0B', functionDesc: '10µs Start Trigger Pulse' },
      { sensorPin: 'Pin 3 (ECHO)', mcuPin: 'PA0 (Pin 5)', wireColor: '#10B981', functionDesc: 'ECHO width via 1k/2k voltage divider (safe 3.3V)' },
      { sensorPin: 'Pin 4 (GND)', mcuPin: 'GND (Pin 20)', wireColor: '#1F2937', functionDesc: 'Common Ground' }
    ],
    workingPrinciple: 'The STM32 timer generates a precise 10 µs HIGH pulse on PA1. The HC-SR04 emits eight 40 kHz ultrasonic cycles. When the sound waves reflect off an obstacle, the ECHO pin outputs a 5V pulse whose duration equals round-trip flight time. The voltage divider (1kΩ in series, 2kΩ to GND) divides the 5V pulse by (2/(1+2) = 0.667), yielding 3.33V safe for PA0. The STM32 timer counts microsecond ticks between rising and falling edges.',
    stepByStepProcedure: [
      'Insert the STM32 Blue Pill board into the breadboard.',
      'Mount the HC-SR04 sensor facing an open obstacle path.',
      'Connect HC-SR04 VCC to Blue Pill 5V pin, and GND to Blue Pill GND.',
      'Connect Blue Pill PA1 to the HC-SR04 TRIG pin.',
      'Construct the voltage divider: Connect ECHO to a 1kΩ resistor. Connect the other side of 1kΩ to Blue Pill PA0 and one side of a 2kΩ resistor. Connect the other side of 2kΩ to GND.',
      'Connect ST-Link V2 debugger SWDIO, SWCLK, 3V3, and GND pins to Blue Pill header.',
      'Open STM32CubeIDE, generate timer initialization code, and flash the binary.',
      'Monitor distance readings over USART1 (PA9 TX) via USB-to-UART adapter.'
    ],
    sourceCode: {
      stm32: `/* STM32F103 HAL Ultrasonic Distance Measurement */
#include "main.h"
#include <stdio.h>

extern TIM_HandleTypeDef htim2;
extern UART_HandleTypeDef huart1;

void delay_us(uint16_t us) {
  __HAL_TIM_SET_COUNTER(&htim2, 0);
  while (__HAL_TIM_GET_COUNTER(&htim2) < us);
}

float HCSR04_Read(void) {
  uint32_t pMillis;
  uint32_t val1 = 0, val2 = 0;

  // Send 10µs pulse on PA1 (TRIG)
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_1, GPIO_PIN_SET);
  delay_us(10);
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_1, GPIO_PIN_RESET);

  pMillis = HAL_GetTick();
  // Wait for PA0 (ECHO) to go HIGH
  while (!(HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_0)) && (HAL_GetTick() - pMillis < 50));
  val1 = __HAL_TIM_GET_COUNTER(&htim2);

  pMillis = HAL_GetTick();
  // Wait for PA0 (ECHO) to go LOW
  while ((HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_0)) && (HAL_GetTick() - pMillis < 50));
  val2 = __HAL_TIM_GET_COUNTER(&htim2);

  return (float)(val2 - val1) * 0.0343 / 2.0;
}`
    },
    expectedOutput: `[STM32 Blue Pill] Distance Sensor Initialized
[TIM2 ECHO] PulseWidth: 2915 us -> Distance: 50.0 cm
[TIM2 ECHO] PulseWidth: 1749 us -> Distance: 30.0 cm
[TIM2 ECHO] PulseWidth: 583 us  -> Distance: 10.0 cm [WARNING: CLOSE OBSTACLE]`,
    observations: [
      'The 1kΩ/2kΩ divider stepped down the 5.0V ECHO pulse to exactly 3.32V, measured on oscilloscope.',
      'Distances between 4 cm and 250 cm showed high repeatability within ±3 mm.',
      'Objects angled more than 45° to the acoustic axis deflected sound waves away, causing timeouts.'
    ],
    applications: [
      'Automated guided vehicle (AGV) collision prevention',
      'Automotive ultrasonic blind-spot detection',
      'Industrial liquid level monitoring in chemical silos'
    ],
    conclusion: 'The experiment successfully demonstrated timer-based microsecond pulse-width capture on ARM Cortex-M3 architecture and verified safe level-shifting techniques for 5V peripherals.',
    simulationConfig: {
      stimulusName: 'Obstacle Distance (cm)',
      stimulusMin: 2,
      stimulusMax: 300,
      stimulusStep: 1,
      stimulusUnit: 'cm',
      defaultStimulus: 45,
      computeReading: (val: number) => {
        const pulseUs = Math.round((val * 2) / 0.0343);
        const isAlert = val < 15;
        return {
          rawAdc: pulseUs,
          processedValue: `${val.toFixed(1)} cm (${pulseUs} µs)`,
          status: isAlert ? 'Alert' : (val < 40 ? 'Warning' : 'Normal'),
          logMessage: `[STM32 TIM2] Echo Pulse: ${pulseUs} µs | Calculated Distance: ${val.toFixed(1)} cm`,
          pinVoltage: 3.3,
          indicatorActive: isAlert
        };
      }
    }
  },
  {
    id: 'exp-3',
    experimentNumber: 3,
    title: 'Arduino Uno + LDR Automatic Streetlight',
    mcuId: 'atmega328p',
    boardName: 'Arduino Uno R3',
    sensorId: 'ldr',
    sensorName: 'Light Dependent Resistor (LDR)',
    difficulty: 'Beginner',
    aim: 'To design and implement an energy-efficient automatic streetlight switching system using an LDR sensor, voltage divider, and ATmega328P 10-bit analog-to-digital converter.',
    requiredComponents: [
      'Arduino Uno R3 development board',
      'Cadmium Sulfide (CdS) LDR photoresistor',
      '10kΩ fixed resistor (1/4 watt)',
      'High-brightness 5mm White LED',
      '220Ω current limiting resistor',
      'Breadboard and jumper wires'
    ],
    circuitDiagramText: `+----------------------+             +---------------------+
|    Arduino Uno R3    |             |   LDR Sensor & LED  |
|                      |             |                     |
|         5V           |------------>| LDR Leg 1           |
|         A0           |<------------| LDR Leg 2 + 10kΩ    |
|         GND          |------------>| 10kΩ Leg 2          |
|                      |             |                     |
|         Pin 13 (D13) |----[220Ω]---> (Anode +) White LED |
|         GND          |------------> (Cathode -) White LED|
+----------------------+             +---------------------+`,
    pinConnections: [
      { sensorPin: 'LDR Leg 1', mcuPin: '5V', wireColor: '#EF4444', functionDesc: '5V Supply' },
      { sensorPin: 'LDR Leg 2 / 10kΩ Junction', mcuPin: 'A0 (PC0)', wireColor: '#06B6D4', functionDesc: 'Analog Voltage Divider Input' },
      { sensorPin: '10kΩ Bottom Terminal', mcuPin: 'GND', wireColor: '#1F2937', functionDesc: 'Ground Reference' },
      { sensorPin: 'LED Anode via 220Ω', mcuPin: 'Pin 13', wireColor: '#10B981', functionDesc: 'Streetlight Driver Output' }
    ],
    workingPrinciple: 'The LDR and 10kΩ resistor form a voltage divider. Vout = 5V * (10kΩ / (R_ldr + 10kΩ)). In daylight, R_ldr is low (~1kΩ), making Vout ~4.54V (ADC ~930). In darkness, R_ldr skyrockets to > 100kΩ, dropping Vout to ~0.45V (ADC ~90). The Arduino continuously samples A0 and energizes the streetlight LED when ADC drops below a hysteresis threshold (ADC < 350).',
    stepByStepProcedure: [
      'Place the LDR across two separate breadboard columns.',
      'Connect one leg of the LDR to Arduino 5V pin.',
      'Insert the 10kΩ resistor between the other leg of the LDR and Arduino GND.',
      'Run a jumper wire from the LDR-resistor junction to Arduino Analog Pin A0.',
      'Insert the White LED into the breadboard: Anode to a 220Ω resistor connected to Pin 13; Cathode to GND.',
      'Upload sketch to Arduino Uno and open Serial Monitor at 9600 baud.',
      'Cover the LDR with your palm to simulate nightfall and observe the LED illuminate.'
    ],
    sourceCode: {
      arduino: `const int ldrPin = A0;
const int streetLightPin = 13;
const int DARK_THRESHOLD = 350;
const int LIGHT_THRESHOLD = 450; // Hysteresis window

bool lightState = false;

void setup() {
  Serial.begin(9600);
  pinMode(streetLightPin, OUTPUT);
  Serial.println("Arduino Automatic Streetlight Controller Active");
}

void loop() {
  int ldrRaw = analogRead(ldrPin);
  float voltage = ldrRaw * (5.0 / 1023.0);

  // Implement hysteresis to prevent fluttering at twilight
  if (!lightState && ldrRaw < DARK_THRESHOLD) {
    lightState = true;
    digitalWrite(streetLightPin, HIGH);
    Serial.println("[NIGHTFALL DETECTED] Streetlight Activated: ON");
  } else if (lightState && ldrRaw > LIGHT_THRESHOLD) {
    lightState = false;
    digitalWrite(streetLightPin, LOW);
    Serial.println("[SUNRISE DETECTED] Streetlight Deactivated: OFF");
  }

  Serial.print("Ambient Light ADC: ");
  Serial.print(ldrRaw);
  Serial.print(" | Divider Voltage: ");
  Serial.print(voltage, 2);
  Serial.println(" V");
  delay(1000);
}`
    },
    expectedOutput: `Arduino Automatic Streetlight Controller Active
Ambient Light ADC: 820 | Divider Voltage: 4.01 V
Ambient Light ADC: 550 | Divider Voltage: 2.69 V
[NIGHTFALL DETECTED] Streetlight Activated: ON
Ambient Light ADC: 120 | Divider Voltage: 0.59 V
Ambient Light ADC: 85  | Divider Voltage: 0.42 V`,
    observations: [
      'ADC values ranged from 920 in office lighting to 65 when shrouded in complete darkness.',
      'Software hysteresis between 350 and 450 eliminated flickers caused by passing shadows.',
      'The 220Ω resistor kept the LED forward current at a safe 14 mA.'
    ],
    applications: [
      'Municipal solar highway lighting automation',
      'Commercial perimeter security lighting',
      'Automotive automatic headlamp sensing'
    ],
    conclusion: 'The automatic streetlight circuit operates reliably, preventing daylight energy wastage and ensuring responsive night illumination with hysteresis stability.',
    simulationConfig: {
      stimulusName: 'Ambient Light (Lux)',
      stimulusMin: 0,
      stimulusMax: 1000,
      stimulusStep: 10,
      stimulusUnit: 'Lux',
      defaultStimulus: 600,
      computeReading: (val: number) => {
        const rawAdc = Math.min(1023, Math.round(Math.sqrt(val / 1000) * 1023));
        const isDark = rawAdc < 350;
        return {
          rawAdc,
          processedValue: `${val} Lux (ADC: ${rawAdc})`,
          status: isDark ? 'Triggered' : 'Normal',
          logMessage: `[LDR A0] Ambient: ${val} Lux | ADC: ${rawAdc} | Streetlight: ${isDark ? 'ON [NIGHT]' : 'OFF [DAY]'}`,
          pinVoltage: (rawAdc / 1023) * 5.0,
          indicatorActive: isDark
        };
      }
    }
  },
  {
    id: 'exp-4',
    experimentNumber: 4,
    title: 'ESP32 + MQ-135 Air Quality Monitoring',
    mcuId: 'esp32-wroom-32',
    boardName: 'ESP32 DevKit V1',
    sensorId: 'mq135',
    sensorName: 'MQ-135 Gas Sensor',
    difficulty: 'Intermediate',
    aim: 'To interface the MQ-135 gas sensor with the ESP32, sample analog pollutant concentrations through the 12-bit ADC, and trigger visual ventilation alerts.',
    requiredComponents: [
      'ESP32 DevKit V1',
      'MQ-135 Air Quality Sensor module',
      'External 5V 1A DC power source for heating loop',
      'RGB LED / Buzzer for alert indication',
      'Breadboard and jumper wires'
    ],
    circuitDiagramText: `+--------------------+              +--------------------+
|   ESP32 DevKit     |              |   MQ-135 Module    |
|                    |              |                    |
|      VIN (5V)      |------------->| Pin 1 (VCC 5V)     |
|      GND           |------------->| Pin 2 (GND)        |
|      GPIO 34 (ADC) |<-------------| Pin 4 (AO)         |
+--------------------+              +--------------------+`,
    pinConnections: [
      { sensorPin: 'VCC', mcuPin: 'VIN (5V)', wireColor: '#EF4444', functionDesc: '5V Heater & Circuit Power' },
      { sensorPin: 'GND', mcuPin: 'GND', wireColor: '#1F2937', functionDesc: 'Common Ground' },
      { sensorPin: 'AO', mcuPin: 'GPIO 34', wireColor: '#8B5CF6', functionDesc: 'Analog Gas Voltage' }
    ],
    workingPrinciple: 'The MQ-135 tin dioxide (SnO2) sensing element changes resistance inversely proportional to surrounding concentrations of ammonia, NOx, alcohol, benzene, and smoke. The analog voltage output increases as pollution rises.',
    stepByStepProcedure: [
      'Connect MQ-135 VCC to ESP32 VIN (5V rail).',
      'Connect MQ-135 GND to ESP32 GND.',
      'Connect MQ-135 AO (Analog Output) to ESP32 GPIO 34 (ADC1_CH6).',
      'Allow sensor to preheat for 5-10 minutes until readings stabilize.',
      'Upload the program and monitor PPM air quality levels on Serial Plotter.'
    ],
    sourceCode: {
      esp32: `const int mqPin = 34; // Input-only ADC pin

void setup() {
  Serial.begin(115200);
  analogReadResolution(12); // 12-bit ADC (0-4095)
  Serial.println("ESP32 MQ-135 Air Quality Station Running");
}

void loop() {
  int rawADC = analogRead(mqPin);
  float voltage = rawADC * (3.3 / 4095.0);

  Serial.printf("Raw ADC: %d | Voltage: %.2f V | Status: ", rawADC, voltage);
  if (rawADC < 1200) {
    Serial.println("EXCELLENT (Clean Air)");
  } else if (rawADC < 2200) {
    Serial.println("MODERATE (Ventilate Room)");
  } else {
    Serial.println("ALERT! High Pollution Detected");
  }
  delay(1000);
}`
    },
    expectedOutput: `ESP32 MQ-135 Air Quality Station Running
Raw ADC: 850  | Voltage: 0.68 V | Status: EXCELLENT (Clean Air)
Raw ADC: 1650 | Voltage: 1.33 V | Status: MODERATE (Ventilate Room)
Raw ADC: 2890 | Voltage: 2.33 V | Status: ALERT! High Pollution Detected`,
    observations: [
      'Heater coil reached stable thermal equilibrium after 10 minutes.',
      'Exposing sensor to isopropyl alcohol vapors prompted an instant ADC surge from 850 to 3400.'
    ],
    applications: ['Smart classroom IAQ monitoring', 'Industrial ammonia detection in poultry sheds', 'Kitchen gas leak prevention'],
    conclusion: 'The ESP32 successfully captured analog gas concentrations, enabling cloud IoT air quality monitoring.',
    simulationConfig: {
      stimulusName: 'Pollutant Gas (PPM)',
      stimulusMin: 10,
      stimulusMax: 1000,
      stimulusStep: 10,
      stimulusUnit: 'PPM',
      defaultStimulus: 35,
      computeReading: (val: number) => {
        const raw = Math.round(500 + Math.log10(val) * 1100);
        const isHazard = val > 200;
        return {
          rawAdc: raw,
          processedValue: `${val} PPM (ADC: ${raw})`,
          status: isHazard ? 'Alert' : (val > 80 ? 'Warning' : 'Normal'),
          logMessage: `[MQ-135] Pollution: ${val} PPM | ADC: ${raw} | Air Quality: ${isHazard ? 'HAZARDOUS' : 'Good'}`,
          pinVoltage: (raw / 4095) * 3.3,
          indicatorActive: isHazard
        };
      }
    }
  },
  {
    id: 'exp-5',
    experimentNumber: 5,
    title: 'Raspberry Pi Pico + PIR Motion Detection',
    mcuId: 'rp2040-pico',
    boardName: 'Raspberry Pi Pico',
    sensorId: 'hc-sr501',
    sensorName: 'PIR Motion Sensor (HC-SR501)',
    difficulty: 'Beginner',
    aim: 'To interface the HC-SR501 pyroelectric infrared motion sensor with the Raspberry Pi Pico RP2040 using GPIO hardware edge interrupts to wake the processor and toggle a security alarm.',
    requiredComponents: [
      'Raspberry Pi Pico RP2040',
      'HC-SR501 PIR Motion Sensor module',
      'Red 5mm Alert LED + 220Ω resistor',
      'Breadboard and jumper wires'
    ],
    circuitDiagramText: `+----------------------+             +--------------------+
|  Raspberry Pi Pico   |             |   HC-SR501 PIR     |
|                      |             |                    |
|      VBUS (Pin 40)   |------------>| Pin 1 (VCC 5V)     |
|      GND (Pin 38)    |------------>| Pin 3 (GND)        |
|      GP14 (Pin 19)   |<------------| Pin 2 (OUT 3.3V)   |
|      GP15 (Pin 20)   |----[220Ω]---> (Anode) Alert LED  |
+----------------------+             +--------------------+`,
    pinConnections: [
      { sensorPin: 'VCC', mcuPin: 'VBUS (Pin 40)', wireColor: '#EF4444', functionDesc: '5V USB Power to PIR LDO' },
      { sensorPin: 'OUT', mcuPin: 'GP14 (Pin 19)', wireColor: '#22D3EE', functionDesc: '3.3V Logic Output from BISS0001 IC' },
      { sensorPin: 'GND', mcuPin: 'GND (Pin 38)', wireColor: '#1F2937', functionDesc: 'Common Ground' }
    ],
    workingPrinciple: 'The HC-SR501 contains dual pyroelectric infrared detector elements behind a multi-faceted Fresnel lens array. Moving human body heat (9-10 µm IR) triggers differential voltage pulses in the BISS0001 controller chip, driving the OUT pin HIGH (3.3V) for the configured trigger duration.',
    stepByStepProcedure: [
      'Connect PIR VCC to Pico VBUS (Pin 40, 5V from USB).',
      'Connect PIR GND to Pico GND (Pin 38).',
      'Connect PIR OUT to Pico GP14 (Pin 19).',
      'Connect LED anode via 220Ω resistor to GP15 (Pin 20), cathode to GND.',
      'Flash C / MicroPython code and configure GPIO interrupt on rising edge.',
      'Wave your hand in front of the Fresnel lens to trigger motion alarm.'
    ],
    sourceCode: {
      arduino: `const int pirPin = 14;
const int ledPin = 15;
volatile bool motionDetected = false;

void IRAM_ATTR motionISR() {
  motionDetected = true;
}

void setup() {
  Serial.begin(115200);
  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
  attachInterrupt(digitalPinToInterrupt(pirPin), motionISR, RISING);
  Serial.println("Pico PIR Motion Security Guard Armed");
}

void loop() {
  if (motionDetected) {
    motionDetected = false;
    digitalWrite(ledPin, HIGH);
    Serial.println("[INTRUSION ALERT] Motion detected in protected zone!");
    delay(3000);
    digitalWrite(ledPin, LOW);
  }
}`
    },
    expectedOutput: `Pico PIR Motion Security Guard Armed
[SYSTEM ARMED] Monitoring PIR sensor on GP14...
[INTRUSION ALERT] Motion detected in protected zone!
[INTRUSION ALERT] Motion detected in protected zone!`,
    observations: [
      'HC-SR501 OUT pin voltage remained at 0V when static and jumped to 3.28V upon movement.',
      'The sensor 3.3V logic level was directly compatible with Pico without any level shifters.'
    ],
    applications: ['Home intrusion security alarms', 'Energy-saving occupancy lighting switches', 'Smart retail store foot-traffic analytics'],
    conclusion: 'Interrupt-driven PIR detection on RP2040 minimized CPU utilization while ensuring instantaneous security alarm response.',
    simulationConfig: {
      stimulusName: 'Infrared Motion State',
      stimulusMin: 0,
      stimulusMax: 1,
      stimulusStep: 1,
      stimulusUnit: 'Binary',
      defaultStimulus: 0,
      computeReading: (val: number) => {
        const isMotion = val === 1;
        return {
          rawAdc: isMotion ? 1 : 0,
          processedValue: isMotion ? 'MOTION DETECTED (HIGH)' : 'IDLE / CLEAR (LOW)',
          status: isMotion ? 'Triggered' : 'Normal',
          logMessage: isMotion ? '[PIR GP14] INTRUSION ALERT! Infrared shift detected.' : '[PIR GP14] Secure. No motion in zone.',
          pinVoltage: isMotion ? 3.3 : 0.0,
          indicatorActive: isMotion
        };
      }
    }
  },
  {
    id: 'exp-6',
    experimentNumber: 6,
    title: '8051 (AT89S52) + LED Blinking with Delay Loop',
    mcuId: 'intel-8051',
    boardName: '8051 Microcontroller Board',
    sensorId: 'led-indicator',
    sensorName: 'LED Display Array',
    difficulty: 'Beginner',
    aim: 'To understand the fundamental CISC Harvard architecture of the Intel 8051 microcontroller by writing an Embedded C program to toggle an LED connected to Port 2 Pin 0 using software timer delay loops.',
    requiredComponents: [
      'AT89S52 / STC89C52 8051 development board',
      '11.0592 MHz or 12 MHz Quartz Crystal oscillator',
      'Two 33pF ceramic capacitors',
      '10µF electrolytic capacitor and 10kΩ resistor (Power-On Reset circuit)',
      '330Ω current limiting resistor & Red LED',
      '5V DC regulated power supply'
    ],
    circuitDiagramText: `+-----------------------+             +-------------------+
|      AT89S52 8051     |             |   LED Circuit     |
|                       |             |                   |
|  Pin 40 (VCC)         |------------>| +5V DC Supply     |
|  Pin 20 (GND)         |------------>| 0V GND            |
|  Pin 21 (P2.0)        |----[330Ω]---> (Anode +) LED     |
|                       |             | (Cathode -) -> GND|
|  Pin 31 (EA/VPP) -> 5V| (Enable internal ROM)           |
+-----------------------+`,
    pinConnections: [
      { sensorPin: 'LED Anode via 330Ω', mcuPin: 'Port 2 Pin 0 (Pin 21)', wireColor: '#EF4444', functionDesc: 'Active-High / Active-Low Output' },
      { sensorPin: 'LED Cathode', mcuPin: 'GND (Pin 20)', wireColor: '#1F2937', functionDesc: 'Ground Return' }
    ],
    workingPrinciple: 'In standard 12T 8051 architecture, 1 machine cycle comprises 12 oscillator clock periods. At 11.0592 MHz, 1 machine cycle is ~1.085 µs. A nested software loop decrementing 16-bit counter variables consumes calculated machine cycles to generate precise half-second delays between toggling the P2^0 register bit.',
    stepByStepProcedure: [
      'Verify crystal oscillator (11.0592 MHz) is connected across XTAL1 (Pin 19) and XTAL2 (Pin 18) with 33pF grounding caps.',
      'Tie EA pin (Pin 31) to VCC (+5V) to enable execution from internal 8KB Flash ROM.',
      'Connect the reset network (10µF cap to VCC, 10kΩ to GND) to RST (Pin 9).',
      'Connect 330Ω resistor from Port 2.0 (Pin 21) to LED anode, cathode to GND.',
      'Compile using Keil uVision C51 compiler and flash the generated Intel HEX file via ISP programmer.'
    ],
    sourceCode: {
      c51: `// Keil C51 Embedded C for 8051
#include <reg52.h>

sbit LED = P2^0; // Bit-addressable definition for Port 2 Pin 0

void delay_ms(unsigned int count) {
  unsigned int i, j;
  for (i = 0; i < count; i++) {
    for (j = 0; j < 112; j++); // Nested loop consumes machine cycles
  }
}

void main() {
  LED = 0; // Initialize LED
  while (1) {
    LED = 1;        // Logic HIGH: LED ON
    delay_ms(500);  // 500ms delay
    LED = 0;        // Logic LOW: LED OFF
    delay_ms(500);  // 500ms delay
  }
}`
    },
    expectedOutput: `[8051 System Clock: 11.0592 MHz]
P2.0 State: HIGH (LED ON, 500ms)
P2.0 State: LOW  (LED OFF, 500ms)
P2.0 State: HIGH (LED ON, 500ms)`,
    observations: [
      'Each instruction cycle required 12 oscillator clock pulses.',
      'Port 2 has internal pull-up transistors, eliminating need for external pull-up resistors unlike Port 0.'
    ],
    applications: ['Foundational university embedded computer architecture', 'Industrial relay sequencer panels'],
    conclusion: 'The 8051 Harvard CISC architecture and bit-addressable SFR registers were successfully verified through register-level port manipulation.',
    simulationConfig: {
      stimulusName: 'Oscillator Frequency (MHz)',
      stimulusMin: 1,
      stimulusMax: 24,
      stimulusStep: 1,
      stimulusUnit: 'MHz',
      defaultStimulus: 12,
      computeReading: (val: number) => {
        const cycleTimeUs = 12 / val;
        return {
          rawAdc: val,
          processedValue: `${val} MHz (Cycle: ${cycleTimeUs.toFixed(2)} µs)`,
          status: 'Normal',
          logMessage: `[8051 Core] Clock: ${val} MHz | Machine Cycle: ${cycleTimeUs.toFixed(2)} µs | P2.0 Blinking at 1 Hz`,
          pinVoltage: 5.0,
          indicatorActive: true
        };
      }
    }
  },
  {
    id: 'exp-7',
    experimentNumber: 7,
    title: 'Microchip PIC16 + Push-Button Controlled LED',
    mcuId: 'pic16f877a',
    boardName: 'PIC16F877A Development Board',
    sensorId: 'tactile-switch',
    sensorName: 'Push-Button Tactile Switch',
    difficulty: 'Beginner',
    aim: 'To interface an external momentary push-button with the PIC16F877A microcontroller, configuring TRIS and PORT directional registers and implementing software switch debouncing.',
    requiredComponents: [
      'Microchip PIC16F877A microcontroller (DIP-40)',
      '20 MHz Crystal oscillator + two 22pF capacitors',
      'Tactile momentary push-button',
      '10kΩ pull-up resistor',
      'LED + 330Ω current limiting resistor',
      'PICkit 3 / 4 In-Circuit Debugger'
    ],
    circuitDiagramText: `+-----------------------+             +--------------------+
|     PIC16F877A        |             |   Switch & LED     |
|                       |             |                    |
|  Pin 33 (RB0 / INT)   |<------------| Push Button to GND |
|                       |             | [10kΩ to +5V]      |
|  Pin 19 (RD0)         |----[330Ω]---> LED Anode (+)      |
|  Pin 11 & 32 (VDD)    |------------> +5V DC Supply       |
|  Pin 12 & 31 (VSS)    |------------> 0V Ground           |
+-----------------------+`,
    pinConnections: [
      { sensorPin: 'Switch Output', mcuPin: 'RB0 (Pin 33)', wireColor: '#F59E0B', functionDesc: 'Active-Low Push Button Input' },
      { sensorPin: 'LED Anode via 330Ω', mcuPin: 'RD0 (Pin 19)', wireColor: '#10B981', functionDesc: 'Output LED Driver' }
    ],
    workingPrinciple: 'TRISB controls data direction for Port B (1 = Input, 0 = Output). TRISB0 is set to 1. When the button is unpressed, the 10kΩ resistor pulls RB0 HIGH. Pressing the button grounds RB0 (LOW). The PIC16 reads the pin state, performs a 20ms debounce delay to ignore mechanical contact vibration, and toggles RD0 to turn the LED ON or OFF.',
    stepByStepProcedure: [
      'Power PIC16F877A VDD pins (11, 32) with 5V, VSS pins (12, 31) with GND.',
      'Connect 20MHz crystal across OSC1 (Pin 13) and OSC2 (Pin 14).',
      'Wire the push button from RB0 to GND with a 10kΩ pull-up to VDD.',
      'Wire the LED from RD0 to GND with a 330Ω resistor.',
      'Compile with MPLAB XC8 compiler and program PIC using PICkit.'
    ],
    sourceCode: {
      pic: `// MPLAB XC8 C Code for PIC16F877A
#include <xc.h>
#define _XTAL_FREQ 20000000

#pragma config FOSC = HS, WDTE = OFF, PWRTE = ON, BOREN = ON, LVP = OFF

void main(void) {
  TRISB0 = 1; // Set RB0 as INPUT (Button)
  TRISD0 = 0; // Set RD0 as OUTPUT (LED)
  RD0 = 0;    // Turn LED off initially

  while (1) {
    if (RB0 == 0) { // Active LOW button press detected
      __delay_ms(20); // 20ms mechanical debounce
      if (RB0 == 0) {
        RD0 = !RD0; // Toggle LED state
        while (RB0 == 0); // Wait for button release
        __delay_ms(20);   // Release debounce
      }
    }
  }
}`
    },
    expectedOutput: `[PIC16F877A Running @ 20MHz]
Button State: Released (RB0 = 1, RD0 = 0)
Button Pressed! (RB0 = 0 -> Debounced -> RD0 Toggled: HIGH)
Button Released (RB0 = 1, RD0 stays HIGH)`,
    observations: [
      'Mechanical contact bounce persisted for ~8 ms upon closure.',
      'The 20 ms software debounce loop reliably eliminated multi-toggle glitches.'
    ],
    applications: ['Automotive dashboard pushbuttons', 'Industrial machinery emergency pause triggers'],
    conclusion: 'Directional register manipulation and debounced tactile input processing were successfully demonstrated on the PIC16 architecture.',
    simulationConfig: {
      stimulusName: 'Push Button State',
      stimulusMin: 0,
      stimulusMax: 1,
      stimulusStep: 1,
      stimulusUnit: 'Binary',
      defaultStimulus: 0,
      computeReading: (val: number) => {
        const isPressed = val === 1;
        return {
          rawAdc: isPressed ? 0 : 1,
          processedValue: isPressed ? 'BUTTON PRESSED (Active Low 0V)' : 'RELEASED (Pull-up 5V)',
          status: isPressed ? 'Triggered' : 'Normal',
          logMessage: `[PIC16 RB0] ${isPressed ? 'Switch Closed -> Debounced -> RD0 LED Toggled' : 'Switch Open (5V Pull-up)'}`,
          pinVoltage: isPressed ? 0.0 : 5.0,
          indicatorActive: isPressed
        };
      }
    }
  },
  {
    id: 'exp-8',
    experimentNumber: 8,
    title: 'TI MSP430 Low-Power Temperature Monitoring in LPM3',
    mcuId: 'msp430g2553',
    boardName: 'MSP430 LaunchPad (MSP-EXP430G2)',
    sensorId: 'internal-temp',
    sensorName: 'MSP430 Internal Temperature Sensor',
    difficulty: 'Advanced',
    aim: 'To utilize the MSP430 integrated analog temperature sensor and 10-bit ADC10 to log ambient temperature, putting the CPU into ultra-low-power mode LPM3 (0.5 µA) between timed watchdog sampling intervals.',
    requiredComponents: [
      'TI MSP-EXP430G2 LaunchPad board',
      'MSP430G2553 16-bit RISC microcontroller',
      '32.768 kHz watch crystal mounted on LFXT1',
      'Onboard Red LED (P1.0) and Green LED (P1.6)'
    ],
    circuitDiagramText: `+-------------------------------------+
|        MSP430G2553 LaunchPad        |
|                                     |
|  Internal ADC10 Channel 10 (Temp)   | (On-Chip Silicon Sensor)
|  Internal 1.5V Reference Generator  |
|  Timer_A driven by 32.768kHz ACLK   |
|  P1.0 (Red LED) -> Overtemp Alert   |
|  Current Draw in LPM3: < 0.5 µA     |
+-------------------------------------+`,
    pinConnections: [
      { sensorPin: 'Internal Temp Sensor', mcuPin: 'ADC10 Channel 10', wireColor: '#A78BFA', functionDesc: 'On-chip calibrated temperature diode' },
      { sensorPin: 'Alert LED', mcuPin: 'P1.0 (Red LED)', wireColor: '#EF4444', functionDesc: 'Overtemperature Threshold Indicator' }
    ],
    workingPrinciple: 'The MSP430 contains an internal temperature diode whose forward voltage varies linearly with temperature (~3.55 mV/°C). The 10-bit ADC10 samples this channel using the on-chip 1.5V reference. After sampling, the CPU enters Low Power Mode 3 (LPM3), disabling the master clock (MCLK) and sub-main clock (SMCLK) while keeping the 32.768 kHz auxiliary clock (ACLK) running to draw only 0.5 µA.',
    stepByStepProcedure: [
      'Insert MSP430G2553 into the LaunchPad 20-pin DIP socket.',
      'Ensure the 32.768 kHz cylindrical crystal is soldered across XIN and XOUT.',
      'Configure ADC10 for internal temperature channel (INCH_10) and internal 1.5V reference (SREF_1).',
      'Set Timer_A to fire every 5 seconds from ACLK to wake the CPU from LPM3.',
      'Flash code via the LaunchPad onboard eZ430 USB emulator.'
    ],
    sourceCode: {
      msp430: `// TI Code Composer Studio (CCS) C Code for MSP430G2553
#include <msp430g2553.h>

long tempRaw;
float tempC;

void main(void) {
  WDTCTL = WDTPW + WDTHOLD; // Stop watchdog timer
  P1DIR |= BIT0;            // P1.0 (Red LED) as output
  P1OUT &= ~BIT0;

  // Configure ADC10: Sample and Hold time 64 cycles, Enable ADC & Temp Sensor
  ADC10CTL1 = INCH_10 + ADC10DIV_3;
  ADC10CTL0 = SREF_1 + ADC10SHT_3 + REFON + ADC10ON + ADC10IE;

  // Configure Timer_A to wake up from LPM3 every 2 seconds
  BCSCTL3 |= LFXT1S_0; // 32.768kHz crystal
  TACCR0 = 32768 * 2;  // 2 seconds
  TACTL = TASSEL_1 + MC_1; // ACLK, Up-mode
  TACCTL0 = CCIE;      // Enable Timer interrupt

  while (1) {
    __bis_SR_register(LPM3_bits + GIE); // Sleep in LPM3 (0.5 uA)

    // CPU Wakes here upon Timer_A interrupt
    ADC10CTL0 |= ENC + ADC10SC; // Start conversion
    __bis_SR_register(CPUOFF + GIE); // Sleep while ADC completes

    // Formula from TI SLAU144: Temp = ((raw * 1.5 / 1023) - 0.986) / 0.00355
    tempC = ((tempRaw - 673) * 423) / 1024.0;

    if (tempC > 30.0) {
      P1OUT |= BIT0; // Alert LED ON
    } else {
      P1OUT &= ~BIT0;
    }
  }
}

#pragma vector=ADC10_VECTOR
__interrupt void ADC10_ISR(void) {
  tempRaw = ADC10MEM;
  __bic_SR_register_on_exit(CPUOFF); // Wake CPU to calculate
}

#pragma vector=TIMER0_A0_VECTOR
__interrupt void Timer_A (void) {
  __bic_SR_register_on_exit(LPM3_bits); // Wake CPU from LPM3
}`
    },
    expectedOutput: `[MSP430 Ultra-Low-Power Monitor Active]
[WAKEUP Timer_A] ADC10 Sample: 742 -> Ambient Temp: 28.4 °C | LPM3 Sleep
[WAKEUP Timer_A] ADC10 Sample: 744 -> Ambient Temp: 29.1 °C | LPM3 Sleep
[WAKEUP Timer_A] ADC10 Sample: 760 -> Ambient Temp: 35.8 °C | OVERTEMP ALERT (LED ON)`,
    observations: [
      'Average sleep current measured under 0.6 µA on precision microammeter.',
      'Active conversion cycle took less than 150 µs before immediately reverting to sleep.',
      'A coin cell CR2032 (220 mAh) will power this system continuously for over 8 years.'
    ],
    applications: ['Smart agricultural soil probes', 'Cold-chain vaccine transport dataloggers', 'Smart building HVAC sensors'],
    conclusion: 'The experiment proved the industry-leading energy efficiency of the MSP430 in LPM3 mode using event-driven timer wakeups.',
    simulationConfig: {
      stimulusName: 'Silicon Die Temperature (°C)',
      stimulusMin: 15,
      stimulusMax: 65,
      stimulusStep: 1,
      stimulusUnit: '°C',
      defaultStimulus: 27,
      computeReading: (val: number) => {
        const raw = Math.round(673 + (val * 1024) / 423);
        const isHot = val > 30;
        return {
          rawAdc: raw,
          processedValue: `${val.toFixed(1)} °C (LPM3 Sleep 0.5 µA)`,
          status: isHot ? 'Alert' : 'Normal',
          logMessage: `[MSP430 LPM3] Temp: ${val.toFixed(1)} °C | ADC10: ${raw} | Standby: 0.5 µA | Status: ${isHot ? 'OVERTEMP' : 'Nominal'}`,
          pinVoltage: 1.5,
          indicatorActive: isHot
        };
      }
    }
  }
];
