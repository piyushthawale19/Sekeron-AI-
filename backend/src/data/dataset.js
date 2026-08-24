// Ground truth dataset for ARTIVA Intelligence
// 15 Artists (5 Photographers, 5 Musicians, 5 Video Editors)
// 1 Incomplete/Damaged Portfolio Case (artist_07)
// 4 Hirer Conversations + 1 Follow-up Update

const dataset = {
  artists: [
    // PHOTOGRAPHERS (1-5)
    {
      id: "artist_01",
      name: "Elena Rostova",
      category: "Photographer",
      style: "High-Fashion & Editorial Studio Photography",
      profileClaims: [
        "Specializes in high-fashion studio editorial portraits with complex key lighting.",
        "Over 8 years experience conducting commercial lookbook shoots.",
        "Proficient in multi-light studio setups, gels, and beauty retouching."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "img_01.jpg", type: "image", description: "Studio portrait featuring dramatic Rembrandt key lighting and metallic gel rim lights." },
        { id: "img_02.jpg", type: "image", description: "High-contrast editorial lookbook model shot with softbox fill and crisp shadow isolation." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Studio Lighting & Multi-Light Setup",
          dimension: "Lighting",
          evidence: { sourceFile: "artist_01/img_01.jpg", mediaType: "image", identifier: "img_01.jpg", observation: "Multi-point studio lighting with key Rembrandt placement and colored rim gel control." }
        },
        {
          capability: "Editorial Portraiture & High Fashion",
          dimension: "Subject",
          evidence: { sourceFile: "artist_01/img_02.jpg", mediaType: "image", identifier: "img_02.jpg", observation: "Clean editorial fashion isolation and color keying on model attire." }
        }
      ],
      unknowns: [
        "Outdoor natural lighting adaptability under uncontrollable sun conditions cannot be determined.",
        "Exact years of professional experience cannot be verified from image metadata alone."
      ],
      contradictions: [],
      confidence: "HIGH",
      confidenceReason: "Direct portfolio evidence corroborates all profile claims regarding studio lighting and fashion editorial technique."
    },
    {
      id: "artist_02",
      name: "Marcus Vance",
      category: "Photographer",
      style: "Documentary & Outdoor Environmental Photojournalism",
      profileClaims: [
        "Documentary photographer focusing on natural light, rugged outdoor landscapes, and sports action.",
        "Experienced in unpredictable environmental conditions and action capture.",
        "Claims mastery in high-end luxury studio fashion portraiture."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "img_01.jpg", type: "image", description: "Outdoor mountain athlete in mid-air splash shot under bright ambient daylight." },
        { id: "img_02.jpg", type: "image", description: "Environmental portrait of a local artisan in an open-air workshop with window sunlight." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Outdoor Environmental & Natural Light Capture",
          dimension: "Lighting & Outdoor",
          evidence: { sourceFile: "artist_02/img_01.jpg", mediaType: "image", identifier: "img_01.jpg", observation: "High shutter speed action capture utilizing natural sunlight and water diffusion." }
        },
        {
          capability: "Documentary & Photojournalistic Portraiture",
          dimension: "Subject & Style",
          evidence: { sourceFile: "artist_02/img_02.jpg", mediaType: "image", identifier: "img_02.jpg", observation: "Candid composition framing subject in environmental contextual setting." }
        }
      ],
      unknowns: [
        "Ability to shoot tethered in studio environments cannot be established."
      ],
      contradictions: [
        "Claimed mastery in luxury studio fashion portraiture is unproven; zero studio lighting or fashion work exists in supplied portfolio."
      ],
      confidence: "MEDIUM",
      confidenceReason: "Strong outdoor documentary evidence present, but studio fashion claims lack supporting portfolio material."
    },
    {
      id: "artist_03",
      name: "Aria Thorne",
      category: "Photographer",
      style: "Commercial Minimalist Product & E-commerce Photography",
      profileClaims: [
        "Product photographer specializing in cosmetics, luxury glassware, and crisp macro reflection control.",
        "Delivers catalog-ready e-commerce imagery with pure white backgrounds."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "img_01.jpg", type: "image", description: "Macro focus shot of perfume bottle on reflective glass with gradient diffuser backdrop." },
        { id: "img_02.jpg", type: "image", description: "Minimalist skincare product lineup on neutral stone slab under soft diffused overhead panel." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Macro Product & Glassware Reflection Control",
          dimension: "Product & Studio",
          evidence: { sourceFile: "artist_03/img_01.jpg", mediaType: "image", identifier: "img_01.jpg", observation: "Pin-sharp reflection elimination on glass container with gradient drop." }
        },
        {
          capability: "Commercial E-commerce & Soft Diffusion",
          dimension: "Composition & Lighting",
          evidence: { sourceFile: "artist_03/img_02.jpg", mediaType: "image", identifier: "img_02.jpg", observation: "Clean product arrangement with uniform soft illumination across texture details." }
        }
      ],
      unknowns: [
        "Human subject framing, posing, and portraiture capabilities cannot be determined."
      ],
      contradictions: [],
      confidence: "HIGH",
      confidenceReason: "Portfolio contains direct, pristine macro product shots supporting all claims."
    },
    {
      id: "artist_04",
      name: "Devon Chen",
      category: "Photographer",
      style: "Architectural & Urban Interior Photography",
      profileClaims: [
        "Specializes in interior architectural photography, dynamic range blending (HDR), and spatial geometry.",
        "Captures residential and commercial real estate with straight verticals."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "img_01.jpg", type: "image", description: "Modern atrium interior shot with perspective control lens showing corrected vertical lines." },
        { id: "img_02.jpg", type: "image", description: "Twilight exterior building lighting balance combining interior ambient and exterior sky." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Architectural Perspective Control & Geometry",
          dimension: "Composition & Architecture",
          evidence: { sourceFile: "artist_04/img_01.jpg", mediaType: "image", identifier: "img_01.jpg", observation: "Corrected vertical perspective grid without barrel distortion in complex atrium space." }
        },
        {
          capability: "Ambient & Exterior Twilight Exposure Blending",
          dimension: "Lighting & Environment",
          evidence: { sourceFile: "artist_04/img_02.jpg", mediaType: "image", identifier: "img_02.jpg", observation: "Balanced shadow detail and outdoor dusk skylight exposure." }
        }
      ],
      unknowns: [
        "Fast-moving event capture or candid human interaction cannot be determined."
      ],
      contradictions: [],
      confidence: "HIGH",
      confidenceReason: "Architectural imagery confirms tilt-shift/perspective precision and ambient exposure balancing."
    },
    {
      id: "artist_05",
      name: "Sienna Miller",
      category: "Photographer",
      style: "Live Concert & Event Nightlife Photography",
      profileClaims: [
        "Low-light live music event photographer handling stage pyrotechnics and rapid strobe environments.",
        "Expert in capturing candid crowd reactions and intense performer emotions."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "img_01.jpg", type: "image", description: "Lead guitarist illuminated by colored backlight and heavy stage haze." },
        { id: "img_02.jpg", type: "image", description: "Wide arena crowd silhouette with laser light beams passing overhead." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Low-Light High-ISO Stage Performance Capture",
          dimension: "Lighting & Event",
          evidence: { sourceFile: "artist_05/img_01.jpg", mediaType: "image", identifier: "img_01.jpg", observation: "Clean noise management in dark stage environment with vivid laser backlight balance." }
        },
        {
          capability: "Candid Event & Crowd Timing",
          dimension: "Subject & Event",
          evidence: { sourceFile: "artist_05/img_02.jpg", mediaType: "image", identifier: "img_02.jpg", observation: "Precise shutter timing capturing laser beam geometry over crowd silhouettes." }
        }
      ],
      unknowns: [
        "Controlled white-wall commercial studio shooting capabilities are unverified."
      ],
      contradictions: [],
      confidence: "HIGH",
      confidenceReason: "Direct portfolio evidence demonstrates event stage lighting mastery and timing."
    },

    // MUSICIANS (6-10)
    {
      id: "artist_06",
      name: "Julian Kael",
      category: "Musician",
      style: "Cinematic Orchestral & Atmospheric Ambient Scoring",
      profileClaims: [
        "Composer and multi-instrumentalist specializing in film scores, hybrid orchestral strings, and synth pads.",
        "Experienced in producing tension-building thriller themes and emotional piano beds.",
        "Claims lead vocal pop production."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "audio_01.mp3", type: "audio", description: "Dynamic instrumental score starting with subtle cello solo, escalating to brass crescendo." },
        { id: "audio_02.mp3", type: "audio", description: "Atmospheric analog synth ambient soundscape with gentle acoustic piano melodies." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Orchestral Arrangement & Dynamic Build",
          dimension: "Arrangement & Genre",
          evidence: { sourceFile: "artist_06/audio_01.mp3", mediaType: "audio", identifier: "audio_01.mp3 @ 00:15-01:10", observation: "Polyphonic orchestration building smoothly from solo low strings to full brass fanfare." }
        },
        {
          capability: "Cinematic Ambient & Hybrid Synth Scoring",
          dimension: "Instrument & Style",
          evidence: { sourceFile: "artist_06/audio_02.mp3", mediaType: "audio", identifier: "audio_02.mp3 @ 00:30-01:45", observation: "Lush ambient synth pad layering integrated with intimate felt piano motif." }
        }
      ],
      unknowns: [
        "Live stage ensemble mixing cannot be determined from studio score master stems."
      ],
      contradictions: [
        "Lead vocal pop production claims are unsupported; no vocal tracks exist in supplied audio samples."
      ],
      confidence: "MEDIUM",
      confidenceReason: "Instrumental orchestral scoring evidence is exceptional, but vocal production claims are unproven."
    },
    {
      id: "artist_07",
      name: "Kaito Tanaka",
      category: "Musician",
      style: "Electronic Synthwave & Upbeat Gaming Soundtracks",
      profileClaims: [
        "Electronic music producer delivering retro synthwave, energetic game audio loops, and heavy basslines."
      ],
      portfolioStatus: "INCOMPLETE",
      mediaFiles: [],
      demonstratedCapabilities: [],
      unknowns: [
        "All musical capabilities (genre, instrument, mixing quality, tempo control) cannot be determined due to missing audio media."
      ],
      contradictions: [],
      confidence: "LOW",
      confidenceReason: "Portfolio dataset is damaged/incomplete (zero audio files supplied). Capability claims cannot be verified."
    },
    {
      id: "artist_08",
      name: "Maya Lin",
      category: "Musician",
      style: "Acoustic Folk & Indie Vocalist Performance",
      profileClaims: [
        "Fingerstyle acoustic guitarist and soulful lead vocalist specializing in indie folk storytelling and intimate vocal layering."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "audio_01.mp3", type: "audio", description: "Clean acoustic guitar fingerpicking paired with clear, intimate solo female lead vocals." },
        { id: "audio_02.mp3", type: "audio", description: "Multi-tracked 3-part vocal harmony performance over light percussion." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Solo Lead Vocals & Vocal Harmony Arrangement",
          dimension: "Vocal Role & Ensemble",
          evidence: { sourceFile: "artist_08/audio_02.mp3", mediaType: "audio", identifier: "audio_02.mp3 @ 00:05-00:48", observation: "Tight 3-part vocal pitch control and acoustic spatial separation." }
        },
        {
          capability: "Acoustic Fingerstyle Guitar Accompaniment",
          dimension: "Instrument & Performance",
          evidence: { sourceFile: "artist_08/audio_01.mp3", mediaType: "audio", identifier: "audio_01.mp3 @ 00:10-01:05", observation: "Dynamic fingerpicking rhythm stability and clean string resonance." }
        }
      ],
      unknowns: [
        "Heavy electronic synth programming or full drum kit tracking cannot be determined."
      ],
      contradictions: [],
      confidence: "HIGH",
      confidenceReason: "Pristine audio stems prove high vocal clarity, pitch accuracy, and fingerstyle acoustic control."
    },
    {
      id: "artist_09",
      name: "Tariq Reed",
      category: "Musician",
      style: "Modern Hip-Hop Beatmaking & Sound Design",
      profileClaims: [
        "Hip-hop producer, beatmaker, and mixing engineer specializing in punchy 808s, boom-bap drums, and vocal chop hooks."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "audio_01.mp3", type: "audio", description: "Modern trap beat with heavy sub-808 slides, crisp hi-hat rolls, and vocal sample cuts." },
        { id: "audio_02.mp3", type: "audio", description: "Lo-fi boom-bap rhythm groove featuring vinyl crackle and jazzy electric piano chops." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Sub-808 & Hip-Hop Drum Programming",
          dimension: "Genre & Rhythm",
          evidence: { sourceFile: "artist_09/audio_01.mp3", mediaType: "audio", identifier: "audio_01.mp3 @ 00:00-00:50", observation: "Distortion-free 808 frequency sub-bass response and rapid snare roll syncopation." }
        },
        {
          capability: "Sample Chop & Vinyl Sound Design",
          dimension: "Arrangement & Studio",
          evidence: { sourceFile: "artist_09/audio_02.mp3", mediaType: "audio", identifier: "audio_02.mp3 @ 00:15-01:10", observation: "Rhythmic slice alignment of vintage piano chord samples with warm low-pass filter treatment." }
        }
      ],
      unknowns: [
        "Classical score composition capabilities cannot be established."
      ],
      contradictions: [],
      confidence: "HIGH",
      confidenceReason: "Track stems demonstrate expert urban percussion programming and low-end bass management."
    },
    {
      id: "artist_10",
      name: "Chloe Bennett",
      category: "Musician",
      style: "Upbeat Pop & Commercial Jingles",
      profileClaims: [
        "Pop song composer delivering radio-friendly hooks, driving synth basslines, and commercial branding jingles."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "audio_01.mp3", type: "audio", description: "15-second upbeat commercial synth-pop jingle with catchy brass hits and cheerful vocal tag." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Short-Form Commercial Pop Jingle Composition",
          dimension: "Genre & Short-Form",
          evidence: { sourceFile: "artist_10/audio_01.mp3", mediaType: "audio", identifier: "audio_01.mp3 @ 00:00-00:15", observation: "High-energy 15s track resolution with clean drop and brand-focused resolution." }
        }
      ],
      unknowns: [
        "Long-form film scoring (over 2 minutes) cannot be evaluated from short jingle sample."
      ],
      contradictions: [],
      confidence: "MEDIUM",
      confidenceReason: "Single short jingle proves pop commercial style but leaves extended arrangements unverified."
    },

    // VIDEO EDITORS (11-15)
    {
      id: "artist_11",
      name: "Leo Sterling",
      category: "Video Editor",
      style: "Fast-Paced Short-Form Social & Reels Editing",
      profileClaims: [
        "Short-form social media video editor specializing in vertical TikTok/Reels, rapid cuts, kinetic typography, and audio beat matching.",
        "Claims feature-length documentary story editing mastery."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "reel_01.mp4", type: "video", description: "Vertical 9:16 social reel featuring 0.8-second cuts synchronized to beat drops with dynamic captions." },
        { id: "reel_02.mp4", type: "video", description: "Product promo vertical clip with fast zooms, sound effect Whooshes, and pop-up stickers." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Vertical 9:16 Short-Form & Pacing",
          dimension: "Aspect Ratio & Pacing",
          evidence: { sourceFile: "artist_11/reel_01.mp4", mediaType: "video", identifier: "reel_01.mp4 @ 00:02-00:18", observation: "Rapid cuts under 1 second keyed to audio transients in vertical format." }
        },
        {
          capability: "Kinetic Typography & SFX Layering",
          dimension: "Motion Graphics & Sound",
          evidence: { sourceFile: "artist_11/reel_02.mp4", mediaType: "video", identifier: "reel_02.mp4 @ 00:05-00:22", observation: "Animated text overlays synchronized with directional whoosh audio effects." }
        }
      ],
      unknowns: [
        "Cinematic narrative long-form pacing cannot be determined."
      ],
      contradictions: [
        "Claimed feature documentary narrative editing is completely unevidenced in fast short-form reels portfolio."
      ],
      confidence: "MEDIUM",
      confidenceReason: "Outstanding short-form social proof, but feature documentary claim is unverified."
    },
    {
      id: "artist_12",
      name: "Sophia Rossi",
      category: "Video Editor",
      style: "Cinematic Documentary & Narrative Storyteller",
      profileClaims: [
        "Documentary editor focusing on narrative arc, emotional interview cutaways, subtle color grading, and archival footage integration."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "doc_01.mp4", type: "video", description: "16:9 horizontal documentary segment intersplicing headshot interview audio with emotional archival b-roll." },
        { id: "doc_02.mp4", type: "video", description: "Nature narrative clip showcasing warm organic LUT color grade and gradual scene transitions." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Narrative Arc & Interview Cutaway Storytelling",
          dimension: "Pacing & Documentary",
          evidence: { sourceFile: "artist_12/doc_01.mp4", mediaType: "video", identifier: "doc_01.mp4 @ 00:45-02:10", observation: "Seamless L-cut audio transition carrying interview dialogue across relevant b-roll imagery." }
        },
        {
          capability: "Cinematic Warm Color Grading & LUT Treatment",
          dimension: "Color Grading",
          evidence: { sourceFile: "artist_12/doc_02.mp4", mediaType: "video", identifier: "doc_02.mp4 @ 00:20-01:15", observation: "Consistent skin tone preservation amidst warm cinematic film emulation palette." }
        }
      ],
      unknowns: [
        "Dynamic 3D motion graphics or complex VFX compositing cannot be established."
      ],
      contradictions: [],
      confidence: "HIGH",
      confidenceReason: "Portfolio demonstrates long-form pacing, narrative audio cross-fades, and refined color grading."
    },
    {
      id: "artist_13",
      name: "Vikram Patel",
      category: "Video Editor",
      style: "Commercial High-VFX & Motion Graphics Editor",
      profileClaims: [
        "Commercial editor and After Effects animator specializing in 3D product renders, screen replacements, sleek UI graphics, and glossy transitions."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "vfx_01.mp4", type: "video", description: "Commercial video featuring 3D animated smartphone exploding into component layers with callout text." },
        { id: "vfx_02.mp4", type: "video", description: "Sleek automotive promo with green screen glass tracking and glowing neon HUD elements." }
      ],
      demonstratedCapabilities: [
        {
          capability: "3D Motion Graphics & Explosive Render Assembly",
          dimension: "Motion Graphics & 3D",
          evidence: { sourceFile: "artist_13/vfx_01.mp4", mediaType: "video", identifier: "vfx_01.mp4 @ 00:10-00:35", observation: "Keyframed 3D CAD explode animation integrated with tracked floating UI text." }
        },
        {
          capability: "Green Screen Compositing & Screen Tracking",
          dimension: "VFX & Compositing",
          evidence: { sourceFile: "artist_13/vfx_02.mp4", mediaType: "video", identifier: "vfx_02.mp4 @ 00:15-00:40", observation: "Clean planar tracking on reflections with zero edge artifact spill." }
        }
      ],
      unknowns: [
        "Unscripted documentary interview pacing cannot be evaluated."
      ],
      contradictions: [],
      confidence: "HIGH",
      confidenceReason: "Exceptional visual evidence of advanced VFX compositing, tracking, and motion graphics."
    },
    {
      id: "artist_14",
      name: "Hannah Wright",
      category: "Video Editor",
      style: "Corporate Event & Webinar Highlight Editor",
      profileClaims: [
        "Specializes in corporate conference highlights, multi-camera webinar switching, clean lower thirds, and professional audio normalization."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "corp_01.mp4", type: "video", description: "Multi-cam keynote presentation edit switching between speaker podium and slide presentation." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Multi-Camera Keynote Switching & Corporate Clean Lines",
          dimension: "Multi-Cam & Corporate",
          evidence: { sourceFile: "artist_14/corp_01.mp4", mediaType: "video", identifier: "corp_01.mp4 @ 00:30-01:50", observation: "Synchronized multi-cam cut matching lip audio to wide stage angles and presentation slides." }
        }
      ],
      unknowns: [
        "High-fashion stylized color grading or aggressive music video edits cannot be evaluated."
      ],
      contradictions: [],
      confidence: "HIGH",
      confidenceReason: "Clean multi-camera sync and corporate lower-third graphics verified."
    },
    {
      id: "artist_15",
      name: "Diego Gomez",
      category: "Video Editor",
      style: "Music Video & Stylized Color Grading",
      profileClaims: [
        "Music video editor known for rhythmic speed ramps, stylized film grain, vintage color turns, and glitch transitions."
      ],
      portfolioStatus: "COMPLETE",
      mediaFiles: [
        { id: "mv_01.mp4", type: "video", description: "High-octane music video featuring speed ramping, optical flow retiming, and vibrant neon color split." }
      ],
      demonstratedCapabilities: [
        {
          capability: "Speed Ramping & Stylized Music Video Cut",
          dimension: "Pacing & Retiming",
          evidence: { sourceFile: "artist_15/mv_01.mp4", mediaType: "video", identifier: "mv_01.mp4 @ 00:08-00:42", observation: "Smooth curve speed ramps matched to snare accents with chromatic aberration transitions." }
        }
      ],
      unknowns: [
        "Corporate dialogue normalization and multi-speaker editing are unverified."
      ],
      contradictions: [],
      confidence: "HIGH",
      confidenceReason: "Direct portfolio reel corroborates music video speed ramping and stylized color treatment."
    }
  ],

  // HIRER BRIEFS (1-4)
  briefs: [
    {
      id: "brief_01",
      title: "Luxury Cosmetics Instagram Launch Campaign",
      category: "Video Editor",
      hirerRawConversation: "We need an editor to create punchy vertical videos (9:16) for our upcoming luxury skincare Instagram Reels launch. The footage features high-end bottle closeups. We need rapid cuts, energetic music sync, kinetic animated captions, and sleek sound effects. Budget is flexible, but turnaround must be within 5 days.",
      interpretation: {
        explicitConstraints: [
          "Category: Video Editor",
          "Format: Vertical 9:16 short-form video (Instagram Reels)",
          "Required Pacing: Rapid cuts synchronized to music beat",
          "Required Graphics: Kinetic animated captions and sleek SFX"
        ],
        reasonableAssumptions: [
          "High-definition source footage will be supplied by the brand.",
          "Target audience expects modern polished social aesthetics."
        ],
        contradictions: [],
        unknowns: [
          "Exact final video count (e.g. 3 vs 10 reels) is unstated.",
          "Color grading style preferences (warm vs cool luxury) are unstated."
        ]
      },
      initialRecommendations: {
        topMatches: [
          {
            rank: 1,
            artistId: "artist_11",
            artistName: "Leo Sterling",
            matchSummary: "Strongest candidate due to direct demonstrated proof in 9:16 vertical reels with sub-second beat cuts and kinetic captioning.",
            supportingCapabilities: ["Vertical 9:16 Short-Form & Pacing", "Kinetic Typography & SFX Layering"],
            supportingEvidence: ["artist_11/reel_01.mp4 @ 00:02-00:18", "artist_11/reel_02.mp4 @ 00:05-00:22"],
            tradeoffs: "Portfolio focuses on energetic social clips; long-form narrative editing proof is absent.",
            assumptions: "Assumed Leo can adapt fast pacing specifically to luxury cosmetic brand guidelines.",
            confidence: "HIGH"
          },
          {
            rank: 2,
            artistId: "artist_13",
            artistName: "Vikram Patel",
            matchSummary: "Excellent alternative for commercial luxury cosmetics due to superior 3D product render integration and glossy graphics.",
            supportingCapabilities: ["3D Motion Graphics & Explosive Render Assembly", "Green Screen Compositing & Screen Tracking"],
            supportingEvidence: ["artist_13/vfx_01.mp4 @ 00:10-00:35"],
            tradeoffs: "Primary evidence is horizontal (16:9) commercial 3D VFX rather than native vertical social reels.",
            assumptions: "Assumed Vikram can reframe horizontal 3D VFX workflows into 9:16 vertical layouts.",
            confidence: "MEDIUM"
          }
        ],
        refinementQuestions: [
          {
            question: "Is native 9:16 vertical social pacing mandatory, or do you require high-end 3D product visual effects?",
            whyItMatters: "Leo Sterling excels at rapid vertical social cuts; Vikram Patel excels at 3D product graphics.",
            rankingImpact: "If 3D product VFX is essential, Vikram Patel moves to #1; if social beat-synced pacing is key, Leo Sterling remains #1."
          },
          {
            question: "How many total video variations are needed within the 5-day delivery window?",
            whyItMatters: "High volume short-form turnaround favors specialized social reel editors.",
            rankingImpact: "Favors high-throughput social reel specialists."
          }
        ]
      },
      followUpUpdate: {
        updateText: "HIRER UPDATE: We spoke with our Creative Director. We realized we actually need a cinematic documentary-style story cut with soft warm color grading and deep interview narrative audio, rather than fast social reels! We want a 2-minute film for our website main page instead of 9:16 reels.",
        updatedInterpretation: "The brief explicitly shifted from fast 9:16 vertical social reels to a 2-minute cinematic 16:9 documentary-style film with interview audio and warm color grading.",
        updatedRecommendations: {
          previousOrder: ["artist_11 (Leo Sterling)", "artist_13 (Vikram Patel)"],
          updatedOrder: ["artist_12 (Sophia Rossi)", "artist_13 (Vikram Patel)"],
          changesAudit: [
            {
              artistId: "artist_12",
              artistName: "Sophia Rossi",
              movement: "UNRANKED → #1 (UP)",
              reason: "Moved to #1 because portfolio directly demonstrates cinematic narrative story arcs, interview L-cut audio, and warm film color grading (doc_01.mp4 @ 00:45-02:10)."
            },
            {
              artistId: "artist_11",
              artistName: "Leo Sterling",
              movement: "#1 → DROPPED (DOWN)",
              reason: "Dropped from recommendations because fast vertical short-form social pacing contradicts the new cinematic documentary requirement."
            },
            {
              artistId: "artist_13",
              artistName: "Vikram Patel",
              movement: "#2 → #2 (HELD)",
              reason: "Maintained #2 spot as a commercial fallback for polished visual graphics."
            }
          ]
        }
      }
    },
    {
      id: "brief_02",
      title: "Indie Thriller Film Soundtrack & Ambient Audio",
      category: "Musician",
      hirerRawConversation: "Looking for a composer for an upcoming psychological indie thriller film. We need atmospheric, tension-building music with dynamic orchestral strings, subtle cello, and atmospheric synth pads. No pop lyrics or upbeat drums.",
      interpretation: {
        explicitConstraints: [
          "Category: Musician / Composer",
          "Genre: Cinematic Thriller / Atmospheric Ambient Scoring",
          "Instrumentation: Hybrid Orchestral Strings (Cello) & Synth Pads",
          "Exclusions: No pop vocal tracks, no upbeat commercial drums"
        ],
        reasonableAssumptions: [
          "Score will be synced against locked video edit timemarkers.",
          "High dynamic range stem delivery is expected."
        ],
        contradictions: [],
        unknowns: [
          "Exact runtime of total music score required is unstated."
        ]
      },
      initialRecommendations: {
        topMatches: [
          {
            rank: 1,
            artistId: "artist_06",
            artistName: "Julian Kael",
            matchSummary: "Direct match with proven orchestral cello build and atmospheric ambient thriller soundscapes.",
            supportingCapabilities: ["Orchestral Arrangement & Dynamic Build", "Cinematic Ambient & Hybrid Synth Scoring"],
            supportingEvidence: ["artist_06/audio_01.mp3 @ 00:15-01:10", "artist_06/audio_02.mp3 @ 00:30-01:45"],
            tradeoffs: "Claims lead pop vocal production which is unverified in portfolio, though irrelevant for this score.",
            assumptions: "Assumed Julian can meet indie film budget constraints.",
            confidence: "HIGH"
          },
          {
            rank: 2,
            artistId: "artist_08",
            artistName: "Maya Lin",
            matchSummary: "Alternative candidate for dark organic acoustic moodiness through acoustic string dexterity.",
            supportingCapabilities: ["Acoustic Fingerstyle Guitar Accompaniment"],
            supportingEvidence: ["artist_08/audio_01.mp3 @ 00:10-01:05"],
            tradeoffs: "Portfolio is primarily acoustic indie folk vocal songs rather than full orchestral film scores.",
            assumptions: "Assumed acoustic arrangements can be stripped into suspenseful instrumental textures.",
            confidence: "MEDIUM"
          }
        ],
        refinementQuestions: [
          {
            question: "Do you require full hybrid orchestral brass crescendos or strictly minimalist acoustic textures?",
            whyItMatters: "Julian Kael provides full dynamic orchestral range; Maya Lin provides intimate acoustic string textures.",
            rankingImpact: "Clarifies whether heavy symphonic tension is required."
          }
        ]
      }
    },
    {
      id: "brief_03",
      title: "High-End E-Commerce Cosmetics Product Campaign",
      category: "Photographer",
      hirerRawConversation: "We need a product photographer to shoot our luxury perfume and serum line. Shots will be used on our website and digital ads. We need macro shots, perfect glass reflection control, and crisp soft lighting.",
      interpretation: {
        explicitConstraints: [
          "Category: Photographer",
          "Subject: Cosmetic bottles & luxury glassware",
          "Technical requirement: Macro glass reflection control and soft diffusion lighting"
        ],
        reasonableAssumptions: [
          "Products will be shipped directly to photographer's studio.",
          "High-res retouched commercial TIFF/JPEG outputs required."
        ],
        contradictions: [],
        unknowns: [
          "Whether lifestyle model hand-holding shots are required alongside hero macro shots."
        ]
      },
      initialRecommendations: {
        topMatches: [
          {
            rank: 1,
            artistId: "artist_03",
            artistName: "Aria Thorne",
            matchSummary: "Pristine match with direct evidence of macro perfume glass reflection control and soft light diffusion.",
            supportingCapabilities: ["Macro Product & Glassware Reflection Control", "Commercial E-commerce & Soft Diffusion"],
            supportingEvidence: ["artist_03/img_01.jpg", "artist_03/img_02.jpg"],
            tradeoffs: "Portfolio contains zero human portraiture shots if model hands are needed.",
            assumptions: "Assumed shoot is strictly tabletop studio product macro work.",
            confidence: "HIGH"
          },
          {
            rank: 2,
            artistId: "artist_01",
            artistName: "Elena Rostova",
            matchSummary: "Strong secondary candidate if human models/fashion styling is introduced into the skincare campaign.",
            supportingCapabilities: ["Studio Lighting & Multi-Light Setup", "Editorial Portraiture & High Fashion"],
            supportingEvidence: ["artist_01/img_01.jpg"],
            tradeoffs: "Focus is on high-fashion human editorial rather than dedicated macro glassware physics.",
            assumptions: "Assumed Elena's studio lighting mastery extends to micro product reflections.",
            confidence: "MEDIUM"
          }
        ],
        refinementQuestions: [
          {
            question: "Will the shoot feature human model hands/faces holding the cosmetics, or strictly standalone macro product hero shots?",
            whyItMatters: "Aria Thorne is unbeatable for macro standalone glass; Elena Rostova is ideal if fashion model staging is needed.",
            rankingImpact: "If models are involved, Elena Rostova moves up."
          }
        ]
      }
    },
    {
      id: "brief_04",
      title: "Tech Conference Keynote & Speaker Highlight Reel",
      category: "Video Editor",
      hirerRawConversation: "We have raw multi-cam footage from our annual tech keynote. We need an editor who can handle multi-cam switching, normalize audio between speakers, and add polished corporate lower thirds.",
      interpretation: {
        explicitConstraints: [
          "Category: Video Editor",
          "Type: Corporate Multi-cam Tech Keynote Edit",
          "Requirements: Multi-camera lip sync switching, audio normalization, corporate lower thirds"
        ],
        reasonableAssumptions: [
          "Multi-cam scratch audio tracks are provided for sync.",
          "Corporate brand color palette guidelines will be supplied."
        ],
        contradictions: [],
        unknowns: [
          "Whether 3D graphic stage intros are needed."
        ]
      },
      initialRecommendations: {
        topMatches: [
          {
            rank: 1,
            artistId: "artist_14",
            artistName: "Hannah Wright",
            matchSummary: "Direct match with explicit multi-cam keynote presentation switching and corporate lower thirds proof.",
            supportingCapabilities: ["Multi-Camera Keynote Switching & Corporate Clean Lines"],
            supportingEvidence: ["artist_14/corp_01.mp4 @ 00:30-01:50"],
            tradeoffs: "Standard corporate presentation style; lacks high-energy music video VFX.",
            assumptions: "Assumed client prioritizes clear presentation over aggressive stylistic cuts.",
            confidence: "HIGH"
          },
          {
            rank: 2,
            artistId: "artist_12",
            artistName: "Sophia Rossi",
            matchSummary: "Solid alternative if narrative documentary speaker pacing is desired.",
            supportingCapabilities: ["Narrative Arc & Interview Cutaway Storytelling"],
            supportingEvidence: ["artist_12/doc_01.mp4 @ 00:45-02:10"],
            tradeoffs: "Specializes in documentary films rather than multi-cam keynote presentation layouts.",
            assumptions: "Assumed Sophia can execute multi-cam sync workflows.",
            confidence: "MEDIUM"
          }
        ],
        refinementQuestions: [
          {
            question: "Do you need rapid multi-camera presentation cut switching or documentary narrative speaker storytelling?",
            whyItMatters: "Hannah Wright is specialized in multi-cam presentation cuts; Sophia Rossi is specialized in story arcs.",
            rankingImpact: "Re-affirms choice based on keynote vs documentary goal."
          }
        ]
      }
    }
  ]
};

module.exports = dataset;
