const fs = require('fs');
const path = require('path');
const dataset = require('../data/dataset');

/**
 * Service for handling Hirer Brief interpretation, Candidate Recommendations, Refinement Questions, and Re-ranking.
 */
class RecommendationService {
  static getAllBriefs() {
    return dataset.briefs.map(b => ({
      id: b.id,
      title: b.title,
      category: b.category,
      hirerRawConversation: b.hirerRawConversation,
      hasFollowUp: !!b.followUpUpdate
    }));
  }

  static getBriefById(id) {
    return dataset.briefs.find(b => b.id === id);
  }

  static getRecommendationsForBrief(briefId) {
    const brief = this.getBriefById(briefId);
    if (!brief) return null;

    return {
      briefId: brief.id,
      title: brief.title,
      category: brief.category,
      hirerRawConversation: brief.hirerRawConversation,
      interpretation: brief.interpretation,
      topMatches: brief.initialRecommendations.topMatches,
      refinementQuestions: brief.initialRecommendations.refinementQuestions
    };
  }

  static getUpdatedRecommendationsForBrief(briefId) {
    const brief = this.getBriefById(briefId);
    if (!brief || !brief.followUpUpdate) {
      return {
        briefId: briefId,
        hasFollowUp: false,
        message: "No follow-up update exists for this brief."
      };
    }

    return {
      briefId: brief.id,
      title: brief.title,
      followUpUpdate: brief.followUpUpdate.updateText,
      updatedInterpretation: brief.followUpUpdate.updatedInterpretation,
      reRankingAudit: brief.followUpUpdate.updatedRecommendations
    };
  }

  /**
   * Generates recommendations.json and updated_recommendation.json files
   */
  static generateJsonOutputs(targetDirectory) {
    // 1. recommendations.json
    const initialRecs = dataset.briefs.map(b => ({
      brief_id: b.id,
      title: b.title,
      hirer_brief: b.hirerRawConversation,
      interpreted_requirements: b.interpretation,
      top_matches: b.initialRecommendations.topMatches.map(m => ({
        rank: m.rank,
        artist_id: m.artistId,
        artist_name: m.artistName,
        match_summary: m.matchSummary,
        supporting_capabilities: m.supportingCapabilities,
        supporting_evidence: m.supportingEvidence,
        tradeoffs: m.tradeoffs,
        assumptions: m.assumptions,
        confidence: m.confidence
      })),
      refinement_questions: b.initialRecommendations.refinementQuestions
    }));

    const recsFilePath = path.join(targetDirectory, 'recommendations.json');
    fs.writeFileSync(recsFilePath, JSON.stringify(initialRecs, null, 2), 'utf-8');

    // 2. updated_recommendation.json (focused on brief_01 follow-up)
    const briefWithUpdate = dataset.briefs.find(b => b.followUpUpdate);
    const updatedRecObj = {
      brief_id: briefWithUpdate.id,
      title: briefWithUpdate.title,
      follow_up_update_text: briefWithUpdate.followUpUpdate.updateText,
      updated_interpretation: briefWithUpdate.followUpUpdate.updatedInterpretation,
      re_ranking_comparison: {
        previous_ranking: briefWithUpdate.followUpUpdate.updatedRecommendations.previousOrder,
        updated_ranking: briefWithUpdate.followUpUpdate.updatedRecommendations.updatedOrder,
        audit_of_changes: briefWithUpdate.followUpUpdate.updatedRecommendations.changesAudit
      }
    };

    const updatedFilePath = path.join(targetDirectory, 'updated_recommendation.json');
    fs.writeFileSync(updatedFilePath, JSON.stringify(updatedRecObj, null, 2), 'utf-8');

    return { recsFilePath, updatedFilePath };
  }
}

module.exports = RecommendationService;
