import Document, { Html, Head, Main, NextScript } from 'next/document'
import tw from 'twin.macro'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
            <link rel="stylesheet" href="https://use.typekit.net/rkg8dvg.css" />
        </Head>
        <body css={tw`bg-light-green`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument