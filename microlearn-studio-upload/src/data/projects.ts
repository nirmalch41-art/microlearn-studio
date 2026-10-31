import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'proj-auto-streetlight',
    title: 'Smart Highway Automatic Streetlight with Traffic Dimming',
    difficulty: 'Beginner',
    category: 'Energy & Automation',
    targetMcu: 'Arduino Uno (ATmega328P)',
    abstract: 'An automated municipal streetlight system that continuously senses daylight using an LDR to switch on at twilight, while using ultrasonic proximity sensors to dim lights to 20% PWM brightness when the street is empty and brighten to 100% when vehicles or pedestrians approach.',
    problemStatement: 'Conventional streetlights remain illuminated at 100% power throughout the entire night regardless of traffic, consuming over 35% of municipal electricity budgets and increasing carbon emissions.',
    objectives: [
      'Eliminate manual streetlight switching errors using automated ambient light detection.',
      'Cut overnight municipal lighting power consumption by 60% using traffic-adaptive PWM dimming.',
      'Implement software hysteresis to eliminate lamp flickering during dawn and dusk transitions.'
    ],
    blockDiagramSteps: [
      'Ambient Light (LDR) & Vehicle Motion (Ultrasonic Sensor)',
      'Signal Conditioning & ADC Sampling (ATmega328P)',
      'Threshold Decision Matrix & Software Hysteresis Filter',
      'PWM Duty Cycle Modulation (Timer 0 / Timer 2)',
      'MOSFET Driver Stage & High-Power LED Lamp Array'
    ],
    components: [
      { name: 'Arduino Uno R3', quantity: 1, note: 'Main Controller (ATmega328P)' },
      { name: 'Cadmium Sulfide LDR', quantity: 1, note: 'Ambient Light Sensor' },
      { name: 'HC-SR04 Ultrasonic Sensor', quantity: 1, note: 'Vehicle Proximity Detector' },
      { name: 'IRLZ44N Logic-Level N-Channel MOSFET', quantity: 1, note: 'PWM LED Lamp Switch' },
      { name: '10kΩ Resistor', quantity: 1, note: 'LDR Voltage Divider Pull-down' },
      { name: '12V High-Power LED Streetlight Module', quantity: 1, note: 'Load Lamp' }
    ],
    pinConnections: [
      { module: 'LDR Sensor Divider', modulePin: 'Signal Out', mcuPin: 'A0', notes: 'Analog input for daylight level' },
      { module: 'HC-SR04 Ultrasonic', modulePin: 'TRIG', mcuPin: 'D7', notes: 'Digital Trigger Output' },
      { module: 'HC-SR04 Ultrasonic', modulePin: 'ECHO', mcuPin: 'D8', notes: 'Echo Input Pulse' },
      { module: 'MOSFET Driver', modulePin: 'Gate', mcuPin: 'D6 (~)', notes: 'PWM dimming control pin' }
    ],
    circuitExplanation: 'The LDR and 10kΩ resistor form a voltage divider connected to A0. The HC-SR04 senses approaching vehicles within 50 cm. The MOSFET gate is driven by PWM pin D6 with a 100Ω gate resistor and 10kΩ pull-down to prevent gate float during boot.',
    workingExplanation: 'During the day (ADC > 400), PWM duty cycle is 0% (OFF). At sunset (ADC < 350), the system enters night mode. If no vehicles are within range, PWM duty cycle is 51 (20% power saving mode). When a vehicle is detected within 30 meters, PWM ramps smoothly to 255 (100% full illumination) for 15 seconds.',
    sourceCode: `const int ldrPin = A0;
const int trigPin = 7;
const int echoPin = 8;
const int mosfetPin = 6; // PWM pin

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(mosfetPin, OUTPUT);
}

void loop() {
  int ldrVal = analogRead(ldrPin);

  if (ldrVal > 400) {
    // Daytime: Lamp completely OFF
    analogWrite(mosfetPin, 0);
  } else {
    // Nighttime: Check traffic presence
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    long duration = pulseIn(echoPin, HIGH, 25000);
    float dist = duration * 0.0343 / 2.0;

    if (dist > 0 && dist < 100) {
      // Vehicle Present: 100% Brightness
      analogWrite(mosfetPin, 255);
      Serial.println("Traffic Detected -> 100% Full Illumination");
    } else {
      // Idle Empty Street: 20% Economy Brightness
      analogWrite(mosfetPin, 51);
      Serial.println("Empty Road -> 20% Eco Dimming");
    }
  }
  delay(1000);
}`,
    simulationNote: 'Virtual Lab Experiment 3 demonstrates the LDR response curve and threshold switching.',
    realTimeApplication: 'Smart cities, highway expressway lighting networks, university campuses.',
    advantages: [
      'Saves up to 60% grid electrical energy compared to static fixtures',
      'Extends the operating lifespan of LED lamp modules',
      'Smooth PWM brightness transitions eliminate jarring flashes'
    ],
    limitations: [
      'Heavy rain or thick fog can produce false ultrasonic echo triggers',
      'Requires clean optical lens over LDR to prevent soot buildup'
    ],
    futureImprovements: [
      'Upgrade to radar microwave sensors (RCWL-0516) for all-weather operation',
      'Integrate LoRaWAN wireless mesh to report burnt-out lamp telemetry to municipal dispatch'
    ]
  },
  {
    id: 'proj-can-battery-monitor',
    title: 'CAN-Bus Electric Vehicle (EV) Battery Management System (BMS)',
    difficulty: 'Advanced',
    category: 'Automotive & Clean Energy',
    targetMcu: 'ESP32 (TWAI) / STM32F103 (bxCAN)',
    abstract: 'An automotive ISO 11898-1 CAN-bus telemetry module that interfaces an EV Lithium-ion battery pack with an SN65HVD230 transceiver, capturing individual cell voltages, pack temperature, state-of-charge (SoC), and high-side shunt current, streaming ISO-TP diagnostic frames at 500 kbps.',
    problemStatement: 'Lithium battery packs in electric vehicles risk thermal runaway, dendrite formation, and catastrophic fire if cell voltages diverge or charging currents exceed safe limits without high-speed deterministic bus communications.',
    objectives: [
      'Read 16 series Lithium Iron Phosphate (LiFePO4) cell voltages with ±2mV precision.',
      'Broadcast standard automotive CAN 2.0B frames at 500 kbps to the vehicle Powertrain Control Unit (PCU).',
      'Trigger hardware contactor relay disconnect within 10 milliseconds of overvoltage or overtemperature faults.'
    ],
    blockDiagramSteps: [
      'Li-Ion Battery Cell Array & Precision Analog Front-End (AFE)',
      'High-Side Current Shunt & Multi-Point NTC Temperature Probes',
      'Microcontroller (ESP32 TWAI / STM32 CAN Controller)',
      'Automotive CAN Transceiver (SN65HVD230 / TJA1050)',
      'Vehicle High-Speed Differential Bus (CAN_H and CAN_L with 120Ω Terminations)'
    ],
    components: [
      { name: 'ESP32 DevKit V1', quantity: 1, note: 'TWAI CAN Controller' },
      { name: 'SN65HVD230 CAN Transceiver', quantity: 1, note: '3.3V CAN Physical Layer' },
      { name: 'INA226 / INA219 Current Shunt Sensor', quantity: 1, note: 'High-Side Pack Ammeter' },
      { name: '120Ω Terminal Resistors', quantity: 2, note: 'Bus Transmission Line Termination' },
      { name: 'Automotive Contactor Relay', quantity: 1, note: 'High-Voltage Disconnect' }
    ],
    pinConnections: [
      { module: 'SN65HVD230', modulePin: 'TXD', mcuPin: 'GPIO 5', notes: 'CAN Transmit line (TWAI TX)' },
      { module: 'SN65HVD230', modulePin: 'RXD', mcuPin: 'GPIO 4', notes: 'CAN Receive line (TWAI RX)' },
      { module: 'Contactor Driver', modulePin: 'Relay Gate', mcuPin: 'GPIO 23', notes: 'Emergency Pack Disconnect Relay' }
    ],
    circuitExplanation: 'The ESP32 built-in Two-Wire Automotive Interface (TWAI) connects to the SN65HVD230 transceiver TXD and RXD pins. The transceiver converts single-ended 3.3V logic into differential CAN_H and CAN_L signals. Each end of the twisted-pair cable terminates with a 120Ω resistor to prevent signal reflection.',
    workingExplanation: 'The BMS controller samples pack voltage and current at 100 Hz. Every 50 ms, it packages telemetry into standard 8-byte CAN messages (CAN ID 0x355 for State of Charge and 0x356 for Pack Voltage/Current). If any cell exceeds 3.65V or falls below 2.50V, a high-priority CAN alarm frame (ID 0x010) is transmitted and the main pack contactor opens.',
    sourceCode: `#include "driver/twai.h"

#define TX_PIN GPIO_NUM_5
#define RX_PIN GPIO_NUM_4

void setup() {
  Serial.begin(115200);

  // Configure TWAI (CAN) Controller for 500 kbps
  twai_general_config_t g_config = TWAI_GENERAL_CONFIG_DEFAULT(TX_PIN, RX_PIN, TWAI_MODE_NORMAL);
  twai_timing_config_t t_config = TWAI_TIMING_CONFIG_500KBITS();
  twai_filter_config_t f_config = TWAI_FILTER_CONFIG_ACCEPT_ALL();

  if (twai_driver_install(&g_config, &t_config, &f_config) == ESP_OK) {
    Serial.println("TWAI CAN Driver Installed");
  }
  if (twai_start() == ESP_OK) {
    Serial.println("CAN Bus Online at 500 kbps");
  }
}

void loop() {
  twai_message_t message;
  message.identifier = 0x355; // BMS SOC Frame ID
  message.extd = 0;           // Standard 11-bit ID
  message.data_length_code = 8;
  
  // Pack 52.8V (5280) and 45.0A (450)
  uint16_t packVolt = 5280;
  uint16_t packCurrent = 450;
  uint8_t soc = 88; // 88%

  message.data[0] = (packVolt >> 8) & 0xFF;
  message.data[1] = packVolt & 0xFF;
  message.data[2] = (packCurrent >> 8) & 0xFF;
  message.data[3] = packCurrent & 0xFF;
  message.data[4] = soc;
  message.data[5] = 28; // Pack Temp 28°C
  message.data[6] = 0x00; // Fault flags (None)
  message.data[7] = 0x00;

  if (twai_transmit(&message, pdMS_TO_TICKS(50)) == ESP_OK) {
    Serial.println("CAN BMS Frame Broadcasted Successfully");
  }
  delay(100);
}`,
    realTimeApplication: 'Electric cars (Tesla, Nissan Leaf), electric motorcycles, grid-scale battery energy storage systems (BESS).',
    advantages: [
      'High noise immunity due to differential voltage transmission on CAN_H / CAN_L',
      'Deterministic hardware arbitration ensures emergency alarm frames never lose bus access',
      'Standardized automotive protocol connects directly to vehicle electronic control units'
    ],
    limitations: [
      'Requires strict impedance matching and physical 120Ω bus line terminations',
      'Maximum message payload is 8 bytes per frame in standard CAN 2.0B'
    ],
    futureImprovements: [
      'Upgrade to CAN-FD (Flexible Data-Rate) for 5 Mbps throughput and 64-byte payloads',
      'Implement ISO 14229 Unified Diagnostic Services (UDS) for vehicle scanner integration'
    ]
  },
  {
    id: 'proj-smart-irrigation',
    title: 'Smart Solar-Powered Precision Irrigation with Soil Moisture Profiling',
    difficulty: 'Intermediate',
    category: 'Smart Agriculture',
    targetMcu: 'Raspberry Pi Pico (RP2040) / ESP32',
    abstract: 'An automated solar-powered irrigation system that samples capacitive soil moisture sensors across multiple root depths, correlates moisture with ambient temperature and humidity, and drives a 12V submersible water pump via relay only when root moisture drops below field capacity.',
    problemStatement: 'Flood irrigation wastes up to 50% of agricultural fresh water and leads to soil mineral salinization and root rot caused by overwatering.',
    objectives: [
      'Accurately monitor volumetric water content (VWC) using corrosion-resistant capacitive probes.',
      'Actuate solenoid valves and irrigation pumps via pulse-width watering algorithms.',
      'Operate completely off-grid using a 10W solar panel and 18650 Li-ion battery pack.'
    ],
    blockDiagramSteps: [
      'Capacitive Soil Moisture Probes & Ambient Temp Sensor',
      'Low-Power Microcontroller (RP2040 / ESP32 deep sleep)',
      'Agronomic Soil Water Depletion Algorithm',
      'Solid-State Relay (SSR) / MOSFET Pump Driver',
      'Drip Irrigation Solenoid Valves & Emitters'
    ],
    components: [
      { name: 'Raspberry Pi Pico', quantity: 1, note: 'Central Logic Unit' },
      { name: 'Capacitive Soil Moisture Sensor v1.2', quantity: 3, note: 'Corrosion-Proof Probes' },
      { name: '12V 5W Drip Irrigation Water Pump', quantity: 1, note: 'Fluid Delivery' },
      { name: '5V Single-Channel Relay Module', quantity: 1, note: 'Pump Isolation Switch' },
      { name: '16x2 I2C Character LCD', quantity: 1, note: 'Field Status Display' }
    ],
    pinConnections: [
      { module: 'Capacitive Probe 1', modulePin: 'AOUT', mcuPin: 'GP26 (ADC0)', notes: 'Surface Root Moisture' },
      { module: 'Capacitive Probe 2', modulePin: 'AOUT', mcuPin: 'GP27 (ADC1)', notes: 'Deep Root Moisture' },
      { module: 'Relay Module', modulePin: 'IN', mcuPin: 'GP16', notes: 'Pump Relay Drive' },
      { module: 'I2C LCD', modulePin: 'SDA / SCL', mcuPin: 'GP4 / GP5', notes: 'Field Display' }
    ],
    circuitExplanation: 'Capacitive moisture sensors output 1.2V in saturated water and 3.0V in bone-dry soil. The ADC readings are sampled every 15 minutes. The Pico drives the relay optocoupler input via GP16 to energize the 12V pump.',
    workingExplanation: 'The microcontroller checks whether soil moisture falls below 35% VWC. If low moisture is detected and ambient temperature is under 30°C (preventing midday evaporation loss), the pump is activated for 45 seconds to deliver targeted drip irrigation.',
    sourceCode: `const int soilPin = 26; // ADC0
const int pumpRelayPin = 16;
const int DRY_THRESHOLD = 2800; // 12-bit ADC threshold

void setup() {
  Serial.begin(115200);
  pinMode(pumpRelayPin, OUTPUT);
  digitalWrite(pumpRelayPin, LOW); // Pump OFF
}

void loop() {
  int moistureRaw = analogRead(soilPin);
  Serial.printf("Soil Moisture ADC: %d\\r\\n", moistureRaw);

  if (moistureRaw > DRY_THRESHOLD) {
    Serial.println("Soil Dry! Starting Drip Irrigation for 10 seconds...");
    digitalWrite(pumpRelayPin, HIGH); // Pump ON
    delay(10000);
    digitalWrite(pumpRelayPin, LOW);  // Pump OFF
    Serial.println("Irrigation complete. Waiting for soil absorption.");
  }
  delay(15000);
}`,
    realTimeApplication: 'Greenhouses, vineyards, automated residential lawn sprinklers, commercial vertical farms.',
    advantages: [
      'Capacitive design eliminates probe copper corrosion seen in cheap resistive forks',
      'Conserves 40-50% water while maintaining optimal plant root hydration',
      'Operates autonomously without human supervision'
    ],
    limitations: [
      'Soil salinity and fertilizer mineral concentrations require periodic calibration',
      'Water pump suction filter requires routine cleaning against silt'
    ],
    futureImprovements: [
      'Incorporate weather forecast API over Wi-Fi to withhold irrigation if rain is predicted',
      'Add NPK chemical macronutrient colorimetric spectroscopy sensors'
    ]
  },
  {
    id: 'proj-predictive-maintenance',
    title: 'Industrial Motor Bearing Vibration & Predictive Maintenance Edge AI',
    difficulty: 'Advanced',
    category: 'Industrial IoT & TinyML',
    targetMcu: 'ESP32-S3 (Vector AI Instructions) / STM32F446RE',
    abstract: 'An industrial TinyML edge device that clamps onto an induction motor casing, continuously sampling a high-bandwidth 3-axis accelerometer at 4 kHz, executing on-device Fast Fourier Transform (FFT) vibration spectral analysis, and identifying bearing outer raceway fluting faults before catastrophic motor seizure.',
    problemStatement: 'Unplanned industrial motor bearing failures cause factory assembly line shutdowns costing hundreds of thousands of dollars per hour in automotive and manufacturing plants.',
    objectives: [
      'Sample 3-axis high-g acceleration at 4,000 samples per second via SPI DMA.',
      'Compute real-time 1024-point Fast Fourier Transforms (FFT) on vibration waveforms.',
      'Detect characteristic Ball Pass Frequency Outer Race (BPFO) vibration peaks indicating micro-cracks.'
    ],
    blockDiagramSteps: [
      'Industrial Motor Chassis & Piezo / MEMS Accelerometer',
      'High-Speed SPI Hardware Bus with DMA Transfer',
      'DSP Vector Processing & Hann Windowed 1024-Point FFT',
      'Peak Spectral Energy Band Classifier (ISO 10816-3)',
      'Modbus TCP / RS485 Industrial Fieldbus Telemetry'
    ],
    components: [
      { name: 'ESP32-S3 DevKit', quantity: 1, note: 'Dual-core 240MHz with Vector Acceleration' },
      { name: 'ADXL345 / ADXL355 High-G Accelerometer', quantity: 1, note: 'SPI Vibration Sensor' },
      { name: 'Magnetic Stud Mount Base', quantity: 1, note: 'Direct Chassis Mechanical Coupling' },
      { name: 'RS-485 Industrial Transceiver (MAX485)', quantity: 1, note: 'Modbus Telemetry Bus' }
    ],
    pinConnections: [
      { module: 'ADXL345', modulePin: 'CS', mcuPin: 'GPIO 10', notes: 'SPI Chip Select' },
      { module: 'ADXL345', modulePin: 'SCLK', mcuPin: 'GPIO 12', notes: 'SPI Clock (10 MHz)' },
      { module: 'ADXL345', modulePin: 'MOSI / MISO', mcuPin: 'GPIO 11 / 13', notes: 'SPI Master Data' },
      { module: 'MAX485', modulePin: 'RO / DI', mcuPin: 'GPIO 17 / 18', notes: 'RS-485 Modbus Serial' }
    ],
    circuitExplanation: 'The sensor is clamped firmly to the motor bearing housing with a magnetic stud. High-speed SPI transfers 3-axis acceleration samples to an internal circular DMA buffer in the ESP32-S3 without CPU intervention.',
    workingExplanation: 'Every 2 seconds, 1024 samples are windowed and converted into frequency domain bins. Healthy motors display a clean 50/60 Hz rotational peak. Bearing degradation manifests as characteristic sidebands at 120-250 Hz. The on-device TinyML model flags early warning stages weeks before failure.',
    sourceCode: `#include <arduinoFFT.h>

#define SAMPLES 1024
#define SAMPLING_FREQ 4000 // 4 kHz

double vReal[SAMPLES];
double vImag[SAMPLES];
ArduinoFFT<double> FFT = ArduinoFFT<double>(vReal, vImag, SAMPLES, SAMPLING_FREQ);

void setup() {
  Serial.begin(115200);
  Serial.println("ESP32-S3 Motor Vibration FFT Engine Active");
}

void loop() {
  // Simulate 1024 acceleration samples from SPI DMA buffer
  for (int i = 0; i < SAMPLES; i++) {
    // 60Hz fundamental rotation + 245Hz bearing fluting harmonic
    vReal[i] = sin(2 * PI * 60 * i / SAMPLING_FREQ) + 0.4 * sin(2 * PI * 245 * i / SAMPLING_FREQ);
    vImag[i] = 0.0;
  }

  // Execute FFT windowing and calculation
  FFT.windowing(FFTWindow::Hamming, FFTDirection::Forward);
  FFT.compute(FFTDirection::Forward);
  FFT.complexToMagnitude();

  double peakFreq = FFT.majorPeak();
  Serial.printf("[FFT RESULT] Dominant Vibration Frequency: %.1f Hz\\r\\n", peakFreq);
  
  if (peakFreq > 200.0) {
    Serial.println("[WARNING] Anomaly Detected: High-frequency bearing fault signature!");
  }
  delay(3000);
}`,
    realTimeApplication: 'Water pumping stations, wind turbine gearboxes, conveyor systems, factory HVAC air compressors.',
    advantages: [
      'Allows repair scheduling during planned maintenance windows, avoiding catastrophic factory shutdowns',
      'On-device edge inference avoids transmitting gigabytes of raw vibration audio to the cloud',
      'Complies with ISO 10816 vibration severity standards'
    ],
    limitations: [
      'Requires rigid mechanical sensor mounting; loose tape or magnets dampen high frequencies',
      'Motor baseline vibration must be profiled when bearings are brand new'
    ],
    futureImprovements: [
      'Deploy an autoencoder neural network in ESP-DL to detect novel anomaly patterns without manual threshold tuning'
    ]
  }
];
