import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Next.js Setup Complete
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Your Next.js project with TypeScript, Tailwind CSS, shadcn/ui, and
            strict ESLint is ready to go!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Tech Stack</CardTitle>
              <CardDescription>
                Everything you need for modern web development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Next.js 15 with App Router</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>TypeScript with strict configuration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                <span>Tailwind CSS v4</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span>shadcn/ui components</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span>ESLint with strict rules</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Component Demo</CardTitle>
              <CardDescription>
                shadcn/ui components are working perfectly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-input">Demo Input</Label>
                <Input id="demo-input" placeholder="Type something..." />
              </div>
              <div className="flex space-x-2">
                <Button>Primary Button</Button>
                <Button variant="outline">Secondary</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>🛠️ Next Steps</CardTitle>
            <CardDescription>
              Ready to start building your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-semibold">Development</h3>
                <p className="text-sm text-slate-600">
                  Run{" "}
                  <code className="bg-slate-100 px-1 rounded">npm run dev</code>{" "}
                  to start the development server
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Components</h3>
                <p className="text-sm text-slate-600">
                  Add more shadcn/ui components with{" "}
                  <code className="bg-slate-100 px-1 rounded">
                    npx shadcn@latest add [component]
                  </code>
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Linting</h3>
                <p className="text-sm text-slate-600">
                  Check code quality with{" "}
                  <code className="bg-slate-100 px-1 rounded">
                    npm run lint
                  </code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
