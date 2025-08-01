import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { challengeData } from '../data/workouts';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const ChallengeScreen = ({ navigation }) => {
  const [challengeProgress, setChallengeProgress] = useState(challengeData);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    loadChallengeProgress();
  }, []);

  const loadChallengeProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem('challengeProgress');
      if (saved) {
        setChallengeProgress(JSON.parse(saved));
      }
      
      const savedCurrentDay = await AsyncStorage.getItem('currentChallengeDay');
      if (savedCurrentDay) {
        setCurrentDay(parseInt(savedCurrentDay));
      }
    } catch (error) {
      console.error('Error loading challenge progress:', error);
    }
  };

  const saveChallengeProgress = async (progress, day) => {
    try {
      await AsyncStorage.setItem('challengeProgress', JSON.stringify(progress));
      await AsyncStorage.setItem('currentChallengeDay', day.toString());
    } catch (error) {
      console.error('Error saving challenge progress:', error);
    }
  };

  const handleDayPress = (day) => {
    if (day.day > currentDay) {
      Alert.alert(
        'Day Locked',
        `Complete Day ${currentDay} first to unlock this day!`,
        [{ text: 'OK' }]
      );
      return;
    }

    if (day.completed) {
      Alert.alert(
        'Day Completed',
        `You already completed Day ${day.day}! Great job!`,
        [
          { text: 'View Workout', onPress: () => startWorkout(day) },
          { text: 'OK' }
        ]
      );
      return;
    }

    Alert.alert(
      `Day ${day.day} Challenge`,
      `Ready for ${day.workout} workout?`,
      [
        { text: 'Cancel' },
        { text: 'Start Workout', onPress: () => startWorkout(day) }
      ]
    );
  };

  const startWorkout = (day) => {
    navigation.navigate('Home', {
      screen: 'Workout',
      params: { workoutType: day.workout, challengeDay: day.day }
    });
  };

  const markDayCompleted = (dayNumber) => {
    const updatedProgress = challengeProgress.map(day => 
      day.day === dayNumber ? { ...day, completed: true } : day
    );
    
    setChallengeProgress(updatedProgress);
    
    if (dayNumber === currentDay && currentDay < 30) {
      const newCurrentDay = currentDay + 1;
      setCurrentDay(newCurrentDay);
      saveChallengeProgress(updatedProgress, newCurrentDay);
    } else {
      saveChallengeProgress(updatedProgress, currentDay);
    }
  };

  const getCompletedDays = () => {
    return challengeProgress.filter(day => day.completed).length;
  };

  const getDayStyle = (day) => {
    if (day.completed) {
      return [styles.dayCell, styles.completedDay];
    } else if (day.day === currentDay) {
      return [styles.dayCell, styles.currentDay];
    } else if (day.day > currentDay) {
      return [styles.dayCell, styles.lockedDay];
    } else {
      return [styles.dayCell, styles.availableDay];
    }
  };

  const getDayTextStyle = (day) => {
    if (day.completed) {
      return styles.completedDayText;
    } else if (day.day === currentDay) {
      return styles.currentDayText;
    } else if (day.day > currentDay) {
      return styles.lockedDayText;
    } else {
      return styles.availableDayText;
    }
  };

  const renderDayGrid = () => {
    const rows = [];
    for (let i = 0; i < challengeProgress.length; i += 7) {
      const week = challengeProgress.slice(i, i + 7);
      rows.push(
        <View key={i} style={styles.weekRow}>
          {week.map((day) => (
            <TouchableOpacity
              key={day.day}
              style={getDayStyle(day)}
              onPress={() => handleDayPress(day)}
            >
              {day.completed && (
                <Ionicons name="checkmark" size={16} color={Colors.white} style={styles.checkmark} />
              )}
              <Text style={getDayTextStyle(day)}>{day.day}</Text>
              <Text style={[getDayTextStyle(day), styles.workoutType]}>
                {day.workout.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="trophy" size={32} color={Colors.primary} />
            <Text style={styles.title}>30-Day Challenge</Text>
          </View>
          <Text style={styles.subtitle}>Transform yourself in 30 days</Text>
        </View>

        {/* Progress Stats */}
        <View style={styles.progressSection}>
          <View style={styles.progressCard}>
            <Text style={styles.progressNumber}>{getCompletedDays()}</Text>
            <Text style={styles.progressLabel}>Days Completed</Text>
          </View>
          <View style={styles.progressCard}>
            <Text style={styles.progressNumber}>{30 - getCompletedDays()}</Text>
            <Text style={styles.progressLabel}>Days Remaining</Text>
          </View>
          <View style={styles.progressCard}>
            <Text style={styles.progressNumber}>{Math.round((getCompletedDays() / 30) * 100)}%</Text>
            <Text style={styles.progressLabel}>Progress</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${(getCompletedDays() / 30) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarContainer}>
          <Text style={styles.sectionTitle}>Your Journey</Text>
          <View style={styles.calendar}>
            {renderDayGrid()}
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, styles.completedDay]} />
            <Text style={styles.legendText}>Completed</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, styles.currentDay]} />
            <Text style={styles.legendText}>Today</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, styles.availableDay]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, styles.lockedDay]} />
            <Text style={styles.legendText}>Locked</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
    textAlign: 'center',
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  progressCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: Spacing.xs,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  progressNumber: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  progressLabel: {
    fontSize: FontSizes.small,
    color: Colors.gray,
    textAlign: 'center',
  },
  progressBarContainer: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  calendarContainer: {
    margin: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.extraLarge,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  calendar: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  dayCell: {
    width: 40,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  completedDay: {
    backgroundColor: Colors.success,
  },
  currentDay: {
    backgroundColor: Colors.primary,
  },
  availableDay: {
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  lockedDay: {
    backgroundColor: Colors.disabled,
  },
  completedDayText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: FontSizes.medium,
  },
  currentDayText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: FontSizes.medium,
  },
  availableDayText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: FontSizes.medium,
  },
  lockedDayText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: FontSizes.medium,
  },
  workoutType: {
    fontSize: FontSizes.small - 2,
    marginTop: 2,
  },
  checkmark: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  legendItem: {
    alignItems: 'center',
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginBottom: Spacing.xs,
  },
  legendText: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
});

export default ChallengeScreen;