# Third-party integration audit

The redesign uses the existing MailerLite account and popup, GA4 measurement ID, YouTube channel and videos, social profiles, Zeffy checkout URL, and public contact email. No account settings were changed.

| Integration | Preserved behavior | Change or verification |
|---|---|---|
| MailerLite | Existing account and popup `Pcso7D`. The provider owns email submission, validation, consent, and success messaging | The SDK loads only when an adult requests signup. A pending message, retry on load failure, privacy link, and contact fallback are available. The site never claims a subscription succeeded. Staging has no live signup button |
| Google Analytics | Existing GA4 ID, with Google Signals and ad personalization flags set to false | Shared head emits one loader and one configuration per tracked HTML page. Build checks detect duplicates, including explicit page-view events. The staging post-build removes the tag |
| YouTube and video | Existing program URLs, channel, timestamps, and Tree Blooming video | Episode previews use privacy-enhanced embeds only after user interaction, with direct watch links. The homepage video has no autoplay and uses `preload="none"` |
| Social | Existing YouTube, Instagram, TikTok, Facebook, and X links | Footer links navigate in the same tab. The episode dialog opens its external watch link in a protected new tab |
| Zeffy and contact | Existing Zeffy checkout route and public mail link | Donation handoff sends only the chosen amount. The Contact page retains email fallback and staging mock mode. A live Formspree endpoint and team routing remain unconfigured |
| Referrers | Same-origin navigation behavior | Cross-origin links and providers receive at most the origin, via `strict-origin-when-cross-origin` |

## Manual verification before release

- **MailerLite:** On the authorized hostname, check the popup on phone and desktop. Verify the existing form's visibility, group, consent copy, and single or double opt-in configuration in MailerLite. Use one approved tester address for a live signup, confirm the provider's success state and any confirmation email, then verify the subscriber appears once in the expected group. See [MailerLite troubleshooting](https://www.mailerlite.com/help/how-to-troubleshoot-a-form-or-a-confirmation-email-not-delivered).
- **Google Analytics:** Verify one normal page view per navigation in [DebugView](https://support.google.com/analytics/answer/7201382?hl=en) or Tag Assistant on an authorized host. Check inherited tags, property settings, applicable consent requirements, and child-directed privacy settings. The staging build intentionally emits no GA tag.
- **YouTube:** Verify playback on the final hostname and confirm the child-directed site designation. Privacy-enhanced embedding still requires that designation for child-directed sites. See [YouTube embed guidance](https://support.google.com/youtube/answer/171780?hl=en).
- **Social profiles:** Open each profile from a phone. A login wall or automated request denial does not establish whether the destination works for a signed-in user.
- **Zeffy and contact:** Confirm amount prefill and the correct form at checkout without completing a payment. Follow [the contact setup guide](CONTACT.md) to verify live Formspree validation and authorized delivery to the team address. Keep testing and production endpoints separate.

## Verification recorded

- On 2026-11-22, the public MailerLite SDK, Zeffy form, YouTube channel, Instagram, TikTok, and Facebook URLs returned successful HTTP responses. Facebook resolved to the existing profile. X denied the automated request with HTTP 403.
- Chromium checks at 320, 768, and 1440px confirmed one GA loader and no MailerLite or YouTube request on initial home load. Simulated provider responses covered newsletter failure, retry and popup handoff, YouTube dialog cleanup, and Zeffy amount handoff. No subscriber, messages, analytics events, or payments were submitted.
