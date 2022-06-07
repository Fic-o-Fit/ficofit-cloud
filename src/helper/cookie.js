const getCookieEmail = function getCookie(req) {
  let headerCookie = req.headers.cookie;
  headerCookie = headerCookie.split("; ");
  let decodeCookies = decodeURIComponent(headerCookie[1]);
  return decodeCookies.slice(13);
};

module.exports = { getCookieEmail };
