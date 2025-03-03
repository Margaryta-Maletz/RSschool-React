`use client`

import '../styles/index.css';
import '../styles/App.css';
import { store } from '../src/store/store';
import {Provider} from 'react-redux';
import {AppProps} from "next/app";


export default function MyApp({ Component, pageProps }: AppProps) {
   return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
