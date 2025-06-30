"use client"

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { projects } from '@/lib/data/projects'
import { Github, ExternalLink, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Project } from '@/lib/types'

export const runtime = 'edge';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations('projects')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <div className="bg-gradient-to-br from-secondary/20 to-primary/20 h-full w-full flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Project Image</p>
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            {project.featured && (
              <span className="bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                Featured
              </span>
            )}
            <span className={`px-2 py-1 text-xs rounded capitalize ${
              project.status === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : project.status === 'completed'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {project.status}
            </span>
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
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{t('team')}: {project.members.join(', ')}</span>
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
  )
}

export default function ProjectsPage() {
  const t = useTranslations('projects')

  return (
    <div className="container py-20 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('description')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </div>
  )
}
