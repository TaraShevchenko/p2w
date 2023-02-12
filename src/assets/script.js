(function () {
    const o = document.createElement("link").relList;
    if (o && o.supports && o.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
    new MutationObserver(i => {
        for (const n of i) if (n.type === "childList") for (const l of n.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && s(l)
    }).observe(document, {childList: !0, subtree: !0});

    function r(i) {
        const n = {};
        return i.integrity && (n.integrity = i.integrity), i.referrerpolicy && (n.referrerPolicy = i.referrerpolicy), i.crossorigin === "use-credentials" ? n.credentials = "include" : i.crossorigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n
    }

    function s(i) {
        if (i.ep) return;
        i.ep = !0;
        const n = r(i);
        fetch(i.href, n)
    }
})();
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {},
    x = {exports: {}};
(function (e, o) {
    (function (r, s) {
        e.exports = s(window, document)
    })(H, function (r, s) {
        var i = r.requestAnimationFrame || r.setImmediate || function (c) {
            return setTimeout(c, 0)
        };

        function n(c) {
            Object.prototype.hasOwnProperty.call(c, "data-simple-scrollbar") || Object.defineProperty(c, "data-simple-scrollbar", {value: new p(c)})
        }

        function l(c, u) {
            var m;
            c.addEventListener("mousedown", function (f) {
                return m = f.pageY, c.classList.add("ss-grabbed"), s.body.classList.add("ss-grabbed"), s.addEventListener("mousemove", d), s.addEventListener("mouseup", v), !1
            });

            function d(f) {
                var E = f.pageY - m;
                m = f.pageY, i(function () {
                    u.el.scrollTop += E / u.scrollRatio
                })
            }

            function v() {
                c.classList.remove("ss-grabbed"), s.body.classList.remove("ss-grabbed"), s.removeEventListener("mousemove", d), s.removeEventListener("mouseup", v)
            }
        }

        function t(c) {
            for (this.target = c, this.direction = r.getComputedStyle(this.target).direction, this.bar = '<div class="ss-scroll">', this.wrapper = s.createElement("div"), this.wrapper.setAttribute("class", "ss-wrapper"), this.el = s.createElement("div"), this.el.setAttribute("class", "ss-content"), this.direction === "rtl" && this.el.classList.add("rtl"), this.wrapper.appendChild(this.el); this.target.firstChild;) this.el.appendChild(this.target.firstChild);
            this.target.appendChild(this.wrapper), this.target.insertAdjacentHTML("beforeend", this.bar), this.bar = this.target.lastChild, l(this.bar, this), this.moveBar(), r.addEventListener("resize", this.moveBar.bind(this)), this.el.addEventListener("scroll", this.moveBar.bind(this)), this.el.addEventListener("mouseenter", this.moveBar.bind(this)), this.target.classList.add("ss-container");
            var u = r.getComputedStyle(c);
            u.height === "0px" && u["max-height"] !== "0px" && (c.style.height = u["max-height"])
        }

        t.prototype = {
            moveBar: function (c) {
                var u = this.el.scrollHeight, m = this.el.clientHeight, d = this;
                this.scrollRatio = m / u;
                var v = d.direction === "rtl",
                    f = v ? d.target.clientWidth - d.bar.clientWidth + 18 : (d.target.clientWidth - d.bar.clientWidth) * -1;
                i(function () {
                    d.scrollRatio >= 1 ? d.bar.classList.add("ss-hidden") : (d.bar.classList.remove("ss-hidden"), d.bar.style.cssText = "height:" + Math.max(d.scrollRatio * 100, 10) + "%; top:" + d.el.scrollTop / u * 100 + "%;right:" + f + "px;")
                })
            }
        };

        function a() {
            for (var c = s.querySelectorAll("*[ss-container]"), u = 0; u < c.length; u++) n(c[u])
        }

        s.addEventListener("DOMContentLoaded", a), t.initEl = n, t.initAll = a;
        var p = t;
        return p
    })
})(x);
const T = x.exports;
const g = document.querySelector(".header__profile-wrapper"), q = document.querySelector(".header__profile-open"),
    M = document.querySelector(".header__profile-close"), C = e => {
        g && !g.contains(e.target) && g.classList.remove("active")
    }, _ = () => {
        g && g.classList.toggle("active"), g.classList.contains("active") ? document.addEventListener("mousedown", C) : document.removeEventListener("mousedown", C)
    };
q.addEventListener("click", _);
M.addEventListener("click", _);
const y = e => {
    if (e.scrollHeight > e.offsetHeight) {
        e.style.height = `${e.offsetHeight}px`;
        const o = document.createElement("span");
        o.classList.add("custom-scroll-border"), T.initEl(e), e.appendChild(o)
    }
}, O = () => {
    const e = document.querySelectorAll(".custom-scroll-wrapper");
    for (let o = 0; o < e.length; o++) y(e[o])
};
O();
const w = (e, o, r, s) => {
    for (let t = 0; t < e.length; t++) e[t].classList.remove("active");
    for (let t = 0; t < o.length; t++) o[t].classList.remove("active");
    if (r.classList.add("active"), s.classList.add("active"), !r.querySelector(".tab__navigation-item-triangle")) {
        const t = document.createElement("span");
        t.classList.add("tab__navigation-item-triangle"), r.appendChild(t)
    }
    const n = s.classList.contains("tab__content-item--no-scroll"),
        l = s.querySelectorAll(".custom-scroll-wrapper--tab");
    if (!n) if (l.length) for (let t = 0; t < l.length; t++) y(l[t]); else s.classList.contains("table--with-pagination") || y(s)
}, A = () => {
    var o, r, s, i;
    const e = document.querySelectorAll(".tab__wrapper");
    for (let n = 0; n < e.length; n++) {
        let l, t;
        for (let a = 0; a < e[n].children.length; a++) (o = e[n]) != null && o.children[a].classList.contains("tab__navigation") && (l = (r = e[n]) == null ? void 0 : r.children[a].children), (s = e[n]) != null && s.children[a].classList.contains("tab__content") && (t = (i = e[n]) == null ? void 0 : i.children[a].children);
        if ((l == null ? void 0 : l.length) === (t == null ? void 0 : t.length)) for (let a = 0; a < l.length; a++) a === 0 && w(l, t, l[a], t[a]), l[a].addEventListener("click", () => w(l, t, l[a], t[a]))
    }
};
A();
const I = e => {
    e && e.classList.toggle("active");
    const o = r => {
        e && !e.contains(r.target) && e.classList.remove("active")
    };
    e.classList.contains("active") ? document.addEventListener("mousedown", o) : document.removeEventListener("mousedown", o)
}, W = () => {
    var o;
    const e = document.querySelectorAll(".dropdown");
    for (let r = 0; r < e.length; r++) {
        const s = e[r];
        ((o = e[r]) == null ? void 0 : o.children[0]).addEventListener("click", () => I(s))
    }
};
W();
const b = document.querySelector(".header-navigation__right"), L = document.querySelector(".header-navigation__left"),
    h = document.querySelector(".tournaments-bracket__table");
var S;
if (h) {
    let e = 0;
    const o = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), r = 76, s = 72,
        i = o > 1200 ? 316 : 259, n = 179, l = 129, t = 149,
        a = (S = h == null ? void 0 : h.children) == null ? void 0 : S.length;
    h.style.width = `${i * a - r}px`, L.disabled = !0, b.disabled = a <= 4;
    const p = h == null ? void 0 : h.children[0].children[1].children.length, c = d => `${(d - 2) * n + t + l + s}px`;
    h.style.maxHeight = c(p);
    const u = () => {
        e += 1;
        const d = h == null ? void 0 : h.children[e].children[1].children.length;
        h.style.maxHeight = c(d), h.style.transform = `translate3d(-${i * e}px, 0px, 0px)`, L.disabled = !1, b.disabled = a - e <= 4
    }, m = () => {
        e -= 1;
        const d = h == null ? void 0 : h.children[e].children[1].children.length;
        h.style.maxHeight = c(d), h.style.transform = `translate3d(-${i * e}px, 0px, 0px)`, b.disabled = !1, L.disabled = e === 0
    };
    b.addEventListener("click", u), L.addEventListener("click", m)
}
