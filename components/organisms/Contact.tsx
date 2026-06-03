import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { ContactActions } from "@/components/molecules/ContactActions";
import { getContactData, type ContactData } from "@/data/contact";
import type { Locale } from "@/i18n/routing";

type ContactProps = {
  locale: Locale;
  contactData?: ContactData;
};

export function Contact({ locale, contactData }: ContactProps) {
  const resolvedContactData = contactData ?? getContactData(locale);

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl scroll-mt-24 overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(14,165,233,0.06),transparent_42%)]" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:inset-x-12" />

      <div className="motion-contact-enter relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#08090d]/85 px-6 py-12 text-center shadow-2xl shadow-black/40 backdrop-blur sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.13),transparent_36%),radial-gradient(circle_at_50%_100%,rgba(34,197,94,0.1),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_45%)]" />
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />

        <SectionEyebrow>{resolvedContactData.eyebrow}</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {resolvedContactData.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
          {resolvedContactData.description}
        </p>

        <ContactActions
          actions={resolvedContactData.actions}
          interactionLabels={resolvedContactData.interactionLabels}
        />
      </div>
    </section>
  );
}
