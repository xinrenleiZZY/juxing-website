import { Container } from "@/components/ui/container";
import { constructMetadata } from "@/lib/seo";
import { generateArticleSchema } from "@/lib/structured-data";
import { Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";

interface Post {
  title: string;
  date: string;
  author: string;
  content: string;
}

const postsData: Record<string, Post> = {
  "1": {
    title: "如何选择适合企业的管理系统",
    date: "2026-03-01",
    author: "张三",
    content: `
      <p>选择合适的企业管理系统对企业发展至关重要。一个好的管理系统不仅能提升运营效率，还能帮助企业更好地管理资源和数据。</p>
      
      <h2>评估企业需求</h2>
      <p>首先要明确企业的实际需求，包括业务流程、团队规模、预算等因素。不同规模和行业的企业，对管理系统的需求差异很大。</p>
      
      <h2>考察系统功能</h2>
      <p>系统功能是否完善、是否符合企业业务流程、是否易于使用，这些都是需要重点考察的方面。</p>
      
      <h2>关注扩展性</h2>
      <p>随着企业发展，系统需要能够灵活扩展。选择具有良好扩展性的系统，可以避免未来的重复投资。</p>
    `,
  },
  "2": {
    title: "数字化转型的五个关键步骤",
    date: "2026-02-25",
    author: "李四",
    content: `
      <p>数字化转型已成为企业发展的必然趋势。本文将介绍数字化转型的五个关键步骤。</p>
      
      <h2>1. 制定清晰的战略</h2>
      <p>明确数字化转型的目标和路径，制定详细的实施计划。</p>
      
      <h2>2. 建立数字化文化</h2>
      <p>培养员工的数字化思维，营造创新氛围。</p>
      
      <h2>3. 选择合适的技术</h2>
      <p>根据企业需求选择适合的技术方案和工具。</p>
      
      <h2>4. 优化业务流程</h2>
      <p>利用数字化技术优化和重构业务流程。</p>
      
      <h2>5. 持续迭代优化</h2>
      <p>数字化转型是一个持续的过程，需要不断优化和改进。</p>
    `,
  },
  "3": {
    title: "提升团队协作效率的实用技巧",
    date: "2026-02-20",
    author: "王五",
    content: `
      <p>高效的团队协作是企业成功的关键。本文分享一些实用的协作技巧。</p>
      
      <h2>建立清晰的沟通机制</h2>
      <p>确保团队成员之间能够高效沟通，减少信息传递的损耗。</p>
      
      <h2>使用协作工具</h2>
      <p>选择合适的协作工具，如项目管理软件、即时通讯工具等。</p>
      
      <h2>定期团队会议</h2>
      <p>通过定期会议同步进度，解决问题，保持团队凝聚力。</p>
    `,
  },
  "4": {
    title: "数据驱动决策：企业增长的新引擎",
    date: "2026-02-15",
    author: "赵六",
    content: `
      <p>在数据时代，如何利用数据分析来驱动业务决策，实现企业持续增长。</p>
      
      <h2>建立数据收集体系</h2>
      <p>完善的数据收集是数据分析的基础，需要建立系统化的数据收集机制。</p>
      
      <h2>数据分析与洞察</h2>
      <p>通过数据分析工具，从数据中挖掘有价值的洞察。</p>
      
      <h2>将洞察转化为行动</h2>
      <p>基于数据洞察制定决策，并持续跟踪效果。</p>
    `,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = postsData[id];
  if (!post) return {};
  
  return constructMetadata({
    title: post.title,
    description: post.content.substring(0, 150),
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = postsData[id];

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.content.substring(0, 150).replace(/<[^>]*>/g, ""),
    datePublished: post.date,
    author: post.author,
    url: `https://example.com/blog/${id}`,
  });

  return (
    <article className="py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            {post.title}
          </h1>

          <div className="mb-8 flex items-center gap-4 text-gray-600">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {post.author}
            </span>
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </Container>
    </article>
  );
}
