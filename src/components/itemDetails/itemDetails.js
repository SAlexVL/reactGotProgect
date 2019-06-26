import React, {Component} from 'react';
import Spinner from '../spinner';
import './itemDetails.css';
import ErrorMessage from '../errorMessage';

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
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

    // onError = (err) => {
    //     this.setState({
    //         error: true,
    //         loading: false
    //     })
    // }

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
                  loaded: false
                })
              });
    }

    render() {

        if (!this.state.item) {
            return <span className='select-error'>Please select a charracter</span>
        }

        const { loading, error, item } = this.state;

        const errorMessage = error ? <ErrorMessage  err={error}/> : null;

        const content = loading ? <Spinner/> : (
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
        );

        return (
            <div className="char-details rounded">
                {errorMessage}
                {content}
            </div>
        );
    }
}

// const ViewDetails = ({char}) => {
//     const {name, gender, born, died, culture} = char;
//     return (
//         <div className="char-details rounded">
//             <h4>{name}</h4>
//                 <ul className="list-group list-group-flush">
//                     {this.props.children}
//                 </ul>
//         </div>
//     )
// }