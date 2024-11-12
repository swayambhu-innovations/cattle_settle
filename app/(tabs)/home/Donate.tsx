import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Donate() {
  const [foodType, setFoodType] = useState('hay');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const foodTypes = [
    { label: 'Hay', value: 'hay' },
    { label: 'Grass', value: 'grass' },
    { label: 'Fodder', value: 'fodder' },
    { label: 'Food Waste', value: 'waste' },
    { label: 'Other', value: 'other' },
  ];

  const units = [
    { label: 'Kilograms', value: 'kg' },
    { label: 'Bundles', value: 'bundles' },
    { label: 'Bags', value: 'bags' },
  ];

  const handleSubmit = () => {
    console.log({
      foodType,
      quantity,
      unit,
      pickupLocation,
      pickupTime,
      contactName,
      contactPhone,
    });
  };

  return (
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

        <Text style={styles.label}>Pickup Location</Text>
        <TextInput
          style={styles.input}
          value={pickupLocation}
          onChangeText={setPickupLocation}
          placeholder="Enter pickup address"
          multiline
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
  );
}

const styles = StyleSheet.create({
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
});