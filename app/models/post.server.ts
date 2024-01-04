import { type Post } from "@prisma/client"

import { db } from "~/libs/db.server"

export const modelPost = {
  count() {
    return db.post.count()
  },

  getAll() {
    return db.post.findMany({
      where: {
        status: { symbol: "PUBLISHED" },
      },
      include: {
        images: { select: { url: true } },
      },
    })
  },

  getAllSlugs() {
    return db.post.findMany({
      where: {
        status: { symbol: "PUBLISHED" },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })
  },

  getById({ id }: Pick<Post, "id">) {
    return db.post.findUnique({
      where: { id },
      include: {
        status: { select: { symbol: true, name: true } },
        images: { select: { url: true } },
      },
    })
  },

  getWithStatus() {
    return db.post.findFirst({
      include: {
        status: { select: { symbol: true, name: true } },
        images: { select: { id: true, url: true } },
      },
    })
  },

  getBySlug({ slug }: Pick<Post, "slug">) {
    return db.post.findUnique({
      where: {
        slug,
        status: {
          OR: [
            { symbol: "PRIVATE" }, // IDEA: Private only for allowed users
            { symbol: "UNLISTED" },
            { symbol: "PUBLISHED" },
            { symbol: "ARCHIVED" },
          ],
        },
      },
      include: {
        status: { select: { symbol: true, name: true } },
        images: { select: { url: true } },
        user: {
          include: {
            images: { select: { url: true } },
          },
        },
      },
    })
  },

  search({ q }: { q: string | undefined }) {
    return db.post.findMany({
      where: {
        OR: [{ title: { contains: q } }, { slug: { contains: q } }],
        status: {
          OR: [{ symbol: "PUBLISHED" }, { symbol: "ARCHIVED" }],
        },
      },
      include: {
        images: { select: { url: true } },
      },
      orderBy: [{ updatedAt: "asc" }],
    })
  },
}
