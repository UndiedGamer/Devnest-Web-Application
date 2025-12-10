import { CheckCircle, Target, Lightbulb, Heart, Code, Users, Rocket, Zap } from "lucide-react";

export function About() {
  const timeline = [
    {
      year: "Founded",
      title: "DevNest Established",
      description:
        "The official Technical Club of Lamrin Tech Skills University (LTSU) Punjab, inspiring students to explore the limitless world of technology.",
      icon: "🚀",
    },
    {
      year: "Initiative",
      title: "Google Campus Ambassador Led",
      description:
        "Led by Google Campus Ambassadors, DevNest stands as a student-driven initiative dedicated to hands-on learning and innovation.",
      icon: "🎯",
    },
    {
      year: "Domains",
      title: "Multi-Domain Excellence",
      description:
        "Bringing together passionate minds in AI, Cybersecurity, Cloud Computing, Data Science, and Web Development.",
      icon: "🌐",
    },
    {
      year: "Vision",
      title: "Preparing Digital Leaders",
      description:
        "Empowering every student to lead in the digital era through collaboration, creativity, and technical excellence.",
      icon: "🏆",
    },
  ];

  const values = [
    {
      icon: Rocket,
      title: "Collaboration",
      description:
        "Building together, growing together. We believe in the power of teamwork and shared innovation.",
    },
    {
      icon: Lightbulb,
      title: "Curiosity",
      description:
        "Constantly exploring new technologies and pushing boundaries to create impactful solutions.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description:
        "Maintaining ethical standards in all our endeavors and fostering a supportive community.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Creating solutions that make a real difference through hands-on projects and real-world experiences.",
    },
  ];

  const activities = [
    {
      icon: Code,
      title: "Hackathons",
      description: "Compete, code, and collaborate to solve real-world challenges and earn Google certifications.",
    },
    {
      icon: Users,
      title: "Workshops & Bootcamps",
      description: "Hands-on sessions led by experts to explore trending technologies like AI, Cloud, and more.",
    },
    {
      icon: Rocket,
      title: "Tech Talks",
      description: "Conversations with innovators and industry leaders to inspire new ideas and insights.",
    },
    {
      icon: Zap,
      title: "Projects & Research",
      description: "Build practical solutions and research emerging technologies to stay ahead of the curve.",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold mb-4">
            About <span className="glow-text">DevNest</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            DevNest is the official Technical Club of Lamrin Tech Skills University Punjab, established to inspire and empower students to explore the limitless world of technology.
          </p>
        </div>

        {/* Mission, Vision, Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Mission */}
          <div className="glass-effect rounded-xl p-8 hover-lift">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-poppins font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              Learn by doing — we provide students with a platform to connect with the outer tech world more vividly and grow through real-world experiences.
            </p>
          </div>

          {/* Vision */}
          <div className="glass-effect rounded-xl p-8 hover-lift">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-poppins font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              Cultivating a culture of curiosity, collaboration, and technical excellence that prepares every student to lead in the digital era.
            </p>
          </div>

          {/* Community */}
          <div className="glass-effect rounded-xl p-8 hover-lift">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-poppins font-bold mb-4">
              Student-Driven
            </h3>
            <p className="text-muted-foreground">
              A vibrant ecosystem led by Google Campus Ambassadors where diverse technical talents collaborate and innovate together.
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-poppins font-bold text-center mb-12">
            What We <span className="glow-text">Do</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="glass-effect rounded-lg p-6 hover-lift transition-all hover:bg-primary/5"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-poppins font-bold mb-2">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-poppins font-bold text-center mb-12">
            Core <span className="glow-text">Values</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="glass-effect rounded-lg p-6 hover-lift"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-poppins font-bold mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-3xl font-poppins font-bold text-center mb-12">
            Our <span className="glow-text">Foundation</span>
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-30 hidden md:block" />

            <div className="space-y-8 md:space-y-12">
              {timeline.map((event, index) => (
                <div
                  key={index}
                  className={`relative md:flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50" />
                  </div>

                  {/* Content */}
                  <div
                    className={`glass-effect rounded-lg p-6 w-full ${
                      index % 2 === 0
                        ? "md:mr-auto md:w-[45%]"
                        : "md:ml-auto md:w-[45%]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl flex-shrink-0">{event.icon}</div>
                      <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-2">
                          {event.year}
                        </div>
                        <h4 className="text-xl font-poppins font-bold mb-2">
                          {event.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
