"use client";

import { useSearchParams } from "next/navigation";

import clsx from "clsx";
import { Suspense, useEffect, useState } from "react";

import { T_Content, T_Lang } from "@/types";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import use_content from "@/hooks/use-content";

type Props = {
  page: number,
  pages: number,
  lang: T_Lang
}

function Items_Pagination({ page, pages, lang }: Props) {
  const search_params = new URLSearchParams(useSearchParams().toString());
  
  const [content, set_content] = useState<T_Content>();
  
  useEffect(() => {
    use_content(lang)
      .then(c => set_content(c));
  }, [lang]);
  
  function page_link_url(page: number, pages: number) {
    page = page < 1 ? 1 : page > pages ? pages : page;
    search_params.set("page", page.toString());
    return `/${lang}?${search_params.toString()}`
  }
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            className={clsx(page <= 1 ? "pointer-events-none opacity-50" : "")}
            href={page_link_url(page - 1, pages)} 
            text={content?.components.home.Pagination.previous_text ?? ""}
          />
        </PaginationItem>
        {
          page - 1 > 1 && pages > 3
          ?
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          :
          null
        }
        { 
          [page - 2 > 0 && pages === page ? page - 2  : null, page - 1 > 0 ? page - 1 : null, page, page + 1 > pages ? null : page + 1, page === 1 && pages > 2 ? 3 : null].filter(p => p !== null)
          .map((p, i) => (
            <PaginationItem
              key={i}
            >
              <PaginationLink 
                href={page_link_url(p, pages)}
                className={clsx(page === p ? "pointer-events-none opacity-50" : "")}
                isActive={page === p}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))
        }
        {
          page + 1 < pages && pages > 3
          ?
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          :
          null
        }
        <PaginationItem>
          <PaginationNext 
            className={clsx(page >= pages ? "pointer-events-none opacity-50" : "")}
            href={page_link_url(page + 1, pages)} 
            text={content?.components.home.Pagination.next_text ?? ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default function Wrapper({ page, pages, lang }: Props) {
  return (
    <Suspense>
      <Items_Pagination page={page} pages={pages} lang={lang} />
    </Suspense>
  );
}