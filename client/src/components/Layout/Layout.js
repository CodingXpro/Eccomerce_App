import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="UTF-8" />


                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />


                <meta charSet="utf-8" />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '70vh' }}>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "Eccomerce App-Shop now",
    description: "Mern Stack project",
    keywords: 'mern,react,node,mongodb',
    author: "Krishna Sahu",
}

export default Layout