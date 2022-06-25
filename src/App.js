import React from 'react';
import axios from 'axios';

import Header from './components/Header.js';
import UsersList from './components/UsersList.js';

export default class App extends React.Component {
    state = {
        users: [],
        isLoading: false,
        page: 0,
        errorMsg: '',
    };

    componentDidMount() {
        this.loadUsers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.loadUsers();
        }
    }

    loadUsers = async () => {
        try {
            const { page } = this.state;
            this.setState({ isLoading: true });
            const res = await axios.get(`https://randomuser.me/api/?page=${page}&results=10`);
            this.setState((prevState) => ({
                users: [...prevState.users, ...res.data.results],
                errorMsg: ''
            }))
        } catch (error) {
            this.setState({ errorMsg: 'Error while loading data, please try again.' });
        } finally {
            this.setState({ isLoading: false });
        }
    }

    loadMore = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1
        }));
    };

    render() {
        const { users, isLoading, errorMsg } = this.state;
        return (
            <div className='main-section'>
                <Header />
                <UsersList users={users} />
                {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
                <div className='load-more'>
                    <button onClick={this.loadMore} className='btn-grad'>
                        {isLoading ? 'Loading...' : 'Load more'}
                    </button>
                </div>
            </div>
        );

    }
}
