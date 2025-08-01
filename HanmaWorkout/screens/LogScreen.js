import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const LogScreen = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalMinutes: 0,
    totalCalories: 0,
    currentStreak: 0,
  });

  useEffect(() => {
    loadWorkoutHistory();
  }, []);

  const loadWorkoutHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('workoutHistory');
      if (history) {
        const parsedHistory = JSON.parse(history);
        setWorkoutHistory(parsedHistory);
        calculateStats(parsedHistory);
      }
    } catch (error) {
      console.error('Error loading workout history:', error);
    }
  };

  const calculateStats = (history) => {
    const totalWorkouts = history.length;
    const totalMinutes = history.reduce((sum, workout) => sum + workout.duration, 0);
    const totalCalories = totalMinutes * 8; // Rough calculation

    // Calculate current streak (consecutive days with workouts)
    let currentStreak = 0;
    const today = new Date().toDateString();
    const sortedHistory = history.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (let i = 0; i < sortedHistory.length; i++) {
      const workoutDate = new Date(sortedHistory[i].date).toDateString();
      const expectedDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toDateString();
      
      if (workoutDate === expectedDate || (i === 0 && workoutDate === today)) {
        currentStreak++;
      } else {
        break;
      }
    }

    setStats({
      totalWorkouts,
      totalMinutes,
      totalCalories,
      currentStreak,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getWorkoutIcon = (workoutType) => {
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

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('workoutHistory');
      setWorkoutHistory([]);
      setStats({
        totalWorkouts: 0,
        totalMinutes: 0,
        totalCalories: 0,
        currentStreak: 0,
      });
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const addSampleWorkout = async () => {
    const sampleWorkout = {
      id: Date.now(),
      type: 'Full Body',
      date: new Date().toISOString(),
      duration: 25,
      exercises: 7,
      completed: true,
    };

    try {
      const updatedHistory = [sampleWorkout, ...workoutHistory];
      await AsyncStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));
      setWorkoutHistory(updatedHistory);
      calculateStats(updatedHistory);
    } catch (error) {
      console.error('Error adding sample workout:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="bar-chart" size={32} color={Colors.primary} />
            <Text style={styles.title}>Workout Log</Text>
          </View>
          <Text style={styles.subtitle}>Track your fitness journey</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalWorkouts}</Text>
              <Text style={styles.statLabel}>Total Workouts</Text>
              <Ionicons name="fitness" size={20} color={Colors.primary} />
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.currentStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
              <Ionicons name="flame" size={20} color={Colors.primary} />
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalMinutes}</Text>
              <Text style={styles.statLabel}>Total Minutes</Text>
              <Ionicons name="time" size={20} color={Colors.primary} />
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalCalories}</Text>
              <Text style={styles.statLabel}>Calories Burned</Text>
              <Ionicons name="restaurant" size={20} color={Colors.primary} />
            </View>
          </View>
        </View>

        {/* Workout History */}
        <View style={styles.historySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            {workoutHistory.length > 0 && (
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>

          {workoutHistory.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="clipboard-outline" size={64} color={Colors.gray} />
              <Text style={styles.emptyTitle}>No Workouts Yet</Text>
              <Text style={styles.emptySubtitle}>
                Complete your first workout to start tracking your progress!
              </Text>
              <TouchableOpacity style={styles.sampleButton} onPress={addSampleWorkout}>
                <Text style={styles.sampleButtonText}>Add Sample Workout</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.historyList}>
              {workoutHistory.map((workout, index) => (
                <View key={workout.id || index} style={styles.historyItem}>
                  <View style={styles.workoutIconContainer}>
                    <Ionicons 
                      name={getWorkoutIcon(workout.type)} 
                      size={24} 
                      color={Colors.primary} 
                    />
                  </View>
                  <View style={styles.workoutDetails}>
                    <Text style={styles.workoutType}>{workout.type}</Text>
                    <Text style={styles.workoutDate}>{formatDate(workout.date)}</Text>
                    <View style={styles.workoutMeta}>
                      <Text style={styles.metaText}>{workout.duration} min</Text>
                      <Text style={styles.metaDot}>•</Text>
                      <Text style={styles.metaText}>{workout.exercises} exercises</Text>
                    </View>
                  </View>
                  <View style={styles.completionBadge}>
                    <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Achievements Section */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            <View style={[styles.achievementItem, stats.totalWorkouts >= 1 && styles.unlockedAchievement]}>
              <Ionicons 
                name="trophy" 
                size={24} 
                color={stats.totalWorkouts >= 1 ? Colors.primary : Colors.disabled} 
              />
              <View style={styles.achievementText}>
                <Text style={[styles.achievementTitle, stats.totalWorkouts >= 1 && styles.unlockedText]}>
                  First Workout
                </Text>
                <Text style={styles.achievementDescription}>Complete your first workout</Text>
              </View>
            </View>
            
            <View style={[styles.achievementItem, stats.currentStreak >= 3 && styles.unlockedAchievement]}>
              <Ionicons 
                name="flame" 
                size={24} 
                color={stats.currentStreak >= 3 ? Colors.primary : Colors.disabled} 
              />
              <View style={styles.achievementText}>
                <Text style={[styles.achievementTitle, stats.currentStreak >= 3 && styles.unlockedText]}>
                  3-Day Streak
                </Text>
                <Text style={styles.achievementDescription}>Workout for 3 consecutive days</Text>
              </View>
            </View>

            <View style={[styles.achievementItem, stats.totalWorkouts >= 10 && styles.unlockedAchievement]}>
              <Ionicons 
                name="medal" 
                size={24} 
                color={stats.totalWorkouts >= 10 ? Colors.primary : Colors.disabled} 
              />
              <View style={styles.achievementText}>
                <Text style={[styles.achievementTitle, stats.totalWorkouts >= 10 && styles.unlockedText]}>
                  Dedicated Fighter
                </Text>
                <Text style={styles.achievementDescription}>Complete 10 workouts</Text>
              </View>
            </View>
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
  statsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
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
  statNumber: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.small,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  historySection: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.extraLarge,
    fontWeight: 'bold',
    color: Colors.text,
  },
  clearText: {
    fontSize: FontSizes.medium,
    color: Colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  sampleButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  sampleButtonText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
  },
  historyList: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  workoutIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  workoutDetails: {
    flex: 1,
  },
  workoutType: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  workoutDate: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
    marginBottom: Spacing.xs,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  metaDot: {
    fontSize: FontSizes.small,
    color: Colors.gray,
    marginHorizontal: Spacing.xs,
  },
  completionBadge: {
    marginLeft: Spacing.sm,
  },
  achievementsSection: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  achievementsList: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    opacity: 0.5,
  },
  unlockedAchievement: {
    opacity: 1,
  },
  achievementText: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  achievementTitle: {
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
    color: Colors.disabled,
    marginBottom: Spacing.xs,
  },
  unlockedText: {
    color: Colors.text,
  },
  achievementDescription: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
});

export default LogScreen;