import React from 'react'
import 'tailwindcss/dist/base.css'
import { NextSeo } from 'next-seo'
import Router from 'next/router'

const App = ({ Component, pageProps }) => {
    return (
        <>
            <NextSeo
                title={'Top Cryptocurrencies By Market Capitalization'}
                additionalMetaTags={[
                    {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
                    }
                ]}
                openGraph={{
                    title: 'Top Cryptocurrencies By Market Capitalization',
                    images: [
                      {
                        url: 'https://topcryptos.today/crypto_og.png',
                      },
                    ],
                    site_name: 'TopCryptos.today',
                }}
                twitter={{
                    handle: '@harryChakryan',
                    cardType: 'summary_large_image',
                }}
            />
            <Component {...pageProps} />
        </>
    )
}

export default App
