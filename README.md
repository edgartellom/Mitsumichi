# Los-Lobos-Del-Javascript (Mitsumichi app)

<ul><h3>Create local DB: </h3>
<li><code>psql -U DB_USER</code> (postgres)</li>
<li>Input your DB_PASSWORD</li>
<li><code>CREATE DATABASE mitsumichi;</code></li>
</ul>
<hr/>

<ul><h3>Create .env file in /api & add variables as following : </h3>
<li>DB_USER=#input your DB_USER</li>
<li>DB_PASSWORD=#input your DB_PASSWORD</li>
<li>DB_HOST=localhost</li>
<li>PORT=3001</li>
<li>DB_DEPLOY=</li>

</ul>
<hr/>

<ul><h3>Create .env file in /client & add variables as following : </h3>
<li>VITE_APP_API=</li>

</ul>
<hr/>

<ul><h3>Install dependencies & run from /api (backend) :</h3>
<li><code>cd api</code><br></li>
<li><code>npm i</code></li>
<li><code>npm start</code></li>
</ul>
<hr/>

<ul><h3>Install dependencies & run from /client (frontend) :</h3>
<li><code>cd client</code><br></li>
<li><code>npm i</code></li>
<li><code>npm run dev</code></li>
Run production build (/client/dist):
<li><code>npm run build</code></li>
</ul>
<hr/>
