import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StockInfo = { currentStock: number; minStock: number };
export type WebStockState = Record<string, StockInfo>;

const initialState: WebStockState = {};

export const webStockSlice = createSlice({
  name: "webStock",
  initialState,
  reducers: {
    upsertStocks: (state, action: PayloadAction<Record<string, StockInfo>>) => {
      const entries = action.payload || {};
      for (const [id, info] of Object.entries(entries)) {
        state[id] = { currentStock: Number(info?.currentStock) || 0, minStock: Number(info?.minStock) || 0 };
      }
    },
    setStock: (state, action: PayloadAction<{ id: string; stock: StockInfo }>) => {
      const { id, stock } = action.payload;
      state[id] = { currentStock: Number(stock?.currentStock) || 0, minStock: Number(stock?.minStock) || 0 };
    },
    clear: () => initialState,
  },
});

export const { upsertStocks, setStock, clear } = webStockSlice.actions;
