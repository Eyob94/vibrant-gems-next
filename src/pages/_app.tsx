import "../globals.css";
import "../styles/index.scss";
import "../fonts/line-awesome-1.3.0/css/line-awesome.css";
import "rc-slider/assets/index.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../app/store";
import SiteHeader from "../containers/SiteHeader";
import Footer from "../shared/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "use-shopping-cart";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <CartProvider
          mode="payment"
          shouldPersist
          cartMode="client-only"
          stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}
          successUrl="stripe.com"
          cancelUrl="twitter.com/dayhaysoos"
          currency="USD"
          allowedCountries={["US", "GB", "CA"]}
          billingAddressCollection={true}
        >
          <PersistGate loading={null} persistor={persistor}>
            <SiteHeader />
            <Component {...pageProps} />

            <Toaster />
            <Footer />
          </PersistGate>
        </CartProvider>
      </Provider>
    </SessionProvider>
  );
}
