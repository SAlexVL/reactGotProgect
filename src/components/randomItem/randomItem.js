import React, {Component} from 'react';
import './randomItem.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

export default class RandomItem extends Component {

    gotService = new gotService();
    state = {
        item: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
        this.timerId = setInterval(this.updateItem, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onItemLoaded = (item) => {
        this.setState({
            item,
            loading: false,
            error: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateItem = () => {
        const id = Math.floor(Math.random()*140 + 25); //25-140
        // const id = 2548000;
        const {getData} = this.props;

        getData(id)
            .then(this.onItemLoaded)
            .catch(this.onError); 
    }

    render() {

        const {item, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

        const content = !(loading || error) ? (
            <div className="char-details rounded">
                    <h4>Random {this.props.title}: {item.name}</h4>
                        <ul className="list-group list-group-flush">
                            {
                                React.Children.map(this.props.children, (child) => {
                                    return React.cloneElement(child, {item})
                                })
                            }
                        </ul>       
            </div>
          ) : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

RandomItem.defaultProps = {
    interval: 15000
}

RandomItem.propTypes = {
    interval: PropTypes.number
}