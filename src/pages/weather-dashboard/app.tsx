// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Autosuggest, { AutosuggestProps } from '@cloudscape-design/components/autosuggest';
import Cards from '@cloudscape-design/components/cards';
import Link from '@cloudscape-design/components/link';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Badge from '@cloudscape-design/components/badge';
import { format } from 'date-fns';

import '../../styles/base.scss';

interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

interface ForecastDay {
  date: string; // ISO date
  min: number;
  max: number;
  weathercode: number;
}

function weatherCodeToText(code: number): string {
  // Mapping from https://open-meteo.com/en/docs#api_form with consolidated groups
  if (code === 0) return 'Clear sky';
  if ([1, 2].includes(code)) return 'Mainly clear';
  if (code === 3) return 'Overcast';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55].includes(code)) return 'Drizzle';
  if ([56, 57].includes(code)) return 'Freezing drizzle';
  if ([61, 63, 65].includes(code)) return 'Rain';
  if ([66, 67].includes(code)) return 'Freezing rain';
  if ([71, 73, 75].includes(code)) return 'Snowfall';
  if (code === 77) return 'Snow grains';
  if ([80, 81, 82].includes(code)) return 'Rain showers';
  if ([85, 86].includes(code)) return 'Snow showers';
  if (code === 95) return 'Thunderstorm';
  if ([96, 99].includes(code)) return 'Thunderstorm with hail';
  return 'Unknown';
}

async function geocode(name: string): Promise<GeoResult[]> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    name,
  )}&count=5&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to search locations');
  const data = await res.json();
  const results = (data?.results || []) as any[];
  return results.map(r => ({
    id: r.id,
    name: r.name,
    latitude: r.latitude,
    longitude: r.longitude,
    country: r.country,
    admin1: r.admin1,
  }));
}

async function fetchForecast(lat: number, lon: number): Promise<ForecastDay[]> {
  const daily = [
    'temperature_2m_max',
    'temperature_2m_min',
    'weathercode',
  ].join(',');
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=${daily}&forecast_days=7&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch forecast');
  const data = await res.json();
  const days: ForecastDay[] = (data?.daily?.time || []).map((t: string, i: number) => ({
    date: t,
    min: Number(data.daily.temperature_2m_min?.[i] ?? 0),
    max: Number(data.daily.temperature_2m_max?.[i] ?? 0),
    weathercode: Number(data.daily.weathercode?.[i] ?? 0),
  }));
  return days;
}

export function App() {
  const [query, setQuery] = useState('San Francisco');
  const [suggestions, setSuggestions] = useState<AutosuggestProps.Option[]>([]);
  const [selected, setSelected] = useState<GeoResult | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestionLoad = useCallback(async (value: string) => {
    if (!value || value.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const results = await geocode(value);
      setSuggestions(
        results.map(r => ({
          value: `${r.name}${r.admin1 ? ', ' + r.admin1 : ''}${r.country ? ', ' + r.country : ''}`,
          label: `${r.name}${r.admin1 ? ', ' + r.admin1 : ''}${r.country ? ', ' + r.country : ''}`,
          description: `Lat ${r.latitude.toFixed(2)}, Lon ${r.longitude.toFixed(2)}`,
          tags: [r.latitude.toFixed(2), r.longitude.toFixed(2)],
          r,
        })) as AutosuggestProps.Option[],
      );
    } catch (e: any) {
      // Silent fail on suggestions
      setSuggestions([]);
    }
  }, []);

  const loadForecast = useCallback(async (loc: GeoResult) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchForecast(loc.latitude, loc.longitude);
      setForecast(data);
    } catch (e: any) {
      setError('Unable to load weather data');
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load with default location
  useEffect(() => {
    (async () => {
      try {
        const results = await geocode(query);
        const first = results[0];
        if (first) {
          setSelected(first);
          await loadForecast(first);
        }
      } catch {
        // ignore
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const headerCounter = useMemo(() => (forecast ? `(${forecast.length})` : undefined), [forecast]);

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={<Header variant="h1">Weather Dashboard</Header>}
        >
          <SpaceBetween size="l">
            <Container
              header={<Header description="Search for a city to view the 7-day forecast">Location</Header>}
            >
              <SpaceBetween size="s">
                <Autosuggest
                  onChange={({ detail }) => setQuery(detail.value)}
                  value={query}
                  onLoadItems={({ detail }) => suggestionLoad(detail.filteringText)}
                  onSelect={({ detail }) => {
                    const option = detail.option as any;
                    if (option?.r) {
                      setSelected(option.r as GeoResult);
                      loadForecast(option.r as GeoResult);
                    }
                  }}
                  options={suggestions}
                  placeholder="Search city (e.g., London)"
                  statusType="finished"
                  ariaLabel="City search"
                  filteringType="manual"
                />
                {selected ? (
                  <Box variant="p">
                    Selected: <Badge color="blue">{selected.name}{selected.admin1 ? `, ${selected.admin1}` : ''}{selected.country ? `, ${selected.country}` : ''}</Badge>
                  </Box>
                ) : (
                  <StatusIndicator type="pending">Choose a location</StatusIndicator>
                )}
              </SpaceBetween>
            </Container>

            <Container header={<Header counter={headerCounter}>7-day forecast</Header>}>
              {loading && <StatusIndicator type="loading">Loading forecast</StatusIndicator>}
              {error && <StatusIndicator type="error">{error}</StatusIndicator>}
              {!loading && !error && forecast && (
                <Cards
                  ariaLabels={{
                    itemSelectionLabel: (e, n) => `select ${n.title}`,
                    selectionGroupLabel: 'Forecast selection',
                  }}
                  cardDefinition={{
                    header: item => <Box fontWeight="bold">{item.title}</Box>,
                    sections: [
                      { id: 'desc', content: item => item.description },
                    ],
                  }}
                  cardsPerRow={[
                    { cards: 1, minWidth: 0 },
                    { cards: 2, minWidth: 500 },
                    { cards: 3, minWidth: 800 },
                    { cards: 4, minWidth: 1100 },
                  ]}
                  items={forecast.map(d => ({
                    id: d.date,
                    title: format(new Date(d.date), 'EEE, MMM d'),
                    description: (
                      <SpaceBetween size="xs">
                        <Box variant="p">{weatherCodeToText(d.weathercode)}</Box>
                        <Box variant="p">High: {Math.round(d.max)}°C</Box>
                        <Box variant="p">Low: {Math.round(d.min)}°C</Box>
                        {selected && (
                          <Link external href={`https://open-meteo.com/en/docs#api_form`}>
                            API details
                          </Link>
                        )}
                      </SpaceBetween>
                    ),
                  }))}
                  loadingText="Loading forecast"
                  trackBy="id"
                  visibleSections={['desc']}
                  header={<Header variant="h2">Daily outlook</Header>}
                />
              )}
              {!loading && !error && !forecast && (
                <Box variant="p">No data</Box>
              )}
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
