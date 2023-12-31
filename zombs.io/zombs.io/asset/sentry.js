/*! @sentry/browser 5.4.0 (0c79e3e7) | https://github.com/getsentry/sentry-javascript */
var Sentry = function(n) {
    var t = function(n, r) {
        return (t = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(n, t) {
                n.__proto__ = t
            } || function(n, t) {
                for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r])
            })(n, r)
    };

    function r(n, r) {
        function e() {
            this.constructor = n
        }
        t(n, r), n.prototype = null === r ? Object.create(r) : (e.prototype = r.prototype, new e)
    }
    var e, i, o, u = function() {
        return (u = Object.assign || function(n) {
            for (var t, r = 1, e = arguments.length; r < e; r++)
                for (var i in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
            return n
        }).apply(this, arguments)
    };

    function c(n, t) {
        var r = "function" == typeof Symbol && n[Symbol.iterator];
        if (!r) return n;
        var e, i, o = r.call(n),
            u = [];
        try {
            for (;
                (void 0 === t || t-- > 0) && !(e = o.next()).done;) u.push(e.value)
        } catch (n) {
            i = {
                error: n
            }
        } finally {
            try {
                e && !e.done && (r = o.return) && r.call(o)
            } finally {
                if (i) throw i.error
            }
        }
        return u
    }

    function s() {
        for (var n = [], t = 0; t < arguments.length; t++) n = n.concat(c(arguments[t]));
        return n
    }! function(n) {
        n[n.None = 0] = "None", n[n.Error = 1] = "Error", n[n.Debug = 2] = "Debug", n[n.Verbose = 3] = "Verbose"
    }(e || (e = {})), (i = n.Severity || (n.Severity = {})).Fatal = "fatal", i.Error = "error", i.Warning = "warning", i.Log = "log", i.Info = "info", i.Debug = "debug", i.Critical = "critical",
        function(n) {
            n.fromString = function(t) {
                switch (t) {
                    case "debug":
                        return n.Debug;
                    case "info":
                        return n.Info;
                    case "warn":
                    case "warning":
                        return n.Warning;
                    case "error":
                        return n.Error;
                    case "fatal":
                        return n.Fatal;
                    case "critical":
                        return n.Critical;
                    case "log":
                    default:
                        return n.Log
                }
            }
        }(n.Severity || (n.Severity = {})), (o = n.Status || (n.Status = {})).Unknown = "unknown", o.Skipped = "skipped", o.Success = "success", o.RateLimit = "rate_limit", o.Invalid = "invalid", o.Failed = "failed",
        function(n) {
            n.fromHttpCode = function(t) {
                return t >= 200 && t < 300 ? n.Success : 429 === t ? n.RateLimit : t >= 400 && t < 500 ? n.Invalid : t >= 500 ? n.Failed : n.Unknown
            }
        }(n.Status || (n.Status = {}));
    var a = function(n) {
        function t(t) {
            var r = this.constructor,
                e = n.call(this, t) || this;
            return e.message = t, e.name = r.prototype.constructor.name, Object.setPrototypeOf(e, r.prototype), e
        }
        return r(t, n), t
    }(Error);

    function f(n) {
        switch (Object.prototype.toString.call(n)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
                return !0;
            default:
                return n instanceof Error
        }
    }

    function h(n) {
        return "[object ErrorEvent]" === Object.prototype.toString.call(n)
    }

    function l(n) {
        return "[object DOMError]" === Object.prototype.toString.call(n)
    }

    function v(n) {
        return "[object String]" === Object.prototype.toString.call(n)
    }

    function d(n) {
        return null === n || "object" != typeof n && "function" != typeof n
    }

    function p(n) {
        return "[object Object]" === Object.prototype.toString.call(n)
    }

    function m(n) {
        return Boolean(n && n.then && "function" == typeof n.then)
    }
    var y = {};

    function b() {
        return "[object process]" === Object.prototype.toString.call("undefined" != typeof process ? process : 0) ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : y
    }

    function w() {
        var n = b(),
            t = n.crypto || n.msCrypto;
        if (void 0 !== t && t.getRandomValues) {
            var r = new Uint16Array(8);
            t.getRandomValues(r), r[3] = 4095 & r[3] | 16384, r[4] = 16383 & r[4] | 32768;
            var e = function(n) {
                for (var t = n.toString(16); t.length < 4;) t = "0" + t;
                return t
            };
            return e(r[0]) + e(r[1]) + e(r[2]) + e(r[3]) + e(r[4]) + e(r[5]) + e(r[6]) + e(r[7])
        }
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(n) {
            var t = 16 * Math.random() | 0;
            return ("x" === n ? t : 3 & t | 8).toString(16)
        })
    }

    function g(n) {
        if (!n) return {};
        var t = n.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!t) return {};
        var r = t[6] || "",
            e = t[8] || "";
        return {
            host: t[4],
            path: t[5],
            protocol: t[2],
            relative: t[5] + r + e
        }
    }

    function E(n) {
        if (n.message) return n.message;
        if (n.exception && n.exception.values && n.exception.values[0]) {
            var t = n.exception.values[0];
            return t.type && t.value ? t.type + ": " + t.value : t.type || t.value || n.event_id || "<unknown>"
        }
        return n.event_id || "<unknown>"
    }

    function j(n) {
        var t = b();
        if (!("console" in t)) return n();
        var r = t.console,
            e = {};
        ["debug", "info", "warn", "error", "log", "assert"].forEach(function(n) {
            n in t.console && r[n].__sentry__ && (e[n] = r[n].__sentry_wrapped__, r[n] = r[n].__sentry_original__)
        });
        var i = n();
        return Object.keys(e).forEach(function(n) {
            r[n] = e[n]
        }), i
    }

    function x(n, t, r, e) {
        void 0 === e && (e = {
            handled: !0,
            type: "generic"
        }), n.exception = n.exception || {}, n.exception.values = n.exception.values || [], n.exception.values[0] = n.exception.values[0] || {}, n.exception.values[0].value = n.exception.values[0].value || t || "", n.exception.values[0].type = n.exception.values[0].type || r || "Error", n.exception.values[0].mechanism = n.exception.values[0].mechanism || e
    }
    var _ = b(),
        S = "Sentry Logger ",
        O = function() {
            function n() {
                this.t = !1
            }
            return n.prototype.disable = function() {
                this.t = !1
            }, n.prototype.enable = function() {
                this.t = !0
            }, n.prototype.log = function() {
                for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
                this.t && j(function() {
                    _.console.log(S + "[Log]: " + n.join(" "))
                })
            }, n.prototype.warn = function() {
                for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
                this.t && j(function() {
                    _.console.warn(S + "[Warn]: " + n.join(" "))
                })
            }, n.prototype.error = function() {
                for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
                this.t && j(function() {
                    _.console.error(S + "[Error]: " + n.join(" "))
                })
            }, n
        }();
    _.__SENTRY__ = _.__SENTRY__ || {};
    var k = _.__SENTRY__.logger || (_.__SENTRY__.logger = new O),
        T = function() {
            function n() {
                this.i = "function" == typeof WeakSet, this.o = this.i ? new WeakSet : []
            }
            return n.prototype.memoize = function(n) {
                if (this.i) return !!this.o.has(n) || (this.o.add(n), !1);
                for (var t = 0; t < this.o.length; t++) {
                    if (this.o[t] === n) return !0
                }
                return this.o.push(n), !1
            }, n.prototype.unmemoize = function(n) {
                if (this.i) this.o.delete(n);
                else
                    for (var t = 0; t < this.o.length; t++)
                        if (this.o[t] === n) {
                            this.o.splice(t, 1);
                            break
                        }
            }, n
        }();

    function R(n, t, r) {
        if (t in n) {
            var e = n[t],
                i = r(e);
            if ("function" == typeof i) try {
                i.prototype = i.prototype || {}, Object.defineProperties(i, {
                    __sentry__: {
                        enumerable: !1,
                        value: !0
                    },
                    __sentry_original__: {
                        enumerable: !1,
                        value: e
                    },
                    __sentry_wrapped__: {
                        enumerable: !1,
                        value: i
                    }
                })
            } catch (n) {}
            n[t] = i
        }
    }

    function D(n) {
        return function(n) {
            return ~-encodeURI(n).split(/%..|./).length
        }(JSON.stringify(n))
    }

    function I(n, t, r) {
        void 0 === t && (t = 3), void 0 === r && (r = 102400);
        var e = A(n, t);
        return D(e) > r ? I(n, t - 1, r) : e
    }

    function N(n, t) {
        return "domain" === t && "object" == typeof n && n.u ? "[Domain]" : "domainEmitter" === t ? "[DomainEmitter]" : "undefined" != typeof global && n === global ? "[Global]" : "undefined" != typeof window && n === window ? "[Window]" : "undefined" != typeof document && n === document ? "[Document]" : "undefined" != typeof Event && n instanceof Event ? Object.getPrototypeOf(n) ? n.constructor.name : "Event" : p(r = n) && "nativeEvent" in r && "preventDefault" in r && "stopPropagation" in r ? "[SyntheticEvent]" : Number.isNaN(n) ? "[NaN]" : void 0 === n ? "[undefined]" : "function" == typeof n ? "[Function: " + (n.name || "<unknown-function-name>") + "]" : n;
        var r
    }

    function C(n, t, r, e) {
        if (void 0 === r && (r = 1 / 0), void 0 === e && (e = new T), 0 === r) return function(n) {
            var t = Object.prototype.toString.call(n);
            if ("string" == typeof n) return n;
            if ("[object Object]" === t) return "[Object]";
            if ("[object Array]" === t) return "[Array]";
            var r = N(n);
            return d(r) ? r : t
        }(t);
        if (null != t && "function" == typeof t.toJSON) return t.toJSON();
        var i = N(t, n);
        if (d(i)) return i;
        var o = f(t) ? function(n) {
                var t = {
                    message: n.message,
                    name: n.name,
                    stack: n.stack
                };
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
                return t
            }(t) : t,
            u = Array.isArray(t) ? [] : {};
        if (e.memoize(t)) return "[Circular ~]";
        for (var c in o) Object.prototype.hasOwnProperty.call(o, c) && (u[c] = C(c, o[c], r - 1, e));
        return e.unmemoize(t), u
    }

    function A(n, t) {
        try {
            return JSON.parse(JSON.stringify(n, function(n, r) {
                return C(n, r, t)
            }))
        } catch (n) {
            return "**non-serializable**"
        }
    }
    var L, M = function() {
        function n(n) {
            this.s = n, this.h = []
        }
        return n.prototype.isReady = function() {
            return void 0 === this.s || this.length() < this.s
        }, n.prototype.add = function(n) {
            var t = this;
            return this.isReady() ? (-1 === this.h.indexOf(n) && this.h.push(n), n.then(function() {
                return t.remove(n)
            }).catch(function() {
                return t.remove(n).catch(function() {})
            }), n) : Promise.reject(new a("Not adding Promise due to buffer limit reached."))
        }, n.prototype.remove = function(n) {
            return this.h.splice(this.h.indexOf(n), 1)[0]
        }, n.prototype.length = function() {
            return this.h.length
        }, n.prototype.drain = function(n) {
            var t = this;
            return new Promise(function(r) {
                var e = setTimeout(function() {
                    n && n > 0 && r(!1)
                }, n);
                Promise.all(t.h).then(function() {
                    clearTimeout(e), r(!0)
                }).catch(function() {
                    r(!0)
                })
            })
        }, n
    }();

    function U(n, t) {
        return void 0 === t && (t = 0), "string" != typeof n || 0 === t ? n : n.length <= t ? n : n.substr(0, t) + "..."
    }

    function F(n, t) {
        if (!Array.isArray(n)) return "";
        for (var r = [], e = 0; e < n.length; e++) {
            var i = n[e];
            try {
                r.push(String(i))
            } catch (n) {
                r.push("[value cannot be serialized]")
            }
        }
        return r.join(t)
    }

    function P(n, t) {
        if (void 0 === t && (t = 40), !n.length) return "[object has no keys]";
        if (n[0].length >= t) return U(n[0], t);
        for (var r = n.length; r > 0; r--) {
            var e = n.slice(0, r).join(", ");
            if (!(e.length > t)) return r === n.length ? e : U(e, t)
        }
        return ""
    }

    function $(n, t) {
        return r = t, "[object RegExp]" === Object.prototype.toString.call(r) ? t.test(n) : "string" == typeof t && n.includes(t);
        var r
    }

    function q() {
        if (!("fetch" in b())) return !1;
        try {
            return new Headers, new Request(""), new Response, !0
        } catch (n) {
            return !1
        }
    }

    function H() {
        if (!q()) return !1;
        try {
            return new Request("_", {
                referrerPolicy: "origin"
            }), !0
        } catch (n) {
            return !1
        }
    }! function(n) {
        n.PENDING = "PENDING", n.RESOLVED = "RESOLVED", n.REJECTED = "REJECTED"
    }(L || (L = {}));
    var W = function() {
            function n(n) {
                var t = this;
                this.l = L.PENDING, this.v = [], this.p = function(n) {
                    t.m(n, L.RESOLVED)
                }, this.g = function(n) {
                    t.m(n, L.REJECTED)
                }, this.m = function(n, r) {
                    t.l === L.PENDING && (m(n) ? n.then(t.p, t.g) : (t.j = n, t.l = r, t._()))
                }, this._ = function() {
                    t.l !== L.PENDING && (t.l === L.REJECTED ? t.v.forEach(function(n) {
                        return n.onFail && n.onFail(t.j)
                    }) : t.v.forEach(function(n) {
                        return n.onSuccess && n.onSuccess(t.j)
                    }), t.v = [])
                }, this.S = function(n) {
                    t.v = t.v.concat(n), t._()
                };
                try {
                    n(this.p, this.g)
                } catch (n) {
                    this.g(n)
                }
            }
            return n.prototype.then = function(t, r) {
                var e = this;
                return new n(function(n, i) {
                    e.S({
                        onFail: function(t) {
                            if (r) try {
                                return void n(r(t))
                            } catch (n) {
                                return void i(n)
                            } else i(t)
                        },
                        onSuccess: function(r) {
                            if (t) try {
                                return void n(t(r))
                            } catch (n) {
                                return void i(n)
                            } else n(r)
                        }
                    })
                })
            }, n.prototype.catch = function(n) {
                return this.then(function(n) {
                    return n
                }, n)
            }, n.prototype.toString = function() {
                return "[object SyncPromise]"
            }, n.resolve = function(t) {
                return new n(function(n) {
                    n(t)
                })
            }, n.reject = function(t) {
                return new n(function(n, r) {
                    r(t)
                })
            }, n
        }(),
        B = /([0-9a-f]{2})-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})/,
        J = function() {
            function n(n, t, r, e) {
                void 0 === n && (n = w()), void 0 === t && (t = w().substring(16)), void 0 === r && (r = !1), this.O = n, this.k = t, this.T = r, this.R = e
            }
            return n.fromTraceparent = function(t) {
                var r = t.match(B);
                if (r) {
                    var e = new n(r[2], r[3], "01" === r[4]);
                    return new n(r[2], void 0, void 0, e)
                }
            }, n.prototype.toTraceparent = function() {
                return "00-" + this.O + "-" + this.k + "-" + (this.T ? "01" : "00")
            }, n.prototype.toJSON = function() {
                return {
                    parent: this.R && this.R.toJSON() || void 0,
                    span_id: this.k,
                    trace_id: this.O
                }
            }, n
        }(),
        X = function() {
            function n() {
                this.D = !1, this.I = [], this.N = [], this.C = [], this.A = {}, this.L = {}, this.M = {}, this.U = {}
            }
            return n.prototype.addScopeListener = function(n) {
                this.I.push(n)
            }, n.prototype.addEventProcessor = function(n) {
                return this.N.push(n), this
            }, n.prototype.F = function() {
                var n = this;
                this.D || (this.D = !0, setTimeout(function() {
                    n.I.forEach(function(t) {
                        t(n)
                    }), n.D = !1
                }))
            }, n.prototype.P = function(n, t, r, e) {
                var i = this;
                return void 0 === e && (e = 0), new W(function(o, c) {
                    var s = n[e];
                    if (null === t || "function" != typeof s) o(t);
                    else {
                        var a = s(u({}, t), r);
                        m(a) ? a.then(function(t) {
                            return i.P(n, t, r, e + 1).then(o)
                        }).catch(c) : i.P(n, a, r, e + 1).then(o).catch(c)
                    }
                })
            }, n.prototype.setUser = function(n) {
                return this.A = A(n), this.F(), this
            }, n.prototype.setTags = function(n) {
                return this.L = u({}, this.L, A(n)), this.F(), this
            }, n.prototype.setTag = function(n, t) {
                var r;
                return this.L = u({}, this.L, ((r = {})[n] = A(t), r)), this.F(), this
            }, n.prototype.setExtras = function(n) {
                return this.M = u({}, this.M, A(n)), this.F(), this
            }, n.prototype.setExtra = function(n, t) {
                var r;
                return this.M = u({}, this.M, ((r = {})[n] = A(t), r)), this.F(), this
            }, n.prototype.setFingerprint = function(n) {
                return this.$ = A(n), this.F(), this
            }, n.prototype.setLevel = function(n) {
                return this.q = A(n), this.F(), this
            }, n.prototype.setTransaction = function(n) {
                return this.H = n, this.F(), this
            }, n.prototype.setContext = function(n, t) {
                return this.U[n] = t ? A(t) : void 0, this.F(), this
            }, n.prototype.setSpan = function(n) {
                return this.W = n, this.F(), this
            }, n.prototype.startSpan = function() {
                var n = new J;
                return this.setSpan(n), n
            }, n.prototype.getSpan = function() {
                return this.W
            }, n.clone = function(t) {
                var r = new n;
                return Object.assign(r, t, {
                    I: []
                }), t && (r.C = s(t.C), r.L = u({}, t.L), r.M = u({}, t.M), r.U = u({}, t.U), r.A = t.A, r.q = t.q, r.W = t.W, r.H = t.H, r.$ = t.$, r.N = s(t.N)), r
            }, n.prototype.clear = function() {
                return this.C = [], this.L = {}, this.M = {}, this.A = {}, this.U = {}, this.q = void 0, this.H = void 0, this.$ = void 0, this.W = void 0, this.F(), this
            }, n.prototype.addBreadcrumb = function(n, t) {
                var r = (new Date).getTime() / 1e3,
                    e = u({
                        timestamp: r
                    }, n);
                return this.C = void 0 !== t && t >= 0 ? s(this.C, [A(e)]).slice(-t) : s(this.C, [A(e)]), this.F(), this
            }, n.prototype.clearBreadcrumbs = function() {
                return this.C = [], this.F(), this
            }, n.prototype.B = function(n) {
                n.fingerprint = n.fingerprint ? Array.isArray(n.fingerprint) ? n.fingerprint : [n.fingerprint] : [], this.$ && (n.fingerprint = n.fingerprint.concat(this.$)), n.fingerprint && !n.fingerprint.length && delete n.fingerprint
            }, n.prototype.applyToEvent = function(n, t) {
                return this.M && Object.keys(this.M).length && (n.extra = u({}, this.M, n.extra)), this.L && Object.keys(this.L).length && (n.tags = u({}, this.L, n.tags)), this.A && Object.keys(this.A).length && (n.user = u({}, this.A, n.user)), this.U && Object.keys(this.U).length && (n.contexts = u({}, this.U, n.contexts)), this.q && (n.level = this.q), this.H && (n.transaction = this.H), this.W && (n.contexts = n.contexts || {}, n.contexts.trace = this.W), this.B(n), n.breadcrumbs = s(n.breadcrumbs || [], this.C), n.breadcrumbs = n.breadcrumbs.length > 0 ? n.breadcrumbs : void 0, this.P(s(G(), this.N), n, t)
            }, n
        }();

    function G() {
        var n = b();
        return n.__SENTRY__ = n.__SENTRY__ || {}, n.__SENTRY__.globalEventProcessors = n.__SENTRY__.globalEventProcessors || [], n.__SENTRY__.globalEventProcessors
    }

    function z(n) {
        G().push(n)
    }
    var V = 3,
        K = function() {
            function n(n, t, r) {
                void 0 === t && (t = new X), void 0 === r && (r = V), this.J = r, this.X = [], this.X.push({
                    client: n,
                    scope: t
                })
            }
            return n.prototype.G = function(n) {
                for (var t, r = [], e = 1; e < arguments.length; e++) r[e - 1] = arguments[e];
                var i = this.getStackTop();
                i && i.client && i.client[n] && (t = i.client)[n].apply(t, s(r, [i.scope]))
            }, n.prototype.isOlderThan = function(n) {
                return this.J < n
            }, n.prototype.bindClient = function(n) {
                this.getStackTop().client = n
            }, n.prototype.pushScope = function() {
                var n = this.getStack(),
                    t = n.length > 0 ? n[n.length - 1].scope : void 0,
                    r = X.clone(t);
                return this.getStack().push({
                    client: this.getClient(),
                    scope: r
                }), r
            }, n.prototype.popScope = function() {
                return void 0 !== this.getStack().pop()
            }, n.prototype.withScope = function(n) {
                var t = this.pushScope();
                try {
                    n(t)
                } finally {
                    this.popScope()
                }
            }, n.prototype.getClient = function() {
                return this.getStackTop().client
            }, n.prototype.getScope = function() {
                return this.getStackTop().scope
            }, n.prototype.getStack = function() {
                return this.X
            }, n.prototype.getStackTop = function() {
                return this.X[this.X.length - 1]
            }, n.prototype.captureException = function(n, t) {
                var r = this.V = w();
                return this.G("captureException", n, u({}, t, {
                    event_id: r
                })), r
            }, n.prototype.captureMessage = function(n, t, r) {
                var e = this.V = w();
                return this.G("captureMessage", n, t, u({}, r, {
                    event_id: e
                })), e
            }, n.prototype.captureEvent = function(n, t) {
                var r = this.V = w();
                return this.G("captureEvent", n, u({}, t, {
                    event_id: r
                })), r
            }, n.prototype.lastEventId = function() {
                return this.V
            }, n.prototype.addBreadcrumb = function(n, t) {
                var r = this.getStackTop();
                if (r.scope && r.client) {
                    var e = r.client.getOptions && r.client.getOptions() || {},
                        i = e.beforeBreadcrumb,
                        o = void 0 === i ? null : i,
                        c = e.maxBreadcrumbs,
                        s = void 0 === c ? 30 : c;
                    if (!(s <= 0)) {
                        var a = (new Date).getTime() / 1e3,
                            f = u({
                                timestamp: a
                            }, n),
                            h = o ? j(function() {
                                return o(f, t)
                            }) : f;
                        null !== h && r.scope.addBreadcrumb(h, Math.min(s, 100))
                    }
                }
            }, n.prototype.setUser = function(n) {
                var t = this.getStackTop();
                t.scope && t.scope.setUser(n)
            }, n.prototype.setTags = function(n) {
                var t = this.getStackTop();
                t.scope && t.scope.setTags(n)
            }, n.prototype.setExtras = function(n) {
                var t = this.getStackTop();
                t.scope && t.scope.setExtras(n)
            }, n.prototype.setTag = function(n, t) {
                var r = this.getStackTop();
                r.scope && r.scope.setTag(n, t)
            }, n.prototype.setExtra = function(n, t) {
                var r = this.getStackTop();
                r.scope && r.scope.setExtra(n, t)
            }, n.prototype.setContext = function(n, t) {
                var r = this.getStackTop();
                r.scope && r.scope.setContext(n, t)
            }, n.prototype.configureScope = function(n) {
                var t = this.getStackTop();
                t.scope && t.client && n(t.scope)
            }, n.prototype.run = function(n) {
                var t = Q(this);
                try {
                    n(this)
                } finally {
                    Q(t)
                }
            }, n.prototype.getIntegration = function(n) {
                var t = this.getClient();
                if (!t) return null;
                try {
                    return t.getIntegration(n)
                } catch (t) {
                    return k.warn("Cannot retrieve integration " + n.id + " from the current Hub"), null
                }
            }, n.prototype.traceHeaders = function() {
                var n = this.getStackTop();
                if (n.scope && n.client) {
                    var t = n.scope.getSpan();
                    if (t) return {
                        "sentry-trace": t.toTraceparent()
                    }
                }
                return {}
            }, n
        }();

    function Z() {
        var n = b();
        return n.__SENTRY__ = n.__SENTRY__ || {
            hub: void 0
        }, n
    }

    function Q(n) {
        var t = Z(),
            r = tn(t);
        return rn(t, n), r
    }

    function Y() {
        var n, t, r = Z();
        nn(r) && !tn(r).isOlderThan(V) || rn(r, new K);
        try {
            var e = (n = module, t = "domain", n.require(t)).active;
            if (!e) return tn(r);
            if (!nn(e) || tn(e).isOlderThan(V)) {
                var i = tn(r).getStackTop();
                rn(e, new K(i.client, X.clone(i.scope)))
            }
            return tn(e)
        } catch (n) {
            return tn(r)
        }
    }

    function nn(n) {
        return !!(n && n.__SENTRY__ && n.__SENTRY__.hub)
    }

    function tn(n) {
        return n && n.__SENTRY__ && n.__SENTRY__.hub ? n.__SENTRY__.hub : (n.__SENTRY__ = n.__SENTRY__ || {}, n.__SENTRY__.hub = new K, n.__SENTRY__.hub)
    }

    function rn(n, t) {
        return !!n && (n.__SENTRY__ = n.__SENTRY__ || {}, n.__SENTRY__.hub = t, !0)
    }

    function en(n) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        var e = Y();
        if (e && e[n]) return e[n].apply(e, s(t));
        throw new Error("No hub defined or " + n + " was not found on the hub, please open a bug report.")
    }

    function captureException(n) {
        var t;
        try {
            throw new Error("Sentry syntheticException")
        } catch (n) {
            t = n
        }
        return en("captureException", n, {
            originalException: n,
            syntheticException: t
        })
    }

    function on(n) {
        en("withScope", n)
    }
    var un = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w\.-]+)(?::(\d+))?\/(.+)/,
        cn = function() {
            function n(n) {
                "string" == typeof n ? this.K(n) : this.Z(n), this.Y()
            }
            return n.prototype.toString = function(n) {
                void 0 === n && (n = !1);
                var t = this,
                    r = t.host,
                    e = t.path,
                    i = t.pass,
                    o = t.port,
                    u = t.projectId;
                return t.protocol + "://" + t.user + (n && i ? ":" + i : "") + "@" + r + (o ? ":" + o : "") + "/" + (e ? e + "/" : e) + u
            }, n.prototype.K = function(n) {
                var t = un.exec(n);
                if (!t) throw new a("Invalid Dsn");
                var r = c(t.slice(1), 6),
                    e = r[0],
                    i = r[1],
                    o = r[2],
                    u = void 0 === o ? "" : o,
                    s = r[3],
                    f = r[4],
                    h = void 0 === f ? "" : f,
                    l = "",
                    v = r[5],
                    d = v.split("/");
                d.length > 1 && (l = d.slice(0, -1).join("/"), v = d.pop()), Object.assign(this, {
                    host: s,
                    pass: u,
                    path: l,
                    projectId: v,
                    port: h,
                    protocol: e,
                    user: i
                })
            }, n.prototype.Z = function(n) {
                this.protocol = n.protocol, this.user = n.user, this.pass = n.pass || "", this.host = n.host, this.port = n.port || "", this.path = n.path || "", this.projectId = n.projectId
            }, n.prototype.Y = function() {
                var n = this;
                if (["protocol", "user", "host", "projectId"].forEach(function(t) {
                        if (!n[t]) throw new a("Invalid Dsn")
                    }), "http" !== this.protocol && "https" !== this.protocol) throw new a("Invalid Dsn");
                if (this.port && Number.isNaN(parseInt(this.port, 10))) throw new a("Invalid Dsn")
            }, n
        }(),
        sn = function() {
            function n(n) {
                this.dsn = n, this.nn = new cn(n)
            }
            return n.prototype.getDsn = function() {
                return this.nn
            }, n.prototype.getStoreEndpoint = function() {
                return "" + this.tn() + this.getStoreEndpointPath()
            }, n.prototype.getStoreEndpointWithUrlEncodedAuth = function() {
                var n, t = {
                    sentry_key: this.nn.user,
                    sentry_version: "7"
                };
                return this.getStoreEndpoint() + "?" + (n = t, Object.keys(n).map(function(t) {
                    return encodeURIComponent(t) + "=" + encodeURIComponent(n[t])
                }).join("&"))
            }, n.prototype.tn = function() {
                var n = this.nn,
                    t = n.protocol ? n.protocol + ":" : "",
                    r = n.port ? ":" + n.port : "";
                return t + "//" + n.host + r
            }, n.prototype.getStoreEndpointPath = function() {
                var n = this.nn;
                return (n.path ? "/" + n.path : "") + "/api/" + n.projectId + "/store/"
            }, n.prototype.getRequestHeaders = function(n, t) {
                var r = this.nn,
                    e = ["Sentry sentry_version=7"];
                return e.push("sentry_timestamp=" + (new Date).getTime()), e.push("sentry_client=" + n + "/" + t), e.push("sentry_key=" + r.user), r.pass && e.push("sentry_secret=" + r.pass), {
                    "Content-Type": "application/json",
                    "X-Sentry-Auth": e.join(", ")
                }
            }, n.prototype.getReportDialogEndpoint = function(n) {
                void 0 === n && (n = {});
                var t = this.nn,
                    r = this.tn() + (t.path ? "/" + t.path : "") + "/api/embed/error-page/",
                    e = [];
                for (var i in e.push("dsn=" + t.toString()), n)
                    if ("user" === i) {
                        if (!n.user) continue;
                        n.user.name && e.push("name=" + encodeURIComponent(n.user.name)), n.user.email && e.push("email=" + encodeURIComponent(n.user.email))
                    } else e.push(encodeURIComponent(i) + "=" + encodeURIComponent(n[i]));
                return e.length ? r + "?" + e.join("&") : r
            }, n
        }(),
        an = [];

    function fn(n) {
        var t = {};
        return function(n) {
            var t = n.defaultIntegrations && s(n.defaultIntegrations) || [],
                r = n.integrations,
                e = [];
            if (Array.isArray(r)) {
                var i = r.map(function(n) {
                        return n.name
                    }),
                    o = [];
                t.forEach(function(n) {
                    -1 === i.indexOf(n.name) && -1 === o.indexOf(n.name) && (e.push(n), o.push(n.name))
                }), r.forEach(function(n) {
                    -1 === o.indexOf(n.name) && (e.push(n), o.push(n.name))
                })
            } else {
                if ("function" != typeof r) return s(t);
                e = r(t), e = Array.isArray(e) ? e : [e]
            }
            return e
        }(n).forEach(function(n) {
            t[n.name] = n,
                function(n) {
                    -1 === an.indexOf(n.name) && (n.setupOnce(z, Y), an.push(n.name), k.log("Integration installed: " + n.name))
                }(n)
        }), t
    }
    var hn, ln = function() {
            function n(n, t) {
                this.rn = !1, this.en = new n(t), this.in = t, t.dsn && (this.on = new cn(t.dsn)), this.un = fn(this.in)
            }
            return n.prototype.captureException = function(n, t, r) {
                var e = this,
                    i = t && t.event_id;
                return this.rn = !0, this.cn().eventFromException(n, t).then(function(n) {
                    return e.sn(n, t, r)
                }).then(function(n) {
                    i = n && n.event_id, e.rn = !1
                }).catch(function(n) {
                    k.error(n), e.rn = !1
                }), i
            }, n.prototype.captureMessage = function(n, t, r, e) {
                var i = this,
                    o = r && r.event_id;
                return this.rn = !0, (d(n) ? this.cn().eventFromMessage("" + n, t, r) : this.cn().eventFromException(n, r)).then(function(n) {
                    return i.sn(n, r, e)
                }).then(function(n) {
                    o = n && n.event_id, i.rn = !1
                }).catch(function(n) {
                    k.error(n), i.rn = !1
                }), o
            }, n.prototype.captureEvent = function(n, t, r) {
                var e = this,
                    i = t && t.event_id;
                return this.rn = !0, this.sn(n, t, r).then(function(n) {
                    i = n && n.event_id, e.rn = !1
                }).catch(function(n) {
                    k.error(n), e.rn = !1
                }), i
            }, n.prototype.getDsn = function() {
                return this.on
            }, n.prototype.getOptions = function() {
                return this.in
            }, n.prototype.flush = function(n) {
                var t = this;
                return this.an(n).then(function(r) {
                    return t.fn && clearInterval(t.fn), t.cn().getTransport().close(n).then(function(n) {
                        return r && n
                    })
                })
            }, n.prototype.close = function(n) {
                var t = this;
                return this.flush(n).then(function(n) {
                    return t.getOptions().enabled = !1, n
                })
            }, n.prototype.getIntegrations = function() {
                return this.un || {}
            }, n.prototype.getIntegration = function(n) {
                try {
                    return this.un[n.id] || null
                } catch (t) {
                    return k.warn("Cannot retrieve integration " + n.id + " from the current Client"), null
                }
            }, n.prototype.an = function(n) {
                var t = this;
                return new Promise(function(r) {
                    var e = 0;
                    t.fn && clearInterval(t.fn), t.fn = setInterval(function() {
                        t.rn ? (e += 1, n && e >= n && r(!1)) : r(!0)
                    }, 1)
                })
            }, n.prototype.cn = function() {
                return this.en
            }, n.prototype.hn = function() {
                return !1 !== this.getOptions().enabled && void 0 !== this.on
            }, n.prototype.ln = function(n, t, r) {
                var e = this.getOptions(),
                    i = e.environment,
                    o = e.release,
                    c = e.dist,
                    s = e.maxValueLength,
                    a = void 0 === s ? 250 : s,
                    f = u({}, n);
                void 0 === f.environment && void 0 !== i && (f.environment = i), void 0 === f.release && void 0 !== o && (f.release = o), void 0 === f.dist && void 0 !== c && (f.dist = c), f.message && (f.message = U(f.message, a));
                var h = f.exception && f.exception.values && f.exception.values[0];
                h && h.value && (h.value = U(h.value, a));
                var l = f.request;
                l && l.url && (l.url = U(l.url, a)), void 0 === f.event_id && (f.event_id = w()), this.vn(f.sdk);
                var v = W.resolve(f);
                return t && (v = t.applyToEvent(f, r)), v
            }, n.prototype.vn = function(n) {
                var t = Object.keys(this.un);
                n && t.length > 0 && (n.integrations = t)
            }, n.prototype.sn = function(n, t, r) {
                var e = this,
                    i = this.getOptions(),
                    o = i.beforeSend,
                    u = i.sampleRate;
                return this.hn() ? "number" == typeof u && Math.random() > u ? W.reject("This event has been sampled, will not send event.") : new W(function(i, u) {
                    e.ln(n, r, t).then(function(n) {
                        if (null !== n) {
                            var r = n;
                            try {
                                if (t && t.data && !0 === t.data.__sentry__ || !o) return e.cn().sendEvent(r), void i(r);
                                var c = o(n, t);
                                if (void 0 === c) k.error("`beforeSend` method has to return `null` or a valid event.");
                                else if (m(c)) e.dn(c, i, u);
                                else {
                                    if (null === (r = c)) return k.log("`beforeSend` returned `null`, will not send event."), void i(null);
                                    e.cn().sendEvent(r), i(r)
                                }
                            } catch (n) {
                                e.captureException(n, {
                                    data: {
                                        __sentry__: !0
                                    },
                                    originalException: n
                                }), u("`beforeSend` throw an error, will not send event.")
                            }
                        } else u("An event processor returned null, will not send event.")
                    })
                }) : W.reject("SDK not enabled, will not send event.")
            }, n.prototype.dn = function(n, t, r) {
                var e = this;
                n.then(function(n) {
                    null !== n ? (e.cn().sendEvent(n), t(n)) : r("`beforeSend` returned `null`, will not send event.")
                }).catch(function(n) {
                    r("beforeSend rejected with " + n)
                })
            }, n
        }(),
        vn = function() {
            function t() {}
            return t.prototype.sendEvent = function(t) {
                return Promise.resolve({
                    reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
                    status: n.Status.Skipped
                })
            }, t.prototype.close = function(n) {
                return Promise.resolve(!0)
            }, t
        }(),
        dn = function() {
            function n(n) {
                this.in = n, this.in.dsn || k.warn("No DSN provided, backend will not do anything."), this.pn = this.mn()
            }
            return n.prototype.mn = function() {
                return new vn
            }, n.prototype.eventFromException = function(n, t) {
                throw new a("Backend has to implement `eventFromException` method")
            }, n.prototype.eventFromMessage = function(n, t, r) {
                throw new a("Backend has to implement `eventFromMessage` method")
            }, n.prototype.sendEvent = function(n) {
                this.pn.sendEvent(n).catch(function(n) {
                    k.error("Error while sending event: " + n)
                })
            }, n.prototype.getTransport = function() {
                return this.pn
            }, n
        }();
    var pn = function() {
            function n() {
                this.name = n.id
            }
            return n.prototype.setupOnce = function() {
                hn = Function.prototype.toString, Function.prototype.toString = function() {
                    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
                    var r = this.__sentry__ ? this.__sentry_original__ : this;
                    return hn.apply(r, n)
                }
            }, n.id = "FunctionToString", n
        }(),
        mn = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/],
        yn = function() {
            function n(t) {
                void 0 === t && (t = {}), this.in = t, this.name = n.id
            }
            return n.prototype.setupOnce = function() {
                z(function(t) {
                    var r = Y();
                    if (!r) return t;
                    var e = r.getIntegration(n);
                    if (e) {
                        var i = r.getClient(),
                            o = i ? i.getOptions() : {},
                            u = e.yn(o);
                        if (e.bn(t, u)) return null
                    }
                    return t
                })
            }, n.prototype.bn = function(n, t) {
                return this.wn(n, t) ? (k.warn("Event dropped due to being internal Sentry Error.\nEvent: " + E(n)), !0) : this.gn(n, t) ? (k.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + E(n)), !0) : this.En(n, t) ? (k.warn("Event dropped due to being matched by `blacklistUrls` option.\nEvent: " + E(n) + ".\nUrl: " + this.jn(n)), !0) : !this.xn(n, t) && (k.warn("Event dropped due to not being matched by `whitelistUrls` option.\nEvent: " + E(n) + ".\nUrl: " + this.jn(n)), !0)
            }, n.prototype.wn = function(n, t) {
                if (void 0 === t && (t = {}), !t.ignoreInternal) return !1;
                try {
                    return "SentryError" === n.exception.values[0].type
                } catch (n) {
                    return !1
                }
            }, n.prototype.gn = function(n, t) {
                return void 0 === t && (t = {}), !(!t.ignoreErrors || !t.ignoreErrors.length) && this._n(n).some(function(n) {
                    return t.ignoreErrors.some(function(t) {
                        return $(n, t)
                    })
                })
            }, n.prototype.En = function(n, t) {
                if (void 0 === t && (t = {}), !t.blacklistUrls || !t.blacklistUrls.length) return !1;
                var r = this.jn(n);
                return !!r && t.blacklistUrls.some(function(n) {
                    return $(r, n)
                })
            }, n.prototype.xn = function(n, t) {
                if (void 0 === t && (t = {}), !t.whitelistUrls || !t.whitelistUrls.length) return !0;
                var r = this.jn(n);
                return !r || t.whitelistUrls.some(function(n) {
                    return $(r, n)
                })
            }, n.prototype.yn = function(n) {
                return void 0 === n && (n = {}), {
                    blacklistUrls: s(this.in.blacklistUrls || [], n.blacklistUrls || []),
                    ignoreErrors: s(this.in.ignoreErrors || [], n.ignoreErrors || [], mn),
                    ignoreInternal: void 0 === this.in.ignoreInternal || this.in.ignoreInternal,
                    whitelistUrls: s(this.in.whitelistUrls || [], n.whitelistUrls || [])
                }
            }, n.prototype._n = function(n) {
                if (n.message) return [n.message];
                if (n.exception) try {
                    var t = n.exception.values[0],
                        r = t.type,
                        e = t.value;
                    return ["" + e, r + ": " + e]
                } catch (t) {
                    return k.error("Cannot extract message for event " + E(n)), []
                }
                return []
            }, n.prototype.jn = function(n) {
                try {
                    if (n.stacktrace) {
                        var t = n.stacktrace.frames;
                        return t[t.length - 1].filename
                    }
                    if (n.exception) {
                        var r = n.exception.values[0].stacktrace.frames;
                        return r[r.length - 1].filename
                    }
                    return null
                } catch (t) {
                    return k.error("Cannot extract url for event " + E(n)), null
                }
            }, n.id = "InboundFilters", n
        }(),
        bn = Object.freeze({
            FunctionToString: pn,
            InboundFilters: yn
        }),
        wn = b(),
        gn = {
            Sn: !1,
            On: !1,
            kn: !1,
            Tn: !1
        },
        En = "?",
        jn = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;

    function xn(n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    }

    function _n() {
        return "undefined" == typeof document || null == document.location ? "" : document.location.href
    }
    gn.Sn = function() {
        var n, t, r = [],
            e = null,
            i = null;

        function o(n, t, e) {
            var i = null;
            if (!t || gn.On) {
                for (var o in r)
                    if (xn(r, o)) try {
                        r[o](n, t, e)
                    } catch (n) {
                        i = n
                    }
                if (i) throw i
            }
        }

        function c(t, r, e, c, s) {
            var l = null;
            if (s = h(s) ? s.error : s, t = h(t) ? t.message : t, i) gn.kn.Rn(i, r, e, t), a();
            else if (s && f(s))(l = gn.kn(s)).mechanism = "onerror", o(l, !0, s);
            else {
                var v, d = {
                        url: r,
                        line: e,
                        column: c
                    },
                    p = t;
                if ("[object String]" === {}.toString.call(t)) {
                    var m = t.match(jn);
                    m && (v = m[1], p = m[2])
                }
                d.func = En, d.context = null, o(l = {
                    name: v,
                    message: p,
                    mode: "onerror",
                    mechanism: "onerror",
                    stack: [u({}, d, {
                        url: d.url || _n()
                    })]
                }, !0, null)
            }
            return !!n && n.apply(this, arguments)
        }

        function s(n) {
            var t = n && (n.detail ? n.detail.reason : n.reason) || n,
                r = gn.kn(t);
            r.mechanism = "onunhandledrejection", r.message || (r.message = JSON.stringify(A(t))), o(r, !0, t)
        }

        function a() {
            var n = i,
                t = e;
            i = null, e = null, o(n, !1, t)
        }

        function l(n) {
            if (i) {
                if (e === n) return;
                a()
            }
            var t = gn.kn(n);
            throw i = t, e = n, setTimeout(function() {
                e === n && a()
            }, t.incomplete ? 2e3 : 0), n
        }
        return l.Dn = function(n) {
            r.push(n)
        }, l.In = function() {
            !0 !== t && (n = wn.onerror, wn.onerror = c, t = !0)
        }, l.Nn = function() {
            wn.onunhandledrejection = s
        }, l
    }(), gn.kn = function() {
        function n(n) {
            if (!n || !n.stack) return null;
            for (var t, r, e, i = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, o = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, u = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, c = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, s = /\((\S*)(?::(\d+))(?::(\d+))\)/, a = n.stack.split("\n"), f = [], h = /^(.*) is undefined$/.exec(n.message), l = 0, v = a.length; l < v; ++l) {
                if (r = i.exec(a[l])) {
                    var d = r[2] && 0 === r[2].indexOf("native");
                    r[2] && 0 === r[2].indexOf("eval") && (t = s.exec(r[2])) && (r[2] = t[1], r[3] = t[2], r[4] = t[3]), e = {
                        url: r[2],
                        func: r[1] || En,
                        args: d ? [r[2]] : [],
                        line: r[3] ? +r[3] : null,
                        column: r[4] ? +r[4] : null
                    }
                } else if (r = u.exec(a[l])) e = {
                    url: r[2],
                    func: r[1] || En,
                    args: [],
                    line: +r[3],
                    column: r[4] ? +r[4] : null
                };
                else {
                    if (!(r = o.exec(a[l]))) continue;
                    r[3] && r[3].indexOf(" > eval") > -1 && (t = c.exec(r[3])) ? (r[1] = r[1] || "eval", r[3] = t[1], r[4] = t[2], r[5] = "") : 0 !== l || r[5] || void 0 === n.columnNumber || (f[0].column = n.columnNumber + 1), e = {
                        url: r[3],
                        func: r[1] || En,
                        args: r[2] ? r[2].split(",") : [],
                        line: r[4] ? +r[4] : null,
                        column: r[5] ? +r[5] : null
                    }
                }!e.func && e.line && (e.func = En), e.context = null, f.push(e)
            }
            return f.length ? (f[0] && f[0].line && !f[0].column && h && (f[0].column = null), {
                mode: "stack",
                name: n.name,
                message: n.message,
                stack: f
            }) : null
        }

        function t(n, t, r, e) {
            var i = {
                url: t,
                line: r
            };
            if (i.url && i.line) {
                if (n.incomplete = !1, i.func || (i.func = En), i.context || (i.context = null), / '([^']+)' /.exec(e) && (i.column = null), n.stack.length > 0 && n.stack[0].url === i.url) {
                    if (n.stack[0].line === i.line) return !1;
                    if (!n.stack[0].line && n.stack[0].func === i.func) return n.stack[0].line = i.line, n.stack[0].context = i.context, !1
                }
                return n.stack.unshift(i), n.partial = !0, !0
            }
            return n.incomplete = !0, !1
        }

        function r(n, e) {
            for (var i, o, u = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, c = [], s = {}, a = !1, f = r.caller; f && !a; f = f.caller)
                if (f !== Tn && f !== gn.Sn) {
                    if (o = {
                            url: null,
                            func: En,
                            args: [],
                            line: null,
                            column: null
                        }, f.name ? o.func = f.name : (i = u.exec(f.toString())) && (o.func = i[1]), void 0 === o.func) try {
                        o.func = i.input.substring(0, i.input.indexOf("{"))
                    } catch (n) {}
                    s["" + f] ? a = !0 : s["" + f] = !0, c.push(o)
                }
            e && c.splice(0, e);
            var h = {
                mode: "callers",
                name: n.name,
                message: n.message,
                stack: c
            };
            return t(h, n.sourceURL || n.fileName, n.line || n.lineNumber, n.message || n.description), h
        }

        function e(t, e) {
            var i = null;
            e = null == e ? 0 : +e;
            try {
                if (i = function(n) {
                        var t = n.stacktrace;
                        if (t) {
                            for (var r, e = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, i = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, o = t.split("\n"), u = [], c = 0; c < o.length; c += 2) {
                                var s = null;
                                (r = e.exec(o[c])) ? s = {
                                    url: r[2],
                                    line: +r[1],
                                    column: null,
                                    func: r[3],
                                    args: []
                                }: (r = i.exec(o[c])) && (s = {
                                    url: r[6],
                                    line: +r[1],
                                    column: +r[2],
                                    func: r[3] || r[4],
                                    args: r[5] ? r[5].split(",") : []
                                }), s && (!s.func && s.line && (s.func = En), s.line && (s.context = null), s.context || (s.context = [o[c + 1]]), u.push(s))
                            }
                            return u.length ? {
                                mode: "stacktrace",
                                name: n.name,
                                message: n.message,
                                stack: u
                            } : null
                        }
                    }(t)) return i
            } catch (n) {}
            try {
                if (i = n(t)) return i
            } catch (n) {}
            try {
                if (i = function(n) {
                        var t = n.message.split("\n");
                        if (t.length < 4) return null;
                        var r, e = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                            i = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                            o = /^\s*Line (\d+) of function script\s*$/i,
                            u = [],
                            c = wn && wn.document && wn.document.getElementsByTagName("script"),
                            s = [];
                        for (var a in c) xn(c, a) && !c[a].src && s.push(c[a]);
                        for (var f = 2; f < t.length; f += 2) {
                            var h = null;
                            (r = e.exec(t[f])) ? h = {
                                url: r[2],
                                func: r[3],
                                args: [],
                                line: +r[1],
                                column: null
                            }: (r = i.exec(t[f])) ? h = {
                                url: r[3],
                                func: r[4],
                                args: [],
                                line: +r[1],
                                column: null
                            } : (r = o.exec(t[f])) && (h = {
                                url: _n().replace(/#.*$/, ""),
                                func: "",
                                args: [],
                                line: r[1],
                                column: null
                            }), h && (h.func || (h.func = En), h.context = [t[f + 1]], u.push(h))
                        }
                        return u.length ? {
                            mode: "multiline",
                            name: n.name,
                            message: t[0],
                            stack: u
                        } : null
                    }(t)) return i
            } catch (n) {}
            try {
                if (i = r(t, e + 1)) return i
            } catch (n) {}
            return {
                original: t,
                name: t.name,
                message: t.message,
                mode: "failed"
            }
        }
        return e.Rn = t, e.Cn = n, e
    }(), gn.On = !0, gn.Tn = 11;
    var Sn = gn.Sn.Dn,
        On = gn.Sn.In,
        kn = gn.Sn.Nn,
        Tn = gn.kn,
        Rn = 50;

    function Dn(n) {
        var t = Nn(n.stack),
            r = {
                type: n.name,
                value: n.message
            };
        return t && t.length && (r.stacktrace = {
            frames: t
        }), void 0 === r.type && "" === r.value && (r.value = "Unrecoverable error caught"), r
    }

    function In(n) {
        return {
            exception: {
                values: [Dn(n)]
            }
        }
    }

    function Nn(n) {
        if (!n || !n.length) return [];
        var t = n,
            r = t[0].func || "",
            e = t[t.length - 1].func || "";
        return (r.includes("captureMessage") || r.includes("captureException")) && (t = t.slice(1)), e.includes("sentryWrapped") && (t = t.slice(0, -1)), t.map(function(n) {
            return {
                colno: n.column,
                filename: n.url || t[0].url,
                function: n.func || "?",
                in_app: !0,
                lineno: n.line
            }
        }).slice(0, Rn).reverse()
    }
    var Cn, An, Ln = function() {
            function n(n) {
                this.options = n, this.h = new M(30), this.url = new sn(this.options.dsn).getStoreEndpointWithUrlEncodedAuth()
            }
            return n.prototype.sendEvent = function(n) {
                throw new a("Transport Class has to implement `sendEvent` method")
            }, n.prototype.close = function(n) {
                return this.h.drain(n)
            }, n
        }(),
        Mn = b(),
        Un = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return r(e, t), e.prototype.sendEvent = function(t) {
                var r = {
                    body: JSON.stringify(t),
                    method: "POST",
                    referrerPolicy: H() ? "origin" : ""
                };
                return this.h.add(Mn.fetch(this.url, r).then(function(t) {
                    return {
                        status: n.Status.fromHttpCode(t.status)
                    }
                }))
            }, e
        }(Ln),
        Fn = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return r(e, t), e.prototype.sendEvent = function(t) {
                var r = this;
                return this.h.add(new Promise(function(e, i) {
                    var o = new XMLHttpRequest;
                    o.onreadystatechange = function() {
                        4 === o.readyState && (200 === o.status && e({
                            status: n.Status.fromHttpCode(o.status)
                        }), i(o))
                    }, o.open("POST", r.url), o.send(JSON.stringify(t))
                }))
            }, e
        }(Ln),
        Pn = Object.freeze({
            BaseTransport: Ln,
            FetchTransport: Un,
            XHRTransport: Fn
        }),
        $n = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return r(e, t), e.prototype.mn = function() {
                if (!this.in.dsn) return t.prototype.mn.call(this);
                var n = this.in.transportOptions ? this.in.transportOptions : {
                    dsn: this.in.dsn
                };
                return this.in.transport ? new this.in.transport(n) : q() ? new Un(n) : new Fn(n)
            }, e.prototype.eventFromException = function(t, r) {
                var e, i, o = this;
                if (h(t) && t.error) return t = t.error, e = In(Tn(t)), W.resolve(this.An(e, r));
                if (l(t) || (i = t, "[object DOMException]" === Object.prototype.toString.call(i))) {
                    var u = t,
                        c = u.name || (l(u) ? "DOMError" : "DOMException"),
                        s = u.message ? c + ": " + u.message : c;
                    return this.eventFromMessage(s, n.Severity.Error, r).then(function(n) {
                        return x(n, s), W.resolve(o.An(n, r))
                    })
                }
                if (f(t)) return e = In(Tn(t)), W.resolve(this.An(e, r));
                if (p(t) && r && r.syntheticException) return x(e = function(n, t) {
                    var r = Object.keys(n).sort(),
                        e = {
                            extra: {
                                __serialized__: I(n)
                            },
                            message: "Non-Error exception captured with keys: " + P(r)
                        };
                    if (t) {
                        var i = Nn(Tn(t).stack);
                        e.stacktrace = {
                            frames: i
                        }
                    }
                    return e
                }(t, r.syntheticException), "Custom Object", void 0, {
                    handled: !0,
                    synthetic: !0,
                    type: "generic"
                }), e.level = n.Severity.Error, W.resolve(this.An(e, r));
                var a = t;
                return this.eventFromMessage(a, void 0, r).then(function(t) {
                    return x(t, "" + a, void 0, {
                        handled: !0,
                        synthetic: !0,
                        type: "generic"
                    }), t.level = n.Severity.Error, W.resolve(o.An(t, r))
                })
            }, e.prototype.An = function(n, t) {
                return u({}, n, {
                    event_id: t && t.event_id
                })
            }, e.prototype.eventFromMessage = function(t, r, e) {
                void 0 === r && (r = n.Severity.Info);
                var i = {
                    event_id: e && e.event_id,
                    level: r,
                    message: t
                };
                if (this.in.attachStacktrace && e && e.syntheticException) {
                    var o = Nn(Tn(e.syntheticException).stack);
                    i.stacktrace = {
                        frames: o
                    }
                }
                return W.resolve(i)
            }, e
        }(dn),
        qn = "sentry.javascript.browser",
        Hn = function(n) {
            function t(t) {
                return void 0 === t && (t = {}), n.call(this, $n, t) || this
            }
            return r(t, n), t.prototype.ln = function(t, r, e) {
                return t.platform = t.platform || "javascript", t.sdk = u({}, t.sdk, {
                    name: qn,
                    packages: s(t.sdk && t.sdk.packages || [], [{
                        name: "npm:@sentry/browser",
                        version: "5.4.0"
                    }]),
                    version: "5.4.0"
                }), n.prototype.ln.call(this, t, r, e)
            }, t.prototype.showReportDialog = function(n) {
                void 0 === n && (n = {});
                var t = b().document;
                if (t)
                    if (this.hn()) {
                        var r = n.dsn || this.getDsn();
                        if (n.eventId)
                            if (r) {
                                var e = t.createElement("script");
                                e.async = !0, e.src = new sn(r).getReportDialogEndpoint(n), n.onLoad && (e.onload = n.onLoad), (t.head || t.body).appendChild(e)
                            } else k.error("Missing `Dsn` option in showReportDialog call");
                        else k.error("Missing `eventId` option in showReportDialog call")
                    } else k.error("Trying to call showReportDialog with Sentry Client is disabled")
            }, t
        }(ln),
        Wn = 1e3,
        Bn = 0;

    function Jn(n, t, r) {
        if (void 0 === t && (t = {}), "function" != typeof n) return n;
        try {
            if (n.__sentry__) return n;
            if (n.__sentry_wrapped__) return n.__sentry_wrapped__
        } catch (t) {
            return n
        }
        var sentryWrapped = function() {
            r && "function" == typeof r && r.apply(this, arguments);
            var e = Array.prototype.slice.call(arguments);
            try {
                var i = e.map(function(n) {
                    return Jn(n, t)
                });
                return n.handleEvent ? n.handleEvent.apply(this, i) : n.apply(this, i)
            } catch (n) {
                throw Bn += 1, setTimeout(function() {
                    Bn -= 1
                }), on(function(r) {
                    r.addEventProcessor(function(n) {
                        var r = u({}, n);
                        return t.mechanism && x(r, void 0, void 0, t.mechanism), r.extra = u({}, r.extra, {
                            arguments: A(e, 3)
                        }), r
                    }), captureException(n)
                }), n
            }
        };
        try {
            for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (sentryWrapped[e] = n[e])
        } catch (n) {}
        n.prototype = n.prototype || {}, sentryWrapped.prototype = n.prototype, Object.defineProperty(n, "__sentry_wrapped__", {
            enumerable: !1,
            value: sentryWrapped
        }), Object.defineProperties(sentryWrapped, {
            __sentry__: {
                enumerable: !1,
                value: !0
            },
            __sentry_original__: {
                enumerable: !1,
                value: n
            }
        });
        try {
            Object.defineProperty(sentryWrapped, "name", {
                get: function() {
                    return n.name
                }
            })
        } catch (n) {}
        return sentryWrapped
    }
    var Xn = 0;

    function Gn(n, t) {
        return void 0 === t && (t = !1),
            function(r) {
                if (Cn = void 0, r && An !== r) {
                    An = r;
                    var e = function() {
                        var t;
                        try {
                            t = r.target ? Vn(r.target) : Vn(r)
                        } catch (n) {
                            t = "<unknown>"
                        }
                        0 !== t.length && Y().addBreadcrumb({
                            category: "ui." + n,
                            message: t
                        }, {
                            event: r,
                            name: n
                        })
                    };
                    Xn && clearTimeout(Xn), t ? Xn = setTimeout(e) : e()
                }
            }
    }

    function zn() {
        return function(n) {
            var t;
            try {
                t = n.target
            } catch (n) {
                return
            }
            var r = t && t.tagName;
            r && ("INPUT" === r || "TEXTAREA" === r || t.isContentEditable) && (Cn || Gn("input")(n), clearTimeout(Cn), Cn = setTimeout(function() {
                Cn = void 0
            }, Wn))
        }
    }

    function Vn(n) {
        for (var t, r = n, e = [], i = 0, o = 0, u = " > ".length; r && i++ < 5 && !("html" === (t = Kn(r)) || i > 1 && o + e.length * u + t.length >= 80);) e.push(t), o += t.length, r = r.parentNode;
        return e.reverse().join(" > ")
    }

    function Kn(n) {
        var t, r, e, i, o, u = [];
        if (!n || !n.tagName) return "";
        if (u.push(n.tagName.toLowerCase()), n.id && u.push("#" + n.id), (t = n.className) && v(t))
            for (r = t.split(/\s+/), o = 0; o < r.length; o++) u.push("." + r[o]);
        var c = ["type", "name", "title", "alt"];
        for (o = 0; o < c.length; o++) e = c[o], (i = n.getAttribute(e)) && u.push("[" + e + '="' + i + '"]');
        return u.join("")
    }
    var Zn = function() {
            function n(t) {
                this.name = n.id, this.in = u({
                    onerror: !0,
                    onunhandledrejection: !0
                }, t)
            }
            return n.prototype.setupOnce = function() {
                Error.stackTraceLimit = 50, Sn(function(t, r, e) {
                    if (!(Bn > 0)) {
                        var i = Y().getIntegration(n);
                        i && Y().captureEvent(i.Ln(t), {
                            data: {
                                stack: t
                            },
                            originalException: e
                        })
                    }
                }), this.in.onerror && (k.log("Global Handler attached: onerror"), On()), this.in.onunhandledrejection && (k.log("Global Handler attached: onunhandledrejection"), kn())
            }, n.prototype.Ln = function(n) {
                if (!v(n.message) && "onunhandledrejection" !== n.mechanism) {
                    var t = n.message;
                    n.message = t.error && v(t.error.message) ? t.error.message : "No error message"
                }
                var r = In(n),
                    e = {
                        mode: n.mode
                    };
                n.message && (e.message = n.message), n.name && (e.name = n.name);
                var i = Y().getClient(),
                    o = i && i.getOptions().maxValueLength || 250;
                return x(r, n.original ? U(JSON.stringify(A(n.original)), o) : "", "onunhandledrejection" === n.mechanism ? "UnhandledRejection" : "Error", {
                    data: e,
                    handled: !1,
                    type: n.mechanism
                }), r
            }, n.id = "GlobalHandlers", n
        }(),
        Qn = function() {
            function n() {
                this.Mn = 0, this.name = n.id
            }
            return n.prototype.Un = function(n) {
                return function() {
                    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    var e = t[0];
                    return t[0] = Jn(e, {
                        mechanism: {
                            data: {
                                function: Yn(n)
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }), n.apply(this, t)
                }
            }, n.prototype.Fn = function(n) {
                return function(t) {
                    return n(Jn(t, {
                        mechanism: {
                            data: {
                                function: "requestAnimationFrame",
                                handler: Yn(n)
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }))
                }
            }, n.prototype.Pn = function(n) {
                var t = b(),
                    r = t[n] && t[n].prototype;
                r && r.hasOwnProperty && r.hasOwnProperty("addEventListener") && (R(r, "addEventListener", function(t) {
                    return function(r, e, i) {
                        try {
                            e.handleEvent = Jn(e.handleEvent.bind(e), {
                                mechanism: {
                                    data: {
                                        function: "handleEvent",
                                        handler: Yn(e),
                                        target: n
                                    },
                                    handled: !0,
                                    type: "instrument"
                                }
                            })
                        } catch (n) {}
                        return t.call(this, r, Jn(e, {
                            mechanism: {
                                data: {
                                    function: "addEventListener",
                                    handler: Yn(e),
                                    target: n
                                },
                                handled: !0,
                                type: "instrument"
                            }
                        }), i)
                    }
                }), R(r, "removeEventListener", function(n) {
                    return function(t, r, e) {
                        var i = r;
                        try {
                            i = i && (i.__sentry_wrapped__ || i)
                        } catch (n) {}
                        return n.call(this, t, i, e)
                    }
                }))
            }, n.prototype.setupOnce = function() {
                this.Mn = this.Mn;
                var n = b();
                R(n, "setTimeout", this.Un.bind(this)), R(n, "setInterval", this.Un.bind(this)), R(n, "requestAnimationFrame", this.Fn.bind(this)), ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"].forEach(this.Pn.bind(this))
            }, n.id = "TryCatch", n
        }();

    function Yn(n) {
        try {
            return n && n.name || "<anonymous>"
        } catch (n) {
            return "<anonymous>"
        }
    }
    var nt, tt = b(),
        rt = function() {
            function t(n) {
                this.name = t.id, this.in = u({
                    console: !0,
                    dom: !0,
                    fetch: !0,
                    history: !0,
                    sentry: !0,
                    xhr: !0
                }, n)
            }
            return t.prototype.$n = function() {
                "console" in tt && ["debug", "info", "warn", "error", "log", "assert"].forEach(function(r) {
                    r in tt.console && R(tt.console, r, function(e) {
                        return function() {
                            for (var i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
                            var u = {
                                category: "console",
                                data: {
                                    extra: {
                                        arguments: A(i, 3)
                                    },
                                    logger: "console"
                                },
                                level: n.Severity.fromString(r),
                                message: F(i, " ")
                            };
                            "assert" === r && !1 === i[0] && (u.message = "Assertion failed: " + (F(i.slice(1), " ") || "console.assert"), u.data.extra.arguments = A(i.slice(1), 3)), t.addBreadcrumb(u, {
                                input: i,
                                level: r
                            }), e && Function.prototype.apply.call(e, tt.console, i)
                        }
                    })
                })
            }, t.prototype.qn = function() {
                "document" in tt && (tt.document.addEventListener("click", Gn("click"), !1), tt.document.addEventListener("keypress", zn(), !1), ["EventTarget", "Node"].forEach(function(n) {
                    var t = tt[n] && tt[n].prototype;
                    t && t.hasOwnProperty && t.hasOwnProperty("addEventListener") && (R(t, "addEventListener", function(n) {
                        return function(t, r, e) {
                            return r && r.handleEvent ? ("click" === t && R(r, "handleEvent", function(n) {
                                return function(t) {
                                    return Gn("click")(t), n.call(this, t)
                                }
                            }), "keypress" === t && R(r, "handleEvent", zn())) : ("click" === t && Gn("click", !0)(this), "keypress" === t && zn()(this)), n.call(this, t, r, e)
                        }
                    }), R(t, "removeEventListener", function(n) {
                        return function(t, r, e) {
                            var i = r;
                            try {
                                i = i && (i.__sentry_wrapped__ || i)
                            } catch (n) {}
                            return n.call(this, t, i, e)
                        }
                    }))
                }))
            }, t.prototype.Hn = function() {
                q() && -1 !== b().fetch.toString().indexOf("native") && R(tt, "fetch", function(r) {
                    return function() {
                        for (var e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
                        var o, u = e[0],
                            c = "GET";
                        "string" == typeof u ? o = u : "Request" in tt && u instanceof Request ? (o = u.url, u.method && (c = u.method)) : o = String(u), e[1] && e[1].method && (c = e[1].method);
                        var s = Y().getClient(),
                            a = s && s.getDsn();
                        if (a) {
                            var f = new sn(a).getStoreEndpoint();
                            if (f && o.includes(f)) return "POST" === c && e[1] && e[1].body && et(e[1].body), r.apply(tt, e)
                        }
                        var h = {
                            method: c,
                            url: o
                        };
                        return r.apply(tt, e).then(function(n) {
                            return h.status_code = n.status, t.addBreadcrumb({
                                category: "fetch",
                                data: h,
                                type: "http"
                            }, {
                                input: e,
                                response: n
                            }), n
                        }).catch(function(r) {
                            throw t.addBreadcrumb({
                                category: "fetch",
                                data: h,
                                level: n.Severity.Error,
                                type: "http"
                            }, {
                                error: r,
                                input: e
                            }), r
                        })
                    }
                })
            }, t.prototype.Wn = function() {
                var n = this;
                if (r = b(), e = r.chrome, i = e && e.app && e.app.runtime, o = "history" in r && !!r.history.pushState && !!r.history.replaceState, !i && o) {
                    var r, e, i, o, u = function(n, r) {
                            var e = g(tt.location.href),
                                i = g(r),
                                o = g(n);
                            o.path || (o = e), nt = r, e.protocol === i.protocol && e.host === i.host && (r = i.relative), e.protocol === o.protocol && e.host === o.host && (n = o.relative), t.addBreadcrumb({
                                category: "navigation",
                                data: {
                                    from: n,
                                    to: r
                                }
                            })
                        },
                        c = tt.onpopstate;
                    tt.onpopstate = function() {
                        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                        var e = tt.location.href;
                        if (u(nt, e), c) return c.apply(n, t)
                    }, R(tt.history, "pushState", s), R(tt.history, "replaceState", s)
                }

                function s(n) {
                    return function() {
                        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                        var e = t.length > 2 ? t[2] : void 0;
                        return e && u(nt, String(e)), n.apply(this, t)
                    }
                }
            }, t.prototype.Bn = function() {
                if ("XMLHttpRequest" in tt) {
                    var n = XMLHttpRequest.prototype;
                    R(n, "open", function(n) {
                        return function() {
                            for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                            var e = t[1];
                            this.__sentry_xhr__ = {
                                method: t[0],
                                url: t[1]
                            };
                            var i = Y().getClient(),
                                o = i && i.getDsn();
                            if (o) {
                                var u = new sn(o).getStoreEndpoint();
                                v(e) && u && e.includes(u) && (this.__sentry_own_request__ = !0)
                            }
                            return n.apply(this, t)
                        }
                    }), R(n, "send", function(n) {
                        return function() {
                            for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
                            var i = this;

                            function o() {
                                if (4 === i.readyState) {
                                    if (i.__sentry_own_request__) return;
                                    try {
                                        i.__sentry_xhr__ && (i.__sentry_xhr__.status_code = i.status)
                                    } catch (n) {}
                                    t.addBreadcrumb({
                                        category: "xhr",
                                        data: i.__sentry_xhr__,
                                        type: "http"
                                    }, {
                                        xhr: i
                                    })
                                }
                            }
                            return i.__sentry_own_request__ && et(r[0]), ["onload", "onerror", "onprogress"].forEach(function(n) {
                                ! function(n, t) {
                                    n in t && "function" == typeof t[n] && R(t, n, function(t) {
                                        return Jn(t, {
                                            mechanism: {
                                                data: {
                                                    function: n,
                                                    handler: t && t.name || "<anonymous>"
                                                },
                                                handled: !0,
                                                type: "instrument"
                                            }
                                        })
                                    })
                                }(n, i)
                            }), "onreadystatechange" in i && "function" == typeof i.onreadystatechange ? R(i, "onreadystatechange", function(n) {
                                return Jn(n, {
                                    mechanism: {
                                        data: {
                                            function: "onreadystatechange",
                                            handler: n && n.name || "<anonymous>"
                                        },
                                        handled: !0,
                                        type: "instrument"
                                    }
                                }, o)
                            }) : i.onreadystatechange = o, n.apply(this, r)
                        }
                    })
                }
            }, t.addBreadcrumb = function(n, r) {
                Y().getIntegration(t) && Y().addBreadcrumb(n, r)
            }, t.prototype.setupOnce = function() {
                this.in.console && this.$n(), this.in.dom && this.qn(), this.in.xhr && this.Bn(), this.in.fetch && this.Hn(), this.in.history && this.Wn()
            }, t.id = "Breadcrumbs", t
        }();

    function et(t) {
        try {
            var r = JSON.parse(t);
            rt.addBreadcrumb({
                category: "sentry",
                event_id: r.event_id,
                level: r.level || n.Severity.fromString("error"),
                message: E(r)
            }, {
                event: r
            })
        } catch (n) {
            k.error("Error while adding sentry type breadcrumb")
        }
    }
    var it = "cause",
        ot = 5,
        ut = function() {
            function n(t) {
                void 0 === t && (t = {}), this.name = n.id, this.Jn = t.key || it, this.s = t.limit || ot
            }
            return n.prototype.setupOnce = function() {
                z(function(t, r) {
                    var e = Y().getIntegration(n);
                    return e ? e.Xn(t, r) : t
                })
            }, n.prototype.Xn = function(n, t) {
                if (!(n.exception && n.exception.values && t && t.originalException instanceof Error)) return n;
                var r = this.Gn(t.originalException, this.Jn);
                return n.exception.values = s(r, n.exception.values), n
            }, n.prototype.Gn = function(n, t, r) {
                if (void 0 === r && (r = []), !(n[t] instanceof Error) || r.length + 1 >= this.s) return r;
                var e = Dn(Tn(n[t]));
                return this.Gn(n[t], t, s([e], r))
            }, n.id = "LinkedErrors", n
        }(),
        ct = b(),
        st = function() {
            function n() {
                this.name = n.id
            }
            return n.prototype.setupOnce = function() {
                z(function(t) {
                    if (Y().getIntegration(n)) {
                        if (!ct.navigator || !ct.location) return t;
                        var r = t.request || {};
                        return r.url = r.url || ct.location.href, r.headers = r.headers || {}, r.headers["User-Agent"] = ct.navigator.userAgent, u({}, t, {
                            request: r
                        })
                    }
                    return t
                })
            }, n.id = "UserAgent", n
        }(),
        at = Object.freeze({
            GlobalHandlers: Zn,
            TryCatch: Qn,
            Breadcrumbs: rt,
            LinkedErrors: ut,
            UserAgent: st
        }),
        ft = [new yn, new pn, new Qn, new rt, new Zn, new ut, new st];
    var ht = {},
        lt = b();
    lt.Sentry && lt.Sentry.Integrations && (ht = lt.Sentry.Integrations);
    var vt = u({}, ht, bn, at);
    return n.BrowserClient = Hn, n.Hub = K, n.Integrations = vt, n.SDK_NAME = qn, n.SDK_VERSION = "5.4.0", n.Scope = X, n.Transports = Pn, n.addBreadcrumb = function(n) {
        en("addBreadcrumb", n)
    }, n.addGlobalEventProcessor = z, n.captureEvent = function(n) {
        return en("captureEvent", n)
    }, n.captureException = captureException, n.captureMessage = function(n, t) {
        var r;
        try {
            throw new Error(n)
        } catch (n) {
            r = n
        }
        return en("captureMessage", n, t, {
            originalException: n,
            syntheticException: r
        })
    }, n.close = function(n) {
        var t = Y().getClient();
        return t ? t.close(n) : Promise.reject(!1)
    }, n.configureScope = function(n) {
        en("configureScope", n)
    }, n.defaultIntegrations = ft, n.flush = function(n) {
        var t = Y().getClient();
        return t ? t.flush(n) : Promise.reject(!1)
    }, n.forceLoad = function() {}, n.getCurrentHub = Y, n.getHubFromCarrier = tn, n.init = function(n) {
        void 0 === n && (n = {}), void 0 === n.defaultIntegrations && (n.defaultIntegrations = ft),
            function(n, t) {
                !0 === t.debug && k.enable(), Y().bindClient(new n(t))
            }(Hn, n)
    }, n.lastEventId = function() {
        return Y().lastEventId()
    }, n.onLoad = function(n) {
        n()
    }, n.setContext = function(n, t) {
        en("setContext", n, t)
    }, n.setExtra = function(n, t) {
        en("setExtra", n, t)
    }, n.setExtras = function(n) {
        en("setExtras", n)
    }, n.setTag = function(n, t) {
        en("setTag", n, t)
    }, n.setTags = function(n) {
        en("setTags", n)
    }, n.setUser = function(n) {
        en("setUser", n)
    }, n.showReportDialog = function(n) {
        void 0 === n && (n = {}), n.eventId || (n.eventId = Y().lastEventId());
        var t = Y().getClient();
        t && t.showReportDialog(n)
    }, n.withScope = on, n.wrap = function(n) {
        Jn(n)()
    }, n
}({});
//# sourceMappingURL=bundle.min.js.map