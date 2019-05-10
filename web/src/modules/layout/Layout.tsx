import React from 'react';
import { Layout as AntLayout, Menu, Icon, Tag } from 'antd';
import Sidebar from '../sidebar/Sidebar';
import Catalog from '../catalog/Catalog';
import { IProduct } from '../../../../shared';

const { SubMenu } = Menu;
const { Header, Sider, Content } = AntLayout;

type TagResponse = {
    tags: string[];
};

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

        // fetch all products
        fetch('/api/product/all')
            .then(res => res.json())
            .then((data: IProduct[]) => {
                setItems(data);
            });
    }, []);

    // React.useEffect(() => {
    // Array.some()
    // arr1.some(r => arr2.includes(r)) to find common value elements
    // }, [selectedCategories]);

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
                            display: 'flex',
                            flexDirection: 'row',
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
