import { Microcontroller } from '../types';

export const MICROCONTROLLER_FAMILIES = [
  { id: 'ESP32', name: 'Espressif ESP32', desc: 'IoT powerhouses featuring dual-core & RISC-V with Wi-Fi/BLE and AI vector support.', count: 3, icon: 'Wifi' },
  { id: 'STM32', name: 'STMicroelectronics STM32', desc: 'Industry-standard ARM Cortex-M series spanning ultra-low-power to 550MHz giants.', count: 4, icon: 'Cpu' },
  { id: 'MSP430', name: 'Texas Instruments MSP430', desc: 'Renowned 16-bit ultra-low power architecture featuring non-volatile FRAM.', count: 1, icon: 'BatteryCharging' },
  { id: 'AVR', name: 'Microchip AVR', desc: 'World’s most iconic 8-bit RISC architecture powering Arduino Uno and embedded classics.', count: 2, icon: 'Layers' },
  { id: 'RP2040', name: 'Raspberry Pi RP2040', desc: 'Dual Cortex-M0+ with state machine Programmable I/O (PIO) blocks.', count: 1, icon: 'Sparkles' },
  { id: '8051', name: 'Intel 8051 Architecture', desc: 'Foundational CISC 8-bit Harvard architecture essential for ECE curricula.', count: 1, icon: 'Binary' },
  { id: 'PIC', name: 'Microchip PIC', desc: 'Robust industrial 8-bit and 32-bit microcontrollers widely used in automotive & machinery.', count: 2, icon: 'Activity' }
];

export const MICROCONTROLLERS: Microcontroller[] = [
  {
    id: 'esp32-wroom-32',
    name: 'ESP32 (ESP-WROOM-32)',
    family: 'ESP32',
    manufacturer: 'Espressif Systems',
    core: 'Xtensa Dual-Core 32-bit LX6',
    architecture: 'Harvard 32-bit RISC',
    clockMHz: 240,
    flashKB: 4096, // 4MB
    sramKB: 520,
    eepromKB: 0, // Emulated in Flash (NVS)
    gpioCount: 34,
    adcChannels: '18 channels (12-bit SAR ADC with attenuation)',
    dacChannels: '2 channels (8-bit current-steering DAC)',
    pwmChannels: '16 independent LEDC PWM channels + Motor PWM (MCPWM)',
    interrupts: 'External interrupts on all GPIO pins, dual-core interrupt matrix',
    timers: '4x 64-bit general purpose timers + 3x watchdog timers',
    uartCount: 3,
    spiCount: 4, // SPI0, SPI1 reserved for flash; HSPI and VSPI user accessible
    i2cCount: 2,
    canSupport: '1x TWAI (Two-Wire Automotive Interface / CAN 2.0B compatible)',
    usbSupport: 'Via external USB-UART bridge (CP2102/CH340)',
    operatingVoltage: '3.0V – 3.6V (Standard 3.3V logic)',
    powerConsumption: 'Active: 160-240 mA; Light Sleep: 0.8 mA; Deep Sleep: 5-10 uA; Hibernation: 2.5 uA',
    pros: [
      'Dual 240MHz cores deliver extraordinary processing power for IoT',
      'Built-in 2.4GHz Wi-Fi (802.11 b/g/n) and Bluetooth 4.2 BR/EDR + BLE',
      'Dedicated hardware crypto acceleration (AES, SHA-2, RSA, ECC, RNG)',
      'Rich peripheral set: 10 capacitive touch sensors, DAC, Hall sensor'
    ],
    cons: [
      'ADC non-linearity requires polynomial calibration curve below 0.1V and above 2.8V',
      'High power draw during Wi-Fi transmission bursts (up to 240mA+)',
      'Several GPIOs are strapping pins (GPIO 0, 2, 5, 12, 15) affecting boot state'
    ],
    applications: [
      'Smart home IoT gateways and sensor hubs',
      'Wi-Fi connected video streaming and audio playback',
      'Industrial telemetry and MQTT cloud reporting',
      'Edge computing and lightweight TensorFlow Lite inference'
    ],
    devTools: ['ESP-IDF (Official FreeRTOS-based)', 'Arduino IDE & Arduino-ESP32 Core', 'PlatformIO', 'MicroPython'],
    codeSnippet: `// ESP32 High-speed PWM LED fade using LEDC hardware peripheral
#define LED_PIN 2
#define PWM_CHANNEL 0
#define PWM_FREQ 5000
#define PWM_RES 8 // 8-bit resolution (0-255)

void setup() {
  Serial.begin(115200);
  ledcSetup(PWM_CHANNEL, PWM_FREQ, PWM_RES);
  ledcAttachPin(LED_PIN, PWM_CHANNEL);
  Serial.println("ESP32 LEDC PWM Initialized");
}

void loop() {
  for (int duty = 0; duty <= 255; duty++) {
    ledcWrite(PWM_CHANNEL, duty);
    delay(5);
  }
  for (int duty = 255; duty >= 0; duty--) {
    ledcWrite(PWM_CHANNEL, duty);
    delay(5);
  }
}`,
    beginnerProject: 'ESP32 Wi-Fi Weather Station logging temperature and humidity to Adafruit IO via MQTT.',
    advancedProject: 'Dual-core FreeRTOS Edge Audio Processor running keyword spotting with FreeRTOS task pinned to Core 1 and Wi-Fi stack on Core 0.',
    datasheetUrl: 'https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf',
    badge: 'Dual-Core IoT Icon'
  },
  {
    id: 'esp32-s3',
    name: 'ESP32-S3',
    family: 'ESP32',
    manufacturer: 'Espressif Systems',
    core: 'Xtensa Dual-Core 32-bit LX7 with Vector Instructions',
    architecture: 'Harvard 32-bit RISC with Vector Extensions',
    clockMHz: 240,
    flashKB: 8192, // Typical 8MB or 16MB
    sramKB: 512,
    eepromKB: 0,
    gpioCount: 45,
    adcChannels: '20 channels (12-bit SAR ADC)',
    dacChannels: 'None (replaced with PDM / I2S audio)',
    pwmChannels: '8 LEDC channels + 6 MCPWM channels',
    interrupts: 'Configurable interrupt routing across both cores',
    timers: '4x 54-bit general purpose timers + watchdogs',
    uartCount: 3,
    spiCount: 4,
    i2cCount: 2,
    canSupport: '1x TWAI (CAN 2.0B compatible)',
    usbSupport: 'Native USB 1.1 Full Speed OTG (Host and Device) + USB Serial/JTAG',
    operatingVoltage: '3.0V – 3.6V (Standard 3.3V)',
    powerConsumption: 'Active: 100-240 mA; Light Sleep: 240 uA; Deep Sleep: 7 uA',
    pros: [
      'Hardware vector instructions specifically accelerate AI/TinyML neural networks',
      'Native USB-OTG and JTAG debugger on chip, eliminating need for external FTDI chip',
      '45 programmable GPIOs with flexible IO matrix',
      'Enhanced security with Flash encryption and RSA-3072 secure boot'
    ],
    cons: [
      'No hardware DAC (digital-to-analog converter) compared to original ESP32',
      'Different pin layout and strapping requirements'
    ],
    applications: [
      'TinyML computer vision and wake-word voice recognition',
      'Smart displays and HMI panels with high-res LCD parallel interface',
      'Native USB HID devices, game controllers, and logic analyzers'
    ],
    devTools: ['ESP-IDF v4.4+', 'Arduino ESP32 Core 2.0+', 'ESP-DL (Deep Learning Library)'],
    codeSnippet: `// Native USB Serial on ESP32-S3
void setup() {
  USBSerial.begin(115200); // Direct On-Chip USB CDC
  while(!USBSerial) delay(10);
  USBSerial.println("ESP32-S3 Native USB Serial Active");
}

void loop() {
  USBSerial.printf("Uptime: %lu ms\\r\\n", millis());
  delay(1000);
}`,
    beginnerProject: 'USB Macro Keyboard with native media keys and RGB status backlights.',
    advancedProject: 'TinyML Offline Voice Command & Face Detection System with Camera Interface (DVP).',
    badge: 'AI & TinyML Ready'
  },
  {
    id: 'esp32-c6',
    name: 'ESP32-C6',
    family: 'ESP32',
    manufacturer: 'Espressif Systems',
    core: '32-bit RISC-V Single-Core RV32IMAC',
    architecture: 'Open RISC-V 32-bit',
    clockMHz: 160,
    flashKB: 4096,
    sramKB: 512,
    eepromKB: 0,
    gpioCount: 30,
    adcChannels: '7 channels (12-bit SAR ADC)',
    dacChannels: 'None',
    pwmChannels: '6 LEDC channels + Motor PWM',
    interrupts: 'RISC-V PLIC (Platform-Level Interrupt Controller)',
    timers: '2x 54-bit general purpose timers + Low-power timer',
    uartCount: 2,
    spiCount: 2,
    i2cCount: 1,
    canSupport: '1x TWAI (CAN 2.0B / ISO 11898-1)',
    usbSupport: 'USB Serial/JTAG controller',
    operatingVoltage: '3.0V – 3.6V (Standard 3.3V)',
    powerConsumption: 'Active: 35-70 mA; Deep Sleep: 7 uA; Ultra Low Power ULP RISC-V core: ~15 uA',
    pros: [
      'Wi-Fi 6 (802.11ax) 2.4GHz with Target Wake Time (TWT) for extreme power saving',
      'Bluetooth 5 (LE) and IEEE 802.15.4 (Zigbee 3.0 and Thread/Matter support)',
      'Modern, open RISC-V core without proprietary architecture licensing',
      'Ideal for Matter protocol multi-radio smart home appliances'
    ],
    cons: [
      'Single-core limits heavy parallel thread execution',
      'Fewer GPIO pins than ESP32-S3'
    ],
    applications: [
      'Matter-over-Thread and Zigbee smart home sensors',
      'Ultra-low-power industrial sensor nodes using Wi-Fi 6 TWT',
      'Solar-powered environmental monitoring'
    ],
    devTools: ['ESP-IDF v5.1+', 'Arduino-ESP32 Core', 'OpenOCD RISC-V'],
    codeSnippet: `// ESP32-C6 Deep Sleep with Timer Wakeup
#define TIME_TO_SLEEP_SEC 10
#define uS_TO_S_FACTOR 1000000ULL

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("ESP32-C6 RISC-V Awake!");
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP_SEC * uS_TO_S_FACTOR);
  Serial.println("Entering Deep Sleep for 10s...");
  esp_deep_sleep_start();
}

void loop() {}`,
    beginnerProject: 'Wi-Fi 6 Battery-Powered Door Sensor with Target Wake Time (TWT).',
    advancedProject: 'Matter-over-Thread Smart Thermostat with Zigbee mesh bridging.',
    badge: 'Wi-Fi 6 & Matter'
  },
  {
    id: 'stm32f103c6t6a',
    name: 'STM32F103C6T6A (Blue Pill)',
    family: 'STM32',
    manufacturer: 'STMicroelectronics',
    core: 'ARM Cortex-M3 32-bit',
    architecture: 'ARMv7-M RISC',
    clockMHz: 72,
    flashKB: 32, // C6T6A has 32KB; often clone boards report 64KB
    sramKB: 10,
    eepromKB: 0,
    gpioCount: 37,
    adcChannels: '10 channels (2x 12-bit ADCs, 1 uS conversion time)',
    dacChannels: 'None',
    pwmChannels: 'Up to 15 PWM channels across 3 general-purpose timers',
    interrupts: 'Nested Vectored Interrupt Controller (NVIC) with 43 maskable interrupts',
    timers: '3x 16-bit timers (TIM1 advanced control, TIM2, TIM3) + SysTick timer',
    uartCount: 2,
    spiCount: 2,
    i2cCount: 2,
    canSupport: '1x CAN 2.0B interface (Active CAN)',
    usbSupport: '1x USB 2.0 Full-Speed 12Mbps Device (shares RAM buffer with CAN)',
    operatingVoltage: '2.0V – 3.6V (Standard 3.3V, 5V-tolerant GPIOs on select pins)',
    powerConsumption: 'Run mode: 36 mA at 72MHz; Sleep mode: 14 mA; Standby mode: 3.4 uA',
    pros: [
      'Phenomenal price-to-performance ratio for 32-bit ARM Cortex-M3',
      'Hardware nested vector interrupts provide ultra-fast determinism (< 12 clock cycles latency)',
      'Multiple 5V-tolerant GPIO pins allow interfacing with older sensors without level shifting',
      'Standard SWD (Serial Wire Debug) header for single-step hardware debugging'
    ],
    cons: [
      'Cannot use USB and CAN concurrently because they share the same dedicated SRAM packet buffer',
      'Requires pull-up resistor fix on USB D+ line on many cheap third-party clone boards',
      'No hardware floating point unit (FPU)'
    ],
    applications: [
      'Precision motor control and 3D printer mainboards',
      'CAN bus vehicle telemetry and diagnostic OBD-II readers',
      'Industrial PLC replacements and laboratory automation instruments'
    ],
    devTools: ['STM32CubeIDE', 'Keil MDK-ARM', 'ST-Link V2 Debugger', 'PlatformIO with Arduino/HAL'],
    codeSnippet: `// Direct Register-Level GPIO Toggle on STM32F103
#include "stm32f1xx.h"

int main(void) {
  // Enable clock for GPIOC peripheral on APB2 bus
  RCC->APB2ENR |= RCC_APB2ENR_IOPCEN;
  
  // Configure PC13 as Output Push-Pull 2MHz
  GPIOC->CRH &= ~(0xF << 20); // Clear bits 20-23
  GPIOC->CRH |= (0x2 << 20);  // Output mode, max speed 2MHz

  while (1) {
    GPIOC->ODR ^= (1 << 13);  // Toggle PC13 LED pin
    for (volatile int i = 0; i < 500000; i++); // Crude delay
  }
}`,
    beginnerProject: 'Digital oscilloscope with dual 12-bit ADC DMA streaming to OLED display.',
    advancedProject: 'Field Oriented Control (FOC) brushless DC motor driver using advanced Timer 1 complementary PWM outputs with dead-time insertion.',
    badge: 'Legendary ARM Blue Pill'
  },
  {
    id: 'stm32f446re',
    name: 'STM32 Nucleo-F446RE',
    family: 'STM32',
    manufacturer: 'STMicroelectronics',
    core: 'ARM Cortex-M4 with Single-Precision FPU & DSP',
    architecture: 'ARMv7E-M RISC',
    clockMHz: 180,
    flashKB: 512,
    sramKB: 128,
    eepromKB: 0,
    gpioCount: 50,
    adcChannels: '16 channels (3x 12-bit ADCs up to 2.4 MSPS or 7.2 MSPS interleaved)',
    dacChannels: '2 channels (12-bit DAC with output buffers)',
    pwmChannels: 'Up to 20 PWM channels (Timers 1, 2, 3, 4, 5, 8, etc.)',
    interrupts: 'NVIC with 84 interrupt channels and 16 priority levels',
    timers: '2x 32-bit timers (TIM2, TIM5), 8x 16-bit timers, 2x watchdog timers',
    uartCount: 4, // 4x USART + 2x UART
    spiCount: 4,
    i2cCount: 3,
    canSupport: '2x bxCAN 2.0B interfaces',
    usbSupport: 'USB 2.0 OTG FS/HS (High Speed requires external PHY)',
    operatingVoltage: '1.7V – 3.6V (Standard 3.3V)',
    powerConsumption: 'Run mode: ~40 mA at 180MHz; Stop mode: ~110 uA; Standby: ~4 uA',
    pros: [
      'Single-cycle hardware FPU and DSP instructions for real-time digital filtering and FFT',
      'Nucleo board includes built-in ST-LINK/V2-1 debugger with virtual COM port',
      'Arduino Uno revision 3 headers + ST Morpho pin headers for complete chip breakout',
      'High ADC sampling rate (7.2 MSPS interleaved) for SDR and audio DSP'
    ],
    cons: [
      'Higher power consumption compared to STM32L series',
      '180MHz clock requires careful PCB layout and decouple capacitors in custom designs'
    ],
    applications: [
      'Real-time audio processing and digital guitar effects pedals',
      'High-dynamic quadcopter flight controllers and drone autopilots',
      'Dual CAN bus gateway in automotive electronic control units (ECUs)'
    ],
    devTools: ['STM32CubeMX & STM32CubeIDE', 'ST-LINK Utility', 'Mbed OS', 'Zephyr RTOS'],
    codeSnippet: `// Hardware Floating Point Math on STM32F446RE
#include "stm32f4xx_hal.h"
#include <arm_math.h>

float32_t calculate_rms(float32_t* pSrc, uint32_t blockSize) {
  float32_t result;
  // Uses CMSIS-DSP accelerated vector instructions
  arm_rms_f32(pSrc, blockSize, &result);
  return result;
}`,
    beginnerProject: 'Real-time Fast Fourier Transform (FFT) Audio Spectrum Analyzer on 320x240 SPI LCD.',
    advancedProject: 'Dual CAN-Bus Gateway with Real-time PID Engine for Electric Vehicle Powertrain Control.',
    badge: '180MHz DSP Workhorse'
  },
  {
    id: 'stm32l476rg',
    name: 'STM32L476RG (Ultra-Low-Power)',
    family: 'STM32',
    manufacturer: 'STMicroelectronics',
    core: 'ARM Cortex-M4 with FPU',
    architecture: 'ARMv7E-M RISC with Low Power Modes',
    clockMHz: 80,
    flashKB: 1024,
    sramKB: 128,
    eepromKB: 0,
    gpioCount: 51,
    adcChannels: '16 channels (3x 12-bit ADC 5 MSPS ultra-low power)',
    dacChannels: '2 channels (12-bit with sample and hold)',
    pwmChannels: '16 PWM channels',
    interrupts: 'NVIC with internal and external interrupt lines',
    timers: '2x 32-bit timers, 5x 16-bit timers, 2x Low Power Timers (LPTIM)',
    uartCount: 5,
    spiCount: 3,
    i2cCount: 3,
    canSupport: '1x CAN 2.0B',
    usbSupport: 'USB 2.0 full-speed device/host with crystal-less operation',
    operatingVoltage: '1.71V – 3.6V',
    powerConsumption: 'Run: 84 uA/MHz; Stop 2: 1.0 uA; Standby: 450 nA; Shutdown: 30 nA with RTC',
    pros: [
      'Comprehensive low-power modes (Stop 0/1/2, Standby, Shutdown)',
      'Batch Acquisition Mode (BAM) captures sensor data while CPU sleeps',
      'Hardware Segment LCD driver directly drives 8x40 or 4x44 glass panels',
      'True random number generator and AES-256 hardware encryption'
    ],
    cons: [
      'Max 80MHz clock is slower than STM32F series',
      'Complex clock tree switching between MSI, HSI, and HSE'
    ],
    applications: [
      'Smart water and gas utility meters with 10+ year battery lifespan',
      'Wearable medical pulse oximeters and continuous glucose monitors',
      'Battery-powered asset tracking tags'
    ],
    devTools: ['STM32CubeMX', 'STM32CubeIDE', 'IAR Embedded Workbench'],
    codeSnippet: `// Entering ultra-low-power Stop 2 mode on STM32L4
HAL_SuspendTick();
// Request entering Stop 2 mode with Low-Power Regulator
HAL_PWREx_EnterSTOP2Mode(PWR_STOPENTRY_WFI);
// MCU wakes here upon external pin interrupt or LPTIM
HAL_ResumeTick();`,
    beginnerProject: 'Solar-powered e-Paper environmental display updating once per minute.',
    advancedProject: 'Sub-microamp medical wearable device with Batch Acquisition Mode (BAM) logging ECG data to internal Flash.',
    badge: 'Ultra-Low-Power King'
  },
  {
    id: 'stm32h743zi',
    name: 'STM32H743ZI (Flagship High-Performance)',
    family: 'STM32',
    manufacturer: 'STMicroelectronics',
    core: 'ARM Cortex-M7 with Double-Precision FPU & 32KB L1 Cache',
    architecture: 'ARMv7E-M RISC with AXI bus matrix',
    clockMHz: 480,
    flashKB: 2048,
    sramKB: 1024,
    eepromKB: 0,
    gpioCount: 114,
    adcChannels: 'Up to 36 channels (3x 16-bit ADCs up to 3.6 MSPS)',
    dacChannels: '2 channels (12-bit)',
    pwmChannels: '22 PWM channels with high-resolution timer (HRTIM 2.17 ns resolution)',
    interrupts: 'Nested Vectored Interrupt Controller with 150+ vectors',
    timers: '22 timers including 64-bit and high-resolution timer (HRTIM)',
    uartCount: 8,
    spiCount: 6,
    i2cCount: 4,
    canSupport: '2x FDCAN (Flexible Data-Rate CAN up to 8 Mbps)',
    usbSupport: 'Dual USB OTG (1x Full-Speed, 1x High-Speed with on-chip PHY)',
    operatingVoltage: '1.62V – 3.6V',
    powerConsumption: 'Active: ~180 mA at 480MHz; Low-power standby: ~2.2 uA',
    pros: [
      'Massive 480MHz computing powerhouse delivering 1027 DMIPS',
      '16-bit high-resolution ADCs deliver scientific-grade analog measurements',
      'Hardware double-precision FPU and Chrom-ART 2D graphics accelerator',
      'Onboard 10/100 Ethernet MAC with IEEE 1588 precision time protocol'
    ],
    cons: [
      'High pin count and multilayer PCB routing requirements (LQFP144/BGA)',
      'Substantial heat generation under sustained maximum clock'
    ],
    applications: [
      'Industrial touch HMI panels and machine vision controllers',
      'High-speed digital power supplies and solar inverters with HRTIM',
      'Professional audio mixing consoles and multi-channel DSP synthesizers'
    ],
    devTools: ['STM32CubeIDE', 'TouchGFX Designer for UI', 'ST-LINK V3'],
    codeSnippet: `// High-precision double-precision math on STM32H7
double calculate_orbital_mechanics(double t) {
  double g = 9.80665;
  double v0 = 1250.45;
  return v0 * t - 0.5 * g * t * t; // Executes in single-cycle hardware pipeline
}`,
    beginnerProject: 'TouchGFX Color GUI Dashboard running on 800x480 RGB LCD.',
    advancedProject: 'Digital Signal Processing Multi-Channel Oscilloscope with 16-bit ADC, Gigabit Ethernet streaming, and real-time FFT waterfall visualizer.',
    badge: '480MHz Supercontroller'
  },
  {
    id: 'msp430g2553',
    name: 'TI MSP430 (MSP430G2553)',
    family: 'MSP430',
    manufacturer: 'Texas Instruments',
    core: 'MSP430 16-bit RISC CPU',
    architecture: 'Von Neumann 16-bit Orthogonal RISC',
    clockMHz: 16,
    flashKB: 16,
    sramKB: 0.512, // 512 Bytes
    eepromKB: 0,
    gpioCount: 16,
    adcChannels: '8 channels (10-bit 200 ksps SAR ADC with internal reference)',
    dacChannels: 'None',
    pwmChannels: 'Up to 5 PWM outputs (Timer_A)',
    interrupts: 'All P1 and P2 pins have individual interrupt vectors',
    timers: '2x 16-bit Timer_A with 3 capture/compare registers each',
    uartCount: 1, // Universal Serial Communication Interface (USCI)
    spiCount: 1,
    i2cCount: 1,
    canSupport: 'None',
    usbSupport: 'None (Hardware UART via LaunchPad eZ430 emulator)',
    operatingVoltage: '1.8V – 3.6V',
    powerConsumption: 'Active: 230 uA/MHz at 2.2V; LPM0: 55 uA; LPM3 (RTC active): 0.5 uA; LPM4 (Off): 0.1 uA',
    pros: [
      'Industry benchmark for ultra-low-power standby (0.1 uA in LPM4)',
      'Elegant orthogonal instruction set with only 27 native instructions',
      'Integrated analog comparator and calibrated temperature sensor',
      'Instantaneous wake-up from standby in under 1 microsecond'
    ],
    cons: [
      'Very limited RAM (512 bytes) requires strict stack and variable management',
      '16MHz maximum clock limits computational heavy workloads'
    ],
    applications: [
      'Coin-cell operated wireless sensor nodes',
      'Electronic shelf labels (ESL) and digital price tags',
      'Industrial utility gas and heat calorie meters'
    ],
    devTools: ['Code Composer Studio (CCS)', 'Energia (Arduino-like environment)', 'IAR for MSP430'],
    codeSnippet: `// MSP430 Low Power Mode 3 with Timer Interrupt
#include <msp430g2553.h>

void main(void) {
  WDTCTL = WDTPW + WDTHOLD;   // Stop watchdog timer
  P1DIR |= BIT0;              // Set P1.0 (Red LED) to output
  
  CCTL0 = CCIE;               // Enable Timer_A interrupt
  CCR0 = 12000;               // Count limit for 32.768kHz crystal
  TACTL = TASSEL_1 + MC_1;    // ACLK, Up mode

  __bis_SR_register(LPM3_bits + GIE); // Enter Low Power Mode 3 with interrupts
}

#pragma vector=TIMER0_A0_VECTOR
__interrupt void Timer_A (void) {
  P1OUT ^= BIT0;              // Toggle LED
}`,
    beginnerProject: 'Coin-cell powered blinking beacon running for 5+ years continuously in LPM3.',
    advancedProject: 'Sub-1uA Wireless Environmental Datalogger writing calibrated sensor values to Flash memory with instant wake-up.',
    badge: '16-bit Low Power Icon'
  },
  {
    id: 'atmega328p',
    name: 'Microchip ATmega328P (Arduino Uno)',
    family: 'AVR',
    manufacturer: 'Microchip Technology (formerly Atmel)',
    core: '8-bit AVR RISC',
    architecture: 'Harvard 8-bit RISC with 32 General Purpose Registers',
    clockMHz: 16,
    flashKB: 32,
    sramKB: 2,
    eepromKB: 1, // 1024 Bytes genuine EEPROM (100k write cycles)
    gpioCount: 23,
    adcChannels: '6 channels on DIP-28 / 8 channels on TQFP-32 (10-bit SAR ADC)',
    dacChannels: 'None',
    pwmChannels: '6 channels (8-bit PWM on Timer 0 and Timer 2, 16-bit on Timer 1)',
    interrupts: '2 external hardware interrupt pins (INT0, INT1) + Pin Change Interrupts on all pins',
    timers: '2x 8-bit timers (Timer0, Timer2) + 1x 16-bit timer (Timer1)',
    uartCount: 1,
    spiCount: 1,
    i2cCount: 1, // Two-Wire Interface (TWI)
    canSupport: 'None (requires external MCP2515 module)',
    usbSupport: 'Via ATmega16U2 on Arduino Uno or CH340 on clones',
    operatingVoltage: '1.8V – 5.5V (Standard 5.0V on Uno, 3.3V variants run at 8MHz)',
    powerConsumption: 'Active: ~12 mA at 16MHz 5V; Power-down sleep mode: 0.1 uA at 1.8V',
    pros: [
      '5V native logic simplifies direct interfacing with relays, legacy sensors, and standard displays',
      'True onboard 1KB non-volatile EEPROM retains settings across power cycles',
      'Rugged silicon tolerates accidental short circuits better than 3.3V modern MCUs',
      'Vast worldwide ecosystem of libraries, tutorials, and shields'
    ],
    cons: [
      'Modest 16MHz clock and 2KB RAM restrict complex networking or buffer storage',
      'No built-in Wi-Fi, Bluetooth, or native USB on the ATmega328P chip'
    ],
    applications: [
      'Foundational electronics and embedded systems education',
      'Robotics hobby platforms, line-following robots, and robotic arms',
      'Custom macro keypads, CNC machine grbl controllers, and relay drivers'
    ],
    devTools: ['Arduino IDE', 'Microchip Studio (Atmel Studio)', 'AVR-GCC & AVRDUDE', 'PlatformIO'],
    codeSnippet: `// Pure AVR C Direct Port Manipulation (No digitalWrite overhead)
#define F_CPU 16000000UL
#include <avr/io.h>
#include <util/delay.h>

int main(void) {
  // Set Pin PB5 (Arduino Uno digital pin 13) as Output
  DDRB |= (1 << DDB5);

  while (1) {
    PORTB |= (1 << PORTB5);  // High
    _delay_ms(500);
    PORTB &= ~(1 << PORTB5); // Low
    _delay_ms(500);
  }
}`,
    beginnerProject: 'Digital Security Alarm with ultrasonic sensor, buzzer, and 16x2 LCD display.',
    advancedProject: 'Custom GRBL CNC Stepper Motor Motion Controller generating synchronized step pulses at 30kHz.',
    badge: 'Universal Educator'
  },
  {
    id: 'rp2040-pico',
    name: 'Raspberry Pi RP2040 (Pico)',
    family: 'RP2040',
    manufacturer: 'Raspberry Pi Foundation',
    core: 'Dual ARM Cortex-M0+ @ 133MHz',
    architecture: 'ARMv6-M Dual-Core RISC',
    clockMHz: 133,
    flashKB: 2048, // 2MB external QSPI flash (supports up to 16MB)
    sramKB: 264, // 6 multi-banked SRAM blocks
    eepromKB: 0,
    gpioCount: 30, // 26 brought out on Pico header
    adcChannels: '4 channels 12-bit 500 ksps SAR ADC (1 internal temperature sensor)',
    dacChannels: 'None',
    pwmChannels: '16 PWM channels across 8 dual-channel slices',
    interrupts: 'NVIC with per-core interrupt routing and GPIO edge detection',
    timers: '1x 64-bit microsecond timer + 2x watchdog timers',
    uartCount: 2,
    spiCount: 2,
    i2cCount: 2,
    canSupport: 'None native (implemented effortlessly via PIO state machines)',
    usbSupport: 'Native USB 1.1 Host and Device with dedicated 4KB SRAM',
    operatingVoltage: '1.8V – 3.3V (Board runs on 1.8V-5.5V with onboard buck-boost regulator)',
    powerConsumption: 'Active: ~20-50 mA; Dormant mode: ~0.8 mA',
    pros: [
      '8 Programmable I/O (PIO) state machines execute deterministic custom digital protocols independently of CPU',
      'Dual Cortex-M0+ cores easily overclockable to 250MHz+',
      'Multi-banked 264KB SRAM eliminates bus contention between CPU and DMA',
      'UF2 bootloader enables drag-and-drop firmware flashing without extra programmers'
    ],
    cons: [
      'ADC has differential non-linearity (DNL) spikes near power supply rails',
      'External QSPI flash execution (XIP) incurs cache miss penalties on heavy branching'
    ],
    applications: [
      'Custom protocol emulation (DVI video output, VGA, CAN, WS2812B LEDs via PIO)',
      'Dual-core robotics control and real-time inverse kinematics',
      'High-speed USB logic analyzers and USB keystroke injectors'
    ],
    devTools: ['Raspberry Pi Pico C/C++ SDK', 'MicroPython / CircuitPython', 'Arduino Mbed/Pico Core'],
    codeSnippet: `// Raspberry Pi Pico Dual Core Example in C++
#include "pico/stdlib.h"
#include "pico/multicore.h"

void core1_entry() {
  while (1) {
    gpio_put(25, 1);
    sleep_ms(250);
    gpio_put(25, 0);
    sleep_ms(250);
  }
}

int main() {
  stdio_init_all();
  gpio_init(25);
  gpio_set_dir(25, GPIO_OUT);
  // Launch Core 1
  multicore_launch_core1(core1_entry);

  while (1) {
    printf("Core 0 running background tasks...\\n");
    sleep_ms(1000);
  }
}`,
    beginnerProject: 'RGB Neopixel light show driven entirely by PIO state machines without CPU overhead.',
    advancedProject: 'Direct Bit-Banged DVI/HDMI Video Signal Generator driving 640x480 60Hz color monitors directly from GPIO pins.',
    badge: 'Dual-Core PIO Revolutionary'
  },
  {
    id: 'intel-8051',
    name: 'Intel 8051 (AT89S52 / STC89C52)',
    family: '8051',
    manufacturer: 'Intel / Microchip / STC Micro',
    core: '8-bit CISC 8051 Core',
    architecture: 'Harvard CISC with separate Code (64KB) and Data (64KB) address spaces',
    clockMHz: 12, // 12 MHz standard (1 MIPS on 12T, 12 MIPS on 1T variants)
    flashKB: 8,
    sramKB: 0.256, // 256 bytes internal RAM
    eepromKB: 0,
    gpioCount: 32, // 4 ports: P0, P1, P2, P3
    adcChannels: 'None on standard 8051 (Requires external ADC like ADC0804)',
    dacChannels: 'None (Requires external DAC0808 or R-2R ladder)',
    pwmChannels: 'Software bit-banged via timers',
    interrupts: '5 interrupt sources: 2 external (INT0, INT1), 2 timer (TF0, TF1), 1 serial (RI/TI)',
    timers: '2x 16-bit timers/counters (Timer 0, Timer 1) + Timer 2 on AT89S52',
    uartCount: 1, // Full duplex UART with programmable baud rate generator
    spiCount: 0,  // None native on standard 8051 (available on AT89S52 via ISP pins)
    i2cCount: 0,  // None native (software bit-banged)
    canSupport: 'None',
    usbSupport: 'None',
    operatingVoltage: '4.0V – 5.5V (Standard 5.0V TTL)',
    powerConsumption: 'Active: ~15-25 mA; Idle mode: ~5 mA; Power down: ~50 uA',
    pros: [
      'Foundational microcontroller architecture taught in premier global ECE universities',
      'True bit-addressable RAM (128 bits from 20H to 2FH) allows single-cycle bit manipulation',
      'Clean memory segmentation (Internal RAM, SFRs, External RAM, Program ROM)',
      'High noise immunity and proven multi-decade silicon reliability in industrial machinery'
    ],
    cons: [
      'Standard 8051 requires 12 clock oscillations per single machine instruction cycle',
      'Port 0 requires external pull-up resistors for general purpose digital output',
      'No integrated ADC or DAC requires external peripheral chips'
    ],
    applications: [
      'ECE university embedded systems curriculum and laboratory courses',
      'Industrial assembly line logic controllers and relay timing panels',
      'Point-of-sale receipt printers and elevator dispatch control units'
    ],
    devTools: ['Keil C51 uVision IDE', 'SDCC (Small Device C Compiler)', 'Proteus Simulator', 'ISP Programmer'],
    codeSnippet: `// Embedded C for 8051 (Keil C51 syntax)
#include <reg52.h>

sbit LED = P2^0; // Define LED connected to Port 2 Pin 0

void delay_ms(unsigned int ms) {
  unsigned int i, j;
  for (i = 0; i < ms; i++)
    for (j = 0; j < 120; j++); // Approx 1ms delay at 11.0592 MHz
}

void main() {
  while (1) {
    LED = 0; // Active low turn on
    delay_ms(500);
    LED = 1; // Turn off
    delay_ms(500);
  }
}`,
    beginnerProject: 'Traffic light controller with 7-segment countdown timer multiplexing.',
    advancedProject: 'Digital Voltmeter interfacing an external ADC0804 through Port 1 and displaying measurements on an HD44780 LCD display.',
    badge: 'Foundational ECE Classic'
  },
  {
    id: 'pic16f877a',
    name: 'Microchip PIC16 (PIC16F877A)',
    family: 'PIC',
    manufacturer: 'Microchip Technology',
    core: '8-bit PIC Enhanced Mid-Range RISC',
    architecture: 'Harvard 8-bit RISC (14-bit wide instructions, 8-bit wide data)',
    clockMHz: 20,
    flashKB: 14.3, // 8K x 14-bit words
    sramKB: 0.368, // 368 bytes RAM
    eepromKB: 0.256, // 256 bytes genuine EEPROM
    gpioCount: 33, // Ports A, B, C, D, E
    adcChannels: '8 channels (10-bit successive approximation ADC)',
    dacChannels: 'None',
    pwmChannels: '2 Capture/Compare/PWM (CCP) hardware modules',
    interrupts: '14 interrupt sources with single global vector and priority',
    timers: '3 timers: Timer0 (8-bit), Timer1 (16-bit with 32kHz crystal), Timer2 (8-bit with PWM period)',
    uartCount: 1, // USART
    spiCount: 1, // Master Synchronous Serial Port (MSSP)
    i2cCount: 1, // Shared with MSSP
    canSupport: 'None (available on PIC18Fxx8 series)',
    usbSupport: 'None',
    operatingVoltage: '2.0V – 5.5V (Standard 5.0V)',
    powerConsumption: 'Active: ~15 mA at 20MHz 5V; Sleep mode: ~20 uA',
    pros: [
      'Ultra-compact instruction set of only 35 single-word instructions',
      'Dual CCP (Capture/Compare/PWM) modules for hardware PWM without timer overhead',
      'Onboard 256 bytes EEPROM for storing calibration parameters',
      'Extremely high EMI and industrial electrical noise resistance'
    ],
    cons: [
      'Bank-switching architecture requires banking registers (STATUS RP0, RP1) in assembly',
      'Single interrupt vector requires polling interrupt flag bits inside ISR to determine source'
    ],
    applications: [
      'Automotive body electronics and window wiper timers',
      'Heavy industrial motor speed controllers and welding equipment',
      'Commercial vending machines and coin validation mechanisms'
    ],
    devTools: ['MPLAB X IDE', 'MPLAB XC8 Compiler', 'PICkit 4 / PICkit 5 Hardware Programmer'],
    codeSnippet: `// Microchip XC8 C Code for PIC16F877A
#include <xc.h>
#define _XTAL_FREQ 20000000

// Configuration Bits
#pragma config FOSC = HS, WDTE = OFF, PWRTE = ON, BOREN = ON, LVP = OFF

void main(void) {
  TRISB0 = 0; // Set RB0 as output
  PORTB = 0x00;

  while (1) {
    RB0 = 1;
    __delay_ms(500);
    RB0 = 0;
    __delay_ms(500);
  }
}`,
    beginnerProject: 'Industrial liquid tank level controller with relay and buzzer alarm.',
    advancedProject: 'Closed-loop DC Motor Speed Controller utilizing CCP1 PWM and optical encoder feedback on Timer 1 capture pin.',
    badge: 'Industrial 8-bit Workhorse'
  },
  {
    id: 'pic32mx795f512l',
    name: 'Microchip PIC32 (PIC32MX795F512L)',
    family: 'PIC',
    manufacturer: 'Microchip Technology',
    core: '32-bit MIPS M4K Core',
    architecture: 'MIPS32 Release 2 Harvard Architecture',
    clockMHz: 80,
    flashKB: 512,
    sramKB: 128,
    eepromKB: 0,
    gpioCount: 85,
    adcChannels: '16 channels (10-bit 1 MSPS SAR ADC)',
    dacChannels: 'None',
    pwmChannels: '5 Output Compare / PWM modules',
    interrupts: 'Vectored Interrupt Controller with 64 interrupt vectors and 7 priority levels',
    timers: '5x 16-bit timers (can pair to form two 32-bit timers)',
    uartCount: 6,
    spiCount: 4,
    i2cCount: 5,
    canSupport: '2x CAN 2.0B modules with 32 message buffers each',
    usbSupport: 'USB 2.0 Full Speed Host, Device, and OTG',
    operatingVoltage: '2.3V – 3.6V (Standard 3.3V)',
    powerConsumption: 'Active: ~60 mA at 80MHz; Sleep mode: ~45 uA',
    pros: [
      'Integrated 10/100 Mbit Ethernet MAC with RMII/MII interface',
      'Dual CAN 2.0B modules for automotive and heavy equipment networks',
      'Dedicated DMA controller with 8 channels for autonomous memory-to-peripheral transfers',
      'Hardware atomic bit-manipulation registers (SET, CLR, INV) on all peripheral registers'
    ],
    cons: [
      'Higher PCB cost and complexity (100-pin TQFP package)',
      'XC32 compiler requires optimization license for smallest binary footprint'
    ],
    applications: [
      'Automotive CAN gateways and telematics black boxes',
      'Ethernet-enabled industrial IoT gateways and building automation BACnet controllers',
      'Multi-channel audio mixing systems and USB audio interfaces'
    ],
    devTools: ['MPLAB X IDE', 'MPLAB XC32 Compiler', 'MPLAB Harmony 3 Framework'],
    codeSnippet: `// PIC32 Fast Atomic Bit Manipulation
#include <xc.h>

void toggle_pin(void) {
  // Uses atomic INV register: toggles pin in exactly 1 clock cycle without read-modify-write risk
  LATDINV = (1 << 0); // Toggle RD0
}`,
    beginnerProject: 'Multi-channel Temperature Logger with USB Flash Drive Logging.',
    advancedProject: 'Ethernet-to-Dual-CAN Bus Industrial Gateway forwarding vehicle telemetry frames over Modbus TCP.',
    badge: '32-bit MIPS Powerhouse'
  }
];
