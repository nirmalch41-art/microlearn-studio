import { DatasetItem } from '../types';

export const SENSOR_DATASETS: DatasetItem[] = [
  {
    id: 'dht11-hvac-log',
    name: 'DHT11 Server Room Climate Telemetry',
    sensorName: 'DHT11 Temperature & Humidity Sensor',
    unit: '°C (Temperature) and % RH (Humidity)',
    description: 'Continuous 24-hour environmental climate telemetry sampled every 30 minutes inside a telecommunications server rack. Records normal cooling cycles, thermal dissipation trends, and an induced thermal spike during an air handler maintenance test.',
    normalRange: 'Temperature: 18°C – 26°C | Humidity: 40% – 60% RH',
    abnormalRange: 'Temperature > 30°C (Thermal Hazard) | Humidity > 75% RH (Condensation Risk)',
    columns: ['sample', 'timestamp', 'raw_adc', 'temperature_c', 'humidity_percent', 'heat_index_c', 'status'],
    data: [
      { sample: 1, timestamp: '00:00', raw_adc: 215, temperature_c: 21.5, humidity_percent: 45.0, heat_index_c: 21.2, status: 'Normal' },
      { sample: 2, timestamp: '01:00', raw_adc: 212, temperature_c: 21.2, humidity_percent: 44.5, heat_index_c: 20.9, status: 'Normal' },
      { sample: 3, timestamp: '02:00', raw_adc: 210, temperature_c: 21.0, humidity_percent: 44.0, heat_index_c: 20.7, status: 'Normal' },
      { sample: 4, timestamp: '03:00', raw_adc: 208, temperature_c: 20.8, humidity_percent: 43.5, heat_index_c: 20.5, status: 'Normal' },
      { sample: 5, timestamp: '04:00', raw_adc: 211, temperature_c: 21.1, humidity_percent: 44.0, heat_index_c: 20.8, status: 'Normal' },
      { sample: 6, timestamp: '05:00', raw_adc: 216, temperature_c: 21.6, humidity_percent: 45.5, heat_index_c: 21.3, status: 'Normal' },
      { sample: 7, timestamp: '06:00', raw_adc: 224, temperature_c: 22.4, humidity_percent: 48.0, heat_index_c: 22.1, status: 'Normal' },
      { sample: 8, timestamp: '07:00', raw_adc: 235, temperature_c: 23.5, humidity_percent: 51.0, heat_index_c: 23.4, status: 'Normal' },
      { sample: 9, timestamp: '08:00', raw_adc: 248, temperature_c: 24.8, humidity_percent: 54.0, heat_index_c: 24.9, status: 'Normal' },
      { sample: 10, timestamp: '09:00', raw_adc: 259, temperature_c: 25.9, humidity_percent: 56.5, heat_index_c: 26.2, status: 'Normal' },
      { sample: 11, timestamp: '10:00', raw_adc: 272, temperature_c: 27.2, humidity_percent: 61.0, heat_index_c: 28.0, status: 'Elevated' },
      { sample: 12, timestamp: '11:00', raw_adc: 298, temperature_c: 29.8, humidity_percent: 68.0, heat_index_c: 32.4, status: 'Elevated' },
      { sample: 13, timestamp: '12:00', raw_adc: 345, temperature_c: 34.5, humidity_percent: 78.5, heat_index_c: 42.1, status: 'Abnormal - High Heat' },
      { sample: 14, timestamp: '13:00', raw_adc: 362, temperature_c: 36.2, humidity_percent: 82.0, heat_index_c: 48.3, status: 'Abnormal - Critical' },
      { sample: 15, timestamp: '14:00', raw_adc: 315, temperature_c: 31.5, humidity_percent: 72.0, heat_index_c: 36.2, status: 'Elevated (Cooling Active)' },
      { sample: 16, timestamp: '15:00', raw_adc: 268, temperature_c: 26.8, humidity_percent: 59.0, heat_index_c: 27.5, status: 'Normal' },
      { sample: 17, timestamp: '16:00', raw_adc: 245, temperature_c: 24.5, humidity_percent: 52.0, heat_index_c: 24.5, status: 'Normal' },
      { sample: 18, timestamp: '17:00', raw_adc: 238, temperature_c: 23.8, humidity_percent: 49.0, heat_index_c: 23.7, status: 'Normal' },
      { sample: 19, timestamp: '18:00', raw_adc: 231, temperature_c: 23.1, humidity_percent: 47.0, heat_index_c: 22.9, status: 'Normal' },
      { sample: 20, timestamp: '19:00', raw_adc: 227, temperature_c: 22.7, humidity_percent: 46.5, heat_index_c: 22.5, status: 'Normal' },
      { sample: 21, timestamp: '20:00', raw_adc: 224, temperature_c: 22.4, humidity_percent: 46.0, heat_index_c: 22.1, status: 'Normal' },
      { sample: 22, timestamp: '21:00', raw_adc: 220, temperature_c: 22.0, humidity_percent: 45.5, heat_index_c: 21.7, status: 'Normal' },
      { sample: 23, timestamp: '22:00', raw_adc: 218, temperature_c: 21.8, humidity_percent: 45.0, heat_index_c: 21.5, status: 'Normal' },
      { sample: 24, timestamp: '23:00', raw_adc: 216, temperature_c: 21.6, humidity_percent: 45.0, heat_index_c: 21.3, status: 'Normal' }
    ],
    stats: {
      min: 20.8,
      max: 36.2,
      avg: 24.7,
      sampleCount: 24,
      abnormalCount: 2
    }
  },
  {
    id: 'hc-sr04-tank-level',
    name: 'HC-SR04 Industrial Water Tank Level',
    sensorName: 'HC-SR04 Ultrasonic Distance Sensor',
    unit: 'Centimeters (cm) and Liters (L)',
    description: 'Echo flight duration and computed liquid surface level inside a 200 cm vertical water reserve reservoir during continuous fill and drainage cycles.',
    normalRange: '30 cm – 170 cm (Reservoir depth between 15% and 85%)',
    abnormalRange: '< 20 cm (Tank Overflow Warning) | > 185 cm (Tank Empty / Pump Dry-Run Risk)',
    columns: ['sample', 'timestamp', 'echo_pulse_us', 'distance_cm', 'tank_level_percent', 'volume_liters', 'status'],
    data: [
      { sample: 1, timestamp: '06:00', echo_pulse_us: 10495, distance_cm: 180.0, tank_level_percent: 10.0, volume_liters: 120, status: 'Low Level Warning' },
      { sample: 2, timestamp: '07:00', echo_pulse_us: 9329, distance_cm: 160.0, tank_level_percent: 20.0, volume_liters: 240, status: 'Normal' },
      { sample: 3, timestamp: '08:00', echo_pulse_us: 8163, distance_cm: 140.0, tank_level_percent: 30.0, volume_liters: 360, status: 'Normal' },
      { sample: 4, timestamp: '09:00', echo_pulse_us: 6997, distance_cm: 120.0, tank_level_percent: 40.0, volume_liters: 480, status: 'Normal' },
      { sample: 5, timestamp: '10:00', echo_pulse_us: 5831, distance_cm: 100.0, tank_level_percent: 50.0, volume_liters: 600, status: 'Normal' },
      { sample: 6, timestamp: '11:00', echo_pulse_us: 4665, distance_cm: 80.0, tank_level_percent: 60.0, volume_liters: 720, status: 'Normal' },
      { sample: 7, timestamp: '12:00', echo_pulse_us: 3499, distance_cm: 60.0, tank_level_percent: 70.0, volume_liters: 840, status: 'Normal' },
      { sample: 8, timestamp: '13:00', echo_pulse_us: 2332, distance_cm: 40.0, tank_level_percent: 80.0, volume_liters: 960, status: 'Normal' },
      { sample: 9, timestamp: '14:00', echo_pulse_us: 1166, distance_cm: 20.0, tank_level_percent: 90.0, volume_liters: 1080, status: 'Normal' },
      { sample: 10, timestamp: '15:00', echo_pulse_us: 583, distance_cm: 10.0, tank_level_percent: 95.0, volume_liters: 1140, status: 'Abnormal - High Spill Risk' },
      { sample: 11, timestamp: '16:00', echo_pulse_us: 2915, distance_cm: 50.0, tank_level_percent: 75.0, volume_liters: 900, status: 'Normal (Pump Draining)' },
      { sample: 12, timestamp: '17:00', echo_pulse_us: 5831, distance_cm: 100.0, tank_level_percent: 50.0, volume_liters: 600, status: 'Normal' }
    ],
    stats: {
      min: 10.0,
      max: 180.0,
      avg: 88.3,
      sampleCount: 12,
      abnormalCount: 1
    }
  },
  {
    id: 'mq135-iaq-dataset',
    name: 'MQ-135 Industrial Workshop Air Quality',
    sensorName: 'MQ-135 Gas & Smoke Sensor',
    unit: 'Raw ADC (0-4095) and Estimated PPM',
    description: 'Analog potential readings capturing ambient air quality in an electronics fabrication workshop through soldering activities, solvent cleaning, and night ventilation.',
    normalRange: 'Raw ADC: 300 – 1200 | Estimated PPM: 10 – 75 PPM',
    abnormalRange: 'Raw ADC > 2500 | Estimated PPM > 200 PPM (Hazardous Solvent / Smoke Build-up)',
    columns: ['sample', 'timestamp', 'raw_adc', 'voltage_v', 'estimated_ppm', 'air_quality_status'],
    data: [
      { sample: 1, timestamp: '08:00', raw_adc: 420, voltage_v: 0.34, estimated_ppm: 22, air_quality_status: 'Good' },
      { sample: 2, timestamp: '09:00', raw_adc: 680, voltage_v: 0.55, estimated_ppm: 38, air_quality_status: 'Good' },
      { sample: 3, timestamp: '10:00', raw_adc: 1150, voltage_v: 0.93, estimated_ppm: 72, air_quality_status: 'Moderate (Soldering Started)' },
      { sample: 4, timestamp: '11:00', raw_adc: 1980, voltage_v: 1.60, estimated_ppm: 145, air_quality_status: 'Unhealthy for Sensitive Groups' },
      { sample: 5, timestamp: '12:00', raw_adc: 3120, voltage_v: 2.51, estimated_ppm: 360, air_quality_status: 'Abnormal - Hazardous Spike' },
      { sample: 6, timestamp: '13:00', raw_adc: 2750, voltage_v: 2.21, estimated_ppm: 280, air_quality_status: 'Abnormal - High Fume Concentration' },
      { sample: 7, timestamp: '14:00', raw_adc: 1650, voltage_v: 1.33, estimated_ppm: 110, air_quality_status: 'Moderate (Exhaust Fans ON)' },
      { sample: 8, timestamp: '15:00', raw_adc: 890, voltage_v: 0.72, estimated_ppm: 52, air_quality_status: 'Good' },
      { sample: 9, timestamp: '16:00', raw_adc: 540, voltage_v: 0.44, estimated_ppm: 29, air_quality_status: 'Good' },
      { sample: 10, timestamp: '17:00', raw_adc: 460, voltage_v: 0.37, estimated_ppm: 24, air_quality_status: 'Good' }
    ],
    stats: {
      min: 420,
      max: 3120,
      avg: 1364,
      sampleCount: 10,
      abnormalCount: 2
    }
  },
  {
    id: 'ina219-ev-telemetry',
    name: 'INA219 EV Battery Pack Discharge Cycle',
    sensorName: 'INA219 Current & Power Sensor',
    unit: 'Volts (V), Amperes (A), and Watts (W)',
    description: 'High-side current shunt measurements of a 12V LiFePO4 battery pack driving an electric scooter motor through acceleration, hill climbs, and regenerative deceleration.',
    normalRange: 'Bus Voltage: 12.0V – 14.4V | Current: 0.1A – 8.0A',
    abnormalRange: 'Bus Voltage < 10.5V (Overdischarge Hazard) | Current > 15.0A (Overcurrent)',
    columns: ['sample', 'timestamp', 'bus_voltage_v', 'current_a', 'power_w', 'pack_status'],
    data: [
      { sample: 1, timestamp: '00:00:10', bus_voltage_v: 13.80, current_a: 0.45, power_w: 6.2, pack_status: 'Standby / Idle' },
      { sample: 2, timestamp: '00:00:20', bus_voltage_v: 13.62, current_a: 3.80, power_w: 51.7, pack_status: 'Cruising' },
      { sample: 3, timestamp: '00:00:30', bus_voltage_v: 13.45, current_a: 6.20, power_w: 83.4, pack_status: 'Cruising' },
      { sample: 4, timestamp: '00:00:40', bus_voltage_v: 12.90, current_a: 14.80, power_w: 190.9, pack_status: 'Peak Acceleration' },
      { sample: 5, timestamp: '00:00:50', bus_voltage_v: 12.40, current_a: 17.50, power_w: 217.0, pack_status: 'Abnormal - Overcurrent Trip' },
      { sample: 6, timestamp: '00:01:00', bus_voltage_v: 13.50, current_a: -2.10, power_w: -28.3, pack_status: 'Regenerative Braking' },
      { sample: 7, timestamp: '00:01:10', bus_voltage_v: 13.55, current_a: 0.50, power_w: 6.8, pack_status: 'Standby' }
    ],
    stats: {
      min: 12.40,
      max: 13.80,
      avg: 13.31,
      sampleCount: 7,
      abnormalCount: 1
    }
  }
];
