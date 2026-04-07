"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowRight, Mail, Phone, Clock } from "lucide-react"
import { motion } from "framer-motion"

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] py-20 md:py-28">
      {/* 网格背景 */}
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center text-white"
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">准备开始了吗？</h2>
          <p className="mb-10 text-xl text-gray-300 md:text-2xl">
            立即联系我们的销售团队，获取专业的解决方案和一对一咨询服务
          </p>

          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="group bg-[#0369A1] text-white shadow-xl hover:bg-[#0369A1]/90"
            >
              <Mail className="mr-2 h-5 w-5" />
              联系销售团队
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              <Phone className="mr-2 h-5 w-5" />
              400-123-4567
            </Button>
          </div>

          {/* Service Promise */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#0369A1]" />
              <span>24小时内响应</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#0369A1]" />
              <span>首次咨询免费</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#0369A1]" />
              <span>专业团队服务</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
