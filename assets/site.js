(function () {
  const config = window.SPFC_SITE_CONFIG || {};
  const linkMap = {
    pwa: config.pwaUrl,
    googlePlay: config.googlePlayUrl,
    androidFullApk: config.androidFullApkUrl
  };

  document.querySelectorAll("[data-store-link]").forEach((link) => {
    const key = link.getAttribute("data-store-link");
    const href = linkMap[key];

    if (href && href.startsWith("http")) {
      link.setAttribute("href", href);
      return;
    }

    link.setAttribute("href", "#");
    link.setAttribute("aria-disabled", "true");
    link.setAttribute("title", "Set this URL in site/assets/site-config.js");
  });

  const apkDownloadFilename = config.androidFullApkFilename;
  if (apkDownloadFilename) {
    document.querySelectorAll("[data-apk-download]").forEach((link) => {
      link.setAttribute("download", apkDownloadFilename);
    });
  }
})();
