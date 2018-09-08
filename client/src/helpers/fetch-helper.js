class FetchHelper {
  static get (url) {
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(ex => reject(ex))
    })
  }

  static resolve (path) {
    return 'http://localhost:3000/' + path
  }
}

export default FetchHelper