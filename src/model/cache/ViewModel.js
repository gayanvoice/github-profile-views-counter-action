let ViewModel = function (view) {
    let getDate = function (timestamp) {
        return new Date(timestamp);
    }
    this.timestamp = getDate(view.timestamp);
    this.count = view.count;
    this.uniques = view.uniques;
}
module.exports = ViewModel;