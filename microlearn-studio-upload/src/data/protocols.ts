import { Protocol } from '../types';

export const PROTOCOLS: Protocol[] = [
  {
    id: 'uart',
    name: 'UART / USART',
    fullName: 'Universal Asynchronous Receiver-Transmitter',
    category: 'Serial',
    definition: 'An asynchronous, full-duplex, point-to-point serial communication protocol where data is transmitted without a shared clock signal. Instead, both sender and receiver must be configured to identical predefined baud rates (e.g. 9600, 115200 bps).',
    workingPrinciple: 'In UART, the line idles at logic HIGH (1). When a transmission starts, the transmitter pulls the line LOW for one bit period to signal a START bit. Following this, 5 to 9 data bits (typically 8 bits, LSB first) are shifted out sequentially. An optional PARITY bit can follow for error detection, terminated by 1 or 2 STOP bits (logic HIGH). Receiver hardware samples each bit at the middle of its calculated period using an oversampling clock (typically 16x baud rate).',
    signalPins: [
      { pin: 'TX (Transmit)', description: 'Data output pin from transmitter. Must connect to receiver RX.', direction: 'Output' },
      { pin: 'RX (Receive)', description: 'Data input pin into receiver. Must connect to transmitter TX.', direction: 'Input' },
      { pin: 'GND (Ground)', description: 'Crucial common reference voltage between both devices.', direction: 'Bidirectional' },
      { pin: 'RTS / CTS (Optional)', description: 'Hardware flow control lines to prevent buffer overflow.', direction: 'Handshake' }
    ],
    timingExplanation: 'IDLE (HIGH) -> START BIT (LOW for 1/baud s) -> D0 -> D1 -> D2 -> D3 -> D4 -> D5 -> D6 -> D7 -> STOP BIT (HIGH for 1-2 bits). At 115200 baud, each bit duration is exactly 8.68 microseconds.',
    maxSpeed: 'Typically up to 3 - 5 Mbps depending on MCU and cable length (standard rates: 9600, 115200 bps).',
    maxDistance: 'Approximately 15 meters at 9600 baud (extended to 1200 meters using RS-485 differential transceivers).',
    practicalExample: 'Connecting an ESP32 or Arduino to a PC over a USB-to-UART bridge (CP2102 or CH340) for firmware flashing and Serial Monitor debugging; interfacing a NEO-6M GPS receiver or Bluetooth HC-05 module.',
    codeSnippet: `// Hardware Serial Initialization in Arduino / ESP32
void setup() {
  // Configures UART0 for 115200 baud, 8 data bits, no parity, 1 stop bit (8N1)
  Serial.begin(115200);
  
  // On ESP32, you can remap UART2 to custom pins:
  // Serial2.begin(9600, SERIAL_8N1, 16 /* RX */, 17 /* TX */);
}

void loop() {
  if (Serial.available() > 0) {
    char receivedChar = Serial.read();
    Serial.print("Echo: ");
    Serial.println(receivedChar);
  }
}`,
    supportedMcus: ['ESP32 (3 hardware UARTs)', 'STM32 (up to 8 USARTs/UARTs)', 'Arduino ATmega328P (1 UART)', 'RP2040 (2 UARTs)', '8051 (1 UART)', 'PIC16 (1 USART)', 'MSP430 (1 USCI UART)'],
    advantages: [
      'Simple wiring: requires only two data wires (TX, RX) and common GND',
      'No shared clock line required, reducing pin count',
      'Supported natively by virtually every microcontroller and PC terminal'
    ],
    disadvantages: [
      'Point-to-point only: cannot connect multiple slaves to a single pair of TX/RX lines without bus transceivers (RS-485)',
      'Asynchronous nature makes it vulnerable to clock drift errors if baud rates deviate by more than 2-3%',
      'Carries ~20% overhead due to start and stop framing bits'
    ]
  },
  {
    id: 'spi',
    name: 'SPI',
    fullName: 'Serial Peripheral Interface',
    category: 'Bus',
    definition: 'A synchronous, full-duplex, master-slave serial bus protocol capable of high data transfer rates (tens of megabits per second). It uses a dedicated clock line driven exclusively by the master.',
    workingPrinciple: 'SPI operates in a master-slave configuration. During every clock cycle generated on SCK by the master, the master shifts one bit out on MOSI and simultaneously shifts one bit in on MISO. The master selects a specific slave device by asserting that slave’s dedicated Chip Select (CS or SS) line LOW. Multiple slaves share the SCK, MOSI, and MISO lines, each requiring its own unique CS pin from the master.',
    signalPins: [
      { pin: 'SCK / SCLK', description: 'Serial Clock driven exclusively by Master device.', direction: 'Master -> Slave' },
      { pin: 'MOSI / COPI', description: 'Master Out Slave In (Controller Out Peripheral In). Data from master to peripheral.', direction: 'Master -> Slave' },
      { pin: 'MISO / CIPO', description: 'Master In Slave Out (Controller In Peripheral Out). Data from peripheral to master.', direction: 'Slave -> Master' },
      { pin: 'CS / SS', description: 'Chip Select / Slave Select (Active LOW to select target device).', direction: 'Master -> Slave' }
    ],
    timingExplanation: 'Governed by 4 SPI Modes determined by CPOL (Clock Polarity) and CPHA (Clock Phase). Mode 0 (CPOL=0, CPHA=0) idles clock LOW and samples data on the leading rising edge, shifting data on the trailing falling edge.',
    maxSpeed: 'Typically 10 MHz to 80 MHz (limited primarily by PCB trace parasitic capacitance and slave slew rate).',
    maxDistance: 'Short PCB distances: typically < 30 cm without active bus line buffers.',
    practicalExample: 'High-speed color TFT displays (ILI9341, ST7789), SD Cards, external Flash memory chips (W25Q64), high-bandwidth ADCs (MCP3008), and wireless RF transceivers (NRF24L01, SX1278 LoRa).',
    codeSnippet: `#include <SPI.h>

const int CS_PIN = 10;

void setup() {
  pinMode(CS_PIN, OUTPUT);
  digitalWrite(CS_PIN, HIGH); // Deselect slave
  SPI.begin();
  // Set 10 MHz, MSB First, SPI Mode 0
  SPI.beginTransaction(SPISettings(10000000, MSBFIRST, SPI_MODE0));
}

void loop() {
  digitalWrite(CS_PIN, LOW); // Select slave
  uint8_t receivedByte = SPI.transfer(0x42); // Send 0x42, simultaneously receive reply
  digitalWrite(CS_PIN, HIGH); // Release slave
  delay(100);
}`,
    supportedMcus: ['ESP32 (HSPI, VSPI up to 80MHz)', 'STM32 (SPI1, SPI2 up to 45MHz)', 'RP2040 (2 SPI peripherals)', 'ATmega328P (1 Hardware SPI)', 'PIC16 (MSSP Module)'],
    advantages: [
      'Extremely high throughput (up to 80 Mbps)',
      'True full-duplex simultaneous bidirectional communication',
      'Simple slave hardware without complex address decoders'
    ],
    disadvantages: [
      'High pin count: requires 3 shared lines + 1 dedicated CS pin per connected slave',
      'No hardware flow control or slave acknowledgement (ACK) mechanism',
      'Limited to short physical distances'
    ]
  },
  {
    id: 'i2c',
    name: 'I2C / TWI',
    fullName: 'Inter-Integrated Circuit (Two-Wire Interface)',
    category: 'Bus',
    definition: 'A synchronous, multi-master, multi-slave, half-duplex serial bus requiring only two bidirectional open-drain lines (SDA and SCL) pulled up to VCC by pull-up resistors.',
    workingPrinciple: 'Every slave device on the I2C bus possesses a unique 7-bit (or 10-bit) hardware address. The master initiates a transaction by creating a START condition (pulling SDA LOW while SCL is HIGH). It broadcasts the 7-bit slave address plus a Read/Write direction bit (0 = Write, 1 = Read). The slave with the matching address responds with an Acknowledgement bit (ACK, pulling SDA LOW) on the 9th clock pulse. Data is transferred in 8-bit bytes followed by an ACK/NACK, concluded with a STOP condition.',
    signalPins: [
      { pin: 'SDA (Serial Data)', description: 'Bidirectional open-drain data line. Requires 4.7kΩ pull-up to 3.3V/5V.', direction: 'Bidirectional' },
      { pin: 'SCL (Serial Clock)', description: 'Bidirectional open-drain clock line driven by master.', direction: 'Master -> Slave' }
    ],
    timingExplanation: 'Data on SDA can change only when SCL is LOW. When SCL is HIGH, SDA must remain stable. Any SDA transition while SCL is HIGH is interpreted as a START (falling edge) or STOP (rising edge) condition.',
    maxSpeed: 'Standard Mode: 100 kbps; Fast Mode: 400 kbps; Fast Mode Plus: 1 Mbps; High-Speed: 3.4 Mbps.',
    maxDistance: 'Short distance: typically 1 - 3 meters, limited to 400 pF total bus capacitance.',
    practicalExample: 'Interfacing environmental sensors (BME280, SHT31, MPU-6050), Real-Time Clocks (DS3231), EEPROM chips (24C256), and monochrome OLED displays (SSD1306).',
    codeSnippet: `#include <Wire.h>

void setup() {
  Wire.begin(); // Join bus as master
  Serial.begin(115200);

  // Read register 0x00 from sensor at address 0x68
  Wire.beginTransmission(0x68);
  Wire.write(0x00);
  Wire.endTransmission(false); // Send repeated start

  Wire.requestFrom(0x68, 1);
  if (Wire.available()) {
    byte data = Wire.read();
    Serial.printf("Received Register Data: 0x%02X\\r\\n", data);
  }
}`,
    supportedMcus: ['ESP32', 'STM32', 'Arduino Uno', 'RP2040', 'MSP430', 'PIC16', '8051 (bit-banged)'],
    advantages: [
      'Minimal pin usage: connect up to 127 devices using just 2 microcontroller pins',
      'Built-in ACK/NACK error detection ensures byte receipt',
      'Standardized software addressing eliminates physical slave select pins'
    ],
    disadvantages: [
      'Slower bandwidth than SPI due to open-drain pull-up RC rise times',
      'Address collisions occur if multiple identical sensors share the same fixed address',
      'Pull-up resistors are mandatory on both SDA and SCL'
    ]
  },
  {
    id: 'can',
    name: 'CAN Bus',
    fullName: 'Controller Area Network (ISO 11898)',
    category: 'Bus',
    definition: 'A robust, multi-master, message-based differential serial bus system designed for harsh electrical and automotive environments, featuring lossless bitwise arbitration and non-destructive collision resolution.',
    workingPrinciple: 'CAN nodes communicate over two differential wires: CAN_H and CAN_L. Signals are transmitted as differential voltages: a Recessive bit (logic 1) occurs when both CAN_H and CAN_L sit at ~2.5V (difference ~0V). A Dominant bit (logic 0) occurs when CAN_H is driven to 3.5V and CAN_L is pulled to 1.5V (difference = 2.0V). Because Dominant bits override Recessive bits, message IDs act as priority levels: if two nodes transmit simultaneously, the message with the lower numerical ID (more leading zeros) wins bus access without any corrupted bits.',
    signalPins: [
      { pin: 'CAN_H (High)', description: 'Differential signal line driven to 3.5V during dominant bit.', direction: 'Differential' },
      { pin: 'CAN_L (Low)', description: 'Differential signal line pulled to 1.5V during dominant bit.', direction: 'Differential' },
      { pin: 'Termination (120Ω)', description: 'Resistors placed across CAN_H and CAN_L at both physical ends of the trunk.', direction: 'Impedance Match' }
    ],
    timingExplanation: 'Bit time is divided into 4 segments: Synchronization, Propagation, Phase Segment 1, and Phase Segment 2. Standard 11-bit identifier frame format: SOF -> ID (11 bits) -> RTR -> Control (4 bits) -> Data (0-8 bytes) -> CRC (15 bits) -> ACK -> EOF.',
    maxSpeed: 'Standard CAN 2.0B: Up to 1 Mbps at 40 meters. CAN-FD (Flexible Data-rate): Up to 5-8 Mbps.',
    maxDistance: '1 Mbps up to 40 meters; 125 kbps up to 500 meters; 50 kbps up to 1,000 meters.',
    practicalExample: 'Automotive engine electronic control units (ECU), ABS brake modules, electric vehicle BMS battery telemetry, industrial automation robots, avionics.',
    codeSnippet: `// ESP32 TWAI (CAN) Message Broadcast
#include "driver/twai.h"

void send_can_frame(uint32_t id, uint8_t* payload, uint8_t len) {
  twai_message_t msg;
  msg.identifier = id;
  msg.extd = 0; // Standard 11-bit ID
  msg.data_length_code = len;
  for (int i = 0; i < len; i++) msg.data[i] = payload[i];

  twai_transmit(&msg, pdMS_TO_TICKS(20));
}`,
    supportedMcus: ['ESP32 (TWAI peripheral)', 'STM32 (bxCAN / FDCAN)', 'PIC18/PIC32', 'TI MSPM0'],
    advantages: [
      'Exceptional electrical noise and EMI immunity from differential pair signaling',
      'Non-destructive priority arbitration guarantees zero frame collision data loss',
      'Automatic hardware CRC calculation, frame acknowledgement, and faulty node isolation'
    ],
    disadvantages: [
      'Requires an external physical transceiver chip (e.g. SN65HVD230 or TJA1050)',
      'Payload limited to 8 bytes per message in classic CAN',
      'Requires 120Ω termination resistors at both cable ends'
    ]
  },
  {
    id: 'pwm',
    name: 'PWM',
    fullName: 'Pulse Width Modulation',
    category: 'Peripheral',
    definition: 'A technique of controlling analog power, motor speed, or LED brightness using a digital output pin by rapidly pulsing the signal between HIGH and LOW at a fixed carrier frequency while adjusting the percentage of time the signal stays HIGH (Duty Cycle).',
    workingPrinciple: 'Microcontroller hardware timers increment a counter register from 0 to a maximum period value (ARR / TOP). A Compare Register (CCRx) holds the threshold. When the counter is below the compare value, the output pin stays HIGH; when the counter exceeds the compare value, the pin switches to LOW. Average DC voltage = VCC * (DutyCycle / 100).',
    signalPins: [
      { pin: 'PWM Output Pin', description: 'Digital GPIO pin driven directly by internal hardware timer output compare channel.', direction: 'Output' }
    ],
    timingExplanation: 'Period (T) = 1 / Frequency. Duty Cycle (%) = (Pulse Width High / T) * 100. At 5 kHz with 50% duty cycle, the pin is HIGH for 100 µs and LOW for 100 µs.',
    maxSpeed: 'Carrier frequencies from 1 Hz up to 20 MHz (depending on timer clock prescaler and resolution).',
    maxDistance: 'Short PCB traces; long motor leads require low-pass filters or shielded cables.',
    practicalExample: 'DC motor speed regulation via H-bridge drivers (L298N), RC servo positioning (50 Hz 1-2 ms pulse), LED brightness dimming, switch-mode power supplies (SMPS), and Class-D audio amplifiers.',
    codeSnippet: `// Arduino Uno PWM Fade
void loop() {
  // Pin 9 is driven by Timer 1
  for (int duty = 0; duty <= 255; duty++) {
    analogWrite(9, duty); // Duty cycle 0 to 100%
    delay(5);
  }
}`,
    supportedMcus: ['All 7 families: ESP32 (LEDC/MCPWM), STM32 (TIMx), AVR, RP2040, PIC, MSP430, 8051'],
    advantages: [
      'Highly energy-efficient: switching transistors are either fully ON or fully OFF, dissipating minimal heat',
      'Generated entirely by hardware timers without CPU overhead',
      'Precise digital control over analog actuators'
    ],
    disadvantages: [
      'Produces high-frequency electromagnetic interference (EMI) harmonics requiring decoupling capacitors',
      'Pure analog voltage output requires an external RC low-pass filter'
    ]
  },
  {
    id: 'adc',
    name: 'ADC',
    fullName: 'Analog-to-Digital Converter',
    category: 'Hardware Core',
    definition: 'An integrated mixed-signal peripheral that converts continuous analog voltages into discrete binary integer numbers representing the ratio of the input voltage to a reference voltage.',
    workingPrinciple: 'Successive Approximation Register (SAR) ADCs use a sample-and-hold capacitor to capture an instantaneous analog voltage. An internal DAC and high-speed comparator perform a binary search, testing each bit from MSB to LSB in N clock cycles to match the sampled voltage. Digital Value = (Vin / Vref) * (2^N - 1).',
    signalPins: [
      { pin: 'Analog Input Pin (AINx)', description: 'Dedicated pin routed to internal analog multiplexer.', direction: 'Input' },
      { pin: 'VREF+ / VREF-', description: 'Precision reference voltage setting maximum conversion scale.', direction: 'Reference' }
    ],
    timingExplanation: 'Total Conversion Time = Sample & Hold Acquisition Time + (N clock cycles for N-bit SAR). On STM32F103, 1 conversion takes 1.0 µs at 14 MHz ADC clock.',
    maxSpeed: 'Typically 100 ksps to 5 MSPS on embedded microcontrollers.',
    maxDistance: 'Keep analog traces as short as possible; route away from high-speed digital clocks to prevent capacitive crosstalk.',
    practicalExample: 'Measuring temperatures from LM35/thermistors, reading light levels from LDRs, monitoring battery discharge voltages, and sampling audio microphones.',
    codeSnippet: `// Reading 12-bit ADC on ESP32
void setup() {
  Serial.begin(115200);
  analogReadResolution(12); // 0 to 4095
  analogSetAttenuation(ADC_11db); // Full scale up to ~3.1V
}

void loop() {
  int raw = analogRead(36);
  float voltage = raw * (3.3 / 4095.0);
  Serial.printf("ADC: %d | Voltage: %.2f V\\r\\n", raw, voltage);
  delay(500);
}`,
    supportedMcus: ['ESP32 (12-bit)', 'STM32 (12-bit to 16-bit)', 'AVR ATmega328P (10-bit)', 'RP2040 (12-bit)', 'MSP430 (10-bit)', 'PIC16 (10-bit)'],
    advantages: [
      'Enables digital processors to perceive the analog physical world',
      'Software calibration and digital filtering improve signal-to-noise ratio'
    ],
    disadvantages: [
      'Susceptible to ground bounce and power supply switching ripple',
      'ESP32 ADC has non-linearity at voltages < 0.1V and > 2.8V requiring polynomial calibration curves'
    ]
  },
  {
    id: 'dma',
    name: 'DMA',
    fullName: 'Direct Memory Access',
    category: 'Hardware Core',
    definition: 'A specialized hardware bus master engine that autonomously transfers streams of data directly between memory (SRAM/Flash) and peripherals (ADC, SPI, UART) without involving the central processing unit (CPU).',
    workingPrinciple: 'When an enabled peripheral (e.g. ADC or SPI receiver) has data ready, it asserts a DMA request signal. The DMA controller arbitrates for system bus access, reads the byte/word from the peripheral register, and writes it directly to a designated RAM array, incrementing memory pointers and decrementing a transfer counter. When the transfer completes, the DMA controller generates a single interrupt to notify the CPU.',
    signalPins: [
      { pin: 'Internal Bus Matrix', description: 'Internal high-speed crossbar switch (AXI/AHB) inside MCU silicon.', direction: 'Internal' }
    ],
    timingExplanation: 'Transfers occur in single bus clock cycles. CPU execution continues in parallel from instruction cache with zero interruption until the entire buffer is filled.',
    maxSpeed: 'Runs at system bus speeds up to hundreds of megabytes per second.',
    maxDistance: 'Internal on-chip silicon bus only.',
    practicalExample: 'Streaming continuous audio samples from an SD card over I2S to a speaker, updating an SPI LCD frame buffer at 60 fps, and capturing 100,000 ADC samples/sec to RAM while the CPU executes PID algorithms.',
    codeSnippet: `/* STM32 HAL ADC Multi-Channel DMA Configuration */
uint32_t adc_buffer[4];

void setup_dma(void) {
  // Starts continuous circular ADC conversions straight into SRAM array
  HAL_ADC_Start_DMA(&hadc1, (uint32_t*)adc_buffer, 4);
}

void loop() {
  // adc_buffer is automatically refreshed in background without CPU cycles!
  uint32_t ch0 = adc_buffer[0];
  uint32_t ch1 = adc_buffer[1];
}`,
    supportedMcus: ['STM32 (Advanced DMA1/DMA2)', 'RP2040 (12 DMA channels)', 'ESP32 (GDMA / SPI DMA)', 'PIC32 (8 DMA channels)'],
    advantages: [
      'Zero CPU utilization during high-speed multi-kilobyte data transfers',
      'Prevents FIFO buffer overflows and drops during high-baud serial streams',
      'Enables true real-time multi-tasking architectures'
    ],
    disadvantages: [
      'Requires careful memory alignment and cache coherency flushing on high-end MCUs with L1 data cache (e.g. STM32H7)',
      'Complex initial configuration of channel triggers and circular ring buffers'
    ]
  }
];
