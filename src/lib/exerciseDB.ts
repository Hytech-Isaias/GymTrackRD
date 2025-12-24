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
