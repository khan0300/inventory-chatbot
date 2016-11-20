var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: {type: String, es_indexed:true},
  description: String,
  price: String,
  msrp: String,
  stock: Number
},
{
  strict: false
});

// var elasticsearch = require('elasticsearch');
// var esClient = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace'
// });

// productSchema.plugin(mongoosastic, {
// 	esClient: esClient
// });

productSchema.plugin(require('mongoose-simple-random'));

module.exports = mongoose.model('Product', productSchema);;