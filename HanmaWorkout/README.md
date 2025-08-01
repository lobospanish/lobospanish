# Hanma Workout – No Excuses

A mobile fitness app inspired by the "Home Workout – No Equipment" concept, themed around the anime character Baki Hanma. This React Native/Expo app provides a complete workout experience with bodyweight exercises, progress tracking, and a premium "Baki Mode" feature.

## Features

### 🏠 Home Screen
- **4 Workout Categories**: Full Body, Chest, Legs, Abs
- **Grid Layout**: Easy navigation with color-coded workout buttons
- **Baki Mode Section**: Premium feature preview
- **Progress Stats**: Today's workout summary

### 💪 Workout Screens
- **Exercise Lists**: 5-10 exercises per category
- **Exercise Cards**: Shows reps, duration, and exercise thumbnails
- **Start Workout**: Direct integration with timer
- **Workout Info**: Duration, calories, and equipment requirements

### 🏆 30-Day Challenge
- **Calendar Grid**: Visual progress tracking for 30 days
- **Day Status**: Completed, current, available, or locked days
- **Progress Stats**: Completion percentage and streaks
- **Interactive**: Tap days to start workouts

### ⏱️ Timer Screen
- **Exercise Timer**: Customizable workout and rest intervals
- **Progress Tracking**: Visual progress bar through workout
- **Controls**: Play, pause, skip, and reset functionality
- **Exercise Preview**: Shows current and next exercises

### 📊 Log Screen
- **Workout History**: Complete history of past workouts
- **Statistics**: Total workouts, streaks, minutes, calories
- **Achievements**: Unlockable badges and milestones
- **Data Management**: Clear history option

### ⚙️ Settings Screen
- **Notifications**: Daily reminder toggle
- **Workout Settings**: Sound, vibration, auto-rest options
- **App Info**: Rate, share, contact support
- **Data Management**: Clear all data option

### 🔥 Baki Mode (Premium)
- **Locked Workouts**: 4 legendary Hanma training routines
- **Premium Features**: Advanced tracking, exclusive content
- **Upgrade Modal**: Subscription details and pricing
- **Difficulty Levels**: Hard, Extreme, Legendary workouts

## Design & Theme

### Color Scheme
- **Primary**: #FF3D00 (Vibrant Red)
- **Background**: #FFFFFF (White)
- **Text**: #212121 (Dark Gray)
- **Accent Colors**: Various shades for different workout categories

### Typography
- **Bold, Clean Sans-serif**: Easy readability
- **Font Sizes**: Responsive scaling from 12px to 32px
- **Weight Variations**: Normal, 600, bold for hierarchy

### Layout
- **Mobile-Optimized**: Touch-friendly buttons and spacing
- **Minimalist Design**: Clean, uncluttered interface
- **Fast Loading**: Lightweight components and optimized images

## Technical Stack

### Dependencies
- **React Native**: Cross-platform mobile framework
- **Expo**: Development and deployment platform
- **React Navigation**: Bottom tabs + stack navigation
- **AsyncStorage**: Local data persistence
- **Vector Icons**: Ionicons for consistent iconography
- **Linear Gradient**: Premium visual effects

### Architecture
```
HanmaWorkout/
├── App.js                 # Main navigation setup
├── constants/
│   └── Colors.js          # Theme colors and spacing
├── data/
│   └── workouts.js        # Exercise and workout data
├── components/
│   ├── WorkoutCard.js     # Reusable workout category card
│   └── ExerciseCard.js    # Individual exercise display
├── screens/
│   ├── HomeScreen.js      # Main dashboard
│   ├── WorkoutScreen.js   # Exercise lists
│   ├── ChallengeScreen.js # 30-day calendar
│   ├── TimerScreen.js     # Workout timer
│   ├── LogScreen.js       # History and stats
│   ├── SettingsScreen.js  # App configuration
│   └── BakiModeScreen.js  # Premium features
└── assets/
    └── images/            # Exercise GIFs and icons
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Expo Go app on mobile device

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HanmaWorkout
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npx expo start
   ```

4. **Run on device**
   - Scan QR code with Expo Go app
   - Or press 'i' for iOS simulator
   - Or press 'a' for Android emulator

### Development Commands
```bash
# Start development server
npm start

# iOS development
npm run ios

# Android development  
npm run android

# Web development
npm run web

# Build for production
expo build:android
expo build:ios
```

## App Features in Detail

### Workout Data Structure
```javascript
{
  'Full Body': [
    {
      id: 1,
      name: 'Push-ups',
      reps: '20x',
      duration: 30,
      image: 'pushup.gif'
    },
    // ... more exercises
  ]
}
```

### Navigation Structure
- **Bottom Tabs**: Home, Challenge, Timer, Log, Settings
- **Stack Navigation**: Home → Workout → Timer flow
- **Modal Navigation**: Baki Mode upgrade modal

### Data Persistence
- **AsyncStorage**: Workout history, settings, challenge progress
- **Real-time Updates**: Live progress tracking and statistics
- **Data Export**: Future feature for backup/restore

### Performance Optimizations
- **Lightweight Components**: Minimal re-renders
- **Lazy Loading**: Screens loaded on demand
- **Optimized Images**: Compressed exercise GIFs
- **Efficient State Management**: Local state over global store

## Future Enhancements

### v2.0 Features
- **Exercise GIFs**: Animated exercise demonstrations
- **Custom Workouts**: User-created workout routines
- **Social Features**: Share progress with friends
- **Nutrition Tracking**: Meal planning and calorie tracking

### v3.0 Features
- **AI Coach**: Personalized workout recommendations
- **Live Classes**: Streaming workout sessions
- **Wearable Integration**: Apple Watch and Fitbit support
- **Advanced Analytics**: Detailed performance insights

## Contributing

### Development Guidelines
1. Follow React Native best practices
2. Use TypeScript for type safety (future migration)
3. Maintain consistent coding style
4. Write unit tests for critical functions
5. Document all new features

### Code Style
- **ESLint**: Consistent code formatting
- **Prettier**: Automatic code formatting
- **Component Structure**: Functional components with hooks
- **File Naming**: PascalCase for components, camelCase for utilities

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- **Developer**: Senior Mobile App Developer
- **Email**: support@hanmaworkout.com
- **GitHub**: [Repository Link]

---

**Made with 💪 for fighters who never make excuses!**