import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { constructMetadata } from "@/lib/seo";
import { Calendar, User } from "lucide-react";

export const metadata = constructMetadata({
  title: "新闻动态",
  description: "了解最新的行业资讯和公司动态",
});

const posts = [
  {
    id: "1",
    title: "如何选择适合企业的管理系统",
    excerpt: "选择合适的企业管理系统对企业发展至关重要，本文将为您详细介绍选择要点...",
    date: "2026-03-01",
    author: "张三",
  },
  {
    id: "2",
    title: "数字化转型的五个关键步骤",
    excerpt: "数字化转型已成为企业发展的必然趋势，了解这五个关键步骤，让转型更顺利...",
    date: "2026-02-25",
    author: "李四",
  },
  {
    id: "3",
    title: "提升团队协作效率的实用技巧",
    excerpt: "高效的团队协作是企业成功的关键，本文分享一些实用的协作技巧和工具...",
    date: "2026-02-20",
    author: "王五",
  },
  {
    id: "4",
    title: "数据驱动决策：企业增长的新引擎",
    excerpt: "在数据时代，如何利用数据分析来驱动业务决策，实现企业持续增长...",
    date: "2026-02-15",
    author: "赵六",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              新闻动态
            </h1>
            <p className="text-lg text-gray-600">
              分享行业洞察和最新资讯
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="h-full transition-transform hover:scale-[1.02]">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {post.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
