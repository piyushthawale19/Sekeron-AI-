import React from 'react';
import { Users, Camera, Music, Video, FileCheck, AlertTriangle, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function Dashboard({ setActiveTab, setSelectedArtistId, setSelectedBriefId }) {
  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Stage 3 Evaluation Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Evidence-Backed Talent Intelligence & Contextual Recommendation
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            ARTIVA evaluates artist capabilities strictly by separating direct profile claims from demonstrated portfolio evidence and unverified unknowns. Matchhirers from incomplete briefs with zero hallucinated assumptions.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('artists')}
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-lg shadow-sky-500/20 transition-all flex items-center space-x-2"
            >
              <span>Explore Artist Intelligence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setActiveTab('recommendations'); setSelectedBriefId('brief_01'); }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center space-x-2"
            >
              <span>Test Brief & Re-Ranking Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white">15</span>
            <p className="text-xs text-slate-400 font-medium">Artists Evaluated</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white">5 / 5 / 5</span>
            <p className="text-xs text-slate-400 font-medium">Photographers / Musicians / Editors</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white">12 High</span>
            <p className="text-xs text-slate-400 font-medium">Evidence Confidence Matches</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white">1 Damaged</span>
            <p className="text-xs text-slate-400 font-medium">Incomplete Case (Artist 07)</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Briefs & Incomplete Portfolio Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Briefs (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">Active Hirer Briefs</h2>
            <span className="text-xs text-slate-400">4 Active Projects</span>
          </div>

          <div className="space-y-3">
            <div 
              onClick={() => { setActiveTab('recommendations'); setSelectedBriefId('brief_01'); }}
              className="p-5 rounded-xl bg-slate-900 border border-sky-500/30 hover:border-sky-500 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 font-semibold border border-purple-500/20">Video Editor</span>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">Has Re-Ranking Update</span>
                  </div>
                  <h3 className="font-bold text-lg text-white mt-2 group-hover:text-sky-400 transition-colors">
                    Luxury Cosmetics Instagram Launch Campaign
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    "We need an editor to create punchy vertical videos (9:16) for our upcoming luxury skincare Instagram Reels launch..."
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-sky-400 transition-colors shrink-0 mt-1" />
              </div>
            </div>

            <div 
              onClick={() => { setActiveTab('recommendations'); setSelectedBriefId('brief_02'); }}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 font-semibold border border-sky-500/20">Musician</span>
                  </div>
                  <h3 className="font-bold text-base text-white mt-2 group-hover:text-sky-400 transition-colors">
                    Indie Thriller Film Soundtrack & Ambient Audio
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    "Looking for a composer for an upcoming psychological indie thriller film. We need atmospheric, tension-building music..."
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-sky-400 transition-colors shrink-0 mt-1" />
              </div>
            </div>

            <div 
              onClick={() => { setActiveTab('recommendations'); setSelectedBriefId('brief_03'); }}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">Photographer</span>
                  </div>
                  <h3 className="font-bold text-base text-white mt-2 group-hover:text-sky-400 transition-colors">
                    High-End E-Commerce Cosmetics Product Campaign
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    "We need a product photographer to shoot our luxury perfume and serum line. Macro shots, glass reflection control..."
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-sky-400 transition-colors shrink-0 mt-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Edge Case / Incomplete Portfolio Highlight (1 col) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">System Integrity Check</h2>
          
          <div className="p-6 rounded-xl bg-slate-900 border border-rose-500/30 space-y-4 relative overflow-hidden">
            <div className="flex items-center space-x-3 text-rose-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-sm">Damaged Portfolio Test Case</h3>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Artist 07 (Kaito Tanaka)</strong> claims synthwave gaming audio production, but zero audio files are supplied.
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Portfolio Status:</span>
                <span className="font-bold text-rose-400">INCOMPLETE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confidence Score:</span>
                <span className="font-bold text-rose-400">LOW</span>
              </div>
              <div className="text-slate-400">
                <span className="block text-slate-500 font-medium">System Behavior:</span>
                "Refuses to hallucinate capability. Marks claims unverified."
              </div>
            </div>

            <button
              onClick={() => { setActiveTab('artist-detail'); setSelectedArtistId('artist_07'); }}
              className="w-full py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold text-xs border border-rose-500/30 transition-all text-center"
            >
              Inspect Incomplete Case (Artist 07)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
