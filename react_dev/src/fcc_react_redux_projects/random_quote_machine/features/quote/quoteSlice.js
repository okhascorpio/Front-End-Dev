import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
//const createSlice = require("@reduxjs/toolkit").createSlice;
//const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;
//const axios = require("axios");

const initialState = {
  loading: false,
  quote: {},
  error: "",
};

export const fetchQuote = createAsyncThunk("quote/fetchquote", () => {
  //return axios.get('https://jsonplaceholder.typicode.com/quotes').then((respose) => respose.data)
  return axios
    .get(
      "https://raw.githubusercontent.com/okhascorpio/Front-End-Dev/main/react_dev/src/fcc_react_projects/random_quote_machine/quotes.json"
    )
    .then((response) => {
      const keys = Object.keys(response.data.quotes);
      const maxIndex = Math.max(...keys.map((key) => parseInt(key)));
      const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
      return response.data.quotes[randomIndex];
    });
});

const quotesSlice = createSlice({
  name: "quote",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchQuote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchQuote.fulfilled, (state, action) => {
      state.loading = false;
      state.quote = action.payload;
      state.error = "";
    });
    builder.addCase(fetchQuote.rejected, (state, action) => {
      state.loading = false;
      state.quote = [];
      state.error = action.error.message;
    });
  },
});

export default quotesSlice.reducer
//module.exports = quotesSlice.reducer;
//module.exports.fetchQuote = fetchQuote;
