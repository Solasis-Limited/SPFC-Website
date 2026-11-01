(function () {
  const config = window.SPFC_SITE_CONFIG || {};
  const form = document.getElementById("support-request-form");
  const typeField = document.getElementById("request-type");
  const subjectField = document.getElementById("subject");
  const messageField = document.getElementById("message");
  const detailsField = document.querySelector("[data-request-details]");
  const statusField = document.getElementById("form-status");
  const noticeField = document.querySelector("[data-emailjs-status]");
  const deletionGuidanceField = document.querySelector(
    "[data-deletion-guidance]"
  );
  const deletionConfirmationGuidanceField = document.querySelector(
    "[data-deletion-confirmation-guidance]"
  );

  if (
    !form ||
    !typeField ||
    !subjectField ||
    !messageField ||
    !detailsField ||
    !statusField ||
    !noticeField ||
    !deletionGuidanceField ||
    !deletionConfirmationGuidanceField
  ) {
    return;
  }

  const configured =
    typeof window.emailjs !== "undefined" &&
    config.emailjs &&
    config.emailjs.publicKey &&
    config.emailjs.serviceId &&
    config.emailjs.templateId;
  const deletionConfigured = config.supabaseUrl && config.supabasePublishableKey;

  if (configured) {
    window.emailjs.init({
      publicKey: config.emailjs.publicKey
    });
  }
  noticeField.textContent = configured
    ? "The support team will respond to your request as soon as possible."
    : deletionConfigured
      ? "Account deletion requests are available. Support requests are temporarily unavailable."
      : "Configure EmailJS and Supabase in assets/site-config.js before going live.";
  if (configured || deletionConfigured) noticeField.classList.add("notice-success");

  const templates = {
    support: {
      subject: "SPFC support request",
      message:
        "Please describe the issue you need help with. Do not include sensitive information such as passwords, payment card details, or government ID numbers."
    },
    feedback: {
      subject: "SPFC feedback or feature request",
      message:
        "Share your feedback or feature idea, including how it would improve your experience. Do not include sensitive information such as passwords, payment card details, or government ID numbers."
    },
    deletion: {
      subject: "SPFC account deletion request",
      message:
        "We will send a one-time confirmation link to the app account email. Your account is deleted only after you open that link and confirm."
    },
    privacy: {
      subject: "SPFC privacy question",
      message:
        "Please describe your privacy-related question or request. Do not include sensitive information such as passwords, payment card details, or government ID numbers."
    }
  };

  const syncTemplate = () => {
    const selected = templates[typeField.value] || templates.support;
    const isDeletionRequest = typeField.value === "deletion";
    subjectField.value = selected.subject;
    messageField.value = selected.message;
    messageField.required = !isDeletionRequest;
    detailsField.hidden = isDeletionRequest;
    deletionGuidanceField.hidden = !isDeletionRequest;
    deletionConfirmationGuidanceField.hidden = !isDeletionRequest;
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.textContent = isDeletionRequest
        ? "Email confirmation link"
        : "Send request";
    }
  };

  typeField.addEventListener("change", syncTemplate);
  syncTemplate();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
    }

    statusField.textContent = "Sending request...";

    try {
      const formData = new FormData(form);
      if (typeField.value === "deletion") {
        if (!deletionConfigured) {
          statusField.textContent =
            "Account deletion requests are temporarily unavailable. Please contact support.";
          return;
        }

        const accountEmail = String(formData.get("account_email") || "").trim();
        const response = await fetch(
          `${config.supabaseUrl.replace(/\/+$/, "")}/functions/v1/request-account-deletion`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${config.supabasePublishableKey}`,
              apikey: config.supabasePublishableKey,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: accountEmail })
          }
        );
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Could not send a deletion confirmation email.");
        }

        form.reset();
        syncTemplate();
        statusField.textContent = result.message ||
          "If an account exists for that email, a confirmation link will be sent. If it does not arrive, contact support.";
        return;
      }

      if (!configured) {
        statusField.textContent =
          "EmailJS is not configured yet. Add your service, template, and public key first.";
        return;
      }

      const templateParams = Object.fromEntries(formData.entries());
      const requestType = templates[typeField.value] || templates.support;

      templateParams.request_type_label = typeField.options[typeField.selectedIndex]
        ? typeField.options[typeField.selectedIndex].text
        : requestType.subject;
      templateParams.account_email_or_reply_to =
        templateParams.account_email || templateParams.reply_to;
      templateParams.confirm_request_text = templateParams.confirm_request
        ? "Yes"
        : "No";
      templateParams.submitted_at = new Date().toLocaleString("en-GB", {
        dateStyle: "long",
        timeStyle: "short"
      });
      templateParams.page_url = window.location.href;

      await window.emailjs.send(
        config.emailjs.serviceId,
        config.emailjs.templateId,
        templateParams
      );

      form.reset();
      syncTemplate();
      statusField.textContent =
        "Your request has been sent. We'll reply by email.";
    } catch (error) {
      console.error(error);
      statusField.textContent =
        "We couldn't send the email right now. Please try again shortly.";
    } finally {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
      }
    }
  });
})();
