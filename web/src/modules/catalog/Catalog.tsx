import React from 'react';
import { Row, Col, Card as AntCard } from 'antd';

const Card = () => (
    <div style={{ background: '#ECECEC', padding: '30px' }}>
        <AntCard title="Card title" bordered>
            Card content
        </AntCard>
    </div>
);

const Catalog: React.FC = props => (
    <div
        style={{
            background: '#fff',
            padding: 24,
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
    </div>
);

export default Catalog;
