import React from 'react';
import { Row, Col, Layout, Card as AntCard } from 'antd';

const { Content } = Layout;

const Card = () => (
    <div style={{ padding: '30px', background: '#fff' }}>
        <AntCard title="Card title" bordered>
            Card content
        </AntCard>
    </div>
);

const Catalog: React.FC = props => (
    <Content
        style={{
            background: '#fff',
            margin: 0,
            minHeight: 280
        }}
    >
        <Row>
            {Array(50)
                .fill(1)
                .map((item, i) => (
                    <Col span={6} key={i}>
                        <Card />
                    </Col>
                ))}
        </Row>
    </Content>
);

export default Catalog;
