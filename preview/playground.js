// PUI docs: interactive example for each component page (preview + controls + generated code).
// Previews use the reference implementation in preview/pui.js (window.PUI).
(function () {
  var React = window.React, ReactDOM = window.ReactDOM, P = window.PUI, h = React.createElement

  function attrs(props) {
    return Object.keys(props).filter(function (k) { return props[k] !== undefined && props[k] !== false && props[k] !== "" })
      .map(function (k) { return props[k] === true ? k : k + '="' + props[k] + '"' }).join(" ")
  }
  function tag(name, props, children, indent) {
    var pad = indent || "", a = attrs(props || {}), open = "<" + name + (a ? " " + a : "")
    if (children === undefined || children === "") return pad + open + " />"
    if (children.indexOf("\n") < 0 && children.indexOf("<") < 0) return pad + open + ">" + children + "</" + name + ">"
    return pad + open + ">\n" + children + "\n" + pad + "</" + name + ">"
  }
  function unless(value, fallback) { return value === fallback ? undefined : value }
  function imports(file, names) { return "import { " + names.join(", ") + ' } from "@/components/ui/' + file + '"\n\n' }

  var sizes = ["sm", "default", "lg"]
  var configs = {
    Alert: {
      controls: [
        { name: "variant", type: "select", options: ["default", "destructive"], value: "default" },
        { name: "title", type: "text", value: "Sync complete" },
        { name: "description", type: "text", value: "1,240 orders imported from the ERP at 9:42 AM." }
      ],
      render: function (p) { return h(P.Alert, { variant: p.variant }, h(P.AlertTitle, null, p.title), h(P.AlertDescription, null, p.description)) },
      code: function (p) {
        return imports("alert", ["Alert", "AlertDescription", "AlertTitle"]) +
          tag("Alert", { variant: unless(p.variant, "default") }, tag("AlertTitle", {}, p.title, "  ") + "\n" + tag("AlertDescription", {}, p.description, "  "))
      }
    },
    Avatar: {
      controls: [
        { name: "fallback", type: "text", value: "MC" },
        { name: "alt", type: "text", value: "Maya Chen" }
      ],
      render: function (p) { return h(P.Avatar, { fallback: p.fallback, alt: p.alt }) },
      code: function (p) {
        return imports("avatar", ["Avatar", "AvatarFallback", "AvatarImage"]) +
          tag("Avatar", {}, tag("AvatarImage", { src: "/maya.jpg", alt: p.alt }, undefined, "  ") + "\n" + tag("AvatarFallback", {}, p.fallback, "  "))
      }
    },
    Badge: {
      controls: [
        { name: "children", type: "text", value: "✓ Paid" },
        { name: "variant", type: "select", options: ["default", "secondary", "outline", "destructive", "success", "warning"], value: "success" }
      ],
      render: function (p) { return h(P.Badge, { variant: p.variant }, p.children) },
      code: function (p) { return imports("badge", ["Badge"]) + tag("Badge", { variant: unless(p.variant, "default") }, p.children) }
    },
    Button: {
      controls: [
        { name: "children", type: "text", value: "Save changes" },
        { name: "variant", type: "select", options: ["default", "secondary", "outline", "ghost", "destructive", "link"], value: "default" },
        { name: "size", type: "select", options: sizes, value: "default" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) { return h(P.Button, { variant: p.variant, size: p.size, disabled: p.disabled }, p.children) },
      code: function (p) {
        return imports("button", ["Button"]) +
          tag("Button", { variant: unless(p.variant, "default"), size: unless(p.size, "default"), disabled: p.disabled }, p.children)
      }
    },
    Card: {
      controls: [
        { name: "title", type: "text", value: "Pro plan" },
        { name: "description", type: "text", value: "Billed monthly. Cancel anytime." },
        { name: "footer", type: "boolean", value: true }
      ],
      render: function (p) {
        return h(P.Card, { style: { maxWidth: 360, width: "100%" } },
          h(P.CardHeader, null, h(P.CardTitle, null, p.title), p.description ? h(P.CardDescription, null, p.description) : null),
          h(P.CardContent, null, "$18 per month, up to 10 members."),
          p.footer ? h(P.CardFooter, null, h(P.Button, { variant: "outline" }, "Compare plans"), h(P.Button, null, "Subscribe")) : null)
      },
      code: function (p) {
        var header = tag("CardTitle", {}, p.title, "    ") + (p.description ? "\n" + tag("CardDescription", {}, p.description, "    ") : "")
        var body = tag("CardHeader", {}, header, "  ") + "\n" + tag("CardContent", {}, "$18 per month, up to 10 members.", "  ")
        if (p.footer) body += "\n" + tag("CardFooter", {}, tag("Button", { variant: "outline" }, "Compare plans", "    ") + "\n" + tag("Button", {}, "Subscribe", "    "), "  ")
        return imports("card", ["Card", "CardContent", "CardDescription", "CardFooter", "CardHeader", "CardTitle"]) + tag("Card", {}, body)
      }
    },
    Checkbox: {
      controls: [
        { name: "label", type: "text", value: "Send me a weekly summary" },
        { name: "defaultChecked", type: "select", options: ["false", "true", "indeterminate"], value: "true" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) {
        var checked = p.defaultChecked === "indeterminate" ? "indeterminate" : p.defaultChecked === "true"
        return h("div", { className: "pui-inline" }, h(P.Checkbox, { id: "vx-cb", key: p.defaultChecked, defaultChecked: checked, disabled: p.disabled }), h(P.Label, { htmlFor: "vx-cb" }, p.label))
      },
      code: function (p) {
        var dc = p.defaultChecked === "indeterminate" ? 'defaultChecked="indeterminate"' : p.defaultChecked === "true" ? "defaultChecked" : ""
        var line = '  <Checkbox id="summary"' + (dc ? " " + dc : "") + (p.disabled ? " disabled" : "") + " />"
        return imports("checkbox", ["Checkbox"]) + 'import { Label } from "@/components/ui/label"\n\n' +
          '<div className="flex items-center gap-2">\n' + line + '\n  <Label htmlFor="summary">' + p.label + "</Label>\n</div>"
      }
    },
    Field: {
      controls: [
        { name: "label", type: "text", value: "Email" },
        { name: "description", type: "text", value: "We send receipts here." },
        { name: "error", type: "text", value: "Enter an email like name@example.com." },
        { name: "required", type: "boolean", value: true },
        { name: "invalid", type: "boolean", value: true }
      ],
      render: function (p) {
        return h(P.Field, { required: p.required, invalid: p.invalid, style: { width: "100%", maxWidth: 360 } },
          h(P.FieldLabel, null, p.label),
          h(P.FieldControl, null, h(P.Input, { type: "email", defaultValue: "maya@" })),
          p.description ? h(P.FieldDescription, null, p.description) : null,
          h(P.FieldError, null, p.error))
      },
      code: function (p) {
        var inner = tag("FieldLabel", {}, p.label, "  ") + "\n" + tag("FieldControl", {}, tag("Input", { type: "email" }, undefined, "    "), "  ") +
          (p.description ? "\n" + tag("FieldDescription", {}, p.description, "  ") : "") + "\n" + tag("FieldError", {}, p.error, "  ")
        return imports("field", ["Field", "FieldControl", "FieldDescription", "FieldError", "FieldLabel"]) +
          'import { Input } from "@/components/ui/input"\n\n' + tag("Field", { required: p.required, invalid: p.invalid ? "{invalid}" : undefined }, inner).replace('invalid="{invalid}"', "invalid={invalid}")
      }
    },
    Input: {
      controls: [
        { name: "type", type: "select", options: ["text", "email", "search", "tel", "url"], value: "email" },
        { name: "placeholder", type: "text", value: "you@company.com" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) {
        return h(P.Field, { required: true, style: { width: "100%", maxWidth: 360 } }, h(P.FieldLabel, null, "Email"),
          h(P.FieldControl, null, h(P.Input, { type: p.type, placeholder: p.placeholder, disabled: p.disabled })))
      },
      code: function (p) {
        return imports("field", ["Field", "FieldControl", "FieldLabel"]) + 'import { Input } from "@/components/ui/input"\n\n' +
          tag("Field", { required: true }, '  <FieldLabel>Email</FieldLabel>\n' + tag("FieldControl", {}, tag("Input", { type: unless(p.type, "text"), placeholder: p.placeholder, disabled: p.disabled }, undefined, "    "), "  "))
      }
    },
    Label: {
      controls: [{ name: "children", type: "text", value: "I accept the terms of service" }],
      render: function (p) { return h("div", { className: "pui-inline" }, h(P.Checkbox, { id: "vx-terms", defaultChecked: true }), h(P.Label, { htmlFor: "vx-terms" }, p.children)) },
      code: function (p) {
        return imports("label", ["Label"]) + 'import { Checkbox } from "@/components/ui/checkbox"\n\n' +
          '<div className="flex items-center gap-2">\n  <Checkbox id="terms" defaultChecked />\n  <Label htmlFor="terms">' + p.children + "</Label>\n</div>"
      }
    },
    PasswordInput: {
      controls: [
        { name: "autoComplete", type: "select", options: ["current-password", "new-password"], value: "current-password" },
        { name: "showLabel", type: "text", value: "Show password" },
        { name: "hideLabel", type: "text", value: "Hide password" }
      ],
      render: function (p) {
        return h(P.Field, { required: true, style: { width: "100%", maxWidth: 420 } }, h(P.FieldLabel, null, "Password"),
          h(P.FieldControl, null, h(P.PasswordInput, { autoComplete: p.autoComplete, showLabel: p.showLabel, hideLabel: p.hideLabel, defaultValue: "correct-horse" })))
      },
      code: function (p) {
        return imports("password-input", ["PasswordInput"]) + 'import { Field, FieldControl, FieldLabel } from "@/components/ui/field"\n\n' +
          tag("Field", { required: true }, '  <FieldLabel>Password</FieldLabel>\n' + tag("FieldControl", {},
            tag("PasswordInput", { autoComplete: unless(p.autoComplete, "current-password"), showLabel: unless(p.showLabel, "Show password"), hideLabel: unless(p.hideLabel, "Hide password") }, undefined, "    "), "  "))
      }
    },
    Select: {
      controls: [
        { name: "placeholder", type: "text", value: "Choose a country" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) {
        return h(P.Field, { required: true, style: { width: "100%", maxWidth: 320 } }, h(P.FieldLabel, null, "Country"),
          h(P.FieldControl, null, h(P.Select, { disabled: p.disabled, defaultValue: "", options: [{ value: "", label: p.placeholder }, { value: "BR", label: "Brazil" }, { value: "CA", label: "Canada" }, { value: "US", label: "United States" }] })))
      },
      code: function (p) {
        return imports("select", ["Select", "SelectContent", "SelectItem", "SelectTrigger", "SelectValue"]) +
          'import { Field, FieldControl, FieldLabel } from "@/components/ui/field"\n\n' +
          tag("Field", { required: true }, "  <FieldLabel>Country</FieldLabel>\n" + tag("Select", { disabled: p.disabled },
            tag("FieldControl", {}, tag("SelectTrigger", {}, tag("SelectValue", { placeholder: p.placeholder }, undefined, "        "), "      "), "    ") + "\n" +
            tag("SelectContent", {}, '      <SelectItem value="BR">Brazil</SelectItem>\n      <SelectItem value="CA">Canada</SelectItem>\n      <SelectItem value="US">United States</SelectItem>', "    "), "  "))
      }
    },
    Separator: {
      controls: [{ name: "orientation", type: "select", options: ["horizontal", "vertical"], value: "horizontal" }],
      render: function (p) {
        return p.orientation === "vertical"
          ? h("div", { className: "pui-row", style: { height: 20 } }, "Profile", h(P.Separator, { orientation: "vertical" }), "Security", h(P.Separator, { orientation: "vertical" }), "Notifications")
          : h("div", { style: { width: "100%", maxWidth: 360 } }, h("div", { style: { fontWeight: 600 } }, "Account settings"), h(P.Separator, { style: { margin: "12px 0" } }), h("div", { className: "pui-muted" }, "Profile, security and notifications."))
      },
      code: function (p) { return imports("separator", ["Separator"]) + tag("Separator", { orientation: unless(p.orientation, "horizontal") }) }
    },
    Skeleton: {
      controls: [{ name: "shape", type: "select", options: ["text", "avatar", "card"], value: "text" }],
      render: function (p) {
        var s = { text: { width: 220, height: 16 }, avatar: { width: 40, height: 40, borderRadius: 9999 }, card: { width: 280, height: 120, borderRadius: 12 } }[p.shape]
        return h("div", { className: "pui-stage", style: { padding: 0 } }, h("span", { role: "status", className: "pui-muted" }, "Loading orders…"), h(P.Skeleton, { style: s }))
      },
      code: function (p) {
        var c = { text: "h-4 w-56", avatar: "size-10 rounded-full", card: "h-30 w-72 rounded-xl" }[p.shape]
        return imports("skeleton", ["Skeleton"]) + '<div role="status" className="text-sm text-muted-foreground">Loading orders…</div>\n<Skeleton className="' + c + '" />'
      }
    },
    Switch: {
      controls: [
        { name: "label", type: "text", value: "Email notifications" },
        { name: "defaultChecked", type: "boolean", value: true },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) { return h("div", { className: "pui-inline" }, h(P.Switch, { id: "vx-sw", key: String(p.defaultChecked), defaultChecked: p.defaultChecked, disabled: p.disabled }), h(P.Label, { htmlFor: "vx-sw" }, p.label)) },
      code: function (p) {
        return imports("switch", ["Switch"]) + 'import { Label } from "@/components/ui/label"\n\n<div className="flex items-center gap-2">\n  <Switch id="notifications"' +
          (p.defaultChecked ? " defaultChecked" : "") + (p.disabled ? " disabled" : "") + ' />\n  <Label htmlFor="notifications">' + p.label + "</Label>\n</div>"
      }
    },
    Table: {
      controls: [
        { name: "caption", type: "text", value: "Orders, October 2026" },
        { name: "label", type: "text", value: "Orders" }
      ],
      render: function (p) {
        var rows = [["#4821", "Maya Chen", "$1,280.00"], ["#4822", "Leo Park", "$349.90"]]
        return h("div", { style: { width: "100%" } }, h(P.Table, { "aria-label": undefined },
          h(P.TableCaption, null, p.caption),
          h(P.TableHeader, null, h(P.TableRow, null, h(P.TableHead, null, "Order"), h(P.TableHead, null, "Customer"), h(P.TableHead, { className: "num" }, "Amount"))),
          h(P.TableBody, null, rows.map(function (r) { return h(P.TableRow, { key: r[0] }, h(P.TableCell, null, r[0]), h(P.TableCell, null, r[1]), h(P.TableCell, { className: "num" }, r[2])) }))))
      },
      code: function (p) {
        return imports("table", ["Table", "TableBody", "TableCaption", "TableCell", "TableHead", "TableHeader", "TableRow"]) +
          tag("Table", { label: p.label }, "  <TableCaption>" + p.caption + "</TableCaption>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Order</TableHead>\n      <TableHead>Customer</TableHead>\n      <TableHead className=\"text-right\">Amount</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    {orders.map((order) => (\n      <TableRow key={order.id}>\n        <TableCell>{order.id}</TableCell>\n        <TableCell>{order.customer}</TableCell>\n        <TableCell className=\"text-right font-mono tabular-nums\">{order.amount}</TableCell>\n      </TableRow>\n    ))}\n  </TableBody>")
      }
    },
    Tabs: {
      controls: [{ name: "defaultValue", type: "select", options: ["general", "team", "billing"], value: "general" }],
      render: function (p) {
        return h(P.Tabs, { defaultValue: p.defaultValue, key: p.defaultValue },
          h(P.TabsList, null, h(P.TabsTrigger, { value: "general" }, "General"), h(P.TabsTrigger, { value: "team" }, "Team"), h(P.TabsTrigger, { value: "billing" }, "Billing")),
          h(P.TabsContent, { value: "general" }, "Company name, logo and time zone."),
          h(P.TabsContent, { value: "team" }, "8 members, 2 pending invites."),
          h(P.TabsContent, { value: "billing" }, "Next invoice on Nov 1, 2026."))
      },
      code: function (p) {
        return imports("tabs", ["Tabs", "TabsContent", "TabsList", "TabsTrigger"]) +
          tag("Tabs", { defaultValue: p.defaultValue }, '  <TabsList>\n    <TabsTrigger value="general">General</TabsTrigger>\n    <TabsTrigger value="team">Team</TabsTrigger>\n    <TabsTrigger value="billing">Billing</TabsTrigger>\n  </TabsList>\n  <TabsContent value="general">Company name, logo and time zone.</TabsContent>\n  <TabsContent value="team">8 members, 2 pending invites.</TabsContent>\n  <TabsContent value="billing">Next invoice on Nov 1, 2026.</TabsContent>')
      }
    },
    Textarea: {
      controls: [
        { name: "placeholder", type: "text", value: "E.g. deliver after 2 PM" },
        { name: "disabled", type: "boolean", value: false }
      ],
      render: function (p) {
        return h(P.Field, { style: { width: "100%", maxWidth: 420 } }, h(P.FieldLabel, null, "Notes"),
          h(P.FieldControl, null, h(P.Textarea, { placeholder: p.placeholder, disabled: p.disabled })))
      },
      code: function (p) {
        return imports("textarea", ["Textarea"]) + 'import { Field, FieldControl, FieldLabel } from "@/components/ui/field"\n\n' +
          tag("Field", {}, "  <FieldLabel>Notes</FieldLabel>\n" + tag("FieldControl", {}, tag("Textarea", { placeholder: p.placeholder, disabled: p.disabled }, undefined, "    "), "  "))
      }
    }
  }

  // Keep consecutive import lines together in the generated code
  Object.keys(configs).forEach(function (name) {
    var code = configs[name].code
    configs[name].code = function (p) { return code(p).replace(/\n\nimport/g, "\nimport") }
  })

  function control(c, value, onChange, uid) {
    var id = uid + "-" + c.name
    if (c.type === "boolean") {
      return h("div", { className: "vx-control vx-control--inline", key: c.name },
        h(P.Switch, { id: id, checked: value, onCheckedChange: onChange }), h("label", { htmlFor: id, className: "vx-label" }, c.name))
    }
    var field = c.type === "select"
      ? h("div", { className: "pui-select" }, h("select", { id: id, value: value, onChange: function (e) { onChange(e.target.value) } },
          c.options.map(function (o) { return h("option", { key: o, value: o }, o) })),
          h(P.Icon, { name: "chevron-down" }))
      : h("input", { id: id, className: "pui-input", value: value, onChange: function (e) { onChange(e.target.value) } })
    return h("div", { className: "vx-control", key: c.name }, h("label", { htmlFor: id, className: "vx-label" }, c.name), field)
  }

  function Playground(props) {
    var cfg = configs[props.name]
    var init = {}
    cfg.controls.forEach(function (c) { init[c.name] = c.value })
    var st = React.useState(init), values = st[0]
    var set = function (name) { return function (v) { var n = Object.assign({}, values); n[name] = v; st[1](n) } }
    var code = cfg.code(values)
    React.useEffect(function () { props.onCode(code) }, [code])
    return h(React.Fragment, null,
      h("div", { className: "vx-preview" }, cfg.render(values)),
      h("div", { role: "group", "aria-label": "Controls", className: "vx-controls" },
        cfg.controls.map(function (c) { return control(c, values[c.name], set(c.name), "vx-" + props.name) })))
  }

  document.querySelectorAll("[data-playground]").forEach(function (el) {
    var name = el.getAttribute("data-playground"), codeEl = el.querySelector(".vx-code code"), mount = el.querySelector(".vx-mount")
    if (!configs[name]) return
    ReactDOM.createRoot(mount).render(h(Playground, { name: name, onCode: function (code) { codeEl.textContent = code } }))
  })
})()
