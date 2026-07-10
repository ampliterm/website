import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const changelogItem = z.object({
  date: z.string(),
  badge: z.enum(['new', 'improved', 'fixed', 'removed', 'breaking']),
  text: z.string(),
  sha: z.string().optional(),
  author: z.string().optional(),
})

const changelogSection = z.object({
  type: z.enum(['added', 'changed', 'fixed', 'removed', 'breaking']),
  items: z.array(changelogItem),
})

const roadmapFeatureMetaItem = z.object({
  label: z.string(),
  value: z.string(),
  color: z.string().optional(),
})

const roadmapFeature = z.object({
  id: z.string(),
  hero: z.boolean().default(false),
  title: z.string(),
  category: z.string(),
  icon: z.string().default('default'),
  status: z.enum(['done', 'dev', 'review', 'beta', 'planned', 'research']),
  statusLabel: z.string(),
  eta: z.string().optional(),
  etaLabel: z.string().optional(),
  description: z.string(),
  bullets: z.array(z.string()).default([]),
  meta: z.array(roadmapFeatureMetaItem).default([]),
})

const roadmapTimelineMarker = z.object({
  label: z.string(),
  type: z.enum(['commit', 'next', 'exp', 'research']),
  top: z.number().default(30),
})

const roadmapTimelineMonth = z.object({
  name: z.string(),
  now: z.boolean().default(false),
  nowLinePercent: z.number().optional(),
  markers: z.array(roadmapTimelineMarker).default([]),
})

const blogTag = z.object({
  label: z.string(),
  variant: z.enum(['cyan', 'green', 'amber', 'red', 'neutral']),
})

const blogAuthor = z.object({
  name: z.string(),
  initials: z.string(),
  role: z.string(),
  bio: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        excerpt: z.string().default(''),
        date: z.string(),
        author: blogAuthor.nullable().default(null),
        tags: z.array(blogTag).default([]),
        category: z.string().default(''),
        readTime: z.string().default(''),
        featured: z.boolean().default(false),
        imagePlaceholder: z.string().optional(),
        // Path under public/ to a static OG image (e.g. "/og/blog-sec-filings-og.png").
        // When set, it overrides the default dynamic nuxt-og-image template.
        ogImage: z.string().optional(),
      }),
    }),
    content: defineCollection({
      type: 'page',
      source: '**',
    }),
    docs: defineCollection({
      type: 'page',
      source: 'docs/**',
      schema: z.object({
        section: z.string().default(''),
        sectionOrder: z.number().default(0),
        order: z.number().default(0),
        badge: z.string().optional(),
        updatedAt: z.string().optional(),
        // Path under public/ to a static OG image; defaults to the shared docs card.
        ogImage: z.string().optional(),
      }),
    }),
    changelog: defineCollection({
      type: 'data',
      source: 'changelog/*.yml',
      schema: z.object({
        version: z.string(),
        title: z.string().optional(),
        type: z.enum(['major', 'minor', 'patch', 'beta', 'alpha']),
        date: z.string(),
        codename: z.string().optional(),
        commits: z.number().optional(),
        contributors: z.number().optional(),
        intro: z.string(),
        sections: z.array(changelogSection).default([]),
      }),
    }),
    roadmapMeta: defineCollection({
      type: 'data',
      source: 'roadmap-meta.yml',
      schema: z.object({
        eyebrow: z.string(),
        intro: z.string(),
        liveBuild: z.string(),
        inFlight: z.string(),
        inFlightColor: z.string().default('cy'),
        target: z.string(),
        featuresQueued: z.number(),
        disclaimer: z.string(),
        githubUrl: z.string().optional(),
        discordUrl: z.string().optional(),
        timeline: z.object({
          label: z.string(),
          months: z.array(roadmapTimelineMonth),
        }),
      }),
    }),
    roadmap: defineCollection({
      type: 'data',
      source: 'roadmap/*.yml',
      schema: z.object({
        id: z.string(),
        order: z.number().default(0),
        label: z.string(),
        quarter: z.string(),
        tag: z.enum(['now', 'next', 'later', 'research']),
        tagLabel: z.string(),
        dateRange: z.string(),
        codename: z.string().optional(),
        intro: z.string(),
        progress: z.object({
          label: z.string(),
          percent: z.number(),
          color: z.enum(['green', 'cyan', 'amber', 'magenta']).default('green'),
          stats: z.array(z.string()).default([]),
        }).optional(),
        features: z.array(roadmapFeature).default([]),
      }),
    }),
  },
})
