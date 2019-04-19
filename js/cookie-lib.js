let BrowserCookieManager = {
    setCookie: (name, val) => {
        document.cookie = name + "=" + val +
            ";expires=Fri, 31 Dec 9999 23:59:59 UTC;";
        return true;
    },
    getAllCookies: () => {
        return document.cookie.split(";");
    },
    getCookie: function (name) {
        for (const el of this.getAllCookies()) {
            if (el.trim().startsWith(name + "=")) {
                return el.split("=")[1];
            }
        }
        return undefined;
    },
    deleteCookie: (name) => {
        for (const el of this.getAllCookies()) {
            if (el.trim().startsWith(name + "=")) {
                document.cookie = el.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                return true;
            }
        }
        return undefined;
    },
    deleteAllCookies: function () {
        for (const el of this.getAllCookies()) {
            document.cookie = el.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        }
    }
};
