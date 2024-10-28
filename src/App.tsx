import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { JsonViewer } from './components/JsonViewer';
import { Carousel } from './components/Carousel';
import { Database, RefreshCw } from 'lucide-react';

interface BenchmarkEntry {
  id: number;
  json_content: any;
}

function App() {
  const [entries, setEntries] = useState<BenchmarkEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('selfmapsbench')
        .select('id, json_content')
        .order('id');

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading entries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 mb-4">
            <Database className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Database className="w-12 h-12 text-gray-400 mx-auto" />
          <p className="mt-4 text-gray-600">No entries found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">JSON Content Browser</h1>
          <p className="text-gray-600">
            Entry {currentIndex + 1} of {entries.length}
          </p>
        </div>
        
        <div className="relative">
          <Carousel onSlideChange={setCurrentIndex}>
            {entries.map((entry, index) => (
              <div key={entry.id} className="px-4">
                <JsonViewer data={entry.json_content} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default App;