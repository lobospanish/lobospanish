import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const TimerScreen = ({ route, navigation }) => {
  const { exercises = [], workoutType = 'General' } = route.params || {};
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30); // Default 30 seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(10);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (exercises.length > 0) {
      setTimeRemaining(exercises[0].duration);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [exercises]);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (isResting) {
      // Rest period completed, move to next exercise
      setIsResting(false);
      nextExercise();
    } else {
      // Exercise completed, start rest period
      if (currentExerciseIndex < exercises.length - 1) {
        setIsResting(true);
        setTimeRemaining(restTime);
        setIsRunning(true);
      } else {
        // Workout completed
        setWorkoutCompleted(true);
        Alert.alert(
          'Workout Complete!',
          'Congratulations! You completed the workout!',
          [
            { text: 'View Log', onPress: () => navigation.navigate('Log') },
            { text: 'Back to Home', onPress: () => navigation.navigate('Home') }
          ]
        );
      }
    }
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      setTimeRemaining(exercises[nextIndex].duration);
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      const prevIndex = currentExerciseIndex - 1;
      setCurrentExerciseIndex(prevIndex);
      setTimeRemaining(exercises[prevIndex].duration);
      setIsRunning(false);
      setIsResting(false);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsResting(false);
    if (exercises.length > 0) {
      setTimeRemaining(exercises[currentExerciseIndex].duration);
    }
  };

  const skipExercise = () => {
    Alert.alert(
      'Skip Exercise',
      'Are you sure you want to skip this exercise?',
      [
        { text: 'Cancel' },
        { text: 'Skip', onPress: handleTimerComplete }
      ]
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (exercises.length === 0) return 0;
    return (currentExerciseIndex / exercises.length) * 100;
  };

  const getCurrentExercise = () => {
    return exercises[currentExerciseIndex] || { name: 'No Exercise', reps: '0x' };
  };

  if (exercises.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="timer-outline" size={64} color={Colors.gray} />
          <Text style={styles.emptyTitle}>No Workout Selected</Text>
          <Text style={styles.emptySubtitle}>Choose a workout to start your timer</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.workoutTitle}>{workoutType}</Text>
        <TouchableOpacity onPress={skipExercise}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${getProgress()}%` }]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentExerciseIndex + 1} of {exercises.length}
        </Text>
      </View>

      {/* Current Exercise */}
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseName}>{getCurrentExercise().name}</Text>
        <Text style={styles.exerciseReps}>{getCurrentExercise().reps}</Text>
        {isResting && (
          <Text style={styles.restLabel}>REST TIME</Text>
        )}
      </View>

      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <View style={styles.timerCircle}>
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        </View>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[styles.controlButton, styles.secondaryButton]}
          onPress={previousExercise}
          disabled={currentExerciseIndex === 0}
        >
          <Ionicons 
            name="play-skip-back" 
            size={24} 
            color={currentExerciseIndex === 0 ? Colors.disabled : Colors.text} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlButton, styles.primaryButton]}
          onPress={toggleTimer}
        >
          <Ionicons 
            name={isRunning ? "pause" : "play"} 
            size={32} 
            color={Colors.white} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlButton, styles.secondaryButton]}
          onPress={nextExercise}
          disabled={currentExerciseIndex === exercises.length - 1}
        >
          <Ionicons 
            name="play-skip-forward" 
            size={24} 
            color={currentExerciseIndex === exercises.length - 1 ? Colors.disabled : Colors.text} 
          />
        </TouchableOpacity>
      </View>

      {/* Additional Controls */}
      <View style={styles.additionalControls}>
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetTimer}
        >
          <Ionicons name="refresh" size={20} color={Colors.text} />
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Next Exercise Preview */}
      {currentExerciseIndex < exercises.length - 1 && !isResting && (
        <View style={styles.nextExerciseContainer}>
          <Text style={styles.nextLabel}>Next:</Text>
          <Text style={styles.nextExercise}>
            {exercises[currentExerciseIndex + 1].name}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  workoutTitle: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    color: Colors.text,
  },
  skipText: {
    fontSize: FontSizes.medium,
    color: Colors.primary,
    fontWeight: '600',
  },
  progressContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.lightGray,
    borderRadius: 3,
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressText: {
    textAlign: 'center',
    fontSize: FontSizes.medium,
    color: Colors.gray,
    fontWeight: '600',
  },
  exerciseContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  exerciseName: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  exerciseReps: {
    fontSize: FontSizes.large,
    color: Colors.primary,
    fontWeight: '600',
  },
  restLabel: {
    fontSize: FontSizes.medium,
    color: Colors.warning,
    fontWeight: 'bold',
    marginTop: Spacing.sm,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.white,
    borderWidth: 8,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.text,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.lg,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  secondaryButton: {
    backgroundColor: Colors.lightGray,
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
  },
  resetButtonText: {
    marginLeft: Spacing.sm,
    fontSize: FontSizes.medium,
    color: Colors.text,
    fontWeight: '600',
  },
  nextExerciseContainer: {
    backgroundColor: Colors.lightGray,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextLabel: {
    fontSize: FontSizes.small,
    color: Colors.gray,
    marginBottom: Spacing.xs,
  },
  nextExercise: {
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
    color: Colors.text,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyTitle: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 12,
  },
  backButtonText: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
  },
});

export default TimerScreen;