"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Project } from '@/lib/types'
import { useTranslations } from 'next-intl'
import { Github, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const t = useTranslations('projects')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.slice(0, 3).map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <div className="bg-gradient-to-br from-secondary/20 to-primary/20 h-full w-full flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Project Image</p>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{project.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                {project.repoUrl && (
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href={project.repoUrl} target="_blank">
                      <Github className="h-4 w-4 mr-2" />
                      {t('viewCode')}
                    </Link>
                  </Button>
                )}
                {project.demoUrl && (
                  <Button size="sm" asChild className="flex-1">
                    <Link href={project.demoUrl} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t('viewDemo')}
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
