require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");



mongoose.connect(process.env.DATABASE_URI)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());
app.use(cors());
app.set("port", process.env.PORT || 1150);


// API routes
app.get("/", (req, res, next) => {
    res.send({
      message: "Welcome to Ecommerce Api",

      user_routes: {
        user_register: {
          method: "product",
          route: "/users",
          request_body: {
            name: "String",
            email: "String",
            contact: "String",
            password: "String",
          },
          result: {
            jwt: "String token",
          },
        },
        user_login: {
          method: "PATCH",
          route: "/users",
          request_body: {
            email: "String",
            password: "String",
          },
          result: {
            jwt: "String token",
          },
        },
        all_users: {
          method: "GET",
          route: "/users",
          result: {
            users: "Array",
          },
        },
        single_user: {
          method: "GET",
          route: "/users/:id",
          result: {
            user: "Object",
          },
        },
        update_user: {
          method: "PUT",
          request_body: {
            name: "String",
            email: "String",
            contact: "String",
            password: "String",
            avatar: "String",
            img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
          },
          route: "/users/:id",
          result: {
            user: "Object",
          },
        },
        delete_user: {
          method: "DELETE",
          route: "/users/:id",
          result: {
            message: "Object",
          },
        },
      },
      product_routes: {
        all_products: {
          method: "GET",
          route: "/products",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          result: {
            posts: "Array",
          },
        },
        single_product: {
          method: "GET",
          route: "/products/:id",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          result: {
            post: "Object",
          },
        },
        create_product: {
          method: "POST",
          route: "/products/",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          request_body: {
            title: "String",
            body: "String",
            img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
          },
          result: {
            product: "Object",
          },
        },
        update_product: {
          method: "PUT",
          route: "/products/:id",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          request_body: {
            title: "String *optional*",
            body: "String *optional*",
            img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
          },
          result: {
            product: "Object",
          },
        },
        delete_product: {
          method: "DELETE",
          route: "/products/:id",
          result: {
            message: "Object",
          },
        },
      },
      cart_routes:{
        all_cart_items: {
          method: "GET",
          route: "/users/:id/cart",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          result: {
            cart: "Array",
          },
        },
        delete_cart_item:{
          method: "DELETE",
          route: "/users/:id/cart",
          result: {
            message: "Object",
          },
        },
        update_cart:{
          method: "PUT",
          route: "/users/:id/cart",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          request_body: {
            title: "String *optional*",
            body: "String *optional*",
            img: "String *optional* (Must be hosted image. I can suggest to host on product Image)",
          },
          result: {
            cart: "Object",
          },
        },
      },


    //   order_routes:{
    //     all_order_items: {
    //       method: "GET",
    //       route: "/users/:id/order",
    //       headers: {
    //         authorization: "Bearer (JWT token)",
    //       },
    //       result: {
    //         order: "Array",
    //       },
    //     },
    //     delete_order_item:{
    //       method: "DELETE",
    //       route: "/users/:id/order",
    //       result: {
    //         message: "Object",
    //       },
    //     },
    //     update_order:{
    //       method: "PUT",
    //       route: "/users/:id/order",
    //       headers: {
    //         authorization: "Bearer (JWT token)",
    //       },
    //       request_body: {
    //         title: "String *optional*",
    //         body: "String *optional*",
    //         img: "String *optional* (Must be hosted image. I can suggest to host on product Image)",
    //       },
    //       result: {
    //         order: "Object",
    //       },
    //     },
    //   },


     
  ////////////////



    })
  });
  app.use("/users", userRouter);
  app.use("/products", productRouter);
  app.use("/carts", cartRouter);
  



app.listen(app.get("port"), (server) => {
    console.info(`Server listen on port ${app.get("port")}`);
    console.info("Press CTRL + C to close the server");
})