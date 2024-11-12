import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Feed from './Feed';
import Chat from './Chat';
import { useState } from 'react';

export default function Community() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'feed', title: 'Feed' },
    { key: 'chat', title: 'Chat' },
  ]);

  const renderScene = SceneMap({
    feed: Feed,
    chat: Chat,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#4A90E2' }}
      style={{ backgroundColor: 'black' }}
      labelStyle={{ color: '#333', fontWeight: '600' }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});