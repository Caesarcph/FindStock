import axios from 'axios';

// 使用代理 URL
const BASE_URL = '/yahoo-finance';

export const searchStocks = async (query) => {
  try {
    console.log('Searching for stocks with query:', query);
    const response = await axios.get(`${BASE_URL}/v1/finance/search`, {
      params: {
        q: query,
        quotesCount: 10,
        newsCount: 0,
        enableFuzzyQuery: false,
        quotesQueryId: 'tss_match_phrase_query'
      }
    });

    console.log('Search response:', response.data);

    if (response.data && response.data.quotes) {
      const results = response.data.quotes.map(quote => ({
        symbol: quote.symbol,
        name: quote.shortname || quote.longname,
        exchange: quote.exchange,
        type: quote.quoteType
      }));
      console.log('Processed results:', results);
      return results;
    }
    console.log('No quotes found in response');
    return [];
  } catch (error) {
    console.error('Error searching stocks:', error.response || error);
    throw error;
  }
};

export const validateStockSymbol = async (symbol) => {
  try {
    console.log('Validating stock symbol:', symbol);
    const response = await axios.get(`${BASE_URL}/v8/finance/chart/${symbol}`, {
      params: {
        interval: '1d',
        range: '1d'
      }
    });

    const isValid = response.data?.chart?.result?.[0]?.meta ? true : false;
    console.log('Symbol validation result:', isValid);
    return isValid;
  } catch (error) {
    console.error('Error validating stock symbol:', error.response || error);
    throw error;
  }
};
