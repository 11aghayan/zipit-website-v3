import Contact_List from "@/components/contacts/Contact_List";
import use_content from "@/hooks/use-content";
import { T_Lang } from "@/types";

type Props = {
  params: Promise<{ 
    lang: T_Lang
  }>
}

export default async function Contacts({ params }: Props) {
  const lang = (await params).lang;
  const content = await use_content(lang);

  return (
    <div className="p-3 space-y-6">
      <p className="text-center font-bold text-2xl opacity-60">{content.components.contacts.header}</p>
      <Contact_List />
    </div>
  );
}