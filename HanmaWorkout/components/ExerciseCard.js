import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const ExerciseCard = ({ exercise, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <View style={styles.placeholder}>
          <Ionicons name="fitness" size={40} color={Colors.primary} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.reps}>{exercise.reps}</Text>
        <Text style={styles.duration}>{exercise.duration}s</Text>
      </View>
      <View style={styles.playButton}>
        <Ionicons name="play-circle" size={32} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  imageContainer: {
    marginRight: Spacing.md,
  },
  placeholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  reps: {
    fontSize: FontSizes.medium,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  duration: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  playButton: {
    marginLeft: Spacing.md,
  },
});

export default ExerciseCard;