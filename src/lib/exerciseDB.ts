// ExerciseDB API Service
// Free API for exercise data, GIFs, and instructions
// API Endpoint: https://exercisedb-api1.p.rapidapi.com/
// Get your free API key from: https://rapidapi.com/developersgoaltech/api/exercisedb-api1

const EXERCISEDB_BASE_URL = 'https://exercisedb-api1.p.rapidapi.com/api/v1';
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || 'YOUR_API_KEY_HERE';
const USE_API = true; // Set to true after subscribing to the API on RapidAPI

export interface Exercise {
  id: string;
  name: string;
  gifUrl: string;
  targetMuscle: string;
  equipment: string;
  bodyPart: string;
  instructions: string[];
  secondaryMuscles?: string[];
}

interface ApiExercise {
  exerciseId?: string;
  id?: string;
  name: string;
  imageUrl?: string;
  gifUrl?: string;
  primaryMuscles?: string[];
  target?: string;
  equipment?: string;
  bodyPart?: string;
  instructions?: string[];
  secondaryMuscles?: string[];
}

/**
 * Fetch exercise data from ExerciseDB API by name
 * @param {string} exerciseName - Name of the exercise to search for
 * @returns {Promise<Exercise | null>} Exercise data including GIF, instructions, etc.
 */
export const fetchExerciseFromAPI = async (exerciseName: string): Promise<Exercise | null> => {
  // Skip API if not subscribed
  if (!USE_API || RAPIDAPI_KEY === 'YOUR_API_KEY_HERE') {
    return null;
  }

  try {
    // Search for exercise by name
    const searchQuery = exerciseName.toLowerCase().replace(/\s+/g, '+');
    const searchResponse = await fetch(
      `${EXERCISEDB_BASE_URL}/exercises/search?search=${searchQuery}`,
      {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'exercisedb-api1.p.rapidapi.com'
        }
      }
    );

    if (!searchResponse.ok) {
      throw new Error('Exercise not found');
    }

    const data: { data?: ApiExercise[] } = await searchResponse.json();
    
    if (data && data.data && data.data.length > 0) {
      const exercise = data.data[0]; // Take first match
      
      // Map API response to our format
      return {
        id: (exercise.exerciseId || exercise.id) || 'unknown',
        name: exercise.name,
        gifUrl: (exercise.imageUrl || exercise.gifUrl) || '', // API uses 'imageUrl' not 'gifUrl'
        targetMuscle: exercise.primaryMuscles?.[0] || exercise.target || 'full body',
        equipment: exercise.equipment || 'body weight',
        bodyPart: exercise.bodyPart || 'full body',
        instructions: exercise.instructions || [
          'Position yourself correctly with proper form',
          'Engage your core and maintain neutral spine', 
          'Perform the movement in a controlled manner',
          'Focus on the target muscle group',
          'Breathe properly throughout the exercise'
        ],
        secondaryMuscles: exercise.secondaryMuscles || []
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching from ExerciseDB:', error);
    return null;
  }
};

/**
 * Get exercise data - tries API first, falls back to local search
 * @param {string} exerciseName - Name of exercise
 * @returns {Promise<Exercise>} Exercise data
 */
export const getExerciseData = async (exerciseName: string): Promise<Exercise> => {
  if (!exerciseName) {
    return getDefaultExercise('Unknown Exercise');
  }

  // Try fetching from API (will skip if not subscribed)
  const apiData = await fetchExerciseFromAPI(exerciseName);
  
  if (apiData) {
    return apiData;
  }

  // Fallback to local database
  const localData = searchLocalDatabase(exerciseName);
  if (localData) {
    return localData;
  }

  // Return default
  return getDefaultExercise(exerciseName);
};

/**
 * Search local exercise database (fallback when API fails)
 * Minimal database for offline support
 */
const localExerciseDatabase: Record<string, Omit<Exercise, 'name'>> = {
  // STRENGTH TRAINING - CHEST
  'bench press': {
    id: 'bench_press',
    gifUrl: 'https://v2.exercisedb.io/image/Y0T5ICa8Y6UMCz',
    targetMuscle: 'pectorals',
    equipment: 'barbell',
    bodyPart: 'chest',
    instructions: [
      'Lie flat on a bench with feet firmly on the ground',
      'Grip the barbell slightly wider than shoulder-width',
      'Lower the bar slowly to your mid-chest',
      'Press the bar back up to starting position',
      'Keep your shoulder blades retracted throughout'
    ]
  },
  'dumbbell chest press': {
    id: 'db_chest_press',
    gifUrl: 'https://v2.exercisedb.io/image/pP3eEyIHtd2qS9',
    targetMuscle: 'pectorals',
    equipment: 'dumbbell',
    bodyPart: 'chest',
    instructions: [
      'Lie on a flat bench with a dumbbell in each hand',
      'Position dumbbells at chest level with elbows bent',
      'Press dumbbells up until arms are extended',
      'Lower back down with control',
      'Keep movements smooth and controlled'
    ]
  },
  'chest fly': {
    id: 'chest_fly',
    gifUrl: 'https://v2.exercisedb.io/image/wFd3KzNLjnON1A',
    targetMuscle: 'pectorals',
    equipment: 'dumbbell',
    bodyPart: 'chest',
    instructions: [
      'Lie on bench with dumbbells extended above chest',
      'Maintain slight bend in elbows',
      'Lower dumbbells in wide arc until chest stretch',
      'Squeeze chest to bring dumbbells back together',
      'Control the movement throughout'
    ]
  },
  'incline bench press': {
    id: 'incline_bench',
    gifUrl: 'https://v2.exercisedb.io/image/N8fVJvRxdP8OIa',
    targetMuscle: 'upper chest',
    equipment: 'barbell',
    bodyPart: 'chest',
    instructions: [
      'Set bench to 30-45 degree incline',
      'Grip bar slightly wider than shoulders',
      'Lower bar to upper chest',
      'Press back to starting position',
      'Focus on upper chest engagement'
    ]
  },
  
  // STRENGTH TRAINING - BACK
  'deadlift': {
    id: 'deadlift',
    gifUrl: 'https://v2.exercisedb.io/image/bAWQSgdvNMBxoZ',
    targetMuscle: 'lower back',
    equipment: 'barbell',
    bodyPart: 'back',
    instructions: [
      'Stand with feet hip-width apart, barbell over mid-foot',
      'Bend at hips and knees to grip the bar',
      'Keep back straight, chest up, core engaged',
      'Drive through heels to lift the bar',
      'Lower the bar back down with control'
    ]
  },
  'pull-up': {
    id: 'pull_up',
    gifUrl: 'https://v2.exercisedb.io/image/HaL6b6S7xWBqCN',
    targetMuscle: 'lats',
    equipment: 'body weight',
    bodyPart: 'back',
    instructions: [
      'Hang from pull-up bar with overhand grip',
      'Pull shoulder blades back and down',
      'Pull yourself up until chin is above bar',
      'Lower yourself back down with control',
      'Avoid swinging or using momentum'
    ]
  },
  'bent over row': {
    id: 'bent_row',
    gifUrl: 'https://v2.exercisedb.io/image/ew3dL8kKSCNvDv',
    targetMuscle: 'lats',
    equipment: 'barbell',
    bodyPart: 'back',
    instructions: [
      'Hinge at hips with slight knee bend',
      'Grip barbell with hands shoulder-width',
      'Pull bar to lower chest/upper abdomen',
      'Squeeze shoulder blades together',
      'Lower with control and repeat'
    ]
  },
  'lat pulldown': {
    id: 'lat_pulldown',
    gifUrl: 'https://v2.exercisedb.io/image/ZdxR3BpnS2yKGO',
    targetMuscle: 'lats',
    equipment: 'cable',
    bodyPart: 'back',
    instructions: [
      'Sit at lat pulldown machine',
      'Grip bar wider than shoulder width',
      'Pull bar down to upper chest',
      'Squeeze shoulder blades together',
      'Control the weight back up'
    ]
  },
  'dumbbell row': {
    id: 'db_row',
    gifUrl: 'https://v2.exercisedb.io/image/M3WDgp6xMaBOHN',
    targetMuscle: 'lats',
    equipment: 'dumbbell',
    bodyPart: 'back',
    instructions: [
      'Place one knee and hand on bench',
      'Hold dumbbell in opposite hand',
      'Pull dumbbell to hip, elbow close to body',
      'Squeeze at top of movement',
      'Lower with control'
    ]
  },
  
  // STRENGTH TRAINING - LEGS
  'squat': {
    id: 'squat',
    gifUrl: 'https://v2.exercisedb.io/image/Y4tJAC3vPwS4rJ',
    targetMuscle: 'quadriceps',
    equipment: 'barbell',
    bodyPart: 'legs',
    instructions: [
      'Position barbell on upper back',
      'Stand with feet shoulder-width apart',
      'Lower body by bending knees and hips',
      'Descend until thighs are parallel to floor',
      'Drive through heels to return to starting position'
    ]
  },
  'leg press': {
    id: 'leg_press',
    gifUrl: 'https://v2.exercisedb.io/image/vT8kNmJ9aPWdCB',
    targetMuscle: 'quadriceps',
    equipment: 'machine',
    bodyPart: 'legs',
    instructions: [
      'Sit on leg press machine',
      'Place feet shoulder-width on platform',
      'Lower weight by bending knees',
      'Press through heels to extend legs',
      'Maintain controlled movement'
    ]
  },
  'lunges': {
    id: 'lunges',
    gifUrl: 'https://v2.exercisedb.io/image/kLFiM8EYdLtHza',
    targetMuscle: 'quadriceps',
    equipment: 'body weight',
    bodyPart: 'legs',
    instructions: [
      'Stand with feet hip-width apart',
      'Step forward with one leg',
      'Lower hips until both knees at 90 degrees',
      'Push through front heel to return',
      'Alternate legs'
    ]
  },
  'romanian deadlift': {
    id: 'rdl',
    gifUrl: 'https://v2.exercisedb.io/image/aPZ6tNvmBWRnCx',
    targetMuscle: 'hamstrings',
    equipment: 'barbell',
    bodyPart: 'legs',
    instructions: [
      'Hold barbell at hip level',
      'Hinge at hips, keeping back straight',
      'Lower bar along legs',
      'Feel stretch in hamstrings',
      'Drive hips forward to return'
    ]
  },
  
  // BODYWEIGHT EXERCISES
  'push-up': {
    id: 'push_up',
    gifUrl: 'https://v2.exercisedb.io/image/cqxnvgWBGWsKya',
    targetMuscle: 'pectorals',
    equipment: 'body weight',
    bodyPart: 'chest',
    instructions: [
      'Start in plank position, hands slightly wider than shoulders',
      'Keep body in straight line from head to heels',
      'Lower chest toward ground by bending elbows',
      'Push back up to starting position',
      'Keep core tight throughout'
    ]
  },
  'plank': {
    id: 'plank',
    gifUrl: 'https://v2.exercisedb.io/image/wNxaLzR9YdOv4M',
    targetMuscle: 'abs',
    equipment: 'body weight',
    bodyPart: 'waist',
    instructions: [
      'Start in forearm plank position',
      'Keep body in straight line',
      'Engage core and glutes',
      'Hold position for time',
      'Breathe steadily throughout'
    ]
  },
  'mountain climbers': {
    id: 'mountain_climbers',
    gifUrl: 'https://v2.exercisedb.io/image/VLKpU3NvRxCw8M',
    targetMuscle: 'abs',
    equipment: 'body weight',
    bodyPart: 'cardio',
    instructions: [
      'Start in high plank position',
      'Drive one knee toward chest',
      'Quickly switch legs',
      'Continue alternating at quick pace',
      'Keep core engaged and hips level'
    ]
  },
  'burpees': {
    id: 'burpees',
    gifUrl: 'https://v2.exercisedb.io/image/xMzPBg9kC2LdNa',
    targetMuscle: 'full body',
    equipment: 'body weight',
    bodyPart: 'cardio',
    instructions: [
      'Start standing, then squat down',
      'Place hands on ground, jump feet back',
      'Perform a push-up',
      'Jump feet back to hands',
      'Explosively jump up with arms overhead'
    ]
  },
  
  // CARDIO / HIIT
  'jumping jacks': {
    id: 'jumping_jacks',
    gifUrl: 'https://v2.exercisedb.io/image/RnX3vLKpH8CdNM',
    targetMuscle: 'full body',
    equipment: 'body weight',
    bodyPart: 'cardio',
    instructions: [
      'Stand with feet together, arms at sides',
      'Jump while spreading feet wide',
      'Raise arms overhead simultaneously',
      'Jump back to starting position',
      'Maintain steady rhythm'
    ]
  },
  'high knees': {
    id: 'high_knees',
    gifUrl: 'https://v2.exercisedb.io/image/OdBXmN9vC2RaPw',
    targetMuscle: 'legs',
    equipment: 'body weight',
    bodyPart: 'cardio',
    instructions: [
      'Stand with feet hip-width apart',
      'Drive one knee up to hip level',
      'Quickly switch to other knee',
      'Pump arms in running motion',
      'Maintain quick pace'
    ]
  },
  'box jumps': {
    id: 'box_jumps',
    gifUrl: 'https://v2.exercisedb.io/image/KvP8dL9mCxRnNa',
    targetMuscle: 'legs',
    equipment: 'box',
    bodyPart: 'cardio',
    instructions: [
      'Stand in front of sturdy box or platform',
      'Swing arms and jump explosively onto box',
      'Land softly with knees bent',
      'Step or jump back down',
      'Reset and repeat'
    ]
  },
  'jump rope': {
    id: 'jump_rope',
    gifUrl: 'https://v2.exercisedb.io/image/mN9vLkC8dRxBaP',
    targetMuscle: 'calves',
    equipment: 'rope',
    bodyPart: 'cardio',
    instructions: [
      'Hold jump rope handles at hip level',
      'Swing rope overhead and jump as it passes',
      'Land on balls of feet',
      'Keep jumps small and quick',
      'Maintain steady rhythm'
    ]
  },
  'battle ropes': {
    id: 'battle_ropes',
    gifUrl: 'https://v2.exercisedb.io/image/pL9kC8BvMxRnNa',
    targetMuscle: 'shoulders',
    equipment: 'rope',
    bodyPart: 'cardio',
    instructions: [
      'Grip rope ends with both hands',
      'Stand with feet shoulder-width apart',
      'Create waves by alternating arm movements',
      'Maintain athletic stance',
      'Keep core engaged throughout'
    ]
  },
  'sprint intervals': {
    id: 'sprints',
    gifUrl: 'https://v2.exercisedb.io/image/vN8kLp9mCxRnBa',
    targetMuscle: 'legs',
    equipment: 'body weight',
    bodyPart: 'cardio',
    instructions: [
      'Mark out distance or set timed intervals',
      'Sprint at maximum effort for 20-30 seconds',
      'Recover with light jog or walk',
      'Repeat for desired intervals',
      'Focus on proper running form'
    ]
  },
  
  // YOGA & FLEXIBILITY
  'downward dog': {
    id: 'down_dog',
    gifUrl: 'https://v2.exercisedb.io/image/kN9vLmC8BxPnNa',
    targetMuscle: 'full body',
    equipment: 'body weight',
    bodyPart: 'waist',
    instructions: [
      'Start on hands and knees',
      'Lift hips up and back, forming inverted V',
      'Straighten legs, press heels toward floor',
      'Relax head between arms',
      'Hold and breathe deeply'
    ]
  },
  'warrior pose': {
    id: 'warrior',
    gifUrl: 'https://v2.exercisedb.io/image/mL9kC8vBxRnNaP',
    targetMuscle: 'legs',
    equipment: 'body weight',
    bodyPart: 'waist',
    instructions: [
      'Step one foot back, turn back foot out',
      'Bend front knee to 90 degrees',
      'Extend arms out to sides at shoulder height',
      'Keep torso upright and centered',
      'Hold position and breathe'
    ]
  },
  'child pose': {
    id: 'child_pose',
    gifUrl: 'https://v2.exercisedb.io/image/pN9vLkC8BxRnMa',
    targetMuscle: 'back',
    equipment: 'body weight',
    bodyPart: 'waist',
    instructions: [
      'Kneel on floor with knees wide',
      'Sit hips back toward heels',
      'Extend arms forward on floor',
      'Rest forehead on ground',
      'Relax and breathe deeply'
    ]
  },
  'cat cow stretch': {
    id: 'cat_cow',
    gifUrl: 'https://v2.exercisedb.io/image/vL9kC8BxMnRaPw',
    targetMuscle: 'spine',
    equipment: 'body weight',
    bodyPart: 'waist',
    instructions: [
      'Start on hands and knees',
      'Arch back, drop belly (cow)',
      'Round spine, tuck chin (cat)',
      'Flow between positions with breath',
      'Continue for several repetitions'
    ]
  },
  'pigeon pose': {
    id: 'pigeon',
    gifUrl: 'https://v2.exercisedb.io/image/kL9vC8BxMnRaPw',
    targetMuscle: 'hips',
    equipment: 'body weight',
    bodyPart: 'waist',
    instructions: [
      'From downward dog, bring one knee forward',
      'Extend back leg straight behind',
      'Square hips toward front',
      'Fold forward over front leg',
      'Hold and breathe, switch sides'
    ]
  },
  'seated forward fold': {
    id: 'forward_fold',
    gifUrl: 'https://v2.exercisedb.io/image/pL9kC8vBxMnRaw',
    targetMuscle: 'hamstrings',
    equipment: 'body weight',
    bodyPart: 'waist',
    instructions: [
      'Sit with legs extended straight',
      'Hinge at hips, reach toward feet',
      'Keep spine long, avoid rounding',
      'Breathe into the stretch',
      'Hold for 30-60 seconds'
    ]
  },
  'cobra pose': {
    id: 'cobra',
    gifUrl: 'https://v2.exercisedb.io/image/mN9vLkC8BxRnPa',
    targetMuscle: 'abs',
    equipment: 'body weight',
    bodyPart: 'waist',
    instructions: [
      'Lie face down, hands under shoulders',
      'Press through hands to lift chest',
      'Keep hips on ground',
      'Draw shoulders back and down',
      'Hold and breathe deeply'
    ]
  },
  'tree pose': {
    id: 'tree_pose',
    gifUrl: 'https://v2.exercisedb.io/image/vN9kLmC8BxRnPa',
    targetMuscle: 'legs',
    equipment: 'body weight',
    bodyPart: 'waist',
    instructions: [
      'Stand on one leg',
      'Place other foot on inner thigh or calf',
      'Bring hands to prayer position',
      'Find your balance point',
      'Hold and breathe, switch sides'
    ]
  }
};

/**
 * Search local database for exercise
 */
const searchLocalDatabase = (exerciseName: string): Exercise | null => {
  const normalizedName = exerciseName.toLowerCase().trim();
  
  // Exact match
  if (localExerciseDatabase[normalizedName]) {
    return {
      name: exerciseName,
      ...localExerciseDatabase[normalizedName]
    };
  }

  // Fuzzy match
  const bestMatch = Object.keys(localExerciseDatabase).find(key => 
    normalizedName.includes(key) || key.includes(normalizedName)
  );

  if (bestMatch) {
    return {
      name: exerciseName,
      ...localExerciseDatabase[bestMatch]
    };
  }

  return null;
};

/**
 * Default exercise data for unknown exercises
 */
const getDefaultExercise = (name: string): Exercise => ({
  name: name,
  id: 'default',
  gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop&auto=format&q=80',
  targetMuscle: 'full body',
  equipment: 'various',
  bodyPart: 'full body',
  instructions: [
    'Position yourself correctly with proper form',
    'Engage your core and maintain neutral spine',
    'Perform the movement in a controlled manner',
    'Focus on the target muscle group',
    'Breathe properly throughout the exercise'
  ]
});

/**
 * Fetch list of exercises by body part (for future use)
 */
export const getExercisesByBodyPart = async (bodyPart: string): Promise<ApiExercise[]> => {
  try {
    const response = await fetch(
      `${EXERCISEDB_BASE_URL}/exercises/bodyPart/${bodyPart}`,
      {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'exercisedb-api1.p.rapidapi.com'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exercises');
    }

    const data: { data?: ApiExercise[] } = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching exercises by body part:', error);
    return [];
  }
};
/**
 * Mock DB object for compatibility
 */
export const exerciseDB = {
  getList: (target?: string): Exercise[] => {
    const all = Object.entries(localExerciseDatabase).map(([name, data]) => ({
      name,
      ...data,
      // Ensure missing fields are present for Exercise interface
      instructions: data.instructions || [],
      secondaryMuscles: [] 
    }));
    
    // Filter based on target
    if (target) {
        // Handle comma-separated targets (e.g., "chest,back,legs")
        const targets = target.split(',').map(t => t.trim().toLowerCase());
        
        return all.filter(ex => {
          const bodyPartLower = ex.bodyPart.toLowerCase();
          const targetMuscleLower = ex.targetMuscle.toLowerCase();
          const nameLower = ex.name.toLowerCase();
          
          // Match if ANY of the targets match
          return targets.some(targetLower => 
            bodyPartLower.includes(targetLower) || 
            targetMuscleLower.includes(targetLower) ||
            nameLower.includes(targetLower) ||
            targetLower.includes(bodyPartLower) ||
            targetLower.includes(targetMuscleLower)
          );
        });
    }
    return all;
  }
};
