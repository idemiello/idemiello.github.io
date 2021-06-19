/**
 * Owl carousel
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
! function(a, b, c, d) {
    function e(b, c) { this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function(a, b) { this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this) }, this)), a.each(e.Pipe, a.proxy(function(b, c) { this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) }) }, this)), this.setup(), this.initialize() }

    function f(a) { if (a.touches !== d) return { x: a.touches[0].pageX, y: a.touches[0].pageY }; if (a.touches === d) { if (a.pageX !== d) return { x: a.pageX, y: a.pageY }; if (a.pageX === d) return { x: a.clientX, y: a.clientY } } }

    function g(a) {
        var b, d, e = c.createElement("div"),
            f = a;
        for (b in f)
            if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [d, b];
        return [!1]
    }

    function h() { return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1] }

    function i() { return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0] }

    function j() { return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0] }

    function k() { return "ontouchstart" in b || !!navigator.msMaxTouchPoints }

    function l() { return b.navigator.msPointerEnabled }
    var m, n, o;
    m = { start: 0, startX: 0, startY: 0, current: 0, currentX: 0, currentY: 0, offsetX: 0, offsetY: 0, distance: null, startTime: 0, endTime: 0, updatedX: 0, targetEl: null }, n = { isTouch: !1, isScrolling: !1, isSwiping: !1, direction: !1, inMotion: !1 }, o = { _onDragStart: null, _onDragMove: null, _onDragEnd: null, _transitionEnd: null, _resizer: null, _responsiveCall: null, _goToLoop: null, _checkVisibile: null }, e.Defaults = { items: 3, loop: !1, center: !1, mouseDrag: !0, touchDrag: !0, pullDrag: !0, freeDrag: !1, margin: 0, stagePadding: 0, merge: !1, mergeFit: !0, autoWidth: !1, startPosition: 0, rtl: !1, smartSpeed: 250, fluidSpeed: !1, dragEndSpeed: !1, responsive: {}, responsiveRefreshRate: 200, responsiveBaseElement: b, responsiveClass: !1, fallbackEasing: "swing", info: !1, nestedItemSelector: !1, itemElement: "div", stageElement: "div", themeClass: "owl-theme", baseClass: "owl-carousel", itemClass: "owl-item", centerClass: "center", activeClass: "active" }, e.Width = { Default: "default", Inner: "inner", Outer: "outer" }, e.Plugins = {}, e.Pipe = [{ filter: ["width", "items", "settings"], run: function(a) { a.current = this._items && this._items[this.relative(this._current)] } }, {
        filter: ["items", "settings"],
        run: function() {
            var a = this._clones,
                b = this.$stage.children(".cloned");
            (b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var a, b, c = this._clones,
                d = this._items,
                e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
            for (a = 0, b = Math.abs(e / 2); b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a, b, c, d = this.settings.rtl ? 1 : -1,
                e = (this.width() / this.settings.items).toFixed(3),
                f = 0;
            for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var b, c, d = (this.width() / this.settings.items).toFixed(3),
                e = { width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding, "padding-left": this.settings.stagePadding || "", "padding-right": this.settings.stagePadding || "" };
            if (this.$stage.css(e), e = { width: this.settings.autoWidth ? "auto" : d - this.settings.margin }, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function(a) { return a > 1 }).length > 0)
                for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e);
            else this.$stage.children().css(e)
        }
    }, { filter: ["width", "items", "settings"], run: function(a) { a.current && this.reset(this.$stage.children().index(a.current)) } }, { filter: ["position"], run: function() { this.animate(this.coordinates(this._current)) } }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }], e.prototype.initialize = function() {
        if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) { var b, c, e; if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), !1 }
        this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, e.prototype.setup = function() {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) { b >= a && a > d && (d = Number(a)) }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function(a, b) { return b.replace(/\b owl-responsive-\S+/g, "") }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", { property: { name: "settings", value: e } }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", { property: { name: "settings", value: this.settings } }))
    }, e.prototype.optionsLogic = function() { this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1) }, e.prototype.prepare = function(b) { var c = this.trigger("prepare", { content: b }); return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", { content: c.data }), c.data }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) { return this[a] }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function() {
        if (0 === this._items.length) return !1;
        (new Date).getTime();
        this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed")
    }, e.prototype.eventsCall = function() { this.e._onDragStart = a.proxy(function(a) { this.onDragStart(a) }, this), this.e._onDragMove = a.proxy(function(a) { this.onDragMove(a) }, this), this.e._onDragEnd = a.proxy(function(a) { this.onDragEnd(a) }, this), this.e._onResize = a.proxy(function(a) { this.onResize(a) }, this), this.e._transitionEnd = a.proxy(function(a) { this.transitionEnd(a) }, this), this.e._preventClick = a.proxy(function(a) { this.preventClick(a) }, this) }, e.prototype.onThrottledResize = function() { b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate) }, e.prototype.onResize = function() { return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1 }, e.prototype.eventsRouter = function(a) { var b = a.type; "mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a) }, e.prototype.internalEvents = function() {
        var c = (k(), l());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function(a) { this.eventsRouter(a) }, this)), this.$stage.on("dragstart", function() { return !1 }), this.$stage.get(0).onselectstart = function() { return !1 }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function(a) { this.eventsRouter(a) }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this))
    }, e.prototype.onDragStart = function(d) {
        var e, g, h, i;
        if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1;
        if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
        this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function(a) { this.eventsRouter(a) }, this))
    }, e.prototype.onDragMove = function(a) {
        var c, e, g, h, i, j;
        this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, e.prototype.onDragEnd = function(b) {
        var d, e, f;
        if (this.state.isTouch) {
            if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
            this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents")
        }
    }, e.prototype.removeClick = function(c) { this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function() { a(c).off("click.preventClick") }, 300) }, e.prototype.preventClick = function(b) { b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick") }, e.prototype.getTransformProperty = function() { var a, c; return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12] }, e.prototype.closest = function(b) {
        var c = -1,
            d = 30,
            e = this.width(),
            f = this.coordinates();
        return this.settings.freeDrag || a.each(f, a.proxy(function(a, g) { return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c
    }, e.prototype.animate = function(b) { this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({ transform: "translate3d(" + b + "px,0px, 0px)", transition: this.speed() / 1e3 + "s" }) : this.state.isTouch ? this.$stage.css({ left: b + "px" }) : this.$stage.animate({ left: b }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function() { this.state.inMotion && this.transitionEnd() }, this)) }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", { property: { name: "position", value: a } });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", { property: { name: "position", value: this._current } })
        }
        return this._current
    }, e.prototype.invalidate = function(a) { this._invalidated[a] = !0 }, e.prototype.reset = function(a) { a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"])) }, e.prototype.normalize = function(b, c) { var e = c ? this._items.length : this._items.length + this._clones.length; return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b)) }, e.prototype.relative = function(a) { return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0) }, e.prototype.maximum = function(a) {
        var b, c, d, e = 0,
            f = this.settings;
        if (a) return this._items.length - 1;
        if (!f.loop && f.center) b = this._items.length - 1;
        else if (f.loop || f.center)
            if (f.loop || f.center) b = this._items.length + f.items;
            else {
                if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";
                for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width();
                    (d = this.coordinates(e)) && !(d * revert >= c);) b = ++e
            }
        else b = this._items.length - f.items;
        return b
    }, e.prototype.minimum = function(a) { return a ? 0 : this._clones.length / 2 }, e.prototype.items = function(a) { return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a]) }, e.prototype.mergers = function(a) { return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a]) }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) { return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2 };
        return b === d ? a.map(this._clones, function(a, b) { return f(b) }) : a.map(this._clones, function(a, c) { return a === b ? f(c) : null })
    }, e.prototype.speed = function(a) { return a !== d && (this._speed = a), this._speed }, e.prototype.coordinates = function(b) { var c = null; return b === d ? a.map(this._coordinates, a.proxy(function(a, b) { return this.coordinates(b) }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c) }, e.prototype.duration = function(a, b, c) { return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed) }, e.prototype.to = function(c, d) {
        if (this.settings.loop) {
            var e = c - this.relative(this.current()),
                f = this.current(),
                g = this.current(),
                h = this.current() + e,
                i = 0 > g - h ? !0 : !1,
                j = this._clones.length + this._items.length;
            h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function() { this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update() }, this), 30)
        } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update()
    }, e.prototype.next = function(a) { a = a || !1, this.to(this.relative(this.current()) + 1, a) }, e.prototype.prev = function(a) { a = a || !1, this.to(this.relative(this.current()) - 1, a) }, e.prototype.transitionEnd = function(a) { return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated")) }, e.prototype.viewport = function() {
        var d;
        if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
        else if (b.innerWidth) d = b.innerWidth;
        else {
            if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
            d = c.documentElement.clientWidth
        }
        return d
    }, e.prototype.replace = function(b) { this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() { return 1 === this.nodeType }).each(a.proxy(function(a, b) { b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1) }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items") }, e.prototype.add = function(a, b) { b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", { content: a, position: b }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", { content: a, position: b }) }, e.prototype.remove = function(a) { a = this.normalize(a, !0), a !== d && (this.trigger("remove", { content: this._items[a], position: a }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", { content: null, position: a })) }, e.prototype.addTriggerableEvents = function() {
        var b = a.proxy(function(b, c) { return a.proxy(function(a) { a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c])) }, this) }, this);
        a.each({ next: this.next, prev: this.prev, to: this.to, destroy: this.destroy, refresh: this.refresh, replace: this.replace, add: this.add, remove: this.remove }, a.proxy(function(a, c) { this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel")) }, this))
    }, e.prototype.watchVisibility = function() {
        function c(a) { return a.offsetWidth > 0 && a.offsetHeight > 0 }

        function d() { c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile)) }
        c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
    }, e.prototype.preloadAutoWidthImages = function(b) {
        var c, d, e, f;
        c = 0, d = this, b.each(function(g, h) { e = a(h), f = new Image, f.onload = function() { c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize()) }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina") })
    }, e.prototype.destroy = function() {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var d in this._plugins) this._plugins[d].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() { return !1 })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : c > a;
            case ">":
                return d ? c > a : a > c;
            case ">=":
                return d ? c >= a : a >= c;
            case "<=":
                return d ? a >= c : c >= a
        }
    }, e.prototype.on = function(a, b, c, d) { a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c) }, e.prototype.off = function(a, b, c, d) { a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c) }, e.prototype.trigger = function(b, c, d) {
        var e = { item: { count: this._items.length, index: this.current() } },
            f = a.camelCase(a.grep(["on", b, d], function(a) { return a }).join("-").toLowerCase()),
            g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({ relatedTarget: this }, e, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) { b.onTrigger && b.onTrigger(g) }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g
    }, e.prototype.suppress = function(b) { a.each(b, a.proxy(function(a, b) { this._supress[b] = !0 }, this)) }, e.prototype.release = function(b) { a.each(b, a.proxy(function(a, b) { delete this._supress[b] }, this)) }, e.prototype.browserSupport = function() {
        if (this.support3d = j(), this.support3d) {
            this.transformVendor = i();
            var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = b.orientation
    }, a.fn.owlCarousel = function(b) { return this.each(function() { a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b)) }) }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b) {
    var c = function(b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                    for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function(a, b) { this.load(b) }, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h)
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    c.Defaults = { lazyLoad: !1 }, c.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", { element: f, url: g }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() { f.css("opacity", 1), this._core.trigger("loaded", { element: f, url: g }, "lazy") }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() { f.css({ "background-image": "url(" + g + ")", opacity: "1" }), this._core.trigger("loaded", { element: f, url: g }, "lazy") }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, c.prototype.destroy = function() { var a, b; for (a in this.handlers) this._core.$element.off(a, this.handlers[a]); for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null) }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c
}(window.Zepto || window.jQuery, window, document),
function(a) {
    var b = function(c) { this._core = c, this._handlers = { "initialized.owl.carousel": a.proxy(function() { this._core.settings.autoHeight && this.update() }, this), "changed.owl.carousel": a.proxy(function(a) { this._core.settings.autoHeight && "position" == a.property.name && this.update() }, this), "loaded.owl.lazy": a.proxy(function(a) { this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update() }, this) }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers) };
    b.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }, b.prototype.update = function() { this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass) }, b.prototype.destroy = function() { var a, b; for (a in this._handlers) this._core.$element.off(a, this._handlers[a]); for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null) }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b
}(window.Zepto || window.jQuery, window, document),
function(a, b, c) {
    var d = function(b) {
        this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
            "resize.owl.carousel": a.proxy(function(a) { this._core.settings.video && !this.isInFullScreen() && a.preventDefault() }, this),
            "refresh.owl.carousel changed.owl.carousel": a.proxy(function() { this._playing && this.stop() }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                var c = a(b.content).find(".owl-video");
                c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
            }, this)
        }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) { this.play(a) }, this))
    };
    d.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }, d.prototype.fetch = function(a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else {
            if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
            c = "vimeo"
        }
        d = d[6], this._videos[g] = { type: c, id: d, width: e, height: f }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, d.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function(a) { e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e) };
        return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({ type: "GET", url: "http://vimeo.com/api/v2/video/" + c.id + ".json", jsonp: "callback", dataType: "jsonp", success: function(a) { f = a[0].thumbnail_large, l(f) } }))
    }, d.prototype.stop = function() { this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null }, d.prototype.play = function(b) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var c, d, e = a(b.target || b.srcElement),
            f = e.closest("." + this._core.settings.itemClass),
            g = this._videos[f.attr("data-video")],
            h = g.width || "100%",
            i = g.height || this._core.$stage.height();
        "youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d)
    }, d.prototype.isInFullScreen = function() { var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement; return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0 }, d.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = d
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) { this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = { "change.owl.carousel": a.proxy(function(a) { "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value) }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) { this.swapping = "translated" == a.type }, this), "translate.owl.carousel": a.proxy(function() { this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap() }, this) }, this.core.$element.on(this.handlers) };
    e.Defaults = { animateOut: !1, animateIn: !1 }, e.prototype.swap = function() {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this),
                d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next),
                f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({ left: b + "px" }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
        }
    }, e.prototype.clear = function(b) { a(b.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd() }, e.prototype.destroy = function() { var a, b; for (a in this.handlers) this.core.$element.off(a, this.handlers[a]); for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null) }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c) {
    var d = function(b) {
        this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": a.proxy(function() {
                this.autoplay()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) { this.play(b, c) }, this),
            "stop.owl.autoplay": a.proxy(function() { this.stop() }, this),
            "mouseover.owl.autoplay": a.proxy(function() { this.core.settings.autoplayHoverPause && this.pause() }, this),
            "mouseleave.owl.autoplay": a.proxy(function() { this.core.settings.autoplayHoverPause && this.autoplay() }, this)
        }, this.core.$element.on(this.handlers)
    };
    d.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 }, d.prototype.autoplay = function() { this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function() { this.play() }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval) }, d.prototype.play = function() { return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed) }, d.prototype.stop = function() { b.clearInterval(this.interval) }, d.prototype.pause = function() { b.clearInterval(this.interval) }, d.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this.interval);
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
}(window.Zepto || window.jQuery, window, document),
function(a) {
    "use strict";
    var b = function(c) {
        this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) { this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot")) }, this),
            "add.owl.carousel": a.proxy(function(b) { this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot")) }, this),
            "remove.owl.carousel prepared.owl.carousel": a.proxy(function(a) { this._core.settings.dotsData && this._templates.splice(a.position, 1) }, this),
            "change.owl.carousel": a.proxy(function(a) {
                if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var b = this._core.current(),
                        c = this._core.maximum(),
                        d = this._core.minimum();
                    a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(a) { "position" == a.property.name && this.draw() }, this),
            "refreshed.owl.carousel": a.proxy(function() { this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation") }, this)
        }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    b.Defaults = { nav: !1, navRewind: !0, navText: ["prev", "next"], navSpeed: !1, navElement: "div", navContainer: !1, navContainerClass: "owl-nav", navClass: ["owl-prev", "owl-next"], slideBy: 1, dotClass: "owl-dot", dotsClass: "owl-dots", dots: !0, dotsEach: !1, dotData: !1, dotsSpeed: !1, dotsContainer: !1, controlsClass: "owl-controls" }, b.prototype.initialize = function() {
        var b, c, d = this._core.settings;
        d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function(b) {
            var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(c, d.dotsSpeed)
        }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function() { this.prev(d.navSpeed) }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function() { this.next(d.navSpeed) }, this));
        for (c in this._overrides) this._core[c] = a.proxy(this[c], this)
    }, b.prototype.destroy = function() { var a, b, c, d; for (a in this._handlers) this.$element.off(a, this._handlers[a]); for (b in this._controls) this._controls[b].remove(); for (d in this.overides) this._core[d] = this._overrides[d]; for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null) }, b.prototype.update = function() {
        var a, b, c, d = this._core.settings,
            e = this._core.clones().length / 2,
            f = e + this._core.items().length,
            g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
        if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy)
            for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)(b >= g || 0 === b) && (this._pages.push({ start: a - e, end: a - e + g - 1 }), b = 0, ++c), b += this._core.mergers(this._core.relative(a))
    }, b.prototype.draw = function() {
        var b, c, d = "",
            e = this._core.settings,
            f = (this._core.$stage.children(), this._core.relative(this._core.current()));
        if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots) {
            if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) {
                for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];
                this._controls.$indicators.html(d)
            } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
            this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(e.dots)
    }, b.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = { index: a.inArray(this.current(), this._pages), count: this._pages.length, size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items) }
    }, b.prototype.current = function() { var b = this._core.relative(this._core.current()); return a.grep(this._pages, function(a) { return a.start <= b && a.end >= b }).pop() }, b.prototype.getPosition = function(b) { var c, d, e = this._core.settings; return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c }, b.prototype.next = function(b) { a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b) }, b.prototype.prev = function(b) { a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b) }, b.prototype.to = function(b, c, d) {
        var e;
        d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b
}(window.Zepto || window.jQuery, window, document),
function(a, b) {
    "use strict";
    var c = function(d) {
        this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function() { "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation") }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[c] = b.content
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function() {
            var a = b.location.hash.substring(1),
                c = this._core.$stage.children(),
                d = this._hashes[a] && c.index(this._hashes[a]) || 0;
            return a ? void this._core.to(d, !1, !0) : !1
        }, this))
    };
    c.Defaults = { URLhashListener: !1 }, c.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = c
}(window.Zepto || window.jQuery, window, document);

/**
 * bxSlider v4.2.12
 * Copyright 2013-2015 Steven Wanderski
 * Written while drinking Belgian ales and listening to jazz
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
! function(t) {
    var e = { mode: "horizontal", slideSelector: "", infiniteLoop: !0, hideControlOnEnd: !1, speed: 500, easing: null, slideMargin: 0, startSlide: 0, randomStart: !1, captions: !1, ticker: !1, tickerHover: !1, adaptiveHeight: !1, adaptiveHeightSpeed: 500, video: !1, useCSS: !0, preloadImages: "visible", responsive: !0, slideZIndex: 50, wrapperClass: "bx-wrapper", touchEnabled: !0, swipeThreshold: 50, oneToOneTouch: !0, preventDefaultSwipeX: !0, preventDefaultSwipeY: !1, ariaLive: !0, ariaHidden: !0, keyboardEnabled: !1, pager: !0, pagerType: "full", pagerShortSeparator: " / ", pagerSelector: null, buildPager: null, pagerCustom: null, controls: !0, nextText: "Next", prevText: "Prev", nextSelector: null, prevSelector: null, autoControls: !1, startText: "Start", stopText: "Stop", autoControlsCombine: !1, autoControlsSelector: null, auto: !1, pause: 4e3, autoStart: !0, autoDirection: "next", stopAutoOnClick: !1, autoHover: !1, autoDelay: 0, autoSlideForOnePage: !1, minSlides: 1, maxSlides: 1, moveSlides: 0, slideWidth: 0, shrinkItems: !1, onSliderLoad: function() { return !0 }, onSlideBefore: function() { return !0 }, onSlideAfter: function() { return !0 }, onSlideNext: function() { return !0 }, onSlidePrev: function() { return !0 }, onSliderResize: function() { return !0 } };
    t.fn.bxSlider = function(n) {
        if (0 === this.length) return this;
        if (this.length > 1) return this.each(function() { t(this).bxSlider(n) }), this;
        var s = {},
            o = this,
            r = t(window).width(),
            a = t(window).height();
        if (!t(o).data("bxSlider")) {
            var l = function() {
                    t(o).data("bxSlider") || (s.settings = t.extend({}, e, n), s.settings.slideWidth = parseInt(s.settings.slideWidth), s.children = o.children(s.settings.slideSelector), s.children.length < s.settings.minSlides && (s.settings.minSlides = s.children.length), s.children.length < s.settings.maxSlides && (s.settings.maxSlides = s.children.length), s.settings.randomStart && (s.settings.startSlide = Math.floor(Math.random() * s.children.length)), s.active = { index: s.settings.startSlide }, s.carousel = s.settings.minSlides > 1 || s.settings.maxSlides > 1, s.carousel && (s.settings.preloadImages = "all"), s.minThreshold = s.settings.minSlides * s.settings.slideWidth + (s.settings.minSlides - 1) * s.settings.slideMargin, s.maxThreshold = s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin, s.working = !1, s.controls = {}, s.interval = null, s.animProp = "vertical" === s.settings.mode ? "top" : "left", s.usingCSS = s.settings.useCSS && "fade" !== s.settings.mode && function() {
                        for (var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], i = 0; i < e.length; i++)
                            if (void 0 !== t.style[e[i]]) return s.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), s.animProp = "-" + s.cssPrefix + "-transform", !0;
                        return !1
                    }(), "vertical" === s.settings.mode && (s.settings.maxSlides = s.settings.minSlides), o.data("origStyle", o.attr("style")), o.children(s.settings.slideSelector).each(function() { t(this).data("origStyle", t(this).attr("style")) }), d())
                },
                d = function() {
                    var e = s.children.eq(s.settings.startSlide);
                    o.wrap('<div class="' + s.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'), s.viewport = o.parent(), s.settings.ariaLive && !s.settings.ticker && s.viewport.attr("aria-live", "polite"), s.loader = t('<div class="bx-loading" />'), s.viewport.prepend(s.loader), o.css({ width: "horizontal" === s.settings.mode ? 1e3 * s.children.length + 215 + "%" : "auto", position: "relative" }), s.usingCSS && s.settings.easing ? o.css("-" + s.cssPrefix + "-transition-timing-function", s.settings.easing) : s.settings.easing || (s.settings.easing = "swing"), s.viewport.css({ width: "100%", overflow: "hidden", position: "relative" }), s.viewport.parent().css({ maxWidth: u() }), s.children.css({ float: "horizontal" === s.settings.mode ? "left" : "none", listStyle: "none", position: "relative" }), s.children.css("width", h()), "horizontal" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginRight", s.settings.slideMargin), "vertical" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginBottom", s.settings.slideMargin), "fade" === s.settings.mode && (s.children.css({ position: "absolute", zIndex: 0, display: "none" }), s.children.eq(s.settings.startSlide).css({ zIndex: s.settings.slideZIndex, display: "block" })), s.controls.el = t('<div class="bx-controls" />'), s.settings.captions && P(), s.active.last = s.settings.startSlide === f() - 1, s.settings.video && o.fitVids(), ("all" === s.settings.preloadImages || s.settings.ticker) && (e = s.children), s.settings.ticker ? s.settings.pager = !1 : (s.settings.controls && C(), s.settings.auto && s.settings.autoControls && T(), s.settings.pager && w(), (s.settings.controls || s.settings.autoControls || s.settings.pager) && s.viewport.after(s.controls.el)), c(e, g)
                },
                c = function(e, i) {
                    var n = e.find('img:not([src=""]), iframe').length,
                        s = 0;
                    return 0 === n ? void i() : void e.find('img:not([src=""]), iframe').each(function() { t(this).one("load error", function() {++s === n && i() }).each(function() { this.complete && t(this).trigger("load") }) })
                },
                g = function() {
                    if (s.settings.infiniteLoop && "fade" !== s.settings.mode && !s.settings.ticker) {
                        var e = "vertical" === s.settings.mode ? s.settings.minSlides : s.settings.maxSlides,
                            i = s.children.slice(0, e).clone(!0).addClass("bx-clone"),
                            n = s.children.slice(-e).clone(!0).addClass("bx-clone");
                        s.settings.ariaHidden && (i.attr("aria-hidden", !0), n.attr("aria-hidden", !0)), o.append(i).prepend(n)
                    }
                    s.loader.remove(), m(), "vertical" === s.settings.mode && (s.settings.adaptiveHeight = !0), s.viewport.height(p()), o.redrawSlider(), s.settings.onSliderLoad.call(o, s.active.index), s.initialized = !0, s.settings.responsive && t(window).bind("resize", Z), s.settings.auto && s.settings.autoStart && (f() > 1 || s.settings.autoSlideForOnePage) && H(), s.settings.ticker && W(), s.settings.pager && I(s.settings.startSlide), s.settings.controls && D(), s.settings.touchEnabled && !s.settings.ticker && N(), s.settings.keyboardEnabled && !s.settings.ticker && t(document).keydown(F)
                },
                p = function() {
                    var e = 0,
                        n = t();
                    if ("vertical" === s.settings.mode || s.settings.adaptiveHeight)
                        if (s.carousel) { var o = 1 === s.settings.moveSlides ? s.active.index : s.active.index * x(); for (n = s.children.eq(o), i = 1; i <= s.settings.maxSlides - 1; i++) n = o + i >= s.children.length ? n.add(s.children.eq(i - 1)) : n.add(s.children.eq(o + i)) } else n = s.children.eq(s.active.index);
                    else n = s.children;
                    return "vertical" === s.settings.mode ? (n.each(function(i) { e += t(this).outerHeight() }), s.settings.slideMargin > 0 && (e += s.settings.slideMargin * (s.settings.minSlides - 1))) : e = Math.max.apply(Math, n.map(function() { return t(this).outerHeight(!1) }).get()), "border-box" === s.viewport.css("box-sizing") ? e += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom")) + parseFloat(s.viewport.css("border-top-width")) + parseFloat(s.viewport.css("border-bottom-width")) : "padding-box" === s.viewport.css("box-sizing") && (e += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom"))), e
                },
                u = function() { var t = "100%"; return s.settings.slideWidth > 0 && (t = "horizontal" === s.settings.mode ? s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin : s.settings.slideWidth), t },
                h = function() {
                    var t = s.settings.slideWidth,
                        e = s.viewport.width();
                    if (0 === s.settings.slideWidth || s.settings.slideWidth > e && !s.carousel || "vertical" === s.settings.mode) t = e;
                    else if (s.settings.maxSlides > 1 && "horizontal" === s.settings.mode) {
                        if (e > s.maxThreshold) return t;
                        e < s.minThreshold ? t = (e - s.settings.slideMargin * (s.settings.minSlides - 1)) / s.settings.minSlides : s.settings.shrinkItems && (t = Math.floor((e + s.settings.slideMargin) / Math.ceil((e + s.settings.slideMargin) / (t + s.settings.slideMargin)) - s.settings.slideMargin))
                    }
                    return t
                },
                v = function() {
                    var t = 1,
                        e = null;
                    return "horizontal" === s.settings.mode && s.settings.slideWidth > 0 ? s.viewport.width() < s.minThreshold ? t = s.settings.minSlides : s.viewport.width() > s.maxThreshold ? t = s.settings.maxSlides : (e = s.children.first().width() + s.settings.slideMargin, t = Math.floor((s.viewport.width() + s.settings.slideMargin) / e)) : "vertical" === s.settings.mode && (t = s.settings.minSlides), t
                },
                f = function() {
                    var t = 0,
                        e = 0,
                        i = 0;
                    if (s.settings.moveSlides > 0)
                        if (s.settings.infiniteLoop) t = Math.ceil(s.children.length / x());
                        else
                            for (; e < s.children.length;) ++t, e = i + v(), i += s.settings.moveSlides <= v() ? s.settings.moveSlides : v();
                    else t = Math.ceil(s.children.length / v());
                    return t
                },
                x = function() { return s.settings.moveSlides > 0 && s.settings.moveSlides <= v() ? s.settings.moveSlides : v() },
                m = function() {
                    var t, e, i;
                    s.children.length > s.settings.maxSlides && s.active.last && !s.settings.infiniteLoop ? "horizontal" === s.settings.mode ? (e = s.children.last(), t = e.position(), S(-(t.left - (s.viewport.width() - e.outerWidth())), "reset", 0)) : "vertical" === s.settings.mode && (i = s.children.length - s.settings.minSlides, t = s.children.eq(i).position(), S(-t.top, "reset", 0)) : (t = s.children.eq(s.active.index * x()).position(), s.active.index === f() - 1 && (s.active.last = !0), void 0 !== t && ("horizontal" === s.settings.mode ? S(-t.left, "reset", 0) : "vertical" === s.settings.mode && S(-t.top, "reset", 0)))
                },
                S = function(e, i, n, r) {
                    var a, l;
                    s.usingCSS ? (l = "vertical" === s.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)", o.css("-" + s.cssPrefix + "-transition-duration", n / 1e3 + "s"), "slide" === i ? (o.css(s.animProp, l), 0 !== n ? o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) { t(e.target).is(o) && (o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), q()) }) : q()) : "reset" === i ? o.css(s.animProp, l) : "ticker" === i && (o.css("-" + s.cssPrefix + "-transition-timing-function", "linear"), o.css(s.animProp, l), 0 !== n ? o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) { t(e.target).is(o) && (o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), S(r.resetValue, "reset", 0), L()) }) : (S(r.resetValue, "reset", 0), L()))) : (a = {}, a[s.animProp] = e, "slide" === i ? o.animate(a, n, s.settings.easing, function() { q() }) : "reset" === i ? o.css(s.animProp, e) : "ticker" === i && o.animate(a, n, "linear", function() { S(r.resetValue, "reset", 0), L() }))
                },
                b = function() {
                    for (var e = "", i = "", n = f(), o = 0; o < n; o++) i = "", s.settings.buildPager && t.isFunction(s.settings.buildPager) || s.settings.pagerCustom ? (i = s.settings.buildPager(o), s.pagerEl.addClass("bx-custom-pager")) : (i = o + 1, s.pagerEl.addClass("bx-default-pager")), e += '<div class="bx-pager-item"><a href="" data-slide-index="' + o + '" class="bx-pager-link">' + i + "</a></div>";
                    s.pagerEl.html(e)
                },
                w = function() { s.settings.pagerCustom ? s.pagerEl = t(s.settings.pagerCustom) : (s.pagerEl = t('<div class="bx-pager" />'), s.settings.pagerSelector ? t(s.settings.pagerSelector).html(s.pagerEl) : s.controls.el.addClass("bx-has-pager").append(s.pagerEl), b()), s.pagerEl.on("click touchend", "a", z) },
                C = function() { s.controls.next = t('<a class="bx-next" href="">' + s.settings.nextText + "</a>"), s.controls.prev = t('<a class="bx-prev" href="">' + s.settings.prevText + "</a>"), s.controls.next.bind("click touchend", E), s.controls.prev.bind("click touchend", k), s.settings.nextSelector && t(s.settings.nextSelector).append(s.controls.next), s.settings.prevSelector && t(s.settings.prevSelector).append(s.controls.prev), s.settings.nextSelector || s.settings.prevSelector || (s.controls.directionEl = t('<div class="bx-controls-direction" />'), s.controls.directionEl.append(s.controls.prev).append(s.controls.next), s.controls.el.addClass("bx-has-controls-direction").append(s.controls.directionEl)) },
                T = function() { s.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + s.settings.startText + "</a></div>"), s.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + s.settings.stopText + "</a></div>"), s.controls.autoEl = t('<div class="bx-controls-auto" />'), s.controls.autoEl.on("click", ".bx-start", M), s.controls.autoEl.on("click", ".bx-stop", y), s.settings.autoControlsCombine ? s.controls.autoEl.append(s.controls.start) : s.controls.autoEl.append(s.controls.start).append(s.controls.stop), s.settings.autoControlsSelector ? t(s.settings.autoControlsSelector).html(s.controls.autoEl) : s.controls.el.addClass("bx-has-controls-auto").append(s.controls.autoEl), A(s.settings.autoStart ? "stop" : "start") },
                P = function() {
                    s.children.each(function(e) {
                        var i = t(this).find("img:first").attr("title");
                        void 0 !== i && ("" + i).length && t(this).append('<div class="bx-caption"><span>' + i + "</span></div>")
                    })
                },
                E = function(t) { t.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && s.settings.stopAutoOnClick && o.stopAuto(), o.goToNextSlide()) },
                k = function(t) { t.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && s.settings.stopAutoOnClick && o.stopAuto(), o.goToPrevSlide()) },
                M = function(t) { o.startAuto(), t.preventDefault() },
                y = function(t) { o.stopAuto(), t.preventDefault() },
                z = function(e) {
                    var i, n;
                    e.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && s.settings.stopAutoOnClick && o.stopAuto(), i = t(e.currentTarget), void 0 !== i.attr("data-slide-index") && (n = parseInt(i.attr("data-slide-index")), n !== s.active.index && o.goToSlide(n)))
                },
                I = function(e) { var i = s.children.length; return "short" === s.settings.pagerType ? (s.settings.maxSlides > 1 && (i = Math.ceil(s.children.length / s.settings.maxSlides)), void s.pagerEl.html(e + 1 + s.settings.pagerShortSeparator + i)) : (s.pagerEl.find("a").removeClass("active"), void s.pagerEl.each(function(i, n) { t(n).find("a").eq(e).addClass("active") })) },
                q = function() {
                    if (s.settings.infiniteLoop) {
                        var t = "";
                        0 === s.active.index ? t = s.children.eq(0).position() : s.active.index === f() - 1 && s.carousel ? t = s.children.eq((f() - 1) * x()).position() : s.active.index === s.children.length - 1 && (t = s.children.eq(s.children.length - 1).position()), t && ("horizontal" === s.settings.mode ? S(-t.left, "reset", 0) : "vertical" === s.settings.mode && S(-t.top, "reset", 0))
                    }
                    s.working = !1, s.settings.onSlideAfter.call(o, s.children.eq(s.active.index), s.oldIndex, s.active.index)
                },
                A = function(t) { s.settings.autoControlsCombine ? s.controls.autoEl.html(s.controls[t]) : (s.controls.autoEl.find("a").removeClass("active"), s.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active")) },
                D = function() { 1 === f() ? (s.controls.prev.addClass("disabled"), s.controls.next.addClass("disabled")) : !s.settings.infiniteLoop && s.settings.hideControlOnEnd && (0 === s.active.index ? (s.controls.prev.addClass("disabled"), s.controls.next.removeClass("disabled")) : s.active.index === f() - 1 ? (s.controls.next.addClass("disabled"), s.controls.prev.removeClass("disabled")) : (s.controls.prev.removeClass("disabled"), s.controls.next.removeClass("disabled"))) },
                H = function() {
                    if (s.settings.autoDelay > 0) { setTimeout(o.startAuto, s.settings.autoDelay) } else o.startAuto(), t(window).focus(function() { o.startAuto() }).blur(function() { o.stopAuto() });
                    s.settings.autoHover && o.hover(function() { s.interval && (o.stopAuto(!0), s.autoPaused = !0) }, function() { s.autoPaused && (o.startAuto(!0), s.autoPaused = null) })
                },
                W = function() { var e, i, n, r, a, l, d, c, g = 0; "next" === s.settings.autoDirection ? o.append(s.children.clone().addClass("bx-clone")) : (o.prepend(s.children.clone().addClass("bx-clone")), e = s.children.first().position(), g = "horizontal" === s.settings.mode ? -e.left : -e.top), S(g, "reset", 0), s.settings.pager = !1, s.settings.controls = !1, s.settings.autoControls = !1, s.settings.tickerHover && (s.usingCSS ? (r = "horizontal" === s.settings.mode ? 4 : 5, s.viewport.hover(function() { i = o.css("-" + s.cssPrefix + "-transform"), n = parseFloat(i.split(",")[r]), S(n, "reset", 0) }, function() { c = 0, s.children.each(function(e) { c += "horizontal" === s.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0) }), a = s.settings.speed / c, l = "horizontal" === s.settings.mode ? "left" : "top", d = a * (c - Math.abs(parseInt(n))), L(d) })) : s.viewport.hover(function() { o.stop() }, function() { c = 0, s.children.each(function(e) { c += "horizontal" === s.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0) }), a = s.settings.speed / c, l = "horizontal" === s.settings.mode ? "left" : "top", d = a * (c - Math.abs(parseInt(o.css(l)))), L(d) })), L() },
                L = function(t) {
                    var e, i, n, r = t ? t : s.settings.speed,
                        a = { left: 0, top: 0 },
                        l = { left: 0, top: 0 };
                    "next" === s.settings.autoDirection ? a = o.find(".bx-clone").first().position() : l = s.children.first().position(), e = "horizontal" === s.settings.mode ? -a.left : -a.top, i = "horizontal" === s.settings.mode ? -l.left : -l.top, n = { resetValue: i }, S(e, "ticker", r, n)
                },
                O = function(e) {
                    var i = t(window),
                        n = { top: i.scrollTop(), left: i.scrollLeft() },
                        s = e.offset();
                    return n.right = n.left + i.width(), n.bottom = n.top + i.height(), s.right = s.left + e.outerWidth(), s.bottom = s.top + e.outerHeight(), !(n.right < s.left || n.left > s.right || n.bottom < s.top || n.top > s.bottom)
                },
                F = function(t) {
                    var e = document.activeElement.tagName.toLowerCase(),
                        i = "input|textarea",
                        n = new RegExp(e, ["i"]),
                        s = n.exec(i);
                    if (null == s && O(o)) { if (39 === t.keyCode) return E(t), !1; if (37 === t.keyCode) return k(t), !1 }
                },
                N = function() { s.touch = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }, s.viewport.bind("touchstart MSPointerDown pointerdown", X), s.viewport.on("click", ".bxslider a", function(t) { s.viewport.hasClass("click-disabled") && (t.preventDefault(), s.viewport.removeClass("click-disabled")) }) },
                X = function(t) {
                    if (s.controls.el.addClass("disabled"), s.working) t.preventDefault(), s.controls.el.removeClass("disabled");
                    else {
                        s.touch.originalPos = o.position();
                        var e = t.originalEvent,
                            i = "undefined" != typeof e.changedTouches ? e.changedTouches : [e];
                        s.touch.start.x = i[0].pageX, s.touch.start.y = i[0].pageY, s.viewport.get(0).setPointerCapture && (s.pointerId = e.pointerId, s.viewport.get(0).setPointerCapture(s.pointerId)), s.viewport.bind("touchmove MSPointerMove pointermove", V), s.viewport.bind("touchend MSPointerUp pointerup", R), s.viewport.bind("MSPointerCancel pointercancel", Y)
                    }
                },
                Y = function(t) { S(s.touch.originalPos.left, "reset", 0), s.controls.el.removeClass("disabled"), s.viewport.unbind("MSPointerCancel pointercancel", Y), s.viewport.unbind("touchmove MSPointerMove pointermove", V), s.viewport.unbind("touchend MSPointerUp pointerup", R), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId) },
                V = function(t) {
                    var e = t.originalEvent,
                        i = "undefined" != typeof e.changedTouches ? e.changedTouches : [e],
                        n = Math.abs(i[0].pageX - s.touch.start.x),
                        o = Math.abs(i[0].pageY - s.touch.start.y),
                        r = 0,
                        a = 0;
                    3 * n > o && s.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * o > n && s.settings.preventDefaultSwipeY && t.preventDefault(), "fade" !== s.settings.mode && s.settings.oneToOneTouch && ("horizontal" === s.settings.mode ? (a = i[0].pageX - s.touch.start.x, r = s.touch.originalPos.left + a) : (a = i[0].pageY - s.touch.start.y, r = s.touch.originalPos.top + a), S(r, "reset", 0))
                },
                R = function(t) {
                    s.viewport.unbind("touchmove MSPointerMove pointermove", V), s.controls.el.removeClass("disabled");
                    var e = t.originalEvent,
                        i = "undefined" != typeof e.changedTouches ? e.changedTouches : [e],
                        n = 0,
                        r = 0;
                    s.touch.end.x = i[0].pageX, s.touch.end.y = i[0].pageY, "fade" === s.settings.mode ? (r = Math.abs(s.touch.start.x - s.touch.end.x), r >= s.settings.swipeThreshold && (s.touch.start.x > s.touch.end.x ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto())) : ("horizontal" === s.settings.mode ? (r = s.touch.end.x - s.touch.start.x, n = s.touch.originalPos.left) : (r = s.touch.end.y - s.touch.start.y, n = s.touch.originalPos.top), !s.settings.infiniteLoop && (0 === s.active.index && r > 0 || s.active.last && r < 0) ? S(n, "reset", 200) : Math.abs(r) >= s.settings.swipeThreshold ? (r < 0 ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto()) : S(n, "reset", 200)), s.viewport.unbind("touchend MSPointerUp pointerup", R), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId)
                },
                Z = function(e) {
                    if (s.initialized)
                        if (s.working) window.setTimeout(Z, 10);
                        else {
                            var i = t(window).width(),
                                n = t(window).height();
                            r === i && a === n || (r = i, a = n, o.redrawSlider(), s.settings.onSliderResize.call(o, s.active.index))
                        }
                },
                B = function(t) {
                    var e = v();
                    s.settings.ariaHidden && !s.settings.ticker && (s.children.attr("aria-hidden", "true"), s.children.slice(t, t + e).attr("aria-hidden", "false"))
                },
                U = function(t) { return t < 0 ? s.settings.infiniteLoop ? f() - 1 : s.active.index : t >= f() ? s.settings.infiniteLoop ? 0 : s.active.index : t };
            return o.goToSlide = function(e, i) {
                var n, r, a, l, d = !0,
                    c = 0,
                    g = { left: 0, top: 0 },
                    u = null;
                if (s.oldIndex = s.active.index, s.active.index = U(e), !s.working && s.active.index !== s.oldIndex) { if (s.working = !0, d = s.settings.onSlideBefore.call(o, s.children.eq(s.active.index), s.oldIndex, s.active.index), "undefined" != typeof d && !d) return s.active.index = s.oldIndex, void(s.working = !1); "next" === i ? s.settings.onSlideNext.call(o, s.children.eq(s.active.index), s.oldIndex, s.active.index) || (d = !1) : "prev" === i && (s.settings.onSlidePrev.call(o, s.children.eq(s.active.index), s.oldIndex, s.active.index) || (d = !1)), s.active.last = s.active.index >= f() - 1, (s.settings.pager || s.settings.pagerCustom) && I(s.active.index), s.settings.controls && D(), "fade" === s.settings.mode ? (s.settings.adaptiveHeight && s.viewport.height() !== p() && s.viewport.animate({ height: p() }, s.settings.adaptiveHeightSpeed), s.children.filter(":visible").fadeOut(s.settings.speed).css({ zIndex: 0 }), s.children.eq(s.active.index).css("zIndex", s.settings.slideZIndex + 1).fadeIn(s.settings.speed, function() { t(this).css("zIndex", s.settings.slideZIndex), q() })) : (s.settings.adaptiveHeight && s.viewport.height() !== p() && s.viewport.animate({ height: p() }, s.settings.adaptiveHeightSpeed), !s.settings.infiniteLoop && s.carousel && s.active.last ? "horizontal" === s.settings.mode ? (u = s.children.eq(s.children.length - 1), g = u.position(), c = s.viewport.width() - u.outerWidth()) : (n = s.children.length - s.settings.minSlides, g = s.children.eq(n).position()) : s.carousel && s.active.last && "prev" === i ? (r = 1 === s.settings.moveSlides ? s.settings.maxSlides - x() : (f() - 1) * x() - (s.children.length - s.settings.maxSlides), u = o.children(".bx-clone").eq(r), g = u.position()) : "next" === i && 0 === s.active.index ? (g = o.find("> .bx-clone").eq(s.settings.maxSlides).position(), s.active.last = !1) : e >= 0 && (l = e * parseInt(x()), g = s.children.eq(l).position()), "undefined" != typeof g ? (a = "horizontal" === s.settings.mode ? -(g.left - c) : -g.top, S(a, "slide", s.settings.speed)) : s.working = !1), s.settings.ariaHidden && B(s.active.index * x()) }
            }, o.goToNextSlide = function() {
                if (s.settings.infiniteLoop || !s.active.last) {
                    var t = parseInt(s.active.index) + 1;
                    o.goToSlide(t, "next")
                }
            }, o.goToPrevSlide = function() {
                if (s.settings.infiniteLoop || 0 !== s.active.index) {
                    var t = parseInt(s.active.index) - 1;
                    o.goToSlide(t, "prev")
                }
            }, o.startAuto = function(t) { s.interval || (s.interval = setInterval(function() { "next" === s.settings.autoDirection ? o.goToNextSlide() : o.goToPrevSlide() }, s.settings.pause), s.settings.autoControls && t !== !0 && A("stop")) }, o.stopAuto = function(t) { s.interval && (clearInterval(s.interval), s.interval = null, s.settings.autoControls && t !== !0 && A("start")) }, o.getCurrentSlide = function() { return s.active.index }, o.getCurrentSlideElement = function() { return s.children.eq(s.active.index) }, o.getSlideElement = function(t) { return s.children.eq(t) }, o.getSlideCount = function() { return s.children.length }, o.isWorking = function() { return s.working }, o.redrawSlider = function() { s.children.add(o.find(".bx-clone")).outerWidth(h()), s.viewport.css("height", p()), s.settings.ticker || m(), s.active.last && (s.active.index = f() - 1), s.active.index >= f() && (s.active.last = !0), s.settings.pager && !s.settings.pagerCustom && (b(), I(s.active.index)), s.settings.ariaHidden && B(s.active.index * x()) }, o.destroySlider = function() { s.initialized && (s.initialized = !1, t(".bx-clone", this).remove(), s.children.each(function() { void 0 !== t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style") }), void 0 !== t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), s.controls.el && s.controls.el.remove(), s.controls.next && s.controls.next.remove(), s.controls.prev && s.controls.prev.remove(), s.pagerEl && s.settings.controls && !s.settings.pagerCustom && s.pagerEl.remove(), t(".bx-caption", this).remove(), s.controls.autoEl && s.controls.autoEl.remove(), clearInterval(s.interval), s.settings.responsive && t(window).unbind("resize", Z), s.settings.keyboardEnabled && t(document).unbind("keydown", F), t(this).removeData("bxSlider")) }, o.reloadSlider = function(e) { void 0 !== e && (n = e), o.destroySlider(), l(), t(o).data("bxSlider", this) }, l(), t(o).data("bxSlider", this), this
        }
    }
}(jQuery);

/* Hero Slider  */
jQuery(document).ready(function($) {
    var slidesWrapper = $('.cd-hero-slider');

    //check if a .cd-hero-slider exists in the DOM 
    if (slidesWrapper.length > 0) {
        var primaryNav = $('.cd-primary-nav'),
            sliderNav = $('.cd-slider-nav'),
            navigationMarker = $('.cd-marker'),
            slidesNumber = slidesWrapper.children('li').length,
            visibleSlidePosition = 0,
            autoPlayId,
            autoPlayDelay = 5000;

        //upload videos (if not on mobile devices)
        uploadVideo(slidesWrapper);

        //autoplay slider
        setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

        //on mobile - open/close primary navigation clicking/tapping the menu icon
        primaryNav.on('click', function(event) {
            if ($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
        });

        //change visible slide
        sliderNav.on('click', 'li', function(event) {
            event.preventDefault();
            var selectedItem = $(this);
            if (!selectedItem.hasClass('selected')) {
                // if it's not already selected
                var selectedPosition = selectedItem.index(),
                    activePosition = slidesWrapper.find('li.selected').index();

                if (activePosition < selectedPosition) {
                    nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
                } else {
                    prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
                }

                //this is used for the autoplay
                visibleSlidePosition = selectedPosition;

                updateSliderNavigation(sliderNav, selectedPosition);
                updateNavigationMarker(navigationMarker, selectedPosition + 1);
                //reset autoplay
                setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
            }
        });
    }

    function nextSlide(visibleSlide, container, pagination, n) {
        visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            visibleSlide.removeClass('is-moving');
        });

        container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
        checkVideo(visibleSlide, container, n);
    }

    function prevSlide(visibleSlide, container, pagination, n) {
        visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            visibleSlide.removeClass('is-moving');
        });

        container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
        checkVideo(visibleSlide, container, n);
    }

    function updateSliderNavigation(pagination, n) {
        var navigationDot = pagination.find('.selected');
        navigationDot.removeClass('selected');
        pagination.find('li').eq(n).addClass('selected');
    }

    function setAutoplay(wrapper, length, delay) {
        if (wrapper.hasClass('autoplay')) {
            clearInterval(autoPlayId);
            autoPlayId = window.setInterval(function() { autoplaySlider(length) }, delay);
        }
    }

    function autoplaySlider(length) {
        if (visibleSlidePosition < length - 1) {
            nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
            visibleSlidePosition += 1;
        } else {
            prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
            visibleSlidePosition = 0;
        }
        updateNavigationMarker(navigationMarker, visibleSlidePosition + 1);
        updateSliderNavigation(sliderNav, visibleSlidePosition);
    }

    function uploadVideo(container) {
        container.find('.cd-bg-video-wrapper').each(function() {
            var videoWrapper = $(this);
            if (videoWrapper.is(':visible')) {
                // if visible - we are not on a mobile device 
                var videoUrl = videoWrapper.data('video'),
                    video = $('<video loop><source src="' + videoUrl + '.mp4" type="video/mp4" /><source src="' + videoUrl + '.webm" type="video/webm" /></video>');
                video.appendTo(videoWrapper);
                // play video if first slide
                if (videoWrapper.parent('.cd-bg-video.selected').length > 0) video.get(0).play();
            }
        });
    }

    function checkVideo(hiddenSlide, container, n) {
        //check if a video outside the viewport is playing - if yes, pause it
        var hiddenVideo = hiddenSlide.find('video');
        if (hiddenVideo.length > 0) hiddenVideo.get(0).pause();

        //check if the select slide contains a video element - if yes, play the video
        var visibleVideo = container.children('li').eq(n).find('video');
        if (visibleVideo.length > 0) visibleVideo.get(0).play();
    }

    function updateNavigationMarker(marker, n) {
        marker.removeClassPrefix('item').addClass('item-' + n);
    }

    $.fn.removeClassPrefix = function(prefix) {
        //remove all classes starting with 'prefix'
        this.each(function(i, el) {
            var classes = el.className.split(" ").filter(function(c) {
                return c.lastIndexOf(prefix, 0) !== 0;
            });
            el.className = $.trim(classes.join(" "));
        });
        return this;
    };
});

/* PgSlider */
(function(d, c, b, e) {
    function a(f, h, g) {
        if (h.charAt(0) === "*") { f[h.substring(1)] = g } else {
            f["-ms-" + h] = g;
            f["-webkit-" + h] = g;
            f[h] = g
        }
    }
    d.fn.precss = function(g) {
        var f = {};
        if (arguments.length === 1) { for (style in g) { if (g.hasOwnProperty(style)) { a(f, style, g[style]) } } } else { a(f, arguments[0], arguments[1]) }
        this.css(f);
        return this
    }
})(jQuery, window, document);
(function(d, f, g, a) {
    var c = function(n) {
        var m = false;
        var l = "Webkit Moz ms O".split(" ");
        var o = g.createElement("div");
        var j = null;
        n = n.toLowerCase();
        if (o.style[n]) { m = true }
        if (m === false) { j = n.charAt(0).toUpperCase() + n.substr(1); for (var k = 0; k < l.length; k++) { if (o.style[l[k] + j] !== a) { m = true; break } } }
        return m
    };
    var i = {};
    i.animation = c("animation");
    i.transition = c("transition");
    i.transform = c("transform");
    var e = "pogoSlider";
    var b = { autoplayTimeout: 4000, autoplay: true, baseZindex: 1, displayProgess: true, onSlideStart: null, onSlideEnd: null, onSliderPause: null, onSliderResume: null, slideTransition: "slide", slideTransitionDuration: 1000, elementTransitionStart: 500, elementTransitionDuration: 1000, elementTransitionIn: "slideUp", elementTransitionOut: "slideDown", generateButtons: true, buttonPosition: "CenterHorizontal", generateNav: true, navPosition: "Bottom", preserveTargetSize: false, targetWidth: 1000, targetHeight: 300, responsive: false, pauseOnHover: true };

    function h(k, j) {
        this.element = k;
        this.$element = d(k);
        this.settings = d.extend({}, b, j);
        this.currentSlideIndex = 0;
        this.prevSlideIndex = 0;
        this.slideTimeoutId = 0;
        this.slides = [];
        this.calls = [];
        this.paused = false;
        this.navigating = false;
        this.slideStartTime = null;
        this.slideTimeRemaining = 0;
        this._init()
    }
    h.prototype = {
        _init: function() {
            var k = this;
            k.$element.find(".pogoSlider-slide").each(function() {
                var n = [];
                var o = 0;
                d(this).data("original-styles", d(this).attr("style"));
                d(this).find(".pogoSlider-slide-element").each(function() {
                    var p = parseInt(d(this).data("start")) !== a ? d(this).data("start") : k.settings.elementTransitionStart;
                    var q = parseInt(d(this).data("duration")) || k.settings.elementTransitionDuration;
                    if ((p + q) > o) { o = (p + q) }
                    n.push({ $element: d(this), element: this, startTime: p, duration: q, transitionIn: d(this).data("in") || k.settings.elementTransitionIn, transitionOut: d(this).data("out") || k.settings.elementTransitionOut });
                    d(this).css("opacity", 0)
                });
                var m = { $element: d(this), element: this, transition: d(this).data("transition") || k.settings.slideTransition, duration: parseInt(d(this).data("duration")) || k.settings.slideTransitionDuration, elementTransitionDuration: o, totalSlideDuration: k.settings.autoplayTimeout + o, children: n };
                k.slides.push(m)
            });
            k.numSlides = k.slides.length;
            k.slides[0].$element.css("opacity", 1);
            if (k.settings.autoplay && k.settings.displayProgess) { k._createProgessBar() }
            k.$element.css("padding-bottom", (100 / (k.settings.targetWidth / k.settings.targetHeight)) + "%");
            var j = k.$element.find("img").length;
            if (j > 0) {
                var l = 0;
                k.$element.prepend('<div class="pogoSlider-loading"><div class="pogoSlider-loading-icon"></div></div>');
                k.$element.find("img").one("load", function() {
                    if (++l === j) {
                        d(".pogoSlider-loading").remove();
                        k._onSliderReady()
                    }
                }).each(function() { if (this.complete) { d(this).trigger("load") } })
            } else { k._onSliderReady() }
        },
        _onSliderReady: function() {
            var j = this;
            if (j.settings.autoplay) {
                j.slideStartTime = new Date();
                j.slideTimeRemaining = j.slides[0].totalSlideDuration;
                j._slideTimeout(j.slideTimeRemaining)
            }
            if (j.settings.generateButtons && j.slides.length > 1) { j._createDirButtons() }
            if (j.settings.generateNav && j.slides.length > 1) { j._createNavigation() }
            if (j.settings.preserveTargetSize) { j._preserveTargetSize(); if (j.settings.responsive) { d(f).on("resize", function() { j._preserveTargetSize() }) } }
            if (j.settings.pauseOnHover) {
                j.$element.on("mouseenter", function() { j.pause() });
                j.$element.on("mouseleave", function() { j.resume() })
            }
            j._onSlideStart(0)
        },
        _createDirButtons: function() {
            var j = this;
            j.$element.addClass("pogoSlider--dir" + j.settings.buttonPosition);
            d('<button class="pogoSlider-dir-btn pogoSlider-dir-btn--prev"></button>').appendTo(j.$element).on("click", function() { j.prevSlide() });
            d('<button class="pogoSlider-dir-btn pogoSlider-dir-btn--next"></button>').appendTo(j.$element).on("click", function() { j.nextSlide() })
        },
        _createNavigation: function() {
            var j = this;
            j.$element.addClass("pogoSlider--nav" + j.settings.navPosition);
            var l = d('<ul class="pogoSlider-nav"></ul>').appendTo(j.$element);
            for (var k = 0; k < j.slides.length; k++) { d('<li data-num="' + k + '"><button class="pogoSlider-nav-btn"></button></li>').appendTo(l).on("click", function() { j.toSlide(d(this).data("num")) }) }
        },
        getAppliedProps: function(o) {
            var y = g.styleSheets;
            var m = new RegExp("{(.+)}");
            o.matches = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.msMatchesSelector || o.oMatchesSelector;
            var p = o.getAttribute("style").replace(/ /g, "").split(";");
            var w = [];
            for (var q = 0; q < p.length; q++) { var x = p[q].split(":")[0]; if (x && w.indexOf(x) === -1) { w.push(x) } }
            for (var v in y) { if (y.hasOwnProperty(v)) { var u = y[v].rules || y[v].cssRules; for (var l in u) { if (o.matches(u[l].selectorText)) { var t = m.exec(u[l].cssText.replace(/ /g, "")); if (t) { var z = t[1].split(";"); for (var s = 0; s < z.length; s++) { var n = z[s].split(":")[0]; if (n && w.indexOf(n) === -1) { w.push(n) } } } } } } }
            return w
        },
        _preserveTargetSize: function() {
            var k = this;
            var n = new RegExp("px|%|em", "i");
            var l = new RegExp("[0-9]*.?[0-9]+");
            var j = new RegExp("px", "i");
            var m = 1;
            if (this.scaledBy) { m = (this.$element.width() / this.settings.targetWidth) / this.scaledBy } else { m = this.$element.width() / this.settings.targetWidth }
            this.scaledBy = this.$element.width() / this.settings.targetWidth;
            this.$element.find(".pogoSlider-slide-element").each(function() {
                var p = f.getComputedStyle(this);
                var r = k.getAppliedProps(this);
                var u = {};
                if (!d.data(k, "originalStyles")) { d.data(k, "originalStyles", d(this).attr("style")) }
                for (var s = 0; s < r.length; s++) { var o = p.getPropertyValue(r[s]); if (n.test(o) && l.test(o)) { var t = l.exec(o); var q = n.exec(o); if (j.test(q[0])) { u[r[s]] = Math.ceil(t[0] * m) + q[0] } else { u[r[s]] = (t[0] * m) + q[0] } } }
                d(this).css(u)
            })
        },
        _createProgessBar: function() {
            var k = "";
            k += '<div class="pogoSlider-progressBar">';
            k += '<div class="pogoSlider-progressBar-duration"></div>';
            k += "</div>";
            for (var j = 0; j < this.slides.length; j++) { this.slides[j].$element.prepend(k) }
        },
        _slideTimeout: function(j) {
            var k = this;
            var l;
            l = k.slideTimeoutId = setTimeout(function() { if (!k.paused && l === k.slideTimeoutId) { k._changeToNext() } }, j)
        },
        pause: function() {
            if (this.settings.autoplay) {
                this.paused = true;
                clearTimeout(this.slideTimeoutId);
                if (this.settings.displayProgess) { this.$element.find(".pogoSlider-progressBar-duration").stop(true) }
                this.slidePauseTime = new Date();
                this.slideTimeRemaining = this.slideTimeRemaining - ((new Date()) - this.slideStartTime);
                for (var j = 0; j < this.slides[this.currentSlideIndex].children.length; j++) { this.slides[this.currentSlideIndex].children[j].$element.precss("animation-play-state", "paused") }
                if (this.settings.onSliderPause) { this.settings.onSliderPause.apply(this) }
            }
        },
        resume: function() {
            if (this.settings.autoplay) {
                this.paused = false;
                this.slideStartTime = new Date();
                for (var j = 0; j < this.slides[this.currentSlideIndex].children.length; j++) { this.slides[this.currentSlideIndex].children[j].$element.precss("animation-play-state", "") }
                if (this.slideTimeRemaining > 0 && !this.navigating) {
                    if (this.settings.displayProgess) { this.$element.find(".pogoSlider-progressBar-duration").animate({ "width": "100%" }, this.slideTimeRemaining, "linear") }
                    this._slideTimeout(this.slideTimeRemaining)
                }
                if (this.settings.onSliderResume) { this.settings.onSliderResume.apply(this) }
            }
        },
        nextSlide: function() {
            if (!this.navigating) {
                clearTimeout(this.slideTimeoutId);
                this.prevSlideIndex = this.currentSlideIndex;
                if (++this.currentSlideIndex > (this.numSlides - 1)) { this.currentSlideIndex = 0 }
                this._changeSlide(this.prevSlideIndex, this.currentSlideIndex)
            }
        },
        prevSlide: function() {
            if (!this.navigating) {
                clearTimeout(this.slideTimeoutId);
                this.prevSlideIndex = this.currentSlideIndex;
                if (--this.currentSlideIndex < 0) { this.currentSlideIndex = this.numSlides - 1 }
                this._changeSlide(this.prevSlideIndex, this.currentSlideIndex)
            }
        },
        toSlide: function(j) {
            if (!this.navigating) {
                clearTimeout(this.slideTimeoutId);
                if (j === this.currentSlideIndex || j > (this.slides.length - 1)) { return }
                this.prevSlideIndex = this.currentSlideIndex;
                this.currentSlideIndex = j;
                this._changeSlide(this.prevSlideIndex, this.currentSlideIndex)
            }
        },
        destroy: function() {
            this.paused = true;
            clearTimeout(this.slideTimeoutId);
            d.removeData(this.element, "plugin_" + e)
        },
        _changeToNext: function() {
            this.prevSlideIndex = this.currentSlideIndex;
            if (++this.currentSlideIndex > (this.numSlides - 1)) { this.currentSlideIndex = 0 }
            this._changeSlide(this.prevSlideIndex, this.currentSlideIndex)
        },
        _changeSlide: function(m, o) {
            var j = this;
            var n;
            j._onSlideEnd(m);
            j.navigating = true;
            if (i.animation && i.transition && i.transform) { n = j.slideTransitions } else { n = j.compatSlideTransitions }
            var k = n[j.slides[o].transition] ? j.slides[o].transition : "slide";
            var l = n[k].apply(j, [m, o]);
            setTimeout(function() {
                if (l) { l() }
                j.navigating = false;
                j._slideCleanup(m, false);
                j._slideElementCleanup(m);
                if (j.settings.autoplay) { j._slideTimeout(j.slides[o].totalSlideDuration) }
                j._onSlideStart(o)
            }, j.slides[o].duration)
        },
        _onSlideStart: function(k) {
            this.slides[k].$element.css("z-index", 1);
            if (this.settings.autoplay) {
                this.slideStartTime = new Date();
                this.slideTimeRemaining = this.slides[k].totalSlideDuration;
                if (this.settings.displayProgess && !this.paused) { this.slides[k].$element.find(".pogoSlider-progressBar-duration").css("width", "0").animate({ "width": "100%" }, this.slideTimeRemaining, "linear") }
            }
            if (this.slides[k].children.length > 0) { this._slideElementsTransitionIn(k) }
            if (this.paused) { for (var j = 0; j < this.slides[k].children.length; j++) { this.slides[k].children[j].$element.precss("animation-play-state", "paused") } }
            if (this.settings.generateNav) {
                this.$element.find(".pogoSlider-nav-btn").removeClass("pogoSlider-nav-btn--selected");
                this.$element.find(".pogoSlider-nav-btn").eq(k).addClass("pogoSlider-nav-btn--selected")
            }
            if (this.settings.onSlideStart) { this.settings.onSlideStart.apply(this) }
        },
        _onSlideEnd: function(l) {
            var k;
            if (this.settings.autoplay) { if (this.settings.displayProgess) { this.slides[l].$element.find(".pogoSlider-progressBar-duration").stop(true).css("width", "0") } }
            if (this.paused) {
                k = this.slides[l].totalSlideDuration - this.slideTimeRemaining;
                for (var j = 0; j < this.slides[l].children.length; j++) { this.slides[l].children[j].$element.precss("animation-play-state", "") }
            } else { k = this.slides[l].totalSlideDuration - (this.slideTimeRemaining - ((new Date()) - this.slideStartTime)) }
            if (this.slides[l].children.length > 0 && k > this.slides[l].elementTransitionDuration) { this._slideElementsTransitionOut(l) }
            if (this.settings.onSlideEnd) { this.settings.onSlideEnd.apply(this) }
        },
        _slideElementsTransitionIn: function(l) {
            for (var j = 0; j < this.slides[l].children.length; j++) {
                var k = this.slides[l].children[j];
                k.$element.precss({ "*opacity": 1, "animation-duration": k.duration + "ms", "animation-delay": k.startTime + "ms" }).addClass("pogoSlider-animation-" + k.transitionIn + "In")
            }
        },
        _slideElementsTransitionOut: function(l) {
            for (var j = 0; j < this.slides[l].children.length; j++) {
                var k = this.slides[l].children[j];
                k.$element.precss("animation-delay", "").removeClass("pogoSlider-animation-" + k.transitionIn + "In").addClass("pogoSlider-animation-" + k.transitionOut + "Out")
            }
        },
        _slideCleanup: function(k, j) {
            if (this.slides[k].$element.find(".pogoSlider-slide-slice").length > 0) { this._removeSlideSlices(k) }
            this.slides[k].$element.attr("style", this.slides[k].$element.data("original-styles")).css("opacity", j ? "1" : "0")
        },
        _slideElementCleanup: function(m) {
            var j = function(n, o) { return (o.match(/pogoSlider-(?:(?:transition)|(?:animation))(?:-[a-zA-Z0-9]+)?(?:--[a-z]+)?/gi) || []).join(" ") };
            var l = function(n, o) { return o.replace(/(?:-webkit-)?(?:-ms-)?((?:transition)|(?:animation))[^;]+;/g, "") };
            this.slides[m].$element.find(".pogoSlider-progressBar-duration").css("width", "0");
            for (var k = 0; k < this.slides[m].children.length; k++) { this.slides[m].children[k].$element.removeClass(j).attr("style", l).css("opacity", 0) }
        },
        _createSlideSlices: function(A, q, r) {
            var p = r * q;
            var n = 100 / r;
            var l = 100 / q;
            var t = 100 * r;
            var s = 100 * q;
            var C = this.slides[A].$element;
            var B = C.attr("style");
            var m;
            if (this.paused) { m = this.slides[A].totalSlideDuration - this.slideTimeRemaining } else { m = this.slides[A].totalSlideDuration - (this.slideTimeRemaining - ((new Date()) - this.slideStartTime)) }
            if (A === this.prevSlideIndex && this.slides[A].children.length > 0 && m < this.slides[A].elementTransitionDuration) {
                for (var x = 0; x < this.slides[A].children.length; x++) {
                    var k = (this.slides[A].children[x].startTime - m) + "ms";
                    this.slides[A].children[x].$element.precss("animation-delay", k)
                }
            }
            C.children().wrapAll('<div class="pogoSlider-slide-slice" style="' + "width:" + n + "%;height:" + l + "%;top:0%;left:0%;" + '"/>').wrapAll('<div class="pogoSlider-slide-slice-inner" style="' + B + "width:" + t + "%;height:" + s + "%;top:0%;left:0%;" + '"/>');
            C.attr("style", function(j, D) { return D.replace(/(?:background)[^;]+;/g, "") });
            for (var w = 0; w < p; w++) {
                var o = w % q;
                var z = Math.floor(w / q);
                var u = "width:" + n + "%;height:" + l + "%;top:" + (l * o) + "%;left:" + (n * z) + "%;";
                var v = "width:" + t + "%;height:" + s + "%;top:-" + (100 * o) + "%;left:-" + (100 * z) + "%;";
                var y = "";
                if (this.settings.preserveTargetSize) {
                    y = "background-size:" + this.$element.width() + "px " + parseFloat(this.$element.css("padding-bottom")) + "px;";
                    console.log(y)
                }
                C.find(".pogoSlider-slide-slice").last().clone(true, true).appendTo(this.slides[A].element).attr("style", u).find(".pogoSlider-slide-slice-inner").attr("style", B + v + y)
            }
        },
        _removeSlideSlices: function(l) {
            var j = this;
            var k = j.slides[l].$element;
            k.attr("style", k.data("original-styles"));
            k.find(".pogoSlider-slide-slice").not(":first").remove();
            k.find(".pogoSlider-slide-slice-inner").children().unwrap();
            k.find(".pogoSlider-slide-slice").children().unwrap()
        },
        _generateARandomArray: function(q) {
            var l = [];
            for (var p = 0; p < q; p++) { l.push(p) }
            for (var o = l.length - 1; o > 0; o--) {
                var n = Math.floor(Math.random() * (o + 1));
                var m = l[o];
                l[o] = l[n];
                l[n] = m
            }
            return l
        },
        slideTransitions: {
            fade: function(j, l) {
                var k = this.slides[l];
                this.slides[j].$element.precss({ "*opacity": "0", "transition-duration": k.duration + "ms" });
                k.$element.precss({ "*opacity": "1", "transition-duration": k.duration + "ms" })
            },
            slide: function(j, k) { var l; if (k === 0 && j === this.slides.length - 1) { l = "slideLeft" } else { if (j === 0 && k === this.slides.length - 1) { l = "slideRight" } else { if (k > j) { l = "slideLeft" } else { l = "slideRight" } } } return this.slideTransitions[l].apply(this, [j, k]) },
            verticalSlide: function(j, k) { var l; if (k === 0 && j === this.slides.length - 1) { l = "slideUp" } else { if (j === 0 && k === this.slides.length - 1) { l = "slideDown" } else { if (k > j) { l = "slideUp" } else { l = "slideDown" } } } return this.slideTransitions[l].apply(this, [j, k]) },
            slideLeft: function(k, m) {
                var j = this;
                var l = j.slides[m];
                j.slides[k].$element.precss("animation-duration", l.duration + "ms").addClass("pogoSlider-animation-leftOut");
                l.$element.precss({ "*opacity": "1", "animation-duration": l.duration + "ms" }).addClass("pogoSlider-animation-leftIn");
                return function() {
                    j.slides[k].$element.removeClass("pogoSlider-animation-leftOut");
                    l.$element.attr("style", l.$element.data("original-styles")).css("opacity", "1").removeClass("pogoSlider-animation-leftIn")
                }
            },
            slideRight: function(k, m) {
                var j = this;
                var l = j.slides[m];
                j.slides[k].$element.precss("animation-duration", l.duration + "ms").addClass("pogoSlider-animation-rightOut");
                l.$element.precss({ "*opacity": "1", "animation-duration": l.duration + "ms" }).addClass("pogoSlider-animation-rightIn");
                return function() {
                    j.slides[k].$element.removeClass("pogoSlider-animation-rightOut");
                    l.$element.attr("style", l.$element.data("original-styles")).css("opacity", "1").removeClass("pogoSlider-animation-rightIn")
                }
            },
            slideUp: function(k, m) {
                var j = this;
                var l = j.slides[m];
                j.slides[k].$element.precss("animation-duration", l.duration + "ms").addClass("pogoSlider-animation-upOut");
                l.$element.precss({ "*opacity": "1", "animation-duration": l.duration + "ms" }).addClass("pogoSlider-animation-upIn");
                return function() {
                    j.slides[k].$element.removeClass("pogoSlider-animation-upOut");
                    l.$element.attr("style", l.$element.data("original-styles")).css("opacity", "1").removeClass("pogoSlider-animation-upIn")
                }
            },
            slideDown: function(k, m) {
                var j = this;
                var l = j.slides[m];
                j.slides[k].$element.precss("animation-duration", l.duration + "ms").addClass("pogoSlider-animation-downOut");
                l.$element.precss({ "*opacity": "1", "animation-duration": l.duration + "ms" }).addClass("pogoSlider-animation-downIn");
                return function() {
                    j.slides[k].$element.removeClass("pogoSlider-animation-downOut");
                    l.$element.attr("style", l.$element.data("original-styles")).css("opacity", "1").removeClass("pogoSlider-animation-downIn")
                }
            },
            slideRevealLeft: function(k, m) {
                var j = this;
                var l = j.slides[m];
                j.slides[k].$element.precss({ "*z-index": j.settings.baseZindex + 1, "animation-duration": l.duration + "ms" }).addClass("pogoSlider-animation-leftOut");
                l.$element.css({ "opacity": 1, "z-index": j.settings.baseZindex });
                return function() { j.slides[k].$element.removeClass("pogoSlider-animation-leftOut") }
            },
            slideRevealRight: function(k, m) {
                var j = this;
                var l = j.slides[m];
                j.slides[k].$element.precss({ "*z-index": j.settings.baseZindex + 1, "animation-duration": l.duration + "ms" }).addClass("pogoSlider-animation-rightOut");
                l.$element.css({ "opacity": 1, "z-index": j.settings.baseZindex });
                return function() { j.slides[k].$element.removeClass("pogoSlider-animation-rightOut") }
            },
            slideOverLeft: function(j, l) {
                var k = this.slides[l];
                k.$element.precss({ "*opacity": "1", "*z-index": this.settings.baseZindex + 1, "animation-duration": k.duration + "ms" }).addClass("pogoSlider-animation-leftIn");
                return function() { k.$element.attr("style", k.$element.data("original-styles")).css("opacity", "1").removeClass("pogoSlider-animation-leftIn") }
            },
            slideOverRight: function(j, l) {
                var k = this.slides[l];
                k.$element.precss({ "*opacity": "1", "*z-index": this.settings.baseZindex + 1, "animation-duration": k.duration + "ms" }).addClass("pogoSlider-animation-rightIn");
                return function() { k.$element.attr("style", k.$element.data("original-styles")).css("opacity", "1").removeClass("pogoSlider-animation-rightIn") }
            },
            expandReveal: function(k, m) {
                var j = this;
                var l = j.slides[m];
                j.$element.css("overflow", "visible");
                j.slides[k].$element.precss({ "*z-index": j.settings.baseZindex + 1, "animation-duration": l.duration + "ms" }).addClass("pogoSlider-animation-expandReveal");
                l.$element.css({ "opacity": 1, "z-index": j.settings.baseZindex });
                return function() {
                    j.$element.css("overflow", "");
                    j.slides[k].$element.removeClass("pogoSlider-animation-expandReveal")
                }
            },
            shrinkReveal: function(k, m) {
                var j = this;
                var l = j.slides[m];
                j.slides[k].$element.precss({ "*z-index": j.settings.baseZindex + 1, "animation-duration": l.duration + "ms" }).addClass("pogoSlider-animation-shrinkReveal");
                l.$element.css({ "opacity": 1, "z-index": j.settings.baseZindex });
                return function() { j.slides[k].$element.removeClass("pogoSlider-animation-shrinkReveal") }
            },
            verticalSplitReveal: function(l, n) {
                var k = this;
                var m = k.slides[n];
                k.slides[l].$element.css("z-index", k.settings.baseZindex + 1);
                m.$element.css({ "opacity": 1, "z-index": k.settings.baseZindex });
                k._createSlideSlices(l, 1, 2);
                var j = k.slides[l].$element.find(".pogoSlider-slide-slice");
                j.precss("animation-duration", m.duration + "ms");
                j.eq(0).addClass("pogoSlider-animation-leftOut");
                j.eq(1).addClass("pogoSlider-animation-rightOut")
            },
            horizontalSplitReveal: function(l, n) {
                var k = this;
                var m = k.slides[n];
                k.slides[l].$element.css("z-index", k.settings.baseZindex + 1);
                m.$element.css({ "opacity": 1, "z-index": k.settings.baseZindex });
                k._createSlideSlices(l, 2, 1);
                var j = k.slides[l].$element.find(".pogoSlider-slide-slice");
                j.precss("animation-duration", m.duration + "ms");
                j.eq(0).addClass("pogoSlider-animation-upOut");
                j.eq(1).addClass("pogoSlider-animation-downOut")
            },
            zipReveal: function(l, n) {
                var k = this;
                var m = k.slides[n];
                k.slides[l].$element.css("z-index", k.settings.baseZindex + 1);
                m.$element.css({ "opacity": 1, "z-index": k.settings.baseZindex });
                k._createSlideSlices(l, 1, Math.round(k.$element.width() / 100));
                var j = k.slides[l].$element.find(".pogoSlider-slide-slice");
                j.precss("animation-duration", m.duration + "ms");
                j.each(function(o) { if (o % 2 === 0) { d(this).addClass("pogoSlider-animation-upOut") } else { d(this).addClass("pogoSlider-animation-downOut") } })
            },
            barRevealDown: function(j, k) { return this.slideTransitions["barReveal"].apply(this, [j, k, "down"]) },
            barRevealUp: function(j, k) { return this.slideTransitions["barReveal"].apply(this, [j, k, "up"]) },
            barReveal: function(o, q, n) {
                var k = this;
                var p = k.slides[q];
                k.slides[o].$element.css("z-index", k.settings.baseZindex + 1);
                p.$element.css({ "opacity": 1, "z-index": k.settings.baseZindex });
                k._createSlideSlices(o, 1, Math.round(k.$element.width() / 100));
                var j = k.slides[o].$element.find(".pogoSlider-slide-slice");
                var l = p.duration / (j.length + 1);
                var m = l * 2;
                j.precss("animation-duration", m + "ms");
                j.each(function(r) { if (n === "down") { d(this).addClass("pogoSlider-animation-downOut").precss("animation-delay", l * r + "ms") } else { d(this).addClass("pogoSlider-animation-upOut").precss("animation-delay", l * r + "ms") } })
            },
            blocksReveal: function(k, j) {
                var u = this;
                var q = u.slides[j];
                var t = 0;
                if (u.settings.preserveTargetSize) { t = parseFloat(u.$element.css("padding-bottom")) } else { t = u.$element.height() }
                var r = Math.round(t / 100);
                var l = Math.round(u.$element.width() / 100);
                u.slides[k].$element.css("z-index", u.settings.baseZindex + 1);
                q.$element.css({ "opacity": 1, "z-index": u.settings.baseZindex });
                var p = u._generateARandomArray(r * l);
                u._createSlideSlices(k, r, l);
                var n = u.slides[k].$element.find(".pogoSlider-slide-slice");
                var o = q.duration / (n.length + 1);
                var s = o * 2;
                n.precss("animation-duration", s + "ms");
                for (var m = 0; m < n.length; m++) { n.eq(p.pop()).precss("animation-delay", (o * m) + "ms").addClass("pogoSlider-animation-blocksReveal") }
            },
            fold: function(j, k) { var l; if (k === 0 && j === this.slides.length - 1) { l = "foldLeft" } else { if (j === 0 && k === this.slides.length - 1) { l = "foldRight" } else { if (k > j) { l = "foldLeft" } else { l = "foldRight" } } } return this.slideTransitions[l].apply(this, [j, k]) },
            foldRight: function(l, k) {
                var s = this;
                var q = s.slides[k];
                var m = s.slides[l];
                s.$element.css("overflow", "visible");
                m.$element.css({ "overflow": "visible", "z-index": s.settings.baseZindex });
                q.$element.css({ "opacity": 1, "overflow": "visible", "z-index": s.settings.baseZindex + 1 });
                s._createSlideSlices(l, 1, 2);
                var r = m.$element.find(".pogoSlider-slide-slice");
                s._createSlideSlices(k, 1, 2);
                var o = s.slides[k].$element.find(".pogoSlider-slide-slice");
                var n = r.eq(0);
                var p = o.eq(0);
                var j = o.eq(1);
                q.$element.prepend(n.detach());
                m.$element.prepend(p.detach());
                n.addClass("pogoSlider-animation-foldInRight").precss("animation-duration", q.duration + "ms");
                j.addClass("pogoSlider-animation-foldOutRight").precss("animation-duration", q.duration + "ms");
                return function() {
                    s.$element.css("overflow", "");
                    q.$element.prepend(p.detach());
                    m.$element.prepend(n.detach());
                    s._slideCleanup(k, true)
                }
            },
            foldLeft: function(l, k) {
                var s = this;
                var q = s.slides[k];
                var m = s.slides[l];
                s.$element.css("overflow", "visible");
                m.$element.css({ "overflow": "visible", "z-index": s.settings.baseZindex });
                q.$element.css({ "opacity": 1, "overflow": "visible", "z-index": s.settings.baseZindex + 1 });
                s._createSlideSlices(l, 1, 2);
                var r = m.$element.find(".pogoSlider-slide-slice");
                s._createSlideSlices(k, 1, 2);
                var n = s.slides[k].$element.find(".pogoSlider-slide-slice");
                var p = r.eq(1);
                var o = n.eq(0);
                var j = n.eq(1);
                q.$element.append(p.detach());
                m.$element.append(j.detach());
                p.addClass("pogoSlider-animation-foldInLeft").precss("animation-duration", q.duration + "ms");
                o.addClass("pogoSlider-animation-foldOutLeft").precss("animation-duration", q.duration + "ms");
                return function() {
                    s.$element.css("overflow", "");
                    s._slideCleanup(k, true)
                }
            }
        },
        compatSlideTransitions: {
            fade: function(j, l) {
                var k = this.slides[l];
                this.slides[j].$element.animate({ opacity: 0 }, k.duration);
                k.$element.animate({ opacity: 1 }, k.duration)
            },
            slide: function(j, k) { var l; if (j > k && j === this.slides.length - 1 && k === 0) { l = "slideLeft" } else { if (j < k && j === 0 && k === this.slides.length - 1) { l = "slideRight" } else { if (j < k) { l = "slideLeft" } else { l = "slideRight" } } } return this.slideTransitions[l].apply(this, [j, k]) },
            verticalSlide: function(j, k) { var l; if (j > k && j === this.slides.length - 1 && k === 0) { l = "slideUp" } else { if (j < k && j === 0 && k === this.slides.length - 1) { l = "slideDown" } else { if (j < k) { l = "slideUp" } else { l = "slideDown" } } } return this.slideTransitions[l].apply(this, [j, k]) },
            slideLeft: function(j, l) {
                var k = this.slides[l];
                this.slides[j].$element.animate({ left: "-100%" }, k.duration);
                k.$element.css({ left: "100%", "opacity": 1 }).animate({ left: 0 }, k.duration)
            },
            slideRight: function(j, l) {
                var k = this.slides[l];
                this.slides[j].$element.animate({ left: "100%" }, k.duration);
                k.$element.css({ left: "-100%", "opacity": 1 }).animate({ left: 0 }, k.duration)
            },
            slideUp: function(j, l) {
                var k = this.slides[l];
                this.slides[j].$element.animate({ top: "-100%" }, k.duration);
                k.$element.css({ top: "100%", "opacity": 1 }).animate({ top: "0" }, k.duration)
            },
            slideDown: function(j, l) {
                var k = this.slides[l];
                this.slides[j].$element.animate({ top: "100%" }, k.duration);
                k.$element.css({ top: "-100%", "opacity": 1 }).animate({ top: "0" }, k.duration)
            },
            slideRevealLeft: function(j, l) {
                var k = this.slides[l];
                this.slides[j].$element.css("z-index", this.settings.baseZindex + 1).animate({ left: "-100%" }, k.duration);
                k.$element.css({ "opacity": 1, "z-index": this.settings.baseZindex })
            },
            slideRevealRight: function(j, l) {
                var k = this.slides[l];
                this.slides[j].$element.css("z-index", this.settings.baseZindex + 1).animate({ left: "100%" }, k.duration);
                k.$element.css({ "opacity": 1, "z-index": this.settings.baseZindex })
            },
            slideOverLeft: function(j, l) {
                var k = this.slides[l];
                k.$element.css({ "opacity": 1, "z-index": this.settings.baseZindex, "left": "100%" }).animate({ "left": 0 }, k.duration)
            },
            slideOverRight: function(j, l) {
                var k = this.slides[l];
                k.$element.css({ "opacity": 1, "z-index": this.settings.baseZindex, "right": "100%" }).animate({ "right": 0 }, k.duration)
            },
            expandReveal: function(j, l) {
                var k = this.slides[l];
                this.slides[j].$element.css("z-index", this.settings.baseZindex + 1).animate({ width: "120%", height: "120%", "left": "-10%", "top": "-10%", opacity: 0 }, k.duration);
                k.$element.css({ "opacity": 1, "z-index": this.settings.baseZindex })
            },
            shrinkReveal: function(j, l) {
                var k = this.slides[l];
                this.slides[j].$element.css("z-index", this.settings.baseZindex + 1).animate({ width: "50%", height: "50%", "left": "25%", "top": "25%", opacity: 0 }, k.duration);
                k.$element.css({ "opacity": 1, "z-index": this.settings.baseZindex })
            },
            verticalSplitReveal: function(l, n) {
                var k = this;
                var m = k.slides[n];
                k.slides[l].$element.css("z-index", k.settings.baseZindex + 1);
                m.$element.css({ "opacity": 1, "z-index": k.settings.baseZindex });
                k._createSlideSlices(l, 1, 2);
                var j = k.slides[l].$element.find(".pogoSlider-slide-slice");
                j.eq(0).animate({ "left": "-50%" }, m.duration);
                j.eq(1).animate({ "left": "100%" }, m.duration)
            },
            horizontalSplitReveal: function(l, n) {
                var k = this;
                var m = k.slides[n];
                k.slides[l].$element.css("z-index", k.settings.baseZindex + 1);
                m.$element.css({ "opacity": 1, "z-index": k.settings.baseZindex });
                k._createSlideSlices(l, 2, 1);
                var j = k.slides[l].$element.find(".pogoSlider-slide-slice");
                j.eq(0).animate({ "top": "-50%" }, m.duration);
                j.eq(1).animate({ "top": "100%" }, m.duration)
            },
            zipReveal: function(n, p) {
                var m = this;
                var o = m.slides[p];
                m.slides[n].$element.css("z-index", m.settings.baseZindex + 1);
                o.$element.css({ "opacity": 1, "z-index": m.settings.baseZindex });
                m._createSlideSlices(n, 1, Math.round(m.$element.width() / 100));
                var l = m.slides[n].$element.find(".pogoSlider-slide-slice");
                var k = o.duration / (l.length + 1);
                var j = k * 2;
                l.each(function(q) { if (q % 2 === 0) { d(this).delay(k * q).animate({ "top": "100%" }, j) } else { d(this).delay(k * q).animate({ "top": "-100%" }, j) } })
            },
            barRevealDown: function(j, k) { return this.slideTransitions["barReveal"].apply(this, [j, k, "down"]) },
            barRevealUp: function(j, k) { return this.slideTransitions["barReveal"].apply(this, [j, k, "up"]) },
            barReveal: function(o, q, n) {
                var m = this;
                var p = m.slides[q];
                m.slides[o].$element.css("z-index", m.settings.baseZindex + 1);
                p.$element.css({ "opacity": 1, "z-index": m.settings.baseZindex });
                m._createSlideSlices(o, 1, Math.round(m.$element.width() / 100));
                var l = m.slides[o].$element.find(".pogoSlider-slide-slice");
                var k = p.duration / (l.length + 1);
                var j = k * 2;
                l.each(function(r) { if (n === "down") { d(this).delay(k * r).animate({ "top": "100%" }, j) } else { d(this).delay(k * r).animate({ "top": "-100%" }, j) } })
            }
        }
    };
    d.fn[e] = function(j) { this.each(function() { if (!d.data(this, "plugin_" + e)) { d.data(this, "plugin_" + e, new h(this, j)) } }); return this }
})(jQuery, window, document);

/* This Plugin for Maximage Slider */
/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9998 (27-OCT-2011)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
! function(e, t) {
    function n(t) { e.fn.cycle.debug && i(t) }

    function i() { window.console && console.log && console.log("[cycle] " + Array.prototype.join.call(arguments, " ")) }

    function c(t, n, i) {
        var c = e(t).data("cycle.opts"),
            s = !!t.cyclePause;
        s && c.paused ? c.paused(t, c, n, i) : !s && c.resumed && c.resumed(t, c, n, i)
    }

    function s(n, s, o) {
        function l(t, n, c) {
            if (!t && n === !0) {
                var s = e(c).data("cycle.opts");
                if (!s) return i("options not found, can not resume"), !1;
                c.cycleTimeout && (clearTimeout(c.cycleTimeout), c.cycleTimeout = 0), d(s.elements, s, 1, !s.backwards)
            }
        }
        if (n.cycleStop == t && (n.cycleStop = 0), (s === t || null === s) && (s = {}), s.constructor == String) {
            switch (s) {
                case "destroy":
                case "stop":
                    var a = e(n).data("cycle.opts");
                    return a ? (n.cycleStop++, n.cycleTimeout && clearTimeout(n.cycleTimeout), n.cycleTimeout = 0, a.elements && e(a.elements).stop(), e(n).removeData("cycle.opts"), "destroy" == s && r(a), !1) : !1;
                case "toggle":
                    return n.cyclePause = 1 === n.cyclePause ? 0 : 1, l(n.cyclePause, o, n), c(n), !1;
                case "pause":
                    return n.cyclePause = 1, c(n), !1;
                case "resume":
                    return n.cyclePause = 0, l(!1, o, n), c(n), !1;
                case "prev":
                case "next":
                    var a = e(n).data("cycle.opts");
                    return a ? (e.fn.cycle[s](a), !1) : (i('options not found, "prev/next" ignored'), !1);
                default:
                    s = { fx: s }
            }
            return s
        }
        if (s.constructor == Number) { var f = s; return (s = e(n).data("cycle.opts")) ? 0 > f || f >= s.elements.length ? (i("invalid slide index: " + f), !1) : (s.nextSlide = f, n.cycleTimeout && (clearTimeout(n.cycleTimeout), n.cycleTimeout = 0), "string" == typeof o && (s.oneTimeFx = o), d(s.elements, s, 1, f >= s.currSlide), !1) : (i("options not found, can not advance slide"), !1) }
        return s
    }

    function o(t, n) { if (!e.support.opacity && n.cleartype && t.style.filter) try { t.style.removeAttribute("filter") } catch (i) {} }

    function r(t) { t.next && e(t.next).unbind(t.prevNextEvent), t.prev && e(t.prev).unbind(t.prevNextEvent), (t.pager || t.pagerAnchorBuilder) && e.each(t.pagerAnchors || [], function() { this.unbind().remove() }), t.pagerAnchors = null, t.destroy && t.destroy(t) }

    function l(n, s, r, l, h) {
        var p, x = e.extend({}, e.fn.cycle.defaults, l || {}, e.metadata ? n.metadata() : e.meta ? n.data() : {}),
            v = e.isFunction(n.data) ? n.data(x.metaAttr) : null;
        v && (x = e.extend(x, v)), x.autostop && (x.countdown = x.autostopCount || r.length);
        var w = n[0];
        if (n.data("cycle.opts", x), x.$cont = n, x.stopCount = w.cycleStop, x.elements = r, x.before = x.before ? [x.before] : [], x.after = x.after ? [x.after] : [], !e.support.opacity && x.cleartype && x.after.push(function() { o(this, x) }), x.continuous && x.after.push(function() { d(r, x, 0, !x.backwards) }), a(x), e.support.opacity || !x.cleartype || x.cleartypeNoBg || g(s), "static" == n.css("position") && n.css("position", "relative"), x.width && n.width(x.width), x.height && "auto" != x.height && n.height(x.height), x.startingSlide != t ? (x.startingSlide = parseInt(x.startingSlide, 10), x.startingSlide >= r.length || x.startSlide < 0 ? x.startingSlide = 0 : p = !0) : x.backwards ? x.startingSlide = r.length - 1 : x.startingSlide = 0, x.random) {
            x.randomMap = [];
            for (var S = 0; S < r.length; S++) x.randomMap.push(S);
            if (x.randomMap.sort(function(e, t) { return Math.random() - .5 }), p)
                for (var b = 0; b < r.length; b++) x.startingSlide == x.randomMap[b] && (x.randomIndex = b);
            else x.randomIndex = 1, x.startingSlide = x.randomMap[1]
        } else x.startingSlide >= r.length && (x.startingSlide = 0);
        x.currSlide = x.startingSlide || 0;
        var B = x.startingSlide;
        s.css({ position: "absolute", top: 0, left: 0 }).hide().each(function(t) {
            var n;
            n = x.backwards ? B ? B >= t ? r.length + (t - B) : B - t : r.length - t : B ? t >= B ? r.length - (t - B) : B - t : r.length - t, e(this).css("z-index", n)
        }), e(r[B]).css("opacity", 1).show(), o(r[B], x), x.fit && (x.aspect ? s.each(function() {
            var t = e(this),
                n = x.aspect === !0 ? t.width() / t.height() : x.aspect;
            x.width && t.width() != x.width && (t.width(x.width), t.height(x.width / n)), x.height && t.height() < x.height && (t.height(x.height), t.width(x.height * n))
        }) : (x.width && s.width(x.width), x.height && "auto" != x.height && s.height(x.height))), !x.center || x.fit && !x.aspect || s.each(function() {
            var t = e(this);
            t.css({ "margin-left": x.width ? (x.width - t.width()) / 2 + "px" : 0, "margin-top": x.height ? (x.height - t.height()) / 2 + "px" : 0 })
        }), !x.center || x.fit || x.slideResize || s.each(function() {
            var t = e(this);
            t.css({ "margin-left": x.width ? (x.width - t.width()) / 2 + "px" : 0, "margin-top": x.height ? (x.height - t.height()) / 2 + "px" : 0 })
        });
        var I = x.containerResize && !n.innerHeight();
        if (I) {
            for (var O = 0, F = 0, A = 0; A < r.length; A++) {
                var k = e(r[A]),
                    H = k[0],
                    T = k.outerWidth(),
                    W = k.outerHeight();
                T || (T = H.offsetWidth || H.width || k.attr("width")), W || (W = H.offsetHeight || H.height || k.attr("height")), O = T > O ? T : O, F = W > F ? W : F
            }
            O > 0 && F > 0 && n.css({ width: O + "px", height: F + "px" })
        }
        var P = !1;
        if (x.pause && n.hover(function() { P = !0, this.cyclePause++, c(w, !0) }, function() { P && this.cyclePause--, c(w, !0) }), f(x) === !1) return !1;
        var R = !1;
        if (l.requeueAttempts = l.requeueAttempts || 0, s.each(function() {
                var t = e(this);
                if (this.cycleH = x.fit && x.height ? x.height : t.height() || this.offsetHeight || this.height || t.attr("height") || 0, this.cycleW = x.fit && x.width ? x.width : t.width() || this.offsetWidth || this.width || t.attr("width") || 0, t.is("img")) {
                    var n = e.browser.msie && 28 == this.cycleW && 30 == this.cycleH && !this.complete,
                        c = e.browser.mozilla && 34 == this.cycleW && 19 == this.cycleH && !this.complete,
                        s = e.browser.opera && (42 == this.cycleW && 19 == this.cycleH || 37 == this.cycleW && 17 == this.cycleH) && !this.complete,
                        o = 0 == this.cycleH && 0 == this.cycleW && !this.complete;
                    if (n || c || s || o) {
                        if (h.s && x.requeueOnImageNotLoaded && ++l.requeueAttempts < 100) return i(l.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH), setTimeout(function() { e(h.s, h.c).cycle(l) }, x.requeueTimeout), R = !0, !1;
                        i("could not determine size of image: " + this.src, this.cycleW, this.cycleH)
                    }
                }
                return !0
            }), R) return !1;
        if (x.cssBefore = x.cssBefore || {}, x.cssAfter = x.cssAfter || {}, x.cssFirst = x.cssFirst || {}, x.animIn = x.animIn || {}, x.animOut = x.animOut || {}, s.not(":eq(" + B + ")").css(x.cssBefore), e(s[B]).css(x.cssFirst), x.timeout) { x.timeout = parseInt(x.timeout, 10), x.speed.constructor == String && (x.speed = e.fx.speeds[x.speed] || parseInt(x.speed, 10)), x.sync || (x.speed = x.speed / 2); for (var C = "none" == x.fx ? 0 : "shuffle" == x.fx ? 500 : 250; x.timeout - x.speed < C;) x.timeout += x.speed }
        if (x.easing && (x.easeIn = x.easeOut = x.easing), x.speedIn || (x.speedIn = x.speed), x.speedOut || (x.speedOut = x.speed), x.slideCount = r.length, x.currSlide = x.lastSlide = B, x.random ? (++x.randomIndex == r.length && (x.randomIndex = 0), x.nextSlide = x.randomMap[x.randomIndex]) : x.backwards ? x.nextSlide = 0 == x.startingSlide ? r.length - 1 : x.startingSlide - 1 : x.nextSlide = x.startingSlide >= r.length - 1 ? 0 : x.startingSlide + 1, !x.multiFx) {
            var z = e.fn.cycle.transitions[x.fx];
            if (e.isFunction(z)) z(n, s, x);
            else if ("custom" != x.fx && !x.multiFx) return i("unknown transition: " + x.fx, "; slideshow terminating"), !1
        }
        var E = s[B];
        return x.skipInitializationCallbacks || (x.before.length && x.before[0].apply(E, [E, E, x, !0]), x.after.length && x.after[0].apply(E, [E, E, x, !0])), x.next && e(x.next).bind(x.prevNextEvent, function() { return m(x, 1) }), x.prev && e(x.prev).bind(x.prevNextEvent, function() { return m(x, 0) }), (x.pager || x.pagerAnchorBuilder) && y(r, x), u(x, r), x
    }

    function a(t) { t.original = { before: [], after: [] }, t.original.cssBefore = e.extend({}, t.cssBefore), t.original.cssAfter = e.extend({}, t.cssAfter), t.original.animIn = e.extend({}, t.animIn), t.original.animOut = e.extend({}, t.animOut), e.each(t.before, function() { t.original.before.push(this) }), e.each(t.after, function() { t.original.after.push(this) }) }

    function f(t) {
        var c, s, o = e.fn.cycle.transitions;
        if (t.fx.indexOf(",") > 0) {
            for (t.multiFx = !0, t.fxs = t.fx.replace(/\s*/g, "").split(","), c = 0; c < t.fxs.length; c++) {
                var r = t.fxs[c];
                s = o[r], s && o.hasOwnProperty(r) && e.isFunction(s) || (i("discarding unknown transition: ", r), t.fxs.splice(c, 1), c--)
            }
            if (!t.fxs.length) return i("No valid transitions named; slideshow terminating."), !1
        } else if ("all" == t.fx) { t.multiFx = !0, t.fxs = []; for (p in o) s = o[p], o.hasOwnProperty(p) && e.isFunction(s) && t.fxs.push(p) }
        if (t.multiFx && t.randomizeEffects) {
            var l = Math.floor(20 * Math.random()) + 30;
            for (c = 0; l > c; c++) {
                var a = Math.floor(Math.random() * t.fxs.length);
                t.fxs.push(t.fxs.splice(a, 1)[0])
            }
            n("randomized fx sequence: ", t.fxs)
        }
        return !0
    }

    function u(t, n) {
        t.addSlide = function(i, c) {
            var s = e(i),
                o = s[0];
            t.autostopCount || t.countdown++, n[c ? "unshift" : "push"](o), t.els && t.els[c ? "unshift" : "push"](o), t.slideCount = n.length, t.random && (t.randomMap.push(t.slideCount - 1), t.randomMap.sort(function(e, t) { return Math.random() - .5 })), s.css("position", "absolute"), s[c ? "prependTo" : "appendTo"](t.$cont), c && (t.currSlide++, t.nextSlide++), e.support.opacity || !t.cleartype || t.cleartypeNoBg || g(s), t.fit && t.width && s.width(t.width), t.fit && t.height && "auto" != t.height && s.height(t.height), o.cycleH = t.fit && t.height ? t.height : s.height(), o.cycleW = t.fit && t.width ? t.width : s.width(), s.css(t.cssBefore), (t.pager || t.pagerAnchorBuilder) && e.fn.cycle.createPagerAnchor(n.length - 1, o, e(t.pager), n, t), e.isFunction(t.onAddSlide) ? t.onAddSlide(s) : s.hide()
        }
    }

    function d(i, c, s, o) {
        function r() {
            var e = 0;
            c.timeout;
            c.timeout && !c.continuous ? (e = h(i[c.currSlide], i[c.nextSlide], c, o), "shuffle" == c.fx && (e -= c.speedOut)) : c.continuous && l.cyclePause && (e = 10), e > 0 && (l.cycleTimeout = setTimeout(function() { d(i, c, 0, !c.backwards) }, e))
        }
        if (s && c.busy && c.manualTrump && (n("manualTrump in go(), stopping active transition"), e(i).stop(!0, !0), c.busy = 0), c.busy) return void n("transition active, ignoring new tx request");
        var l = c.$cont[0],
            a = i[c.currSlide],
            f = i[c.nextSlide];
        if (l.cycleStop == c.stopCount && (0 !== l.cycleTimeout || s)) {
            if (!s && !l.cyclePause && !c.bounce && (c.autostop && --c.countdown <= 0 || c.nowrap && !c.random && c.nextSlide < c.currSlide)) return void(c.end && c.end(c));
            var u = !1;
            if (!s && l.cyclePause || c.nextSlide == c.currSlide) r();
            else {
                u = !0;
                var p = c.fx;
                a.cycleH = a.cycleH || e(a).height(), a.cycleW = a.cycleW || e(a).width(), f.cycleH = f.cycleH || e(f).height(), f.cycleW = f.cycleW || e(f).width(), c.multiFx && (o && (c.lastFx == t || ++c.lastFx >= c.fxs.length) ? c.lastFx = 0 : !o && (c.lastFx == t || --c.lastFx < 0) && (c.lastFx = c.fxs.length - 1), p = c.fxs[c.lastFx]), c.oneTimeFx && (p = c.oneTimeFx, c.oneTimeFx = null), e.fn.cycle.resetState(c, p), c.before.length && e.each(c.before, function(e, t) { l.cycleStop == c.stopCount && t.apply(f, [a, f, c, o]) });
                var m = function() { c.busy = 0, e.each(c.after, function(e, t) { l.cycleStop == c.stopCount && t.apply(f, [a, f, c, o]) }), l.cycleStop || r() };
                n("tx firing(" + p + "); currSlide: " + c.currSlide + "; nextSlide: " + c.nextSlide), c.busy = 1, c.fxFn ? c.fxFn(a, f, c, m, o, s && c.fastOnEvent) : e.isFunction(e.fn.cycle[c.fx]) ? e.fn.cycle[c.fx](a, f, c, m, o, s && c.fastOnEvent) : e.fn.cycle.custom(a, f, c, m, o, s && c.fastOnEvent)
            }
            if (u || c.nextSlide == c.currSlide)
                if (c.lastSlide = c.currSlide, c.random) c.currSlide = c.nextSlide, ++c.randomIndex == i.length && (c.randomIndex = 0, c.randomMap.sort(function(e, t) { return Math.random() - .5 })), c.nextSlide = c.randomMap[c.randomIndex], c.nextSlide == c.currSlide && (c.nextSlide = c.currSlide == c.slideCount - 1 ? 0 : c.currSlide + 1);
                else if (c.backwards) {
                var y = c.nextSlide - 1 < 0;
                y && c.bounce ? (c.backwards = !c.backwards, c.nextSlide = 1, c.currSlide = 0) : (c.nextSlide = y ? i.length - 1 : c.nextSlide - 1, c.currSlide = y ? 0 : c.nextSlide + 1)
            } else {
                var y = c.nextSlide + 1 == i.length;
                y && c.bounce ? (c.backwards = !c.backwards, c.nextSlide = i.length - 2, c.currSlide = i.length - 1) : (c.nextSlide = y ? 0 : c.nextSlide + 1, c.currSlide = y ? i.length - 1 : c.nextSlide - 1)
            }
            u && c.pager && c.updateActivePagerLink(c.pager, c.currSlide, c.activePagerClass)
        }
    }

    function h(e, t, i, c) {
        if (i.timeoutFn) {
            for (var s = i.timeoutFn.call(e, e, t, i, c);
                "none" != i.fx && s - i.speed < 250;) s += i.speed;
            if (n("calculated timeout: " + s + "; speed: " + i.speed), s !== !1) return s
        }
        return i.timeout
    }

    function m(t, n) {
        var i = n ? 1 : -1,
            c = t.elements,
            s = t.$cont[0],
            o = s.cycleTimeout;
        if (o && (clearTimeout(o), s.cycleTimeout = 0), t.random && 0 > i) t.randomIndex--, -2 == --t.randomIndex ? t.randomIndex = c.length - 2 : -1 == t.randomIndex && (t.randomIndex = c.length - 1), t.nextSlide = t.randomMap[t.randomIndex];
        else if (t.random) t.nextSlide = t.randomMap[t.randomIndex];
        else if (t.nextSlide = t.currSlide + i, t.nextSlide < 0) {
            if (t.nowrap) return !1;
            t.nextSlide = c.length - 1
        } else if (t.nextSlide >= c.length) {
            if (t.nowrap) return !1;
            t.nextSlide = 0
        }
        var r = t.onPrevNextEvent || t.prevNextClick;
        return e.isFunction(r) && r(i > 0, t.nextSlide, c[t.nextSlide]), d(c, t, 1, n), !1
    }

    function y(t, n) {
        var i = e(n.pager);
        e.each(t, function(c, s) { e.fn.cycle.createPagerAnchor(c, s, i, t, n) }), n.updateActivePagerLink(n.pager, n.startingSlide, n.activePagerClass)
    }

    function g(t) {
        function i(e) { return e = parseInt(e, 10).toString(16), e.length < 2 ? "0" + e : e }

        function c(t) { for (; t && "html" != t.nodeName.toLowerCase(); t = t.parentNode) { var n = e.css(t, "background-color"); if (n && n.indexOf("rgb") >= 0) { var c = n.match(/\d+/g); return "#" + i(c[0]) + i(c[1]) + i(c[2]) } if (n && "transparent" != n) return n } return "#ffffff" }
        n("applying clearType background-color hack"), t.each(function() { e(this).css("background-color", c(this)) })
    }
    var x = "2.9998";
    e.support == t && (e.support = { opacity: !e.browser.msie }), e.expr[":"].paused = function(e) { return e.cyclePause }, e.fn.cycle = function(t, c) {
        var o = { s: this.selector, c: this.context };
        return 0 === this.length && "stop" != t ? !e.isReady && o.s ? (i("DOM not ready, queuing slideshow"), e(function() { e(o.s, o.c).cycle(t, c) }), this) : (i("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this) : this.each(function() {
            var r = s(this, t, c);
            if (r !== !1) {
                r.updateActivePagerLink = r.updateActivePagerLink || e.fn.cycle.updateActivePagerLink, this.cycleTimeout && clearTimeout(this.cycleTimeout), this.cycleTimeout = this.cyclePause = 0;
                var a = e(this),
                    f = r.slideExpr ? e(r.slideExpr, this) : a.children(),
                    u = f.get(),
                    p = l(a, f, u, r, o);
                if (p !== !1) {
                    if (u.length < 2) return void i("terminating; too few slides: " + u.length);
                    var m = p.continuous ? 10 : h(u[p.currSlide], u[p.nextSlide], p, !p.backwards);
                    m && (m += p.delay || 0, 10 > m && (m = 10), n("first timeout: " + m), this.cycleTimeout = setTimeout(function() { d(u, p, 0, !r.backwards) }, m))
                }
            }
        })
    }, e.fn.cycle.resetState = function(t, n) {
        n = n || t.fx, t.before = [], t.after = [], t.cssBefore = e.extend({}, t.original.cssBefore), t.cssAfter = e.extend({}, t.original.cssAfter), t.animIn = e.extend({}, t.original.animIn), t.animOut = e.extend({}, t.original.animOut), t.fxFn = null, e.each(t.original.before, function() { t.before.push(this) }), e.each(t.original.after, function() { t.after.push(this) });
        var i = e.fn.cycle.transitions[n];
        e.isFunction(i) && i(t.$cont, e(t.elements), t)
    }, e.fn.cycle.updateActivePagerLink = function(t, n, i) { e(t).each(function() { e(this).children().removeClass(i).eq(n).addClass(i) }) }, e.fn.cycle.next = function(e) { m(e, 1) }, e.fn.cycle.prev = function(e) { m(e, 0) }, e.fn.cycle.createPagerAnchor = function(t, i, s, o, r) {
        var l;
        if (e.isFunction(r.pagerAnchorBuilder) ? (l = r.pagerAnchorBuilder(t, i), n("pagerAnchorBuilder(" + t + ", el) returned: " + l)) : l = '<a href="#">' + (t + 1) + "</a>", l) {
            var a = e(l);
            if (0 === a.parents("body").length) {
                var f = [];
                s.length > 1 ? (s.each(function() {
                    var t = a.clone(!0);
                    e(this).append(t), f.push(t[0])
                }), a = e(f)) : a.appendTo(s)
            }
            r.pagerAnchors = r.pagerAnchors || [], r.pagerAnchors.push(a);
            var u = function(n) {
                n.preventDefault(), r.nextSlide = t;
                var i = r.$cont[0],
                    c = i.cycleTimeout;
                c && (clearTimeout(c), i.cycleTimeout = 0);
                var s = r.onPagerEvent || r.pagerClick;
                e.isFunction(s) && s(r.nextSlide, o[r.nextSlide]), d(o, r, 1, r.currSlide < t)
            };
            /mouseenter|mouseover/i.test(r.pagerEvent) ? a.hover(u, function() {}) : a.bind(r.pagerEvent, u), /^click/.test(r.pagerEvent) || r.allowPagerClickBubble || a.bind("click.cycle", function() { return !1 });
            var h = r.$cont[0],
                p = !1;
            r.pauseOnPagerHover && a.hover(function() { p = !0, h.cyclePause++, c(h, !0, !0) }, function() { p && h.cyclePause--, c(h, !0, !0) })
        }
    }, e.fn.cycle.hopsFromLast = function(e, t) {
        var n, i = e.lastSlide,
            c = e.currSlide;
        return n = t ? c > i ? c - i : e.slideCount - i : i > c ? i - c : i + e.slideCount - c
    }, e.fn.cycle.commonReset = function(t, n, i, c, s, o) { e(i.elements).not(t).hide(), "undefined" == typeof i.cssBefore.opacity && (i.cssBefore.opacity = 1), i.cssBefore.display = "block", i.slideResize && c !== !1 && n.cycleW > 0 && (i.cssBefore.width = n.cycleW), i.slideResize && s !== !1 && n.cycleH > 0 && (i.cssBefore.height = n.cycleH), i.cssAfter = i.cssAfter || {}, i.cssAfter.display = "none", e(t).css("zIndex", i.slideCount + (o === !0 ? 1 : 0)), e(n).css("zIndex", i.slideCount + (o === !0 ? 0 : 1)) }, e.fn.cycle.custom = function(t, n, i, c, s, o) {
        var r = e(t),
            l = e(n),
            a = i.speedIn,
            f = i.speedOut,
            u = i.easeIn,
            d = i.easeOut;
        l.css(i.cssBefore), o && (a = f = "number" == typeof o ? o : 1, u = d = null);
        var h = function() { l.animate(i.animIn, a, u, function() { c() }) };
        r.animate(i.animOut, f, d, function() { r.css(i.cssAfter), i.sync || h() }), i.sync && h()
    }, e.fn.cycle.transitions = { fade: function(t, n, i) { n.not(":eq(" + i.currSlide + ")").css("opacity", 0), i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i), i.cssBefore.opacity = 0 }), i.animIn = { opacity: 1 }, i.animOut = { opacity: 0 }, i.cssBefore = { top: 0, left: 0 } } }, e.fn.cycle.ver = function() { return x }, e.fn.cycle.defaults = { activePagerClass: "activeSlide", after: null, allowPagerClickBubble: !1, animIn: null, animOut: null, aspect: !1, autostop: 0, autostopCount: 0, backwards: !1, before: null, center: null, cleartype: !e.support.opacity, cleartypeNoBg: !1, containerResize: 1, continuous: 0, cssAfter: null, cssBefore: null, delay: 0, easeIn: null, easeOut: null, easing: null, end: null, fastOnEvent: 0, fit: 0, fx: "fade", fxFn: null, height: "auto", manualTrump: !0, metaAttr: "cycle", next: null, nowrap: 0, onPagerEvent: null, onPrevNextEvent: null, pager: null, pagerAnchorBuilder: null, pagerEvent: "click.cycle", pause: 0, pauseOnPagerHover: 0, prev: null, prevNextEvent: "click.cycle", random: 0, randomizeEffects: 1, requeueOnImageNotLoaded: !0, requeueTimeout: 250, rev: 0, shuffle: null, skipInitializationCallbacks: !1, slideExpr: null, slideResize: 1, speed: 1e3, speedIn: null, speedOut: null, startingSlide: 0, sync: 1, timeout: 4e3, timeoutFn: null, updateActivePagerLink: null, width: null }
}(jQuery),
function(e) {
    e.fn.cycle.transitions.none = function(t, n, i) { i.fxFn = function(t, n, i, c) { e(n).show(), e(t).hide(), c() } }, e.fn.cycle.transitions.fadeout = function(t, n, i) { n.not(":eq(" + i.currSlide + ")").css({ display: "block", opacity: 1 }), i.before.push(function(t, n, i, c, s, o) { e(t).css("zIndex", i.slideCount + (!o == !0 ? 1 : 0)), e(n).css("zIndex", i.slideCount + (!o == !0 ? 0 : 1)) }), i.animIn.opacity = 1, i.animOut.opacity = 0, i.cssBefore.opacity = 1, i.cssBefore.display = "block", i.cssAfter.zIndex = 0 }, e.fn.cycle.transitions.scrollUp = function(t, n, i) {
        t.css("overflow", "hidden"), i.before.push(e.fn.cycle.commonReset);
        var c = t.height();
        i.cssBefore.top = c, i.cssBefore.left = 0, i.cssFirst.top = 0, i.animIn.top = 0, i.animOut.top = -c
    }, e.fn.cycle.transitions.scrollDown = function(t, n, i) {
        t.css("overflow", "hidden"), i.before.push(e.fn.cycle.commonReset);
        var c = t.height();
        i.cssFirst.top = 0, i.cssBefore.top = -c, i.cssBefore.left = 0, i.animIn.top = 0, i.animOut.top = c
    }, e.fn.cycle.transitions.scrollLeft = function(t, n, i) {
        t.css("overflow", "hidden"), i.before.push(e.fn.cycle.commonReset);
        var c = t.width();
        i.cssFirst.left = 0, i.cssBefore.left = c, i.cssBefore.top = 0, i.animIn.left = 0, i.animOut.left = 0 - c
    }, e.fn.cycle.transitions.scrollRight = function(t, n, i) {
        t.css("overflow", "hidden"), i.before.push(e.fn.cycle.commonReset);
        var c = t.width();
        i.cssFirst.left = 0, i.cssBefore.left = -c, i.cssBefore.top = 0, i.animIn.left = 0, i.animOut.left = c
    }, e.fn.cycle.transitions.scrollHorz = function(t, n, i) { t.css("overflow", "hidden").width(), i.before.push(function(t, n, i, c) { i.rev && (c = !c), e.fn.cycle.commonReset(t, n, i), i.cssBefore.left = c ? n.cycleW - 1 : 1 - n.cycleW, i.animOut.left = c ? -t.cycleW : t.cycleW }), i.cssFirst.left = 0, i.cssBefore.top = 0, i.animIn.left = 0, i.animOut.top = 0 }, e.fn.cycle.transitions.scrollVert = function(t, n, i) { t.css("overflow", "hidden"), i.before.push(function(t, n, i, c) { i.rev && (c = !c), e.fn.cycle.commonReset(t, n, i), i.cssBefore.top = c ? 1 - n.cycleH : n.cycleH - 1, i.animOut.top = c ? t.cycleH : -t.cycleH }), i.cssFirst.top = 0, i.cssBefore.left = 0, i.animIn.top = 0, i.animOut.left = 0 }, e.fn.cycle.transitions.slideX = function(t, n, i) { i.before.push(function(t, n, i) { e(i.elements).not(t).hide(), e.fn.cycle.commonReset(t, n, i, !1, !0), i.animIn.width = n.cycleW }), i.cssBefore.left = 0, i.cssBefore.top = 0, i.cssBefore.width = 0, i.animIn.width = "show", i.animOut.width = 0 }, e.fn.cycle.transitions.slideY = function(t, n, i) { i.before.push(function(t, n, i) { e(i.elements).not(t).hide(), e.fn.cycle.commonReset(t, n, i, !0, !1), i.animIn.height = n.cycleH }), i.cssBefore.left = 0, i.cssBefore.top = 0, i.cssBefore.height = 0, i.animIn.height = "show", i.animOut.height = 0 }, e.fn.cycle.transitions.shuffle = function(t, n, i) {
        var c, s = t.css("overflow", "visible").width();
        for (n.css({ left: 0, top: 0 }), i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !0, !0, !0) }), i.speedAdjusted || (i.speed = i.speed / 2, i.speedAdjusted = !0), i.random = 0, i.shuffle = i.shuffle || { left: -s, top: 15 }, i.els = [], c = 0; c < n.length; c++) i.els.push(n[c]);
        for (c = 0; c < i.currSlide; c++) i.els.push(i.els.shift());
        i.fxFn = function(t, n, i, c, s) {
            i.rev && (s = !s);
            var o = e(s ? t : n);
            e(n).css(i.cssBefore);
            var r = i.slideCount;
            o.animate(i.shuffle, i.speedIn, i.easeIn, function() {
                for (var n = e.fn.cycle.hopsFromLast(i, s), l = 0; n > l; l++) s ? i.els.push(i.els.shift()) : i.els.unshift(i.els.pop());
                if (s)
                    for (var a = 0, f = i.els.length; f > a; a++) e(i.els[a]).css("z-index", f - a + r);
                else {
                    var u = e(t).css("z-index");
                    o.css("z-index", parseInt(u, 10) + 1 + r)
                }
                o.animate({ left: 0, top: 0 }, i.speedOut, i.easeOut, function() { e(s ? this : t).hide(), c && c() })
            })
        }, e.extend(i.cssBefore, { display: "block", opacity: 1, top: 0, left: 0 })
    }, e.fn.cycle.transitions.turnUp = function(t, n, i) { i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !0, !1), i.cssBefore.top = n.cycleH, i.animIn.height = n.cycleH, i.animOut.width = n.cycleW }), i.cssFirst.top = 0, i.cssBefore.left = 0, i.cssBefore.height = 0, i.animIn.top = 0, i.animOut.height = 0 }, e.fn.cycle.transitions.turnDown = function(t, n, i) { i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !0, !1), i.animIn.height = n.cycleH, i.animOut.top = t.cycleH }), i.cssFirst.top = 0, i.cssBefore.left = 0, i.cssBefore.top = 0, i.cssBefore.height = 0, i.animOut.height = 0 }, e.fn.cycle.transitions.turnLeft = function(t, n, i) { i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !1, !0), i.cssBefore.left = n.cycleW, i.animIn.width = n.cycleW }), i.cssBefore.top = 0, i.cssBefore.width = 0, i.animIn.left = 0, i.animOut.width = 0 }, e.fn.cycle.transitions.turnRight = function(t, n, i) { i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !1, !0), i.animIn.width = n.cycleW, i.animOut.left = t.cycleW }), e.extend(i.cssBefore, { top: 0, left: 0, width: 0 }), i.animIn.left = 0, i.animOut.width = 0 }, e.fn.cycle.transitions.zoom = function(t, n, i) { i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !1, !1, !0), i.cssBefore.top = n.cycleH / 2, i.cssBefore.left = n.cycleW / 2, e.extend(i.animIn, { top: 0, left: 0, width: n.cycleW, height: n.cycleH }), e.extend(i.animOut, { width: 0, height: 0, top: t.cycleH / 2, left: t.cycleW / 2 }) }), i.cssFirst.top = 0, i.cssFirst.left = 0, i.cssBefore.width = 0, i.cssBefore.height = 0 }, e.fn.cycle.transitions.fadeZoom = function(t, n, i) { i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !1, !1), i.cssBefore.left = n.cycleW / 2, i.cssBefore.top = n.cycleH / 2, e.extend(i.animIn, { top: 0, left: 0, width: n.cycleW, height: n.cycleH }) }), i.cssBefore.width = 0, i.cssBefore.height = 0, i.animOut.opacity = 0 }, e.fn.cycle.transitions.blindX = function(t, n, i) {
        var c = t.css("overflow", "hidden").width();
        i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i), i.animIn.width = n.cycleW, i.animOut.left = t.cycleW }), i.cssBefore.left = c, i.cssBefore.top = 0, i.animIn.left = 0, i.animOut.left = c
    }, e.fn.cycle.transitions.blindY = function(t, n, i) {
        var c = t.css("overflow", "hidden").height();
        i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i), i.animIn.height = n.cycleH, i.animOut.top = t.cycleH }), i.cssBefore.top = c, i.cssBefore.left = 0, i.animIn.top = 0, i.animOut.top = c
    }, e.fn.cycle.transitions.blindZ = function(t, n, i) {
        var c = t.css("overflow", "hidden").height(),
            s = t.width();
        i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i), i.animIn.height = n.cycleH, i.animOut.top = t.cycleH }), i.cssBefore.top = c, i.cssBefore.left = s, i.animIn.top = 0, i.animIn.left = 0, i.animOut.top = c, i.animOut.left = s
    }, e.fn.cycle.transitions.growX = function(t, n, i) { i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !1, !0), i.cssBefore.left = this.cycleW / 2, i.animIn.left = 0, i.animIn.width = this.cycleW, i.animOut.left = 0 }), i.cssBefore.top = 0, i.cssBefore.width = 0 }, e.fn.cycle.transitions.growY = function(t, n, i) { i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !0, !1), i.cssBefore.top = this.cycleH / 2, i.animIn.top = 0, i.animIn.height = this.cycleH, i.animOut.top = 0 }), i.cssBefore.height = 0, i.cssBefore.left = 0 }, e.fn.cycle.transitions.curtainX = function(t, n, i) { i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !1, !0, !0), i.cssBefore.left = n.cycleW / 2, i.animIn.left = 0, i.animIn.width = this.cycleW, i.animOut.left = t.cycleW / 2, i.animOut.width = 0 }), i.cssBefore.top = 0, i.cssBefore.width = 0 }, e.fn.cycle.transitions.curtainY = function(t, n, i) { i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !0, !1, !0), i.cssBefore.top = n.cycleH / 2, i.animIn.top = 0, i.animIn.height = n.cycleH, i.animOut.top = t.cycleH / 2, i.animOut.height = 0 }), i.cssBefore.height = 0, i.cssBefore.left = 0 }, e.fn.cycle.transitions.cover = function(t, n, i) {
        var c = i.direction || "left",
            s = t.css("overflow", "hidden").width(),
            o = t.height();
        i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i), "right" == c ? i.cssBefore.left = -s : "up" == c ? i.cssBefore.top = o : "down" == c ? i.cssBefore.top = -o : i.cssBefore.left = s }), i.animIn.left = 0, i.animIn.top = 0, i.cssBefore.top = 0, i.cssBefore.left = 0
    }, e.fn.cycle.transitions.uncover = function(t, n, i) {
        var c = i.direction || "left",
            s = t.css("overflow", "hidden").width(),
            o = t.height();
        i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !0, !0, !0), "right" == c ? i.animOut.left = s : "up" == c ? i.animOut.top = -o : "down" == c ? i.animOut.top = o : i.animOut.left = -s }), i.animIn.left = 0, i.animIn.top = 0, i.cssBefore.top = 0, i.cssBefore.left = 0
    }, e.fn.cycle.transitions.toss = function(t, n, i) {
        var c = t.css("overflow", "visible").width(),
            s = t.height();
        i.before.push(function(t, n, i) { e.fn.cycle.commonReset(t, n, i, !0, !0, !0), i.animOut.left || i.animOut.top ? i.animOut.opacity = 0 : e.extend(i.animOut, { left: 2 * c, top: -s / 2, opacity: 0 }) }), i.cssBefore.left = 0, i.cssBefore.top = 0, i.animIn.left = 0
    }, e.fn.cycle.transitions.wipe = function(t, n, i) {
        var c = t.css("overflow", "hidden").width(),
            s = t.height();
        i.cssBefore = i.cssBefore || {};
        var o;
        if (i.clip)
            if (/l2r/.test(i.clip)) o = "rect(0px 0px " + s + "px 0px)";
            else if (/r2l/.test(i.clip)) o = "rect(0px " + c + "px " + s + "px " + c + "px)";
        else if (/t2b/.test(i.clip)) o = "rect(0px " + c + "px 0px 0px)";
        else if (/b2t/.test(i.clip)) o = "rect(" + s + "px " + c + "px " + s + "px 0px)";
        else if (/zoom/.test(i.clip)) {
            var r = parseInt(s / 2, 10),
                l = parseInt(c / 2, 10);
            o = "rect(" + r + "px " + l + "px " + r + "px " + l + "px)"
        }
        i.cssBefore.clip = i.cssBefore.clip || o || "rect(0px 0px 0px 0px)";
        var a = i.cssBefore.clip.match(/(\d+)/g),
            f = parseInt(a[0], 10),
            u = parseInt(a[1], 10),
            d = parseInt(a[2], 10),
            h = parseInt(a[3], 10);
        i.before.push(function(t, n, i) {
            if (t != n) {
                var o = e(t),
                    r = e(n);
                e.fn.cycle.commonReset(t, n, i, !0, !0, !1), i.cssAfter.display = "block";
                var l = 1,
                    a = parseInt(i.speedIn / 13, 10) - 1;
                ! function p() {
                    var e = f ? f - parseInt(l * (f / a), 10) : 0,
                        t = h ? h - parseInt(l * (h / a), 10) : 0,
                        n = s > d ? d + parseInt(l * ((s - d) / a || 1), 10) : s,
                        i = c > u ? u + parseInt(l * ((c - u) / a || 1), 10) : c;
                    r.css({ clip: "rect(" + e + "px " + i + "px " + n + "px " + t + "px)" }), l++ <= a ? setTimeout(p, 13) : o.css("display", "none")
                }()
            }
        }), e.extend(i.cssBefore, { display: "block", opacity: 1, top: 0, left: 0 }), i.animIn = { left: 0 }, i.animOut = { left: 0 }
    }
}(jQuery);

/*	--------------------------------------------------------------------
	MaxImage 2.0 (Fullscreen Slideshow for use with jQuery Cycle Plugin)
	--------------------------------------------------------------------
	
	Examples and documentation at: http://www.aaronvanderzwan.com/maximage/2.0/
	Copyright (c) 2007-2012 Aaron Vanderzwan
	Dual licensed under the MIT and GPL licenses.
	
	NOTES:
	This plugin is intended to simplify the creation of fullscreen 
	background slideshows.  It is intended to be used alongside the 
	jQuery Cycle plugin: 
	http://jquery.malsup.com/cycle/
	
	If you simply need a fullscreen background image, please
	refer to the following document for ways to do this that
	are much more simple:
	http://css-tricks.com/perfect-full-page-background-image/
	
	If you have any questions please contact Aaron Vanderzwan
	at http://www.aaronvanderzwan.com/blog/
	Documentation at:
	http://blog.aaronvanderzwan.com/2012/07/maximage-2-0/
	
	HISTORY:
	MaxImage 2.0 is a project first built as jQuery MaxImage Plugin 
	(http://www.aaronvanderzwan.com/maximage/). Once CSS3 came along, 
	the background-size:cover solved the problem MaxImage
	was intended to solve.  However, fully customizable
	fullscreen slideshows is still fairly complex and I have not
	found any helpers for integrating with the jQuery Cycle Plugin.
	MaxCycle is intended to solve this problem.
	
	TABLE OF CONTENTS:
	@Modern
		@setup
		@resize
		@preload
	@Old
		@setup
		@preload
		@onceloaded
		@maximage
		@windowresize
		@doneresizing
	@Cycle
		@setup
	@Adjust
		@center
		@fill
		@maxcover
		@maxcontain
	@Utils
		@browser_tests
		@construct_slide_object
		@sizes
	@modern_browser
	@debug
		
*/
/*!	
 * Maximage Version: 2.0.8 (16-Jan-2012) - http://www.aaronvanderzwan.com/maximage/2.0/
 */

! function(e) {
    "use strict";
    e.fn.maximage = function(i, t) {
        function a(e) { window.console && window.console.log && window.console.log(e) }
        var d;
        ("object" == typeof i || void 0 === i) && (d = e.extend(e.fn.maximage.defaults, i || {})), "string" == typeof i && (d = e.fn.maximage.defaults), e.Body = e("body"), e.Window = e(window), e.Scroll = e("html, body"), e.Events = { RESIZE: "resize" }, this.each(function() {
            var t = e(this),
                n = 0,
                s = [],
                o = {
                    setup: function() {
                        if (e.Slides.length > 0) {
                            var i, a = e.Slides.length;
                            for (i = 0; a > i; i++) {
                                var d = e.Slides[i];
                                t.append('<div class="mc-image ' + d.theclass + '" title="' + d.alt + '" style="background-image:url(\'' + d.url + "');" + d.style + '" data-href="' + d.datahref + '">' + d.content + "</div>")
                            }
                            o.preload(0), o.resize()
                        }
                    },
                    preload: function(i) {
                        var a = e("<img/>");
                        a.on("load", function() { 0 == n && (c.setup(), d.onFirstImageLoaded()), n == e.Slides.length - 1 ? d.onImagesLoaded(t) : (n++, o.preload(n)) }), a[0].src = e.Slides[i].url, s.push(a[0])
                    },
                    resize: function() { e.Window.bind(e.Events.RESIZE, function() { e.Scroll.addClass("mc-hide-scrolls"), e.Window.data("h", h.sizes().h).data("w", h.sizes().w), t.height(e.Window.data("h")).width(e.Window.data("w")).children().height(e.Window.data("h")).width(e.Window.data("w")), t.children().each(function() { this.cycleH = e.Window.data("h"), this.cycleW = e.Window.data("w") }), e(e.Scroll).removeClass("mc-hide-scrolls") }) }
                },
                r = {
                    setup: function() {
                        var i, a, n, s = e.Slides.length;
                        if (e.BrowserTests.msie && !d.overrideMSIEStop && document.execCommand("Stop", !1), t.html(""), e.Body.addClass("mc-old-browser"), e.Slides.length > 0) {
                            for (e.Scroll.addClass("mc-hide-scrolls"), e.Window.data("h", h.sizes().h).data("w", h.sizes().w), e("body").append(e("<div></div>").attr("class", "mc-loader").css({ position: "absolute", left: "-9999px" })), n = 0; s > n; n++) i = 0 == e.Slides[n].content.length ? '<img src="' + e.Slides[n].url + '" />' : e.Slides[n].content, a = e("<div>" + i + "</div>").attr("class", "mc-image mc-image-n" + n + " " + e.Slides[n].theclass), t.append(a), 0 == e(".mc-image-n" + n).children("img").length || e("div.mc-loader").append(e(".mc-image-n" + n).children("img").first().clone().addClass("not-loaded"));
                            r.preload(), r.windowResize()
                        }
                    },
                    preload: function() {
                        var i = setInterval(function() {
                            e(".mc-loader").children("img").each(function(i) {
                                var t = e(this);
                                if (t.hasClass("not-loaded") && t.height() > 0) {
                                    e(this).removeClass("not-loaded");
                                    var a = e("div.mc-image-n" + i).children("img").first();
                                    a.data("h", t.height()).data("w", t.width()).data("ar", t.width() / t.height()), r.onceLoaded(i)
                                }
                            }), 0 == e(".not-loaded").length && (e(".mc-loader").remove(), clearInterval(i))
                        }, 1e3)
                    },
                    onceLoaded: function(i) { r.maximage(i), 0 == i ? (t.css({ visibility: "visible" }), d.onFirstImageLoaded()) : i == e.Slides.length - 1 && (c.setup(), e(e.Scroll).removeClass("mc-hide-scrolls"), d.onImagesLoaded(t), d.debug && (a(" - Final Maximage - "), a(t))) },
                    maximage: function(i) { e("div.mc-image-n" + i).height(e.Window.data("h")).width(e.Window.data("w")).children("img").first().each(function() { l.maxcover(e(this)) }) },
                    windowResize: function() { e.Window.bind(e.Events.RESIZE, function() { clearTimeout(this.id), e(".mc-image").length >= 1 && (this.id = setTimeout(r.doneResizing, 200)) }) },
                    doneResizing: function() {
                        e(e.Scroll).addClass("mc-hide-scrolls"), e.Window.data("h", h.sizes().h).data("w", h.sizes().w), t.height(e.Window.data("h")).width(e.Window.data("w")), t.find(".mc-image").each(function(e) { r.maximage(e) });
                        var i = t.data("cycle.opts");
                        void 0 != i && (i.height = e.Window.data("h"), i.width = e.Window.data("w"), jQuery.each(i.elements, function(i, t) { t.cycleW = e.Window.data("w"), t.cycleH = e.Window.data("h") })), e(e.Scroll).removeClass("mc-hide-scrolls")
                    }
                },
                c = {
                    setup: function() {
                        t.addClass("mc-cycle"), e.Window.data("h", h.sizes().h).data("w", h.sizes().w), jQuery.easing.easeForCSSTransition = function(e, i, t, a, d, n) { return t + a };
                        var i = e.extend({ fit: 1, containerResize: 0, height: e.Window.data("h"), width: e.Window.data("w"), slideResize: !1, easing: e.BrowserTests.cssTransitions && d.cssTransitions ? "easeForCSSTransition" : "swing" }, d.cycleOptions);
                        t.cycle(i)
                    }
                },
                l = { center: function(i) { d.verticalCenter && i.css({ marginTop: (i.height() - e.Window.data("h")) / 2 * -1 }), d.horizontalCenter && i.css({ marginLeft: (i.width() - e.Window.data("w")) / 2 * -1 }) }, fill: function(i) { var t = i.is("object") ? i.parent().first() : i; "function" == typeof d.backgroundSize ? d.backgroundSize(i) : "cover" == d.backgroundSize ? e.Window.data("w") / e.Window.data("h") < t.data("ar") ? i.height(e.Window.data("h")).width((e.Window.data("h") * t.data("ar")).toFixed(0)) : i.height((e.Window.data("w") / t.data("ar")).toFixed(0)).width(e.Window.data("w")) : "contain" == d.backgroundSize ? e.Window.data("w") / e.Window.data("h") < t.data("ar") ? i.height((e.Window.data("w") / t.data("ar")).toFixed(0)).width(e.Window.data("w")) : i.height(e.Window.data("h")).width((e.Window.data("h") * t.data("ar")).toFixed(0)) : a("The backgroundSize option was not recognized for older browsers.") }, maxcover: function(e) { l.fill(e), l.center(e) }, maxcontain: function(e) { l.fill(e), l.center(e) } },
                h = {
                    browser_tests: function() {
                        var i = e("<div />")[0],
                            t = ["Moz", "Webkit", "Khtml", "O", "ms"],
                            n = "transition",
                            s = { cssTransitions: !1, cssBackgroundSize: "backgroundSize" in i.style && d.cssBackgroundSize, html5Video: !1, msie: !1 };
                        if (d.cssTransitions) { "string" == typeof i.style[n] && (s.cssTransitions = !0), n = n.charAt(0).toUpperCase() + n.substr(1); for (var o = 0; o < t.length; o++) t[o] + n in i.style && (s.cssTransitions = !0) }
                        return document.createElement("video").canPlayType && (s.html5Video = !0), s.msie = void 0 !== h.msie(), d.debug && (a(" - Browser Test - "), a(s)), s
                    },
                    construct_slide_object: function() {
                        var i = new Object,
                            n = new Array;
                        return t.children().each(function(t) {
                            var a = e(this).is("img") ? e(this).clone() : e(this).find("img").first().clone();
                            i = {}, i.url = a.attr("src"), i.title = void 0 != a.attr("title") ? a.attr("title") : "", i.alt = void 0 != a.attr("alt") ? a.attr("alt") : "", i.theclass = void 0 != a.attr("class") ? a.attr("class") : "", i.styles = void 0 != a.attr("style") ? a.attr("style") : "", i.orig = a.clone(), i.datahref = void 0 != a.attr("data-href") ? a.attr("data-href") : "", i.content = "", e(this).find("img").length > 0 && (e.BrowserTests.cssBackgroundSize && e(this).find("img").first().remove(), i.content = e(this).html()), a[0].src = "", e.BrowserTests.cssBackgroundSize && e(this).remove(), n.push(i)
                        }), d.debug && (a(" - Slide Object - "), a(n)), n
                    },
                    msie: function() { for (var e, i = 3, t = document.createElement("div"), a = t.getElementsByTagName("i"); t.innerHTML = "<!--[if gt IE " + ++i + "]><i></i><![endif]-->", a[0];); return i > 4 ? i : e },
                    sizes: function() {
                        var i = { h: 0, w: 0 };
                        if ("window" == d.fillElement) i.h = e.Window.height(), i.w = e.Window.width();
                        else {
                            var a = t.parents(d.fillElement).first();
                            0 == a.height() || 1 == a.data("windowHeight") ? (a.data("windowHeight", !0), i.h = e.Window.height()) : i.h = a.height(), 0 == a.width() || 1 == a.data("windowWidth") ? (a.data("windowWidth", !0), i.w = e.Window.width()) : i.w = a.width()
                        }
                        return i
                    }
                };
            if (e.BrowserTests = h.browser_tests(), "string" == typeof i) {
                if (e.BrowserTests.html5Video || !t.is("video")) {
                    var w, g = t.is("object") ? t.parent().first() : t;
                    e.Body.hasClass("mc-old-browser") || e.Body.addClass("mc-old-browser"), e.Window.data("h", h.sizes().h).data("w", h.sizes().w), g.data("h", t.height()).data("w", t.width()).data("ar", t.width() / t.height()), e.Window.bind(e.Events.RESIZE, function() { e.Window.data("h", h.sizes().h).data("w", h.sizes().w), w = t.data("resizer"), clearTimeout(w), w = setTimeout(l[i](t), 200), t.data("resizer", w) }), l[i](t)
                }
            } else e.Slides = h.construct_slide_object(), e.BrowserTests.cssBackgroundSize ? (d.debug && a(" - Using Modern - "), o.setup()) : (d.debug && a(" - Using Old - "), r.setup())
        })
    }, e.fn.maximage.defaults = { debug: !1, cssBackgroundSize: !0, cssTransitions: !0, verticalCenter: !0, horizontalCenter: !0, scaleInterval: 20, backgroundSize: "cover", fillElement: "window", overrideMSIEStop: !1, onFirstImageLoaded: function() {}, onImagesLoaded: function() {} }
}(jQuery);

/*!
 * fullPage 2.6.6
 * https://github.com/alvarotrigo/fullPage.js
 * @license MIT licensed
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */
! function(e, n) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], function(o) { return n(o, e, e.document, e.Math) }) : "undefined" != typeof exports ? module.exports = n(require("jquery"), e, e.document, e.Math) : n(jQuery, e, e.document, e.Math) }("undefined" != typeof window ? window : this, function(e, n, o, t, i) {
    "use strict";
    var a = "fullpage-wrapper",
        s = "." + a,
        l = "fp-scrollable",
        r = "." + l,
        c = ".slimScrollBar",
        d = ".slimScrollRail",
        f = "fp-responsive",
        u = "fp-notransition",
        h = "fp-destroyed",
        p = "fp-enabled",
        v = "fp-viewing",
        g = "active",
        m = "." + g,
        S = ".section",
        w = "fp-section",
        y = "." + w,
        x = y + m,
        b = y + ":first",
        T = y + ":last",
        C = "fp-tableCell",
        k = "." + C,
        A = "fp-nav",
        L = "#" + A,
        E = "fp-tooltip",
        B = "fp-show-active",
        M = ".slide",
        R = "fp-slide",
        z = "." + R,
        I = z + m,
        P = "fp-slides",
        F = "." + P,
        H = "fp-slidesContainer",
        D = "." + H,
        V = "fp-table",
        q = "fp-slidesNav",
        O = "." + q,
        U = O + " a",
        Y = "fp-controlArrow",
        W = "." + Y,
        N = "fp-prev",
        K = "." + N,
        X = Y + " " + N,
        j = W + K,
        Q = "fp-next",
        $ = "." + Q,
        _ = Y + " " + Q,
        G = W + $,
        J = e(n),
        Z = e(o);
    e.fn.fullpage = function(Y) {
        function K(e) { e.find(F).after('<div class="' + X + '"></div><div class="' + _ + '"></div>'), "#fff" != Y.controlArrowColor && (e.find(G).css("border-color", "transparent transparent transparent " + Y.controlArrowColor), e.find(j).css("border-color", "transparent " + Y.controlArrowColor + " transparent transparent")), Y.loopHorizontal || e.find(j).hide() }

        function Q() {
            gn.append('<div id="' + A + '"><ul></ul></div>'), yn = e(L), yn.addClass(function() { return Y.showActiveTooltip ? B + " " + Y.navigationPosition : Y.navigationPosition });
            for (var n = 0; n < e(y).length; n++) {
                var o = "";
                Y.anchors.length && (o = Y.anchors[n]);
                var t = '<li><a href="#' + o + '"><span></span></a>',
                    i = Y.navigationTooltips[n];
                "undefined" != typeof i && "" !== i && (t += '<div class="' + E + " " + Y.navigationPosition + '">' + i + "</div>"), t += "</li>", yn.find("ul").append(t)
            }
        }

        function $() {
            e(y).each(function() {
                var n = e(this).find(z);
                n.length ? n.each(function() { qe(e(this)) }) : qe(e(this))
            }), ee()
        }

        function ee() {
            var n = e(x);
            ne(n), we(n), ye(n), e.isFunction(Y.afterLoad) && Y.afterLoad.call(n, n.data("anchor"), n.index(y) + 1), e.isFunction(Y.afterRender) && Y.afterRender.call(this)
        }

        function ne(e) {
            var n = e.find("SLIDES_WRAPPER"),
                o = e.find(r);
            n.length && (o = n.find(I)), o.mouseover()
        }

        function oe() {
            var n;
            if (!Y.autoScrolling || Y.scrollBar) {
                for (var i = J.scrollTop(), a = 0, s = t.abs(i - o.querySelectorAll(y)[0].offsetTop), l = o.querySelectorAll(y), r = 0; r < l.length; ++r) {
                    var c = l[r],
                        d = t.abs(i - c.offsetTop);
                    s > d && (a = r, s = d)
                }
                n = e(l).eq(a)
            }
            if (!Y.autoScrolling || Y.scrollBar) {
                if (!n.hasClass(g)) {
                    Pn = !0;
                    var f = e(x),
                        u = f.index(y) + 1,
                        h = De(n),
                        p = n.data("anchor"),
                        v = n.index(y) + 1,
                        m = n.find(I);
                    if (m.length) var S = m.data("anchor"),
                        w = m.index();
                    En && (n.addClass(g).siblings().removeClass(g), e.isFunction(Y.onLeave) && Y.onLeave.call(f, u, v, h), e.isFunction(Y.afterLoad) && Y.afterLoad.call(n, p, v), we(n), Fe(p, v - 1), Y.anchors.length && (Sn = p, $e(w, S, p, v))), clearTimeout(zn), zn = setTimeout(function() { Pn = !1 }, 100)
                }
                Y.fitToSection && (clearTimeout(In), In = setTimeout(function() { En && (e(x).is(n) && (Ln = !0), he(n), Ln = !1) }, 1e3))
            }
        }

        function te(e) { return e.find(F).length ? e.find(I).find(r) : e.find(r) }

        function ie(e, n) {
            if (Mn.m[e]) {
                var o, t;
                if ("down" == e ? (o = "bottom", t = mn.moveSectionDown) : (o = "top", t = mn.moveSectionUp), n.length > 0) {
                    if (!He(o, n)) return !0;
                    t()
                } else t()
            }
        }

        function ae(n) {
            var o = n.originalEvent;
            if (!se(n.target) && le(o)) {
                Y.autoScrolling && n.preventDefault();
                var i = e(x),
                    a = te(i);
                if (En && !bn) {
                    var s = sn(o);
                    Dn = s.y, Vn = s.x, i.find(F).length && t.abs(Hn - Vn) > t.abs(Fn - Dn) ? t.abs(Hn - Vn) > J.width() / 100 * Y.touchSensitivity && (Hn > Vn ? Mn.m.right && mn.moveSlideRight() : Mn.m.left && mn.moveSlideLeft()) : Y.autoScrolling && t.abs(Fn - Dn) > J.height() / 100 * Y.touchSensitivity && (Fn > Dn ? ie("down", a) : Dn > Fn && ie("up", a))
                }
            }
        }

        function se(n, o) { o = o || 0; var t = e(n).parent(); return o < Y.normalScrollElementTouchThreshold && t.is(Y.normalScrollElements) ? !0 : o == Y.normalScrollElementTouchThreshold ? !1 : se(t, ++o) }

        function le(e) { return "undefined" == typeof e.pointerType || "mouse" != e.pointerType }

        function re(e) {
            var n = e.originalEvent;
            if (Y.fitToSection && vn.stop(), le(n)) {
                var o = sn(n);
                Fn = o.y, Hn = o.x
            }
        }

        function ce(e, n) { for (var o = 0, i = e.slice(t.max(e.length - n, 1)), a = 0; a < i.length; a++) o += i[a]; return t.ceil(o / n) }

        function de(o) {
            var i = (new Date).getTime();
            if (Y.autoScrolling && !xn) {
                o = o || n.event;
                var a = o.wheelDelta || -o.deltaY || -o.detail,
                    s = t.max(-1, t.min(1, a));
                Bn.length > 149 && Bn.shift(), Bn.push(t.abs(a)), Y.scrollBar && (o.preventDefault ? o.preventDefault() : o.returnValue = !1);
                var l = e(x),
                    r = te(l),
                    c = i - qn;
                if (qn = i, c > 200 && (Bn = []), En) {
                    var d = ce(Bn, 10),
                        f = ce(Bn, 70),
                        u = d >= f;
                    u && (0 > s ? ie("down", r) : ie("up", r))
                }
                return !1
            }
            Y.fitToSection && vn.stop()
        }

        function fe(n) {
            var o = e(x),
                t = o.find(F),
                i = t.find(z).length;
            if (!(!t.length || bn || 2 > i)) {
                var a = t.find(I),
                    s = null;
                if (s = "prev" === n ? a.prev(z) : a.next(z), !s.length) {
                    if (!Y.loopHorizontal) return;
                    s = "prev" === n ? a.siblings(":last") : a.siblings(":first")
                }
                bn = !0, Le(t, s)
            }
        }

        function ue() { e(I).each(function() { ln(e(this), "internal") }) }

        function he(n, o, t) {
            var i = n.position();
            if ("undefined" != typeof i) {
                var a = { element: n, callback: o, isMovementUp: t, dest: i, dtop: i.top, yMovement: De(n), anchorLink: n.data("anchor"), sectionIndex: n.index(y), activeSlide: n.find(I), activeSection: e(x), leavingSection: e(x).index(y) + 1, localIsResizing: Ln };
                if (!(a.activeSection.is(n) && !Ln || Y.scrollBar && J.scrollTop() === a.dtop)) {
                    if (a.activeSlide.length) var s = a.activeSlide.data("anchor"),
                        l = a.activeSlide.index();
                    if (Y.autoScrolling && Y.continuousVertical && "undefined" != typeof a.isMovementUp && (!a.isMovementUp && "up" == a.yMovement || a.isMovementUp && "down" == a.yMovement) && (a = ge(a)), e.isFunction(Y.onLeave) && !a.localIsResizing) {
                        if (Y.onLeave.call(a.activeSection, a.leavingSection, a.sectionIndex + 1, a.yMovement) === !1) return;
                        xe(a.activeSection)
                    }
                    n.addClass(g).siblings().removeClass(g), En = !1, $e(l, s, a.anchorLink, a.sectionIndex), pe(a), Sn = a.anchorLink, Fe(a.anchorLink, a.sectionIndex)
                }
            }
        }

        function pe(n) {
            if (Y.css3 && Y.autoScrolling && !Y.scrollBar) {
                var o = "translate3d(0px, -" + n.dtop + "px, 0px)";
                We(o, !0), Y.scrollingSpeed ? setTimeout(function() { Se(n) }, Y.scrollingSpeed) : Se(n)
            } else {
                var t = ve(n);
                e(t.element).animate(t.options, Y.scrollingSpeed, Y.easing).promise().done(function() { Se(n) })
            }
        }

        function ve(e) { var n = {}; return Y.autoScrolling && !Y.scrollBar ? (n.options = { top: -e.dtop }, n.element = s) : (n.options = { scrollTop: e.dtop }, n.element = "html, body"), n }

        function ge(n) { return n.isMovementUp ? e(x).before(n.activeSection.nextAll(y)) : e(x).after(n.activeSection.prevAll(y).get().reverse()), rn(e(x).position().top), ue(), n.wrapAroundElements = n.activeSection, n.dest = n.element.position(), n.dtop = n.dest.top, n.yMovement = De(n.element), n }

        function me(n) { n.wrapAroundElements && n.wrapAroundElements.length && (n.isMovementUp ? e(b).before(n.wrapAroundElements) : e(T).after(n.wrapAroundElements), rn(e(x).position().top), ue()) }

        function Se(n) { me(n), n.element.find(".fp-scrollable").mouseover(), e.isFunction(Y.afterLoad) && !n.localIsResizing && Y.afterLoad.call(n.element, n.anchorLink, n.sectionIndex + 1), we(n.element), ye(n.element), En = !0, e.isFunction(n.callback) && n.callback.call(this) }

        function we(n) { n.find("img[data-src], video[data-src], audio[data-src]").each(function() { e(this).attr("src", e(this).data("src")), e(this).removeAttr("data-src") }) }

        function ye(n) {
            n.find("video, audio").each(function() {
                var n = e(this).get(0);
                n.hasAttribute("autoplay") && "function" == typeof n.play && n.play()
            })
        }

        function xe(n) {
            n.find("video, audio").each(function() {
                var n = e(this).get(0);
                n.hasAttribute("data-ignore") || "function" != typeof n.pause || n.pause()
            })
        }

        function be() {
            var e = n.location.hash.replace("#", "").split("/"),
                o = e[0],
                t = e[1];
            o && Xe(o, t)
        }

        function Te() {
            if (!Pn && !Y.lockAnchors) {
                var e = n.location.hash.replace("#", "").split("/"),
                    o = e[0],
                    t = e[1];
                if (o.length) {
                    var i = "undefined" == typeof Sn,
                        a = "undefined" == typeof Sn && "undefined" == typeof t && !bn;
                    (o && o !== Sn && !i || a || !bn && wn != t) && Xe(o, t)
                }
            }
        }

        function Ce(n) {
            clearTimeout(On);
            var o = e(":focus");
            if (!o.is("textarea") && !o.is("input") && !o.is("select") && Y.keyboardScrolling && Y.autoScrolling) {
                var t = n.which,
                    i = [40, 38, 32, 33, 34];
                e.inArray(t, i) > -1 && n.preventDefault(), On = setTimeout(function() { ke(n) }, 150)
            }
        }

        function ke(n) {
            var o = n.shiftKey;
            switch (xn = n.ctrlKey, n.which) {
                case 38:
                case 33:
                    Mn.k.up && mn.moveSectionUp();
                    break;
                case 32:
                    if (o && Mn.k.up) { mn.moveSectionUp(); break }
                case 40:
                case 34:
                    Mn.k.down && mn.moveSectionDown();
                    break;
                case 36:
                    Mn.k.up && mn.moveTo(1);
                    break;
                case 35:
                    Mn.k.down && mn.moveTo(e(y).length);
                    break;
                case 37:
                    Mn.k.left && mn.moveSlideLeft();
                    break;
                case 39:
                    Mn.k.right && mn.moveSlideRight();
                    break;
                default:
                    return
            }
        }

        function Ae(e) { En && (e.pageY < Un ? mn.moveSectionUp() : e.pageY > Un && mn.moveSectionDown()), Un = e.pageY }

        function Le(n, o) {
            var i = o.position(),
                a = o.index(),
                s = n.closest(y),
                l = s.index(y),
                r = s.data("anchor"),
                c = s.find(O),
                d = Ge(o),
                f = Ln;
            if (Y.onSlideLeave) {
                var u = s.find(I),
                    h = u.index(),
                    p = Ve(h, a);
                if (!f && "none" !== p && e.isFunction(Y.onSlideLeave) && Y.onSlideLeave.call(u, r, l + 1, h, p, a) === !1) return void(bn = !1)
            }
            o.addClass(g).siblings().removeClass(g), !Y.loopHorizontal && Y.controlArrows && (s.find(j).toggle(0 !== a), s.find(G).toggle(!o.is(":last-child"))), s.hasClass(g) && $e(a, d, r, l);
            var v = function() { f || e.isFunction(Y.afterSlideLoad) && Y.afterSlideLoad.call(o, r, l + 1, d, a), bn = !1 };
            if (Y.css3) {
                var S = "translate3d(-" + t.round(i.left) + "px, 0px, 0px)";
                Me(n.find(D), Y.scrollingSpeed > 0).css(cn(S)), setTimeout(function() { v() }, Y.scrollingSpeed, Y.easing)
            } else n.animate({ scrollLeft: t.round(i.left) }, Y.scrollingSpeed, Y.easing, function() { v() });
            c.find(m).removeClass(g), c.find("li").eq(a).find("a").addClass(g)
        }

        function Ee() {
            if (Be(), Tn) {
                var n = e(o.activeElement);
                if (!n.is("textarea") && !n.is("input") && !n.is("select")) {
                    var i = J.height();
                    t.abs(i - Wn) > 20 * t.max(Wn, i) / 100 && (mn.reBuild(!0), Wn = i)
                }
            } else clearTimeout(Yn), Yn = setTimeout(function() { mn.reBuild(!0) }, 350)
        }

        function Be() {
            var e = Y.responsive || Y.responsiveWidth,
                n = Y.responsiveHeight;
            if (e && mn.setResponsive(J.width() < e), n) {
                var o = kn.hasClass(f);
                o || mn.setResponsive(J.height() < n)
            }
        }

        function Me(e) { var n = "all " + Y.scrollingSpeed + "ms " + Y.easingcss3; return e.removeClass(u), e.css({ "-webkit-transition": n, transition: n }) }

        function Re(e) { return e.addClass(u) }

        function ze(e, n) {
            var o = 825,
                i = 900;
            if (o > e || i > n) {
                var a = 100 * e / o,
                    s = 100 * n / i,
                    l = t.min(a, s),
                    r = l.toFixed(2);
                gn.css("font-size", r + "%")
            } else gn.css("font-size", "100%")
        }

        function Ie(n, o) { Y.navigation && (e(L).find(m).removeClass(g), n ? e(L).find('a[href="#' + n + '"]').addClass(g) : e(L).find("li").eq(o).find("a").addClass(g)) }

        function Pe(n) { Y.menu && (e(Y.menu).find(m).removeClass(g), e(Y.menu).find('[data-menuanchor="' + n + '"]').addClass(g)) }

        function Fe(e, n) { Pe(e), Ie(e, n) }

        function He(e, n) { return "top" === e ? !n.scrollTop() : "bottom" === e ? n.scrollTop() + 1 + n.innerHeight() >= n[0].scrollHeight : void 0 }

        function De(n) {
            var o = e(x).index(y),
                t = n.index(y);
            return o == t ? "none" : o > t ? "up" : "down"
        }

        function Ve(e, n) { return e == n ? "none" : e > n ? "left" : "right" }

        function qe(e) {
            e.css("overflow", "hidden");
            var n, o = e.closest(y),
                t = e.find(r);
            t.length ? n = t.get(0).scrollHeight : (n = e.get(0).scrollHeight, Y.verticalCentered && (n = e.find(k).get(0).scrollHeight));
            var i = An - parseInt(o.css("padding-bottom")) - parseInt(o.css("padding-top"));
            n > i ? t.length ? t.css("height", i + "px").parent().css("height", i + "px") : (Y.verticalCentered ? e.find(k).wrapInner('<div class="' + l + '" />') : e.wrapInner('<div class="' + l + '" />'), e.find(r).slimScroll({ allowPageScroll: !0, height: i + "px", size: "10px", alwaysVisible: !0 })) : Oe(e), e.css("overflow", "")
        }

        function Oe(e) { e.find(r).children().first().unwrap().unwrap(), e.find(c).remove(), e.find(d).remove() }

        function Ue(e) { e.addClass(V).wrapInner('<div class="' + C + '" style="height:' + Ye(e) + 'px;" />') }

        function Ye(e) {
            var n = An;
            if (Y.paddingTop || Y.paddingBottom) {
                var o = e;
                o.hasClass(w) || (o = e.closest(y));
                var t = parseInt(o.css("padding-top")) + parseInt(o.css("padding-bottom"));
                n = An - t
            }
            return n
        }

        function We(e, n) { n ? Me(kn) : Re(kn), kn.css(cn(e)), setTimeout(function() { kn.removeClass(u) }, 10) }

        function Ne(n) { var o = e(y + '[data-anchor="' + n + '"]'); return o.length || (o = e(y).eq(n - 1)), o }

        function Ke(e, n) {
            var o = n.find(F),
                t = o.find(z + '[data-anchor="' + e + '"]');
            return t.length || (t = o.find(z).eq(e)), t
        }

        function Xe(e, n) { var o = Ne(e); "undefined" == typeof n && (n = 0), e === Sn || o.hasClass(g) ? je(o, n) : he(o, function() { je(o, n) }) }

        function je(e, n) {
            if ("undefined" != typeof n) {
                var o = e.find(F),
                    t = Ke(n, e);
                t.length && Le(o, t)
            }
        }

        function Qe(e, n) {
            e.append('<div class="' + q + '"><ul></ul></div>');
            var o = e.find(O);
            o.addClass(Y.slidesNavPosition);
            for (var t = 0; n > t; t++) o.find("ul").append('<li><a href="#"><span></span></a></li>');
            o.css("margin-left", "-" + o.width() / 2 + "px"), o.find("li").first().find("a").addClass(g)
        }

        function $e(e, n, o, t) {
            var i = "";
            Y.anchors.length && !Y.lockAnchors && (e ? ("undefined" != typeof o && (i = o), "undefined" == typeof n && (n = e), wn = n, _e(i + "/" + n)) : "undefined" != typeof e ? (wn = n, _e(o)) : _e(o)), Je()
        }

        function _e(e) {
            if (Y.recordHistory) location.hash = e;
            else if (Tn || Cn) history.replaceState(i, i, "#" + e);
            else {
                var o = n.location.href.split("#")[0];
                n.location.replace(o + "#" + e)
            }
        }

        function Ge(e) {
            var n = e.data("anchor"),
                o = e.index();
            return "undefined" == typeof n && (n = o), n
        }

        function Je() {
            var n = e(x),
                o = n.find(I),
                t = n.data("anchor"),
                i = Ge(o),
                a = n.index(y),
                s = String(a);
            Y.anchors.length && (s = t), o.length && (s = s + "-" + i), s = s.replace("/", "-").replace("#", "");
            var l = new RegExp("\\b\\s?" + v + "-[^\\s]+\\b", "g");
            gn[0].className = gn[0].className.replace(l, ""), gn.addClass(v + "-" + s)
        }

        function Ze() {
            var e, t = o.createElement("p"),
                a = { webkitTransform: "-webkit-transform", OTransform: "-o-transform", msTransform: "-ms-transform", MozTransform: "-moz-transform", transform: "transform" };
            o.body.insertBefore(t, null);
            for (var s in a) t.style[s] !== i && (t.style[s] = "translate3d(1px,1px,1px)", e = n.getComputedStyle(t).getPropertyValue(a[s]));
            return o.body.removeChild(t), e !== i && e.length > 0 && "none" !== e
        }

        function en() { o.addEventListener ? (o.removeEventListener("mousewheel", de, !1), o.removeEventListener("wheel", de, !1), o.removeEventListener("DOMMouseScroll", de, !1)) : o.detachEvent("onmousewheel", de) }

        function nn() { o.addEventListener ? (o.addEventListener("mousewheel", de, !1), o.addEventListener("wheel", de, !1), o.addEventListener("DOMMouseScroll", de, !1)) : o.attachEvent("onmousewheel", de) }

        function on() {
            if (Tn || Cn) {
                var n = an();
                e(s).off("touchstart " + n.down).on("touchstart " + n.down, re), e(s).off("touchmove " + n.move).on("touchmove " + n.move, ae)
            }
        }

        function tn() {
            if (Tn || Cn) {
                var n = an();
                e(s).off("touchstart " + n.down), e(s).off("touchmove " + n.move)
            }
        }

        function an() { var e; return e = n.PointerEvent ? { down: "pointerdown", move: "pointermove" } : { down: "MSPointerDown", move: "MSPointerMove" } }

        function sn(e) { var n = []; return n.y = "undefined" != typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, n.x = "undefined" != typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, Cn && le(e) && (n.y = e.touches[0].pageY, n.x = e.touches[0].pageX), n }

        function ln(e, n) { mn.setScrollingSpeed(0, "internal"), "undefined" != typeof n && (Ln = !0), Le(e.closest(F), e), "undefined" != typeof n && (Ln = !1), mn.setScrollingSpeed(Rn.scrollingSpeed, "internal") }

        function rn(e) {
            if (Y.scrollBar) kn.scrollTop(e);
            else if (Y.css3) {
                var n = "translate3d(0px, -" + e + "px, 0px)";
                We(n, !1)
            } else kn.css("top", -e)
        }

        function cn(e) { return { "-webkit-transform": e, "-moz-transform": e, "-ms-transform": e, transform: e } }

        function dn(e, n, o) {
            switch (n) {
                case "up":
                    Mn[o].up = e;
                    break;
                case "down":
                    Mn[o].down = e;
                    break;
                case "left":
                    Mn[o].left = e;
                    break;
                case "right":
                    Mn[o].right = e;
                    break;
                case "all":
                    "m" == o ? mn.setAllowScrolling(e) : mn.setKeyboardScrolling(e)
            }
        }

        function fn() { rn(0), e(L + ", " + O + ", " + W).remove(), e(y).css({ height: "", "background-color": "", padding: "" }), e(z).css({ width: "" }), kn.css({ height: "", position: "", "-ms-touch-action": "", "touch-action": "" }), e(y + ", " + z).each(function() { Oe(e(this)), e(this).removeClass(V + " " + g) }), Re(kn), kn.find(k + ", " + D + ", " + F).each(function() { e(this).replaceWith(this.childNodes) }), vn.scrollTop(0) }

        function un(e, n, o) { Y[e] = n, "internal" !== o && (Rn[e] = n) }

        function hn() {
            Y.continuousVertical && (Y.loopTop || Y.loopBottom) && (Y.continuousVertical = !1, pn("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), Y.continuousVertical && Y.scrollBar && (Y.continuousVertical = !1, pn("warn", "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), e.each(Y.anchors, function(n, o) {
                (e("#" + o).length || e('[name="' + o + '"]').length) && pn("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).")
            })
        }

        function pn(e, n) { console && console[e] && console[e]("fullPage: " + n) }
        var vn = e("html, body"),
            gn = e("body"),
            mn = e.fn.fullpage;
        Y = e.extend({ menu: !1, anchors: [], lockAnchors: !1, navigation: !1, navigationPosition: "right", navigationTooltips: [], showActiveTooltip: !1, slidesNavigation: !1, slidesNavPosition: "bottom", scrollBar: !1, css3: !0, scrollingSpeed: 700, autoScrolling: !0, fitToSection: !0, easing: "easeInOutCubic", easingcss3: "ease", loopBottom: !1, loopTop: !1, loopHorizontal: !0, continuousVertical: !1, normalScrollElements: null, scrollOverflow: !1, touchSensitivity: 5, normalScrollElementTouchThreshold: 5, keyboardScrolling: !0, animateAnchor: !0, recordHistory: !0, controlArrows: !0, controlArrowColor: "#fff", verticalCentered: !0, resize: !1, sectionsColor: [], paddingTop: 0, paddingBottom: 0, fixedElements: null, responsive: 0, responsiveWidth: 0, responsiveHeight: 0, sectionSelector: S, slideSelector: M, afterLoad: null, onLeave: null, afterRender: null, afterResize: null, afterReBuild: null, afterSlideLoad: null, onSlideLeave: null }, Y), hn(), e.extend(e.easing, { easeInOutCubic: function(e, n, o, t, i) { return (n /= i / 2) < 1 ? t / 2 * n * n * n + o : t / 2 * ((n -= 2) * n * n + 2) + o } }), e.extend(e.easing, { easeInQuart: function(e, n, o, t, i) { return t * (n /= i) * n * n * n + o } }), mn.setAutoScrolling = function(n, o) {
            un("autoScrolling", n, o);
            var t = e(x);
            Y.autoScrolling && !Y.scrollBar ? (vn.css({ overflow: "hidden", height: "100vh" }), mn.setRecordHistory(Y.recordHistory, "internal"), kn.css({ "-ms-touch-action": "none", "touch-action": "none" }), t.length && rn(t.position().top)) : (vn.css({ overflow: "visible", height: "initial" }), mn.setRecordHistory(!1, "internal"), kn.css({ "-ms-touch-action": "", "touch-action": "" }), rn(0), t.length && vn.scrollTop(t.position().top))
        }, mn.setRecordHistory = function(e, n) { un("recordHistory", e, n) }, mn.setScrollingSpeed = function(e, n) { un("scrollingSpeed", e, n) }, mn.setFitToSection = function(e, n) { un("fitToSection", e, n) }, mn.setLockAnchors = function(e) { Y.lockAnchors = e }, mn.setMouseWheelScrolling = function(e) { e ? nn() : en() }, mn.setAllowScrolling = function(n, o) { "undefined" != typeof o ? (o = o.replace(/ /g, "").split(","), e.each(o, function(e, o) { dn(n, o, "m") })) : n ? (mn.setMouseWheelScrolling(!0), on()) : (mn.setMouseWheelScrolling(!1), tn()) }, mn.setKeyboardScrolling = function(n, o) { "undefined" != typeof o ? (o = o.replace(/ /g, "").split(","), e.each(o, function(e, o) { dn(n, o, "k") })) : Y.keyboardScrolling = n }, mn.moveSectionUp = function() {
            var n = e(x).prev(y);
            n.length || !Y.loopTop && !Y.continuousVertical || (n = e(y).last()), n.length && he(n, null, !0)
        }, mn.moveSectionDown = function() {
            var n = e(x).next(y);
            if (n.length || !Y.loopBottom && !Y.continuousVertical || (n = e(y).first()), n.length) {
                if (Y.onBeforeMoveSection && e.isFunction(Y.onBeforeMoveSection) && Y.onBeforeMoveSection.call(this, direction, currentSlide, destiny, slides, activeSection) === !1) return;
                he(n, null, !1)
            }
        }, mn.silentMoveTo = function(e, n) { mn.setScrollingSpeed(0, "internal"), mn.moveTo(e, n), mn.setScrollingSpeed(Rn.scrollingSpeed, "internal") }, mn.moveTo = function(e, n) { var o = Ne(e); "undefined" != typeof n ? Xe(e, n) : o.length > 0 && he(o) }, mn.moveSlideRight = function() { fe("next") }, mn.moveSlideLeft = function() { fe("prev") }, mn.reBuild = function(n) {
            if (!kn.hasClass(h)) {
                Ln = !0;
                var o = J.width();
                An = J.height(), Y.resize && ze(An, o), e(y).each(function() {
                    var n = e(this).find(F),
                        o = e(this).find(z);
                    Y.verticalCentered && e(this).find(k).css("height", Ye(e(this)) + "px"), e(this).css("height", An + "px"), Y.scrollOverflow && (o.length ? o.each(function() { qe(e(this)) }) : qe(e(this))), o.length > 1 && Le(n, n.find(I))
                });
                var t = e(x),
                    i = t.index(y);
                i && mn.silentMoveTo(i + 1), Ln = !1, e.isFunction(Y.afterResize) && n && Y.afterResize.call(kn), e.isFunction(Y.afterReBuild) && !n && Y.afterReBuild.call(kn)
            }
        }, mn.setResponsive = function(n) {
            var o = kn.hasClass(f);
            n ? o || (mn.setAutoScrolling(!1, "internal"), mn.setFitToSection(!1, "internal"), e(L).hide(), kn.addClass(f)) : o && (mn.setAutoScrolling(Rn.autoScrolling, "internal"), mn.setFitToSection(Rn.autoScrolling, "internal"), e(L).show(), kn.removeClass(f))
        };
        var Sn, wn, yn, xn, bn = !1,
            Tn = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
            Cn = "ontouchstart" in n || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
            kn = e(this),
            An = J.height(),
            Ln = !1,
            En = !0,
            Bn = [],
            Mn = {};
        Mn.m = { up: !0, down: !0, left: !0, right: !0 }, Mn.k = e.extend(!0, {}, Mn.m);
        var Rn = e.extend(!0, {}, Y);
        e(this).length ? (kn.css({ height: "100%", position: "relative" }), kn.addClass(a), e("html").addClass(p)) : pn("error", "Error! Fullpage.js needs to be initialized with a selector. For example: $('#myContainer').fullpage();"), Y.css3 && (Y.css3 = Ze()), mn.setAllowScrolling(!0), kn.removeClass(h), e(Y.sectionSelector).each(function() { e(this).addClass(w) }), e(Y.slideSelector).each(function() { e(this).addClass(R) }), Y.navigation && Q(), e(y).each(function(n) {
            var o = e(this),
                t = e(this).find(z),
                i = t.length;
            if (n || 0 !== e(x).length || e(this).addClass(g), e(this).css("height", An + "px"), Y.paddingTop && e(this).css("padding-top", Y.paddingTop), Y.paddingBottom && e(this).css("padding-bottom", Y.paddingBottom), "undefined" != typeof Y.sectionsColor[n] && e(this).css("background-color", Y.sectionsColor[n]), "undefined" != typeof Y.anchors[n] && (e(this).attr("data-anchor", Y.anchors[n]), e(this).hasClass(g) && Fe(Y.anchors[n], n)), i > 0) {
                var a = 100 * i,
                    s = 100 / i;
                t.wrapAll('<div class="' + H + '" />'), t.parent().wrap('<div class="' + P + '" />'), e(this).find(D).css("width", a + "%"), i > 1 && (Y.controlArrows && K(e(this)), Y.slidesNavigation && Qe(e(this), i)), t.each(function(n) { e(this).css("width", s + "%"), Y.verticalCentered && Ue(e(this)) });
                var l = o.find(I);
                l.length ? ln(l) : t.eq(0).addClass(g)
            } else Y.verticalCentered && Ue(e(this))
        }).promise().done(function() {
            mn.setAutoScrolling(Y.autoScrolling, "internal");
            var t = e(x).find(I);
            if (t.length && (0 !== e(x).index(y) || 0 === e(x).index(y) && 0 !== t.index()) && ln(t), Y.fixedElements && Y.css3 && e(Y.fixedElements).appendTo(gn), Y.navigation && (yn.css("margin-top", "-" + yn.height() / 2 + "px"), yn.find("li").eq(e(x).index(y)).find("a").addClass(g)), Y.menu && Y.css3 && e(Y.menu).closest(s).length && e(Y.menu).appendTo(gn), Y.scrollOverflow ? ("complete" === o.readyState && $(), J.on("load", $)) : ee(), Be(), !Y.animateAnchor) {
                var i = n.location.hash.replace("#", "").split("/"),
                    a = i[0];
                if (a.length) {
                    var l = e('[data-anchor="' + a + '"]');
                    l.length && (Y.autoScrolling ? rn(l.position().top) : (rn(0), vn.scrollTop(l.position().top)), Fe(a, null), e.isFunction(Y.afterLoad) && Y.afterLoad.call(l, a, l.index(y) + 1), l.addClass(g).siblings().removeClass(g))
                }
            }
            Je(), J.on("load", function() { be() })
        });
        var zn, In, Pn = !1;
        J.on("scroll", oe);
        var Fn = 0,
            Hn = 0,
            Dn = 0,
            Vn = 0,
            qn = (new Date).getTime();
        J.on("hashchange", Te), Z.keydown(Ce), Z.keyup(function(e) { xn = e.ctrlKey }), e(n).blur(function() { xn = !1 });
        var On;
        kn.mousedown(function(e) { 2 == e.which && (Un = e.pageY, kn.on("mousemove", Ae)) }), kn.mouseup(function(e) { 2 == e.which && kn.off("mousemove") });
        var Un = 0;
        Z.on("click touchstart", L + " a", function(n) {
            n.preventDefault();
            var o = e(this).parent().index();
            he(e(y).eq(o))
        }), Z.on("click touchstart", U, function(n) {
            n.preventDefault();
            var o = e(this).closest(y).find(F),
                t = o.find(z).eq(e(this).closest("li").index());
            Le(o, t)
        }), Y.normalScrollElements && (Z.on("mouseenter", Y.normalScrollElements, function() { mn.setMouseWheelScrolling(!1) }), Z.on("mouseleave", Y.normalScrollElements, function() { mn.setMouseWheelScrolling(!0) })), e(y).on("click touchstart", W, function() { e(this).hasClass(N) ? Mn.m.left && mn.moveSlideLeft() : Mn.m.right && mn.moveSlideRight() }), J.resize(Ee);
        var Yn, Wn = An;
        mn.destroy = function(n) { mn.setAutoScrolling(!1, "internal"), mn.setAllowScrolling(!1), mn.setKeyboardScrolling(!1), kn.addClass(h), J.off("scroll", oe).off("hashchange", Te).off("resize", Ee), Z.off("click", L + " a").off("mouseenter", L + " li").off("mouseleave", L + " li").off("click", U).off("mouseover", Y.normalScrollElements).off("mouseout", Y.normalScrollElements), e(y).off("click", W), n && fn() }
    }
});

/*!
 * multiscroll.js 0.1.8 Beta
 * https://github.com/alvarotrigo/multiscroll.js
 * @license MIT licensed
 *
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
! function(e, t, n, o, i) {
    e.fn.multiscroll = function(s) {
        function a() {
            var n = t.location.hash.replace("#", ""),
                o = n;
            if (o.length) {
                var i = e(".ms-left").find('[data-anchor="' + o + '"]'),
                    s = "undefined" == typeof lastScrolledDestiny;
                (s || o !== lastScrolledDestiny) && v(i)
            }
        }

        function l(t) {
            clearTimeout(O);
            var o = e(n.activeElement);
            if (!o.is("textarea") && !o.is("input") && !o.is("select") && s.keyboardScrolling) {
                var i = t.which,
                    a = [40, 38, 32, 33, 34];
                e.inArray(i, a) > -1 && t.preventDefault(), O = setTimeout(function() { r(t) }, 150)
            }
        }

        function r(t) {
            var n = t.shiftKey;
            switch (t.which) {
                case 38:
                case 33:
                    X.moveSectionUp();
                    break;
                case 32:
                    if (n) { X.moveSectionUp(); break }
                case 40:
                case 34:
                    X.moveSectionDown();
                    break;
                case 36:
                    X.moveTo(1);
                    break;
                case 35:
                    X.moveTo(e(".ms-left .ms-section").length);
                    break;
                default:
                    return
            }
        }

        function c(t) {
            t.preventDefault();
            var n = e(this).parent().index();
            v(e(".ms-left .ms-section").eq(n))
        }

        function m() {
            var t = e(this).data("tooltip");
            e('<div class="multiscroll-tooltip ' + s.navigationPosition + '">' + t + "</div>").hide().appendTo(e(this)).fadeIn(200)
        }

        function f() { e(this).find(".multiscroll-tooltip").fadeOut(200, function() { e(this).remove() }) }

        function d() { N = e(t).height(), e(".ms-tableCell").each(function() { e(this).css({ height: P(e(this).parent()) }) }), u(), e.isFunction(s.afterResize) && s.afterResize.call(this) }

        function u() { s.css3 ? (S(e(".ms-left"), "translate3d(0px, -" + e(".ms-left").find(".ms-section.active").position().top + "px, 0px)", !1), S(e(".ms-right"), "translate3d(0px, -" + e(".ms-right").find(".ms-section.active").position().top + "px, 0px)", !1)) : (e(".ms-left").css("top", -e(".ms-left").find(".ms-section.active").position().top), e(".ms-right").css("top", -e(".ms-right").find(".ms-section.active").position().top)) }

        function v(t) {
            var n = t.index(),
                o = e(".ms-right").find(".ms-section").eq(W - 1 - n),
                i = t.data("anchor"),
                a = e(".ms-left .ms-section.active"),
                l = a.index() + 1,
                r = b(t);
            K = !0;
            var c = { left: t.position().top, right: o.position().top };
            if (o.addClass("active").siblings().removeClass("active"), t.addClass("active").siblings().removeClass("active"), C(i), s.css3) {
                e.isFunction(s.onLeave) && s.onLeave.call(this, l, n + 1, r);
                var m = "translate3d(0px, -" + c.left + "px, 0px)",
                    f = "translate3d(0px, -" + c.right + "px, 0px)";
                S(e(".ms-left"), m, !0), S(e(".ms-right"), f, !0), setTimeout(function() { e.isFunction(s.afterLoad) && s.afterLoad.call(this, i, n + 1), setTimeout(function() { K = !1 }, q) }, s.scrollingSpeed)
            } else e.isFunction(s.onLeave) && s.onLeave.call(this, l, n + 1, r), e(".ms-left").animate({ top: -c.left }, s.scrollingSpeed, s.easing, function() { e.isFunction(s.afterLoad) && s.afterLoad.call(this, i, n + 1), setTimeout(function() { K = !1 }, q) }), e(".ms-right").animate({ top: -c.right }, s.scrollingSpeed, s.easing);
            lastScrolledDestiny = i, w(i), x(i, n)
        }

        function h() { n.addEventListener ? (n.removeEventListener("mousewheel", g, !1), n.removeEventListener("wheel", g, !1)) : n.detachEvent("onmousewheel", g) }

        function p() { n.addEventListener ? (n.addEventListener("mousewheel", g, !1), n.addEventListener("wheel", g, !1)) : n.attachEvent("onmousewheel", g) }

        function g(e) { e = t.event || e; var n = o.max(-1, o.min(1, e.wheelDelta || -e.deltaY || -e.detail)); return K || (0 > n ? X.moveSectionDown() : X.moveSectionUp()), !1 }

        function S(e, t, n) { e.toggleClass("ms-easing", n), e.css(y(t)) }

        function y(e) { return { "-webkit-transform": e, "-moz-transform": e, "-ms-transform": e, transform: e } }

        function x(t, n) { s.navigation && (e("#multiscroll-nav").find(".active").removeClass("active"), t ? e("#multiscroll-nav").find('a[href="#' + t + '"]').addClass("active") : e("#multiscroll-nav").find("li").eq(n).find("a").addClass("active")) }

        function w(t) { s.menu && (e(s.menu).find(".active").removeClass("active"), e(s.menu).find('[data-menuanchor="' + t + '"]').addClass("active")) }

        function b(t) {
            var n = e(".ms-left .ms-section.active").index(),
                o = t.index();
            return n > o ? "up" : "down"
        }

        function C(e) { s.anchors.length && (location.hash = e), T() }

        function T() {
            var t = e(".ms-left .ms-section.active"),
                n = t.data("anchor"),
                o = t.index(),
                i = String(o);
            s.anchors.length && (i = n), i = i.replace("/", "-").replace("#", "");
            var a = new RegExp("\\b\\s?ms-viewing-[^\\s]+\\b", "g");
            e("body")[0].className = e("body")[0].className.replace(a, ""), e("body").addClass("ms-viewing-" + i)
        }

        function E() {
            var e, o = n.createElement("p"),
                s = { webkitTransform: "-webkit-transform", OTransform: "-o-transform", msTransform: "-ms-transform", MozTransform: "-moz-transform", transform: "transform" };
            n.body.insertBefore(o, null);
            for (var a in s) o.style[a] !== i && (o.style[a] = "translate3d(1px,1px,1px)", e = t.getComputedStyle(o).getPropertyValue(s[a]));
            return n.body.removeChild(o), e !== i && e.length > 0 && "none" !== e
        }

        function M(e) { e.addClass("ms-table").wrapInner('<div class="ms-tableCell" style="height: ' + P(e) + 'px" />') }

        function P(e) {
            var t = N;
            if (s.paddingTop || s.paddingBottom) {
                var n = parseInt(e.css("padding-top")) + parseInt(e.css("padding-bottom"));
                t = N - n
            }
            return t
        }

        function k() {
            var n = t.location.hash.replace("#", ""),
                o = e('.ms-left .ms-section[data-anchor="' + n + '"]');
            n.length && v(o)
        }

        function L(n) {
            var i = n.originalEvent;
            if (D(i)) {
                n.preventDefault();
                e(".ms-left .ms-section.active");
                if (!K) {
                    var a = F(i);
                    A = a.y, V = a.x, o.abs(Q - A) > e(t).height() / 100 * s.touchSensitivity && (Q > A ? X.moveSectionDown() : A > Q && X.moveSectionUp())
                }
            }
        }

        function D(e) { return "undefined" == typeof e.pointerType || "mouse" != e.pointerType }

        function z(e) {
            var t = e.originalEvent;
            if (D(t)) {
                var n = F(t);
                Q = n.y, j = n.x
            }
        }

        function B() { I && (MSPointer = Y(), e(n).off("touchstart " + MSPointer.down).on("touchstart " + MSPointer.down, z), e(n).off("touchmove " + MSPointer.move).on("touchmove " + MSPointer.move, L)) }

        function R() { I && (MSPointer = Y(), e(n).off("touchstart " + MSPointer.down), e(n).off("touchmove " + MSPointer.move)) }

        function Y() { var e; return e = t.PointerEvent ? { down: "pointerdown", move: "pointermove" } : { down: "MSPointerDown", move: "MSPointerMove" } }

        function F(e) { var t = []; return t.y = "undefined" != typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, t.x = "undefined" != typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, I && D(e) && (t.y = e.touches[0].pageY, t.x = e.touches[0].pageX), t }
        var X = e.fn.multiscroll;
        s = e.extend({ verticalCentered: !0, scrollingSpeed: 700, easing: "easeInQuart", menu: !1, sectionsColor: [], anchors: [], navigation: !1, navigationPosition: "right", navigationColor: "#000", navigationTooltips: [], loopBottom: !1, loopTop: !1, css3: !1, paddingTop: 0, paddingBottom: 0, fixedElements: null, normalScrollElements: null, keyboardScrolling: !0, touchSensitivity: 5, sectionSelector: ".ms-section", leftSelector: ".ms-left", rightSelector: ".ms-right", afterLoad: null, onLeave: null, afterRender: null, afterResize: null }, s);
        var q = 600,
            I = "ontouchstart" in t || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints;
        ".ms-right" !== s.rightSelector && e(s.rightSelector).addClass("ms-right"), ".ms-left" !== s.leftSelector && e(s.leftSelector).addClass("ms-left");
        var U, W = e(".ms-left").find(".ms-section").length,
            K = !1,
            N = e(t).height();
        p(), B(), s.css3 && (s.css3 = E()), e("html, body").css({ overflow: "hidden", height: "100vh" }), ".ms-section" !== s.sectionSelector && e(s.sectionSelector).each(function() { e(this).addClass("ms-section") }), s.navigation && (e("body").append('<div id="multiscroll-nav"><ul></ul></div>'), U = e("#multiscroll-nav"), U.css("color", s.navigationColor), U.addClass(s.navigationPosition)), e(".ms-right, .ms-left").css({ width: "50%", position: "absolute", height: "100%", "-ms-touch-action": "none" }), e(".ms-right").css({ right: "1px", top: "0", "-ms-touch-action": "none", "touch-action": "none" }), e(".ms-left").css({ left: "0", top: "0", "-ms-touch-action": "none", "touch-action": "none" }), e(".ms-left .ms-section, .ms-right .ms-section").each(function() {
            var t = e(this).index();
            if ((s.paddingTop || s.paddingBottom) && e(this).css("padding", s.paddingTop + " 0 " + s.paddingBottom + " 0"), "undefined" != typeof s.sectionsColor[t] && e(this).css("background-color", s.sectionsColor[t]), "undefined" != typeof s.anchors[t] && e(this).attr("data-anchor", s.anchors[t]), s.verticalCentered && M(e(this)), e(this).closest(".ms-left").length && s.navigation) {
                var n = "";
                s.anchors.length && (n = s.anchors[t]);
                var o = s.navigationTooltips[t];
                "undefined" == typeof o && (o = ""), s.navigation && U.find("ul").append('<li data-tooltip="' + o + '"><a href="#' + n + '"><span></span></a></li>')
            }
        }), e(".ms-right").html(e(".ms-right").find(".ms-section").get().reverse()), e(".ms-left .ms-section, .ms-right .ms-section").each(function() {
            var t = e(this).index();
            e(this).css({ height: "100%" }), !t && s.navigation && U.find("li").eq(t).find("a").addClass("active")
        }).promise().done(function() { e(".ms-left .ms-section.active").length || (e(".ms-right").find(".ms-section").last().addClass("active"), e(".ms-left").find(".ms-section").first().addClass("active")), s.navigation && U.css("margin-top", "-" + U.height() / 2 + "px"), e.isFunction(s.afterRender) && s.afterRender.call(this), u(), T(), e(t).on("load", function() { k() }) }), e(t).on("hashchange", a), e(n).keydown(l);
        var O;
        e(n).mousedown(function(e) { return 1 == e.button ? (e.preventDefault(), !1) : void 0 }), e(n).on("click", "#multiscroll-nav a", c), e(n).on({ mouseenter: m, mouseleave: f }, "#multiscroll-nav li"), s.normalScrollElements && (e(n).on("mouseenter", s.normalScrollElements, function() { X.setMouseWheelScrolling(!1) }), e(n).on("mouseleave", s.normalScrollElements, function() { X.setMouseWheelScrolling(!0) })), e(t).on("resize", d), X.moveSectionUp = function() { var t = e(".ms-left .ms-section.active").prev(".ms-section");!t.length && s.loopTop && (t = e(".ms-left .ms-section").last()), t.length && v(t) }, X.moveSectionDown = function() { var t = e(".ms-left .ms-section.active").next(".ms-section");!t.length && s.loopBottom && (t = e(".ms-left .ms-section").first()), t.length && v(t) }, X.moveTo = function(t) {
            var n = "";
            n = isNaN(t) ? e('.ms-left [data-anchor="' + t + '"]') : e(".ms-left .ms-section").eq(t - 1), v(n)
        }, X.setKeyboardScrolling = function(e) { s.keyboardScrolling = e }, X.setMouseWheelScrolling = function(e) { e ? p() : h() }, X.setScrollingSpeed = function(e) { s.scrollingSpeed = e };
        var Q = 0,
            j = 0,
            A = 0,
            V = 0;
        X.destroy = function() { X.setKeyboardScrolling(!1), X.setMouseWheelScrolling(!1), R(), e(t).off("hashchange", a).off("resize", d), e(n).off("mouseenter", "#multiscroll-nav li").off("mouseleave", "#multiscroll-nav li").off("click", "#multiscroll-nav a") }, X.build = function() { X.setKeyboardScrolling(!0), X.setMouseWheelScrolling(!0), B(), e(t).on("hashchange", a).on("resize", d), e(n).on("mouseenter", "#multiscroll-nav li", m).on("mouseleave", "#multiscroll-nav li", f).on("click", "#multiscroll-nav a", c) }
    }
}(jQuery, window, document, Math);