import { ACTIVITY_DATABASE } from '../constants';
import { Activity, ChildProfile, TeaLevel } from '../types';

// Helper to shuffle array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const generateDailyRoutine = (child: ChildProfile): Activity[] => {
  let routine: Activity[] = [];

  // 1. Filter suitable activities based on Profile
  const candidates = ACTIVITY_DATABASE.filter(act => {
    // Filter by age
    if (act.suitableFor.minAge && child.age < act.suitableFor.minAge) return false;
    if (act.suitableFor.maxAge && child.age > act.suitableFor.maxAge) return false;
    
    // Filter by Level (if specified in activity, strictly enforce. If undefined, assumes suitable for all)
    if (act.suitableFor.levels && !act.suitableFor.levels.includes(child.level)) return false;

    return true;
  });

  // Shuffle candidates to ensure variety every day
  const shuffledCandidates = shuffleArray(candidates);

  // 2. Prioritization Logic (The "Algorithm")
  
  // A. Specific Needs Handlers (Guarantee at least one of each needed category if available)
  if (child.hasFoodSelectivity) {
    const foodActs = shuffledCandidates.filter(a => a.category === 'Alimentação' || a.suitableFor.needsFoodFocus);
    if(foodActs.length > 0) routine.push(foodActs[0]);
  }

  if (child.hasSpeechDelay) {
    const speechActs = shuffledCandidates.filter(a => a.category === 'Comunicação' || a.suitableFor.needsSpeechFocus);
    if(speechActs.length > 0) routine.push(speechActs[0]);
  }

  if (child.hasMotorDifficulty) {
    const motorActs = shuffledCandidates.filter(a => a.category === 'Terapia Ocupacional' || a.suitableFor.needsMotorFocus);
    if(motorActs.length > 0) routine.push(motorActs[0]);
  }

  if (child.hasSensoryIssues) {
     const sensoryActs = shuffledCandidates.filter(a => a.category === 'Sensorial' || a.suitableFor.needsSensoryFocus);
     if(sensoryActs.length > 0) routine.push(sensoryActs[0]);
  }

  // 3. Fill the rest based on Age/Level archetypes to reach 4 activities
  // We continue iterating through shuffledCandidates to fill spots
  
  const targetCount = 4;
  
  for (const act of shuffledCandidates) {
    if (routine.length >= targetCount) break;
    
    // Avoid duplicates (by ID)
    if (routine.find(r => r.id === act.id)) continue;

    // Contextual Filling Logic
    // For Level 1 (High functioning/Low support needs): Prioritize Cognitive & Social
    if (child.level === TeaLevel.LEVEL_1) {
       if (act.category === 'Cognitivo' || act.category === 'Socialização' || act.category === 'Comunicação') {
         routine.push(act);
       }
    }
    // For Level 2/3 (Higher support needs): Prioritize Sensory & Communication & Basic ADL (OT)
    else {
       if (act.category === 'Sensorial' || act.category === 'Comunicação' || act.category === 'Terapia Ocupacional') {
         routine.push(act);
       }
    }
  }

  // 4. Fallback Filling
  // If we still haven't reached 4 activities (e.g., strict filters above), just fill with any valid remaining candidate
  for (const act of shuffledCandidates) {
    if (routine.length >= targetCount) break;
    if (!routine.find(r => r.id === act.id)) {
      routine.push(act);
    }
  }

  return routine;
};