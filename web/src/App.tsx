import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { IProduct } from '../../shared';

class App extends Component<{}, { products: IProduct[] }> {
    state = {
        products: []
    };

    componentDidMount() {
        fetch('/api/products/all')
            .then(res => res.json())
            .then((products: IProduct[]) => {
                this.setState({ products });
            });
    }

    l(f: IProduct) {}
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    {this.state.products &&
                        this.state.products.map((product: IProduct) => (
                            <div key={product._id}>
                                <h1>{product.name}</h1>
                                <p>{product.price}</p>
                            </div>
                        ))}
                </header>
            </div>
        );
    }
}

export default App;
