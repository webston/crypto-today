import React from 'react'
import 'tailwindcss/dist/base.css'
import { NextSeo } from 'next-seo'

const App = ({ Component, pageProps }) => {
    return (
        <>
            <NextSeo
                title={'Crypto Charts'}
            />
            <Component {...pageProps} />
        </>
    )
}

export default App
