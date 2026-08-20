# TrackHub — GitHub Project Tracker

Dashboard project tracking terintegrasi GitHub: baca aktivitas GitHub user/repo, kelola task dengan progress %, kolaborasi tim, dan jadwalkan meeting dengan link Google Meet otomatis.

## Tech Stack (versi terbaru per Agustus 2026)

| Package | Versi |
|---|---|
| next | 16.3.1 |
| react / react-dom | 19.2.8 |
| next-auth (v5 beta) | 5.0.0-beta.32 |
| @auth/mongodb-adapter | 3.11.3 |
| mongodb | 7.5.0 |
| mongoose | 9.9.3 |
| @octokit/rest | 22.0.1 |
| @octokit/graphql | 9.0.4 |
| googleapis | 176.0.0 |
| resend | 6.20.0 |
| react-hook-form | 7.85.0 |
| zod | 4.4.3 |
| @hookform/resolvers | 5.9.1 |
| recharts | 3.10.1 |
| lucide-react | 1.33.0 |
| motion (dulu framer-motion) | 13.1.0 |
| tailwindcss | 4.3.3 |
| typescript | (tetap versi bawaan scaffold, tidak di-upgrade) |

## Struktur Folder

```
src/
├── app/
│   ├── (dashboard)/         # Route group berlayout sidebar
│   │   ├── dashboard/       # Halaman utama
│   │   ├── projects/[id]/   # Detail project (task board, progress)
│   │   ├── tasks/
│   │   ├── calendar/
│   │   ├── team/
│   │   ├── repositories/
│   │   ├── analytics/
│   │   └── settings/
│   └── api/
│       ├── auth/[...nextauth]/
│       ├── projects/
│       ├── tasks/
│       ├── meetings/
│       ├── github/
│       └── webhooks/github/  # Fase 2: auto-update progress dari PR/issue
├── components/
│   ├── ui/                  # Button, Card, Avatar, Badge
│   ├── layout/               # Sidebar
│   └── dashboard/            # StatCard, dsb
├── lib/
│   ├── auth.ts               # Konfigurasi NextAuth
│   ├── mongodb.ts            # Client untuk NextAuth adapter
│   ├── mongoose.ts           # Koneksi Mongoose untuk model app
│   ├── github.ts             # Helper Octokit
│   └── googleCalendar.ts     # Helper create meeting + Google Meet link
└── models/
    ├── Project.ts
    ├── Task.ts
    └── Meeting.ts
```

## Setup

1. **Extract zip lalu install dependency:**
   ```bash
   npm install
   ```

2. **Salin environment variable:**
   ```bash
   cp .env.example .env.local
   ```

3. **Isi kredensial di `.env.local`:**

   - **GitHub OAuth App** → buat di https://github.com/settings/developers
     - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - **Google OAuth Client** → buat di https://console.cloud.google.com
     - Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
     - Aktifkan **Google Calendar API**
     - Scope yang dipakai: `calendar.events` (untuk auto-generate Google Meet)
   - **MONGODB_URI** → connection string dari MongoDB Atlas
   - **AUTH_SECRET** → generate dengan `npx auth secret`

4. **Jalankan development server:**
   ```bash
   npm run dev
   ```

   Buka http://localhost:3000

## Catatan Penting

- **`motion`** adalah nama baru dari package `framer-motion` (sama, tetap dimaintain), import-nya jadi `import { motion } from "motion/react"`.
- Karena meeting dibuat via **token Google milik user**, pastikan OAuth request menyertakan `access_type=offline` dan `prompt=consent` (sudah diset di `lib/auth.ts`) supaya `refresh_token` didapat sejak login pertama.
- User yang login **hanya via GitHub** (tanpa connect Google) tidak akan punya `refresh_token` Google, sehingga tidak bisa membuat meeting sendiri — perlu didesain alur "connect Google" tambahan di halaman Settings.
- Progress % task/project untuk MVP awal diisi **manual**; sinkronisasi otomatis dari GitHub (via webhook) direncanakan di fase 2.
- `next-auth@beta` (v5) dipakai karena support App Router secara native; versi stabil v4 belum punya API yang sama.

## Roadmap (sesuai rencana MVP)

1. ✅ Setup project, auth, struktur dasar
2. ⬜ CRUD Project & Task manual (dengan % progress)
3. ⬜ Dashboard lengkap (stat cards, team collaboration, progress chart, commit activity)
4. ⬜ Fitur jadwalkan meeting → auto-generate Google Meet link
5. ⬜ (Fase 2) GitHub Webhook untuk auto-update progress dari PR/issue
