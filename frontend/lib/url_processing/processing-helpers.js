module.exports = {
  generateUrl(context) {
    const { name, mark, model, category } = context.query;
    const params = { name, mark, model, category };
    let url = "http://localhost:3000/v1/search?";
    for (let propName in params) {
      if (params[propName] !== undefined) {
        url += propName + "=" + params[propName];
      }
    }
    return url;
  },
};
