import Link from "next/link";
import { cookies } from 'next/headers';

import use_content from "@/hooks/use-content";
import { T_Lang } from "@/types";
import { Button } from "@/components/ui/button";

export default async function Not_Found() {
  const lang = ((await cookies()).get("lang")?.value ?? "am") as T_Lang;
  const content = await use_content(lang);

  return (
    <main className="p-3 pt-6 space-y-6">
      <p className="text-center font-bold text-2xl opacity-60">{content.components.not_found.main_text}</p>
      <Link
        href={`/${lang}`}
        className="mx-auto w-fit block"
      >
        <Button variant="secondary">
          {content.components.not_found.btn_text}
        </Button>
      </Link>
    </main>
  );
}