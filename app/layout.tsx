import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
display: "swap",
});

const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
display: "swap",
});

export const metadata: Metadata = {
metadataBase: new URL("https://toko122.github.io/gfbs3-portfolio-demo/"),

title: {
default: "Toko Migineishvili | Full-Stack Developer & DevOps",
template: "%s | Toko Migineishvili",
},

description:
"Toko Migineishvili — Full-Stack Developer, DevOps & Infrastructure specialist, and IT Technician. Explore my experience, skills, and projects.",

applicationName: "Toko Migineishvili Portfolio",

authors: [
{
name: "Toko Migineishvili",
url: "https://github.com/Toko122",
},
],

creator: "Toko Migineishvili",

keywords: [
"Toko Migineishvili",
"Full-Stack Developer",
"Next.js Developer",
"React Developer",
"TypeScript",
"Node.js",
"DevOps",
"Infrastructure",
"IT Specialist",
"IT Technician",
"Cybersecurity",
"Developer Portfolio",
],

alternates: {
canonical: "./",
},

openGraph: {
type: "website",
url: "https://toko122.github.io/gfbs3-portfolio-demo/",
title: "Toko Migineishvili | Full-Stack Developer & DevOps",
description:
"Explore the portfolio, technical skills, experience, and projects of Toko Migineishvili.",
siteName: "Toko Migineishvili Portfolio",
images: [
{
url: "me.png",
width: 1200,
height: 630,
alt: "Toko Migineishvili — Developer Portfolio",
},
],
},

twitter: {
card: "summary_large_image",
title: "Toko Migineishvili | Full-Stack Developer & DevOps",
description:
"Full-Stack Developer, DevOps & Infrastructure, and IT Specialist.",
images: ["me.png"],
},

robots: {
index: true,
follow: true,
},

icons: {
icon: "/favicon.ico",
},
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="en" className="dark">
<body
className={`${geistSans.variable} ${geistMono.variable} antialiased`}
>
{children}
</body>
</html>
);
}
