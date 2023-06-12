import "@/styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Manrope } from "next/font/google";
// Create a client
const queryClient = new QueryClient();

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="manrope.className">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
