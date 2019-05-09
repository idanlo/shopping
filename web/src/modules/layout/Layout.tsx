import React from 'react';
import { Layout as AntLayout, Menu, Breadcrumb, Icon, Tag } from 'antd';
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
    const [tags, setTags] = React.useState<string[]>([]);
    const [categories, setCategories] = React.useState<string[]>([]);
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = React.useState<
        string[]
    >([]);

    React.useEffect(() => {
        // fetch all tags
        fetch('/api/tag/all')
            .then(res => res.json())
            .then((data: TagResponse) => {
                setTags(data.tags);
            });

        // fetch all categories
        fetch('/api/category/all')
            .then(res => res.json())
            .then((data: CategoryResponse) => {
                setCategories(data.categories);
            });

        // fetch all products
    }, []);

    const toggleTag = (tagName: string) => {
        if (selectedTags.includes(tagName)) {
            // use Array.filter() to remove the selected tag without mutating the existing array
            setSelectedTags(prevTags =>
                prevTags.filter(prevTag => prevTag !== tagName)
            );
        } else {
            // use Array.concat() to add the new tag without mutating the existing array
            setSelectedTags(prevTags => prevTags.concat(tagName));
        }
    };

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
            <AntLayout>
                <Sidebar
                    tags={tags}
                    categories={categories}
                    toggleTag={toggleTag}
                    toggleCategory={toggleCategory}
                />
                <AntLayout style={{ padding: '0 24px 24px' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            margin: '16px 0'
                        }}
                    >
                        {selectedTags.map(tag => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                        {selectedCategories.map(category => (
                            <Tag key={category}>{category}</Tag>
                        ))}
                    </div>
                    <Catalog />
                </AntLayout>
            </AntLayout>
        </AntLayout>
    );
};

export default Layout;
