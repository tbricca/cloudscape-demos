// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Cards from '@cloudscape-design/components/cards';
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

const weatherCodeDescriptions: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Foggy', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  61: { description: 'Slight rain', icon: '🌧️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '⛈️' },
  71: { description: 'Slight snow', icon: '🌨️' },
  73: { description: 'Moderate snow', icon: '❄️' },
  75: { description: 'Heavy snow', icon: '❄️' },
  77: { description: 'Snow grains', icon: '❄️' },
  80: { description: 'Slight rain showers', icon: '🌦️' },
  81: { description: 'Moderate rain showers', icon: '🌧️' },
  82: { description: 'Violent rain showers', icon: '⛈️' },
  85: { description: 'Slight snow showers', icon: '🌨️' },
  86: { description: 'Heavy snow showers', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with hail', icon: '⛈️' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

function getWeatherInfo(code: number) {
  return weatherCodeDescriptions[code] || { description: 'Unknown', icon: '❓' };
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

export function WeatherContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);

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
        <Container>
          <SpaceBetween size="s">
            <Header variant="h2">Current Weather</Header>
            <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
              <Box fontSize="display-l" fontWeight="bold">
                {currentTemp}°F
              </Box>
              <Box variant="p" color="text-body-secondary">
                {forecast[0] && getWeatherInfo(forecast[0].weatherCode).description}
              </Box>
            </Grid>
          </SpaceBetween>
        </Container>
      )}

      <Cards
        cardDefinition={{
          header: item => (
            <SpaceBetween size="xxs">
              <Box variant="h3">{item.dayName}</Box>
              <Box fontSize="body-s" color="text-body-secondary">
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Box>
            </SpaceBetween>
          ),
          sections: [
            {
              id: 'weather',
              content: item => (
                <Box textAlign="center" padding={{ vertical: 's' }}>
                  <Box fontSize="display-l" padding={{ bottom: 'xs' }}>
                    {getWeatherInfo(item.weatherCode).icon}
                  </Box>
                  <Box variant="p" color="text-body-secondary">
                    {getWeatherInfo(item.weatherCode).description}
                  </Box>
                </Box>
              ),
            },
            {
              id: 'temperature',
              content: item => (
                <SpaceBetween size="xs">
                  <div className="temp-row">
                    <Box variant="span" color="text-body-secondary">
                      High:
                    </Box>
                    <Box variant="span" fontWeight="bold">
                      {item.maxTemp}°F
                    </Box>
                  </div>
                  <div className="temp-row">
                    <Box variant="span" color="text-body-secondary">
                      Low:
                    </Box>
                    <Box variant="span" fontWeight="bold">
                      {item.minTemp}°F
                    </Box>
                  </div>
                </SpaceBetween>
              ),
            },
            {
              id: 'details',
              content: item => (
                <SpaceBetween size="xs">
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
              ),
            },
          ],
        }}
        cardsPerRow={[
          { cards: 1, minWidth: 0 },
          { cards: 2, minWidth: 600 },
          { cards: 3, minWidth: 900 },
          { cards: 4, minWidth: 1200 },
        ]}
        items={forecast}
        trackBy="date"
        header={<Header variant="h2">7-Day Forecast</Header>}
      />
    </SpaceBetween>
  );
}
