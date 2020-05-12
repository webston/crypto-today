import React from 'react'
import 'tailwindcss/dist/base.css'
import { NextSeo } from 'next-seo'
import Router from 'next/router'

const App = ({ Component, pageProps }) => {
    return (
        <>
            <NextSeo
                title={'Top Cryptocurrencies Today'}
            />
            <Component {...pageProps} />
        </>
    )
}

export default App
