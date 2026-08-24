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
        .catch(() => {});

      fetch(`${API_BASE}/api/recommendations/${selectedBriefId}/updated`)
        .then(res => res.json())
        .then(data => setUpdatedData(data))
        .catch(() => {});
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
