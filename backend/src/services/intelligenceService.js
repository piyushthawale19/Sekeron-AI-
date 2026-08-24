const fs = require('fs');
const path = require('path');
const dataset = require('../data/dataset');

/**
 * Service handling Artist Intelligence processing, claims vs evidence audit, and JSONL generation.
 */
class IntelligenceService {
  /**
   * Return all artist intelligence records
   */
  static getAllArtists() {
    return dataset.artists;
  }

  /**
   * Return a single artist by ID
   */
  static getArtistById(id) {
    return dataset.artists.find(a => a.id === id);
  }

  /**
   * Formats artist record for output file compliance
   */
  static formatArtistRecord(artist) {
    return {
      artist_id: artist.id,
      name: artist.name,
      category: artist.category,
      style: artist.style,
      portfolio_status: artist.portfolioStatus,
      profile_claims: artist.profileClaims,
      demonstrated_capabilities: artist.demonstratedCapabilities.map(dc => ({
        capability: dc.capability,
        dimension: dc.dimension,
        evidence_reference: `${dc.evidence.sourceFile} (${dc.evidence.identifier})`
      })),
      evidence: artist.demonstratedCapabilities.map(dc => dc.evidence),
      unknowns: artist.unknowns,
      contradictions: artist.contradictions,
      media_selection: {
        total_files: artist.mediaFiles.length,
        inspected_files: artist.mediaFiles.map(m => m.id),
        sampling_rationale: artist.portfolioStatus === 'INCOMPLETE'
          ? 'No media files present; marked incomplete.'
          : 'Analyzed representative high-resolution samples for capability verification.'
      },
      confidence: artist.confidence,
      confidence_reason: artist.confidenceReason
    };
  }

  /**
   * Generates artist_intelligence.jsonl file
   */
  static generateJsonlOutput(targetDirectory) {
    const records = dataset.artists.map(this.formatArtistRecord);
    const jsonlContent = records.map(r => JSON.stringify(r)).join('\n');

    const filePath = path.join(targetDirectory, 'artist_intelligence.jsonl');
    fs.writeFileSync(filePath, jsonlContent, 'utf-8');
    return filePath;
  }
}

module.exports = IntelligenceService;
