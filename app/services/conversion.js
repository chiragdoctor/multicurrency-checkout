
module.exports = function(ngModule) {

  var dataUrl = 'http://apilayer.net/api/live?access_key=0978b5df440844908f7c3e081f7495bf&currencies=GBP,USD,AUD,CAD,PLN,MXN&format=1'

  if (ON_TEST) {
    require('./conversion.test')(ngModule);
  }


  function serializeQuotes(response){
    console.log('response', response)
    if(response.success){
          var quotes = response.quotes;
          for( var quote in quotes) {
            var newKey = quote.substr(response.source.length);
            quotes[newKey] = quotes[quote];
            delete quotes[quote];
          }
          console.info(quotes);
          return quotes;
        }
        else
          return new Error('No Data Found!!');
  }

  
  function getExchangeRate($http){
      return $http.get(dataUrl);
    };


    return {
      getExchangeRate: getExchangeRate,
      serializeQuotes: serializeQuotes
    }
};