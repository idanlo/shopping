import React from 'react';
import { Card as AntCard, Tag, Carousel } from 'antd';
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
            cover={
                hovering ? (
                    <Carousel autoplay>
                        {item.images.map(img => (
                            <div key={img}>
                                <div
                                    style={{
                                        height: 392,
                                        width: '100%',
                                        backgroundImage: `url("${img}")`,
                                        backgroundSize: 'cover'
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    <img src={item.images[0]} />
                )
            }
            style={{ margin: 5, minHeight: 500 }}
        >
            <AntCard.Meta
                title={item.name}
                description={
                    <div>
                        <p>{item.price}</p>
                        {item.categories.map(category => (
                            <Tag key={category}>{category}</Tag>
                        ))}
                    </div>
                }
            />
        </AntCard>
    );
};

export default Card;
