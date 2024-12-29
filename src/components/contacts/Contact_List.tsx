import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import Link from "next/link";


export default function Contact_List() {
  const value = {
    email: 'zipitaccessories@gmail.com',
    phone: '+37495124838',
    whatsapp: '+37495124838',
    telegram: '@ZIPIT_ACCESSORIES',
    viber: '+37495124838'
  }

  const href = {
    email: `mailto:${value.email}`,
    phone: `tel:${value.phone}`,
    whatsapp: `whatsapp://send?phone=${value.whatsapp}`,
    telegram: `tg://resolve?domain=${value.telegram.slice(1)}`,
    viber: `viber://chat?number=${value.viber}`
  }

  const logo = {
    email: 'mdi:email',
    phone: 'mdi:phone',
    whatsapp: 'simple-icons:whatsapp',
    telegram: 'simple-icons:telegram',
    viber: 'simple-icons:viber'
  }
  
  const contacts = ["phone", "whatsapp", "viber", "telegram", "email"] as const;
  
  return (
    <div className="space-y-2 mx-auto w-fit">
      {
        contacts.map(contact => (
          <Link
            href={href[contact]}
            key={contact}
            aria-label={`${contact}-contact`}
            className="flex items-center gap-3 rounded-md border shadow p-3 hover:bg-gray-100"
          >
            <Icon 
              icon={logo[contact]} 
              width={24} 
              height={24} 
              className={clsx({
                "text-viber": contact === "viber",
                "text-whatsapp": contact === "whatsapp",
                "text-telegram": contact === "telegram",
                "text-phone": contact === "phone",
                "text-email": contact === "email"
              })}
            />
            <p>{value[contact]}</p>
          </Link>
        ))
      }
    </div>
  );
}