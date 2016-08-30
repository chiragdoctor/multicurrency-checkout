# PAY-APP
This app will calculate the price of the basket in multiple currencies. Currenrcy conversion takes palce on the file amount.
Default currency is £. All the prices of the goods added to the basket are computed in £. 

# App Structure
* This app is constructed based on the data provided in the test. We can add more item to the /data/items.json file and will 
be available for ordering.

* There are 3 main directives used in these app <item-list />, <basket />, <checkout />.

* Item list is responsible for rendering items or products to be sold. basket is responsible for rendering added items and 
removing items from the basket. checkout is responsible to get the latest exchange rates and calculating amount based on exchange
rate and total amount of the basket.

# Start PAY-APP
``` npm run start ```
* This will start the app and then simply go to [http://localhost:8080/](http://localhost:8080/) you will be able to buy items.

# Run tests
``` npm run start ```

#Assumption
* As we are no usig the paid version of the http://jsonrates.com, so the souce currency is always USD. Fist we need to convert 
available quotes to GBP based quotes. Formula used is

``` USDQuote = (USDQuote /  GBPQuote) ```
* We will apply this formula on the retrived quotes. 

