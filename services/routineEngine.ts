
import { ACTIVITY_DATABASE } from '../constants';
import { Activity, ChildProfile, TeaLevel, CompletedActivity } from '../types';

// Helper to shuffle array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const generateDailyRoutine = (child: ChildProfile, history: CompletedActivity[]): Activity[] => {
  let routine: Activity[] = [];

  // 1. ANTI-REPETITION LOGIC
  // Get IDs of activities done in the last 3 days
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  
  const recentActivityIds = history
    .filter(h => new Date(h.date) > threeDaysAgo)
    .map(h => h.activityId);

  // 2. Filter suitable activities based on Profile AND History
  const candidates = ACTIVITY_DATABASE.filter(act => {
    // Avoid recently done activities
    if (recentActivityIds.includes(act.id)) return false;

    // Filter by age
    if (act.suitableFor.minAge && child.age < act.suitableFor.minAge) return false;
    if (act.suitableFor.maxAge && child.age > act.suitableFor.maxAge) return false;
    
    // Filter by Level
    if (act.suitableFor.levels && !act.suitableFor.levels.includes(child.level)) return false;

    return true;
  });

  // Check if we have enough candidates after filtering history. If not, relax the history filter.
  let availablePool = candidates;
  if (candidates.length < 4) {
     // Fallback: use full database filtered only by age/level
     availablePool = ACTIVITY_DATABASE.filter(act => {
        if (act.suitableFor.minAge && child.age < act.suitableFor.minAge) return false;
        if (act.suitableFor.maxAge && child.age > act.suitableFor.maxAge) return false;
        if (act.suitableFor.levels && !act.suitableFor.levels.includes(child.level)) return false;
        return true;
     });
  }

  const shuffledCandidates = shuffleArray(availablePool);

  // 3. Prioritization Logic (The "Algorithm")
  
  // A. Specific Needs Handlers
  if (child.hasFoodSelectivity) {
    const foodActs = shuffledCandidates.filter(a => a.category === 'Alimentação' || a.suitableFor.needsFoodFocus);
    if(foodActs.length > 0) routine.push(foodActs[0]);
  }

  if (child.hasSpeechDelay) {
    const speechActs = shuffledCandidates.filter(a => a.category === 'Comunicação' || a.suitableFor.needsSpeechFocus);
    if(speechActs.length > 0) routine.push(speechActs[0]);
  }

  // B. LEVEL 3 SPECIFIC LOGIC (High Support Needs)
  // Prioritize Sensory Regulation and Motor (OT) activities
  if (child.level === TeaLevel.LEVEL_3) {
      const sensoryActs = shuffledCandidates.filter(a => a.category === 'Sensorial');
      // Add a sensory activity if not already present
      if(sensoryActs.length > 0 && !routine.find(r => r.category === 'Sensorial')) {
          routine.push(sensoryActs[0]);
      }
      // Add an OT activity if not already present
      const otActs = shuffledCandidates.filter(a => a.category === 'Terapia Ocupacional');
      if(otActs.length > 0 && !routine.find(r => r.category === 'Terapia Ocupacional')) {
         routine.push(otActs[0]);
      }
  }

  // Standard Needs Logic
  if (child.hasMotorDifficulty && !routine.find(r => r.category === 'Terapia Ocupacional')) {
    const motorActs = shuffledCandidates.filter(a => a.category === 'Terapia Ocupacional' || a.suitableFor.needsMotorFocus);
    if(motorActs.length > 0) routine.push(motorActs[0]);
  }

  if (child.hasSensoryIssues && !routine.find(r => r.category === 'Sensorial')) {
     const sensoryActs = shuffledCandidates.filter(a => a.category === 'Sensorial' || a.suitableFor.needsSensoryFocus);
     if(sensoryActs.length > 0) routine.push(sensoryActs[0]);
  }

  // 4. Fill the rest
  const targetCount = 4;
  
  for (const act of shuffledCandidates) {
    if (routine.length >= targetCount) break;
    if (routine.find(r => r.id === act.id)) continue;

    // Contextual Filling Logic
    if (child.level === TeaLevel.LEVEL_1) {
       if (act.category === 'Cognitivo' || act.category === 'Socialização' || act.category === 'Comunicação') {
         routine.push(act);
       }
    }
    else {
       // Levels 2 & 3 prefer these categories
       if (act.category === 'Sensorial' || act.category === 'Comunicação' || act.category === 'Terapia Ocupacional') {
         routine.push(act);
       }
    }
  }

  // 5. Final Fallback
  for (const act of shuffledCandidates) {
    if (routine.length >= targetCount) break;
    if (!routine.find(r => r.id === act.id)) {
      routine.push(act);
    }
  }

  return routine;
};
