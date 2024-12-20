import { T_Content, T_Lang } from "@/app/types";

export default async function use_content(lang: T_Lang) {
  const content: T_Content = await import(`@/lib/content_${lang}.json`);
  return content;
}