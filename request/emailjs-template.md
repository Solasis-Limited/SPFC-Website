# EmailJS HTML templates for the request form

Use these in EmailJS for the form in `request/index.html`.

## 1. Team inbox template

Use this as the main template that is sent to your support team.

### Suggested subject

`{{app_name}} | {{request_type_label}} | {{subject}}`

### Suggested To email

`{{to_email}}`

### Suggested Reply-To

`{{reply_to}}`

### HTML body

```html
<div style="margin:0;padding:24px 0;background-color:#f7f1eb;font-family:Arial,Helvetica,sans-serif;color:#1f2933;">
  <div style="max-width:680px;margin:0 auto;background-color:#ffffff;border-radius:20px;overflow:hidden;">
    <div style="padding:32px 32px 20px;background:linear-gradient(135deg,#f5dfd0 0%,#f8efe7 100%);text-align:center;">
      <div style="display:block;margin:0 auto 16px;width:64px;height:64px;">
        <svg width="64" height="64" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="{{app_name}} logo">
          <rect width="512" height="512" rx="96" fill="url(#team-email-bg)" />
          <path
            d="M183 143C146 143 116 173 116 210C116 294 216 345 256 394C296 345 396 294 396 210C396 173 366 143 329 143C296 143 270 164 256 192C242 164 216 143 183 143Z"
            stroke="#C7A86D"
            stroke-width="18"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M184 243C213 221 237 221 256 243C275 265 299 265 328 243"
            stroke="#E8CFC7"
            stroke-width="12"
            stroke-linecap="round"
          />
          <circle cx="360" cy="132" r="14" fill="#C7A86D" />
          <defs>
            <linearGradient id="team-email-bg" x1="92" y1="76" x2="436" y2="452" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2C1F33" />
              <stop offset="0.5" stop-color="#6E3F5E" />
              <stop offset="1" stop-color="#9D5C63" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:#7c5a45;">
        New website request
      </p>
      <h1 style="margin:0;font-size:28px;line-height:1.2;color:#201a17;">
        {{request_type_label}}
      </h1>
    </div>

    <div style="padding:32px;">
      <p style="margin:0 0 16px;font-size:14px;color:#52606d;">
        A new request has been submitted through the {{app_name}} website form.
      </p>

      <div style="border:1px solid #eadfd6;border-radius:14px;overflow:hidden;">
        <div style="padding:14px 16px;border-bottom:1px solid #eadfd6;">
          <strong style="display:inline-block;min-width:140px;color:#7c5a45;">Submitted:</strong>
          <span>{{submitted_at}}</span>
        </div>
        <div style="padding:14px 16px;border-bottom:1px solid #eadfd6;">
          <strong style="display:inline-block;min-width:140px;color:#7c5a45;">Subject:</strong>
          <span>{{subject}}</span>
        </div>
        <div style="padding:14px 16px;border-bottom:1px solid #eadfd6;">
          <strong style="display:inline-block;min-width:140px;color:#7c5a45;">Name:</strong>
          <span>{{from_name}}</span>
        </div>
        <div style="padding:14px 16px;border-bottom:1px solid #eadfd6;">
          <strong style="display:inline-block;min-width:140px;color:#7c5a45;">Reply email:</strong>
          <a href="mailto:{{reply_to}}" style="color:#925f3d;text-decoration:none;">{{reply_to}}</a>
        </div>
        <div style="padding:14px 16px;border-bottom:1px solid #eadfd6;">
          <strong style="display:inline-block;min-width:140px;color:#7c5a45;">Account email:</strong>
          <span>{{account_email_or_reply_to}}</span>
        </div>
        <div style="padding:14px 16px;border-bottom:1px solid #eadfd6;">
          <strong style="display:inline-block;min-width:140px;color:#7c5a45;">Request confirmed:</strong>
          <span>{{confirm_request_text}}</span>
        </div>
        <div style="padding:14px 16px;">
          <strong style="display:inline-block;min-width:140px;color:#7c5a45;">Source page:</strong>
          <a href="{{page_url}}" style="color:#925f3d;text-decoration:none;">{{page_url}}</a>
        </div>
      </div>

      <div style="margin-top:24px;padding:24px;border-radius:16px;background-color:#f9f5f0;border:1px solid #eadfd6;">
        <p style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;color:#7c5a45;">
          Details
        </p>
        <p style="margin:0;font-size:15px;line-height:1.7;color:#1f2933;white-space:pre-line;">
          {{message}}
        </p>
      </div>
    </div>

    <div style="padding:20px 32px 32px;font-size:12px;line-height:1.6;color:#7b8794;text-align:center;">
      This message was sent from the {{app_name}} request form.
    </div>
  </div>
</div>
```

## 2. User auto-reply template

Use this as the EmailJS auto-reply template that is sent back to the user.

### Suggested subject

`We received your {{request_type_label | downcase}}`

If your EmailJS plan or editor does not support filters, use:

`We received your request`

### Suggested To email

`{{reply_to}}`

### HTML body

```html
<div style="margin:0;padding:24px 0;background-color:#f7f1eb;font-family:Arial,Helvetica,sans-serif;color:#1f2933;">
  <div style="max-width:680px;margin:0 auto;background-color:#ffffff;border-radius:20px;overflow:hidden;">
    <div style="padding:32px 32px 20px;background:linear-gradient(135deg,#f5dfd0 0%,#f8efe7 100%);text-align:center;">
      <div style="display:block;margin:0 auto 16px;width:64px;height:64px;">
        <svg width="64" height="64" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="{{app_name}} logo">
          <rect width="512" height="512" rx="96" fill="url(#reply-email-bg)" />
          <path
            d="M183 143C146 143 116 173 116 210C116 294 216 345 256 394C296 345 396 294 396 210C396 173 366 143 329 143C296 143 270 164 256 192C242 164 216 143 183 143Z"
            stroke="#C7A86D"
            stroke-width="18"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M184 243C213 221 237 221 256 243C275 265 299 265 328 243"
            stroke="#E8CFC7"
            stroke-width="12"
            stroke-linecap="round"
          />
          <circle cx="360" cy="132" r="14" fill="#C7A86D" />
          <defs>
            <linearGradient id="reply-email-bg" x1="92" y1="76" x2="436" y2="452" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2C1F33" />
              <stop offset="0.5" stop-color="#6E3F5E" />
              <stop offset="1" stop-color="#9D5C63" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:#7c5a45;">
        {{app_name}}
      </p>
      <h1 style="margin:0;font-size:28px;line-height:1.2;color:#201a17;">
        We received your request
      </h1>
    </div>

    <div style="padding:32px;">
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1f2933;">
        Hi {{from_name}},
      </p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#1f2933;">
        Thanks for contacting us. This email confirms that we received your {{request_type_label}} for {{app_name}}.
      </p>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#1f2933;">
        Our team will review your message and reply to <strong>{{reply_to}}</strong>. We aim to respond within 3-5 business days.
      </p>

      <div style="margin:0 0 24px;padding:24px;border-radius:16px;background-color:#f9f5f0;border:1px solid #eadfd6;">
        <p style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;color:#7c5a45;">
          Your submission
        </p>
        <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#1f2933;">
          <strong>Subject:</strong> {{subject}}
        </p>
        <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#1f2933;">
          <strong>Submitted:</strong> {{submitted_at}}
        </p>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#1f2933;white-space:pre-line;">
          <strong>Details:</strong><br />
          {{message}}
        </p>
      </div>

      <p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:#52606d;">
        Please do not reply with passwords, payment card details, or other sensitive personal information.
      </p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#52606d;">
        If you did not submit this request, you can ignore this message.
      </p>
    </div>

    <div style="padding:20px 32px 32px;font-size:12px;line-height:1.6;color:#7b8794;text-align:center;">
      Solasis Limited
    </div>
  </div>
</div>
```

## Variables available from the form

- `app_name`
- `request_type`
- `request_type_label`
- `from_name`
- `reply_to`
- `account_email`
- `account_email_or_reply_to`
- `subject`
- `message`
- `confirm_request`
- `confirm_request_text`
- `to_email`
- `submitted_at`
- `page_url`
