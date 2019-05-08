export default {
  clearDe (ar) {
    console.log(this)
    return [...new Set(ar)]
  }
}
