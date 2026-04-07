"use client";

import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // 模拟 API 调用
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("感谢您的留言，我们会尽快与您联系！");
    reset();
    setIsSubmitting(false);
  };

  return (
    <>
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              联系我们
            </h1>
            <p className="text-lg text-gray-600">
              有任何问题或需求，欢迎随时与我们联系
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                联系方式
              </h2>
              <div className="space-y-6">
                <Card>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900">电话</h3>
                      <p className="text-gray-600">400-123-4567</p>
                      <p className="text-sm text-gray-500">工作日 9:00-18:00</p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900">邮箱</h3>
                      <p className="text-gray-600">contact@example.com</p>
                      <p className="text-sm text-gray-500">24小时内回复</p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900">地址</h3>
                      <p className="text-gray-600">北京市朝阳区某某大厦</p>
                      <p className="text-sm text-gray-500">欢迎预约参观</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                在线留言
              </h2>
              <Card>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                      邮箱 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                      电话
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone")}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                      留言内容 *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message")}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "提交中..." : "提交留言"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
