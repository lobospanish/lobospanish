import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const SettingsScreen = () => {
  const [dailyReminder, setDailyReminder] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [autoRest, setAutoRest] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('appSettings');
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        setDailyReminder(parsedSettings.dailyReminder || false);
        setSoundEnabled(parsedSettings.soundEnabled !== false);
        setVibrationEnabled(parsedSettings.vibrationEnabled !== false);
        setAutoRest(parsedSettings.autoRest !== false);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      const currentSettings = {
        dailyReminder,
        soundEnabled,
        vibrationEnabled,
        autoRest,
        ...newSettings,
      };
      await AsyncStorage.setItem('appSettings', JSON.stringify(currentSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const toggleDailyReminder = (value) => {
    setDailyReminder(value);
    saveSettings({ dailyReminder: value });
    
    if (value) {
      Alert.alert(
        'Reminder Set',
        'You will receive daily workout reminders at 8:00 AM',
        [{ text: 'OK' }]
      );
    }
  };

  const toggleSound = (value) => {
    setSoundEnabled(value);
    saveSettings({ soundEnabled: value });
  };

  const toggleVibration = (value) => {
    setVibrationEnabled(value);
    saveSettings({ vibrationEnabled: value });
  };

  const toggleAutoRest = (value) => {
    setAutoRest(value);
    saveSettings({ autoRest: value });
  };

  const clearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all your workout history, progress, and settings. This action cannot be undone.',
      [
        { text: 'Cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setDailyReminder(false);
              setSoundEnabled(true);
              setVibrationEnabled(true);
              setAutoRest(true);
              Alert.alert('Success', 'All data has been cleared');
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert('Error', 'Failed to clear data');
            }
          }
        }
      ]
    );
  };

  const shareApp = () => {
    Alert.alert(
      'Share Hanma Workout',
      'Tell your friends about this amazing fitness app!',
      [{ text: 'OK' }]
    );
  };

  const rateApp = () => {
    Alert.alert(
      'Rate Our App',
      'If you enjoy using Hanma Workout, please rate us on the app store!',
      [{ text: 'Maybe Later' }, { text: 'Rate Now' }]
    );
  };

  const contactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Need help? Email us at support@hanmaworkout.com',
      [{ text: 'OK' }]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightElement, showArrow = false }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Ionicons name={icon} size={24} color={Colors.primary} />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightElement}
        {showArrow && (
          <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="settings" size={32} color={Colors.primary} />
            <Text style={styles.title}>Settings</Text>
          </View>
          <Text style={styles.subtitle}>Customize your workout experience</Text>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="notifications"
              title="Daily Reminder"
              subtitle="Get reminded to workout every day"
              rightElement={
                <Switch
                  value={dailyReminder}
                  onValueChange={toggleDailyReminder}
                  trackColor={{ false: Colors.lightGray, true: Colors.primary }}
                  thumbColor={dailyReminder ? Colors.white : Colors.gray}
                />
              }
            />
          </View>
        </View>

        {/* Workout Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="volume-high"
              title="Sound Effects"
              subtitle="Play sounds during workouts"
              rightElement={
                <Switch
                  value={soundEnabled}
                  onValueChange={toggleSound}
                  trackColor={{ false: Colors.lightGray, true: Colors.primary }}
                  thumbColor={soundEnabled ? Colors.white : Colors.gray}
                />
              }
            />
            <SettingItem
              icon="phone-portrait"
              title="Vibration"
              subtitle="Vibrate on exercise transitions"
              rightElement={
                <Switch
                  value={vibrationEnabled}
                  onValueChange={toggleVibration}
                  trackColor={{ false: Colors.lightGray, true: Colors.primary }}
                  thumbColor={vibrationEnabled ? Colors.white : Colors.gray}
                />
              }
            />
            <SettingItem
              icon="time"
              title="Auto Rest Timer"
              subtitle="Automatically start rest periods"
              rightElement={
                <Switch
                  value={autoRest}
                  onValueChange={toggleAutoRest}
                  trackColor={{ false: Colors.lightGray, true: Colors.primary }}
                  thumbColor={autoRest ? Colors.white : Colors.gray}
                />
              }
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="star"
              title="Rate Our App"
              subtitle="Help us improve with your feedback"
              onPress={rateApp}
              showArrow
            />
            <SettingItem
              icon="share-social"
              title="Share App"
              subtitle="Tell friends about Hanma Workout"
              onPress={shareApp}
              showArrow
            />
            <SettingItem
              icon="mail"
              title="Contact Support"
              subtitle="Get help when you need it"
              onPress={contactSupport}
              showArrow
            />
          </View>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Hanma Workout v1.0.0</Text>
          <Text style={styles.versionSubtext}>Made with 💪 for fighters</Text>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <View style={styles.settingsGroup}>
            <TouchableOpacity style={styles.dangerItem} onPress={clearAllData}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, styles.dangerIcon]}>
                  <Ionicons name="trash" size={24} color={Colors.error} />
                </View>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, styles.dangerText]}>Clear All Data</Text>
                  <Text style={styles.settingSubtitle}>Delete all progress and settings</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.error} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Baki Mode Info */}
        <View style={styles.bakiInfo}>
          <View style={styles.bakiHeader}>
            <Ionicons name="lock-closed" size={24} color={Colors.primary} />
            <Text style={styles.bakiTitle}>Baki Mode</Text>
          </View>
          <Text style={styles.bakiDescription}>
            Unlock legendary Hanma training routines with premium workouts, 
            advanced tracking, and exclusive content from the underground arena.
          </Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
            <Ionicons name="star" size={20} color={Colors.white} />
          </TouchableOpacity>
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
  section: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  settingsGroup: {
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FontSizes.medium,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  settingSubtitle: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  dangerIcon: {
    backgroundColor: '#FFEBEE',
  },
  dangerText: {
    color: Colors.error,
  },
  versionContainer: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  versionText: {
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  versionSubtext: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  bakiInfo: {
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
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  bakiDescription: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  upgradeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeButtonText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
    marginRight: Spacing.sm,
  },
});

export default SettingsScreen;