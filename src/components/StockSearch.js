import React, { useState } from 'react';
import { AutoComplete, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchStocks, validateStockSymbol } from '../services/stockApi';
import debounce from 'lodash/debounce';

function StockSearchInput({ onSearch }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = debounce(async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const results = await searchStocks(value);
      const stockOptions = results
        .filter(stock => stock.type === 'EQUITY')
        .map(stock => ({
          value: stock.symbol,
          label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><b>{stock.symbol}</b></span>
              <span style={{ color: '#666' }}>{stock.name}</span>
              <span style={{ color: '#888', fontSize: '0.9em' }}>{stock.exchange}</span>
            </div>
          ),
        }));
      setOptions(stockOptions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      message.error('Failed to fetch stock suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleSelect = async (value) => {
    if (!value) return;
    
    setLoading(true);
    try {
      const isValid = await validateStockSymbol(value);
      if (isValid) {
        setSearchValue(value);
        onSearch(value);
        message.success(`Selected stock: ${value}`);
      } else {
        message.error('Invalid stock symbol. Please try again.');
      }
    } catch (error) {
      console.error('Error validating stock symbol:', error);
      message.error('Error validating stock symbol. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchValue) {
      handleSelect(searchValue);
    }
  };

  return (
    <AutoComplete
      value={searchValue}
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      onChange={(value) => setSearchValue(value)}
      onKeyPress={handleKeyPress}
      style={{ width: '100%' }}
      notFoundContent={loading ? 'Loading...' : 'No results found'}
    >
      <Input
        size="large"
        placeholder="Enter stock symbol (e.g., AAPL, MSFT)"
        prefix={<SearchOutlined />}
        loading={loading}
      />
    </AutoComplete>
  );
}

export default StockSearchInput;
