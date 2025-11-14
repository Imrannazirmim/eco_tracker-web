import React from 'react';
import { Plus } from 'lucide-react';

const FilterBar = ({ searchTerm, setSearchTerm, filter, setFilter, openCreateModal }) => (
  <div className="mb-8">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Community Events</h1>
        <p className="text-gray-600">Join or create environmental events in your community</p>
      </div>
      <button onClick={openCreateModal} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg">
        <Plus size={20} /> Create Event
      </button>
    </div>

    <div className="flex flex-col sm:flex-row gap-4">
      <input type="text" placeholder="Search events..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
      />
      <div className="flex gap-2">
        {['all','upcoming','past'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter===f?'bg-green-600 text-white':'bg-white text-gray-700 hover:bg-gray-100'}`}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default FilterBar;
