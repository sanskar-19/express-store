import Navbar from "@/components/Navbar";
import "@/public/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="bottom-left" theme="light" />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
