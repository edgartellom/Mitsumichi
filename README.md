# MITSUMICHI APP

<h4>by Los Lobos del Javascript</h4>

<ul><h3>Create local PostreSQL DB (mitsumichi): </h3>
<li><code>psql -U DB_USER</code> (postgres)</li>
<li>Input your DB_PASSWORD</li>
<li><code>CREATE DATABASE mitsumichi;</code></li>
</ul>
<hr/>

<ul><h3>Create .env file in api folder & add variables as following : </h3>
<h4>Ask for empty variables to us! </h4>
<li>DB_USER=[YOUR_DB_USER]</li>
<li>DB_PASSWORD=[YOUR_DB_PASSWORD]</li>
<li>DB_HOST=localhost</li>
<li>PORT=3001</li>
<li>DB_DEPLOY=</li> 
<li>SENDGRID_API_KEY=</li>
</ul>
<hr/>

<ul><h3>Create .env file in client folder & add variables as following : </h3>
<h4>Ask for empty variables to us! </h4>
<li>VITE_REACT_APP_URL_BACKEND=</li>
<li>VITE_REACT_APP_CLOUDINARY_CLOUD_NAME=</li>
<li>VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET=mitsumichi</li>
</ul>
<hr/>

<ul><h3>Install dependencies & run from api folder (backend) :</h3>
<li><code>cd api</code><br></li>
<li><code>npm i</code></li>
<li><code>npm start</code></li>
</ul>
<hr/>

<ul><h3>Install dependencies & run from client folder (frontend) :</h3>
<li><code>cd client</code><br></li>
<li><code>npm i</code></li>
<li><code>npm run dev</code></li>
Run production build (client/dist):
<li><code>npm run build</code></li>
</ul>
<hr/>
