import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const base = './src/content';

const skills = defineCollection({
	loader: glob({ pattern: '*.md', base: `${base}/skills` }),
	schema: z.object({
		title: z.string(),
		order: z.number(),
		items: z.array(z.string()),
	}),
});

const experiences = defineCollection({
	loader: glob({ pattern: '*.md', base: `${base}/experiences` }),
	schema: z.object({
		role: z.string(),
		meta: z.string(),
		description: z.string(),
		order: z.number(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '*.md', base: `${base}/projects` }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		link: z.string(),
		order: z.number(),
	}),
});

const services = defineCollection({
	loader: glob({ pattern: '*.md', base: `${base}/services` }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		order: z.number(),
	}),
});

export const collections = { skills, experiences, projects, services };
