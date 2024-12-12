import { useState, useEffect } from "react";

export type TimezoneOption = {
 value: string;
 label: string;
 offset: number;
};

export const timezoneOptions: TimezoneOption[] = [
 { value: "UTC", label: "UTC", offset: 0 },
 // Americas
 { value: "America/New_York", label: "New York (EDT)", offset: -4 },
 { value: "America/Chicago", label: "Chicago (CDT)", offset: -5 },
 { value: "America/Denver", label: "Denver (MDT)", offset: -6 },
 { value: "America/Los_Angeles", label: "Los Angeles (PDT)", offset: -7 },
 { value: "America/Sao_Paulo", label: "São Paulo (BRT)", offset: -3 },

 // Europe
 { value: "Europe/London", label: "London (BST)", offset: 1 },
 { value: "Europe/Paris", label: "Paris (CEST)", offset: 2 },
 { value: "Europe/Moscow", label: "Moscow (MSK)", offset: 3 },
 { value: "Europe/Berlin", label: "Berlin (CEST)", offset: 2 },

 // Asia
 { value: "Asia/Dubai", label: "Dubai (GST)", offset: 4 },
 { value: "Asia/Singapore", label: "Singapore (SGT)", offset: 8 },
 { value: "Asia/Tokyo", label: "Tokyo (JST)", offset: 9 },
 { value: "Asia/Shanghai", label: "Shanghai (CST)", offset: 8 },
 { value: "Asia/Seoul", label: "Seoul (KST)", offset: 9 },

 // Oceania
 { value: "Australia/Sydney", label: "Sydney (AEST)", offset: 10 },
 { value: "Australia/Perth", label: "Perth (AWST)", offset: 8 },
 { value: "Pacific/Auckland", label: "Auckland (NZST)", offset: 12 },

 // India
 { value: "Asia/Kolkata", label: "India (IST)", offset: 5.5 },
];

const TIMEZONE_STORAGE_KEY = "gantt-chart-timezone";

export const useTimezoneManager = () => {
 const [selectedTimezone, setSelectedTimezone] = useState<TimezoneOption>(
  () => {
   const stored = localStorage.getItem(TIMEZONE_STORAGE_KEY);
   if (stored) {
    const parsed = JSON.parse(stored);
    const found = timezoneOptions.find((tz) => tz.value === parsed.value);
    return found || timezoneOptions[0];
   }
   return timezoneOptions[0];
  }
 );

 useEffect(() => {
  localStorage.setItem(TIMEZONE_STORAGE_KEY, JSON.stringify(selectedTimezone));
 }, [selectedTimezone]);

 const convertToTimezone = (date: Date): Date => {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * selectedTimezone.offset);
 };

 const convertFromTimezone = (date: Date): Date => {
  const utc = date.getTime() - 3600000 * selectedTimezone.offset;
  return new Date(utc - date.getTimezoneOffset() * 60000);
 };

 return {
  selectedTimezone,
  setSelectedTimezone,
  timezoneOptions,
  convertToTimezone,
  convertFromTimezone,
 };
};
