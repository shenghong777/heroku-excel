const express = require('express');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();



//Handlebars Middleware

app.engine('handlebars', exphbs({defayultLayout:'main'}));
app.set('view engine', 'handlebars');

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/views`));

//Index Route
app.get('/', (req,res) => {
    res.render('index', {
        stripePublishableKey: keys.stripePublishableKey
    });
});

//app.get('/success', (req,res) => {
//    res.render('success');
//})

//Charge Route
app.post('/charge', (req, res) => {
    const amount= 2500;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Excel Ebook',
        currency: 'myr',
        customer:customer.id
    }))
    .then(charge => res.render ('success'));
 });

//invoice
/*stripe.invoiceItems.create({
    customer: 'cus_4fdAW5ftNQow1a',
    amount: 2500,
    currency: 'myr',
    description: 'One-time setup fee',
  }, function(err, invoiceItem) {
    // asynchronously called
    stripe.invoices.create({
      customer: 'cus_4fdAW5ftNQow1a',
      auto_advance: true, // auto-finalize this draft after ~1 hour
    }, function(err, invoice) {
      // asynchronously called
    });
  });
*/
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
