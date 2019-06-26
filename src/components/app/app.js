import React, {Component} from 'react';
import {Col, Row, Button, Container} from 'reactstrap';
import Header from '../header';
// import RandomItem from '../randomItem';
import RandomPage from '../pages/randomPage';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/booksPage';
import HousePage from '../pages/housePage';
import gotService from '../../services/gotService';

import './app.css';

export default class App extends Component {

    gotService = new gotService();

    state = {
        // showRandomItem: true,
        error: false
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    // toggleRadomItem = () => {
    //     this.setState((state) => {
    //         return {
    //             showRandomItem: !state.showRandomItem
    //         }
    //     });
    // };

    render() {
        // const item = this.state.showRandomItem ? <RandomItem/> : null;

        if(this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <RandomPage/>
                            {/* {item}
                            <Button 
                                color="primary" 
                                size="lg"
                                onClick={this.toggleRadomItem}
                            >Toggle block
                            </Button> */}
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <BookPage/>
                    <HousePage/>
                </Container>
            </>
        );
    }

};