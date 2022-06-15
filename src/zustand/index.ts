import create from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mainReducer from './mainReducer';




let useStore : any = (set: any, get: any) => ({
  ...mainReducer(set, get),
});

useStore = persist(useStore, {
  name: 'UnSplash',
  getStorage: () => AsyncStorage,
});

useStore = create(useStore);

export default useStore;
