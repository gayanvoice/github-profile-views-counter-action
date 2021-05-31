const View = require('../cache/ViewModel');
let CacheFileModel =  function (status, response) {
    let getViewsArray = function (views) {
        let views_array = [];
        for (const view of views) {
            views_array.push(new View(view));
        }
        return views_array;
    }
    this.status = status;
    if (status) this.views = getViewsArray(response);
}
module.exports = CacheFileModel;