// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ButtonGroup from '@cloudscape-design/components/button-group';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Icon from '@cloudscape-design/components/icon';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';

interface WeatherData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
  precipitation_sum: number[];
  windspeed_10m_max: number[];
}

interface WeatherResponse {
  daily: WeatherData;
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
    windspeed_10m_max: string;
  };
}

interface DayForecast {
  date: string;
  dayName: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  precipitation: number;
  windSpeed: number;
}

type TempUnit = 'F' | 'C';

const weatherCodeDescriptions: Record<number, { description: string; icon: string; animation: string }> = {
  0: { description: 'Clear sky', icon: '☀️', animation: 'sunny' },
  1: { description: 'Mainly clear', icon: '🌤️', animation: 'partly-cloudy' },
  2: { description: 'Partly cloudy', icon: '⛅', animation: 'partly-cloudy' },
  3: { description: 'Overcast', icon: '☁️', animation: 'cloudy' },
  45: { description: 'Foggy', icon: '🌫️', animation: 'foggy' },
  48: { description: 'Depositing rime fog', icon: '🌫️', animation: 'foggy' },
  51: { description: 'Light drizzle', icon: '🌦️', animation: 'rainy' },
  53: { description: 'Moderate drizzle', icon: '🌦️', animation: 'rainy' },
  55: { description: 'Dense drizzle', icon: '🌧️', animation: 'rainy' },
  61: { description: 'Slight rain', icon: '🌧️', animation: 'rainy' },
  63: { description: 'Moderate rain', icon: '🌧️', animation: 'rainy' },
  65: { description: 'Heavy rain', icon: '⛈️', animation: 'stormy' },
  71: { description: 'Slight snow', icon: '🌨️', animation: 'snowy' },
  73: { description: 'Moderate snow', icon: '❄️', animation: 'snowy' },
  75: { description: 'Heavy snow', icon: '❄️', animation: 'snowy' },
  77: { description: 'Snow grains', icon: '❄️', animation: 'snowy' },
  80: { description: 'Slight rain showers', icon: '🌦️', animation: 'rainy' },
  81: { description: 'Moderate rain showers', icon: '🌧️', animation: 'rainy' },
  82: { description: 'Violent rain showers', icon: '⛈️', animation: 'stormy' },
  85: { description: 'Slight snow showers', icon: '🌨️', animation: 'snowy' },
  86: { description: 'Heavy snow showers', icon: '❄️', animation: 'snowy' },
  95: { description: 'Thunderstorm', icon: '⛈️', animation: 'stormy' },
  96: { description: 'Thunderstorm with hail', icon: '⛈️', animation: 'stormy' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️', animation: 'stormy' },
};

function getWeatherInfo(code: number) {
  return weatherCodeDescriptions[code] || { description: 'Unknown', icon: '❓', animation: 'default' };
}

function formatDate(dateString: string): { date: string; dayName: string } {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  if (targetDate.getTime() === today.getTime()) {
    return { date: dateString, dayName: 'Today' };
  } else if (targetDate.getTime() === tomorrow.getTime()) {
    return { date: dateString, dayName: 'Tomorrow' };
  }

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  return { date: dateString, dayName };
}

function fahrenheitToCelsius(temp: number): number {
  return Math.round(((temp - 32) * 5) / 9);
}

function convertTemp(temp: number, unit: TempUnit, fromFahrenheit: boolean = true): number {
  if (unit === 'F') {
    return temp;
  }
  return fromFahrenheit ? fahrenheitToCelsius(temp) : temp;
}

export function WeatherContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [tempUnit, setTempUnit] = useState<TempUnit>('F');

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?' +
            'latitude=37.7749&longitude=-122.4194&' +
            'daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,windspeed_10m_max&' +
            'current=temperature_2m&' +
            'temperature_unit=fahrenheit&' +
            'windspeed_unit=mph&' +
            'precipitation_unit=inch&' +
            'timezone=America/Los_Angeles&' +
            'forecast_days=7',
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data: WeatherResponse & { current: { temperature_2m: number } } = await response.json();

        const forecastData: DayForecast[] = data.daily.time.map((time, index) => {
          const { date, dayName } = formatDate(time);
          return {
            date,
            dayName,
            maxTemp: Math.round(data.daily.temperature_2m_max[index]),
            minTemp: Math.round(data.daily.temperature_2m_min[index]),
            weatherCode: data.daily.weathercode[index],
            precipitation: data.daily.precipitation_sum[index],
            windSpeed: Math.round(data.daily.windspeed_10m_max[index]),
          };
        });

        setForecast(forecastData);
        setCurrentTemp(Math.round(data.current.temperature_2m));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box textAlign="center" padding={{ vertical: 'xxl' }}>
          <Spinner size="large" />
          <Box variant="p" padding={{ top: 's' }}>
            Loading weather data...
          </Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box textAlign="center" color="text-status-error" padding={{ vertical: 'xxl' }}>
          <Icon name="status-warning" size="large" />
          <Box variant="h3" padding={{ top: 's', bottom: 'xs' }}>
            Error loading weather data
          </Box>
          <Box variant="p">{error}</Box>
        </Box>
      </Container>
    );
  }

  return (
    <SpaceBetween size="l">
      {currentTemp !== null && (
        <Container
          header={
            <Header
              variant="h2"
              actions={
                <ButtonGroup
                  items={[
                    { text: '°F', id: 'F', pressed: tempUnit === 'F' },
                    { text: '°C', id: 'C', pressed: tempUnit === 'C' },
                  ]}
                  onItemClick={({ detail }) => setTempUnit(detail.id as TempUnit)}
                />
              }
            >
              Current Weather
            </Header>
          }
        >
          <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
            <Box fontSize="display-l" fontWeight="bold">
              {convertTemp(currentTemp, tempUnit)}°{tempUnit}
            </Box>
            <Box variant="p" color="text-body-secondary">
              {forecast[0] && getWeatherInfo(forecast[0].weatherCode).description}
            </Box>
          </Grid>
        </Container>
      )}

      <Container header={<Header variant="h2">7-Day Forecast</Header>}>
        <div className="forecast-scroll-container">
          {forecast.map(item => {
            const weatherInfo = getWeatherInfo(item.weatherCode);
            return (
              <div key={item.date} className="forecast-card">
                <div className="forecast-card-header">
                  <Box variant="h3" fontSize="heading-m">
                    {item.dayName}
                  </Box>
                  <Box fontSize="body-s" color="text-body-secondary">
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Box>
                </div>

                <div className="forecast-card-body">
                  <div className={`weather-icon weather-${weatherInfo.animation}`}>
                    <Box fontSize="display-l">{weatherInfo.icon}</Box>
                  </div>
                  <Box variant="p" color="text-body-secondary" textAlign="center" padding={{ top: 'xs' }}>
                    {weatherInfo.description}
                  </Box>
                </div>

                <div className="forecast-card-details">
                  <SpaceBetween size="xs">
                    <div className="temp-row">
                      <Box variant="span" color="text-body-secondary">
                        High:
                      </Box>
                      <Box variant="span" fontWeight="bold">
                        {convertTemp(item.maxTemp, tempUnit)}°{tempUnit}
                      </Box>
                    </div>
                    <div className="temp-row">
                      <Box variant="span" color="text-body-secondary">
                        Low:
                      </Box>
                      <Box variant="span" fontWeight="bold">
                        {convertTemp(item.minTemp, tempUnit)}°{tempUnit}
                      </Box>
                    </div>
                    <div className="weather-detail">
                      <Icon name="trending-up" variant="subtle" />
                      <Box variant="span" fontSize="body-s">
                        Wind: {item.windSpeed} mph
                      </Box>
                    </div>
                    <div className="weather-detail">
                      <Icon name="status-info" variant="subtle" />
                      <Box variant="span" fontSize="body-s">
                        Precip: {item.precipitation}"
                      </Box>
                    </div>
                  </SpaceBetween>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </SpaceBetween>
  );
}
