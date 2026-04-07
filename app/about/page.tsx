import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "关于我们",
  description: "了解我们的公司、团队和发展历程",
});

const team = [
  { name: "张三", role: "CEO", description: "10年行业经验" },
  { name: "李四", role: "CTO", description: "技术专家" },
  { name: "王五", role: "产品总监", description: "产品设计专家" },
  { name: "赵六", role: "运营总监", description: "市场营销专家" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              关于我们
            </h1>
            <p className="text-lg text-gray-600">
              我们是一家专注于为企业提供专业解决方案的公司，致力于通过技术创新帮助客户实现业务目标
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">公司介绍</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                成立于2020年，我们始终坚持以客户为中心，提供高质量的产品和服务。
              </p>
              <p>
                我们的团队由经验丰富的专业人士组成，在各自领域都有深厚的积累。
                通过不断创新和优化，我们帮助众多企业实现了数字化转型。
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-8 text-3xl font-bold text-gray-900">核心团队</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <Card key={member.name} className="text-center">
                  <div className="mb-4 flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                    {member.name[0]}
                  </div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-blue-600">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
