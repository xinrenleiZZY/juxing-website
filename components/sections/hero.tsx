"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowRight, Shield, Award, Users } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-[#F1F5F9] py-20 md:py-32">
      {/* 背景装饰 - 专业简洁 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#0369A1]/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#0F172A]/5 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-5xl"
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0369A1]/20 bg-[#0369A1]/5 px-4 py-2 text-sm font-medium text-[#0369A1]">
              <Shield className="h-4 w-4" />
              <span>值得信赖的企业级解决方案提供商</span>
            </div>
          </motion.div>

          {/* 主标题 - Poppins 字体 */}
          <h1 className="mb-6 text-center text-5xl font-bold leading-tight tracking-tight text-[#0F172A] md:text-6xl lg:text-7xl">
            专业的解决方案
            <br />
            <span className="text-[#0369A1]">助力企业数据化管理</span>
          </h1>

          {/* 副标题 - Open Sans 字体 */}
          <p className="mb-10 text-center text-xl leading-relaxed text-[#334155] md:text-2xl">
            我们致力于为客户提供高质量的产品和服务
            <br className="hidden sm:block" />
            以专业技术和丰富经验，共创美好未来
          </p>

          {/* CTA 按钮 - Enterprise Gateway 模式 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="group shadow-lg shadow-[#0369A1]/20 transition-all hover:shadow-xl hover:shadow-[#0369A1]/30"
            >
              联系销售团队
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="secondary">
              查看解决方案
            </Button>
          </motion.div>

          {/* Trust Signals - 信任指标 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <Users className="h-8 w-8 text-[#0369A1]" />
              <div className="text-3xl font-bold text-[#0F172A]">500+</div>
              <div className="text-sm text-[#334155]">企业客户信赖</div>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <Award className="h-8 w-8 text-[#0369A1]" />
              <div className="text-3xl font-bold text-[#0F172A]">98%</div>
              <div className="text-sm text-[#334155]">客户满意度</div>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <Shield className="h-8 w-8 text-[#0369A1]" />
              <div className="text-3xl font-bold text-[#0F172A]">7x24</div>
              <div className="text-sm text-[#334155]">专业技术支持</div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
