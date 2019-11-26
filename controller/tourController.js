const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// 2. HANDLE ROUTE
// ---------TOUR---------

exports.checkId = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`)
    if (req.params.id * 1 > tours.length - 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'The tour with the given ID was not found.'
        })
    }
    next();
};
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    };
    next();
}
exports.getAllTour = (req, res) => {
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
exports.getTour = (req, res) => {
    // let tour;
    // tours.forEach(element => {
    //     if (element.id == id) {
    //         tour = element
    //         return
    //     }

    // });
    const id = req.params.id * 1;
    const tour = tours.find(rs => rs.id === parseInt(id));

    // if (id * 1 > tours.length - 1) {
    //     return res.status(404).json({ status: "failed", msg: "The tour with the given ID was not found." })
    // }

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
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Updated tour here'
    })
}
exports.deleteTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: null
    })
};