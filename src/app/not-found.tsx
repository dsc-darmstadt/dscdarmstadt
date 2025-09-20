'use client'

import { FuzzyText } from '@/components/ui/fuzzy-text'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="container max-w-2xl mx-auto text-center space-y-8">
        {/* Fuzzy 404 Text */}
        <div className="flex justify-center">
          <FuzzyText
            fontSize="clamp(4rem, 15vw, 12rem)"
            fontWeight={900}
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            className="drop-shadow-lg"
          >
            404 💀
          </FuzzyText>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Ohaa, Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            We couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL..or we messed up..
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 text-sm text-muted-foreground">
          <p>
            If you believe this is an error, please{' '}
            <Link
              href="/about"
              className="text-primary hover:underline font-medium"
            >
              contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
