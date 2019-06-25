import React, {Component} from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import './charDetails.css';
export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        loading: true
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({
                    char,
                    loading: false
                })
            })
        // this.foo.bar = 0;
    }

    render() {

        if (!this.state.char) {
            return <span className='select-error'>Please select a charracter</span>
        }

        const { char, loading } = this.state;

        const content = loading ? <Spinner/> : <ViewDetails char={char}/>;

        return (
            <div className="char-details rounded">
                {content}
            </div>
        );
    }
}

const ViewDetails = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
}