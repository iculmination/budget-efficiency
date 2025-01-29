import { navItems } from "@/constants";
import { notFound } from "next/navigation";

const DynamicRoutePage = async ({ params }: ParamProps) => {
  const route = ((await params)?.route as string) || "";
  const currentPath = route ? `/main/${route}` : "/main";
  const isValidRoute = navItems.some((item) => item.href === currentPath);
  if (!isValidRoute) {
    notFound();
  }

  return <div>{route}</div>;
};

export default DynamicRoutePage;
