import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ExerciseCard from '../components/ExerciseCard';
import { workoutData } from '../data/workouts';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const WorkoutScreen = ({ route, navigation }) => {
  const { workoutType } = route.params;
  const exercises = workoutData[workoutType] || [];

  const handleStartWorkout = () => {
    navigation.navigate('Timer', { exercises, workoutType });
  };

  const handleExercisePress = (exercise) => {
    // Navigate to exercise detail or start individual exercise
    console.log('Exercise pressed:', exercise.name);
  };

  const getTotalDuration = () => {
    return exercises.reduce((total, exercise) => total + exercise.duration, 0);
  };

  const getWorkoutIcon = () => {
    switch (workoutType) {
      case 'Full Body':
        return 'body';
      case 'Chest':
        return 'fitness';
      case 'Legs':
        return 'walk';
      case 'Abs':
        return 'shield';
      default:
        return 'fitness';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name={getWorkoutIcon()} size={40} color={Colors.primary} />
        </View>
        <Text style={styles.title}>{workoutType} Workout</Text>
        <Text style={styles.subtitle}>
          {exercises.length} exercises • {getTotalDuration()} minutes
        </Text>
      </View>

      {/* Start Button */}
      <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
        <Ionicons name="play" size={24} color={Colors.white} />
        <Text style={styles.startButtonText}>START WORKOUT</Text>
      </TouchableOpacity>

      {/* Exercise List */}
      <ScrollView style={styles.exerciseList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Exercises</Text>
        {exercises.map((exercise, index) => (
          <View key={exercise.id} style={styles.exerciseItem}>
            <View style={styles.exerciseNumber}>
              <Text style={styles.exerciseNumberText}>{index + 1}</Text>
            </View>
            <ExerciseCard
              exercise={exercise}
              onPress={() => handleExercisePress(exercise)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Workout Info */}
      <View style={styles.workoutInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="time" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>{getTotalDuration()} min</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="flame" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>{getTotalDuration() * 8} cal</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="fitness" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>No Equipment</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
  },
  startButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    margin: Spacing.lg,
    borderRadius: 12,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  startButtonText: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
  },
  exerciseList: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FontSizes.extraLarge,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  exerciseNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.md,
    marginRight: -Spacing.md,
    zIndex: 1,
  },
  exerciseNumberText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
  },
  workoutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: FontSizes.medium,
    color: Colors.text,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
});

export default WorkoutScreen;