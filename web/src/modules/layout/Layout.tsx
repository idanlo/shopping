import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Home from '../home/Home';
import Catalog from '../catalog/Catalog';

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path="/catalog" exact component={Catalog} />
                    <Route path="/" exact component={Home} />
                </Switch>
            </div>
        );
    }
}

export default Layout;
