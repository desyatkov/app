const tagParsed = str => {
  return str.replace( /(@.+?\b)/gi, "<span class='tag'>$1</span>" ) 
}

export default tagParsed;