export type MicrocontrollerFamily = 
  | 'ESP32'
  | 'STM32'
  | 'MSP430'
  | 'AVR'
  | 'RP2040'
  | '8051'
  | 'PIC';

export interface Microcontroller {
  id: string;
  name: string;
  family: MicrocontrollerFamily;
  manufacturer: string;
  core: string;
  architecture: string;
  clockMHz: number;
  flashKB: number;
  sramKB: number;
  eepromKB?: number;
  gpioCount: number;
  adcChannels: string;
  dacChannels: string;
  pwmChannels: string;
  interrupts: string;
  timers: string;
  uartCount: number;
  spiCount: number;
  i2cCount: number;
  canSupport: string;
  usbSupport: string;
  operatingVoltage: string;
  powerConsumption: string;
  pros: string[];
  cons: string[];
  applications: string[];
  devTools: string[];
  codeSnippet: string;
  beginnerProject: string;
  advancedProject: string;
  datasheetUrl?: string;
  badge?: string;
}

export type PinCategory = 'power' | 'ground' | 'gpio' | 'adc' | 'dac' | 'pwm' | 'uart' | 'spi' | 'i2c' | 'can' | 'control' | 'special';

export interface BoardPin {
  pinNumber: number; // physical pin on header
  pinName: string;   // silkscreen label
  gpioNumber?: number | string;
  category: PinCategory;
  voltageLevel: string; // e.g. "3.3V", "5V", "Power"
  ioCapability: string; // e.g. "Input / Output / Open-drain"
  adc?: string;
  dac?: string;
  pwm?: string;
  uart?: string;
  spi?: string;
  i2c?: string;
  alternateFunctions?: string[];
  restrictions?: string; // e.g., "Strapping pin (GPIO 0). High during boot."
  practicalApplications?: string;
}

export interface PinoutBoard {
  id: string;
  name: string;
  mcuChip: string;
  family: MicrocontrollerFamily;
  totalPins: number;
  headerLeft: BoardPin[];
  headerRight: BoardPin[];
  notes: string;
  voltageWarning?: string;
}

export interface Sensor {
  id: string;
  name: string;
  category: string;
  measurement: string;
  workingPrinciple: string;
  internalExplanation: string;
  pinConfiguration: Array<{ pin: string; function: string; type: string }>;
  operatingVoltage: string;
  outputType: 'Analog' | 'Digital' | 'I2C' | 'SPI' | 'UART' | '1-Wire' | 'Pulse/PWM';
  communicationProtocol: string;
  wiringDescription: string;
  supportedMcus: string[];
  exampleApplications: string[];
  arduinoCode: string;
  esp32Code: string;
  stm32Code?: string;
  sampleData: Array<Record<string, any>>;
  troubleshooting: Array<{ problem: string; solution: string }>;
  miniProject: { title: string; description: string; schematicTip: string };
  voltageWarning?: string;
}

export interface Experiment {
  id: string;
  experimentNumber: number;
  title: string;
  mcuId: string;
  boardName: string;
  sensorId: string;
  sensorName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  aim: string;
  requiredComponents: string[];
  circuitDiagramText: string;
  pinConnections: Array<{ sensorPin: string; mcuPin: string; wireColor: string; functionDesc: string }>;
  workingPrinciple: string;
  stepByStepProcedure: string[];
  sourceCode: {
    arduino?: string;
    esp32?: string;
    stm32?: string;
    c51?: string;
    pic?: string;
    msp430?: string;
  };
  expectedOutput: string;
  observations: string[];
  applications: string[];
  conclusion: string;
  wokwiId?: string; // For embedded Wokwi simulator
  simulationConfig: {
    stimulusName: string;
    stimulusMin: number;
    stimulusMax: number;
    stimulusStep: number;
    stimulusUnit: string;
    defaultStimulus: number;
    computeReading: (val: number) => {
      rawAdc: number;
      processedValue: number | string;
      status: 'Normal' | 'Warning' | 'Alert' | 'Triggered';
      logMessage: string;
      pinVoltage: number;
      indicatorActive: boolean;
    };
  };
}

export interface DatasetItem {
  id: string;
  name: string;
  sensorName: string;
  unit: string;
  description: string;
  normalRange: string;
  abnormalRange: string;
  columns: string[];
  data: Array<Record<string, any>>;
  stats: {
    min: number;
    max: number;
    avg: number;
    sampleCount: number;
    abnormalCount: number;
  };
}

export interface Project {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  targetMcu: string;
  abstract: string;
  problemStatement: string;
  objectives: string[];
  blockDiagramSteps: string[];
  components: Array<{ name: string; quantity: number; note: string }>;
  pinConnections: Array<{ module: string; modulePin: string; mcuPin: string; notes: string }>;
  circuitExplanation: string;
  workingExplanation: string;
  sourceCode: string;
  simulationNote?: string;
  datasetPreview?: Array<Record<string, any>>;
  realTimeApplication: string;
  advantages: string[];
  limitations: string[];
  futureImprovements: string[];
}

export interface Protocol {
  id: string;
  name: string;
  fullName: string;
  category: 'Bus' | 'Serial' | 'Peripheral' | 'Hardware Core';
  definition: string;
  workingPrinciple: string;
  signalPins: Array<{ pin: string; description: string; direction: string }>;
  timingDiagramSvgData?: string;
  timingExplanation: string;
  maxSpeed: string;
  maxDistance: string;
  practicalExample: string;
  codeSnippet: string;
  supportedMcus: string[];
  advantages: string[];
  disadvantages: string[];
}

export interface ProgrammingTutorial {
  id: string;
  title: string;
  language: string;
  targetPlatform: string;
  description: string;
  code: string;
  codeBreakdown: Array<{ section: string; explanation: string }>;
  expectedOutput: string;
  commonErrors: Array<{ error: string; cause: string; fix: string }>;
  debuggingTips: string[];
}

export interface QuizQuestion {
  id: string;
  category: 'mcu' | 'pins' | 'sensors' | 'protocols' | 'embedded-c' | 'interview';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserProgress {
  completedExperiments: string[];
  completedQuizzes: Record<string, number>; // quizId -> score percentage
  bookmarkedItems: string[];
  unlockedBadges: string[];
  lastVisitedPage: string;
}
