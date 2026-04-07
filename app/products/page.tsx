import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "产品服务",
  description: "了解我们提供的专业产品和服务",
});

const products = [
  {
    id: "1",
    title: "企业管理系统",
    description: "全面的企业资源管理解决方案，提升运营效率",
    features: ["流程自动化", "数据分析", "多端同步"],
  },
  {
    id: "2",
    title: "客户关系管理",
    description: "智能化的客户管理工具，提升客户满意度",
    features: ["客户画像", "销售跟进", "数据报表"],
  },
  {
    id: "3",
    title: "数据分析平台",
    description: "强大的数据分析能力，助力业务决策",
    features: ["实时分析", "可视化报表", "预测模型"],
  },
  {
    id: "4",
    title: "移动办公应用",
    description: "随时随地办公，提升团队协作效率",
    features: ["即时通讯", "任务管理", "文件共享"],
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              产品服务
            </h1>
            <p className="text-lg text-gray-600">
              为企业提供全方位的数字化解决方案
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {products.map((product) => (
              <Card key={product.id}>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  {product.title}
                </h3>
                <p className="mb-4 text-gray-600">{product.description}</p>
                <ul className="mb-6 space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/products/${product.id}`}>
                  <Button variant="outline" size="sm">
                    了解详情
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
