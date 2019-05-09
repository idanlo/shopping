import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

interface Props {
    tags: string[];
    categories: string[];
    toggleTag: (tag: string) => void;
    toggleCategory: (category: string) => void;
}

const Sidebar: React.FC<Props> = props => {
    const menuItemClicked = ({ keyPath }: { keyPath: string[] }) => {
        const { toggleTag, toggleCategory } = props;
        if (keyPath[1] === 'categories') {
            toggleCategory(keyPath[0]);
        } else {
            toggleTag(keyPath[0]);
        }
    };

    return (
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                multiple
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['categories']}
                style={{ height: '100%', borderRight: 0 }}
                onClick={menuItemClicked}
            >
                <SubMenu
                    key="categories"
                    title={
                        <span>
                            <Icon type="user" />
                            Categories
                        </span>
                    }
                >
                    {props.categories.map(category => (
                        <Menu.Item key={category}>{category}</Menu.Item>
                    ))}
                </SubMenu>
                <SubMenu
                    key="tags"
                    title={
                        <span>
                            <Icon type="laptop" />
                            Tags
                        </span>
                    }
                    // onTitleClick={item => console.log(item)}
                >
                    {props.tags.map(tag => (
                        <Menu.Item key={tag}>{tag}</Menu.Item>
                    ))}
                </SubMenu>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
