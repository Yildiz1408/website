# Vercel-Deployment

1. Repository auf GitHub pushen (`baris6161/-bersetzer`).
2. In [Vercel](https://vercel.com) einloggen: **Add New → Project** → GitHub-Repo importieren.
3. Framework: **Next.js** (Standard), Root-Verzeichnis: `.`
4. Unter **Settings → Environment Variables** die Variablen aus `.env.example` eintragen (mindestens `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`). Anschließend **Redeploy**.
5. Optional: **Settings → Domains** für die eigene Domain.

Resend: Absender-Domain verifizieren, damit `CONTACT_FROM` funktioniert.
