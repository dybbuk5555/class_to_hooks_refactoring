import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './components/Header.js';
import UsersList from './components/UsersList.js';
const AppFunctional = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`https://randomuser.me/api/?page=${page}&results=10`);
                setUsers((users) => [...users, ...res.data.results]);
                setErrorMsg('');
            } catch (error) {
                setErrorMsg('Error while loading data, please try again.');
            } finally {
                setIsLoading(false);
            }
        }

        loadUsers();
    }, [page]);

    const loadMore = () => {
        setPage((page) => page + 1);
    };

    return (
        <div className='main-section'>
            <Header />
            <UsersList users={users} />
            {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
            <div className='load-more'>
                <button onClick={loadMore} className='btn-grad'>
                    {isLoading ? 'Loading...' : 'Load more'}
                </button>
            </div>
        </div>
    );
};

export default AppFunctional;