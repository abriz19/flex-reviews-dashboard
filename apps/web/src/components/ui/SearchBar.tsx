'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SearchBarProps {
  variant?: 'hero' | 'inline';
  onSearch?: (params: { city: string; dates: string; guests: number }) => void;
  defaultCity?: string;
  defaultDates?: string;
  defaultGuests?: number;
}

const CITIES = [
  { value: 'london', label: 'London' },
  { value: 'paris', label: 'Paris' },
  { value: 'algiers', label: 'Algiers' },
  { value: 'lisbon', label: 'Lisbon' },
];

export default function SearchBar({ 
  variant = 'inline', 
  onSearch,
  defaultCity,
  defaultDates,
  defaultGuests = 1
}: SearchBarProps) {
  const [city, setCity] = useState(defaultCity || 'london');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(defaultGuests);
  
  const formatDateRange = () => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      const outDate = new Date(checkOut).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      return `${inDate} - ${outDate}`;
    }
    if (checkIn) {
      return new Date(checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    }
    return 'Dates';
  };

  const handleSearch = () => {
    if (onSearch) {
      const dates = checkIn && checkOut ? `${checkIn} - ${checkOut}` : checkIn || '';
      onSearch({ city, dates, guests });
    }
  };

  if (variant === 'hero') {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#f5f5f0] rounded-2xl shadow-xl p-4 md:p-5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-0">
            <div className="flex-1 flex items-center px-4 py-3 md:py-4 border-r border-gray-300">
              <svg className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 outline-none text-gray-900 bg-transparent text-sm md:text-base font-medium appearance-none cursor-pointer"
              >
                {CITIES.map((cityOption) => (
                  <option key={cityOption.value} value={cityOption.value}>
                    {cityOption.label}
                  </option>
                ))}
              </select>
              <svg className="w-4 h-4 text-gray-500 ml-2 flex-shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex-1 flex items-center px-4 py-3 md:py-4 border-r border-gray-300 relative cursor-pointer group">
              <svg className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex-1 relative min-h-[24px]">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  title="Check-in date"
                />
                <div className="text-gray-900 text-sm md:text-base font-medium pointer-events-none">
                  {formatDateRange()}
                </div>
              </div>
              {checkIn && (
                <div className="ml-2 relative min-h-[24px]">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    title="Check-out date"
                  />
                </div>
              )}
              <svg className="w-4 h-4 text-gray-500 ml-2 flex-shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex-1 flex items-center px-4 py-3 md:py-4 border-r border-gray-300">
              <svg className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="flex-1 text-gray-900 text-sm md:text-base font-medium">{guests} Guest{guests !== 1 ? 's' : ''}</span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={() => setGuests(guests + 1)}
                  className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
            <Link
              href={`/short-term-rentals/${city}?guests=${guests}${checkIn ? `&moveInDate=${checkIn}` : ''}${checkOut ? `&moveOutDate=${checkOut}` : ''}`}
              className="bg-[#1a4d3a] text-white px-6 md:px-10 py-3 md:py-4 rounded-r-2xl font-semibold hover:bg-[#2d8659] transition-colors flex items-center justify-center whitespace-nowrap text-sm md:text-base"
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 flex-1 min-w-[200px]">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 outline-none bg-transparent appearance-none cursor-pointer"
            >
              {CITIES.map((cityOption) => (
                <option key={cityOption.value} value={cityOption.value}>
                  {cityOption.label}
                </option>
              ))}
            </select>
            <svg className="w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 relative cursor-pointer">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="relative w-32 min-h-[20px]">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                title="Check-in date"
              />
              <div className="pointer-events-none text-gray-700">
                {formatDateRange()}
              </div>
            </div>
            {checkIn && (
              <div className="ml-2 relative min-h-[20px]">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  title="Check-out date"
                />
              </div>
            )}
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="mr-2 text-gray-700">{guests} Guest{guests !== 1 ? 's' : ''}</span>
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="text-gray-400 hover:text-gray-600"
            >
              −
            </button>
            <button
              onClick={() => setGuests(guests + 1)}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              +
            </button>
          </div>
          <button className="flex items-center border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters</span>
            <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

