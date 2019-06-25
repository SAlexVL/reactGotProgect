import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList
                })
            })
            .catch(this.onError)
            // this.foo.bar = 0;
    }

    renderItems(arr) {
        return arr.map((item) => {
            return (
                <li 
                    key={item.id}
                    className="list-group-item"
                    onClick={ () => this.props.onCharSelected(item.id)}>
                    {item.name}
                </li>
            )
        })
    }

    render() {

        const {charList, error} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const errorMessage = error ? <ErrorMessage/> : null;

        const items = this.renderItems(charList);       

        return (
            <ul className="item-list list-group">
                {errorMessage}
                {items}
            </ul>
        );
    }
}