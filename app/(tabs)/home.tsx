import { useState } from 'react';
import { ScrollView, StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';
import { Card } from '../../components/card';
import { AdoptForm } from '../../components/forms/AdoptForm';
import { CasualtyForm } from '../../components/forms/CasualtyForm';
import { DonateForm } from '../../components/forms/DonateForm';
import { FlockingForm } from '../../components/forms/FlockingForm';
import { GarbageForm } from '../../components/forms/GarbageForm';

type FormType = 'adopt' | 'casualty' | 'donate' | 'flocking' | 'garbage' | null;

export default function Home() {
  const [activeForm, setActiveForm] = useState<FormType>(null);

  return (
    <>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
        bounces={true}
        alwaysBounceVertical={true}
      >
        <Card 
          title="Report Casualty"
          image={require('../../assets/images/casualty.jpeg')}
          onPress={() => setActiveForm('casualty')}
        />
        <Card 
          title="Report Stray Flocking"
          image={require('../../assets/images/flocking.jpeg')}
          onPress={() => setActiveForm('flocking')}
        />
        <Card 
          title="Report Garbage Grazing"
          image={require('../../assets/images/garbage.jpeg')}
          onPress={() => setActiveForm('garbage')}
        />
        <Card 
          title="Donate food for cattle"
          image={require('../../assets/images/donate.jpeg')}
          onPress={() => setActiveForm('donate')}
        />
        <Card 
          title="Adopt a stray"
          image={require('../../assets/images/adopt.jpeg')}
          onPress={() => setActiveForm('adopt')}
        />
      </ScrollView>

      <Modal
        visible={activeForm !== null}
        animationType="slide"
        onRequestClose={() => setActiveForm(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={() => setActiveForm(null)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          {activeForm === 'adopt' && <AdoptForm onClose={() => setActiveForm(null)} />}
          {activeForm === 'casualty' && <CasualtyForm onClose={() => setActiveForm(null)} />}
          {activeForm === 'donate' && <DonateForm onClose={() => setActiveForm(null)} />}
          {activeForm === 'flocking' && <FlockingForm onClose={() => setActiveForm(null)} />}
          {activeForm === 'garbage' && <GarbageForm onClose={() => setActiveForm(null)} />}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});