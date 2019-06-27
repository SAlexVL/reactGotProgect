import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

class ItemList extends Component {

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        
        const {data} = this.props;

        const items = this.renderItems(data);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );       

    }
}

const whithData = (View) => {
    return class extends Component {

        state = {
            data: null,
            error: false,
            loading: true
        }

        static defaultProps = {
            onItemSelected: () => {
            }
          }
      
          static propTypes = {
            onItemSelected: PropTypes.func
      }
    
        componentDidMount() {
            const {getData} = this.props;
    
            getData()
                .then( (data) => {
                    this.setState({
                        data,
                        loading: false
                    })
                })
                .catch(this.onError)
        }
    
        onError = (err) => {
            this.setState({
                error: true,
                loading: false
            })
        }

        render() {
            const {data, error} = this.state;

            if (error) {
                return <ErrorMessage err={error}/>
            }
            if (!data) {
                return <Spinner/>
            }
            return (
                <View {...this.props} data={data}/>
            )
        }
    }
}

export default whithData(ItemList);