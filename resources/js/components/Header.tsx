import React from 'react';
import Navibar from './Navibar';
import Menu from './Menu';
import Banner from './Banner';

export default function Header() {
    return (
        <>
            <Navibar />
            <Menu />
            <Banner />
        </>
    );
}
