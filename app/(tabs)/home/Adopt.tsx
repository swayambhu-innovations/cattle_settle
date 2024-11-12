import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Adopt() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [purpose, setPurpose] = useState('dairy');
  const [experience, setExperience] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const purposes = [
    { label: 'Dairy', value: 'dairy' },
    { label: 'Agriculture', value: 'agriculture' },
    { label: 'Shelter', value: 'shelter' },
    { label: 'Other', value: 'other' },
  ];

  const handleSubmit = () => {
    console.log({ name, phone, address, occupation, purpose, experience, agreedToTerms });
  };

  return (
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
          <TextInput
            style={[styles.input, styles.textArea]}
            value={address}
            onChangeText={setAddress}
            placeholder="Complete Address"
            multiline
            numberOfLines={3}
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
  );
}

const styles = StyleSheet.create({
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
});