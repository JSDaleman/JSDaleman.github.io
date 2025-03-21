import { getCollection } from "astro:content";
import { IdToSlug } from "./hash";

/**
 * Represents an archive item with a title, slug, date, and optional tags.
 */
export interface Archive {
  title: string;
  id: string;
  date: Date;
  tags?: string[];
}

/**
 * Represents a tag used to categorize content.
 */
export interface Tag {
  name: string;
  slug: string;
  posts: Archive[];
}

/**
 * Represents a category of content.
 */
export interface Category {
  name: string;
  slug: string;
  posts: Archive[];
}

/**
 * Retrieves and sorts content by their published date.
 */
async function getSortedContent(collection: string): Promise<any[]> {
  const allContent = await getCollection(collection, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  return allContent.sort((a, b) => new Date(b.data.published).getTime() - new Date(a.data.published).getTime());
}

/**
 * Retrieves and organizes archives grouped by year.
 */
async function getArchives(collection: string): Promise<Map<number, Archive[]>> {
  const allContent = await getCollection(collection, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const archives = new Map<number, Archive[]>();
  for (const post of allContent) {
    const date = new Date(post.data.published);
    const year = date.getFullYear();
    if (!archives.has(year)) {
      archives.set(year, []);
    }
    archives.get(year)!.push({
      title: post.data.title,
      id: `/${collection}/${IdToSlug(post.id)}`,
      date,
      tags: post.data.tags,
    });
  }

  return new Map([...archives.entries()].sort((a, b) => b[0] - a[0]));
}

/**
 * Retrieves all tags from content.
 */
async function getTags(collection: string): Promise<Map<string, Tag>> {
  const allContent = await getCollection(collection, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const tags = new Map<string, Tag>();
  allContent.forEach((post) => {
    post.data.tags?.forEach((tag: string) => {
      const tagSlug = IdToSlug(tag);
      if (!tags.has(tagSlug)) {
        tags.set(tagSlug, { name: tag, slug: `/tags/${tagSlug}`, posts: [] });
      }
      tags.get(tagSlug)!.posts.push({
        title: post.data.title,
        id: `/${collection}/${IdToSlug(post.id)}`,
        date: new Date(post.data.published),
        tags: post.data.tags,
      });
    });
  });

  return tags;
}

/**
 * Retrieves all categories from content.
 */
async function getCategories(collection: string): Promise<Map<string, Category>> {
  const allContent = await getCollection(collection, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const categories = new Map<string, Category>();
  allContent.forEach((post) => {
    if (!post.data.category) return;
    const categorySlug = IdToSlug(post.data.category);

    if (!categories.has(categorySlug)) {
      categories.set(categorySlug, { name: post.data.category, slug: `/categories/${categorySlug}`, posts: [] });
    }
    categories.get(categorySlug)!.posts.push({
      title: post.data.title,
      id: `/${collection}/${IdToSlug(post.id)}`,
      date: new Date(post.data.published),
      tags: post.data.tags,
    });
  });

  return categories;
}

/**
 * Retrieves all tags across posts and publications.
 */
export async function GetAllTags(): Promise<Map<string, Tag>> {
  const postTags = await getTags("posts");
  const publicationTags = await getTags("publications");
  return new Map([...postTags, ...publicationTags]);
}

/**
 * Retrieves all categories across posts and publications.
 */
export async function GetAllCategories(): Promise<Map<string, Category>> {
  const postCategories = await getCategories("posts");
  const publicationCategories = await getCategories("publications");
  return new Map([...postCategories, ...publicationCategories]);
}

/**
 * Retrieves sorted posts and publications together.
 */
export async function GetAllSortedContent(): Promise<any[]> {
  const sortedPosts = await getSortedContent("posts");
  const sortedPublications = await getSortedContent("publications");
  return [...sortedPosts, ...sortedPublications].sort((a, b) => new Date(b.data.published).getTime() - new Date(a.data.published).getTime());
}

/**
 * Retrieves archives across posts and publications.
 */
export async function GetAllArchives(): Promise<Map<number, Archive[]>> {
  const postArchives = await getArchives("posts");
  const publicationArchives = await getArchives("publications");
  return new Map([...postArchives, ...publicationArchives]);
}

export async function GetSortedPosts(): Promise<any[]> {
  return getSortedContent("posts");
}

export async function GetArchives(): Promise<Map<number, Archive[]>> {
  return getArchives("posts");
}

export async function GetTags(): Promise<Map<string, Tag>> {
  return getTags("posts");
}

export async function GetCategories(): Promise<Map<string, Category>> {
  return getCategories("posts");
}

export async function GetSortedPublications(): Promise<any[]> {
  return getSortedContent("publications");
}

export async function GetArchivePublications(): Promise<Map<number, Archive[]>> {
  return getArchives("publications");
}

export async function GetTagsPublications(): Promise<Map<string, Tag>> {
  return getTags("publications");
}

export async function GetCategoriesPublications(): Promise<Map<string, Category>> {
  return getCategories("publications");
}
