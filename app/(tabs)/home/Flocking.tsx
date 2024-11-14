import React, { useState } from 'react';
import {
  View, Text, TextInput, Platform, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,
  StyleSheet, Image, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from 'expo-location';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const client = generateClient<Schema>();

export default function Flocking() {
  const [location, setLocation] = useState('');
  const [herdSize, setHerdSize] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number; } | null>(null);
  const [manualAddress, setManualAddress] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);

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

  const handleSubmit = async () => {
    try {
      const response = await client.models.Flocking.create({
        location: selectedLocation 
          ? `${selectedLocation.latitude},${selectedLocation.longitude}`
          : '',
        manualAddress,
        herdSize: parseInt(herdSize),
        dateTime: dateTime.toISOString(),
        description,
        imageUri: image || ''
      });

      console.log('Submission successful:', response);
      
      // Reset form
      setLocation('');
      setHerdSize('');
      setDateTime(new Date());
      setDescription('');
      setImage(null);
      setManualAddress('');

      Alert.alert('Success', 'Report submitted successfully');
    } catch (error) {
      console.error('Error submitting report:', error);
      Alert.alert('Error', 'Failed to submit report');
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

  const showDateTimePicker = () => {
    setDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisible(false);
  };

  const handleDateTimeConfirm = (selectedDateTime: Date) => {
    setDateTime(selectedDateTime);
    hideDateTimePicker();
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
                      <Marker coordinate={selectedLocation} title="Flocking Location" />
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

              <Text style={styles.label}>Approximate Herd Size</Text>
              <TextInput
                style={styles.input}
                value={herdSize}
                onChangeText={setHerdSize}
                placeholder="Enter number of cattle"
                keyboardType="numeric"
              />

              <Text style={styles.label}>Date and Time Spotted</Text>
              <TouchableOpacity 
                style={styles.input}
                onPress={showDateTimePicker}
              >
                <Text>{dateTime.toLocaleString()}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDateTimePickerVisible}
                mode="datetime"
                onConfirm={handleDateTimeConfirm}
                onCancel={hideDateTimePicker}
                date={dateTime}
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe the situation (blocking traffic, damaging property, etc.)"
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
  locationButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
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
    marginTop: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  timeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
});