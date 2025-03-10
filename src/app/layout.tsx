import "./globals.css";
import "../style/index.scss";
import AppProvider from "@/contextApi/AppProvider";
import ReduxProvider from "@/redux/provider";
import { childrenType } from "@/interFace/interFace";
import { ToastContainer } from "react-toastify";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export default function RootLayout({ children }: childrenType) {
  return (
    <>
      <html lang="en" className={jost.className}>
        <head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="description"
            content="East European Food Store | Cary, NC | Goldenhex.com"
          />
          <meta name="robots" content="noindex, follow" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>East European Food Store | Cary, NC | Goldenhex.com</title>
          <link rel="icon" href="/favicon.png" />
        </head>

        <body suppressHydrationWarning={true}>
          <ReduxProvider>
            <AppProvider>{children}</AppProvider>
            <ToastContainer
              position="top-left"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </ReduxProvider>
        </body>
      </html>
    </>
  );
}
