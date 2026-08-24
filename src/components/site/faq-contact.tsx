import { useState, type FormEvent } from "react";
import logo from "@/assets/farkhadivich-ai-logo.jpg";
import { Section, SectionHeading, Reveal } from "./primitives";
import { TelegramCta } from "./cta";
import { useT } from "@/i18n/lang";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const t = useT();

  return (
    <Section id="faq">
      <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} subtitle={t.faq.subtitle} />
      <div className="mt-14 mx-auto max-w-3xl space-y-4">
        {(t.faq?.items || []).map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 40}>
              <div className="surface-card rounded-2xl border border-border/80 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-foreground">{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-secondary/60 text-sm font-bold transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-primary" : "text-muted-foreground"
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-border/40 px-6 pb-6 pt-4 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-12 text-center">
        <a
          href="https://t.me/farkhadivichai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
        >
          {t.faq.ask}
        </a>
      </div>
    </Section>
  );
}

export function FinalCta() {
  const t = useT();

  return (
    <Section className="relative overflow-hidden text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12),transparent_70%)]"
      />
      <span className="text-xs font-black tracking-[0.3em] text-primary uppercase">
        {t.finalCta.slogan}
      </span>
      <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
        <span className="text-chrome">{t.finalCta.title}</span>
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {t.finalCta.text}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <TelegramCta label={t.common.telegramCta} />
        <a
          href="#kurs"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-secondary/60 px-6 py-3.5 text-sm font-bold transition hover:bg-secondary"
        >
          {t.finalCta.enroll}
        </a>
      </div>
    </Section>
  );
}

const field =
  "w-full rounded-xl border border-input bg-obsidian/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none";

const BOT_TOKEN = "8706720534:AAEAvK3k78m9diPC7EZl-B29oUQTO5nF7pE";
const CHAT_ID = "5126649501";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const t = useT();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);
    const ism = data.get("ism")?.toString() || "";
    const tel = data.get("tel")?.toString() || "";
    const tg = data.get("tg")?.toString() || "";
    const xizmat = data.get("xizmat")?.toString() || "";
    const tavsif = data.get("tavsif")?.toString() || "";
    const budjet = data.get("budjet")?.toString() || "";
    const muddat = data.get("muddat")?.toString() || "";

    const text =
      `🔥 <b>Yangi so'rov / Buyurtma:</b>\n\n` +
      `👤 <b>Ismi:</b> ${ism}\n` +
      `📞 <b>Telefon:</b> ${tel}\n` +
      `✈️ <b>Telegram:</b> ${tg || "Ko'rsatilmadi"}\n` +
      `🛠️ <b>Xizmat:</b> ${xizmat || "Tanlanmadi"}\n` +
      `📝 <b>Loyiha haqida:</b> ${tavsif || "Ko'rsatilmadi"}\n` +
      `💰 <b>Budjet:</b> ${budjet || "Ko'rsatilmadi"}\n` +
      `⏳ <b>Muddat:</b> ${muddat || "Ko'rsatilmadi"}\n\n` +
      `🌐 <i>farkhadivichai.uz saytidan yuborildi</i>`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "HTML",
        }),
      });

      if (response.ok) {
        setSent(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="aloqa" className="border-t border-border/60">
      <SectionHeading
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <form onSubmit={onSubmit} className="surface-card rounded-3xl p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="ism" className="mb-2 block text-sm font-semibold">
                  {t.contact.name}
                </label>
                <input id="ism" name="ism" required className={field} placeholder={t.contact.name} />
              </div>
              <div>
                <label htmlFor="tel" className="mb-2 block text-sm font-semibold">
                  {t.contact.phone}
                </label>
                <input
                  id="tel"
                  name="tel"
                  type="tel"
                  required
                  className={field}
                  placeholder="+998 __ ___ __ __"
                />
              </div>
              <div>
                <label htmlFor="tg" className="mb-2 block text-sm font-semibold">
                  {t.contact.telegram}
                </label>
                <input id="tg" name="tg" className={field} placeholder="@username" />
              </div>
              <div>
                <label htmlFor="xizmat" className="mb-2 block text-sm font-semibold">
                  {t.contact.service}
                </label>
                <select id="xizmat" name="xizmat" className={field} defaultValue="">
                  <option value="" disabled>
                    {t.contact.select}
                  </option>
                  {(t.contact.serviceOptions || []).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="tavsif" className="mb-2 block text-sm font-semibold">
                  {t.contact.description}
                </label>
                <textarea
                  id="tavsif"
                  name="tavsif"
                  rows={4}
                  className={field}
                  placeholder={t.contact.descriptionPlaceholder}
                />
              </div>
              <div>
                <label htmlFor="budjet" className="mb-2 block text-sm font-semibold">
                  {t.contact.budget}
                </label>
                <input id="budjet" name="budjet" className={field} placeholder={t.contact.budgetPlaceholder} />
              </div>
              <div>
                <label htmlFor="muddat" className="mb-2 block text-sm font-semibold">
                  {t.contact.deadline}
                </label>
                <input id="muddat" name="muddat" className={field} placeholder={t.contact.deadlinePlaceholder} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[0_14px_40px_-16px_var(--primary)] transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? "Yuborilmoqda..." : t.contact.submit}
            </button>

            {sent && (
              <p aria-live="polite" className="mt-4 text-center text-sm font-semibold text-emerald-400">
                {t.contact.sent}
              </p>
            )}

            {error && (
              <p aria-live="polite" className="mt-4 text-center text-sm font-semibold text-rose-400">
                Xatolik yuz berdi. Iltimos Telegram orqali bog'laning.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={120}>
          <div className="surface-card flex h-full flex-col gap-6 rounded-3xl p-8">
            <img
              src={logo.url}
              alt="FARKHADIVICH AI"
              className="h-16 w-16 rounded-xl object-cover"
              width={64}
              height={64}
              loading="lazy"
            />
            <div>
              <h3 className="text-lg font-bold">{t.contact.directTitle}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.contact.directText}
              </p>
            </div>
            <div className="chrome-rule" />
            <div className="flex flex-col gap-3">
              <TelegramCta label={t.common.telegramCta} />
            </div>
            <div className="mt-auto border-t border-border/60 pt-6">
              <p className="text-xs text-muted-foreground">{t.contact.notReady}</p>
              <a
                href="#xizmatlar"
                className="mt-2 inline-flex text-sm font-bold text-primary hover:underline"
              >
                {t.contact.seeServices} →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
