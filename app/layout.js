import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Medicare",
    description: "Book Doctors Online",
    icons: {
        icon: "/medicare.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col  min-h-screen`}>
                <Provider>
                    <main className="flex-grow">
                        <Nav className="z-1" />
                        {children}
                    </main>
                    <Footer />
                </Provider>
            </body>
        </html>
    );
}
