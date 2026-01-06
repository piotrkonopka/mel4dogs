# 🔄 Web3Forms Integration - Quick Reference

**Status:** ✅ Ready (wymaga Access Key)  
**Version:** 1.0.0  
**Date:** 6 stycznia 2026

---

## 🚀 Quick Start (5 minut)

### 1. Uzyskaj Access Key

```
→ https://web3forms.com/#start
→ Email: martyna@mel4dogs.pl
→ Skopiuj klucz z emaila
```

### 2. Dodaj do config

```typescript
// /lib/config/web3forms.ts (linia 20)
export const WEB3FORMS_ACCESS_KEY = "twój_klucz_tutaj";
```

### 3. Test & Deploy

```bash
npm run dev              # Test: http://localhost:3000/#contact
npm run build            # Production build
firebase deploy          # Deploy
```

**Gotowe! 🎉**

---

## 📁 Struktura

```
/lib/config/web3forms.ts          # ⚙️ Konfiguracja
/lib/utils/formSubmission.ts      # 📤 Submit logic
/components/sections/ContactForm.tsx # 🎨 UI
/content/contact.ts               # 📝 Texty
```

---

## 🔧 Config Options

```typescript
// /lib/config/web3forms.ts
export const WEB3FORMS_CONFIG = {
  defaultSubject: "Nowe zapytanie z MEL4dogs", // 📧 Tytuł emaila
  redirectUrl: null, // 🔀 Redirect po submit (null = AJAX)
  fromName: "Formularz MEL4dogs", // 👤 Nadawca
  useHoneypot: true, // 🛡️ Spam protection
  timeout: 10000, // ⏱️ Request timeout (ms)
};
```

---

## 🎯 Features

✅ **Async AJAX submission** - bez reload strony  
✅ **Honeypot spam protection** - chroni przed botami  
✅ **Comprehensive error handling** - network, timeout, API  
✅ **Loading states** - visual feedback  
✅ **Success/error messages** - Polish language  
✅ **GDPR compliant** - Web3Forms jest GDPR compliant  
✅ **TypeScript strict** - zero `any`  
✅ **Accessible** - ARIA labels, screen readers  
✅ **Mobile-friendly** - responsive design  
✅ **Clean architecture** - SOLID, DRY, KISS

---

## 📊 Free Tier

- ✅ 250 submissions/miesiąc
- ✅ Unlimited forms & domains
- ✅ 30-day archive
- ✅ Email notifications
- ✅ Spam filtering
- ✅ Export to CSV

**Wystarczy na lata dla małej firmy!**

---

## 🐛 Troubleshooting

| Problem              | Fix                      |
| -------------------- | ------------------------ |
| "Invalid access key" | Sprawdź klucz w config   |
| "Network error"      | Sprawdź internet         |
| "Timeout"            | Zwiększ timeout w config |
| Nie dostaję emaili   | Sprawdź SPAM folder      |

---

## 📚 Dokumentacja

- **Setup Guide:** [WEB3FORMS_SETUP.md](./WEB3FORMS_SETUP.md)
- **Change Log:** [WEB3FORMS_REFACTORING.md](./WEB3FORMS_REFACTORING.md)
- **Web3Forms Docs:** https://docs.web3forms.com/

---

## ✨ Next Steps (Optional)

1. **Privacy Policy** - dodaj stronę `/app/privacy-policy/page.tsx`
2. **hCaptcha** - jeśli za dużo spamu
3. **Upgrade to Pro** - autoresponders, file uploads (659 zł/rok)

---

**Pytania?** Sprawdź [WEB3FORMS_SETUP.md](./WEB3FORMS_SETUP.md) dla szczegółów.
