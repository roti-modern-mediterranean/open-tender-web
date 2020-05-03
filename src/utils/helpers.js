// https://gist.github.com/mathewbyrne/1280286
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace('_', '-') // replace _ with -
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export const serialize = (obj) => {
  var str = []
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  return str.join('&')
}

export const capitalize = (s) => {
  if (!s || !s.length) return ''
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export const cleanPhone = (phone) => {
  if (!phone) return ''
  let p = phone.replace(/\D/g, '')
  if (p.length > 11) return phone
  p = p.length === 11 && p[0] === '1' ? p.slice(1, 11) : p
  p =
    p.length === 10 ? `${p.slice(0, 3)}-${p.slice(3, 6)}-${p.slice(6, 10)}` : p
  return p
}
