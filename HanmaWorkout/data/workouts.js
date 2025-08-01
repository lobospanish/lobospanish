export const workoutData = {
  'Full Body': [
    { id: 1, name: 'Push-ups', reps: '20x', duration: 30, image: 'pushup.gif' },
    { id: 2, name: 'Squats', reps: '25x', duration: 30, image: 'squat.gif' },
    { id: 3, name: 'Plank', reps: '30 sec', duration: 30, image: 'plank.gif' },
    { id: 4, name: 'Lunges', reps: '15x each leg', duration: 30, image: 'lunge.gif' },
    { id: 5, name: 'Mountain Climbers', reps: '20x', duration: 30, image: 'mountain.gif' },
    { id: 6, name: 'Burpees', reps: '10x', duration: 30, image: 'burpee.gif' },
    { id: 7, name: 'Jumping Jacks', reps: '30x', duration: 30, image: 'jumping.gif' },
  ],
  'Chest': [
    { id: 1, name: 'Push-ups', reps: '20x', duration: 30, image: 'pushup.gif' },
    { id: 2, name: 'Wide Push-ups', reps: '15x', duration: 30, image: 'wide_pushup.gif' },
    { id: 3, name: 'Diamond Push-ups', reps: '10x', duration: 30, image: 'diamond_pushup.gif' },
    { id: 4, name: 'Incline Push-ups', reps: '15x', duration: 30, image: 'incline_pushup.gif' },
    { id: 5, name: 'Decline Push-ups', reps: '12x', duration: 30, image: 'decline_pushup.gif' },
    { id: 6, name: 'Chest Dips', reps: '15x', duration: 30, image: 'dips.gif' },
  ],
  'Legs': [
    { id: 1, name: 'Squats', reps: '25x', duration: 30, image: 'squat.gif' },
    { id: 2, name: 'Lunges', reps: '15x each leg', duration: 30, image: 'lunge.gif' },
    { id: 3, name: 'Jump Squats', reps: '20x', duration: 30, image: 'jump_squat.gif' },
    { id: 4, name: 'Calf Raises', reps: '30x', duration: 30, image: 'calf_raise.gif' },
    { id: 5, name: 'Wall Sit', reps: '45 sec', duration: 45, image: 'wall_sit.gif' },
    { id: 6, name: 'Single Leg Glute Bridge', reps: '12x each leg', duration: 30, image: 'glute_bridge.gif' },
    { id: 7, name: 'Step-ups', reps: '15x each leg', duration: 30, image: 'stepup.gif' },
  ],
  'Abs': [
    { id: 1, name: 'Plank', reps: '30 sec', duration: 30, image: 'plank.gif' },
    { id: 2, name: 'Crunches', reps: '25x', duration: 30, image: 'crunch.gif' },
    { id: 3, name: 'Bicycle Crunches', reps: '20x', duration: 30, image: 'bicycle.gif' },
    { id: 4, name: 'Russian Twists', reps: '30x', duration: 30, image: 'russian_twist.gif' },
    { id: 5, name: 'Leg Raises', reps: '15x', duration: 30, image: 'leg_raise.gif' },
    { id: 6, name: 'Mountain Climbers', reps: '20x', duration: 30, image: 'mountain.gif' },
    { id: 7, name: 'Dead Bug', reps: '10x each side', duration: 30, image: 'dead_bug.gif' },
  ],
};

export const bakiWorkouts = [
  { id: 1, name: 'Demon Back Training', difficulty: 'Extreme', locked: true },
  { id: 2, name: 'Hanma Strength Circuit', difficulty: 'Hard', locked: true },
  { id: 3, name: 'Underground Arena Prep', difficulty: 'Extreme', locked: true },
  { id: 4, name: 'Ogre Conditioning', difficulty: 'Legendary', locked: true },
];

export const challengeData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  completed: false,
  workout: Object.keys(workoutData)[i % 4],
}));