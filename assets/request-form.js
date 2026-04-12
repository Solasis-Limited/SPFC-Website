(function () {
  const config = window.SPFC_SITE_CONFIG || {};
  const form = document.getElementById("support-request-form");
  const typeField = document.getElementById("request-type");
  const subjectField = document.getElementById("subject");
  const messageField = document.getElementById("message");
  const statusField = document.getElementById("form-status");
  const noticeField = document.querySelector("[data-emailjs-status]");

  if (
    !form ||
    !typeField ||
    !subjectField ||
    !messageField ||
    !statusField ||
    !noticeField
  ) {
    return;
  }

  const configured =
    typeof window.emailjs !== "undefined" &&
    config.emailjs &&
    config.emailjs.publicKey &&
    config.emailjs.serviceId &&
    config.emailjs.templateId;

  if (configured) {
    window.emailjs.init({
      publicKey: config.emailjs.publicKey
    });
    noticeField.textContent =
      "Requests will be delivered by email to the support team. We aim to reply within 3-5 business days.";
    noticeField.classList.add("notice-success");
  }

  const templates = {
    support: {
      subject: "SPFC support request",
      message:
        "Please describe the issue you need help with. Do not include sensitive information such as passwords, payment card details, or government ID numbers."
    },
    deletion: {
      subject: "SPFC account deletion request",
      message:
        "Please confirm the account you want deleted and include details that will help us identify it. Do not include sensitive information such as passwords, payment card details, or government ID numbers."
    },
    privacy: {
      subject: "SPFC privacy question",
      message:
        "Please describe your privacy-related question or request. Do not include sensitive information such as passwords, payment card details, or government ID numbers."
    }
  };

  const syncTemplate = () => {
    const selected = templates[typeField.value] || templates.support;
    subjectField.value = selected.subject;
    messageField.value = selected.message;
  };

  typeField.addEventListener("change", syncTemplate);
  syncTemplate();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!configured) {
      statusField.textContent =
        "EmailJS is not configured yet. Add your service, template, and public key first.";
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
    }

    statusField.textContent = "Sending request...";

    try {
      const formData = new FormData(form);
      const templateParams = Object.fromEntries(formData.entries());

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
