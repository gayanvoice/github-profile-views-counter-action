let ViewModel = function (view) {
    this.timestamp = new Date(view.timestamp);
    this.count = view.count;
    this.uniques = view.uniques;
}
module.exports = ViewModel;