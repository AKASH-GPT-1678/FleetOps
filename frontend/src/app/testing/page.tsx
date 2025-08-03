'use client';

import { useEffect, useState } from 'react';

interface LocationData {
  lat: string;
  lng: string;
  timestamp: string;
  shouldSave: string;
}

interface ApiResponse {
  success: boolean;
  deliveryId: string;
  location: LocationData;
  error?: string;
}

export default function LocationDisplay() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deliveryId, setDeliveryId] = useState('1e2f4dcb-79fc-4b93-a0c0-4a34d1b7a298');

  const fetchLocation = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/location?deliveryId=${encodeURIComponent(id)}`);
      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch location');
      }

      setLocation(data.location);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setLocation(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (deliveryId) {
      fetchLocation(deliveryId);
    }
  }, [deliveryId]);

  const handleSubmit = () => {
    if (deliveryId.trim()) {
      fetchLocation(deliveryId.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Delivery Location Tracker</h1>

      {/* Input Section */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={deliveryId}
            onChange={(e) => setDeliveryId(e.target.value)}
            placeholder="Enter Delivery ID"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && deliveryId.trim()) {
                fetchLocation(deliveryId.trim());
              }
            }}
          />
          <button
            onClick={() => {
              if (deliveryId.trim()) {
                fetchLocation(deliveryId.trim());
              }
            }}
            disabled={loading || !deliveryId.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Fetch'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading location data...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success State */}
      {location && !loading && (
        <div className="bg-green-50 border border-green-200 rounded-md p-6">
          <h2 className="text-lg font-semibold text-green-800 mb-4">📍 Delivery Location Found</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Latitude:</span>
              <span className="text-gray-900">{location.lat}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Longitude:</span>
              <span className="text-gray-900">{location.lng}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Timestamp:</span>
              <span className="text-gray-900">
                {new Date(location.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Should Save:</span>
              <span className={`px-2 py-1 rounded text-sm ${location.shouldSave === 'true'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                }`}>
                {location.shouldSave === 'true' ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          {/* Google Maps Link */}
          <div className="mt-4 pt-4 border-t border-green-200">
            <a
              href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
            >
              🗺️ View on Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
}