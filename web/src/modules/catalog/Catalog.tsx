import React from 'react';
import { Row, Col, Layout, Card as AntCard } from 'antd';
import { IProduct } from '../../../../shared';

const { Content } = Layout;

interface CardProps {
    item: IProduct;
}

const Card: React.FC<CardProps> = ({ item }) => (
    <AntCard
        hoverable
        cover={<img src={item.images[0]} />}
        style={{ margin: 5 }}
    >
        <AntCard.Meta title={item.name} description={item.price} />
    </AntCard>
);

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
                <Col span={4} key={item._id}>
                    <Card item={item} />
                </Col>
            ))}
        </Row>
    </Content>
);

export default Catalog;
