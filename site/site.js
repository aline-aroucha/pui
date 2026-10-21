// PUI — tema claro/escuro, menu no celular e botões de copiar.
(function () {
  var html = document.documentElement
  var themeBtn = document.getElementById("theme-toggle")
  function label() { themeBtn.textContent = html.classList.contains("dark") ? "Tema claro" : "Tema escuro" }
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
        btn.textContent = "Copiado"
        setTimeout(function () { btn.textContent = "Copiar" }, 1500)
      })
    })
  })
})()
