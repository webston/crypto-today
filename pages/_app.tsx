import React from 'react'
import 'tailwindcss/dist/base.css'

const App = ({ Component, pageProps }) => {
    return (
        <Component {...pageProps} />
    )
}

export default App
