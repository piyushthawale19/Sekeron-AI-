import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ArtistDirectory from './components/ArtistDirectory';
import ArtistDetail from './components/ArtistDetail';
import RecommendationWorkbench from './components/RecommendationWorkbench';
import AuthModal from './components/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [selectedBriefId, setSelectedBriefId] = useState('brief_01');
  
  // Auth state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('artiva_token') || null);

  // Data state fetched from backend API (or loaded synchronously)
  const [artists, setArtists] = useState([]);
  const [selectedArtistDetail, setSelectedArtistDetail] = useState(null);
  const [briefs, setBriefs] = useState([]);
  const [recommendationData, setRecommendationData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    // Initial fetch of artist directory & briefs from API
    fetch(`${API_BASE}/api/artists`)
      .then(res => res.json())
      .then(data => setArtists(data.artists || []))
      .catch(() => {

        // Fallback dataset if backend is loading
        setArtists([
          { id: "artist_01", name: "Elena Rostova", category: "Photographer", style: "High-Fashion & Editorial Studio Photography", portfolioStatus: "COMPLETE", confidence: "HIGH", claimsCount: 3, evidenceCount: 2, primaryCapability: "Studio Lighting & Multi-Light Setup" },
          { id: "artist_02", name: "Marcus Vance", category: "Photographer", style: "Documentary & Outdoor Environmental", portfolioStatus: "COMPLETE", confidence: "MEDIUM", claimsCount: 3, evidenceCount: 2, primaryCapability: "Outdoor Environmental Capture" },
          { id: "artist_03", name: "Aria Thorne", category: "Photographer", style: "Commercial Minimalist Product", portfolioStatus: "COMPLETE", confidence: "HIGH", claimsCount: 2, evidenceCount: 2, primaryCapability: "Macro Product Reflection Control" },
          { id: "artist_06", name: "Julian Kael", category: "Musician", style: "Cinematic Orchestral Scoring", portfolioStatus: "COMPLETE", confidence: "MEDIUM", claimsCount: 3, evidenceCount: 2, primaryCapability: "Orchestral Arrangement & Build" },
          { id: "artist_07", name: "Kaito Tanaka", category: "Musician", style: "Electronic Synthwave", portfolioStatus: "INCOMPLETE", confidence: "LOW", claimsCount: 1, evidenceCount: 0, primaryCapability: "None demonstrated" },
          { id: "artist_11", name: "Leo Sterling", category: "Video Editor", style: "Short-Form Social & Reels", portfolioStatus: "COMPLETE", confidence: "MEDIUM", claimsCount: 2, evidenceCount: 2, primaryCapability: "Vertical 9:16 Short-Form Pacing" },
          { id: "artist_12", name: "Sophia Rossi", category: "Video Editor", style: "Cinematic Documentary", portfolioStatus: "COMPLETE", confidence: "HIGH", claimsCount: 1, evidenceCount: 2, primaryCapability: "Narrative Storytelling Arc" },
          { id: "artist_13", name: "Vikram Patel", category: "Video Editor", style: "Commercial High-VFX", portfolioStatus: "COMPLETE", confidence: "HIGH", claimsCount: 1, evidenceCount: 2, primaryCapability: "3D Motion Graphics Renders" }
        ]);
      });

    fetch(`${API_BASE}/api/briefs`)
      .then(res => res.json())
      .then(data => setBriefs(data.briefs || []))
      .catch(() => {
        setBriefs([
          { id: 'brief_01', title: 'Luxury Cosmetics Instagram Launch Campaign', category: 'Video Editor' },
          { id: 'brief_02', title: 'Indie Thriller Film Soundtrack & Ambient Audio', category: 'Musician' },
          { id: 'brief_03', title: 'High-End E-Commerce Cosmetics Product Campaign', category: 'Photographer' },
          { id: 'brief_04', title: 'Tech Conference Keynote & Speaker Highlight Reel', category: 'Video Editor' }
        ]);
      });
  }, [API_BASE]);

  // Fetch full details when artist is selected
  useEffect(() => {
    if (selectedArtistId) {
      fetch(`${API_BASE}/api/artists/${selectedArtistId}`)
        .then(res => res.json())
        .then(data => setSelectedArtistDetail(data.artist))
        .catch(() => {});
    }
  }, [selectedArtistId, API_BASE]);

  // Fetch recommendation and updated recommendation when briefId changes
  useEffect(() => {
    if (selectedBriefId) {
      fetch(`${API_BASE}/api/recommendations/${selectedBriefId}`)
        .then(res => res.json())
        .then(data => setRecommendationData(data))
        .catch(() => {
          setRecommendationData({
            briefId: 'brief_01',
            title: 'Luxury Cosmetics Instagram Launch Campaign',
            category: 'Video Editor',
            hirerRawConversation: 'We need an editor to create punchy vertical videos (9:16) for our upcoming luxury skincare Instagram Reels launch. The footage features high-end bottle closeups. We need rapid cuts, energetic music sync, kinetic animated captions, and sleek sound effects. Budget is flexible, but turnaround must be within 5 days.',
            interpretation: {
              explicitConstraints: [
                'Category: Video Editor',
                'Format: Vertical 9:16 short-form video (Instagram Reels)',
                'Required Pacing: Rapid cuts synchronized to music beat',
                'Required Graphics: Kinetic animated captions and sleek SFX'
              ],
              reasonableAssumptions: [
                'High-definition source footage will be supplied by the brand.',
                'Target audience expects modern polished social aesthetics.'
              ]
            },
            topMatches: [
              {
                rank: 1,
                artistId: 'artist_11',
                artistName: 'Leo Sterling',
                matchSummary: 'Strongest candidate due to direct demonstrated proof in 9:16 vertical reels with sub-second beat cuts and kinetic captioning.',
                supportingCapabilities: ['Vertical 9:16 Short-Form & Pacing', 'Kinetic Typography & SFX Layering'],
                supportingEvidence: ['artist_11/reel_01.mp4 @ 00:02-00:18', 'artist_11/reel_02.mp4 @ 00:05-00:22'],
                tradeoffs: 'Portfolio focuses on energetic social clips; long-form narrative editing proof is absent.',
                assumptions: 'Assumed Leo can adapt fast pacing specifically to luxury cosmetic brand guidelines.',
                confidence: 'HIGH'
              },
              {
                rank: 2,
                artistId: 'artist_13',
                artistName: 'Vikram Patel',
                matchSummary: 'Excellent alternative for commercial luxury cosmetics due to superior 3D product render integration and glossy graphics.',
                supportingCapabilities: ['3D Motion Graphics & Explosive Render Assembly', 'Green Screen Compositing & Screen Tracking'],
                supportingEvidence: ['artist_13/vfx_01.mp4 @ 00:10-00:35'],
                tradeoffs: 'Primary evidence is horizontal (16:9) commercial 3D VFX rather than native vertical social reels.',
                assumptions: 'Assumed Vikram can reframe horizontal 3D VFX workflows into 9:16 vertical layouts.',
                confidence: 'MEDIUM'
              }
            ],
            refinementQuestions: [
              {
                question: 'Is native 9:16 vertical social pacing mandatory, or do you require high-end 3D product visual effects?',
                whyItMatters: 'Leo Sterling excels at rapid vertical social cuts; Vikram Patel excels at 3D product graphics.',
                rankingImpact: 'If 3D product VFX is essential, Vikram Patel moves to #1; if social beat-synced pacing is key, Leo Sterling remains #1.'
              },
              {
                question: 'How many total video variations are needed within the 5-day delivery window?',
                whyItMatters: 'High volume short-form turnaround favors specialized social reel editors.',
                rankingImpact: 'Favors high-throughput social reel specialists.'
              }
            ]
          });
        });

      fetch(`${API_BASE}/api/recommendations/${selectedBriefId}/updated`)
        .then(res => res.json())
        .then(data => setUpdatedData(data))
        .catch(() => {
          setUpdatedData({
            briefId: 'brief_01',
            title: 'Luxury Cosmetics Instagram Launch Campaign',
            followUpUpdate: 'HIRER UPDATE: We spoke with our Creative Director. We realized we actually need a cinematic documentary-style story cut with soft warm color grading and deep interview narrative audio, rather than fast social reels! We want a 2-minute film for our website main page instead of 9:16 reels.',
            updatedInterpretation: 'The brief explicitly shifted from fast 9:16 vertical social reels to a 2-minute cinematic 16:9 documentary-style film with interview audio and warm color grading.',
            reRankingAudit: {
              previousOrder: ['artist_11 (Leo Sterling)', 'artist_13 (Vikram Patel)'],
              updatedOrder: ['artist_12 (Sophia Rossi)', 'artist_13 (Vikram Patel)'],
              changesAudit: [
                {
                  artistId: 'artist_12',
                  artistName: 'Sophia Rossi',
                  movement: 'UNRANKED → #1 (UP)',
                  reason: 'Moved to #1 because portfolio directly demonstrates cinematic narrative story arcs, interview L-cut audio, and warm film color grading (doc_01.mp4 @ 00:45-02:10).'
                },
                {
                  artistId: 'artist_11',
                  artistName: 'Leo Sterling',
                  movement: '#1 → DROPPED (DOWN)',
                  reason: 'Dropped from recommendations because fast vertical short-form social pacing contradicts the new cinematic documentary requirement.'
                },
                {
                  artistId: 'artist_13',
                  artistName: 'Vikram Patel',
                  movement: '#2 → #2 (HELD)',
                  reason: 'Maintained #2 spot as a commercial fallback for polished visual graphics.'
                }
              ]
            }
          });
        });
    }
  }, [selectedBriefId, API_BASE]);



  const handleSelectArtist = (id) => {
    setSelectedArtistId(id);
    setActiveTab('artist-detail');
  };

  const handleLoginSuccess = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('artiva_token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('artiva_token');
  };

  const handleDemoLogin = () => {
    handleLoginSuccess('mock_demo_jwt_token', {
      id: 'user_demo_01',
      name: 'Producer Demo User',
      email: 'demo@artiva.ai',
      role: 'Creative Producer'
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          onLogout={handleLogout}
          demoLogin={handleDemoLogin}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {activeTab === 'auth' && (
            <AuthModal onLoginSuccess={handleLoginSuccess} />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard
              setActiveTab={setActiveTab}
              setSelectedArtistId={setSelectedArtistId}
              setSelectedBriefId={setSelectedBriefId}
            />
          )}

          {activeTab === 'artists' && (
            <ArtistDirectory
              artists={artists}
              onSelectArtist={handleSelectArtist}
            />
          )}

          {activeTab === 'artist-detail' && (
            <ArtistDetail
              artist={selectedArtistDetail}
              onBack={() => setActiveTab('artists')}
            />
          )}

          {activeTab === 'recommendations' && (
            <RecommendationWorkbench
              briefs={briefs}
              selectedBriefId={selectedBriefId}
              setSelectedBriefId={setSelectedBriefId}
              recommendationData={recommendationData}
              updatedData={updatedData}
              onSelectArtist={handleSelectArtist}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>ARTIVA INTELLIGENCE — Evidence-Led Creative Talent Discovery Platform</p>
        <p className="text-[11px] text-slate-600">SEKERON AI Intern Stage 3 Assessment Prototype</p>
      </footer>
    </div>
  );
}
