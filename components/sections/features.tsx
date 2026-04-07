"use client"

import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { Zap, Shield, Users, TrendingUp, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Zap,
    title: "高效快速",
    description: "采用先进技术，提供高效的解决方案，快速响应客户需求，提升业务效率",
    metrics: "响应时间 < 2小时",
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "严格的安全标准，ISO 27001 认证，保障数据安全，让您放心使用",
    metrics: "99.9% 可用性保障",
  },
  {
    icon: Users,
    title: "专业团队",
    description: "经验丰富的专业团队，平均 10+ 年行业经验，提供全方位的技术支持",
    metrics: "50+ 认证专家",
  },
  {
    icon: TrendingUp,
    title: "持续创新",
    description: "不断创新优化，紧跟行业趋势，助力企业持续发展和数字化转型",
    metrics: "每月功能更新",
  },
]

export function Features() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-[#0F172A] md:text-5xl">
            为什么选择我们
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#334155]">
            我们的核心优势，助力您的业务成功
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group relative h-full overflow-hidden border-gray-200">
                <div className="relative">
                  {/* 图标 */}
                  <div className="mb-4 inline-flex rounded-lg bg-[#0369A1]/10 p-3">
                    <feature.icon className="h-8 w-8 text-[#0369A1]" />
                  </div>

                  {/* 标题 */}
                  <h3 className="mb-3 text-xl font-bold text-[#0F172A]">
                    {feature.title}
                  </h3>

                  {/* 描述 */}
                  <p className="mb-4 leading-relaxed text-[#334155]">
                    {feature.description}
                  </p>

                  {/* Metrics - Trust Signal */}
                  <div className="flex items-center gap-2 text-sm font-medium text-[#0369A1]">
                    <CheckCircle className="h-4 w-4" />
                    <span>{feature.metrics}</span>
                  </div>
                </div>

                {/* 底部装饰线 */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#0369A1] to-[#0F172A] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Credentials Section - Trust & Authority */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl border border-gray-200 bg-[#F8FAFC] p-8 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <Shield className="h-6 w-6 text-[#0369A1]" />
            <h3 className="text-xl font-bold text-[#0F172A]">行业认证与资质</h3>
          </div>
          <p className="mb-6 text-[#334155]">
            我们拥有多项国际认证，确保服务质量和安全标准
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#334155]">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#0369A1]" />
              <span>ISO 27001 认证</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#0369A1]" />
              <span>ISO 9001 认证</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#0369A1]" />
              <span>CMMI 5 级</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#0369A1]" />
              <span>高新技术企业</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
