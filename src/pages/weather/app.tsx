// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Badge from '@cloudscape-design/components/badge';
import ProgressBar from '@cloudscape-design/components/progress-bar';
import Alert from '@cloudscape-design/components/alert';
import Table from '@cloudscape-design/components/table';
import { Breadcrumbs } from '../commons';

interface WeatherData {
  current: {
    temperature: number;
    windSpeed: number;
    humidity: number;
    precipitation: number;
    weatherCode: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
    weather_code: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    wind_speed_10m: number[];
    weather_code: number[];
  };
}

const weatherCodeDescriptions: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Fog', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle', icon: '🌦️' },
  61: { description: 'Slight rain', icon: '🌧️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '🌧️' },
  71: { description: 'Slight snow', icon: '🌨️' },
  73: { description: 'Moderate snow', icon: '🌨️' },
  75: { description: 'Heavy snow', icon: '🌨️' },
  77: { description: 'Snow grains', icon: '🌨️' },
  80: { description: 'Slight rain showers', icon: '🌦️' },
  81: { description: 'Moderate rain showers', icon: '🌦️' },
  82: { description: 'Violent rain showers', icon: '🌦️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with hail', icon: '⛈️' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

export function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Sydney coordinates
        const latitude = -33.8688;
        const longitude = 151.2093;
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&hourly=temperature_2m,precipitation,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code&timezone=Australia/Sydney`
        );
        
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        setWeatherData({
          current: {
            temperature: Math.round(data.current.temperature_2m),
            windSpeed: Math.round(data.current.wind_speed_10m),
            humidity: Math.round(data.current.relative_humidity_2m),
            precipitation: Math.round(data.current.precipitation * 10) / 10,
            weatherCode: data.current.weather_code,
          },
          daily: data.daily,
          hourly: {
            time: data.hourly.time.slice(0, 24), // Next 24 hours
            temperature_2m: data.hourly.temperature_2m.slice(0, 24),
            precipitation: data.hourly.precipitation.slice(0, 24),
            wind_speed_10m: data.hourly.wind_speed_10m.slice(0, 24),
            weather_code: data.hourly.weather_code.slice(0, 24),
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const getWeatherDescription = (code: number) => {
    return weatherCodeDescriptions[code] || { description: 'Unknown', icon: '❓' };
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-AU', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  const formatTime = (dateString: string) => {
    return new Intl.DateTimeFormat('en-AU', {
      hour: 'numeric',
      hour12: true,
    }).format(new Date(dateString));
  };

  if (loading) {
    return (
      <AppLayout
        navigationHide
        toolsHide
        content={
          <ContentLayout
            header={
              <Header variant="h1">
                Weather Dashboard - Sydney
              </Header>
            }
          >
            <Container>
              <StatusIndicator type="loading">Loading weather data...</StatusIndicator>
            </Container>
          </ContentLayout>
        }
      />
    );
  }

  if (error) {
    return (
      <AppLayout
        navigationHide
        toolsHide
        content={
          <ContentLayout
            header={
              <Header variant="h1">
                Weather Dashboard - Sydney
              </Header>
            }
          >
            <Alert type="error" header="Failed to load weather data">
              {error}
            </Alert>
          </ContentLayout>
        }
      />
    );
  }

  if (!weatherData) {
    return null;
  }

  const currentWeather = getWeatherDescription(weatherData.current.weatherCode);

  // Prepare daily forecast data for table
  const dailyForecastItems = weatherData.daily.time.slice(0, 7).map((date, index) => ({
    date: formatDate(date),
    weather: getWeatherDescription(weatherData.daily.weather_code[index]),
    maxTemp: Math.round(weatherData.daily.temperature_2m_max[index]),
    minTemp: Math.round(weatherData.daily.temperature_2m_min[index]),
    precipitation: Math.round(weatherData.daily.precipitation_sum[index] * 10) / 10,
    windSpeed: Math.round(weatherData.daily.wind_speed_10m_max[index]),
  }));

  // Prepare hourly forecast data for table
  const hourlyForecastItems = weatherData.hourly.time.map((time, index) => ({
    time: formatTime(time),
    weather: getWeatherDescription(weatherData.hourly.weather_code[index]),
    temperature: Math.round(weatherData.hourly.temperature_2m[index]),
    precipitation: Math.round(weatherData.hourly.precipitation[index] * 10) / 10,
    windSpeed: Math.round(weatherData.hourly.wind_speed_10m[index]),
  }));

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={<Breadcrumbs items={[{ text: 'Weather Dashboard', href: '#/weather' }]} />}
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Real-time weather information and forecasts for Sydney, Australia using Open-Meteo API"
            >
              Weather Dashboard - Sydney
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Current Weather */}
            <Container header={<Header variant="h2">Current Weather</Header>}>
              <ColumnLayout columns={4} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">Temperature</Box>
                  <Box fontSize="heading-xl" fontWeight="bold" color="text-status-success">
                    {weatherData.current.temperature}°C
                  </Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">Condition</Box>
                  <SpaceBetween direction="horizontal" size="xs">
                    <Box fontSize="heading-m">{currentWeather.icon}</Box>
                    <Box fontSize="body-s">{currentWeather.description}</Box>
                  </SpaceBetween>
                </div>
                <div>
                  <Box variant="awsui-key-label">Wind Speed</Box>
                  <Box fontSize="body-m">{weatherData.current.windSpeed} km/h</Box>
                </div>
                <div>
                  <Box variant="awsui-key-label">Humidity</Box>
                  <SpaceBetween direction="vertical" size="xs">
                    <Box fontSize="body-m">{weatherData.current.humidity}%</Box>
                    <ProgressBar
                      value={weatherData.current.humidity}
                      variant="standalone"
                      additionalInfo={`${weatherData.current.humidity}%`}
                      description="Relative humidity"
                    />
                  </SpaceBetween>
                </div>
              </ColumnLayout>
            </Container>

            {/* 7-Day Forecast */}
            <Container header={<Header variant="h2">7-Day Forecast</Header>}>
              <Table
                columnDefinitions={[
                  {
                    id: 'date',
                    header: 'Date',
                    cell: item => item.date,
                  },
                  {
                    id: 'weather',
                    header: 'Weather',
                    cell: item => (
                      <SpaceBetween direction="horizontal" size="xs">
                        <Box>{item.weather.icon}</Box>
                        <Box>{item.weather.description}</Box>
                      </SpaceBetween>
                    ),
                  },
                  {
                    id: 'temperature',
                    header: 'Temperature',
                    cell: item => (
                      <SpaceBetween direction="horizontal" size="xs">
                        <Badge color="red">{item.maxTemp}°</Badge>
                        <Badge color="blue">{item.minTemp}°</Badge>
                      </SpaceBetween>
                    ),
                  },
                  {
                    id: 'precipitation',
                    header: 'Precipitation',
                    cell: item => `${item.precipitation} mm`,
                  },
                  {
                    id: 'wind',
                    header: 'Max Wind',
                    cell: item => `${item.windSpeed} km/h`,
                  },
                ]}
                items={dailyForecastItems}
                loadingText="Loading forecast"
                trackBy="date"
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No forecast data available
                    </Box>
                  </Box>
                }
              />
            </Container>

            {/* 24-Hour Forecast */}
            <Container header={<Header variant="h2">24-Hour Forecast</Header>}>
              <Table
                columnDefinitions={[
                  {
                    id: 'time',
                    header: 'Time',
                    cell: item => item.time,
                  },
                  {
                    id: 'weather',
                    header: 'Weather',
                    cell: item => (
                      <SpaceBetween direction="horizontal" size="xs">
                        <Box>{item.weather.icon}</Box>
                        <Box>{item.weather.description}</Box>
                      </SpaceBetween>
                    ),
                  },
                  {
                    id: 'temperature',
                    header: 'Temperature',
                    cell: item => `${item.temperature}°C`,
                  },
                  {
                    id: 'precipitation',
                    header: 'Precipitation',
                    cell: item => `${item.precipitation} mm`,
                  },
                  {
                    id: 'wind',
                    header: 'Wind Speed',
                    cell: item => `${item.windSpeed} km/h`,
                  },
                ]}
                items={hourlyForecastItems}
                loadingText="Loading forecast"
                trackBy="time"
                pagination={{
                  currentPageIndex: 1,
                  pagesCount: 1,
                }}
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No hourly data available
                    </Box>
                  </Box>
                }
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
