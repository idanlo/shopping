import React from 'react';
import { Layout, Menu, Icon, Button } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

interface Props {
    tags: string[];
    categories: string[];
    toggleTag: (tag: string) => void;
    toggleCategory: (category: string) => void;
}

const Sidebar: React.FC<Props> = props => {
    const [collapsed, setCollapsed] = React.useState(false);

    const toggleCollapsed = () => {
        setCollapsed(prev => !prev);
    };

    const menuItemClicked = ({ keyPath }: { keyPath: string[] }) => {
        const { toggleTag, toggleCategory } = props;
        if (keyPath[1] === 'categories') {
            toggleCategory(keyPath[0]);
        } else {
            toggleTag(keyPath[0]);
        }
    };

    return (
        <Sider
            width={256}
            style={{ background: '#fff' }}
            collapsed={collapsed}
            collapsible
            theme="light"
            onCollapse={toggleCollapsed}
        >
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={[]}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                onClick={menuItemClicked}
                multiple
            >
                <SubMenu
                    key="categories"
                    title={
                        <span>
                            <Icon type="mail" />
                            <span>Categories</span>
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
                            <Icon type="appstore" />
                            <span>Tags</span>
                        </span>
                    }
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
