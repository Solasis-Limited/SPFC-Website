(function () {
  const config = window.SPFC_SITE_CONFIG || {};
  const linkMap = {
    pwa: config.pwaUrl,
    appStore: config.appStoreUrl,
    googlePlay: config.googlePlayUrl,
    androidFullApk: config.androidFullApkUrl
  };

  document.querySelectorAll("[data-store-link]").forEach((link) => {
    const key = link.getAttribute("data-store-link");
    const href = linkMap[key];

    if (href && href.startsWith("http")) {
      link.setAttribute("href", href);
      link.removeAttribute("aria-disabled");
      link.removeAttribute("tabindex");

      const readyText = link.getAttribute("data-link-ready-text");
      if (readyText) {
        const label = link.querySelector("[data-link-label]");
        if (label) {
          label.textContent = readyText;
        }
      }

      return;
    }

    link.setAttribute("href", "#");
    link.setAttribute("aria-disabled", "true");
    link.setAttribute("tabindex", "-1");
    link.setAttribute("title", "Set this URL in assets/site-config.js");
  });

  const apkDownloadFilename = config.androidFullApkFilename;
  if (apkDownloadFilename) {
    document.querySelectorAll("[data-apk-download]").forEach((link) => {
      link.setAttribute("download", apkDownloadFilename);
    });
  }
})();
