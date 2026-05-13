# Vercel-Deployment

1. Repository auf GitHub pushen (z. B. `Yildiz1408/website`).
2. In [Vercel](https://vercel.com) einloggen: **Add New → Project** → GitHub-Repo importieren.
3. Framework: **Next.js** (Standard), Root-Verzeichnis: `.`
4. Unter **Settings → Environment Variables** eintragen und **Redeploy**:
   - **`RESEND_API_KEY`** — aus dem [Resend](https://resend.com)-Dashboard (erforderlich).
   - **`CONTACT_FROM`** — eine bei Resend **verifizierte** Absender-Adresse, z. B. `Kontakt <mail@deine-domain.de>` (erforderlich; `@t-online.de` geht bei Resend in der Regel nicht als Absender-Domain).
   - **`CONTACT_TO`** — optional; wenn nicht gesetzt, gehen die Anfragen an **sel.yil@t-online.de** (Festwert in der App).
5. Optional: **Settings → Domains** für die eigene Domain.

Resend: Domain/DNS verifizieren, damit `CONTACT_FROM` zuverlässig funktioniert. Antworten auf Besucher: im Versand ist `replyTo` die E-Mail aus dem Formular.
