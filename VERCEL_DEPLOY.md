# Vercel-Deployment

1. Repository auf GitHub pushen (z. B. `Yildiz1408/website`).
2. In [Vercel](https://vercel.com) einloggen: **Add New → Project** → GitHub-Repo importieren.
3. Framework: **Next.js** (Standard), Root-Verzeichnis: `.`
4. **Kontaktformular:** Auf [web3forms.com](https://web3forms.com) kostenlos ein Formular anlegen, als Ziel-E-Mail z. B. **sel.yil@t-online.de** eintragen, den **Access Key** kopieren. In Vercel unter **Settings → Environment Variables** `WEB3FORMS_ACCESS_KEY` einfügen und **Redeploy**.
5. Optional: **Settings → Domains** für die eigene Domain.

Es wird kein Resend und keine eigene Mail-Domain benötigt — nur der eine Key; Zieladresse steuerst du im Web3Forms-Dashboard.
