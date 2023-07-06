<h1 style="font-size: 36px">Hello 👋 and welcome to my second project in GA : Cartify - Shopping Cart API</h1>
<div style="font-size: 30px">Prerequisites:</div>
<hr>
<ul>
  <li><a href="https://nodejs.org/en/">Node.js</a> : Ensure that you have Node.js installed on your machine. You can download it from the official Node.js website and follow the installation instructions for your operating system.</li>
  <li><a href="https://www.npmjs.com/package/nodemon">nodemon</a> : It is recommended to have nodemon installed globally to automatically restart the server during development. If you don't have nodemon installed globally, follow the command below to install it:</li>
</ul>

<pre><code>npm install -g nodemon</code></pre>

<div style="font-size: 30px">Getting Started:</div>
<hr>
   <ol>
    <li>Before we start cloning, we have to decide where we want to clone the API to. To help you better understand, I will create a new directory with 'mkdir clone' and that will generate a brand new directory. Then, cd (change directory) into it by 'cd clone' so we are in the correct location for cloning. Finally, we are ready to clone!</li>
    <img src="https://i.imgur.com/fPoXqI3.png"> </br>
    <img src="https://i.imgur.com/vwE0AOX.png">
    <li>Then, you can simply clone the <a href="https://github.com/jib5549/Unit-2-Project">repository</a> by obtaining the SSH code. For time sake, I have provided the exact line so just copy and paste this on your terminal : <pre><code>git clone git@github.com:jib5549/Unit-2-Project.git</code></pre> </li>
    <img src="https://i.imgur.com/iZ13nKl.png">
    <li>To make sure and to check if the cloning process was successful, you can simply type this in your terminal to check and it should show you 'Unit-2-Project/' just like the image provided below:
    <pre><code>ls</code></pre></li>
    <img src="https://i.imgur.com/A0ndrzx.png">
    <li>After cloning, open the file in your VS Code by typing this in your terminal and it will directly open your VS Code with the project :
    <pre><code>code .</code></pre></li>
    <li>Now, the first thing to install after cloning is <code>npm i</code> which will install all dependencies from a package.json file. </li>
    <li>Create a new file by typing this in the vs code terminal : <code>touch .env</code> </li>
    <li>In the '.env' file, make sure to change your mongodb uri in order to connect with your database correctly :
<pre><code>MONGO_URI=mongodb://your-mongodb-uri</code></pre>

<p>Replace <code>mongodb://your-mongodb-uri</code> with your actual MongoDB cluster and this can be found in your MongoDB account.</p>

<div style="font-size: 30px">Running the app:</div>
<hr>
<p>To start the project, run the following command:</p>

<pre><code>npm start</code></pre>

<p>The application should now be running on <code>http://localhost:3000</code>.</p>

<div style="font-size: 30px">Diagram:</div>
<hr>
<p>This diagram shows the attributes of each model and the associations between the models. Each model has a primary key, you can locate it by looking for the key icon, which are specific to each of its own identity and with that you can connect with other models through a unique key. It's important to understand the relationships between the entities. In this scenario, we can see that each user can have multiple carts and a cart can have multiple items.</p>


</br>
  <img src="https://i.imgur.com/irj13H6.png">

<div style="font-size: 30px">Wireframes:</div>
<hr>
<p>Below are wireframes for the project. I drew out how I would want my website to look like. I have made comments on each image so feel free to read over them to get a better grasp on what I'm picturing.</p>

</br>
<h3 style="font-size: 30px">Home page</h3>
<hr>
  <img src="https://i.imgur.com/0T279KR.png">
</br>
</br>
  <h3 style="font-size: 30px">Cart page</h3>
  <hr>
  <img src="https://i.imgur.com/p6E2eoy.png">
</br>
</br>
  <h3 style="font-size: 30px">Item page</h3>
  <hr>
  <img src="https://i.imgur.com/jlEn5Tn.png">


