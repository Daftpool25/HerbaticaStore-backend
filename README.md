![herbatica backend](https://user-images.githubusercontent.com/111264354/213885296-2b0b6b94-ba64-4c7f-9c60-98b1e1936716.png)

# HerbaticaStore-backend
Plants web Store (API -Backend)

Herbatica is a garden plants web store, built with a React.js frontend, Express Node.Js backend and a MySQL database. It allows the registration of users and that they can buy and sell their plants, performing a CRUD on the elements of the database (products and users).

It allows credit card purchases through Stripe, adding plants to the cart, even creating and editing your own products, so that they can be sold on the platform. Allows the ordering and search of products.

The backend was made with Nodejs and a MySql database, it's deployed for the operation of the frontend hosted on Netlify, but the url to the API server will not be shared.

## Deployed in: https://cerulean-rugelach-a0ee7f.netlify.app/


## INFORMATION:

![1](https://user-images.githubusercontent.com/111264354/213885550-01c0b894-619b-47aa-931d-254c3e0cc857.png)

In the "mysql" folder you will find the commands to establish your local databases, you must create with MyPHPAdmin or MYSQL workbench a local database, called "herbatica" and then use the commands to create the "users table" and "items" tables " (use all the commands except the ones that start with DROP, they delete the created table)

![2](https://user-images.githubusercontent.com/111264354/213885788-362d24a0-0e23-4c66-ad27-229ce4b1b316.png)

Then in the config.js file change the environment variables SECRET (enter a random string) , YOUR_DOMAIN (enter your localhost:3000) and HOST_DB
DATABASE
  USER:
  PASSWORD

with the corresponding data from the newly created database.

## QUICK START:

<ul>
  <li> Clone repository</li>
  <li> Create a local database and change the variables, as specified above.</li>
    <li> Run the next commands in the file root:</li>
    <li>     npm install</li>
    <li>     nodemon index.js</li>
    <li>open http://localhost:2000/ in your browser</li>
</ul>


## Technologies:

<ul>
  <li>Node.js</li>
  <li>Express.js</li>
   <li>MySql</li>
    <li>JWT</li>


</ul>


