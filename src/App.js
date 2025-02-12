import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TechnicalAnalysis from './pages/TechnicalAnalysis';
import FundamentalAnalysis from './pages/FundamentalAnalysis';
import AIAnalysis from './pages/AIAnalysis';
import StockSearch from './pages/StockSearch';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Navbar />
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-content" style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/technical" element={<TechnicalAnalysis />} />
              <Route path="/fundamental" element={<FundamentalAnalysis />} />
              <Route path="/ai" element={<AIAnalysis />} />
              <Route path="/search" element={<StockSearch />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
