import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStatus } from '../types/AsyncStatus';

const GOODS_STORAGE_KEY = 'goodsData';

export interface goodsState {
  status: AsyncStatus;
  value: [];
}

export interface GoodItem {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
}

const getInitialState = async () => {
  const storedData = await AsyncStorage.getItem(GOODS_STORAGE_KEY);

  if (storedData) {
    return {
      status: AsyncStatus.IDLE,
      value: JSON.parse(storedData),
    };
  }

  return {
    status: AsyncStatus.IDLE,
    value: [],
  };
};

export const incrementAsync = createAsyncThunk(
  'goods/fetchGoods',
  async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const goodsData = await response.json();

      await AsyncStorage.setItem(GOODS_STORAGE_KEY, JSON.stringify(goodsData));

      return goodsData;
    } catch (error) {
      throw new Error('Error fetching goods: ' + error.message);
    }
  }
);

const goodsSlice = createSlice({
  name: 'goods',
  initialState: await getInitialState(),
  reducers: {
    addNewGood: (state, action: PayloadAction<GoodItem>) => {
      state.value.push(action.payload);
      AsyncStorage.setItem(GOODS_STORAGE_KEY, JSON.stringify(state.value))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = AsyncStatus.LOADING;
       })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.IDLE;
        state.value = action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => { 
        state.status = AsyncStatus.FAILED;
      });
  },
});

export const { reducer, actions: { addNewGood } } = goodsSlice;
