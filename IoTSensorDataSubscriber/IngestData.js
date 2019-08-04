const {BigQuery} = require('@google-cloud/bigquery');
const projectId = 'horizontal-time-237307'; //'lucky-wall-233606';
const datasetId = 'IoTTrafficDataset';
const tableId = 'IoTTrafficDatatable';

var ingestStreamingData = function(objMsg){

    const options = {
        projectId: projectId,
        keyFilename: 'horizontal-time-237307-0d32086dde7a.json' //'lucky-wall-233606-931ddbfa7309.json'
    };

    const bigqueryClient = new BigQuery(options);

    if(objMsg && objMsg.MsgData){
        bigqueryClient
        .dataset(datasetId)
        .table(tableId)
        .insert(objMsg);
        return objMsg.MsgData;
    }
    else{
        return null;
    }    
}

module.exports = {
    ingestStreamingData
};