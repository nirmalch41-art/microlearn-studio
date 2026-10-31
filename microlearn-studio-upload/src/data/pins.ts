import { PinoutBoard } from '../types';

export const PINOUT_BOARDS: PinoutBoard[] = [
  {
    id: 'esp32-devkit-v1',
    name: 'ESP32 DevKit V1 (30-Pin)',
    mcuChip: 'ESP-WROOM-32 (Dual Core 240MHz)',
    family: 'ESP32',
    totalPins: 30,
    notes: 'Standard 30-pin NodeMCU-32S / ESP32 DevKit V1. Operates on 3.3V logic. GPIOs 34, 35, 36 (VP), 39 (VN) are input-only without internal pull-up/pull-down resistors.',
    voltageWarning: 'CAUTION: All GPIOs operate strictly at 3.3V logic. Supplying 5V to any GPIO pin will permanently damage the ESP32 chip!',
    headerLeft: [
      {
        pinNumber: 1,
        pinName: 'EN (RST)',
        category: 'control',
        voltageLevel: '3.3V Pull-Up',
        ioCapability: 'Reset Active-Low',
        restrictions: 'Pull LOW to reset chip. Connected to onboard EN button with RC network.',
        practicalApplications: 'External reset switch, watchdog reset.'
      },
      {
        pinNumber: 2,
        pinName: 'GPIO 36 (VP)',
        gpioNumber: 36,
        category: 'adc',
        voltageLevel: '3.3V Max (Input Only)',
        ioCapability: 'Analog/Digital Input ONLY',
        adc: 'ADC1_CH0',
        restrictions: 'INPUT ONLY. No software pull-up or pull-down. Used with LNA.',
        practicalApplications: 'Potentiometer reading, battery voltage divider sensing.'
      },
      {
        pinNumber: 3,
        pinName: 'GPIO 39 (VN)',
        gpioNumber: 39,
        category: 'adc',
        voltageLevel: '3.3V Max (Input Only)',
        ioCapability: 'Analog/Digital Input ONLY',
        adc: 'ADC1_CH3',
        restrictions: 'INPUT ONLY. No software pull-up or pull-down.',
        practicalApplications: 'Analog temperature sensor (LM35 via divider), LDR analog input.'
      },
      {
        pinNumber: 4,
        pinName: 'GPIO 34',
        gpioNumber: 34,
        category: 'adc',
        voltageLevel: '3.3V Max (Input Only)',
        ioCapability: 'Analog/Digital Input ONLY',
        adc: 'ADC1_CH6',
        restrictions: 'INPUT ONLY. No software pull-up or pull-down.',
        practicalApplications: 'Current sensor analog output (ACS712 with divider).'
      },
      {
        pinNumber: 5,
        pinName: 'GPIO 35',
        gpioNumber: 35,
        category: 'adc',
        voltageLevel: '3.3V Max (Input Only)',
        ioCapability: 'Analog/Digital Input ONLY',
        adc: 'ADC1_CH7',
        restrictions: 'INPUT ONLY. No software pull-up or pull-down.',
        practicalApplications: 'Soil moisture analog probe.'
      },
      {
        pinNumber: 6,
        pinName: 'GPIO 32',
        gpioNumber: 32,
        category: 'gpio',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / Touch',
        adc: 'ADC1_CH4',
        pwm: 'LEDC_CH4',
        alternateFunctions: ['TOUCH9', 'XTAL_32K_P'],
        practicalApplications: 'Capacitive touch switch, RTC 32.768kHz crystal oscillator.'
      },
      {
        pinNumber: 7,
        pinName: 'GPIO 33',
        gpioNumber: 33,
        category: 'gpio',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / Touch',
        adc: 'ADC1_CH5',
        pwm: 'LEDC_CH5',
        alternateFunctions: ['TOUCH8', 'XTAL_32K_N'],
        practicalApplications: 'Capacitive touch switch, relay driving.'
      },
      {
        pinNumber: 8,
        pinName: 'GPIO 25',
        gpioNumber: 25,
        category: 'dac',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / DAC',
        adc: 'ADC2_CH8',
        dac: 'DAC_1 (8-bit)',
        pwm: 'LEDC_CH6',
        practicalApplications: 'True analog audio output, waveform generation.'
      },
      {
        pinNumber: 9,
        pinName: 'GPIO 26',
        gpioNumber: 26,
        category: 'dac',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / DAC',
        adc: 'ADC2_CH9',
        dac: 'DAC_2 (8-bit)',
        pwm: 'LEDC_CH7',
        practicalApplications: 'True analog synthesizer, piezo frequency tone.'
      },
      {
        pinNumber: 10,
        pinName: 'GPIO 27',
        gpioNumber: 27,
        category: 'gpio',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / Touch',
        adc: 'ADC2_CH7',
        pwm: 'LEDC_CH8',
        alternateFunctions: ['TOUCH7'],
        practicalApplications: 'Pushbutton input, LCD control pin.'
      },
      {
        pinNumber: 11,
        pinName: 'GPIO 14',
        gpioNumber: 14,
        category: 'spi',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / SPI Clock',
        adc: 'ADC2_CH6',
        pwm: 'LEDC_CH9',
        spi: 'HSPI_CLK',
        alternateFunctions: ['TOUCH6', 'HSPI_CLK', 'JTAG TMS'],
        restrictions: 'Strapping pin: outputs PWM at boot.',
        practicalApplications: 'High-speed SPI TFT display or SD card clock line.'
      },
      {
        pinNumber: 12,
        pinName: 'GPIO 12',
        gpioNumber: 12,
        category: 'spi',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / SPI MISO',
        adc: 'ADC2_CH5',
        pwm: 'LEDC_CH10',
        spi: 'HSPI_MISO',
        alternateFunctions: ['TOUCH5', 'JTAG TDI'],
        restrictions: 'CRITICAL STRAPPING PIN: MTDI selects flash voltage at boot. Pulling high may cause bootloop if flash is 3.3V!',
        practicalApplications: 'SPI MISO data input line.'
      },
      {
        pinNumber: 13,
        pinName: 'GPIO 13',
        gpioNumber: 13,
        category: 'spi',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / SPI MOSI',
        adc: 'ADC2_CH4',
        pwm: 'LEDC_CH11',
        spi: 'HSPI_MOSI',
        alternateFunctions: ['TOUCH4', 'JTAG TCK'],
        practicalApplications: 'SPI Master Out Slave In line.'
      },
      {
        pinNumber: 14,
        pinName: 'GND',
        category: 'ground',
        voltageLevel: '0V',
        ioCapability: 'Common Ground Return',
        practicalApplications: 'Circuit common ground.'
      },
      {
        pinNumber: 15,
        pinName: 'VIN (5V)',
        category: 'power',
        voltageLevel: '5.0V External Input',
        ioCapability: 'Regulated Power Supply In',
        restrictions: 'Directly feeds onboard AMS1117 / ME6211 3.3V regulator.',
        practicalApplications: 'Powering board from external 5V USB or DC supply.'
      }
    ],
    headerRight: [
      {
        pinNumber: 16,
        pinName: '3V3',
        category: 'power',
        voltageLevel: '3.3V Output',
        ioCapability: 'Regulated 3.3V Power Out',
        restrictions: 'Max current ~500mA depending on onboard regulator dissipation.',
        practicalApplications: 'Powering 3.3V sensors (BME280, OLED, MPU6050).'
      },
      {
        pinNumber: 17,
        pinName: 'GND',
        category: 'ground',
        voltageLevel: '0V',
        ioCapability: 'Common Ground Return',
        practicalApplications: 'System ground.'
      },
      {
        pinNumber: 18,
        pinName: 'GPIO 15',
        gpioNumber: 15,
        category: 'spi',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / SPI CS',
        adc: 'ADC2_CH3',
        pwm: 'LEDC_CH12',
        spi: 'HSPI_CS',
        alternateFunctions: ['TOUCH3', 'JTAG TDO'],
        restrictions: 'Strapping pin: controls silent boot log when pulled LOW.',
        practicalApplications: 'SPI Chip Select, general output.'
      },
      {
        pinNumber: 19,
        pinName: 'GPIO 2',
        gpioNumber: 2,
        category: 'gpio',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / Onboard Blue LED',
        adc: 'ADC2_CH2',
        pwm: 'LEDC_CH13',
        alternateFunctions: ['TOUCH2'],
        restrictions: 'STRAPPING PIN: Must be floating or LOW during boot flashing. Connected to onboard Blue LED.',
        practicalApplications: 'System status indicator LED.'
      },
      {
        pinNumber: 20,
        pinName: 'GPIO 0',
        gpioNumber: 0,
        category: 'special',
        voltageLevel: '3.3V Pull-Up',
        ioCapability: 'Input / Output / Boot Select',
        adc: 'ADC2_CH1',
        pwm: 'LEDC_CH14',
        alternateFunctions: ['TOUCH1', 'CLK_OUT1'],
        restrictions: 'BOOT STRAPPING PIN: Pull LOW to enter UART download flashing mode; HIGH for SPI flash boot.',
        practicalApplications: 'Onboard BOOT pushbutton.'
      },
      {
        pinNumber: 21,
        pinName: 'GPIO 4',
        gpioNumber: 4,
        category: 'gpio',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / Touch',
        adc: 'ADC2_CH0',
        pwm: 'LEDC_CH15',
        alternateFunctions: ['TOUCH0'],
        practicalApplications: 'DHT11 / DHT22 one-wire bus, general sensor IO.'
      },
      {
        pinNumber: 22,
        pinName: 'GPIO 16',
        gpioNumber: 16,
        category: 'uart',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / UART2 RX',
        uart: 'UART2_RX',
        practicalApplications: 'Hardware Serial 2 RX (e.g. GPS Neo-6M TX line).'
      },
      {
        pinNumber: 23,
        pinName: 'GPIO 17',
        gpioNumber: 17,
        category: 'uart',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / UART2 TX',
        uart: 'UART2_TX',
        practicalApplications: 'Hardware Serial 2 TX (e.g. SIM800L GSM module).'
      },
      {
        pinNumber: 24,
        pinName: 'GPIO 5',
        gpioNumber: 5,
        category: 'spi',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / VSPI CS',
        pwm: 'LEDC_CH0',
        spi: 'VSPI_CS',
        restrictions: 'Strapping pin: outputs PWM timing at reset.',
        practicalApplications: 'VSPI Chip Select line.'
      },
      {
        pinNumber: 25,
        pinName: 'GPIO 18',
        gpioNumber: 18,
        category: 'spi',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / VSPI CLK',
        pwm: 'LEDC_CH1',
        spi: 'VSPI_CLK',
        practicalApplications: 'Default VSPI clock for displays.'
      },
      {
        pinNumber: 26,
        pinName: 'GPIO 19',
        gpioNumber: 19,
        category: 'spi',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / VSPI MISO',
        pwm: 'LEDC_CH2',
        spi: 'VSPI_MISO',
        practicalApplications: 'Default VSPI Master-In Slave-Out.'
      },
      {
        pinNumber: 27,
        pinName: 'GPIO 21',
        gpioNumber: 21,
        category: 'i2c',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / I2C SDA',
        i2c: 'I2C_SDA',
        practicalApplications: 'Default I2C Data line for SSD1306 OLED, BME280, MPU6050.'
      },
      {
        pinNumber: 28,
        pinName: 'GPIO 3 (RX0)',
        gpioNumber: 3,
        category: 'uart',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / Serial Monitor RX',
        uart: 'UART0_RX',
        restrictions: 'Connected to USB-UART chip. Using as GPIO disrupts PC serial programming and monitor.',
        practicalApplications: 'Default programming & debugging port.'
      },
      {
        pinNumber: 29,
        pinName: 'GPIO 1 (TX0)',
        gpioNumber: 1,
        category: 'uart',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / Serial Monitor TX',
        uart: 'UART0_TX',
        restrictions: 'Connected to USB-UART chip. Using as GPIO disrupts debug logging.',
        practicalApplications: 'Default programming & debugging port.'
      },
      {
        pinNumber: 30,
        pinName: 'GPIO 22',
        gpioNumber: 22,
        category: 'i2c',
        voltageLevel: '3.3V',
        ioCapability: 'Input / Output / I2C SCL',
        i2c: 'I2C_SCL',
        practicalApplications: 'Default I2C Clock line for OLED displays and sensors.'
      }
    ]
  },
  {
    id: 'arduino-uno-atmega328p',
    name: 'Arduino Uno R3 (ATmega328P)',
    mcuChip: 'Microchip ATmega328P (8-bit AVR 16MHz)',
    family: 'AVR',
    totalPins: 28,
    notes: 'The golden standard microcontroller board. Native 5.0V TTL logic. 14 Digital I/O pins (6 PWM), 6 Analog Input pins (A0-A5).',
    voltageWarning: 'Operates at 5.0V logic. 3.3V sensors require bidirectional logic level shifters on data lines.',
    headerLeft: [
      {
        pinNumber: 1,
        pinName: 'IOREF',
        category: 'power',
        voltageLevel: '5.0V',
        ioCapability: 'Shield Reference Voltage',
        practicalApplications: 'Supplies target operating voltage to shields.'
      },
      {
        pinNumber: 2,
        pinName: 'RESET',
        category: 'control',
        voltageLevel: '5.0V Pull-Up',
        ioCapability: 'Active-Low Reset',
        practicalApplications: 'External reset switch.'
      },
      {
        pinNumber: 3,
        pinName: '3.3V',
        category: 'power',
        voltageLevel: '3.3V Power Out',
        ioCapability: 'Regulated 3.3V Output',
        restrictions: 'Max 150mA current supplied by onboard regulator or LP2985.',
        practicalApplications: 'Powering low-power 3.3V sensors.'
      },
      {
        pinNumber: 4,
        pinName: '5V',
        category: 'power',
        voltageLevel: '5.0V Power Out',
        ioCapability: 'Regulated 5.0V Supply',
        practicalApplications: 'Main 5V sensor and display supply.'
      },
      {
        pinNumber: 5,
        pinName: 'GND 1',
        category: 'ground',
        voltageLevel: '0V',
        ioCapability: 'Ground',
        practicalApplications: 'Circuit ground.'
      },
      {
        pinNumber: 6,
        pinName: 'GND 2',
        category: 'ground',
        voltageLevel: '0V',
        ioCapability: 'Ground',
        practicalApplications: 'Circuit ground.'
      },
      {
        pinNumber: 7,
        pinName: 'VIN',
        category: 'power',
        voltageLevel: '7V - 12V Input',
        ioCapability: 'Raw DC Input',
        restrictions: 'Supplied directly to onboard NCP1117ST50 regulator.',
        practicalApplications: 'Powering Arduino from 9V battery or 12V DC barrel jack.'
      },
      {
        pinNumber: 8,
        pinName: 'A0 (PC0)',
        gpioNumber: 14,
        category: 'adc',
        voltageLevel: '0 - 5.0V',
        ioCapability: 'Analog In / Digital IO',
        adc: 'ADC0 (10-bit)',
        practicalApplications: 'LDR analog divider, LM35 temperature sensor.'
      },
      {
        pinNumber: 9,
        pinName: 'A1 (PC1)',
        gpioNumber: 15,
        category: 'adc',
        voltageLevel: '0 - 5.0V',
        ioCapability: 'Analog In / Digital IO',
        adc: 'ADC1 (10-bit)',
        practicalApplications: 'Potentiometer slider, analog joystick X-axis.'
      },
      {
        pinNumber: 10,
        pinName: 'A2 (PC2)',
        gpioNumber: 16,
        category: 'adc',
        voltageLevel: '0 - 5.0V',
        ioCapability: 'Analog In / Digital IO',
        adc: 'ADC2 (10-bit)',
        practicalApplications: 'Analog joystick Y-axis, microphone analog output.'
      },
      {
        pinNumber: 11,
        pinName: 'A3 (PC3)',
        gpioNumber: 17,
        category: 'adc',
        voltageLevel: '0 - 5.0V',
        ioCapability: 'Analog In / Digital IO',
        adc: 'ADC3 (10-bit)',
        practicalApplications: 'MQ gas sensor analog concentration reading.'
      },
      {
        pinNumber: 12,
        pinName: 'A4 (PC4 / SDA)',
        gpioNumber: 18,
        category: 'i2c',
        voltageLevel: '0 - 5.0V',
        ioCapability: 'Analog In / I2C SDA',
        adc: 'ADC4 (10-bit)',
        i2c: 'TWI SDA',
        practicalApplications: 'I2C Serial Data line for RTC DS3231 or LCD.'
      },
      {
        pinNumber: 13,
        pinName: 'A5 (PC5 / SCL)',
        gpioNumber: 19,
        category: 'i2c',
        voltageLevel: '0 - 5.0V',
        ioCapability: 'Analog In / I2C SCL',
        adc: 'ADC5 (10-bit)',
        i2c: 'TWI SCL',
        practicalApplications: 'I2C Serial Clock line.'
      }
    ],
    headerRight: [
      {
        pinNumber: 14,
        pinName: 'D0 (RX / PD0)',
        gpioNumber: 0,
        category: 'uart',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO / UART RX',
        uart: 'USART RX',
        restrictions: 'Connected to USB ATmega16U2 serial chip. Avoid connecting during sketch upload.',
        practicalApplications: 'Hardware serial receive.'
      },
      {
        pinNumber: 15,
        pinName: 'D1 (TX / PD1)',
        gpioNumber: 1,
        category: 'uart',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO / UART TX',
        uart: 'USART TX',
        restrictions: 'Connected to USB serial chip.',
        practicalApplications: 'Hardware serial transmit.'
      },
      {
        pinNumber: 16,
        pinName: 'D2 (PD2 / INT0)',
        gpioNumber: 2,
        category: 'gpio',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO / External Interrupt',
        alternateFunctions: ['INT0'],
        practicalApplications: 'Rotary encoder pulse A, flow sensor frequency interrupt.'
      },
      {
        pinNumber: 17,
        pinName: 'D3 (~ / PD3 / INT1)',
        gpioNumber: 3,
        category: 'pwm',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO / PWM / Interrupt',
        pwm: 'Timer2 PWM (8-bit)',
        alternateFunctions: ['INT1', 'OC2B'],
        practicalApplications: 'Motor speed PWM, buzzer tone.'
      },
      {
        pinNumber: 18,
        pinName: 'D4 (PD4)',
        gpioNumber: 4,
        category: 'gpio',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO',
        practicalApplications: 'DHT11 data pin, relay module signal.'
      },
      {
        pinNumber: 19,
        pinName: 'D5 (~ / PD5)',
        gpioNumber: 5,
        category: 'pwm',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO / PWM',
        pwm: 'Timer0 PWM (8-bit)',
        alternateFunctions: ['OC0B', 'T1 External Clock'],
        practicalApplications: 'LED brightness dimming, frequency counting.'
      },
      {
        pinNumber: 20,
        pinName: 'D6 (~ / PD6)',
        gpioNumber: 6,
        category: 'pwm',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO / PWM',
        pwm: 'Timer0 PWM (8-bit)',
        alternateFunctions: ['OC0A'],
        practicalApplications: 'High-frequency PWM output.'
      },
      {
        pinNumber: 21,
        pinName: 'D7 (PD7)',
        gpioNumber: 7,
        category: 'gpio',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO',
        practicalApplications: 'Ultrasonic trigger pin, pushbutton.'
      },
      {
        pinNumber: 22,
        pinName: 'D8 (PB0)',
        gpioNumber: 8,
        category: 'gpio',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO',
        alternateFunctions: ['ICP1 (Input Capture)'],
        practicalApplications: 'Ultrasonic echo pulse timing via Timer 1 input capture.'
      },
      {
        pinNumber: 23,
        pinName: 'D9 (~ / PB1)',
        gpioNumber: 9,
        category: 'pwm',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO / 16-bit PWM',
        pwm: 'Timer1 PWM (16-bit)',
        alternateFunctions: ['OC1A'],
        practicalApplications: 'Servo motor control (precise 1-2ms pulse width).'
      },
      {
        pinNumber: 24,
        pinName: 'D10 (~ / PB2 / SS)',
        gpioNumber: 10,
        category: 'spi',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO / SPI Slave Select / PWM',
        pwm: 'Timer1 PWM (16-bit)',
        spi: 'SPI SS',
        practicalApplications: 'SPI Slave Select for SD Card or NRF24L01.'
      },
      {
        pinNumber: 25,
        pinName: 'D11 (~ / PB3 / MOSI)',
        gpioNumber: 11,
        category: 'spi',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO / SPI MOSI / PWM',
        pwm: 'Timer2 PWM',
        spi: 'SPI MOSI',
        practicalApplications: 'SPI Master-Out Slave-In.'
      },
      {
        pinNumber: 26,
        pinName: 'D12 (PB4 / MISO)',
        gpioNumber: 12,
        category: 'spi',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO / SPI MISO',
        spi: 'SPI MISO',
        practicalApplications: 'SPI Master-In Slave-Out.'
      },
      {
        pinNumber: 27,
        pinName: 'D13 (PB5 / SCK)',
        gpioNumber: 13,
        category: 'spi',
        voltageLevel: '5.0V',
        ioCapability: 'Digital IO / SPI Clock / Built-in LED',
        spi: 'SPI SCK',
        restrictions: 'Connected to onboard yellow LED (L) with op-amp driver.',
        practicalApplications: 'SPI Clock, standard blink indicator.'
      },
      {
        pinNumber: 28,
        pinName: 'AREF',
        category: 'adc',
        voltageLevel: '0 - 5.0V External',
        ioCapability: 'ADC Analog Reference Voltage',
        restrictions: 'Do not connect external voltage if analogReference(INTERNAL) is set in code.',
        practicalApplications: 'Precision voltage reference for ADC.'
      }
    ]
  },
  {
    id: 'stm32-blue-pill',
    name: 'STM32F103C6T6A / C8T6 (Blue Pill)',
    mcuChip: 'ARM Cortex-M3 (72MHz)',
    family: 'STM32',
    totalPins: 40,
    notes: 'The iconic 40-pin STM32 development board. Native 3.3V logic. Several pins are 5V-tolerant (marked FT in ST datasheet).',
    voltageWarning: 'Only pins marked FT (Five-Volt Tolerant) can withstand 5V inputs. Pins connected to ADC are NOT 5V tolerant!',
    headerLeft: [
      { pinNumber: 1, pinName: 'VBAT', category: 'power', voltageLevel: '1.8V - 3.6V', ioCapability: 'RTC Backup Battery', practicalApplications: 'CR2032 coin cell for real-time clock.' },
      { pinNumber: 2, pinName: 'PC13 (LED)', gpioNumber: 'PC13', category: 'gpio', voltageLevel: '3.3V', ioCapability: 'Output (Active LOW)', restrictions: 'Connected to onboard Green LED. Limited to 3mA sink.', practicalApplications: 'Status LED indicator.' },
      { pinNumber: 3, pinName: 'PC14', gpioNumber: 'PC14', category: 'special', voltageLevel: '3.3V', ioCapability: 'OSC32 In / IO', practicalApplications: '32.768kHz RTC Crystal.' },
      { pinNumber: 4, pinName: 'PC15', gpioNumber: 'PC15', category: 'special', voltageLevel: '3.3V', ioCapability: 'OSC32 Out / IO', practicalApplications: '32.768kHz RTC Crystal.' },
      { pinNumber: 5, pinName: 'PA0 (WKUP)', gpioNumber: 'PA0', category: 'adc', voltageLevel: '3.3V (NOT 5V)', ioCapability: 'ADC / Timer2 / Wakeup', adc: 'ADC12_IN0', pwm: 'TIM2_CH1', alternateFunctions: ['WKUP'], practicalApplications: 'Analog voltage sensor, low power wakeup button.' },
      { pinNumber: 6, pinName: 'PA1', gpioNumber: 'PA1', category: 'adc', voltageLevel: '3.3V (NOT 5V)', ioCapability: 'ADC / Timer2', adc: 'ADC12_IN1', pwm: 'TIM2_CH2', practicalApplications: 'Ultrasonic echo / analog input.' },
      { pinNumber: 7, pinName: 'PA2 (TX2)', gpioNumber: 'PA2', category: 'uart', voltageLevel: '3.3V (NOT 5V)', ioCapability: 'USART2 TX / ADC', adc: 'ADC12_IN2', pwm: 'TIM2_CH3', uart: 'USART2_TX', practicalApplications: 'Bluetooth HC-05 serial transmit.' },
      { pinNumber: 8, pinName: 'PA3 (RX2)', gpioNumber: 'PA3', category: 'uart', voltageLevel: '3.3V (NOT 5V)', ioCapability: 'USART2 RX / ADC', adc: 'ADC12_IN3', pwm: 'TIM2_CH4', uart: 'USART2_RX', practicalApplications: 'Bluetooth serial receive.' },
      { pinNumber: 9, pinName: 'PA4 (NSS1)', gpioNumber: 'PA4', category: 'spi', voltageLevel: '3.3V (NOT 5V)', ioCapability: 'SPI1 NSS / ADC', adc: 'ADC12_IN4', spi: 'SPI1_NSS', practicalApplications: 'SPI1 Chip Select.' },
      { pinNumber: 10, pinName: 'PA5 (SCK1)', gpioNumber: 'PA5', category: 'spi', voltageLevel: '3.3V (NOT 5V)', ioCapability: 'SPI1 SCK / ADC', adc: 'ADC12_IN5', spi: 'SPI1_SCK', practicalApplications: 'SPI1 Clock line.' },
      { pinNumber: 11, pinName: 'PA6 (MISO1)', gpioNumber: 'PA6', category: 'spi', voltageLevel: '3.3V (NOT 5V)', ioCapability: 'SPI1 MISO / ADC', adc: 'ADC12_IN6', pwm: 'TIM3_CH1', spi: 'SPI1_MISO', practicalApplications: 'SPI1 MISO data.' },
      { pinNumber: 12, pinName: 'PA7 (MOSI1)', gpioNumber: 'PA7', category: 'spi', voltageLevel: '3.3V (NOT 5V)', ioCapability: 'SPI1 MOSI / ADC', adc: 'ADC12_IN7', pwm: 'TIM3_CH2', spi: 'SPI1_MOSI', practicalApplications: 'SPI1 MOSI data.' },
      { pinNumber: 13, pinName: 'PB0', gpioNumber: 'PB0', category: 'adc', voltageLevel: '3.3V (NOT 5V)', ioCapability: 'ADC / Timer3', adc: 'ADC12_IN8', pwm: 'TIM3_CH3', practicalApplications: 'Analog temperature sensor input.' },
      { pinNumber: 14, pinName: 'PB1', gpioNumber: 'PB1', category: 'adc', voltageLevel: '3.3V (NOT 5V)', ioCapability: 'ADC / Timer3', adc: 'ADC12_IN9', pwm: 'TIM3_CH4', practicalApplications: 'PWM output or ADC channel.' },
      { pinNumber: 15, pinName: 'PB10 (SCL2)', gpioNumber: 'PB10', category: 'i2c', voltageLevel: '5V Tolerant (FT)', ioCapability: 'I2C2 SCL / USART3 TX', i2c: 'I2C2_SCL', uart: 'USART3_TX', practicalApplications: 'I2C2 Clock line for sensors.' },
      { pinNumber: 16, pinName: 'PB11 (SDA2)', gpioNumber: 'PB11', category: 'i2c', voltageLevel: '5V Tolerant (FT)', ioCapability: 'I2C2 SDA / USART3 RX', i2c: 'I2C2_SDA', uart: 'USART3_RX', practicalApplications: 'I2C2 Data line.' },
      { pinNumber: 17, pinName: 'NRST', category: 'control', voltageLevel: '3.3V Pull-Up', ioCapability: 'Active-Low MCU Reset', practicalApplications: 'Hardware reset pin.' },
      { pinNumber: 18, pinName: '3V3', category: 'power', voltageLevel: '3.3V Output', ioCapability: 'Regulated 3.3V Output', practicalApplications: 'Sensor power supply.' },
      { pinNumber: 19, pinName: 'GND', category: 'ground', voltageLevel: '0V', ioCapability: 'Ground', practicalApplications: 'System ground.' },
      { pinNumber: 20, pinName: 'GND', category: 'ground', voltageLevel: '0V', ioCapability: 'Ground', practicalApplications: 'System ground.' }
    ],
    headerRight: [
      { pinNumber: 21, pinName: '5V', category: 'power', voltageLevel: '5.0V External', ioCapability: '5V In / Out from USB', practicalApplications: 'Board power or 5V relay drive.' },
      { pinNumber: 22, pinName: 'GND', category: 'ground', voltageLevel: '0V', ioCapability: 'Ground', practicalApplications: 'System ground.' },
      { pinNumber: 23, pinName: '3V3', category: 'power', voltageLevel: '3.3V Output', ioCapability: '3.3V Power', practicalApplications: 'Sensor supply.' },
      { pinNumber: 24, pinName: 'PB9', gpioNumber: 'PB9', category: 'i2c', voltageLevel: '5V Tolerant (FT)', ioCapability: 'I2C1 SDA / CAN RX', pwm: 'TIM4_CH4', i2c: 'I2C1_SDA', alternateFunctions: ['CAN_RX'], practicalApplications: 'I2C1 Data or CAN bus receiver.' },
      { pinNumber: 25, pinName: 'PB8', gpioNumber: 'PB8', category: 'i2c', voltageLevel: '5V Tolerant (FT)', ioCapability: 'I2C1 SCL / CAN TX', pwm: 'TIM4_CH3', i2c: 'I2C1_SCL', alternateFunctions: ['CAN_TX'], practicalApplications: 'I2C1 Clock or CAN bus transmit.' },
      { pinNumber: 26, pinName: 'PB7', gpioNumber: 'PB7', category: 'i2c', voltageLevel: '5V Tolerant (FT)', ioCapability: 'I2C1 SDA (default)', pwm: 'TIM4_CH2', i2c: 'I2C1_SDA', practicalApplications: 'Default I2C1 Data line.' },
      { pinNumber: 27, pinName: 'PB6', gpioNumber: 'PB6', category: 'i2c', voltageLevel: '5V Tolerant (FT)', ioCapability: 'I2C1 SCL (default)', pwm: 'TIM4_CH1', i2c: 'I2C1_SCL', practicalApplications: 'Default I2C1 Clock line.' },
      { pinNumber: 28, pinName: 'PB5', gpioNumber: 'PB5', category: 'gpio', voltageLevel: '3.3V (NOT 5V)', ioCapability: 'GPIO / I2C1 SMBA', pwm: 'TIM3_CH2', practicalApplications: 'General purpose IO.' },
      { pinNumber: 29, pinName: 'PB4', gpioNumber: 'PB4', category: 'special', voltageLevel: '5V Tolerant (FT)', ioCapability: 'JTAG JNTRST / GPIO', restrictions: 'Occupied by JTAG by default. Must disable JTAG in code to use as GPIO.', practicalApplications: 'SWD / GPIO.' },
      { pinNumber: 30, pinName: 'PB3', gpioNumber: 'PB3', category: 'special', voltageLevel: '5V Tolerant (FT)', ioCapability: 'JTAG JTDO / GPIO', restrictions: 'Occupied by JTAG by default.', practicalApplications: 'JTAG debug line.' },
      { pinNumber: 31, pinName: 'PA15', gpioNumber: 'PA15', category: 'special', voltageLevel: '5V Tolerant (FT)', ioCapability: 'JTAG JTDI / GPIO', restrictions: 'Occupied by JTAG by default.', practicalApplications: 'JTAG debug line.' },
      { pinNumber: 32, pinName: 'PA12 (USB D+)', gpioNumber: 'PA12', category: 'control', voltageLevel: '3.3V', ioCapability: 'USB D+ / CAN TX', alternateFunctions: ['CAN_TX', 'TIM1_ETR'], restrictions: 'Requires 1.5k pull-up resistor to 3.3V for USB enumeration on clone boards.', practicalApplications: 'Native USB communication.' },
      { pinNumber: 33, pinName: 'PA11 (USB D-)', gpioNumber: 'PA11', category: 'control', voltageLevel: '3.3V', ioCapability: 'USB D- / CAN RX', alternateFunctions: ['CAN_RX'], practicalApplications: 'Native USB communication.' },
      { pinNumber: 34, pinName: 'PA10 (RX1)', gpioNumber: 'PA10', category: 'uart', voltageLevel: '5V Tolerant (FT)', ioCapability: 'USART1 RX', uart: 'USART1_RX', pwm: 'TIM1_CH3', practicalApplications: 'Main UART1 Receive debug port.' },
      { pinNumber: 35, pinName: 'PA9 (TX1)', gpioNumber: 'PA9', category: 'uart', voltageLevel: '5V Tolerant (FT)', ioCapability: 'USART1 TX', uart: 'USART1_TX', pwm: 'TIM1_CH2', practicalApplications: 'Main UART1 Transmit debug port.' },
      { pinNumber: 36, pinName: 'PA8', gpioNumber: 'PA8', category: 'gpio', voltageLevel: '5V Tolerant (FT)', ioCapability: 'MCO / TIM1_CH1', pwm: 'TIM1_CH1', alternateFunctions: ['MCO (Master Clock Output)'], practicalApplications: 'Clock output or complementary PWM.' },
      { pinNumber: 37, pinName: 'PB15', gpioNumber: 'PB15', category: 'spi', voltageLevel: '5V Tolerant (FT)', ioCapability: 'SPI2 MOSI', pwm: 'TIM1_CH3N', spi: 'SPI2_MOSI', practicalApplications: 'SPI2 MOSI data line.' },
      { pinNumber: 38, pinName: 'PB14', gpioNumber: 'PB14', category: 'spi', voltageLevel: '5V Tolerant (FT)', ioCapability: 'SPI2 MISO', pwm: 'TIM1_CH2N', spi: 'SPI2_MISO', practicalApplications: 'SPI2 MISO data line.' },
      { pinNumber: 39, pinName: 'PB13', gpioNumber: 'PB13', category: 'spi', voltageLevel: '5V Tolerant (FT)', ioCapability: 'SPI2 SCK', pwm: 'TIM1_CH1N', spi: 'SPI2_SCK', practicalApplications: 'SPI2 Clock line.' },
      { pinNumber: 40, pinName: 'PB12', gpioNumber: 'PB12', category: 'spi', voltageLevel: '5V Tolerant (FT)', ioCapability: 'SPI2 NSS', spi: 'SPI2_NSS', practicalApplications: 'SPI2 Chip Select line.' }
    ]
  },
  {
    id: 'rp2040-pico-board',
    name: 'Raspberry Pi Pico (RP2040)',
    mcuChip: 'Dual ARM Cortex-M0+ (133MHz)',
    family: 'RP2040',
    totalPins: 40,
    notes: 'Castellated 40-pin module with 26 exposed GPIOs. Features 8 hardware Programmable I/O (PIO) state machines. Operates on 3.3V logic.',
    voltageWarning: 'All GPIOs operate strictly at 3.3V logic. Supplying 5V directly to GPIO pins will fry the RP2040.',
    headerLeft: [
      { pinNumber: 1, pinName: 'GP0 (UART0 TX)', gpioNumber: 0, category: 'uart', voltageLevel: '3.3V', ioCapability: 'Digital IO / PIO / UART0 TX', uart: 'UART0_TX', i2c: 'I2C0_SDA', spi: 'SPI0_RX', pwm: 'PWM0_A', practicalApplications: 'Primary serial debug TX, I2C0 data, or PIO pin.' },
      { pinNumber: 2, pinName: 'GP1 (UART0 RX)', gpioNumber: 1, category: 'uart', voltageLevel: '3.3V', ioCapability: 'Digital IO / PIO / UART0 RX', uart: 'UART0_RX', i2c: 'I2C0_SCL', spi: 'SPI0_CS', pwm: 'PWM0_B', practicalApplications: 'Primary serial debug RX, I2C0 clock.' },
      { pinNumber: 3, pinName: 'GND', category: 'ground', voltageLevel: '0V', ioCapability: 'Ground', practicalApplications: 'System ground.' },
      { pinNumber: 4, pinName: 'GP2', gpioNumber: 2, category: 'spi', voltageLevel: '3.3V', ioCapability: 'Digital IO / SPI0 SCK', spi: 'SPI0_SCK', i2c: 'I2C1_SDA', pwm: 'PWM1_A', practicalApplications: 'SPI0 Clock.' },
      { pinNumber: 5, pinName: 'GP3', gpioNumber: 3, category: 'spi', voltageLevel: '3.3V', ioCapability: 'Digital IO / SPI0 TX', spi: 'SPI0_TX', i2c: 'I2C1_SCL', pwm: 'PWM1_B', practicalApplications: 'SPI0 MOSI Data.' },
      { pinNumber: 6, pinName: 'GP4', gpioNumber: 4, category: 'i2c', voltageLevel: '3.3V', ioCapability: 'Digital IO / I2C0 SDA', i2c: 'I2C0_SDA', uart: 'UART1_TX', spi: 'SPI0_RX', pwm: 'PWM2_A', practicalApplications: 'I2C0 Data line for sensors.' },
      { pinNumber: 7, pinName: 'GP5', gpioNumber: 5, category: 'i2c', voltageLevel: '3.3V', ioCapability: 'Digital IO / I2C0 SCL', i2c: 'I2C0_SCL', uart: 'UART1_RX', spi: 'SPI0_CS', pwm: 'PWM2_B', practicalApplications: 'I2C0 Clock line.' },
      { pinNumber: 8, pinName: 'GND', category: 'ground', voltageLevel: '0V', ioCapability: 'Ground', practicalApplications: 'System ground.' },
      { pinNumber: 9, pinName: 'GP6', gpioNumber: 6, category: 'gpio', voltageLevel: '3.3V', ioCapability: 'Digital IO / PWM3_A', pwm: 'PWM3_A', practicalApplications: 'Buzzer tone, ultrasonic trigger.' },
      { pinNumber: 10, pinName: 'GP7', gpioNumber: 7, category: 'gpio', voltageLevel: '3.3V', ioCapability: 'Digital IO / PWM3_B', pwm: 'PWM3_B', practicalApplications: 'Ultrasonic echo input.' },
      { pinNumber: 11, pinName: 'GP8', gpioNumber: 8, category: 'uart', voltageLevel: '3.3V', ioCapability: 'Digital IO / UART1 TX', uart: 'UART1_TX', pwm: 'PWM4_A', practicalApplications: 'Second hardware UART TX.' },
      { pinNumber: 12, pinName: 'GP9', gpioNumber: 9, category: 'uart', voltageLevel: '3.3V', ioCapability: 'Digital IO / UART1 RX', uart: 'UART1_RX', pwm: 'PWM4_B', practicalApplications: 'Second hardware UART RX.' },
      { pinNumber: 13, pinName: 'GND', category: 'ground', voltageLevel: '0V', ioCapability: 'Ground', practicalApplications: 'System ground.' },
      { pinNumber: 14, pinName: 'GP10', gpioNumber: 10, category: 'spi', voltageLevel: '3.3V', ioCapability: 'Digital IO / SPI1 SCK', spi: 'SPI1_SCK', pwm: 'PWM5_A', practicalApplications: 'SPI1 Clock line.' },
      { pinNumber: 15, pinName: 'GP11', gpioNumber: 11, category: 'spi', voltageLevel: '3.3V', ioCapability: 'Digital IO / SPI1 TX', spi: 'SPI1_TX', pwm: 'PWM5_B', practicalApplications: 'SPI1 MOSI line.' },
      { pinNumber: 16, pinName: 'GP12', gpioNumber: 12, category: 'gpio', voltageLevel: '3.3V', ioCapability: 'Digital IO / PWM6_A', pwm: 'PWM6_A', practicalApplications: 'Servo motor control signal.' },
      { pinNumber: 17, pinName: 'GP13', gpioNumber: 13, category: 'gpio', voltageLevel: '3.3V', ioCapability: 'Digital IO / PWM6_B', pwm: 'PWM6_B', practicalApplications: 'Pushbutton input with internal pull-up.' },
      { pinNumber: 18, pinName: 'GND', category: 'ground', voltageLevel: '0V', ioCapability: 'Ground', practicalApplications: 'System ground.' },
      { pinNumber: 19, pinName: 'GP14', gpioNumber: 14, category: 'gpio', voltageLevel: '3.3V', ioCapability: 'Digital IO / PWM7_A', pwm: 'PWM7_A', practicalApplications: 'PIR motion sensor input.' },
      { pinNumber: 20, pinName: 'GP15', gpioNumber: 15, category: 'gpio', voltageLevel: '3.3V', ioCapability: 'Digital IO / PWM7_B', pwm: 'PWM7_B', practicalApplications: 'DHT11 / DHT22 one-wire bus.' }
    ],
    headerRight: [
      { pinNumber: 21, pinName: 'GP16', gpioNumber: 16, category: 'spi', voltageLevel: '3.3V', ioCapability: 'Digital IO / SPI0 RX', spi: 'SPI0_RX', pwm: 'PWM0_A', practicalApplications: 'SPI0 MISO data.' },
      { pinNumber: 22, pinName: 'GP17', gpioNumber: 17, category: 'spi', voltageLevel: '3.3V', ioCapability: 'Digital IO / SPI0 CS', spi: 'SPI0_CS', pwm: 'PWM0_B', practicalApplications: 'SPI0 Chip Select.' },
      { pinNumber: 23, pinName: 'GND', category: 'ground', voltageLevel: '0V', ioCapability: 'Ground', practicalApplications: 'System ground.' },
      { pinNumber: 24, pinName: 'GP18', gpioNumber: 18, category: 'spi', voltageLevel: '3.3V', ioCapability: 'Digital IO / SPI0 SCK', spi: 'SPI0_SCK', pwm: 'PWM1_A', practicalApplications: 'SPI0 Clock.' },
      { pinNumber: 25, pinName: 'GP19', gpioNumber: 19, category: 'spi', voltageLevel: '3.3V', ioCapability: 'Digital IO / SPI0 TX', spi: 'SPI0_TX', pwm: 'PWM1_B', practicalApplications: 'SPI0 MOSI line.' },
      { pinNumber: 26, pinName: 'GP20', gpioNumber: 20, category: 'i2c', voltageLevel: '3.3V', ioCapability: 'Digital IO / I2C0 SDA', i2c: 'I2C0_SDA', pwm: 'PWM2_A', practicalApplications: 'I2C0 SDA line.' },
      { pinNumber: 27, pinName: 'GP21', gpioNumber: 21, category: 'i2c', voltageLevel: '3.3V', ioCapability: 'Digital IO / I2C0 SCL', i2c: 'I2C0_SCL', pwm: 'PWM2_B', practicalApplications: 'I2C0 SCL line.' },
      { pinNumber: 28, pinName: 'GND', category: 'ground', voltageLevel: '0V', ioCapability: 'Ground', practicalApplications: 'System ground.' },
      { pinNumber: 29, pinName: 'GP22', gpioNumber: 22, category: 'gpio', voltageLevel: '3.3V', ioCapability: 'Digital IO / PWM3_A', pwm: 'PWM3_A', practicalApplications: 'General purpose digital IO.' },
      { pinNumber: 30, pinName: 'RUN', category: 'control', voltageLevel: '3.3V Pull-Up', ioCapability: 'Chip Enable Active-Low Reset', practicalApplications: 'Reset button.' },
      { pinNumber: 31, pinName: 'GP26 (ADC0)', gpioNumber: 26, category: 'adc', voltageLevel: '0 - 3.3V', ioCapability: 'Analog In / Digital IO', adc: 'ADC0 (12-bit)', pwm: 'PWM5_A', practicalApplications: 'Potentiometer, analog light sensor.' },
      { pinNumber: 32, pinName: 'GP27 (ADC1)', gpioNumber: 27, category: 'adc', voltageLevel: '0 - 3.3V', ioCapability: 'Analog In / Digital IO', adc: 'ADC1 (12-bit)', pwm: 'PWM5_B', practicalApplications: 'Analog temperature, current sensing.' },
      { pinNumber: 33, pinName: 'AGND', category: 'ground', voltageLevel: '0V', ioCapability: 'Analog Ground', practicalApplications: 'Dedicated low-noise return for ADC.' },
      { pinNumber: 34, pinName: 'GP28 (ADC2)', gpioNumber: 28, category: 'adc', voltageLevel: '0 - 3.3V', ioCapability: 'Analog In / Digital IO', adc: 'ADC2 (12-bit)', pwm: 'PWM6_A', practicalApplications: 'Third external analog channel.' },
      { pinNumber: 35, pinName: 'ADC_VREF', category: 'adc', voltageLevel: '3.3V Standard', ioCapability: 'ADC Voltage Reference', practicalApplications: 'Clean reference voltage for precise ADC conversions.' },
      { pinNumber: 36, pinName: '3V3_OUT', category: 'power', voltageLevel: '3.3V Output', ioCapability: 'Regulated 3.3V Supply', restrictions: 'Up to 300mA from onboard RT6150 buck-boost regulator.', practicalApplications: 'Powering 3.3V sensors and circuits.' },
      { pinNumber: 37, pinName: '3V3_EN', category: 'control', voltageLevel: 'Active High', ioCapability: 'Regulator Enable Pin', practicalApplications: 'Power management, shutting down 3.3V rail.' },
      { pinNumber: 38, pinName: 'GND', category: 'ground', voltageLevel: '0V', ioCapability: 'Ground', practicalApplications: 'System ground.' },
      { pinNumber: 39, pinName: 'VSYS', category: 'power', voltageLevel: '1.8V - 5.5V', ioCapability: 'System Supply Input/Output', practicalApplications: 'Powering Pico from 3x AA batteries or LiPo cell.' },
      { pinNumber: 40, pinName: 'VBUS', category: 'power', voltageLevel: '5.0V from USB', ioCapability: 'Micro-USB 5V Power', practicalApplications: '5V power feed directly from host USB cable.' }
    ]
  }
];

export const PIN_CONNECTION_TUTORIALS = [
  {
    id: 'led',
    name: 'LED (Light Emitting Diode)',
    difficulty: 'Beginner',
    circuitSnippet: 'MCU GPIO ---> [ 220Ω / 330Ω Resistor ] ---> Anode (+) LED (-) Cathode ---> GND',
    explanation: 'A current limiting resistor (220Ω - 330Ω) is mandatory. Without it, the forward voltage drop causes infinite current drain, burning the LED and destroying the microcontroller GPIO pin.',
    steps: [
      'Identify LED polarity: Long leg is Anode (+), short leg or flat edge is Cathode (-).',
      'Connect the Anode to a 220Ω or 330Ω resistor.',
      'Connect the other end of the resistor to the selected MCU GPIO pin (e.g. GPIO 2 or D13).',
      'Connect the Cathode (short leg) directly to the MCU GND pin.',
      'Configure the GPIO pin as OUTPUT in your code and write HIGH (1) to illuminate.'
    ],
    voltageNote: 'For 3.3V MCUs (ESP32/STM32/RP2040), a 220Ω resistor yields ~6-8mA safe current. For 5V MCUs (Arduino Uno), use 330Ω to keep current under 10mA.'
  },
  {
    id: 'push-button',
    name: 'Push Button (Tactile Switch)',
    difficulty: 'Beginner',
    circuitSnippet: 'MCU GPIO ---> Push Button Pin 1; Push Button Pin 2 ---> GND (with INPUT_PULLUP)',
    explanation: 'When a switch is open, the input pin must not float (which causes random 0 and 1 readings due to ambient electromagnetic noise). Using internal pull-up resistors (INPUT_PULLUP) keeps the line at HIGH (1) until pressed to GND (LOW / 0).',
    steps: [
      'Connect one leg of the tactile momentary switch to the designated MCU GPIO pin.',
      'Connect the diagonally opposite leg of the switch to MCU GND.',
      'In code, initialize the pin with pinMode(pin, INPUT_PULLUP);',
      'Digital reading will be HIGH (1) when not pressed, and LOW (0) when pressed (Active-Low logic).',
      'Add software debounce (15-30ms delay) to ignore mechanical contact bounce.'
    ],
    voltageNote: 'No external resistor needed when using microcontroller internal software pull-up resistors.'
  },
  {
    id: 'piezo-buzzer',
    name: 'Buzzer (Active vs Passive Piezo)',
    difficulty: 'Beginner',
    circuitSnippet: 'MCU PWM Pin ---> [ NPN Transistor Base via 1kΩ ] ---> Buzzer (+) to 5V/3.3V, (-) to Collector, Emitter to GND',
    explanation: 'Active buzzers sound a fixed tone when DC voltage is applied. Passive buzzers require a square wave PWM signal (e.g., tone(pin, frequency)) to oscillate the internal diaphragm.',
    steps: [
      'Connect Buzzer (+) to MCU 3.3V or 5V rail.',
      'For direct GPIO drive (piezo only < 15mA): Connect (-) to MCU PWM pin.',
      'For magnetic buzzers (> 30mA): Use a 2N2222 NPN transistor switch with a flyback diode 1N4148 in reverse parallel across the buzzer coil.',
      'Call tone(pin, 1000) for a 1 kHz tone, or noTone(pin) to silence.'
    ],
    voltageNote: 'Never connect heavy electromagnetic buzzers directly to 3.3V MCU pins without a transistor buffer.'
  },
  {
    id: 'dht11',
    name: 'DHT11 Temperature & Humidity Sensor',
    difficulty: 'Beginner',
    circuitSnippet: 'VCC -> 3.3V/5V, GND -> GND, DATA -> GPIO Pin with 4.7kΩ - 10kΩ Pull-Up Resistor to VCC',
    explanation: 'DHT11 communicates via a custom single-wire proprietary protocol. The master MCU pulls the line low for 18ms, releases it, and DHT11 transmits 40 bits of digital temperature, humidity, and checksum data.',
    steps: [
      'Pin 1 (VCC): Connect to 3.3V or 5V.',
      'Pin 2 (DATA): Connect to digital GPIO (e.g. GPIO 4 on ESP32 or D4 on Uno).',
      'Place a 4.7kΩ to 10kΩ pull-up resistor between Pin 1 (VCC) and Pin 2 (DATA) (many PCB breakout modules have this built-in).',
      'Pin 3: NC (No Connection on 4-pin packages).',
      'Pin 4 (GND): Connect to MCU GND.',
      'Readings take ~1 second to stabilize; do not query faster than 1 Hz (1 reading per second).'
    ],
    voltageNote: 'Works reliably on both 3.3V and 5.0V power rails.'
  },
  {
    id: 'hc-sr04',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    difficulty: 'Intermediate',
    circuitSnippet: 'VCC -> 5V, GND -> GND, TRIG -> MCU Pin, ECHO -> [ 1kΩ / 2kΩ Voltage Divider ] -> 3.3V MCU Pin',
    explanation: 'HC-SR04 sends an 8-cycle 40kHz ultrasound burst upon receiving a 10µs HIGH pulse on TRIG. The ECHO pin goes HIGH for the exact duration it takes for the echo sound wave to bounce back from the target.',
    steps: [
      'Connect VCC to 5V (standard HC-SR04 requires 5V to drive ultrasonic transducers).',
      'Connect GND to common MCU GND.',
      'Connect TRIG to MCU Digital Output pin (3.3V trigger is accepted by HC-SR04).',
      'CRITICAL FOR 3.3V MCUs (ESP32/STM32/RP2040): The ECHO pin outputs 5V TTL pulses! You MUST use a voltage divider: ECHO -> 1kΩ resistor -> MCU GPIO -> 2kΩ resistor -> GND to step down 5V to 3.33V safe level.',
      'Compute distance in cm: Distance = (PulseDuration_µs × 0.0343) / 2.'
    ],
    voltageNote: 'WARNING: Direct 5V ECHO output will destroy 3.3V ESP32/Pico GPIO pins. Always step down with a voltage divider!'
  },
  {
    id: 'pir-sensor',
    name: 'PIR Motion Sensor (HC-SR501)',
    difficulty: 'Beginner',
    circuitSnippet: 'VCC -> 5V, GND -> GND, OUT -> MCU Digital GPIO Pin',
    explanation: 'The Pyroelectric Infrared (PIR) sensor detects shifts in ambient thermal infrared radiation (wavelength ~10µm) emitted by moving warm bodies through a Fresnel lens array.',
    steps: [
      'Connect VCC to 5V (feeds onboard 3.3V regulator on HC-SR501 module).',
      'Connect GND to MCU GND.',
      'Connect OUT pin directly to any MCU Digital Input pin. The OUT pin outputs a clean 3.3V logic HIGH when motion is detected, and 0V when clear.',
      'Adjust Sensitivity potentiometer for detection distance (3 to 7 meters).',
      'Adjust Time-Delay potentiometer for trigger hold duration (3 to 300 seconds).'
    ],
    voltageNote: 'Even though powered by 5V, the HC-SR501 onboard regulator outputs safe 3.3V logic signals, making it 100% compatible with ESP32, STM32, and Arduino without level shifting!'
  },
  {
    id: 'servo-motor',
    name: 'SG90 Micro Servo Motor',
    difficulty: 'Intermediate',
    circuitSnippet: 'Red Wire -> External 5V Power; Brown/Black -> Common GND; Orange/Yellow -> MCU PWM Pin',
    explanation: 'RC servos use 50Hz PWM signals (20ms period). A 1.0ms pulse corresponds to 0°, 1.5ms to 90° (neutral center), and 2.0ms to 180° rotation.',
    steps: [
      'Brown/Black Wire: Connect to Common GND.',
      'Red Wire: Connect to EXTERNAL 5V power supply (capable of supplying at least 1 Ampere peak stall current). Do NOT power directly from MCU 3.3V/5V pin!',
      'Orange/Yellow Wire: Connect to MCU PWM-capable pin (e.g. GPIO 13 on ESP32 or D9 on Uno).',
      'Ensure the external 5V power ground is tied together with the microcontroller GND (common ground).',
      'Use the Servo library or hardware timer PWM channel to generate 50Hz pulses.'
    ],
    voltageNote: 'Powering a servo motor directly from an MCU development board 5V/3.3V pin causes voltage brownouts and microcontroller resets due to inductive motor back-EMF and stall spikes!'
  },
  {
    id: 'oled-display',
    name: 'SSD1306 0.96" I2C OLED Display (128x64)',
    difficulty: 'Intermediate',
    circuitSnippet: 'VCC -> 3.3V, GND -> GND, SCL -> MCU I2C Clock, SDA -> MCU I2C Data',
    explanation: 'High-contrast monochrome organic LED display communicating via I2C bus (standard hex address 0x3C or 0x3D). Requires only 2 communication lines for full pixel graphic buffer rendering.',
    steps: [
      'Connect VCC to 3.3V power (or 5V if module has onboard 662K 3.3V LDO).',
      'Connect GND to common GND.',
      'Connect SCL to MCU Hardware I2C Clock: GPIO 22 on ESP32, Pin A5 on Arduino Uno, PB6 on STM32, GP5 on RP2040 Pico.',
      'Connect SDA to MCU Hardware I2C Data: GPIO 21 on ESP32, Pin A4 on Arduino Uno, PB7 on STM32, GP4 on RP2040 Pico.',
      'Include Adafruit_SSD1306 and Adafruit_GFX libraries and call display.begin(SSD1306_SWITCHCAPVCC, 0x3C).'
    ],
    voltageNote: 'Standard modules have internal 4.7kΩ pull-up resistors to 3.3V. Safe for both 3.3V and 5V microcontrollers.'
  }
];
