import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false,
        loading: true
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

        const {charList, error, loading} = this.state;
      
        const items = this.renderItems(charList); 

        const content = error ? <ErrorMessage/> : loading ? <Spinner/> : items;              

        return (
            <ul className="item-list list-group">
                {content}
                {items}
            </ul>
);
        
        // const errorMessage = error ? <ErrorMessage/> : null;
        // const spinner = loading ? <Spinner/> : null;

        // const items = this.renderItems(charList);

        // if (!charList) {
        //     return <Spinner/>
        // }              

    }
}