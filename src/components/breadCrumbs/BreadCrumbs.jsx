import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './breadCrumbs.css';
import { breadCrumbsDisplay } from '../../data/Categories';

const BreadCrumbs = () => {
    const location = useLocation();

    let currentLink = '';

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            currentLink += `/${crumb}`;
            const breadcrumbInfo = breadCrumbsDisplay.find(item => item.crumb === crumb);
            const display = breadcrumbInfo ? breadcrumbInfo.display : crumb;

            return (
                <div className="crumb" key={crumb}>
                    <Link className="crumb-link" to={currentLink}>{display}</Link>
                </div>
            )
        });

    return (
        <>

            <section className='breadcrumbs'>
                {crumbs}
            </section >

        </>
    )
}

export default BreadCrumbs;
