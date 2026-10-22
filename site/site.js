// PUI docs: theme, mobile menu, search, "Copy for LLM" menu and copy buttons.
(function () {
  var html = document.documentElement
  var base = window.PUI_BASE || "./"

  // Theme: the button names the theme it switches to
  var themeBtn = document.getElementById("theme-toggle")
  function themeLabel() { themeBtn.setAttribute("aria-label", html.classList.contains("dark") ? "Light theme" : "Dark theme") }
  themeLabel()
  themeBtn.addEventListener("click", function () {
    var dark = html.classList.toggle("dark")
    try { localStorage.setItem("pui-theme", dark ? "dark" : "light") } catch (e) {}
    themeLabel()
  })

  // Mobile navigation
  var menuBtn = document.getElementById("menu-toggle")
  var sidebar = document.getElementById("sidebar")
  menuBtn.addEventListener("click", function () {
    var open = sidebar.classList.toggle("open")
    menuBtn.setAttribute("aria-expanded", String(open))
  })

  // Copy helpers: the button text confirms the copy
  function flash(btn, text) {
    var label = btn.querySelector("span") || btn
    var original = label.textContent
    label.textContent = text
    setTimeout(function () { label.textContent = original }, 1500)
  }
  function copy(btn, text) {
    navigator.clipboard.writeText(text).then(function () { flash(btn, "Copied") }, function () { flash(btn, "Copy failed") })
  }
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () { copy(btn, btn.getAttribute("data-copy")) })
  })
  document.querySelectorAll("[data-copy-from]").forEach(function (btn) {
    btn.addEventListener("click", function () { copy(btn, document.getElementById(btn.getAttribute("data-copy-from")).textContent) })
  })
  document.querySelectorAll("[data-copy-md]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      fetch(btn.getAttribute("data-copy-md")).then(function (r) { return r.text() }).then(function (text) { copy(btn, text) }, function () { flash(btn, "Copy failed") })
    })
  })

  // "Copy for LLM" options: a disclosure that closes with Esc and returns focus to its button
  var more = document.getElementById("llm-more")
  var options = document.getElementById("llm-options")
  function setOptions(open) {
    options.hidden = !open
    more.setAttribute("aria-expanded", String(open))
  }
  more.addEventListener("click", function () { setOptions(options.hidden) })
  options.addEventListener("keydown", function (e) { if (e.key === "Escape") { setOptions(false); more.focus() } })
  more.addEventListener("keydown", function (e) { if (e.key === "Escape") setOptions(false) })
  document.addEventListener("click", function (e) { if (!options.hidden && !options.contains(e.target) && e.target !== more && !more.contains(e.target)) setOptions(false) })

  // Search: filters pages as you type, announces the count without moving focus, Esc clears
  var input = document.getElementById("search-input")
  var results = document.getElementById("search-results")
  var list = results.querySelector("ul")
  var status = document.getElementById("search-status")
  var index = JSON.parse(document.getElementById("search-index").textContent)
  var timer
  function render() {
    var q = input.value.trim().toLowerCase()
    if (!q) { results.hidden = true; status.textContent = ""; return }
    var hits = index.filter(function (p) { return (p.title + " " + p.group + " " + p.description).toLowerCase().indexOf(q) >= 0 }).slice(0, 8)
    list.innerHTML = ""
    hits.forEach(function (p) {
      var li = document.createElement("li"), a = document.createElement("a")
      a.href = base + p.href
      a.innerHTML = "<span class=\"hit-title\"></span><span class=\"hit-group\"></span>"
      a.querySelector(".hit-title").textContent = p.title
      a.querySelector(".hit-group").textContent = p.group
      li.appendChild(a)
      list.appendChild(li)
    })
    if (!hits.length) {
      var empty = document.createElement("li")
      empty.className = "hit-empty"
      empty.textContent = "No pages match “" + input.value.trim() + "”."
      list.appendChild(empty)
    }
    results.hidden = false
    clearTimeout(timer)
    timer = setTimeout(function () { status.textContent = hits.length ? hits.length + (hits.length === 1 ? " result" : " results") : "No results" }, 400)
  }
  input.addEventListener("input", render)
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { input.value = ""; render() }
    if (e.key === "Enter") { var first = list.querySelector("a"); if (first) window.location.href = first.href }
  })
  results.addEventListener("keydown", function (e) { if (e.key === "Escape") { input.focus(); input.value = ""; render() } })
  document.addEventListener("click", function (e) { if (!results.hidden && !e.target.closest(".search")) results.hidden = true })
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement === document.body) { e.preventDefault(); input.focus() }
  })

  // "On this page": mark the section in view
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"))
  if (tocLinks.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return
        tocLinks.forEach(function (a) {
          if (a.getAttribute("href") === "#" + entry.target.id) a.setAttribute("aria-current", "location")
          else a.removeAttribute("aria-current")
        })
      })
    }, { rootMargin: "0px 0px -70% 0px" })
    tocLinks.forEach(function (a) { var el = document.getElementById(a.getAttribute("href").slice(1)); if (el) observer.observe(el) })
  }
})()
