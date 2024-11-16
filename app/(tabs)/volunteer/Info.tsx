import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { useEffect, useState } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import MapView, { Marker } from 'react-native-maps';

const client = generateClient<Schema>();

const formatValue = (key: string, value: any): string => {
  if (value === null || value === undefined) return 'N/A';
  if (key.includes('date') || key.includes('Time') || key === 'createdAt' || key === 'updatedAt') {
    try {
      const date = typeof value === 'string' ? parseISO(value) : new Date(value);
      return isValid(date) ? format(date, 'PPpp') : 'Invalid date';
    } catch (err) {
      return 'Invalid date';
    }
  }
  if (typeof value === 'boolean') {
    return value ? '✅ Yes' : '❌ No';
  }
  if (key === 'location' && value) {
    try {
      // Handle both string and object formats
      const coords = typeof value === 'string' 
        ? parseLocation(value) 
        : value;
      
      if (coords?.latitude && coords?.longitude) {
        return `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
      }
    } catch (err) {
      console.warn('Error formatting location:', err);
    }
    return 'Invalid location';
  }
  return String(value);
};

const getDisplayLabel = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/Id$/, 'ID');
};

const parseLocation = (locationString: string | null) => {
  if (!locationString) return null;
  try {
    // Try parsing as JSON first
    return JSON.parse(locationString);
  } catch (err) {
    try {
      // If JSON parsing fails, try parsing as comma-separated string
      const [latitude, longitude] = locationString.split(',').map(Number);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        return { latitude, longitude };
      }
    } catch (err) {
      console.warn('Error parsing location:', err);
    }
    return null;
  }
};

export default function VolunteerInfo() {
  const params = useLocalSearchParams();
  const type = params.type as string;
  const id = params.id as string;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!type || !id) {
        setError('Missing type or id parameter');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching details for:', { type, id });
        let response;

        switch (type) {
          case 'Casualty':
            response = await client.models.Casualty.get({ id });
            break;
          case 'Donation':
            response = await client.models.Donation.get({ id });
            break;
          case 'Flocking':
            response = await client.models.Flocking.get({ id });
            break;
          case 'Garbage':
            response = await client.models.Garbage.get({ id });
            break;
          case 'Adoption':
            response = await client.models.Adoption.get({ id });
            break;
          default:
            throw new Error(`Invalid type: ${type}`);
        }

        if (!response) {
          throw new Error('Record not found');
        }

        console.log('Raw response:', response);
        // Access the data property from the response
        setData(response.data || response);

      } catch (err) {
        console.error('Error fetching details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();

    // Add subscription for real-time updates
    let subscription: { unsubscribe: () => void } | undefined;
    if (type && id) {
      switch (type) {
        case 'Casualty':
          subscription = client.models.Casualty.observeQuery()
            .subscribe({
              next: ({ items }) => {
                const updatedItem = items.find(item => item.id === id);
                if (updatedItem) setData(updatedItem);
              },
              error: (err) => console.error('Subscription error:', err)
            });
          break;
        case 'Donation':
          subscription = client.models.Donation.observeQuery()
            .subscribe({
              next: ({ items }) => {
                const updatedItem = items.find(item => item.id === id);
                if (updatedItem) setData(updatedItem);
              },
              error: (err) => console.error('Subscription error:', err)
            });
          break;
        case 'Flocking':
          subscription = client.models.Flocking.observeQuery()
            .subscribe({
              next: ({ items }) => {
                const updatedItem = items.find(item => item.id === id);
                if (updatedItem) setData(updatedItem);
              },
              error: (err) => console.error('Subscription error:', err)
            });
          break;
        case 'Garbage':
          subscription = client.models.Garbage.observeQuery()
            .subscribe({
              next: ({ items }) => {
                const updatedItem = items.find(item => item.id === id);
                if (updatedItem) setData(updatedItem);
              },
              error: (err) => console.error('Subscription error:', err)
            });
          break;
        case 'Adoption':
          subscription = client.models.Adoption.observeQuery()
            .subscribe({
              next: ({ items }) => {
                const updatedItem = items.find(item => item.id === id);
                if (updatedItem) setData(updatedItem);
              },
              error: (err) => console.error('Subscription error:', err)
            });
          break;
      }
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [type, id]);

  const handleAccept = async () => {
    if (!data || isUpdating) return;
    
    setIsUpdating(true);
    try {
      let response;
      
      switch (type) {
        case 'Casualty':
          response = await client.models.Casualty.update({
            id: data.id,
            isAccepted: true
          });
          break;
        case 'Donation':
          response = await client.models.Donation.update({
            id: data.id,
            isAccepted: true
          });
          break;
        case 'Flocking':
          response = await client.models.Flocking.update({
            id: data.id,
            isAccepted: true
          });
          break;
        case 'Garbage':
          response = await client.models.Garbage.update({
            id: data.id,
            isAccepted: true
          });
          break;
        case 'Adoption':
          response = await client.models.Adoption.update({
            id: data.id,
            isAccepted: true
          });
          break;
      }

      if (response?.data) {
        setData(response.data);
      }
    } catch (err) {
      console.error('Error accepting volunteer job:', err);
      setError(err instanceof Error ? err.message : 'Failed to accept');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUnaccept = async () => {
    if (!data || isUpdating) return;
    
    setIsUpdating(true);
    try {
      let response;
      
      switch (type) {
        case 'Casualty':
          response = await client.models.Casualty.update({
            id: data.id,
            isAccepted: false
          });
          break;
        case 'Donation':
          response = await client.models.Donation.update({
            id: data.id,
            isAccepted: false
          });
          break;
        case 'Flocking':
          response = await client.models.Flocking.update({
            id: data.id,
            isAccepted: false
          });
          break;
        case 'Garbage':
          response = await client.models.Garbage.update({
            id: data.id,
            isAccepted: false
          });
          break;
        case 'Adoption':
          response = await client.models.Adoption.update({
            id: data.id,
            isAccepted: false
          });
          break;
      }

      if (response?.data) {
        setData(response.data);
      }
    } catch (err) {
      console.error('Error unaccepting volunteer job:', err);
      setError(err instanceof Error ? err.message : 'Failed to unaccept');
    } finally {
      setIsUpdating(false);
    }
  };

  const getSections = () => {
    if (!data) return null;

    const commonFields = ['id', 'createdAt', 'updatedAt', 'owner'];
    const sections = {
      main: [] as string[],
      details: [] as string[],
      system: commonFields.filter(key => data[key] !== undefined)
    };

    // Define fields based on type
    switch (type) {
      case 'Casualty':
        sections.main = ['manualAddress', 'description'].filter(key => data[key]);
        sections.details = ['incidentType', 'date', 'imageUri', 'isAccepted'].filter(key => data[key] !== undefined);
        break;
      case 'Donation':
        sections.main = ['manualAddress', 'contactName', 'contactPhone'].filter(key => data[key]);
        sections.details = ['foodType', 'quantity', 'unit', 'pickupTime', 'isAccepted'].filter(key => data[key] !== undefined);
        break;
      case 'Flocking':
        sections.main = ['manualAddress', 'description'].filter(key => data[key]);
        sections.details = ['herdSize', 'dateTime', 'imageUri', 'isAccepted'].filter(key => data[key] !== undefined);
        break;
      case 'Garbage':
        sections.main = ['manualAddress', 'description'].filter(key => data[key]);
        sections.details = ['garbageType', 'cattleCount', 'imageUri', 'isAccepted'].filter(key => data[key] !== undefined);
        break;
      case 'Adoption':
        sections.main = ['manualAddress', 'name', 'phone'].filter(key => data[key]);
        sections.details = ['occupation', 'purpose', 'experience', 'agreedToTerms', 'isAccepted'].filter(key => data[key] !== undefined);
        break;
    }

    return sections;
  };

  const location = data?.location ? parseLocation(data.location) : null;

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const sections = getSections();
  
  if (!sections) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>No data found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{type} Details</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.subtitle}>
            Status: {data.isAccepted ? '✅ Accepted' : '⏳ Pending'}
          </Text>
          {data.isAccepted ? (
            <TouchableOpacity 
              style={[styles.unacceptButton, isUpdating && styles.buttonDisabled]}
              onPress={handleUnaccept}
              disabled={isUpdating}
            >
              <Text style={styles.buttonText}>
                {isUpdating ? 'Updating...' : 'Unaccept Job'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.acceptButton, isUpdating && styles.buttonDisabled]}
              onPress={handleAccept}
              disabled={isUpdating}
            >
              <Text style={styles.buttonText}>
                {isUpdating ? 'Accepting...' : 'Accept Job'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {location?.latitude && location?.longitude && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>LOCATION</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={location}
                title={type}
                description={data.manualAddress || 'Selected location'}
              />
            </MapView>
          </View>
          <Text style={styles.locationText}>
            Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </Text>
        </View>
      )}

      {Object.entries(sections).map(([sectionName, keys]) => 
        keys.length > 0 ? (
          <View key={sectionName} style={styles.card}>
            <Text style={styles.sectionTitle}>{sectionName.toUpperCase()}</Text>
            {keys.map(key => (
              <View key={key} style={styles.row}>
                <Text style={styles.key}>{getDisplayLabel(key)}</Text>
                <Text style={styles.value}>{formatValue(key, data[key])}</Text>
              </View>
            ))}
          </View>
        ) : null
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'column',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  key: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 16,
    textAlign: 'center',
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unacceptButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
