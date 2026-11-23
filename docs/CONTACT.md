# Contact form configuration

`/contact.html` is intended for parents, guardians, and other adults. The form uses browser validation, a blank-field check, a spam honeypot named `_gotcha`, and Formspree's provider validation and filtering once the provider is configured. The adult-only note asks visitors to leave out children's identifying information. The page links to the existing public email address as a fallback.

## Test without an account

Run `npm ci` and `npm run dev`, then open `/contact.html`. Development defaults to mock mode. Ordinary builds default to email-only mode unless configured. `npm run build:staging` always uses mock mode, even when live environment values are present. Use the test result selector to exercise both paths. Use fictional details. Mock mode makes no submission request and explicitly says no email was sent.

## Set up Formspree from your phone

1. Open [Formspree](https://formspree.io/) in your phone browser, create or sign in to an account, and verify the account email. Switch your browser to desktop-site mode if dashboard controls are hidden.
2. Open the account's linked email settings and add your approved team distribution address. Ask its owner to allow external mail from Formspree and open the verification message sent to the address. Keep the distribution address in the provider settings.
3. In **Forms**, tap **+ → New Form**, name it **Secret Garden TV Contact**, and select the verified team address as the target email. In the form's **Workflow → Actions**, confirm the Email action uses that address. Configure it via **+ Add New → Email** if needed. Keep the visitor's `email` field as reply-to.
4. In **Workflow → Validation**, add the following fields by exact name and turn on **Required** for each. Use the listed maximum lengths where the dashboard offers them. Leave work-email-only validation off.

   | Field | Type | Maximum length |
   |---|---|---|
   | `name` | Text | 100 |
   | `email` | Email | 254 |
   | `category` | Text | 40 |
   | `subject` | Text | 150 |
   | `message` | Text | 3000 |

5. Keep Formspree's spam filtering enabled. The form already supplies the provider's `_gotcha` honeypot. If the account offers **Restrict to Domain**, set it to the approved host for that endpoint. Use a separate endpoint and approved test inbox for any real-send preview.
6. Copy the form URL shown under **Integration**, which looks like `https://formspree.io/f/YOUR_FORM_ID`. For an approved live build, configure these values in the building environment or a local `.env.local` based on `.env.example`.

   ```dotenv
   PUBLIC_CONTACT_MODE=formspree
   PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   ```

   These are public build settings. The endpoint is a form ID. Email credentials, recipient settings, and private keys stay in the provider or mail system. Build with `npm run build`. The staging artifact uses the mock by design.
7. Once you have an approved test endpoint and inbox, verify an adult sample submission arrives at the distribution address. Also test a missing field and invalid email directly against that test endpoint to confirm server-side rejection. A success message means the provider accepted the submission. Verify actual mail delivery separately.

The free plan currently starts at 50 monthly submissions. Refer to [account limits](https://help.formspree.io/articles/account-management/account-limits/), [form setup](https://help.formspree.io/articles/building-your-form/building-an-html-form), [recipient settings](https://help.formspree.io/articles/form-and-project-settings/changing-a-form-email-address), and [workflow validation](https://help.formspree.io/articles/building-your-form/getting-started-with-workflow).
