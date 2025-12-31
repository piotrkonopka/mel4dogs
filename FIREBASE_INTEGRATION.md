# Firebase Functions Integration Guide

## Overview

The contact form is built to work both as a static site (development) and with Firebase Cloud Functions (production). This guide explains how to set up the backend integration.

---

## Current State (Static Mode)

**No backend required for development:**

- Form submissions are logged to console
- All validation happens client-side
- UX is graceful with success/error states
- No external dependencies

**To test:**

```bash
npm run dev
# Fill out form at http://localhost:3000/#contact
# Check browser console for submitted data
```

---

## Firebase Functions Setup

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Initialize Firebase in Your Project

```bash
# From project root
firebase init functions

# Select:
# - Use existing project or create new
# - Choose TypeScript
# - Use ESLint: Yes
# - Install dependencies: Yes
```

This creates a `/functions` directory with:

```
functions/
├── src/
│   └── index.ts
├── package.json
└── tsconfig.json
```

### 3. Create Contact Form Handler

**File:** `functions/src/index.ts`

```typescript
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password,
  },
});

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  dogName?: string;
  dogAge?: string;
  dogBreed?: string;
  service: string;
  message: string;
  timestamp: string;
  source: string;
}

/**
 * Cloud Function: Handle contact form submissions
 *
 * Features:
 * - CORS enabled for your domain
 * - Email notification to business
 * - Store in Firestore for CRM
 * - Send confirmation email to user
 */
export const submitContactForm = functions
  .region("europe-west1") // Choose region closest to users (Poland)
  .https.onRequest(async (req, res) => {
    // CORS headers
    res.set("Access-Control-Allow-Origin", "https://mellidogs.pl");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    // Only accept POST
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const data: ContactFormData = req.body;

      // Validate required fields
      if (
        !data.name ||
        !data.email ||
        !data.phone ||
        !data.service ||
        !data.message
      ) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      // Generate unique ID
      const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Store in Firestore
      await admin
        .firestore()
        .collection("contact_submissions")
        .doc(submissionId)
        .set({
          ...data,
          submissionId,
          status: "new",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      // Send notification email to business
      const businessEmail = {
        from: functions.config().email.user,
        to: "kontakt@mellidogs.pl", // Your business email
        subject: `🐕 Nowe zapytanie: ${data.service}`,
        html: `
          <h2>Nowe zapytanie z formularza kontaktowego</h2>
          
          <h3>Dane kontaktowe:</h3>
          <ul>
            <li><strong>Imię i nazwisko:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Telefon:</strong> ${data.phone}</li>
          </ul>

          ${
            data.dogName
              ? `
          <h3>Informacje o psie:</h3>
          <ul>
            <li><strong>Imię psa:</strong> ${data.dogName}</li>
            ${data.dogAge ? `<li><strong>Wiek:</strong> ${data.dogAge}</li>` : ""}
            ${data.dogBreed ? `<li><strong>Rasa:</strong> ${data.dogBreed}</li>` : ""}
          </ul>
          `
              : ""
          }

          <h3>Usługa:</h3>
          <p>${data.service}</p>

          <h3>Wiadomość:</h3>
          <p>${data.message.replace(/\n/g, "<br>")}</p>

          <hr>
          <p><small>ID zgłoszenia: ${submissionId}</small></p>
          <p><small>Data: ${new Date(data.timestamp).toLocaleString("pl-PL")}</small></p>
        `,
      };

      await transporter.sendMail(businessEmail);

      // Send confirmation email to user
      const userEmail = {
        from: functions.config().email.user,
        to: data.email,
        subject: "Dziękujemy za kontakt - MELLI dogs",
        html: `
          <h2>Dziękujemy za kontakt!</h2>
          
          <p>Cześć ${data.name.split(" ")[0]},</p>
          
          <p>Otrzymaliśmy Twoją wiadomość dotyczącą usługi: <strong>${data.service}</strong>.</p>
          
          <p>Skontaktujemy się z Tobą w ciągu 24 godzin na podany numer telefonu: <strong>${data.phone}</strong>.</p>
          
          ${data.dogName ? `<p>Cieszymy się, że możemy pomóc Tobie i ${data.dogName}! 🐕</p>` : ""}
          
          <p>Pozdrawiamy,<br>
          Zespół MELLI dogs</p>
          
          <hr>
          <p><small>ul. Świeradowska 47, 50-559 Wrocław</small></p>
          <p><small>Tel: 123-456-789 | kontakt@mellidogs.pl</small></p>
        `,
      };

      await transporter.sendMail(userEmail);

      // Success response
      res.status(200).json({
        success: true,
        message: "Dziękujemy za kontakt! Odpowiemy wkrótce.",
        submissionId,
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({
        success: false,
        error: "Wystąpił błąd podczas przetwarzania formularza",
      });
    }
  });
```

### 4. Install Dependencies

```bash
cd functions
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### 5. Configure Email Credentials

```bash
# Set email configuration
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.password="your-app-password"

# For Gmail, create App Password:
# https://myaccount.google.com/apppasswords
```

### 6. Deploy Function

```bash
firebase deploy --only functions
```

This will output your function URL:

```
✔  functions[submitContactForm(europe-west1)]: Successful create operation.
Function URL: https://europe-west1-your-project.cloudfunctions.net/submitContactForm
```

### 7. Configure Next.js Environment

**File:** `.env.local`

```bash
# Firebase Function URL for contact form
NEXT_PUBLIC_FIREBASE_FUNCTION_URL=https://europe-west1-your-project.cloudfunctions.net/submitContactForm
```

**File:** `.env.production`

```bash
NEXT_PUBLIC_FIREBASE_FUNCTION_URL=https://europe-west1-your-project.cloudfunctions.net/submitContactForm
```

### 8. Test Integration

```bash
# Build and test production
npm run build
npm start

# Fill out form at http://localhost:3000/#contact
# Should now submit to Firebase and send emails
```

---

## Alternative: Firebase Firestore Direct Write

For simpler setup without email, write directly to Firestore:

**File:** `functions/src/index.ts`

```typescript
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const submitContactForm = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");

    if (req.method !== "POST") {
      res.status(405).send("Method not allowed");
      return;
    }

    try {
      const data = req.body;

      await admin
        .firestore()
        .collection("contacts")
        .add({
          ...data,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          status: "new",
        });

      res.json({ success: true, message: "Formularz wysłany pomyślnie" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });
```

Then access submissions in Firebase Console > Firestore > contacts collection.

---

## Security Rules

**Firestore Security Rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contact submissions - write only via Cloud Function
    match /contact_submissions/{submissionId} {
      allow read: if request.auth != null; // Only authenticated users (admin)
      allow write: if false; // Only via Cloud Function
    }
  }
}
```

---

## Monitoring

### Firebase Console

1. Go to Firebase Console > Functions
2. View logs for each invocation
3. Monitor errors and execution times

### Custom Logging

Add to function:

```typescript
functions.logger.info("Contact form submitted", {
  submissionId,
  service: data.service,
  timestamp: data.timestamp,
});
```

View logs:

```bash
firebase functions:log
```

---

## Cost Estimation

**Firebase Free Tier:**

- 2M invocations/month
- 400,000 GB-seconds compute time
- 200,000 GB-seconds memory time

**Expected costs for small business:**

- ~100 form submissions/month = **$0** (well within free tier)
- Email sending via Gmail = **$0**

**If exceeding free tier:**

- $0.40 per million invocations
- ~$0.0001 per submission

---

## Alternative Backends

### Option 1: Vercel Edge Functions

**File:** `app/api/contact/route.ts`

```typescript
import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/utils/formValidation";

export async function POST(request: Request) {
  const data = await request.json();

  // Validate
  const errors = validateContactForm(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // Store in Vercel KV or send email
  // Implementation depends on your setup

  return NextResponse.json({
    success: true,
    message: "Form submitted successfully",
  });
}
```

### Option 2: Netlify Functions

**File:** `netlify/functions/contact.ts`

```typescript
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const data = JSON.parse(event.body || "{}");

  // Process submission

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
```

---

## Troubleshooting

### Form not submitting

1. Check browser console for errors
2. Verify NEXT_PUBLIC_FIREBASE_FUNCTION_URL is set
3. Check CORS headers in Firebase Function
4. View Firebase Function logs: `firebase functions:log`

### CORS errors

Update function to allow your domain:

```typescript
res.set("Access-Control-Allow-Origin", "https://yourdomain.com");
```

For development, temporarily allow all:

```typescript
res.set("Access-Control-Allow-Origin", "*");
```

### Email not sending

1. Verify Gmail App Password is correct
2. Check Firebase logs for email errors
3. Test email credentials locally first
4. Consider using SendGrid or AWS SES for production

---

## Production Checklist

- [ ] Firebase Function deployed
- [ ] Email credentials configured
- [ ] CORS headers set for production domain
- [ ] Environment variable set in Vercel/hosting
- [ ] Test form submission end-to-end
- [ ] Verify email delivery
- [ ] Check Firestore data structure
- [ ] Set up monitoring/alerts
- [ ] Review Firebase security rules
- [ ] Test error handling

---

## Support

For issues or questions:

- Firebase Docs: https://firebase.google.com/docs/functions
- Next.js Docs: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- This project's issues: [GitHub Issues]
