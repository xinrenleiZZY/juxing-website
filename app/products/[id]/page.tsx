import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

interface Product {
  title: string;
  description: string;
  details: string;
  features: string[];
}

const productsData: Record<string, Product> = {
  "1": {
    title: "企业管理系统",
    description: "全面的企业资源管理解决方案，提升运营效率",
    details: "我们的企业管理系统集成了财务、人力资源、供应链等多个模块，帮助企业实现全面的数字化管理。",
    features: [
      "流程自动化 - 减少人工操作，提升效率",
      "数据分析 - 实时掌握企业运营状况",
      "多端同步 - 支持PC、移动端无缝切换",
      "权限管理 - 灵活的角色权限配置",
    ],
  },
  "2": {
    title: "客户关系管理",
    description: "智能化的客户管理工具，提升客户满意度",
    details: "通过智能化的客户管理系统，帮助企业更好地了解客户需求，提升客户满意度和忠诚度。",
    features: [
      "客户画像 - 全面了解客户信息",
      "销售跟进 - 自动化销售流程管理",
      "数据报表 - 可视化的业务分析",
      "营销自动化 - 精准的营销活动管理",
    ],
  },
  "3": {
    title: "数据分析平台",
    description: "强大的数据分析能力，助力业务决策",
    details: "基于大数据技术的分析平台，为企业提供深度的数据洞察和智能决策支持。",
    features: [
      "实时分析 - 毫秒级数据处理",
      "可视化报表 - 直观的数据展示",
      "预测模型 - AI驱动的业务预测",
      "自定义指标 - 灵活的指标配置",
    ],
  },
  "4": {
    title: "移动办公应用",
    description: "随时随地办公，提升团队协作效率",
    details: "打造高效的移动办公环境，让团队协作更加便捷，工作效率显著提升。",
    features: [
      "即时通讯 - 高效的团队沟通",
      "任务管理 - 清晰的任务分配和跟踪",
      "文件共享 - 安全的文件存储和分享",
      "视频会议 - 高清稳定的远程会议",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productsData[id];
  if (!product) return {};
  
  return constructMetadata({
    title: product.title,
    description: product.description,
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productsData[id];

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              {product.title}
            </h1>
            <p className="text-lg text-gray-600">{product.description}</p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">产品介绍</h2>
              <p className="text-gray-600">{product.details}</p>
            </div>

            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">核心功能</h2>
              <ul className="space-y-4">
                {product.features.map((feature: string) => (
                  <li key={feature} className="flex items-start">
                    <span className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                想了解更多？
              </h3>
              <p className="mb-6 text-gray-600">
                联系我们获取详细的产品资料和演示
              </p>
              <Button size="lg">立即咨询</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
