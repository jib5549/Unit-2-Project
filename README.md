<h1 style="font-size: 45px">Hello 👋 and welcome to my second project in GA : Cartify - Shopping Cart API</h1>
<h2 style="font-style: italic; font-size: 30px">Prerequisites:</h2>

<ul>
  <li><a href="https://nodejs.org/en/">Node.js</a> : Ensure that you have Node.js installed on your machine. You can download it from the official Node.js website and follow the installation instructions for your operating system.</li>
  <li><a href="https://www.npmjs.com/package/nodemon">nodemon</a> : It is recommended to have nodemon installed globally to automatically restart the server during development. If you don't have nodemon installed globally, follow the command below to install it:</li>
</ul>

<pre><code>npm install -g nodemon</code></pre>

<h2 style="font-style: italic; font-size: 30px">Getting Started:</h2>

   <ol>
    <li>Before we start cloning, we have to decide where we want to clone the API to. To help you better understand, I will create a new directory with 'mkdir clone' and that will generate a brand new directory. </br>
    <img src="https://i.imgur.com/fPoXqI3.png"> </br>
    Then, cd (change directory) into it by 'cd clone' so we are in the correct location for cloning.
    <img src="https://i.imgur.com/pmXA521.png"> </br>
    To check if you are in the right location type 'pwd' and it will tell you where you currently are. Since we are in the location where we want to be we are ready to clone!</li>
    <img src="https://i.imgur.com/sru6zJb.png"> </br>
    <li>You can simply clone the repository by obtaining the SSH code. If you click on the provided <a href="https://github.com/jib5549/Unit-2-Project">link</a> it will directly lead you to my Github website where my repository is but for your convenience I have provided SSH code below. You can find the SSH code by clicking on the green button. <img src="https://i.imgur.com/tbsIS3Y.png"></br>
   </br>
    <img src="https://i.imgur.com/txX7k7G.png"> </br>
    For time sake, I have provided the exact line so just copy and paste this on your terminal like so : <pre><code>git clone git@github.com:jib5549/Unit-2-Project.git</code></pre> </li>
    <img src="https://i.imgur.com/iZ13nKl.png">
    <li>To make sure and to check if the cloning process was successful, you can simply type this in your terminal to check and it should show you 'Unit-2-Project/' just like the image provided below:</br>
    <img src="https://i.imgur.com/A0ndrzx.png">
    <li>Then, we want to cd into the folder called, "Unit-2-Project" Like so.</li>
    <img src="https://i.imgur.com/W13XOif.png">
    <li>Once you are in the right path, type <code>npm i</code> and it will install all dependencies from a package.json file. It does take a couple of seconds so please be patient.</li>
    <img src="https://i.imgur.com/eHqXEUm.png.png">
    <li>After cloning, open the file in your VS Code by typing this in your terminal and it will directly open your VS Code with the project : </br>
    <img src="https://i.imgur.com/VifnVv3.png">
    <li>Create a new file by typing this in the vs code terminal : <code>touch .env</code> </li>
    <li>In the '.env' file, make sure to change your mongodb uri in order to connect with your database correctly :
<pre><code>MONGO_URI=mongodb://your-mongodb-uri</code></pre>

<p>Replace <code>mongodb://your-mongodb-uri</code> with your actual MongoDB cluster and this can be found in your MongoDB account.</p>
</ol>
<h2 style="font-style: italic; font-size: 30px">Starting the app :</h2>

<p>To start the project, run the following command and I will be providing images for clarity :</p>

<pre><code>npm run start</code></pre>
<img src="https://i.imgur.com/rO4PqLH.png">

<p>The application should now be running and you will know if the connection was successful when you get this prompt in your console.</p>
<pre><code>Ayo the port at 3000 is lit!
Connected to MongoDB</code></pre>
<p><code>Ayo the port at 3000 is lit!</code> is signaling that the application is listening on PORT 3000.</p>
<p><code>Connected to MongoDB</code> is signaling that it successfully connected to the MongoDB database.</p>
<h2 style="font-style: italic; font-size: 30px">API with Postman :</h2>

<ol>
    <li>Postman is an API Platform for developers to design, build, test, and iterate their APIs.</li>
    <li>Click the <a href="https://www.postman.com/downloads/?utm_source=postman-home">link</a> to be directed to their homepage. Sign up for an account if you don't already have one. I would recommend <a href="https://www.postman.com/downloads/?utm_source=postman-home">downloading</a> the app for user convenience.</li>
    <li>After finishing the setup, open up the app and let the fun begin!</li>
    <li>Head over to the <code>Overview</code> tab and click on <code>+</code> to create a new workspace and you should get something similar to the image below.</li>
    <img src="https://i.imgur.com/DQqjSuI.png">
    </br>
</ol>
<h2 style="font-style: italic; font-size: 30px">Creating a User :</h2>
<ol>
    <li>After doing so, we can now start creating a user but there is one small edit that we have to do to our Postman app before we can start.</li>
    <li>We first need to type in <code>localhost:3000/users</code> where it specifies <code>Enter URL or paste text</code> </li>
    <li>Change the request from <code>GET</code> to a <code>POST</code> , <code>Params</code> to <code>Body</code> , <code>none</code> to <code>raw</code> , and finally click on the blue <code>Text ↓ </code> which will give you a dropdown and click on <code>JSON</code>. Last thing before we make a user is creating our body. Copy the code below or if you want a different body feel free to change it up but all of these <strong>MUST</strong> have the same format! 
    <pre><code>{
    "name": "Bob",
    "password": "password",
    "email": "bobby@gmail.com"
}</code></pre> 
    If that was confusing, please look at the image below for clarity. </li>
    <img src="https://i.imgur.com/DQfuNDE.png">
    <li>Then press <code>Send</code> and watch the magic happen before your eyes! Congrats ✨you have created your first user!</li>
    <img src="https://i.imgur.com/KjBNFO2.png">
    <li>Now you might be wondering why you are getting so much more information than you have originally put in. Let me clear up that part for you. The password we provided in the request body, <code>"password"</code> , has been securely hashed by the server before being stored in the database. It's for security purposes so in this case we want our response to be hashed instead of plaintext. Next, <code>"_id"</code> is the unique identifier for this specific user so it's essential. The <code>"loggedIn"</code> part is <code>false</code> because we haven't logged in yet but soon we will see that change to <code>true</code> once we login. Last but not least, the token is commonly used for authentication and authorization purposes in web applications. It allows the server to verify the identity of the user and provide access to protected resources or perform certain actions on behalf of the user without requiring the user to constantly login with every request.</li>
    <li>With all that said, now let's log in! For this part, all we need to do is add the word <em>login</em> behind our original URL. Like this! <code>localhost:3000/users/login</code> and press <code>Send</code>. You should now be logged in and your response should look something like this. You can see how <code>"loggedIn"</code> is <code>true</code> now! People with keen eye sight probably have noticed the change but you get a new token after you log in and you have to use that one to authorize yourself. </li>
    <img src="https://i.imgur.com/xRSN41W.png">
    <li><em>Note: your token and mine are going to be different because this is also unique! <strong>Save the token after you log in because we will need it for the next step.</em></strong></li>
</ol>
<h2 style="font-style: italic; font-size: 30px">Creating a Cart :</h2>
<ol>
<li>Now, we are going to create a cart but before doing so we have to make a few adjusts again. </li>
<li>Next to the <code>Body</code> tab, to your left, there should be an <code>Authorization</code> tab. Click it and by default it should be <code>Inherit auth from par...</code> but we need to change that to <code>Bearer Token</code> and paste the copied token from earlier. Like so.</li>
<img src="https://i.imgur.com/ZNcFO9m.png">
<li>Just from that step, we are now considered an authorized user until we log out because we logged in and took that token that was generated and pasted it into the <code>Bearer Token</code> field.</li>
<li>Now, all we need to do is change the URL to this <code>localhost:3000/cart</code> and press <code>Send</code>. You will now have created a user and a cart that is specifically associated with that user! In the image below, you can see that the <code>"user"</code> is the same as the <code>"_id"</code> because it's connected to each other and the <code>"_id"</code> in the cart is the unique identifier for this specific cart that's automatically generated from MongoDB.</li>
<img src="https://i.imgur.com/ulFA6UC.png">
</ol>

<h2 style="font-style: italic; font-size: 30px">Creating an Item :</h2>
<ol>
<li>I have specifically made my API that once an item is created it automatically gets added to the cart. Since, only one user can be logged in at a time there was no reason for me to add additional functions.</li>
<li>To make an item, it's similar to creating a user. So first, we have change the URL to this <code>localhost:3000/items</code> , add a body to it, and press <code>Send</code>. You will now have created an item and at the same time, added that item inside the cart. Copy the code below or if you want a different body feel free to change it up but all of these <strong>MUST</strong> have the same format!</li>
<pre><code>{
    "name": "Pen",
    "price": 4.99,
    "description": "write better",
    "quantity": 10
}</code></pre>
<img src="https://i.imgur.com/NTJgHks.png">
<li>Once again, we get sent back with more data. Let's break it down. The first object in this array is showing us the <code>"item"</code> array with the body that we initially entered and a specific <code>"_id"</code> that associated only with this item. The second object is just showing us what was added along with the total number of items and the total price and the <code>"user"</code> should be the same as the <code>"_id"</code> in your users.</li>
<li>Now, I'm sure you are curious to know if all of these are really connected or not so I'm going to show you at it is! If you change your URL to <code>localhost:3000/users</code> and change your request from <code>POST</code> to <code>GET</code> you will see that your user has a cart and within that cart your item. 👍</li>
<img src="https://i.imgur.com/x7yJV0s.png">
<li>But let's say due to Covid, things have slowed down and the prices of your item went up just like how we saw huge inflation in the past year or two. Then, we need to change the price of our item and I will show you how to do that. First, we must get back to our <code>localhost:3000/items</code> and do a <code>GET</code> request and you will get back your item <strong>AND</strong> an <code>"_id"</code>. Copy that weird looking string and paste it behind your URL and change it to a <code>PUT</code> request! Then, change whatever you want in the body like me and press <code>Send</code>. I'm going to change the price of my item from $4.99 to $10.99, description, and the quantity from 10 to 3. Follow the image if you get lost.</li>
<img src="https://i.imgur.com/lfVgrdU.png">
<img src="https://i.imgur.com/hbXLo43.png">
<li>Last but not least, you can also delete an item and the concept is the same for all. Copy and paste the specific <code>"_id"</code> behind the URL and change the request to <code>DELETE</code> and press <code>Send</code>.</li>
<li></li>
<img src="https://i.imgur.com/hbmGdRk.png.png">
<li></li>After you click <code>Send</code> , you will see that it's gone and nothing gets returned that's because it's no longer in the database!
<img src="https://i.imgur.com/m1bvCMk.png.png">
<li>Now to double check if it's really gone or not, just do a simple <code>GET</code> request with your plain <code>localhost:3000/items</code> and you will see that there are no items.</li>
<img src="https://i.imgur.com/1AdW7qa.png.png">
</ol>

<h2 style="font-style: italic; font-size: 30px">Diagram:</h2>
<p>This diagram shows the attributes of each model and the associations between the models. Each model has a primary key, you can locate it by looking for the key icon, which are specific to each of its own identity and with that you can connect with other models through a unique key. It's important to understand the relationships between the entities. In this scenario, we can see that each user can have multiple carts and a cart can have multiple items.</p>


</br>
  <img src="https://i.imgur.com/irj13H6.png">

<h2 style="font-style: italic; font-size: 30px">Wireframes:</h2>
<p>Below are wireframes for the project. I drew out how I would want my website to look like. I have made comments on each image so feel free to read over them to get a better grasp on what I'm picturing.</p>
<p>Here is a <a href="https://trello.com/b/aPW5qGWn/unit-2-project">link</a> to my Trello for my API.</p>


</br>
<h2 style="font-style: italic; font-size: 30px">Home page</h2>

  <img src="https://i.imgur.com/0T279KR.png">
</br>
</br>
  <h2 style="font-style: italic; font-size: 30px">Cart page</h2>

  <img src="https://i.imgur.com/p6E2eoy.png">
</br>
</br>
  <h2 style="font-style: italic; font-size: 30px">Item page</h2>

  <img src="https://i.imgur.com/jlEn5Tn.png">


