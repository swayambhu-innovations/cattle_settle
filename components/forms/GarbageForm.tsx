import React, { useState } from 'react';
import {
  View, Text, TextInput, Platform, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,
  StyleSheet, Image, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const client = generateClient<Schema>();

export function GarbageForm({ onClose }: { onClose: () => void }) {
  const [location, setLocation] = useState('');
  const [cattleCount, setCattleCount] = useState('');
  const [garbageType, setGarbageType] = useState<'household' | 'market' | 'restaurant' | 'mixed' | 'other'>('household');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  const garbageTypes: { label: string, value: 'household' | 'market' | 'restaurant' | 'mixed' | 'other' }[] = [
    { label: 'Household Waste', value: 'household' },
    { label: 'Market Waste', value: 'market' },
    { label: 'Restaurant Waste', value: 'restaurant' },
    { label: 'Mixed Waste', value: 'mixed' },
    { label: 'Other', value: 'other' },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow location access');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      const { latitude, longitude } = currentLocation.coords;
      
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      setSelectedLocation({ latitude, longitude });
      setLocation(`${latitude}, ${longitude}`);
      setShowMap(true);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location');
    }
  };

  const handleMapPress = (e: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => {
    setSelectedLocation(e.nativeEvent.coordinate);
    setLocation(`${e.nativeEvent.coordinate.latitude}, ${e.nativeEvent.coordinate.longitude}`);
  };

  const handleSubmit = async () => {
    try {
      const response = await client.models.Garbage.create({
        location: selectedLocation 
          ? `${selectedLocation.latitude},${selectedLocation.longitude}`
          : '',
        manualAddress,
        cattleCount: parseInt(cattleCount),
        garbageType,
        description,
        imageUri: image || ''
      });

      console.log('Submission successful:', response);
      
      // Reset form
      setLocation('');
      setCattleCount('');
      setGarbageType('household');
      setDescription('');
      setImage(null);
      setManualAddress('');

      Alert.alert('Success', 'Report submitted successfully', [
        { text: 'OK', onPress: onClose }
      ]);
    } catch (error) {
      console.error('Error submitting report:', error);
      Alert.alert('Error', 'Failed to submit report');
    }
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
              <TouchableOpacity 
                style={styles.locationButton}
                onPress={getCurrentLocation}
              >
                <View style={styles.buttonContent}>
                  <Ionicons name="location" size={24} color="#fff" />
                  <Text style={styles.buttonText}>Select Current Location</Text>
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
                      <Marker coordinate={selectedLocation} title="Selected Location" />
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

              <Text style={styles.label}>Number of Cattle</Text>
              <TextInput
                style={styles.input}
                value={cattleCount}
                onChangeText={setCattleCount}
                placeholder="Enter number of cattle grazing"
                keyboardType="numeric"
              />

              <Text style={styles.label}>Type of Garbage</Text>
              <View style={styles.typeContainer}>
                {garbageTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.typeButton,
                      garbageType === type.value && styles.selectedType,
                    ]}
                    onPress={() => setGarbageType(type.value)}
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        garbageType === type.value && styles.selectedTypeText,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe the situation and any immediate concerns"
                multiline
                numberOfLines={4}
              />

              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Text style={styles.imageButtonText}>Add Photo</Text>
              </TouchableOpacity>

              {image && <Image source={{ uri: image }} style={styles.previewImage} />}

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Report</Text>
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
    backgroundColor: '#fff',
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
  typeContainer: {
    flexDirection: 'column',
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedType: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedTypeText: {
    color: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#e1e1e1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  imageButtonText: {
    fontSize: 16,
    color: '#333',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
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
  mapContainer: {
    height: 300,
    marginVertical: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});