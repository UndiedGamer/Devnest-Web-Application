import { Layout } from "@/components/Layout";

export default function HallOfFamePage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
              Coming Soon
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-poppins font-bold mb-4 glow-text">
            🏆 Hall of Fame
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Celebrating our top performers and achievements.
          </p>
          <div className="glass-effect rounded-lg p-8 inline-block">
            <p className="text-muted-foreground mb-4">
              This section will showcase:
            </p>
            <ul className="text-left space-y-2 text-muted-foreground text-sm">
              <li>✓ Dynamic leaderboard with year filters</li>
              <li>✓ Animated rank badges (🥇🥈🥉)</li>
              <li>✓ Member profiles with achievements</li>
              <li>✓ Gamification points and badges</li>
              <li>✓ Legends Wall (Alumni carousel)</li>
              <li>✓ GitHub and LinkedIn links</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
