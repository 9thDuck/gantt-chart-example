import React from "react";
import { TimezoneOption } from "../../hooks/useTimezoneManager";

interface TimezoneSelectorProps {
 selectedTimezone: TimezoneOption;
 timezoneOptions: TimezoneOption[];
 onTimezoneChange: (timezone: TimezoneOption) => void;
}

export const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({
 selectedTimezone,
 timezoneOptions,
 onTimezoneChange,
}) => {
 return (
  <div className="flex items-center space-x-2">
   <label htmlFor="timezone" className="text-sm font-medium text-gray-700">
    Timezone:
   </label>
   <select
    id="timezone"
    value={selectedTimezone.value}
    onChange={(e) => {
     const newTimezone = timezoneOptions.find(
      (tz) => tz.value === e.target.value
     );
     if (newTimezone) {
      onTimezoneChange(newTimezone);
     }
    }}
    className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
   >
    {timezoneOptions.map((tz) => (
     <option key={tz.value} value={tz.value}>
      {tz.label}
     </option>
    ))}
   </select>
  </div>
 );
};
