import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrackHub — GitHub Project Tracker",
  description:
    "Project tracking terintegrasi GitHub dengan progress, kolaborasi tim, dan meeting scheduler.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
