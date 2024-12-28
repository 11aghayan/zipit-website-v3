import { T_Content, T_Lang } from "@/types";

export default async function use_content(lang: T_Lang) {
  const content: T_Content = await import(`@/lib/content_${lang}.json`);
  return JSON.parse(JSON.stringify(content)) as T_Content;
}