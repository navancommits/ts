import '../styles/globals.css'
import './css/site.css'
import './css/mystyles.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
