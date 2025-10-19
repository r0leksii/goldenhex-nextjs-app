i think wee need tor rewrite this very difficult code i think we not need to creat e custom api. rewrite all code for fetch ctaaegories, webproducts and productbyid. thats all what i need. for now in this code we write custom api, because for security and combine requests. i see thats no need. what you think?

https://api.eposnowhq.com/docs/apis/product/#/Categories/get_api_v4_catalogue_Categories
https://api.eposnowhq.com/docs/apis/product/#/Category/get_api_v4_Category
https://api.eposnowhq.com/docs/apis/product/#/Category/get_api_v4_Category__id_
https://api.eposnowhq.com/docs/apis/product/#/Category/get_api_v4_Category_List

https://api.eposnowhq.com/docs/apis/product/#/Product/get_api_v4_Product
https://api.eposnowhq.com/docs/apis/product/#/Product/get_api_v4_Product_WebProducts
https://api.eposnowhq.com/docs/apis/product/#/Product/get_api_v4_Product_WebProducts_Count
https://api.eposnowhq.com/docs/apis/product/#/Product/get_api_v4_Product__id_
https://api.eposnowhq.com/docs/apis/product/#/Product/get_api_v4_Product_List
https://api.eposnowhq.com/docs/apis/product/#/Product/get_api_v4_Product__productId__availability
https://api.eposnowhq.com/docs/apis/product/#/ProductImage/get_api_v4_ProductImage
https://api.eposnowhq.com/docs/apis/product/#/ProductImage/get_api_v4_ProductImage__id_

https://api.eposnowhq.com/docs/apis/product/#/Products/get_api_v4_catalogue_Products
https://api.eposnowhq.com/docs/apis/product/#/Products/get_api_v5_catalogue_products
https://api.eposnowhq.com/docs/apis/product/#/Products/get_api_v4_catalogue_Products__id_

https://api.eposnowhq.com/docs/apis/product/#/Categories/get_api_v4_catalogue_Categories

https://api.eposnowhq.com/docs/apis/stock/#/ProductStock/get_api_v4_ProductStock_Product__productId_

what my goal.
1. minimize api requsts, because srvice for api can give 5000 requsts per day. and i need to reset api limits. thats horrible.
2. i want to see only oon front page products with webprocts=true. this i use api webproducts. and in this api i see have stock inormation, image, title, description, and other info. about products. i use parametre for page and limits per page. see file schema.type.ts
3. and when i click on product title i need to see info about product. like a title, description, stock info,and other info.
4. that need to be securibably because for api they use Basic key. 
5. that app need to be with good perfomance and not dificult. 
6. in future wil realize like a shop. but for now this app, need obnly get products and show on the pages.


Do you understand what I need?
Please provide your recommendations, proposals, and suggestions. Create planning!
Ask me clarifying questions before implementing this solution.