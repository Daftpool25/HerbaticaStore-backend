const { YOUR_DOMAIN } = require('../utils/config');
const { info } = require('../utils/loggers');
const productsRoute = require('./products');

const stripe = require('stripe')('sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y');



productsRoute.post('/create-checkout-session', async (req, res) => {
    //info("inside")
    //info(req.body)

    const productsList=req.body;
    let array=[]

    productsList.map( item => 
            array.push({
            price_data: {
                currency: 'usd',
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price*100,
              },
              quantity: item.quanty,
            })
    )
    //info(array)

    const session = await stripe.checkout.sessions.create({
      line_items: array,
      mode: 'payment',

      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    info(session)
    res.send({url: session.url});
  });

