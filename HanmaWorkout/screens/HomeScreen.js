import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import WorkoutCard from '../components/WorkoutCard';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const HomeScreen = ({ navigation }) => {
  const workoutCategories = [
    { title: 'Full Body', icon: 'body', color: Colors.primary },
    { title: 'Chest', icon: 'fitness', color: '#E91E63' },
    { title: 'Legs', icon: 'walk', color: '#9C27B0' },
    { title: 'Abs', icon: 'shield', color: '#673AB7' },
  ];

  const handleWorkoutPress = (workoutType) => {
    navigation.navigate('Workout', { workoutType });
  };

  const handleBakiModePress = () => {
    navigation.navigate('BakiMode');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, Fighter!</Text>
          <Text style={styles.subtitleText}>Choose your training</Text>
        </View>

        {/* Workout Categories Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <WorkoutCard
              title={workoutCategories[0].title}
              icon={workoutCategories[0].icon}
              backgroundColor={workoutCategories[0].color}
              onPress={() => handleWorkoutPress(workoutCategories[0].title)}
            />
            <WorkoutCard
              title={workoutCategories[1].title}
              icon={workoutCategories[1].icon}
              backgroundColor={workoutCategories[1].color}
              onPress={() => handleWorkoutPress(workoutCategories[1].title)}
            />
          </View>
          <View style={styles.row}>
            <WorkoutCard
              title={workoutCategories[2].title}
              icon={workoutCategories[2].icon}
              backgroundColor={workoutCategories[2].color}
              onPress={() => handleWorkoutPress(workoutCategories[2].title)}
            />
            <WorkoutCard
              title={workoutCategories[3].title}
              icon={workoutCategories[3].icon}
              backgroundColor={workoutCategories[3].color}
              onPress={() => handleWorkoutPress(workoutCategories[3].title)}
            />
          </View>
        </View>

        {/* Baki Mode Section */}
        <View style={styles.bakiSection}>
          <View style={styles.bakiHeader}>
            <Ionicons name="lock-closed" size={24} color={Colors.primary} />
            <Text style={styles.bakiTitle}>Baki Mode</Text>
          </View>
          <Text style={styles.bakiDescription}>
            Unlock legendary Hanma training routines
          </Text>
          <TouchableOpacity style={styles.bakiButton} onPress={handleBakiModePress}>
            <Text style={styles.bakiButtonText}>Enter Baki Mode</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Calories</Text>
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
    paddingTop: Spacing.md,
  },
  welcomeText: {
    fontSize: FontSizes.heading,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitleText: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
  },
  gridContainer: {
    paddingHorizontal: Spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
  bakiSection: {
    margin: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  bakiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  bakiTitle: {
    fontSize: FontSizes.extraLarge,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  bakiDescription: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
    marginBottom: Spacing.lg,
  },
  bakiButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bakiButtonText: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    marginRight: Spacing.sm,
  },
  statsSection: {
    margin: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.extraLarge,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
  },
});

export default HomeScreen;