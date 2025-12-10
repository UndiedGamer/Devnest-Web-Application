import { useState, useEffect } from "react";
import { Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import quotesData from "@/data/quotes.json";

interface Quote {
  text: string;
  author: string;
  category: string;
}

export function DailyQuote() {
  const quotes: Quote[] = quotesData.quotes;
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

  useEffect(() => {
    // Get a random quote on component mount
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  }, [quotes]);

  const getNewQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  };

  if (!currentQuote) return null;

  return (
    <section className="relative py-12 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-xl overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse animation-delay-2000" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <Lightbulb className="w-8 h-8 text-primary mx-auto mb-4" />
        <p className="text-lg sm:text-2xl italic text-foreground font-semibold mb-4 leading-relaxed">
          "{currentQuote.text}"
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          — {currentQuote.author} • {currentQuote.category}
        </p>
        <Button
          onClick={getNewQuote}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          New Quote
        </Button>
      </div>

      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
