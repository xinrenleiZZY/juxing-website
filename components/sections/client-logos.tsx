"use client"

import { Container } from "@/components/ui/container"
import { motion } from "framer-motion"

const clients = [
  "华为",
  "阿里巴巴",
  "腾讯",
  "百度",
  "京东",
  "字节跳动",
  "美团",
  "小米",
]

export function ClientLogos() {
  return (
    <section className="border-y border-gray-200 bg-[#F8FAFC] py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="mb-8 text-sm font-medium uppercase tracking-wider text-[#334155]">
            受到行业领先企业的信赖
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-8">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <div className="rounded-lg border border-gray-200 bg-white px-6 py-4 text-center shadow-sm transition-all duration-200 hover:shadow-md">
                  <span className="text-sm font-semibold text-[#0F172A]">
                    {client}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
