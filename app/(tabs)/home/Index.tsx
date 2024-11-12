import { ScrollView, StyleSheet } from 'react-native';

import { Card } from '../../../components/card';

export default function Home() {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
      bounces={true}
      alwaysBounceVertical={true}
    >
      <Card 
        title="Report Casualty"
        image={require('../../../assets/images/casualty.jpeg')}
        route={'/home/Casualty'}
      />
      <Card 
        title="Report Stray Flocking"
        image={require('../../../assets/images/flocking.jpeg')}
        route={'/home/Flocking'}
      />
      <Card 
        title="Report Garbage Grazing"
        image={require('../../../assets/images/garbage.jpeg')}
        route={'/home/Garbage'}
      />
      <Card 
        title="Donate food for cattle"
        image={require('../../../assets/images/donate.jpeg')}
        route={'/home/Donate'}
      />
      <Card 
        title="Adopt a stray"
        image={require('../../../assets/images/adopt.jpeg')}
        route={'/home/Adopt'}
      />
    </ScrollView>
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
  }
});