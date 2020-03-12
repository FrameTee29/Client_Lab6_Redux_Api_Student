let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [
    {
        'sid': 6035512080,
        'firstname': 'Teeraphat',
        'lastname': 'Sittinantakul',
        'weight': 168,
        'height': 63,
        'level':'Junior',
        'img': 'https://scontent.fbkk5-7.fna.fbcdn.net/v/t31.0-8/s960x960/23593791_1528829547170370_6602402212661050632_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=LAtlxHDIPTAAX80YlBZ&_nc_ht=scontent.fbkk5-7.fna&_nc_tp=7&oh=b63dadbacc1f100e6173a7202f1e972e&oe=5E8DC7E0'
    },
    {
        'sid': 6035512000,
        'firstname': 'Frame',
        'lastname': 'Teeraphat',
        'weight': 168,
        'height': 63,
        'level':'Junior',
        'img': 'https://scontent.fbkk5-7.fna.fbcdn.net/v/t31.0-8/s960x960/23593791_1528829547170370_6602402212661050632_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=LAtlxHDIPTAAX80YlBZ&_nc_ht=scontent.fbkk5-7.fna&_nc_tp=7&oh=b63dadbacc1f100e6173a7202f1e972e&oe=5E8DC7E0'
    },

];

router.route('/students')
    // get all students
    .get((req, res) => res.json(students))
    // insert a new student
    .post((req, res) => {
        var student = {};
        student.sid = req.body.sid;
        student.firstname = req.body.firstname;
        student.lastname = req.body.lastname;
        student.weight = req.body.weight;
        student.height = req.body.height;
        student.level = req.body.level;
        student.img = req.body.img;
        students.push(student);
        res.json({ message: 'Student created!' })
    })

router.route('/students/:sid')
    .get((req, res) => {
        let sid = req.params.sid
        let index = students.findIndex(student => (student.sid=== +sid))
        res.json(students[index])                   // get a student
    })
    .put((req, res) => {                               // Update a student
        let sid = req.params.sid
        let index = students.findIndex(student => (student.sid=== +sid))
        students[index].sid = req.body.sid;
        students[index].firstname = req.body.firstname;
        students[index].lastname = req.body.lastname;
        students[index].weight = req.body.weight;
        students[index].height = req.body.height;
        students[index].level = req.body.level;
        students[index].img = req.body.img;
        res.json({ message: 'Student updated!' + req.params.sid });
    })
    .delete((req, res) => {                   // Delete a student
        let sid = req.params.sid
        let index = students.findIndex(student => (student.sid=== +sid))
        students.splice(index, 1)
        res.json({ message: 'student deleted: ' + req.params.sid });
    })


app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, () => console.log("Server is running"));