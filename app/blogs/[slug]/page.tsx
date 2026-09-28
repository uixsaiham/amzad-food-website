import { notFound } from "next/navigation";
import { BlogDetails } from "../../components/BlogPages";
import { blogPosts } from "../../lib/blogs";
export function generateStaticParams() { return blogPosts.map(post => ({ slug: post.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) { const post = blogPosts.find(item => item.slug === params.slug); return { title: post ? `${post.title} | Amzad Food` : "Blog not found", description: post?.description }; }
export default function BlogPage({ params }: { params: { slug: string } }) { const post = blogPosts.find(item => item.slug === params.slug); if (!post) notFound(); return <BlogDetails post={post} />; }
