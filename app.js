const express = require('express');

const fs = require('fs');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// 1. FIRST MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json())

app.use((req, res, next) => {
    console.log("Say hello. I'm middleware.");
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
// convert json biến tours thành 1 đối tượng trong javascript
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// 2. HANDLE ROUTE
const getAllTour = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        result: tours.length,
        data: {
            tours
        }
    })
}
const getTour = (req, res) => {
    const id = req.params.id;
    // let tour;
    // tours.forEach(element => {
    //     if (element.id == id) {
    //         tour = element
    //         return
    //     }

    // });
    const tour = tours.find(rs => rs.id === parseInt(id));

    if (id * 1 > tours.length - 1) {
        return res.status(404).json({ status: "failed", msg: "The tour with the given ID was not found." })
    }

    // if (!tour) {
    //     res.status(404).json({
    //         status: 'failed',
    //         msg: 'The tour with the given ID was not found.'
    //     })
    // }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}
const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        // convert 1 đối tượng javascript thành chuỗi json
        JSON.stringify(tours),
        err => {
            if (err) {
                console.log("Lỗi: " + err);
            }
            res.status(201).json({
                status: 'success',
                result: tours.length,
                data: {
                    tours: newTour
                }
            })
        })
}
const updateTour = (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length - 1) {
        res.status(404).json({
            status: 'failed',
            message: 'Ivailed ID'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'Updated tour here'
    })
}
const deleteTour = (req, res) => {
        const id = req.params.id * 1;
        if (id > tours.length - 1) {
            res.status(404).json({
                status: 'fail',
                message: 'Ivalied ID'
            })
        }
        res.status(200).json({
            status: 'success',
            data: null
        })
    }
    // app.get('/api/v1/tours', getAllTour);
    // app.get('/api/v1/tours/:id', getTour);
    // app.post('/api/v1/tours', createTour)

// PATCH cập nhật 1 thành phần, thuộc tính của Resource
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTE
app
    .route('/api/v1/tours')
    .get(getAllTour)
    .post(createTour);
app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .delete(deleteTour)
    .patch(updateTour);

// 4) START SERVER
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));