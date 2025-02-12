import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Space, Tag } from 'antd';
import {
  LineChartOutlined,
  FundOutlined,
  RobotOutlined,
  StockOutlined,
  BarChartOutlined,
  DollarCircleOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import StockChart from '../components/StockChart';
import StockSearchInput from '../components/StockSearch';
import '../styles/Home.css';

const { Title } = Typography;

function Home() {
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [currentStock, setCurrentStock] = useState('');
  const [showChart, setShowChart] = useState(false);

  const indicators = [
    { key: 'technical', label: 'Technical', icon: <LineChartOutlined />, color: 'blue' },
    { key: 'fundamental', label: 'Fundamental', icon: <FundOutlined />, color: 'green' },
    { key: 'ai', label: 'AI Analysis', icon: <RobotOutlined />, color: 'purple' },
    { key: 'volume', label: 'Volume', icon: <BarChartOutlined />, color: 'orange' },
    { key: 'financial', label: 'Financial', icon: <DollarCircleOutlined />, color: 'cyan' },
    { key: 'momentum', label: 'Momentum', icon: <ThunderboltOutlined />, color: 'red' },
  ];

  const handleSearch = (value) => {
    if (value) {
      setCurrentStock(value.toUpperCase());
      setShowChart(true);
    }
  };

  const toggleIndicator = (key) => {
    setSelectedIndicators(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row justify="center" style={{ marginBottom: 40 }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: 40 }}>
            <StockOutlined style={{ marginRight: 12 }} />
            FindStock - Smart Stock Analysis Platform
          </Title>
          <Col span={16} offset={4}>
            <StockSearchInput onSearch={handleSearch} />
            <div style={{ marginTop: 16 }}>
              <Space wrap>
                {indicators.map(({ key, label, icon, color }) => (
                  <Button
                    key={key}
                    type={selectedIndicators.includes(key) ? "primary" : "default"}
                    icon={icon}
                    onClick={() => toggleIndicator(key)}
                    style={{
                      borderColor: selectedIndicators.includes(key) ? color : undefined,
                      backgroundColor: selectedIndicators.includes(key) ? color : undefined
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Space>
            </div>
          </Col>
        </Col>
      </Row>

      {showChart && currentStock ? (
        <Row style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Card title={`${currentStock} Stock Chart`}>
              <StockChart symbol={currentStock} />
            </Card>
          </Col>
        </Row>
      ) : (
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Card
              hoverable
              className="feature-card"
              cover={
                <div style={{ padding: '24px', textAlign: 'center', background: '#f0f5ff' }}>
                  <LineChartOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                </div>
              }
            >
              <Card.Meta
                title="Technical Analysis"
                description="Analyze stocks using charts, moving averages, MACD and other technical indicators"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              className="feature-card"
              cover={
                <div style={{ padding: '24px', textAlign: 'center', background: '#f6ffed' }}>
                  <FundOutlined style={{ fontSize: 48, color: '#52c41a' }} />
                </div>
              }
            >
              <Card.Meta
                title="Fundamental Analysis"
                description="Analyze financial statements, market valuation, and industry position"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              className="feature-card"
              cover={
                <div style={{ padding: '24px', textAlign: 'center', background: '#f9f0ff' }}>
                  <RobotOutlined style={{ fontSize: 48, color: '#722ed1' }} />
                </div>
              }
            >
              <Card.Meta
                title="AI Analysis"
                description="Use machine learning models to predict stock trends and risks"
              />
            </Card>
          </Col>
        </Row>
      )}

      {selectedIndicators.length > 0 && (
        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card title="Selected Indicators">
              <Space wrap>
                {selectedIndicators.map(key => {
                  const indicator = indicators.find(i => i.key === key);
                  return (
                    <Tag
                      key={key}
                      color={indicator.color}
                      icon={indicator.icon}
                      closable
                      onClose={() => toggleIndicator(key)}
                    >
                      {indicator.label}
                    </Tag>
                  );
                })}
              </Space>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Home;
