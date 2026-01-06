# Web3Forms Setup Guide

## MEL4dogs - Integracja formularza kontaktowego

---

## 🎯 Co zostało zrobione?

Formularz kontaktowy został przepisany z `mailto:` na **Web3Forms** - profesjonalną usługę do obsługi formularzy dla stron statycznych.

### Główne zmiany:

1. ✅ **Web3Forms API Integration** - prawdziwy backend dla formularzy
2. ✅ **AJAX-style submission** - wysyłka bez przeładowania strony
3. ✅ **Honeypot spam protection** - ochrona przed botami
4. ✅ **Professional error handling** - szczegółowa obsługa błędów
5. ✅ **Loading states** - wizualne feedbacki dla użytkownika
6. ✅ **Clean architecture** - separacja logiki, konfiguracji i UI
7. ✅ **TypeScript strict mode** - pełna typizacja
8. ✅ **GDPR compliant** - zgodność z RODO (Web3Forms jest GDPR compliant)

---

## 📁 Zmodyfikowane pliki:

### Nowe pliki:

- `/lib/config/web3forms.ts` - Konfiguracja Web3Forms (API endpoint, access key, settings)

### Zmodyfikowane pliki:

- `/lib/utils/formSubmission.ts` - Nowa funkcja `submitContactForm()` używająca fetch API
- `/components/sections/ContactForm.tsx` - Dodany honeypot field, zaktualizowane komentarze
- `/content/contact.ts` - Ulepszone komunikaty success/error

### Pliki bez zmian (już dobrze napisane):

- `/lib/hooks/useContactForm.ts` - Już używał async/await, nie wymaga zmian
- `/lib/utils/formValidation.ts` - Walidacja działa tak samo

---

## 🚀 Jak uruchomić? (WAŻNE!)

### Krok 1: Uzyskaj Access Key

1. Wejdź na https://web3forms.com/#start
2. Podaj email `martyna@mel4dogs.pl`
3. Otrzymasz **Access Key** na email
4. Skopiuj ten klucz

### Krok 2: Dodaj Access Key do konfiguracji

Otwórz plik: `/lib/config/web3forms.ts`

```typescript
export const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";
```

**Zamień `YOUR_ACCESS_KEY_HERE` na faktyczny klucz z emaila!**

### Krok 3: Test lokalny

```bash
npm run dev
```

Otwórz http://localhost:3000/#contact i przetestuj formularz.

### Krok 4: Deploy

```bash
npm run build
firebase deploy --only hosting
```

---

## 🔧 Konfiguracja (opcjonalna)

Plik: `/lib/config/web3forms.ts`

```typescript
export const WEB3FORMS_CONFIG = {
  // Domyślny tytuł emaila
  defaultSubject: "Nowe zapytanie z MEL4dogs",

  // Redirect po sukcesie (null = AJAX bez redirect)
  redirectUrl: null,

  // Nazwa nadawcy
  fromName: "Formularz MEL4dogs",

  // Honeypot (zalecane: true)
  useHoneypot: true,

  // Timeout dla requestów (ms)
  timeout: 10000,
};
```

### Co możesz zmienić:

1. **`defaultSubject`** - tytuł emaili które dostajesz
2. **`fromName`** - nazwa wyświetlana w emailu jako nadawca
3. **`redirectUrl`** - jeśli chcesz redirect po wysłaniu (np. `/success`)
4. **`timeout`** - limit czasu dla requestu (domyślnie 10s)

---

## 📧 Jak działają submissiony?

### Flow:

1. User wypełnia formularz
2. Klik "Wyślij" → walidacja client-side
3. Jeśli OK → POST request do Web3Forms API
4. Web3Forms wysyła email na `martyna@mel4dogs.pl`
5. User widzi success message
6. Ty dostajesz email z danymi formularza

### Format emaila który dostaniesz:

```
Od: Formularz MEL4dogs <noreply@web3forms.com>
Reply-To: email_usera@example.com
Temat: Nowe zapytanie z MEL4dogs - Konsultacje behawioralne

name: Jan Kowalski
email: jan@example.com
phone: +48 123 456 789
service: Konsultacje behawioralne
message: Mój pies ma problem z...

dog_name: Burek
dog_age: 3 lata
dog_weight: 15 kg
```

### Możesz odpowiedzieć bezpośrednio na email (Reply-To ustawione na email klienta)

---

## 🛡️ Spam Protection

### Honeypot (włączone):

```tsx
<input
  type="checkbox"
  name="botcheck"
  className="hidden"
  style={{ display: "none" }}
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
/>
```

- Niewidoczne dla ludzi
- Boty je zaznaczają automatycznie
- Web3Forms odrzuca submissiony z zaznaczonym polem

### Server-side spam check (automatyczne):

Web3Forms automatycznie filtruje spam na serwerze. **Nie musisz nic robić.**

### Opcjonalnie: hCaptcha (Free tier Web3Forms):

Jeśli będziesz dostawać za dużo spamu:

1. Dodaj hCaptcha widget do formularza
2. Zobacz: https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha

---

## 📊 Monitoring

### Dashboard Web3Forms:

1. Wejdź na https://web3forms.com/
2. Login za pomocą `martyna@mel4dogs.pl`
3. Dashboard pokazuje:
   - Liczba submissions (limit: 250/miesiąc free)
   - Historia ostatnich 30 dni
   - Export do CSV
   - Stats

---

## 🐛 Troubleshooting

### "Access key is invalid"

**Problem:** Access key nieprawidłowy  
**Fix:** Sprawdź czy skopiowałeś poprawny klucz z emaila

### "Network error"

**Problem:** Brak połączenia z API  
**Fix:**

- Sprawdź internet connection
- Sprawdź czy API endpoint jest poprawny: `https://api.web3forms.com/submit`

### "Timeout error"

**Problem:** Request trwa za długo  
**Fix:**

- Zwiększ timeout w config
- Sprawdź internet connection

### Nie dostaję emaili

**Checklist:**

1. Access key dodany?
2. Email `martyna@mel4dogs.pl` jest poprawny?
3. Sprawdź SPAM folder
4. Sprawdź dashboard Web3Forms czy submission się udało

---

## 🎨 Customization

### Zmiana stylu success message:

Plik: `/components/sections/ContactForm.tsx`, linia ~150

```tsx
{
  formState === "success" && (
    <div className="mt-6 rounded-lg border-2 border-green-500 bg-green-50 p-4">
      {/* Success UI */}
    </div>
  );
}
```

### Zmiana tekstów:

Plik: `/content/contact.ts`

```typescript
successMessage: {
  title: "Wiadomość wysłana!",
  description: "Twój custom tekst tutaj..."
}
```

### Dodanie nowych pól do formularza:

1. Dodaj pole do UI w `ContactForm.tsx`
2. Dodaj do `ContactFormData` interface w `formSubmission.ts`
3. Dodaj `formData.append()` w funkcji `submitContactForm()`
4. Dane pojawią się w emailu automatycznie

---

## 💰 Free Tier Limits

**Web3Forms Free Plan:**

- ✅ 250 submissions/miesiąc
- ✅ Unlimited forms & domains
- ✅ 30-day archive
- ✅ Email notifications
- ✅ Spam filtering
- ✅ Export to CSV
- ❌ No file uploads (tylko Pro)
- ❌ No autoresponders (tylko Pro)

### Co jeśli przekroczysz 250 submissions/miesiąc?

Opcje:

1. **Upgrade do Starter** - 217 zł/rok (5k submissions/mo)
2. **Dodatkowe submissions** - billing za nadlimitowe

**Dla małej firmy 250/mo powinno wystarczyć przez długi czas.**

---

## 🔐 GDPR Compliance

### Web3Forms jest GDPR compliant:

- ✅ Dane szyfrowane (transit & rest)
- ✅ AWS servers (EU available)
- ✅ Możliwość usunięcia danych
- ✅ Privacy policy dokumentacja
- ✅ Nie sprzedają danych

### Co musisz zrobić:

**Dodać politykę prywatności na stronie:**

1. Stwórz stronę `/app/privacy-policy/page.tsx`
2. Dodaj info o Web3Forms w sekcji "Dane osobowe"
3. Linkuj z footera

**Przykład tekstu:**

> Formularz kontaktowy obsługiwany jest przez Web3Forms, który przetwarza Twoje dane w celu przesłania wiadomości. Dane są przechowywane przez 30 dni, a następnie automatycznie usuwane. Więcej: https://web3forms.com/privacy

---

## 📈 Następne kroki (opcjonalnie)

### Jeśli będziesz potrzebować więcej features:

1. **Autoresponders** (Pro - 659 zł/rok)
   - Automatyczne potwierdzenie dla klienta
   - Custom templates

2. **File uploads** (Pro)
   - Zdjęcia psa w formularzu
   - Dokumenty weterynaryjne

3. **Webhooks** (Pro)
   - Integracja z CRM
   - Google Sheets auto-sync

4. **Custom domains** (Premium)
   - Emails z Twojej domeny (@mel4dogs.pl)

---

## ✅ Checklist przed deploy:

- [ ] Access key dodany w `/lib/config/web3forms.ts`
- [ ] Test lokalny - formularz działa?
- [ ] Email otrzymany na `martyna@mel4dogs.pl`?
- [ ] Success message wyświetla się?
- [ ] Error handling działa? (wyłącz internet i spróbuj)
- [ ] Honeypot field jest hidden?
- [ ] Polityka prywatności zaktualizowana?
- [ ] `npm run lint:fix && npm run type-check && npm run build` przechodzi?

---

## 🆘 Support

**Web3Forms:**

- Docs: https://docs.web3forms.com/
- Support: https://web3forms.com/support
- Email: support@web3forms.com

**MEL4dogs:**

- GitHub Issues: (link do repo)
- Email: martyna@mel4dogs.pl

---

**Gotowe! 🎉**

Po dodaniu Access Key wszystko powinno działać od razu. Przetestuj formularz i ciesz się profesjonalną obsługą zgłoszeń!
