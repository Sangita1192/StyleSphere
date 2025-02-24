const express = require('express');
const { addSearchHistory, viewUserSearchKeyword, trendingSearch } = require('../../controller/controllers');

const SearchHistoryWeb = express.Router();

SearchHistoryWeb.post('/add-search-keyword', addSearchHistory);
SearchHistoryWeb.get('/searched-keyword/:user?', viewUserSearchKeyword);  //means user parameter is optional
SearchHistoryWeb.get('/trending-search', trendingSearch);


module.exports = SearchHistoryWeb