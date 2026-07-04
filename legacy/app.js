/* ============================================================
   app.js — brand token injection, nav, reveal, waitlist form
   ============================================================ */
(function () {
  "use strict";
  var B = window.BRAND || {};

  /* ---- 1. Brand token replacement ------------------------------------
     Swaps {{brand}}, {{tagline}}, {{email}}, {{domain}}, {{launch}},
     {{count}}, {{price}}, {{circular}}, {{ages}}, {{hook}} everywhere. */
  var tokens = {
    brand: B.name,
    tagline: B.tagline,
    hook: B.hook,
    email: B.email,
    domain: B.domain,
    launch: B.launch,
    count: B.waitlistSeed,
    price: B.price,
    circular: B.circular,
    ages: B.ages,
  };
  var re = /\{\{(\w+)\}\}/g;
  function fill(str) {
    return str.replace(re, function (m, k) {
      return tokens[k] != null ? tokens[k] : m;
    });
  }
  // walk all text nodes + a few attributes
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  var n;
  while ((n = walker.nextNode())) {
    if (n.nodeValue.indexOf("{{") > -1) n.nodeValue = fill(n.nodeValue);
  }
  document.title = fill(document.title);
  ["content", "aria-label", "href"].forEach(function (attr) {
    document.querySelectorAll("[" + attr + "]").forEach(function (el) {
      var v = el.getAttribute(attr);
      if (v && v.indexOf("{{") > -1) el.setAttribute(attr, fill(v));
    });
  });

  // optional primary-colour override from config
  if (B.primaryColor) {
    document.documentElement.style.setProperty("--primary", B.primaryColor);
  }

  /* ---- 2. Mobile nav drawer ---------------------------------------- */
  var toggle = document.getElementById("navToggle");
  var drawer = document.getElementById("navDrawer");
  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      var open = drawer.hasAttribute("hidden");
      if (open) drawer.removeAttribute("hidden");
      else drawer.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        drawer.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- 3. Reveal on scroll ---------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- 4. Waitlist form ------------------------------------------- */
  var form = document.getElementById("waitlistForm");
  var success = document.getElementById("waitlistSuccess");
  var submitBtn = document.getElementById("submitBtn");

  function setError(field, msg) {
    var wrap = field.closest(".field");
    var err = wrap.querySelector("[data-err]");
    if (msg) {
      wrap.classList.add("field--invalid");
      err.textContent = msg;
    } else {
      wrap.classList.remove("field--invalid");
      err.textContent = "";
    }
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  if (form) {
    // clear error as user fixes it
    form.querySelectorAll("input,select").forEach(function (el) {
      el.addEventListener("input", function () { setError(el, ""); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name;
      var age = form.age;
      var email = form.email;
      var ok = true;

      if (!name.value.trim()) { setError(name, "Enter your name"); ok = false; }
      if (!age.value) { setError(age, "Pick one"); ok = false; }
      if (!email.value.trim()) { setError(email, "Enter your email"); ok = false; }
      else if (!validEmail(email.value)) { setError(email, "That email looks off"); ok = false; }
      if (!ok) {
        form.querySelector(".field--invalid input,.field--invalid select").focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Saving your spot…";

      // localStorage-first (no backend yet). Swap for API call when ready.
      var KEY = "wl_signups_v1";
      var list;
      try { list = JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) { list = []; }
      var entry = {
        name: name.value.trim(),
        age: age.value,
        email: email.value.trim().toLowerCase(),
        ref: (B.name || "yp").toLowerCase().replace(/\s/g, "") + "-" +
             Math.random().toString(36).slice(2, 8),
        at: new Date().toISOString(),
      };
      var dupe = list.some(function (x) { return x.email === entry.email; });
      if (!dupe) list.push(entry);
      try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (_) {}

      var position = (B.waitlistSeed || 300) + list.length;

      setTimeout(function () {
        form.setAttribute("hidden", "");
        success.removeAttribute("hidden");
        document.getElementById("queuePos").textContent = "#" + position;

        var shareUrl = "https://" + (B.domain || "example.com") + "/?ref=" + entry.ref;
        var waText = encodeURIComponent(
          "I just claimed my spot for " + (B.name || "the teen card") +
          " — Pakistan's first card for teens. Join me: " + shareUrl
        );
        document.getElementById("waShare").href = "https://wa.me/?text=" + waText;

        document.getElementById("copyLink").addEventListener("click", function () {
          var btn = this;
          navigator.clipboard.writeText(shareUrl).then(function () {
            btn.textContent = "Copied ✓";
            setTimeout(function () { btn.textContent = "Copy link"; }, 2000);
          }).catch(function () {
            btn.textContent = shareUrl;
          });
        });

        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 550);
    });
  }
})();
