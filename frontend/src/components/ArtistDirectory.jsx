import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, AlertTriangle, FileText, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

export default function ArtistDirectory({ artists, onSelectArtist }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedConfidence, setSelectedConfidence] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtists = artists.filter(artist => {
    if (selectedCategory !== 'ALL' && artist.category.toUpperCase() !== selectedCategory.toUpperCase()) {
      return false;
    }
    if (selectedConfidence !== 'ALL' && artist.confidence.toUpperCase() !== selectedConfidence.toUpperCase()) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = artist.name.toLowerCase().includes(q);
      const styleMatch = artist.style.toLowerCase().includes(q);
      const capMatch = artist.primaryCapability.toLowerCase().includes(q);
      if (!nameMatch && !styleMatch && !capMatch) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Artist Intelligence Directory</h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse 15 audited artist capabilities with explicit evidence links & confidence scores
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Pill Filters */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {['ALL', 'Photographer', 'Musician', 'Video Editor'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory.toUpperCase() === cat.toUpperCase()
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat + 's'}
              </button>
            ))}
          </div>

          {/* Confidence Filter */}
          <select
            value={selectedConfidence}
            onChange={(e) => setSelectedConfidence(e.target.value)}
            className="bg-slate-950 text-slate-300 text-xs font-medium border border-slate-800 rounded-xl px-3 py-2 outline-none focus:border-sky-500"
          >
            <option value="ALL">All Confidence Levels</option>
            <option value="HIGH">High Confidence</option>
            <option value="MEDIUM">Medium Confidence</option>
            <option value="LOW">Low Confidence</option>
          </select>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search capability or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 text-slate-200 text-xs placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl border border-slate-800 outline-none focus:border-sky-500 w-48 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Grid of Artist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtists.map(artist => {
          const isHigh = artist.confidence === 'HIGH';
          const isLow = artist.confidence === 'LOW';

          return (
            <div
              key={artist.id}
              onClick={() => onSelectArtist(artist.id)}
              className="group bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-sky-500/5 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {artist.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2 group-hover:text-sky-400 transition-colors">
                      {artist.name}
                    </h3>
                  </div>

                  {/* Confidence Badge */}
                  <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold flex items-center space-x-1 ${
                    isHigh 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : isLow
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {isHigh && <CheckCircle2 className="w-3 h-3" />}
                    {isLow && <AlertTriangle className="w-3 h-3" />}
                    <span>{artist.confidence} CONFIDENCE</span>
                  </div>
                </div>

                {/* Style & Primary Capability */}
                <div className="space-y-2">
                  <p className="text-xs text-slate-400 font-medium line-clamp-1">
                    <strong className="text-slate-300">Style:</strong> {artist.style}
                  </p>
                  
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">Primary Demonstrated Capability:</span>
                    <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {artist.primaryCapability}
                    </p>
                  </div>
                </div>

                {/* Stats Pill */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                  <span>Claims: <strong>{artist.claimsCount}</strong></span>
                  <span>Verified Evidence: <strong>{artist.evidenceCount}</strong></span>
                  <span>Status: <strong className={artist.portfolioStatus === 'INCOMPLETE' ? 'text-rose-400' : 'text-emerald-400'}>{artist.portfolioStatus}</strong></span>
                </div>
              </div>

              {/* View Button */}
              <div className="pt-4 flex items-center justify-end text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform">
                <span>View Intelligence Record</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
