import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Award, Clock, Zap } from "lucide-react";
import { useState } from "react";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvents = [
    {
      id: 1,
      title: "Hackverse X Google 2025",
      date: "November 2025",
      time: "12-hour Marathon",
      location: "Lamrin Tech Skills University, Punjab",
      description: "One of the most exciting tech marathons of the year! Challenge your creativity, push your coding boundaries, and spark innovation.",
      domains: ["AI", "Cybersecurity", "Web Development"],
      capacity: "500+ Students",
      highlights: [
        "12-hour non-stop coding marathon",
        "Real-world problem-solving",
        "Google Certification opportunities",
        "Mentorship from industry experts",
        "Prizes & Recognition"
      ],
      status: "open",
      icon: "🚀",
      registrationLink: "https://forms.gle/6djQnsANvvbbK8eLA",
    },
  ];

  const pastEvents = [
    {
      id: 3,
      title: "AI & Machine Learning Bootcamp",
      date: "August 2025",
      attendees: "300+",
      highlight: "Covered TensorFlow, PyTorch, and real-world ML applications",
      icon: "🤖",
    },
    {
      id: 4,
      title: "Cybersecurity Fundamentals",
      date: "July 2025",
      attendees: "250+",
      highlight: "Ethical hacking, penetration testing, and vulnerability assessment",
      icon: "🔒",
    },
    {
      id: 5,
      title: "Web Dev Sprint",
      date: "June 2025",
      attendees: "350+",
      highlight: "Built 15+ live projects using React and modern frameworks",
      icon: "💻",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-6 inline-block">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                🎉 DevNest Events Calendar
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-poppins font-bold mb-4 glow-text">
              Events & Hackathons
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community events, hackathons, workshops, and tech talks throughout the year. Build, collaborate, and innovate with us!
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <Button
              onClick={() => setActiveTab("upcoming")}
              variant={activeTab === "upcoming" ? "default" : "outline"}
              className="gap-2"
            >
              <Calendar className="w-4 h-4" />
              Upcoming Events
            </Button>
            <Button
              onClick={() => setActiveTab("past")}
              variant={activeTab === "past" ? "default" : "outline"}
              className="gap-2"
            >
              <Award className="w-4 h-4" />
              Past Events
            </Button>
          </div>

          {/* Upcoming Events */}
          {activeTab === "upcoming" && (
            <div className="space-y-8">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="glass-effect rounded-xl overflow-hidden hover-lift transition-all hover:bg-primary/5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                    {/* Left: Event Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-5xl">{event.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-3xl font-poppins font-bold mb-2">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {event.domains.map((domain, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
                              >
                                {domain}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {event.date} • {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {event.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-secondary" />
                          <span className="text-sm text-muted-foreground">
                            {event.capacity}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-secondary" />
                          <span className="text-sm text-muted-foreground">
                            {event.highlights.length} Amazing Features
                          </span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-poppins font-bold mb-3">
                          What to Expect:
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {event.highlights.map((highlight, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-primary">✓</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="md:col-span-1 flex flex-col items-center justify-center gap-4 p-6 bg-primary/10 rounded-lg">
                      <div className="text-center">
                        <div className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold mb-4">
                          {event.status === "open"
                            ? "🎯 Registrations Open"
                            : "🔔 Coming Soon"}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {event.status === "open"
                            ? "Limited Seats Available!"
                            : "Stay tuned for registration details!"}
                        </p>
                      </div>
                      <a
                        href={event.registrationLink || "https://forms.gle/6djQnsANvvbbK8eLA"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={event.status !== "open" ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
                      >
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 gap-2"
                          disabled={event.status !== "open"}
                        >
                          <Zap className="w-4 h-4" />
                          {event.status === "open"
                            ? "Register for HackVerse"
                            : "Registration Closed"}
                        </Button>
                      </a>
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline"
                      >
                        Learn More →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Events */}
          {activeTab === "past" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-lg text-muted-foreground">
                  Check out the amazing events we've hosted!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <div
                    key={event.id}
                    className="glass-effect rounded-lg p-6 hover-lift transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl">{event.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-poppins font-bold mb-1">
                          {event.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {event.date}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {event.highlight}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                      <Users className="w-4 h-4" />
                      {event.attendees} attended
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="glass-effect rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-poppins font-bold mb-4">
                Don't miss out on innovation!
              </h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter and join our community to get updates on upcoming events, workshops, and hackathons.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  Subscribe to Updates
                </Button>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    Follow on Instagram
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
