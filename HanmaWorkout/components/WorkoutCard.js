import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const WorkoutCard = ({ title, icon, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor }]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={32} color={Colors.white} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: Spacing.sm,
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: Spacing.md,
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WorkoutCard;