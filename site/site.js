// PUI docs: light/dark theme, mobile menu and copy buttons.
(function () {
  var html = document.documentElement
  var themeBtn = document.getElementById("theme-toggle")
  function label() { themeBtn.textContent = html.classList.contains("dark") ? "Light theme" : "Dark theme" }
  label()
  themeBtn.addEventListener("click", function () {
    var dark = html.classList.toggle("dark")
    try { localStorage.setItem("pui-theme", dark ? "dark" : "light") } catch (e) {}
    label()
  })

  var menuBtn = document.getElementById("menu-toggle")
  var sidebar = document.getElementById("sidebar")
  menuBtn.addEventListener("click", function () {
    var open = sidebar.classList.toggle("open")
    menuBtn.setAttribute("aria-expanded", String(open))
  })

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(btn.getAttribute("data-copy")).then(function () {
        btn.textContent = "Copied"
        setTimeout(function () { btn.textContent = "Copy" }, 1500)
      })
    })
  })
})()
