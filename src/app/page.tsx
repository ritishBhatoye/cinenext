import { Button } from "@/components/elements";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/elements";
import { Input } from "@/components/elements";
import { Text } from "@/components/atoms";
import { Link } from "@/components/atoms";
import Hero from "@/components/global/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      <div className="max-w-6xl mx-auto space-y-12 p-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <Text as="h1" size="3xl" variant="netflix" className="mb-4">
            CineNext
          </Text>
          <Text size="lg" variant="secondary">
            Netflix-themed Design System Demo
          </Text>
        </header>

        {/* Buttons Section */}
        <section className="space-y-6">
          <Text as="h2" size="2xl" weight="bold">
            Buttons
          </Text>
          <div className="flex flex-wrap gap-4">
            <Button variant="netflix" size="lg">
              Watch Now
            </Button>
            <Button variant="netflix-outline" size="lg">
              Add to List
            </Button>
            <Button variant="default">Default Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <Text as="h2" size="2xl" weight="bold">
            Cards
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stranger Things</CardTitle>
                <CardDescription>
                  When a young boy vanishes, a small town uncovers a mystery
                  involving secret experiments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-netflix-gray rounded-md flex items-center justify-center">
                    <Text variant="muted">Movie Poster</Text>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="netflix" size="sm">
                      Play
                    </Button>
                    <Button variant="netflix-outline" size="sm">
                      Info
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>The Crown</CardTitle>
                <CardDescription>
                  Follows the political rivalries and romance of Queen Elizabeth
                  II&apos;s reign.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-netflix-gray rounded-md flex items-center justify-center">
                    <Text variant="muted">Movie Poster</Text>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="netflix" size="sm">
                      Play
                    </Button>
                    <Button variant="netflix-outline" size="sm">
                      Info
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ozark</CardTitle>
                <CardDescription>
                  A financial advisor drags his family from Chicago to the
                  Missouri Ozarks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-netflix-gray rounded-md flex items-center justify-center">
                    <Text variant="muted">Movie Poster</Text>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="netflix" size="sm">
                      Play
                    </Button>
                    <Button variant="netflix-outline" size="sm">
                      Info
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Section */}
        <section className="space-y-6">
          <Text as="h2" size="2xl" weight="bold">
            Form Elements
          </Text>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your email and password to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input type="email" placeholder="Email address" />
                </div>
                <div>
                  <Input type="password" placeholder="Password" />
                </div>
                <Button variant="netflix" className="w-full">
                  Sign In
                </Button>
                <div className="text-center">
                  <Link variant="netflix">Forgot password?</Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography Section */}
        <section className="space-y-6">
          <Text as="h2" size="2xl" weight="bold">
            Typography
          </Text>
          <div className="space-y-4">
            <Text as="h1" size="3xl" weight="bold">
              Heading 1 - 3xl Bold
            </Text>
            <Text as="h2" size="2xl" weight="semibold">
              Heading 2 - 2xl Semibold
            </Text>
            <Text as="h3" size="xl" weight="medium">
              Heading 3 - xl Medium
            </Text>
            <Text size="lg">
              Large text - Perfect for subtitles and important information
            </Text>
            <Text>Default text - The standard text size for most content</Text>
            <Text size="sm" variant="secondary">
              Small secondary text - Great for captions and metadata
            </Text>
            <Text size="xs" variant="muted">
              Extra small muted text - For fine print and disclaimers
            </Text>
          </div>
        </section>
      </div>
    </div>
  );
}
