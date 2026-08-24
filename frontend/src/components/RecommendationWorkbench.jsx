import React, { useState } from 'react';
import { FileText, ArrowRight, RefreshCw, HelpCircle, CheckCircle2, ShieldCheck, AlertTriangle, ArrowUpRight, ArrowDownRight, Minus, Sparkles } from 'lucide-react';

export default function RecommendationWorkbench({ briefs, selectedBriefId, setSelectedBriefId, recommendationData, updatedData, onSelectArtist }) {
  const [showUpdated, setShowUpdated] = useState(false);

  const brief = briefs.find(b => b.id === selectedBriefId);

  return (
    <div className="space-y-8">
      {/* Brief Selector Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Hirer Brief & Recommendation Workbench</h1>
          <p className="text-xs text-slate-400 mt-1">Contextual matching, trade-off analysis & automatic re-ranking after hirer updates</p>
        </div>

        {/* Dropdown Selector */}
        <div className="flex items-center space-x-3">
          <label className="text-xs text-slate-400 font-medium">Select Hirer Brief:</label>
          <select
            value={selectedBriefId}
            onChange={(e) => { setSelectedBriefId(e.target.value); setShowUpdated(false); }}
            className="bg-slate-950 text-slate-200 text-xs font-semibold border border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-sky-500 max-w-xs"
          >
            {briefs.map(b => (
              <option key={b.id} value={b.id}>
                {b.title} ({b.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Hirer Brief & Brief Interpretation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Original Conversation */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-sky-400" />
              <h2 className="font-bold text-lg text-white">Hirer Brief Input</h2>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              {brief?.category}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic leading-relaxed">
            "{recommendationData?.hirerRawConversation}"
          </div>
        </div>

        {/* Interpreted Requirement Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="font-bold text-lg text-white">Interpreted Requirements</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Explicit Constraints</span>
              <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px]">
                {recommendationData?.interpretation?.explicitConstraints?.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-sky-400">Reasonable Assumptions</span>
              <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px]">
                {recommendationData?.interpretation?.reasonableAssumptions?.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* FOLLOW-UP HIRER UPDATE TOGGLE BAR (If brief has update) */}
      {updatedData && updatedData.reRankingAudit && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <RefreshCw className="w-4 h-4" />
              <span>Follow-Up Hirer Update Received</span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl italic">
              "{updatedData.followUpUpdate}"
            </p>
          </div>

          <button
            onClick={() => setShowUpdated(!showUpdated)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center space-x-2 shrink-0 ${
              showUpdated
                ? 'bg-indigo-500 text-white shadow-indigo-500/20'
                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30'
            }`}
          >
            <span>{showUpdated ? 'Viewing Re-Ranked Candidates' : 'Simulate Re-Ranking Engine'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOP MATCHES SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <span>{showUpdated ? 'Re-Ranked Artist Recommendations' : 'Top Candidate Recommendations'}</span>
            <span className="text-xs font-normal text-slate-400">(Exactly 2 plausible candidates)</span>
          </h2>

          {showUpdated && (
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
              Updated Constraints Applied
            </span>
          )}
        </div>

        {/* 2 Candidate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendationData?.topMatches?.map((match) => {
            // Check if updated view and check movement
            const audit = updatedData?.reRankingAudit?.changesAudit?.find(a => a.artistId === match.artistId);
            const isRank1 = match.rank === 1;

            return (
              <div
                key={match.artistId}
                className={`p-6 rounded-2xl bg-slate-900 border transition-all space-y-5 ${
                  isRank1 ? 'border-sky-500/50 shadow-xl shadow-sky-500/5' : 'border-slate-800'
                }`}
              >
                {/* Header Rank */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-xl font-extrabold flex items-center justify-center text-sm ${
                      isRank1 ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      #{match.rank}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{match.artistName}</h3>
                      <span className="text-[10px] text-slate-400">Candidate ID: {match.artistId}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-slate-950 text-sky-400 border border-slate-800">
                    {match.confidence} CONFIDENCE
                  </span>
                </div>

                {/* Match Rationale */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Why This Candidate?</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{match.matchSummary}</p>
                </div>

                {/* Supporting Evidence References */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Verified Portfolio Evidence:</span>
                  <div className="space-y-1">
                    {match.supportingEvidence.map((ev, i) => (
                      <div key={i} className="px-3 py-1.5 rounded-lg bg-slate-950 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                        {ev}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trade-offs & Assumptions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/20 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Trade-off</span>
                    <p className="text-[11px] text-amber-200/80">{match.tradeoffs}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">System Assumption</span>
                    <p className="text-[11px] text-slate-300">{match.assumptions}</p>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onSelectArtist(match.artistId)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Inspect Full Intelligence File</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* RE-RANKING AUDIT EXPLANATION BLOCK (When toggle active) */}
      {showUpdated && updatedData?.reRankingAudit && (
        <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 space-y-4">
          <div className="flex items-center space-x-2 border-b border-indigo-500/20 pb-3">
            <RefreshCw className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-lg text-white">Re-Ranking Audit & Movement Rationale</h3>
          </div>

          <div className="space-y-3">
            {updatedData.reRankingAudit.changesAudit.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-100">{item.artistName}</span>
                  <p className="text-slate-300 mt-1">{item.reason}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg font-bold text-[10px] shrink-0 border ${
                  item.movement.includes('UP')
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : item.movement.includes('DOWN')
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {item.movement}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IMPROVE YOUR MATCHES (Max 2 Refinement Questions) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <HelpCircle className="w-5 h-5 text-sky-400" />
          <h3 className="font-bold text-lg text-white">Improve Your Matches</h3>
          <span className="text-xs text-slate-400">(Max 2 high-impact questions)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendationData?.refinementQuestions?.map((q, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-sky-400 uppercase">QUESTION #{idx + 1}</span>
              <h4 className="font-bold text-slate-200">{q.question}</h4>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="text-slate-300 font-semibold block">Ranking Impact:</span>
                <p>{q.rankingImpact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
