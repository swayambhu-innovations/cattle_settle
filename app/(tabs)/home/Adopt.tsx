import React, { useState } from 'react';
import {
  View, Text, TextInput, Platform, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,
  StyleSheet, Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { router } from 'expo-router';

const client = generateClient<Schema>();

export default function Adopt() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [purpose, setPurpose] = useState<'dairy' | 'agriculture' | 'shelter' | 'other'>('dairy');
  const [experience, setExperience] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = useState<MapCoordinates | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  const purposes: { label: string, value: 'dairy' | 'agriculture' | 'shelter' | 'other' }[] = [
    { label: 'Dairy', value: 'dairy' },
    { label: 'Agriculture', value: 'agriculture' },
    { label: 'Shelter', value: 'shelter' },
    { label: 'Other', value: 'other' },
  ];

  const handleSubmit = async () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      let locationString = '';
      
      if (selectedLocation) {
        locationString = `${selectedLocation.latitude},${selectedLocation.longitude}`;
      }

      const response = await client.models.Adoption.create({
        name,
        phone,
        location: locationString,
        manualAddress, // Remove the address reference here
        occupation,
        purpose,
        experience: experience || '',
        agreedToTerms
      });

      console.log('Submission successful:', response);
      
      // Reset form - remove setAddress from here
      setName('');
      setPhone('');
      setOccupation('');
      setPurpose('dairy');
      setExperience('');
      setAgreedToTerms(false);
      setManualAddress('');
      setSelectedLocation(null);
      setShowMap(false);

      Alert.alert('Success', 'Application submitted successfully', [
        { text: 'OK', onPress: () => router.replace('/home') }
      ]);
    } catch (error) {
      console.error('Error submitting application:', error);
      Alert.alert('Error', 'Failed to submit application');
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setSelectedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setShowMap(true);
  };

  interface MapCoordinates {
    latitude: number;
    longitude: number;
  }

  const handleMapPress = (event: { nativeEvent: { coordinate: MapCoordinates } }): void => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.rootContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Full Name"
                />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                />

                <TouchableOpacity 
                  style={styles.locationButton}
                  onPress={getCurrentLocation}
                >
                  <View style={styles.buttonContent}>
                    <Ionicons name="location" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Use Current Location</Text>
                  </View>
                </TouchableOpacity>

                {showMap && mapRegion && (
                  <View style={styles.mapContainer}>
                    <MapView
                      style={styles.map}
                      region={mapRegion}
                      onPress={handleMapPress}
                    >
                      {selectedLocation && (
                        <Marker coordinate={selectedLocation} title="Address Location" />
                      )}
                    </MapView>
                  </View>
                )}

                <Text style={styles.label}>Manual Address</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={manualAddress}
                  onChangeText={setManualAddress}
                  placeholder="Enter address manually"
                  multiline
                  numberOfLines={2}
                />

                <TextInput
                  style={styles.input}
                  value={occupation}
                  onChangeText={setOccupation}
                  placeholder="Occupation"
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Adoption Details</Text>
                <Text style={styles.label}>Purpose of Adoption</Text>
                <View style={styles.purposeContainer}>
                  {purposes.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={[
                        styles.purposeButton,
                        purpose === item.value && styles.selectedPurpose,
                      ]}
                      onPress={() => setPurpose(item.value)}
                    >
                      <Text
                        style={[
                          styles.purposeText,
                          purpose === item.value && styles.selectedPurposeText,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Previous Experience</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={experience}
                  onChangeText={setExperience}
                  placeholder="Describe your experience with cattle (if any)"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <TouchableOpacity
                style={styles.termsButton}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <View style={[styles.checkbox, agreedToTerms && styles.checked]} />
                <Text style={styles.termsText}>
                  I agree to provide proper care and shelter to the adopted cattle
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.submitButton, !agreedToTerms && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={!agreedToTerms}
              >
                <Text style={styles.submitButtonText}>Submit Application</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 16,
    gap: 20,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  purposeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  purposeButton: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedPurpose: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  purposeText: {
    textAlign: 'center',
    color: '#333',
  },
  selectedPurposeText: {
    color: '#fff',
  },
  termsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  locationButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
  },
  mapContainer: {
    height: 200,
    marginTop: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});