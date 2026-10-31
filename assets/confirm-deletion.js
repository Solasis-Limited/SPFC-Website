(function () {
  const config = window.SPFC_SITE_CONFIG || {};
  const statusField = document.getElementById("deletion-confirmation-status");
  const confirmButton = document.getElementById("confirm-account-deletion");

  if (!statusField || !confirmButton) return;

  const token = window.location.hash.slice(1);
  window.history.replaceState(
    null,
    document.title,
    `${window.location.pathname}${window.location.search}`
  );

  if (!/^[0-9a-f]{64}$/.test(token)) {
    statusField.textContent =
      "This confirmation link is invalid or expired. Please request a new deletion email.";
    return;
  }

  if (!config.supabaseUrl || !config.supabasePublishableKey) {
    statusField.textContent =
      "Account deletion is temporarily unavailable. Please contact support.";
    return;
  }

  statusField.textContent =
    "Confirm only if you want your account and associated data permanently deleted.";
  confirmButton.disabled = false;

  confirmButton.addEventListener("click", async () => {
    confirmButton.disabled = true;
    statusField.textContent = "Deleting your account…";

    try {
      const response = await fetch(
        `${config.supabaseUrl.replace(/\/+$/, "")}/functions/v1/confirm-account-deletion`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.supabasePublishableKey}`,
            apikey: config.supabasePublishableKey,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token })
        }
      );
      const result = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error(result.error || "We could not complete account deletion.");
      }

      statusField.textContent =
        "Your account and associated data have been deleted. You can close this page.";
      confirmButton.hidden = true;
    } catch (error) {
      statusField.textContent = error instanceof Error
        ? error.message
        : "We could not complete account deletion. Please request a new confirmation email or contact support.";
      confirmButton.disabled = false;
    }
  });
})();
