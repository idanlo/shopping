import React from 'react';
import { Row, Col, Layout, Skeleton } from 'antd';
import { IProduct } from '../../../../shared';
import Card from './Card';

const { Content } = Layout;

interface CatalogProps {
    items: IProduct[];
}

const Catalog: React.FC<CatalogProps> = props => (
    <Content
        style={{
            background: '#fff',
            margin: 0,
            minHeight: 280
        }}
    >
        <Row>
            {props.items.map(item => (
                <Col xs={24} md={12} lg={4} key={item._id}>
                    <Card item={item} />
                </Col>
            ))}
        </Row>
    </Content>
);

export default Catalog;
