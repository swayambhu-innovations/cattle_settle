import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import type { VolunteerData } from '@/hooks/volunteer';
import { format, isValid, parseISO } from 'date-fns';

interface VolunteerCardProps {
  item: VolunteerData;
}

const formatValue = (key: string, value: any): string => {
  if (!value) return 'N/A';
  
  if (key.includes('date') || key.includes('Time') || key === 'createdAt' || key === 'updatedAt') {
    try {
      const date = typeof value === 'string' ? parseISO(value) : new Date(value);
      return isValid(date) ? format(date, 'PPp') : 'Invalid date';
    } catch (err) {
      console.warn(`Error formatting date for ${key}:`, err);
      return 'Invalid date';
    }
  }
  
  if (typeof value === 'boolean') {
    return value ? '✅' : '❌';
  }
  
  return String(value);
};

export const VolunteerCard = ({ item }: VolunteerCardProps) => {
  const handlePress = () => {
    router.push({
      pathname: '/volunteer/Info',
      params: { type: item.type, id: item.data.id }
    });
  };

  const renderDetails = () => {
    const data = item.data;
    let primaryFields: string[] = [];
    let secondaryFields: string[] = [];

    switch (item.type) {
      case 'Casualty':
        primaryFields = ['incidentType', 'manualAddress', 'description'];
        secondaryFields = ['date', 'isAccepted'];
        break;
      case 'Donation':
        primaryFields = ['foodType', 'quantity', 'unit', 'manualAddress'];
        secondaryFields = ['pickupTime', 'contactName', 'contactPhone'];
        break;
      case 'Flocking':
        primaryFields = ['herdSize', 'manualAddress', 'description'];
        secondaryFields = ['dateTime', 'isAccepted'];
        break;
      case 'Garbage':
        primaryFields = ['garbageType', 'cattleCount', 'manualAddress'];
        secondaryFields = ['description', 'isAccepted'];
        break;
      case 'Adoption':
        primaryFields = ['name', 'purpose', 'manualAddress'];
        secondaryFields = ['occupation', 'experience', 'phone'];
        break;
    }

    return (
      <>
        <View style={styles.detailsContainer}>
          {primaryFields.map(field => (
            <View key={field} style={styles.detailRow}>
              <Text style={styles.fieldLabel}>
                {field.replace(/([A-Z])/g, ' $1').trim()}:
              </Text>
              <Text style={styles.fieldValue}>{formatValue(field, data[field])}</Text>
            </View>
          ))}
        </View>
        <View style={styles.separator} />
        <View style={styles.metaContainer}>
          {secondaryFields.map(field => (
            <View key={field} style={styles.metaRow}>
              <Text style={styles.metaLabel}>
                {field.replace(/([A-Z])/g, ' $1').trim()}:
              </Text>
              <Text style={styles.metaValue}>{formatValue(field, data[field])}</Text>
            </View>
          ))}
          <Text style={styles.timestamp}>
            Created: {formatValue('createdAt', data.createdAt)}
          </Text>
        </View>
      </>
    );
  };

  return (
    <Pressable 
      onPress={handlePress} 
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed
      ]}>
      <View style={styles.header}>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={[
          styles.status,
          item.data.isAccepted ? styles.statusAccepted : styles.statusPending
        ]}>
          {item.data.isAccepted ? 'Accepted' : 'Pending'}
        </Text>
      </View>
      {renderDetails()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  type: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  status: {
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statusAccepted: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  statusPending: {
    backgroundColor: '#fef9c3',
    color: '#854d0e',
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  fieldLabel: {
    width: 100,
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  fieldValue: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  metaContainer: {
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  metaLabel: {
    width: 90,
    fontSize: 12,
    color: '#64748b',
    textTransform: 'capitalize',
  },
  metaValue: {
    flex: 1,
    fontSize: 12,
    color: '#334155',
  },
  timestamp: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'right',
  },
});
