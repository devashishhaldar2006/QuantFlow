import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Devashish Haldar — QuantFlow",
  description: "Learn about Devashish Haldar, the solo engineer behind QuantFlow, his inspiration from Just Curious, and his engineering showcase HackCentral.",
};

export default function AboutPage() {
  return <AboutContent />;
}
