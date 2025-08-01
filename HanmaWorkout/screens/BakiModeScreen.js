import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { bakiWorkouts } from '../data/workouts';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const BakiModeScreen = ({ navigation }) => {
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);

  const handleWorkoutPress = (workout) => {
    if (workout.locked) {
      setUpgradeModalVisible(true);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Hard':
        return '#FF9800';
      case 'Extreme':
        return '#F44336';
      case 'Legendary':
        return '#9C27B0';
      default:
        return Colors.primary;
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'Hard':
        return 'flame';
      case 'Extreme':
        return 'thunderstorm';
      case 'Legendary':
        return 'skull';
      default:
        return 'fitness';
    }
  };

  const WorkoutCard = ({ workout }) => (
    <TouchableOpacity 
      style={styles.workoutCard}
      onPress={() => handleWorkoutPress(workout)}
    >
      <LinearGradient
        colors={['#1A1A1A', '#2D2D2D']}
        style={styles.cardGradient}
      >
        <View style={styles.lockOverlay}>
          <Ionicons name="lock-closed" size={32} color={Colors.primary} />
        </View>
        
        <View style={styles.cardHeader}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(workout.difficulty) }]}>
            <Ionicons name={getDifficultyIcon(workout.difficulty)} size={16} color={Colors.white} />
            <Text style={styles.difficultyText}>{workout.difficulty}</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <Text style={styles.workoutDescription}>
            Legendary training routine from the underground arena
          </Text>
          
          <View style={styles.workoutFeatures}>
            <View style={styles.feature}>
              <Ionicons name="time" size={16} color={Colors.primary} />
              <Text style={styles.featureText}>45-60 min</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="flash" size={16} color={Colors.primary} />
              <Text style={styles.featureText}>High Intensity</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="trophy" size={16} color={Colors.primary} />
              <Text style={styles.featureText}>Elite Level</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const UpgradeModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={upgradeModalVisible}
      onRequestClose={() => setUpgradeModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setUpgradeModalVisible(false)}
          >
            <Ionicons name="close" size={24} color={Colors.text} />
          </TouchableOpacity>

          <View style={styles.modalHeader}>
            <View style={styles.premiumIcon}>
              <Ionicons name="star" size={48} color={Colors.primary} />
            </View>
            <Text style={styles.modalTitle}>Unlock Baki Mode</Text>
            <Text style={styles.modalSubtitle}>
              Access legendary Hanma training routines
            </Text>
          </View>

          <View style={styles.featuresList}>
            <View style={styles.premiumFeature}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <Text style={styles.featureTitle}>4 Legendary Workouts</Text>
            </View>
            <View style={styles.premiumFeature}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <Text style={styles.featureTitle}>Advanced Progress Tracking</Text>
            </View>
            <View style={styles.premiumFeature}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <Text style={styles.featureTitle}>Exclusive Anime Content</Text>
            </View>
            <View style={styles.premiumFeature}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <Text style={styles.featureTitle}>No Ads</Text>
            </View>
            <View style={styles.premiumFeature}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <Text style={styles.featureTitle}>Priority Support</Text>
            </View>
          </View>

          <View style={styles.pricingSection}>
            <Text style={styles.priceText}>$4.99/month</Text>
            <Text style={styles.priceSubtext}>Cancel anytime</Text>
          </View>

          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Start Free Trial</Text>
          </TouchableOpacity>

          <Text style={styles.trialText}>
            7-day free trial, then $4.99/month
          </Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[Colors.primary, '#D32F2F']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Ionicons name="skull" size={40} color={Colors.white} />
              <Text style={styles.title}>Baki Mode</Text>
            </View>
            <Text style={styles.subtitle}>
              "The path of the strongest"
            </Text>
          </View>
        </LinearGradient>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            Enter the underground arena and train like Baki Hanma himself. 
            These legendary workouts are designed to push your limits beyond 
            what you thought possible. Only the strongest fighters can survive 
            these intense training sessions.
          </Text>
        </View>

        {/* Locked Workouts */}
        <View style={styles.workoutsSection}>
          <Text style={styles.sectionTitle}>Legendary Workouts</Text>
          {bakiWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>What You'll Get</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefit}>
              <Ionicons name="fitness" size={32} color={Colors.primary} />
              <View style={styles.benefitText}>
                <Text style={styles.benefitTitle}>Elite Training</Text>
                <Text style={styles.benefitDescription}>
                  4 legendary workout routines inspired by Baki Hanma
                </Text>
              </View>
            </View>
            
            <View style={styles.benefit}>
              <Ionicons name="analytics" size={32} color={Colors.primary} />
              <View style={styles.benefitText}>
                <Text style={styles.benefitTitle}>Advanced Tracking</Text>
                <Text style={styles.benefitDescription}>
                  Detailed progress analytics and performance metrics
                </Text>
              </View>
            </View>
            
            <View style={styles.benefit}>
              <Ionicons name="play-circle" size={32} color={Colors.primary} />
              <View style={styles.benefitText}>
                <Text style={styles.benefitTitle}>Exclusive Content</Text>
                <Text style={styles.benefitDescription}>
                  Anime clips and motivational content from the series
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity 
            style={styles.unlockButton}
            onPress={() => setUpgradeModalVisible(true)}
          >
            <LinearGradient
              colors={[Colors.primary, '#D32F2F']}
              style={styles.buttonGradient}
            >
              <Ionicons name="star" size={24} color={Colors.white} />
              <Text style={styles.unlockButtonText}>Unlock Baki Mode</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <UpgradeModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerGradient: {
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.heading,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: Spacing.md,
  },
  subtitle: {
    fontSize: FontSizes.large,
    color: Colors.white,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  descriptionSection: {
    padding: Spacing.lg,
  },
  description: {
    fontSize: FontSizes.medium,
    color: Colors.text,
    lineHeight: 24,
    textAlign: 'center',
  },
  workoutsSection: {
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.extraLarge,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  workoutCard: {
    marginBottom: Spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardGradient: {
    padding: Spacing.lg,
    position: 'relative',
  },
  lockOverlay: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    zIndex: 1,
  },
  cardHeader: {
    marginBottom: Spacing.md,
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: 'bold',
    marginLeft: Spacing.xs,
  },
  cardContent: {
    flex: 1,
  },
  workoutName: {
    fontSize: FontSizes.extraLarge,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  workoutDescription: {
    fontSize: FontSizes.medium,
    color: '#CCCCCC',
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  workoutFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    color: Colors.white,
    fontSize: FontSizes.small,
    marginLeft: Spacing.xs,
  },
  benefitsSection: {
    padding: Spacing.lg,
  },
  benefitsList: {
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
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  benefitText: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  benefitTitle: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  benefitDescription: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
    lineHeight: 20,
  },
  ctaSection: {
    padding: Spacing.lg,
  },
  unlockButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  unlockButtonText: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: Spacing.xl,
    margin: Spacing.lg,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.md,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  premiumIcon: {
    marginBottom: Spacing.md,
  },
  modalTitle: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  modalSubtitle: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
    textAlign: 'center',
  },
  featuresList: {
    marginBottom: Spacing.xl,
  },
  premiumFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  featureTitle: {
    fontSize: FontSizes.medium,
    color: Colors.text,
    marginLeft: Spacing.md,
    fontWeight: '600',
  },
  pricingSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  priceText: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  priceSubtext: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
  },
  upgradeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  upgradeButtonText: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  trialText: {
    fontSize: FontSizes.small,
    color: Colors.gray,
    textAlign: 'center',
  },
});

export default BakiModeScreen;