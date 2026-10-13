/**
 * @author Nickolas Ramirez
 */
export class CurrentWeather {
  latitude: number;
  longitude: number;
  temperature: number;
  temperatureUnit: string;
  measuredAt: Date;

  constructor(props: {
    latitude: number;
    longitude: number;
    temperature: number;
    temperatureUnit: string;
    measuredAt: Date;
  }) {
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.temperature = props.temperature;
    this.temperatureUnit = props.temperatureUnit;
    this.measuredAt = props.measuredAt;
  }

  hasValidTemperature(): boolean {
    return Number.isFinite(this.temperature);
  }
}
