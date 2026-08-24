import React from 'react';
import { ArrowLeft, ShieldCheck, AlertTriangle, FileText, CheckCircle2, HelpCircle, AlertCircle, Play, Image as ImageIcon, Music as MusicIcon } from 'lucide-react';

export default function ArtistDetail({ artist, onBack }) {
  if (!artist) return null;

  const isHigh = artist.confidence === 'HIGH';
  const isLow = artist.confidence === 'LOW';

  return (
    <div className="space-y-8">
      {/* Navigation Back Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Artist Directory</span>
        </button>

        {/* Confidence Pill */}
        <div className={`px-4 py-2 rounded-xl border text-xs font-extrabold flex items-center space-x-2 ${
          isHigh 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
            : isLow
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        }`}>
          {isHigh && <CheckCircle2 className="w-4 h-4" />}
          {isLow && <AlertTriangle className="w-4 h-4" />}
          <span>{artist.confidence} CONFIDENCE MODEL</span>
        </div>
      </div>

      {/* Header Profile Summary */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {artist.category}
              </span>
              <span className="text-xs text-slate-400">ID: {artist.id}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">{artist.name}</h1>
            <p className="text-sm text-slate-400 font-medium mt-1">{artist.style}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
            <span className="text-slate-500 block uppercase font-bold text-[10px]">Portfolio Integrity:</span>
            <span className={`font-bold text-sm ${artist.portfolioStatus === 'INCOMPLETE' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {artist.portfolioStatus}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
          <strong className="text-sky-400 block mb-1">Confidence Model Rationale:</strong>
          {artist.confidenceReason}
        </div>
      </div>

      {/* THREE MAIN AUDIT SECTIONS: CLAIMS vs EVIDENCE vs UNKNOWNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 1. PROFILE CLAIMS */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <FileText className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-lg text-white">Profile Claims</h2>
          </div>
          <p className="text-xs text-slate-400">Information directly stated in artist profile text.</p>

          <div className="space-y-3">
            {artist.profileClaims.map((claim, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                <span className="text-[10px] font-bold text-amber-500 block uppercase mb-1">CLAIM #{idx + 1}</span>
                {claim}
              </div>
            ))}
          </div>
        </div>

        {/* 2. DEMONSTRATED EVIDENCE */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-lg text-white">Demonstrated Evidence</h2>
          </div>
          <p className="text-xs text-slate-400">Supported by supplied media references & timestamps.</p>

          {artist.demonstratedCapabilities.length === 0 ? (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
              Zero demonstrated evidence. Media files missing or unverified.
            </div>
          ) : (
            <div className="space-y-3">
              {artist.demonstratedCapabilities.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{item.dimension}</span>
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {item.evidence.identifier}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-100">{item.capability}</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong className="text-emerald-400">Observation:</strong> {item.evidence.observation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. UNKNOWNS & CONTRADICTIONS */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <HelpCircle className="w-5 h-5 text-rose-400" />
            <h2 className="font-bold text-lg text-white">Unknowns & Limits</h2>
          </div>
          <p className="text-xs text-slate-400">Capabilities system CANNOT establish from portfolio.</p>

          <div className="space-y-3">
            {artist.unknowns.map((unk, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">UNKNOWN ASPECT</span>
                <p>{unk}</p>
              </div>
            ))}

            {artist.contradictions && artist.contradictions.map((con, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 space-y-1">
                <span className="text-[10px] font-bold text-rose-400 uppercase block">UNPROVEN CLAIM / CONTRADICTION</span>
                <p>{con}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* STRICT NON-INFERENCE DIRECTIVE NOTICE */}
      <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-500/20 text-xs text-sky-300 flex items-start space-x-3">
        <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block text-sky-200">Strict Non-Inference Integrity Guard:</strong>
          ARTIVA strictly forbids inferring subjective qualities such as reliability, punctuality, character, popularity, or personality from portfolio samples. Intelligence is limited to verifiable artistic & technical capabilities.
        </div>
      </div>
    </div>
  );
}
