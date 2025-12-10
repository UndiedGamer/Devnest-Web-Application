import { Layout } from "@/components/Layout";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Users, Zap, Filter } from "lucide-react";
import highlightsData from "@/data/highlights.json";

interface Highlight {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  participants: string;
  projects: string;
}

export default function HighlightsPage() {
  const highlights: Highlight[] = highlightsData.highlights;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Highlight | null>(null);

  const categories = Array.from(new Set(highlights.map((h) => h.category)));

  const filteredHighlights = selectedCategory
    ? highlights.filter((h) => h.category === selectedCategory)
    : highlights;

  return (
    <Layout>
      <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Image
                src="/logo.png"
                alt="DevNest"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span className="text-primary text-sm font-medium">Event Highlights</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-poppins font-bold mb-4 glow-text">
              Our Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcasing the incredible moments, achievements, and community spirit from our major events
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-muted-foreground">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={() => setSelectedCategory(null)}
                variant={selectedCategory === null ? "default" : "outline"}
                className="rounded-full"
              >
                All Events
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid - Masonry Style */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {filteredHighlights.map((highlight, index) => (
                <div
                  key={highlight.id}
                  className={`glass-effect rounded-lg overflow-hidden hover-lift transition-all cursor-pointer group ${index % 3 === 0 ? "lg:col-span-1 lg:row-span-2" : ""
                    }`}
                  onClick={() => setSelectedImage(highlight)}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Image Container */}
                  <div
                    className={`relative bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden flex items-center justify-center ${index % 3 === 0 ? "h-96" : "h-48"
                      }`}
                  >
                    <div className={`${index % 3 === 0 ? "text-9xl" : "text-6xl"} group-hover:scale-110 transition-transform duration-300`}>
                      {highlight.image}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay Info - Hidden until hover */}
                    <div className="absolute inset-0 bg-black/60 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white">
                        <div className="inline-block px-2 py-1 rounded bg-primary/80 text-xs font-semibold mb-2">
                          {highlight.category}
                        </div>
                        <h3 className="font-bold">{highlight.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4">
                    <h3 className="font-poppins font-bold mb-2 line-clamp-1">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {highlight.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-primary" />
                        {highlight.participants}
                      </div>
                      {highlight.projects !== "N/A" && (
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-secondary" />
                          {highlight.projects} projects
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                      {new Date(highlight.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="glass-effect rounded-lg overflow-hidden max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image */}
                <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-9xl">{selectedImage.image}</div>
                </div>

                {/* Details */}
                <div className="p-8">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                      {selectedImage.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-poppins font-bold mb-3">
                    {selectedImage.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{selectedImage.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-t border-b border-border">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {selectedImage.participants}
                      </div>
                      <div className="text-sm text-muted-foreground">Participants</div>
                    </div>
                    {selectedImage.projects !== "N/A" && (
                      <div>
                        <div className="text-2xl font-bold text-secondary">
                          {selectedImage.projects}
                        </div>
                        <div className="text-sm text-muted-foreground">Projects Built</div>
                      </div>
                    )}
                  </div>

                  {/* Date */}
                  <div className="text-sm text-muted-foreground mb-6">
                    {new Date(selectedImage.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => setSelectedImage(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="text-4xl font-poppins font-bold text-primary mb-2">
                {highlights.length}+
              </div>
              <p className="text-muted-foreground">Major Events Organized</p>
            </div>
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="text-4xl font-poppins font-bold text-secondary mb-2">
                {highlights.reduce((acc, h) => {
                  const num = parseInt(h.participants.split("+")[0]);
                  return acc + num;
                }, 0)}
                +
              </div>
              <p className="text-muted-foreground">Total Participants</p>
            </div>
            <div className="glass-effect rounded-lg p-6 text-center">
              <div className="text-4xl font-poppins font-bold text-primary mb-2">
                {highlights.reduce((acc, h) => {
                  if (h.projects !== "N/A") {
                    const num = parseInt(h.projects);
                    return acc + num;
                  }
                  return acc;
                }, 0)}
                +
              </div>
              <p className="text-muted-foreground">Projects Created</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Layout>
  );
}
