# 💬 Daily Dev Quotes

A very serious production-grade system  
that displays a **funny developer quote once per day**.

- Is it necessary?  
- Absolutely not.  
- Is it fun?  
- Yes. Painfully so.

---

## 🤡 What is this?

This project generates a **daily developer quote as an image**,  
designed specifically for GitHub profile READMEs.

- The quote changes every day.  
- The emoji also changes.  
- Your confidence in your own code will not.

---

## ✨ Features (aka “reasons this exists”)

- 🗓️ A **new quote every day** (time is an illusion, but days are not)
- 👤 **User-based logic** — same user = same quote for that day
- 😄 A daily emoji because why not
- ⚡ Runs on Edge, because latency is the real enemy
- 🔁 No setup, no auth, no responsibility

---

## 🚀 Usage (copy, paste, pretend you understand it)

Add this to your GitHub profile README:

```md
![Daily Dev Quote](https://dailydevquotes.vercel.app/api/quote?user=YOUR_USERNAME)

Example:

![Daily Dev Quote](https://dailydevquotes.vercel.app/api/quote?user=reketino)

Congratulations.
You now have dynamic content and zero additional job security.

## 🎨 Themes

Images don’t respect GitHub dark/light mode (because of course they don’t),
so themes are controlled via a query parameter.

🌙 Dark (default)
![Daily Dev Quote](https://dailydevquotes.vercel.app/api/quote?user=YOUR_USERNAME&theme=dark)

☀️ Light
![Daily Dev Quote](https://dailydevquotes.vercel.app/api/quote?user=YOUR_USERNAME&theme=light)

🌌 Tokyo Night
![Daily Dev Quote](https://dailydevquotes.vercel.app/api/quote?user=YOUR_USERNAME&theme=tokyonight)


Aliases also work:

- theme=tokyo

- theme=tokyo-night

- Use whatever matches your GitHub profile and emotional state.

## 🧠 How it works (uncomfortably honest)
- A list of questionable quotes lives in a public GitHub repo

- We hash your username together with the current day

- Math happens

- A quote is selected

- An image is generated

- Nobody knows why it works, but it does

## 📦 Tech Stack (buzzwords included)

- Next.js (App Router)

- @vercel/og

- Edge Runtime

- Vercel

- Several poor decisions made with confidence

## 🤝 Contributing quotes

Quotes live here:

👉 https://github.com/Reketino/dev-quotes

PRs are welcome as long as:

- the quote is developer-related

- it hurts a little

- it’s not a LinkedIn hustle quote

- it doesn’t try to sell crypto

## Working on:

- Adding Reusable styles in ogStyles

## 🐻 Author
- Built by @Reketino
- Star it. Use it. Or don’t.
- I’ll still pretend this was built for fun and not validation.
