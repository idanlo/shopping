import React from 'react';
import { Layout as AntLayout, Menu, Icon, Tag } from 'antd';
import Catalog from '../catalog/Catalog';
import { IProduct } from '../../../../shared';

const { Header } = AntLayout;

type CategoryResponse = {
    categories: string[];
};

const Layout: React.FC = props => {
    const [items, setItems] = React.useState<IProduct[]>([]);
    const [categories, setCategories] = React.useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = React.useState<
        string[]
    >([]);

    React.useEffect(() => {
        // fetch all categories
        fetch('/api/category/all')
            .then(res => res.json())
            .then((data: CategoryResponse) => {
                setCategories(data.categories);
            });

        // fetching of products is handled in the other React.useEffect below
    }, []);

    React.useEffect(() => {
        if (selectedCategories.length) {
            fetch(`/api/product/category/${selectedCategories.join(',')}`)
                .then(res => res.json())
                .then((data: IProduct[]) => {
                    setItems(data);
                });
        } else {
            // if there are no selectedCategories then fetch all products
            // fetch all products
            fetch('/api/product/all')
                .then(res => res.json())
                .then((data: IProduct[]) => {
                    console.log(data);
                    setItems(data);
                });
        }
    }, [selectedCategories]);

    const toggleCategory = (categoryName: string) => {
        if (selectedCategories.includes(categoryName)) {
            // use Array.filter() to remove the selected category without mutating the existing array
            setSelectedCategories(prevCategories =>
                prevCategories.filter(
                    prevCategory => prevCategory !== categoryName
                )
            );
        } else {
            // use Array.concat() to add the new category without mutating the existing array
            setSelectedCategories(prevCategories =>
                prevCategories.concat(categoryName)
            );
        }
    };

    return (
        <AntLayout className="layout">
            <Header className="header">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="0">
                        <Icon
                            type="vertical-right"
                            style={{
                                marginRight: 0
                            }}
                        />
                    </Menu.Item>
                    <Menu.Item key="1">Catalog</Menu.Item>
                </Menu>
            </Header>
            <AntLayout style={{ background: '#fff' }}>
                <AntLayout
                    style={{ padding: '0 24px 24px', background: '#fff' }}
                >
                    <div
                        style={{
                            margin: '16px 0'
                        }}
                    >
                        {categories.map(category => (
                            <Tag.CheckableTag
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                key={category}
                            >
                                {category}
                            </Tag.CheckableTag>
                        ))}
                    </div>
                    <Catalog items={items} />
                </AntLayout>
            </AntLayout>
        </AntLayout>
    );
};

export default Layout;
