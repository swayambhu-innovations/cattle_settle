import React, { useState } from 'react';
import {
  View, Text, TextInput, Platform, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,
  StyleSheet, Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';

const client = generateClient<Schema>();

export default function Donate() {
  const [foodType, setFoodType] = useState<'hay' | 'grass' | 'fodder' | 'waste' | 'other'>('hay');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<'kg' | 'bundles' | 'bags'>('kg');
  const [pickupTime, setPickupTime] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [manualAddress, setManualAddress] = useState('');

  const foodTypes: { label: string; value: 'hay' | 'grass' | 'fodder' | 'waste' | 'other' }[] = [
    { label: 'Hay', value: 'hay' },
    { label: 'Grass', value: 'grass' },
    { label: 'Fodder', value: 'fodder' },
    { label: 'Food Waste', value: 'waste' },
    { label: 'Other', value: 'other' },
  ];

  const units: { label: string; value: 'kg' | 'bundles' | 'bags' }[] = [
    { label: 'Kg', value: 'kg' },
    { label: 'BD', value: 'bundles' },
    { label: 'Bg', value: 'bags' },
  ];

  const handleSubmit = async () => {
    try {
      const response = await client.models.Donation.create({
        foodType,
        quantity: parseInt(quantity),
        unit,
        location: selectedLocation 
          ? `${selectedLocation.latitude},${selectedLocation.longitude}`
          : '',
        manualAddress,
        pickupTime,
        contactName,
        contactPhone
      });

      console.log('Submission successful:', response);
      
      // Reset form
      setFoodType('hay');
      setQuantity('');
      setUnit('kg');
      setPickupTime('');
      setContactName('');
      setContactPhone('');
      setManualAddress('');

      Alert.alert('Success', 'Donation submitted successfully', [
        { text: 'OK', onPress: () => router.replace('/home') }
      ]);
    } catch (error) {
      console.error('Error submitting donation:', error);
      Alert.alert('Error', 'Failed to submit donation');
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

  interface MapCoordinate {
    latitude: number;
    longitude: number;
  }

  interface MapPressEvent {
    nativeEvent: {
      coordinate: MapCoordinate;
    };
  }

  const handleMapPress = (event: MapPressEvent): void => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
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
              <Text style={styles.label}>Food Type</Text>
              <View style={styles.optionsContainer}>
                {foodTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.optionButton,
                      foodType === type.value && styles.selectedOption,
                    ]}
                    onPress={() => setFoodType(type.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        foodType === type.value && styles.selectedOptionText,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.quantityContainer}>
                <View style={styles.quantityInput}>
                  <Text style={styles.label}>Quantity</Text>
                  <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                    placeholder="Enter quantity"
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.unitSelector}>
                  <Text style={styles.label}>Unit</Text>
                  <View style={styles.unitsRow}>
                    {units.map((unitOption) => (
                      <TouchableOpacity
                        key={unitOption.value}
                        style={[
                          styles.unitButton,
                          unit === unitOption.value && styles.selectedOption,
                        ]}
                        onPress={() => setUnit(unitOption.value)}
                      >
                        <Text
                          style={[
                            styles.unitText,
                            unit === unitOption.value && styles.selectedOptionText,
                          ]}
                        >
                          {unitOption.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.locationButton}
                onPress={getCurrentLocation}
              >
                <View style={styles.buttonContent}>
                  <Ionicons name="location" size={24} color="#fff" />
                  <Text style={styles.buttonText}>Use Current Location</Text>
                </View>
              </TouchableOpacity>

              {showMap && (
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    region={mapRegion}
                    onPress={handleMapPress}
                  >
                    {selectedLocation && (
                      <Marker coordinate={selectedLocation} title="Pickup Location" />
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

              <Text style={styles.label}>Preferred Pickup Time</Text>
              <TextInput
                style={styles.input}
                value={pickupTime}
                onChangeText={setPickupTime}
                placeholder="e.g., Morning, Afternoon, Evening"
              />

              <Text style={styles.label}>Contact Name</Text>
              <TextInput
                style={styles.input}
                value={contactName}
                onChangeText={setContactName}
                placeholder="Enter your name"
              />

              <Text style={styles.label}>Contact Phone</Text>
              <TextInput
                style={styles.input}
                value={contactPhone}
                onChangeText={setContactPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Donation</Text>
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
    gap: 12,
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
  optionsContainer: {
    flexDirection: 'column',
    gap: 8,
    marginBottom: 8,
  },
  optionButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  selectedOptionText: {
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  quantityInput: {
    flex: 1,
  },
  unitSelector: {
    flex: 1,
  },
  unitsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  unitButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  unitText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  mapContainer: {
    height: 200,
    marginVertical: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textArea: {
    height: 60,
  },
});