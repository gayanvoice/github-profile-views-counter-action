const ConfigDataModel = require('../../model/config/ConfigDataModel');
let ConfigFileModel = function (status, file) {
    this.status = status;
    if (status) this.data = new ConfigDataModel(file);
}
module.exports = ConfigFileModel;