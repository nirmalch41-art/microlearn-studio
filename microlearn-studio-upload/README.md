# MicroLearn Studio – Microcontroller Learning & Simulation Platform

**MicroLearn Studio** is a modern, responsive educational web platform engineered specifically for **Electronics and Communication Engineering (ECE)** students, embedded developers, and hardware enthusiasts. It bridges the gap between theoretical semiconductor physics and real-world embedded firmware development through interactive pinout diagrams, live browser simulations, time-series telemetry charts, and datasheet-grounded specifications.

---

## 🚀 Key Features

### 1. 🎛️ Interactive Pin Configuration Explorer
- **10 Development Boards Covered**: ESP32 DevKit V1, ESP32-S3 DevKit, ESP32-C6, STM32F103 Blue Pill, STM32 Nucleo F446RE, Arduino Uno R3 (ATmega328P), Raspberry Pi Pico (RP2040), TI MSP430 LaunchPad, 8051 Board, and PIC16F877A.
- **Interactive Visual Pinout**: Every physical header pin is clickable, highlighting electrical ratings, silicon GPIO numbers, voltage thresholds (3.3V vs 5V logic warnings), strapping pins, and alternate functions.
- **Peripheral Assignment Tool**: Filter header pins dynamically by ADC, DAC, PWM, UART, SPI, or I2C.
- **Step-by-Step Wiring Guides**: Clear schematics and explanations for LEDs, Push-buttons, Buzzers, DHT11, HC-SR04, PIR sensors, Servo motors, and SSD1306 OLED displays.

### 2. 🔬 Virtual Electronics Simulation Lab
- **8 Prebuilt Guided Experiments**:
  1. *ESP32 + DHT11*: Temperature and humidity monitoring with single-wire handshake.
  2. *STM32F103 + HC-SR04*: Ultrasonic distance measurement with 5V-to-3.3V voltage divider.
  3. *Arduino Uno + LDR*: Automatic streetlight with software hysteresis.
  4. *ESP32 + MQ-135*: 12-bit ADC hazardous air quality monitoring.
  5. *Raspberry Pi Pico + PIR*: Interrupt-driven motion detection alarm.
  6. *Intel 8051 + LED*: CISC Harvard machine-cycle delay blinking.
  7. *Microchip PIC16 + Push Button*: Debounced switch port manipulation.
  8. *TI MSP430 + Internal Sensor*: Ultra-low-power temperature sensing in LPM3 (< 0.5 µA).
- **Live Physical Stimulus Sliders**: Adjust temperature (°C), distance (cm), light (Lux), gas (PPM), and motion states in real-time.
- **Virtual UART Serial Monitor**: Configurable 9600 / 115200 baud streaming with auto-scroll.
- **Real-Time Telemetry Plotter**: Recharts time-series waveform tracing of simulated voltages and sensor outputs.
- **Wokwi Integration**: Links and embedded targets for cycle-accurate AVR, ESP32, and RP2040 circuit simulations.

### 3. 🧠 Comprehensive Microcontroller Learning Module
- **7 MCU Architectures Covered**:
  - **Espressif ESP32**: ESP32 Dual-Core LX6, ESP32-S3 Vector AI, ESP32-C6 RISC-V.
  - **STMicroelectronics STM32**: STM32F (F103 & F446RE), STM32L, STM32U, STM32H (480MHz H743ZI).
  - **Texas Instruments MSP430**: 16-bit orthogonal RISC with sub-microamp LPM modes.
  - **Microchip AVR**: ATmega328P (Arduino Uno standard) with native 5V logic.
  - **Raspberry Pi RP2040**: Dual Cortex-M0+ with Programmable I/O (PIO) state machines.
  - **Intel 8051**: Foundational 12T/1T Harvard architecture.
  - **Microchip PIC**: PIC16 8-bit mid-range and PIC32 32-bit MIPS.
- **20-Point Technical Deep Dive**: Architecture, Memory, Clock, GPIO, ADC/DAC, PWM, Interrupts, Timers, Busses, Power consumption, Pros/Cons, Dev tools, and Code examples.

### 4. 📡 Sensor Library (23 Categories & 50+ Sensors)
- Categorized by: Temperature, Humidity, Light, Distance, Motion, Gas, Pressure, Weight/Force, Water/Liquid, Energy/Current, Biomedical, Navigation, Acoustic, Fire/Safety, Security, Magnetic, Robotics, and Chemical.
- Sensor profiles: Physical principles, internal circuitry, pinouts, operating voltages, wiring notes, Arduino / ESP32 / STM32 firmware drivers, troubleshooting guides, and capstone mini projects.

### 5. 📊 Sensor Dataset Explorer & Analytics
- Multi-channel datasets: DHT11 HVAC logs, HC-SR04 industrial tank levels, MQ-135 workshop air quality, INA219 EV battery discharge cycles.
- Interactive Line charts, Bar charts, and Data tables.
- Statistical metrics: Min, Max, Average, Sample count, and Abnormal count.
- **True CSV & JSON File Exporting & Importing**: Download telemetry or upload custom CSV datasets to generate charts instantly.
- Dataset comparison tool for dual-sensor benchmarking.

### 6. 🛠️ Real-World Engineering Projects
- 16 production-grade project guides categorized across Beginner, Intermediate, and Advanced tiers.
- Complete with Problem statements, Objectives, Block diagrams, Bill of Materials, Interconnect matrices, and Source code.
- Highlights: *CAN-Bus EV Battery Management System*, *TinyML Motor Predictive Maintenance*, *Smart Solar Irrigation*, *Adaptive Highway Streetlight*.

### 7. 🔌 Communication Protocols & Programming Tutorials
- Interactive guides on **UART**, **SPI**, **I2C**, **CAN Bus**, **PWM**, **ADC**, and **DMA**.
- Code Editor tutorials for Embedded C, Arduino C++, STM32 HAL, ESP-IDF FreeRTOS, and MicroPython PIO Assembly.
- Simulated Cross-Compiler diagnostic engine with ROM/RAM budgeting.

### 8. 🎓 Quizzes & ECE Credentials
- Categorized MCQ assessments covering Microcontrollers, Pinouts, Sensors, Protocols, Embedded C, and Technical Interview Questions.
- Instant scoring, answer keys, and technical explanations.
- Printable / Exportable **Official Certificate of Completion** with unique verification hashes.

---

## 📂 Project Structure

```
microlearn-studio/
├── dist/                          # Production build output
├── public/                        # Static assets & icons
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Brand logo, global search, quick stats & theme toggle
│   │   │   ├── Sidebar.tsx        # 11 ECE curriculum links with live indicators
│   │   │   ├── SearchModal.tsx    # Global instant search across all MCUs, pins & sensors
│   │   │   └── Footer.tsx         # ECE reference links, datasheets & legal transparency
│   │   └── views/
│   │       ├── DashboardView.tsx          # Homepage with metrics, popular boards & lab cards
│   │       ├── MicrocontrollersView.tsx  # Dedicated 20-point technical pages for 7 families
│   │       ├── PinConfigurationView.tsx   # Visual interactive clickable pinout explorer
│   │       ├── SensorLibraryView.tsx      # Comprehensive 23-category sensor catalog
│   │       ├── VirtualLabView.tsx         # Real-time simulation lab with stimulus & serial
│   │       ├── ProjectLibraryView.tsx     # 16 Beginner/Intermediate/Advanced ECE projects
│   │       ├── DatasetExplorerView.tsx    # CSV/JSON time-series charts, upload & export
│   │       ├── CommunicationProtocolsView.tsx # Protocol deep dives (UART, SPI, I2C, CAN, DMA)
│   │       ├── ProgrammingTutorialsView.tsx   # Embedded C, HAL & IDF compiler workspace
│   │       ├── QuizzesView.tsx            # MCQ assessments, scoring & answer keys
│   │       └── LearningProgressView.tsx   # Badges, bookmarks & printable completion certificate
│   ├── context/
│   │   └── LearningContext.tsx    # LocalStorage persistence, bookmarks, progress & theme
│   ├── data/
│   │   ├── mcus.ts                # 7 Microcontroller families with part-specific specs
│   │   ├── pins.ts                # 10 Board pinouts & step-by-step connection guides
│   │   ├── sensors.ts             # 50+ Sensors with working principles & driver code
│   │   ├── experiments.ts         # 8 Full guided virtual lab simulation experiments
│   │   ├── datasets.ts            # Realistic multi-channel sensor datasets
│   │   ├── projects.ts            # 16 Detailed engineering project blueprints
│   │   ├── protocols.ts           # 7 Communication protocol architectural guides
│   │   └── tutorials.ts           # Code tutorials, common errors & quiz question bank
│   ├── types/
│   │   └── index.ts               # Core TypeScript interfaces & data models
│   ├── App.tsx                    # Top-level application layout
│   ├── main.tsx                   # React 18 DOM root & provider wrapper
│   └── index.css                  # Tailwind styles, circuit grid lines & glowing indicators
├── index.html                     # HTML5 entrypoint with Google Fonts
├── package.json                   # Dependencies (React, Vite, Tailwind, Lucide, Recharts)
├── tailwind.config.js             # Navy dark theme, cyan/purple circuit accents
├── tsconfig.json                  # TypeScript compiler options
└── vite.config.ts                 # Vite bundler configuration
```

---

## 💻 Installation & Running Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on Node.js v24)
- **npm**: v9.0.0 or higher (or pnpm / yarn)

### 1. Navigate to the Project Directory
```powershell
cd C:\Users\nirma\.gemini\antigravity\scratch\microlearn-studio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port specified in terminal).

### 4. Build for Production
```bash
npm run build
```
The optimized bundle will be compiled into the `dist/` directory.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 🗄️ Database & Storage Architecture

MicroLearn Studio is designed to run efficiently client-side while providing scalable hooks for backend services:

1. **Client-Side Persistence (Default)**:
   - User progress, completed experiments, quiz scores, and saved bookmarks are automatically synchronized to browser `localStorage`.
   - Datasets are stored in JSON/CSV format and can be exported or imported dynamically without external database dependencies.

2. **Supabase / PostgreSQL Integration (Optional)**:
   - For multi-user classrooms or cloud telemetry syncing, configure Supabase tables:
   ```sql
   -- Users Table
   CREATE TABLE users (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       email TEXT UNIQUE NOT NULL,
       full_name TEXT,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Student Progress Table
   CREATE TABLE student_progress (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       user_id UUID REFERENCES users(id) ON DELETE CASCADE,
       completed_experiments TEXT[] DEFAULT '{}',
       quiz_scores JSONB DEFAULT '{}'::jsonb,
       bookmarked_items JSONB DEFAULT '[]'::jsonb,
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Custom Sensor Telemetry Datasets
   CREATE TABLE sensor_telemetry (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       sensor_id TEXT NOT NULL,
       timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       raw_adc NUMERIC,
       physical_value NUMERIC,
       unit TEXT,
       status TEXT
   );
   ```

---

## 📋 Features Completed vs External Hardware Integration

| Module | Completed In-App | External Hardware / Emulator Dependent |
| :--- | :--- | :--- |
| **Microcontrollers** | ✅ 7 Families (ESP32, STM32, MSP430, AVR, RP2040, 8051, PIC) with 20 technical points | Physical flashing requires ST-LINK, USB-UART, or PICkit |
| **Pin Configuration** | ✅ Interactive clickable pinout diagrams for 10 boards with voltage alerts | Physical breadboard & jumper wires for bench test |
| **Sensor Library** | ✅ 23 Categories, wiring diagrams, Arduino/ESP32/STM32 drivers, troubleshooting | Physical transducer components (e.g. DHT11, MQ-135) |
| **Virtual Lab** | ✅ 8 Interactive experiments with stimulus sliders, live serial monitor & waveform scope | Cycle-accurate transistor simulation supported via Wokwi embed |
| **Dataset Explorer** | ✅ Time-series charts, statistics, CSV/JSON export & CSV file upload | Live hardware datalogging over WebSerial API |
| **Project Library** | ✅ 16 Beginner, Intermediate & Advanced engineering blueprints | Physical fabrication of custom PCB shields |
| **Protocols & Code** | ✅ 7 Protocol guides, non-blocking DMA tutorials, cross-compiler validator | Real logic analyzer (Saleae) or oscilloscope for bench probing |
| **Quizzes & Badges** | ✅ MCQ engine, instant feedback, scoring, and printable certificate | Formal university proctored examination |
