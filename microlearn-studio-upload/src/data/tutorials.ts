import { ProgrammingTutorial } from '../types';

export const TUTORIALS: ProgrammingTutorial[] = [
  {
    id: 'embedded-c-foundations',
    title: 'Embedded C: Direct Memory-Mapped Register Manipulation',
    language: 'C (Bare-Metal)',
    targetPlatform: 'Generic 32-bit Cortex-M / AVR',
    description: 'Learn the foundational principles of Embedded C: bitwise operations, volatile pointer access, and direct hardware register manipulation without external libraries or Arduino abstractions.',
    code: `/* Direct Memory-Mapped Register Manipulation in Embedded C */
#include <stdint.h>

// Define hardware register addresses for GPIO Port B
#define PORTB_BASE     0x40020400UL
#define GPIO_MODER_OFF 0x00UL
#define GPIO_ODR_OFF   0x14UL

// Typecast addresses to volatile pointers so compiler never optimizes out writes
#define GPIOB_MODER   (*(volatile uint32_t *)(PORTB_BASE + GPIO_MODER_OFF))
#define GPIOB_ODR     (*(volatile uint32_t *)(PORTB_BASE + GPIO_ODR_OFF))

void delay_cycles(volatile uint32_t count) {
  while (count--) {
    __asm("nop"); // Inline assembly no-operation opcode
  }
}

int main(void) {
  // Step 1: Configure Pin PB5 as Output (Mode bits = 01)
  GPIOB_MODER &= ~(0x3UL << (5 * 2)); // Clear mode bits 10 and 11
  GPIOB_MODER |=  (0x1UL << (5 * 2)); // Set bit 10 to '1' (General Output)

  while (1) {
    // Step 2: Set PB5 HIGH (Turn LED ON)
    GPIOB_ODR |= (1UL << 5);
    delay_cycles(1000000);

    // Step 3: Clear PB5 LOW (Turn LED OFF)
    GPIOB_ODR &= ~(1UL << 5);
    delay_cycles(1000000);
  }
}`,
    codeBreakdown: [
      { section: '#define GPIOB_MODER (*(volatile uint32_t *)...)', explanation: 'The volatile keyword tells the C optimizing compiler that the memory value can change outside program flow, preventing the compiler from caching or eliminating repeated register reads/writes.' },
      { section: 'GPIOB_MODER &= ~(0x3UL << (5 * 2));', explanation: 'Bitwise AND with an inverted mask clears the target two bits without corrupting any neighboring pin settings.' },
      { section: 'GPIOB_ODR |= (1UL << 5);', explanation: 'Bitwise OR with a 1 shifted 5 positions sets bit 5 to logic HIGH, asserting 3.3V on physical pin PB5.' },
      { section: 'GPIOB_ODR &= ~(1UL << 5);', explanation: 'Bitwise AND with an inverted 1-shifted mask resets bit 5 to logic LOW (0V).' }
    ],
    expectedOutput: `[Bare-Metal Kernel Boot]
Clock: APB Bus Enabled
MODER Configured: PB5 -> Output Push-Pull
LED State: High (3.3V) -> Low (0.0V) Cycling at 1.0 Hz`,
    commonErrors: [
      { error: 'Compiler deletes delay loop or register writes during -O2 / -O3 optimization.', cause: 'Missing the "volatile" keyword on hardware register pointers.', fix: 'Always cast hardware register addresses with *(volatile uint32_t *).' },
      { error: 'Toggling one pin inadvertently corrupts adjacent pins on the same port.', cause: 'Using direct assignment (PORT = val) instead of bitwise read-modify-write (PORT |= or PORT &=).', fix: 'Always use bitwise operators (|= and &=) or dedicated atomic Set/Reset registers (BSRR).' }
    ],
    debuggingTips: [
      'In debuggers (GDB / Keil / Ozone), inspect the Memory Watch window at the peripheral base address to confirm bits match the chip reference manual.',
      'Always verify that the peripheral clock is enabled in the Reset and Clock Control (RCC) register before writing to GPIO registers, otherwise a HardFault exception will trigger.'
    ]
  },
  {
    id: 'stm32-hal-uart-dma',
    title: 'STM32 HAL: Non-Blocking Circular UART DMA Reception',
    language: 'C (STM32 HAL / CMSIS)',
    targetPlatform: 'STM32CubeIDE / Keil / STM32F4',
    description: 'Implement rock-solid, non-blocking serial communication on ARM Cortex-M using the STM32 Hardware Abstraction Layer (HAL) with Direct Memory Access (DMA) circular ring buffering.',
    code: `/* STM32 HAL Circular UART DMA Driver */
#include "main.h"
#include <string.h>

#define RX_BUFFER_SIZE 64
uint8_t rx_buffer[RX_BUFFER_SIZE];
uint8_t tx_msg[] = "STM32 DMA Loopback Online\\r\\n";

extern UART_HandleTypeDef huart2;

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart) {
  if (huart->Instance == USART2) {
    // Called when the 64-byte circular buffer fills
    // Process serial data in background without dropped bytes!
    HAL_UART_Transmit(&huart2, (uint8_t *)"Buffer Full Event\\r\\n", 21, 100);
  }
}

int main(void) {
  HAL_Init();
  SystemClock_Config();
  MX_GPIO_Init();
  MX_DMA_Init();
  MX_USART2_UART_Init();

  // Transmit welcome message
  HAL_UART_Transmit(&huart2, tx_msg, strlen((char*)tx_msg), 1000);

  // Start continuous circular background reception into SRAM buffer
  HAL_UART_Receive_DMA(&huart2, rx_buffer, RX_BUFFER_SIZE);

  while (1) {
    // CPU is 100% free to execute control algorithms or enter sleep mode
    HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5); // Heartbeat LED
    HAL_Delay(500);
  }
}`,
    codeBreakdown: [
      { section: 'HAL_UART_Receive_DMA(&huart2, rx_buffer, 64);', explanation: 'Initializes the DMA stream to automatically copy bytes arriving from USART2 directly into the rx_buffer array in RAM with zero CPU intervention.' },
      { section: 'HAL_UART_RxCpltCallback(...)', explanation: 'Hardware interrupt callback executed by the HAL when the DMA transfer count register reaches zero.' }
    ],
    expectedOutput: `STM32 DMA Loopback Online
[Heartbeat] PA5 LED Blinking at 2 Hz
[DMA Stream] Autonomous packet reception without CPU interruption`,
    commonErrors: [
      { error: 'DMA works for one packet and then permanently halts.', cause: 'The DMA channel was initialized in "Normal" mode instead of "Circular" mode in STM32CubeMX.', fix: 'In CubeMX under USART DMA settings, set Mode to "Circular".' }
    ],
    debuggingTips: [
      'Use the STM32CubeIDE Live Expressions window to monitor the rx_buffer memory in real-time while typing into the serial terminal.'
    ]
  },
  {
    id: 'esp-idf-freertos',
    title: 'ESP-IDF: Multi-Tasking FreeRTOS Architecture on ESP32',
    language: 'C (ESP-IDF v5.x)',
    targetPlatform: 'Espressif ESP32 / ESP32-S3',
    description: 'Harness the true dual-core architecture of the ESP32 using the official FreeRTOS kernel in ESP-IDF to manage concurrent tasks, queues, and core pinning.',
    code: `/* Multi-Core FreeRTOS Application on ESP32 */
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"
#include "driver/gpio.h"
#include "esp_log.h"

static const char *TAG = "FREERTOS_APP";
static QueueHandle_t sensorQueue = NULL;

#define BLINK_GPIO GPIO_NUM_2

// Task 1: Runs on Core 0 (Sensor Sampling)
void sensor_task(void *pvParameters) {
  int telemetryValue = 0;
  while (1) {
    telemetryValue += 5;
    ESP_LOGI(TAG, "[Core %d] Sampling Sensor -> Value: %d", xPortGetCoreID(), telemetryValue);
    xQueueSend(sensorQueue, &telemetryValue, portMAX_DELAY);
    vTaskDelay(pdMS_TO_TICKS(1000)); // 1-second non-blocking delay
  }
}

// Task 2: Runs on Core 1 (UI / Actuator Processing)
void actuator_task(void *pvParameters) {
  int receivedValue = 0;
  while (1) {
    if (xQueueReceive(sensorQueue, &receivedValue, portMAX_DELAY) == pdTRUE) {
      ESP_LOGI(TAG, "[Core %d] Received Data: %d -> Updating LED", xPortGetCoreID(), receivedValue);
      gpio_set_level(BLINK_GPIO, 1);
      vTaskDelay(pdMS_TO_TICKS(100));
      gpio_set_level(BLINK_GPIO, 0);
    }
  }
}

void app_main(void) {
  // Configure LED GPIO
  gpio_reset_pin(BLINK_GPIO);
  gpio_set_direction(BLINK_GPIO, GPIO_MODE_OUTPUT);

  sensorQueue = xQueueCreate(10, sizeof(int));

  // Pin Task 1 to Core 0
  xTaskCreatePinnedToCore(sensor_task, "sensor_task", 2048, NULL, 5, NULL, 0);

  // Pin Task 2 to Core 1
  xTaskCreatePinnedToCore(actuator_task, "actuator_task", 2048, NULL, 5, NULL, 1);
}`,
    codeBreakdown: [
      { section: 'xTaskCreatePinnedToCore(..., 0);', explanation: 'Creates a FreeRTOS task and explicitly pins it to CPU Core 0, reserving Core 1 for radio Wi-Fi/Bluetooth or computational processing.' },
      { section: 'xQueueSend and xQueueReceive', explanation: 'Thread-safe inter-task communication mechanism preventing race conditions and shared memory corruption.' }
    ],
    expectedOutput: `I (320) FREERTOS_APP: [Core 0] Sampling Sensor -> Value: 5
I (325) FREERTOS_APP: [Core 1] Received Data: 5 -> Updating LED
I (1320) FREERTOS_APP: [Core 0] Sampling Sensor -> Value: 10
I (1325) FREERTOS_APP: [Core 1] Received Data: 10 -> Updating LED`,
    commonErrors: [
      { error: 'Guru Meditation Error: Core 0 panic (LoadProhibited or StackOverflow).', cause: 'Allocated task stack size (e.g. 1024 bytes) was too small for local stack buffers.', fix: 'Increase stack depth in xTaskCreate (e.g. 2048 or 4096 bytes).' }
    ],
    debuggingTips: [
      'Call uxTaskGetStackHighWaterMark() inside running tasks to measure unused stack space and prevent overflow crashes.'
    ]
  },
  {
    id: 'micropython-rp2040-pio',
    title: 'MicroPython: Programmable I/O (PIO) Assembly on RP2040',
    language: 'MicroPython / PIO ASM',
    targetPlatform: 'Raspberry Pi Pico (RP2040)',
    description: 'Use MicroPython on the Raspberry Pi Pico to write low-level PIO assembly code executed by hardware state machines to generate precise digital signals with sub-microsecond timing.',
    code: `# MicroPython PIO Square Wave Generator on Raspberry Pi Pico
from machine import Pin
import rp2

# Define PIO program running on dedicated hardware state machine
@rp2.asm_pio(set_init=rp2.PIO.OUT_LOW)
def square_wave():
    wrap_target()
    set(pins, 1) [31]  # Drive pin HIGH and delay 31 cycles
    set(pins, 0) [31]  # Drive pin LOW and delay 31 cycles
    wrap()

# Pin 25 is the Pico onboard LED
sm = rp2.StateMachine(0, square_wave, freq=2000, set_base=Pin(25))
sm.active(1) # Start state machine

print("PIO Hardware State Machine 0 active on GP25!")
print("LED is oscillating at exact hardware frequency with 0% CPU load.")`,
    codeBreakdown: [
      { section: '@rp2.asm_pio(...)', explanation: 'Decorator compiling Python-embedded assembly instructions into raw 16-bit RP2040 PIO machine code.' },
      { section: 'set(pins, 1) [31]', explanation: 'Sets designated GPIO pin HIGH and delays for 31 state machine clock cycles in a single deterministic instruction.' }
    ],
    expectedOutput: `PIO Hardware State Machine 0 active on GP25!
LED is oscillating at exact hardware frequency with 0% CPU load.`,
    commonErrors: [
      { error: 'State machine fails to output pulses.', cause: 'Forgot to call sm.active(1) to start the state machine clock.', fix: 'Ensure sm.active(1) is invoked after state machine binding.' }
    ],
    debuggingTips: [
      'Inspect the RP2040 FIFO registers and clock dividers in Thonny IDE to debug state machine stall states.'
    ]
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    category: 'mcu' as const,
    difficulty: 'Beginner' as const,
    question: 'Which of the following microcontroller families uses the open RISC-V architecture instead of proprietary ARM or Xtensa cores?',
    options: ['ESP32-C6', 'STM32F103C6T6A', 'ATmega328P', 'Raspberry Pi Pico (RP2040)'],
    correctIndex: 0,
    explanation: 'The ESP32-C6 incorporates a 32-bit RISC-V single-core RV32IMAC processor, unlike the original Xtensa ESP32 or ARM Cortex-M STM32/RP2040.'
  },
  {
    id: 'q2',
    category: 'pins' as const,
    difficulty: 'Intermediate' as const,
    question: 'On an ESP32 DevKit V1, which group of GPIO pins are strictly INPUT-ONLY and lack internal software pull-up or pull-down resistors?',
    options: ['GPIO 0, 2, 4, 5', 'GPIO 34, 35, 36 (VP), 39 (VN)', 'GPIO 12, 13, 14, 15', 'GPIO 21, 22, 25, 26'],
    correctIndex: 1,
    explanation: 'GPIOs 34, 35, 36 (VP), and 39 (VN) are connected to ADC1 and lack internal output drivers or pull-up/pull-down transistors. They can only function as inputs.'
  },
  {
    id: 'q3',
    category: 'sensors' as const,
    difficulty: 'Intermediate' as const,
    question: 'When interfacing a 5V HC-SR04 ultrasonic distance sensor with a 3.3V microcontroller (e.g. ESP32 or Raspberry Pi Pico), what circuit modification is mandatory on the ECHO pin?',
    options: [
      'A 1kΩ / 2kΩ resistive voltage divider to step down the 5V pulse to safe 3.3V',
      'A 100µF bypass capacitor in series with ECHO',
      'Connecting ECHO directly to an analog ADC pin',
      'A step-up boost converter to 9V'
    ],
    correctIndex: 0,
    explanation: 'The standard HC-SR04 outputs 5V TTL logic on its ECHO pin. Connecting 5V directly to a 3.3V non-5V-tolerant pin will destroy the microcontroller. A 1kΩ / 2kΩ voltage divider safely steps the voltage down to 3.33V.'
  },
  {
    id: 'q4',
    category: 'protocols' as const,
    difficulty: 'Advanced' as const,
    question: 'In the CAN Bus (ISO 11898) protocol, why does message ID 0x010 override message ID 0x020 during simultaneous transmission arbitration?',
    options: [
      'CAN is first-come-first-served based on clock synchronization',
      'A Dominant bit (logic 0) overrides a Recessive bit (logic 1); 0x010 has earlier dominant zeros in its identifier',
      'The CAN master decides node priority via polling',
      'Message 0x010 has a longer byte payload'
    ],
    correctIndex: 1,
    explanation: 'In CAN bus arbitration, logic 0 is dominant (driving 2.0V differential) and overrides logic 1 (recessive 0V differential). The lower numerical ID contains earlier dominant zeros, winning arbitration without losing any bits.'
  },
  {
    id: 'q5',
    category: 'embedded-c' as const,
    difficulty: 'Intermediate' as const,
    question: 'Why must hardware peripheral registers always be accessed through pointers declared with the "volatile" keyword in C?',
    options: [
      'To prevent the optimizing compiler from caching register reads in CPU registers or removing delay loops',
      'To enable floating point math operations on the register',
      'To automatically allocate the register in Flash ROM instead of RAM',
      'To encrypt the register contents during boot'
    ],
    correctIndex: 0,
    explanation: 'The volatile keyword informs the compiler that the value at that memory address can be modified at any time by hardware outside program execution flow, preventing the compiler from erroneously caching or optimizing away reads and writes.'
  },
  {
    id: 'q6',
    category: 'interview' as const,
    difficulty: 'Advanced' as const,
    question: 'What is the fundamental difference between the Harvard Architecture (used in AVR and 8051) and the Von Neumann Architecture (used in classic MSP430)?',
    options: [
      'Harvard has physically separate memories and buses for program instructions and data, allowing simultaneous fetch; Von Neumann shares a common bus and memory',
      'Harvard uses 64-bit processors, while Von Neumann uses only 8-bit',
      'Von Neumann requires external crystals, while Harvard does not',
      'Harvard cannot execute subroutines or interrupts'
    ],
    correctIndex: 0,
    explanation: 'Harvard architecture maintains distinct, physically segregated memory spaces and address/data buses for program code (ROM/Flash) and runtime variables (RAM), enabling instruction prefetch while simultaneously reading or writing data.'
  }
];
