import ViewModel from './ViewModel.js';
let DataModel = function (data) {
    let views = function (views) {
        let array = [];
        for (const view of views) {
            array.push(new ViewModel(view));
        }
        return array;
    }
    this.count = data.count;
    this.uniques = data.uniques;
    this.views = views(data.views);
}
export default DataModel;
