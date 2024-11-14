import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Image,
  GestureResponderEvent,
  Dimensions,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function Casualty() {
  const [location, setLocation] = useState(''); // For coordinates/auto-location
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = useState<Coordinate | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [manualAddress, setManualAddress] = useState(''); // For manual entry only
  const [incidentType, setIncidentType] = useState<'road_accident' | 'medical' | 'traffic' | 'other' | null>(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location access is required');
          return;
        }

        // Get current position
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        // Update map region with live coordinates
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        // Update selected location marker
        setSelectedLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // Get address from coordinates
        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (address[0]) {
          const locationString = `${address[0].street || ''}, ${address[0].city || ''}, ${address[0].region || ''}`;
          setLocation(locationString);
        }

      } catch (error) {
        Alert.alert('Error', 'Failed to get current location');
      }
    };

    getCurrentLocation();
  }, []);

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

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleSubmit = async (event: GestureResponderEvent) => {
    event.preventDefault();
    
    // Validate required fields
    if (!incidentType) {
      Alert.alert('Error', 'Please select an incident type');
      return;
    }

    if (!description) {
      Alert.alert('Error', 'Please provide a description');
      return;
    }

    if (!location && !manualAddress) {
      Alert.alert('Error', 'Please provide either location or manual address');
      return;
    }

    try {
      // Create data entry according to the schema
      const response = await client.models.Casualty.create({
        location: selectedLocation 
          ? `${selectedLocation.latitude},${selectedLocation.longitude}`
          : null,
        manualAddress: manualAddress || '',
        incidentType: incidentType,
        date: date.toISOString(),
        description: description,
        imageUri: image || ''
      });

      console.log('Submission successful:', response);
      
      // Reset form fields
      setLocation('');
      setManualAddress('');
      setIncidentType(null);
      setDescription('');
      setDate(new Date());
      setImage(null);
      setSelectedLocation(null);
      setShowMap(false);

      Alert.alert('Success', 'Report submitted successfully');
    } catch (error) {
      console.error('Error submitting report:', error);
      Alert.alert('Error', 'Failed to submit report. Please try again.');
    }
  };

  interface Coordinate {
    latitude: number;
    longitude: number;
  }

  interface MapPressEvent {
    nativeEvent: {
      coordinate: Coordinate;
    };
  }

  const handleMapPress = (e: MapPressEvent) => {
    setSelectedLocation(e.nativeEvent.coordinate);
    setLocation(`${e.nativeEvent.coordinate.latitude}, ${e.nativeEvent.coordinate.longitude}`);
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
      
      // Update map region with coordinates
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Set selected location marker
      setSelectedLocation({ latitude, longitude });
      
      // Store raw coordinates instead of address
      setLocation(`${latitude}, ${longitude}`);
      
      // Show map
      setShowMap(true);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location');
    }
  };

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.rootContainer}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.formContainer}>
              <Text style={styles.label}>Location</Text>
              <TouchableOpacity 
                style={styles.locationButton}
                onPress={getCurrentLocation}
              >
                <View style={styles.buttonContent}>
                  <Ionicons name="location" size={24} color="#fff" />
                  <Text style={styles.buttonText}>
                    Select Current Location
                  </Text>
                </View>
              </TouchableOpacity>

              <Text style={styles.label}>Manual Address</Text>
              <TextInput
                style={[styles.input, styles.addressInput]}
                value={manualAddress}
                onChangeText={setManualAddress}
                placeholder="Enter address manually"
                multiline
                numberOfLines={2}
              />

              {showMap && (
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    region={mapRegion}
                    onPress={handleMapPress}
                  >
                    {selectedLocation && (
                      <Marker
                        coordinate={selectedLocation}
                        title="Selected Location"
                      />
                    )}
                  </MapView>
                </View>
              )}

              <Text style={styles.label}>Incident Type</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={incidentType}
                  onValueChange={(value) => setIncidentType(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select incident type" value="" />
                  <Picker.Item label="Road Accident" value="road_accident" />
                  <Picker.Item label="Medical Emergency" value="medical" />
                  <Picker.Item label="Traffic Obstruction" value="traffic" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>

              <Text style={styles.label}>Date and Time</Text>
              <TouchableOpacity 
                style={styles.input}
                onPress={showDatePicker}
              >
                <Text>{date.toLocaleString()}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe the incident"
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
  datePickerIOS: {
    width: '100%',
    height: 40,
  },
  webDatePicker: {
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
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
  locationContainer: {
    marginVertical: 10,
  },
  locationButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    textAlign: 'center',
  },
  addressInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});