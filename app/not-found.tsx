import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            页面未找到
          </h2>
          <p className="mb-8 text-gray-600">
            抱歉，您访问的页面不存在或已被移除
          </p>
          <Link href="/">
            <Button size="lg">
              <Home className="mr-2 h-5 w-5" />
              返回首页
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
