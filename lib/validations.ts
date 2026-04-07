import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, "姓名至少需要2个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  phone: z.string().optional(),
  message: z.string().min(10, "留言内容至少需要10个字符"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
