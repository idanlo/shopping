import React from 'react';
import { Card as AntCard } from 'antd';
import { IProduct } from '../../../../shared';

interface Props {
    item: IProduct;
}

const Card: React.FC<Props> = ({ item }) => {
    const [hovering, setHovering] = React.useState(false);

    return (
        <AntCard
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            hoverable
            cover={hovering ? null : <img src={item.images[0]} />}
            style={{ margin: 5, minHeight: 500 }}
        >
            {hovering ? (
                <h1>asf</h1>
            ) : (
                <AntCard.Meta title={item.name} description={item.price} />
            )}
        </AntCard>
    );
};

export default Card;
