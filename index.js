const express = require('express')
const app = express()
const port = 3000
app.use(express.static('lib'));
app.use(express.static('node_modules/bootstrap/dist/css'))
app.use(express.static('node_modules/bootstrap/dist/js'))
const formidable = require('formidable');
const fs = require('fs');

app.get('/', (req, res) => {
    res.sendFile('index.html', err => {
        err ? console.log(`error loading index.html ${err}`) : console.log('sent index.html');
    });
});

app.get('/posts', (req, res) => {
    // Why does Express expect the path to be absolute here when it doesn't seem to mind the call to index.html above?
    res.sendFile(`${__dirname}/lib/posts.json`, err => {
        err ? console.log(err) : console.log('sent posts');
    })
});

app.post('/submit', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        err ? console.log(`form parse error: ${err}`) : console.log(`raw form content ${fields}`);
        fs.readFile(`${__dirname}/lib/posts.json`, (err, allPosts) => {
            err ? console.log('error reading posts.json') : console.log('read all posts');
            allPosts = JSON.parse(allPosts);
            fields.img = fields.img || `stooges.jpg`
            allPosts.push(fields);
            fs.writeFile(`${__dirname}/lib/posts.json`, JSON.stringify(allPosts), error => {
                error ? console.log(`error writing to posts.json ${error}`) : console.log(`wrote to posts.json`)
            });
        })
    });
    res.sendFile(`${__dirname}/lib/index.html`, err => {
        err ? console.log(`error sending file after writing posts ${err}`) : console.log('sent posts');
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))