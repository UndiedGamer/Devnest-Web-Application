import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { InterviewsOpen } from "@/components/InterviewsOpen";
import { Team } from "@/components/Team";
import { DailyQuote } from "@/components/DailyQuote";

export default function Index() {
  return (
    <Layout>
      <Hero />
      <InterviewsOpen />
      <About />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <DailyQuote />
      </div>
      <Team />
    </Layout>
  );
}
