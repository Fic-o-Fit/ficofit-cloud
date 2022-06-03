const getCookieEmail = function getCookie(req) {
  let headerCookie = req.headers.cookie;
  headerCookie = headerCookie.split("; ");
  let decodeCookies = decodeURIComponent(headerCookie[0]);
  return decodeCookies.slice(13);
};

module.exports = { getCookieEmail };
