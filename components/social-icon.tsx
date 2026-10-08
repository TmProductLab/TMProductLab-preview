export type SocialName = "LinkedIn" | "Instagram" | "WhatsApp" | "Facebook" | "YouTube" | "TikTok" | "X";

export function SocialIcon({ name }: { name: SocialName }) {
  if (name === "Facebook") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4A23 23 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z" /></svg>;
  }
  if (name === "YouTube") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" /><path d="m10 9 6 3-6 3z" fill="var(--ink)" /></svg>;
  }
  if (name === "TikTok") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2h3c.3 2.3 1.8 4.1 4 4.5V10a9 9 0 0 1-4-1.5V16a6 6 0 1 1-6-6v3.4a2.6 2.6 0 1 0 3 2.6z" /></svg>;
  }
  if (name === "X") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23 22h-6.6l-5.2-6.8L5.2 22H2l7.7-8.9L1 2h6.7l4.8 6.3L18.9 2ZM17.5 20h1.7L6.5 4H4.7z" /></svg>;
  }
  if (name === "LinkedIn") {
    return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5.2 8.2H2V22h3.2V8.2ZM3.6 2A1.9 1.9 0 1 0 3.6 5.8 1.9 1.9 0 0 0 3.6 2ZM22 13.7c0-4.2-2.2-6.1-5.2-6.1-2.4 0-3.5 1.3-4.1 2.2V8.2H9.5V22h3.2v-6.8c0-1.8.3-3.6 2.6-3.6 2.2 0 2.3 2.1 2.3 3.7V22H22v-8.3Z" fill="currentColor" /></svg>;
  }
  if (name === "Instagram") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z" /><path d="M8.1 7.7c.3-.7.7-.7 1-.7h.5c.2 0 .4.1.5.4l.8 2c.1.3.1.5-.1.7l-.6.8c-.2.2-.1.5 0 .7.5 1 1.4 1.9 2.4 2.5.3.2.5.2.7 0l.9-1.1c.2-.2.4-.3.7-.2l1.9.9c.3.1.5.3.5.5 0 .3-.1 1.5-.8 2.1-.6.6-1.5.9-2.5.7-1.1-.2-2.6-.8-4.4-2.4-1.5-1.3-2.6-3-2.9-4.3-.3-1.2.2-2.2.5-2.6Z" /></svg>;
}


