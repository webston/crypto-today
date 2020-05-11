import Document, { Html, Head, Main, NextScript } from 'next/document'
import tw from 'twin.macro'
import { GA_TRACKING_ID } from '../lib/gtag'

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

            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', '${GA_TRACKING_ID}');
                `,
              }}
            />

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