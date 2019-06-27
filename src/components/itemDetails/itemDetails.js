import React, {Component} from 'react';
import Spinner from '../spinner';
import './itemDetails.css';
import ErrorMessage from '../errorMessage';

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: false,
        error: false
    }

    componentDidCatch() {
        this.setState({
          error: "fatal error",
          loading: false
        })
      }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        this.setState ({loading: true});

        getData(itemId) 
            .then((item) => {
                this.setState({
                    item,
                    loading: false
                })
            })
            .catch((err) => {
                this.setState({
                  error: err,
                  loading: false
                })
              });
    }

    render() {

        const { loading, error, item } = this.state;
        // let selectErr = <span className='select-error'>{this.props.title}</span>;
        const spinner = loading ? <Spinner/> : null;
        if (!(item || error)) {
            return (
                <span className='select-error'>{this.props.title}{spinner}</span>
            )
        }

        
        const errorMessage = error ? <ErrorMessage  err={error}/> : null;
        const content = !(loading || error) && item ? (
                <div className="char-details rounded">
                    <h4>{item.name}</h4>
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
            <div className="char-details rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}