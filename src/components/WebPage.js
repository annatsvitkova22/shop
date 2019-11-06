import React from 'react';
import AuthorList from '../containers/author-list';
import Details from '../containers/detalis';

const WebPage = () => (
    <div>
        <AuthorList />
        <hr />
        <Details />
    </div>
);

export default WebPage;