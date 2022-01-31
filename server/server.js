const { Op } = require("sequelize");
const cors=require('cors')
const path = require('path')
require('dotenv').config();
const express = require("express");
const app = express();
app.use(cors())

const PORT = 5000;

//Heroku
// app.use(express.static(path.join(__dirname,'../gui/build')))
// const PORT = process.env.PORT


const sequelize = require('./sequelize.js')

const Movie = require('./models/movie');
const CrewMember = require('./models/crewMember');

Movie.hasMany(CrewMember, { as: "CrewMembers", foreignKey: "movieId" });
// CrewMember.belongsTo(Movie);

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


app.get('/create', async (req, res, next) => {
    try{
        await sequelize.sync({force: true});
        res.status(201).json({message: "created tables"})
    }
    catch (error) {
        next(error);
    }
})

app.get('/movies', async (req, res, next) => {
    try {
        const movies = await Movie.findAll()
        res.status(200).json(movies)
    } catch (error) {
        next(error)
    }
})

app.post('/movies', async (req, res, next) => {
    try {
        await Movie.create(req.body)
        res.status(201).json({message: "movie created"});
    } catch (error) {
        next(error)
    }
})

app.put('/movies/:mid', async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if(movie)
        {
            await movie.update(req.body, { fields: ['title', 'category', 'publicationDate'] })
            res.status(200).json({message: "movie updated"});
        }
        else{
            res.status(404).json({message: "movie doesn't exist"})
        }
    } catch (error) {
        next(error)
    }
})

app.delete('/movies/:mid', async (req, res, next) => {
    try {
        const movie = Movie.findByPk(req.params.mid)
        if(movie)
        {
            await (await movie).destroy(req.body)
            res.status(200).json({message: "movie deleted"});
        }
        else{
            res.status(404).json({message: "movie doesn't exist"})
        }
    } catch (error) {
        next(error)
    }
})

app.get('/movies/:mid/crewmembers', async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            const crewMembers = await movie.getCrewMembers()
            res.status(200).json(crewMembers)
        }
        else{
            res.status(404).json({message: "movie doesn't exist"})
        }
    } catch (error) {
        next(error)
    }
})

app.post('/movies/:mid/crewmembers', async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if(movie)
        {
            const crewMember = req.body
            crewMember.movieId = movie.id
            await CrewMember.create(crewMember);
            res.status(201).json({message: "crew member created"});
        }
        else{
            res.status(404).json({message: "movie doesn't exist"})
        }
    } catch (error) {
        next(error)
    }
})

app.put('/movies/:mid/crewmembers/:cid', async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if(movie)
        {
            const crewMember = await movie.getCrewMembers({where: { id: req.params.cid }})
            if(crewMember){
                await crewMember[0].update(req.body, { fields: ['name', 'role'] })
                res.status(200).json({message: "updated crew member"})
            } else {
                res.status(404).json({message: "crew member doesn't exist"})
            }
        }
        else{
            res.status(404).json({message: "movie doesn't exist"})
        }
    } catch (error) {
        next(error)
    }
})

app.delete('/movies/:mid/crewmembers/:cid', async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if(movie)
        {
            const crewMember = await movie.getCrewMembers({where: { id: req.params.cid }})
            if(crewMember){
                await crewMember[0].destroy()
                res.status(200).json({message: "deleted crew member"})
            } else {
                res.status(404).json({message: "crew member doesn't exist"})
            }
        }
        else{
            res.status(404).json({message: "movie doesn't exist"})
        }
    } catch (error) {
        next(error)
    }
})

// app.get('/movies/filterBefore', async (req, res, next) => {
//     try {
//         const cat =  req.query.category
//         const date = req.query.publicationDate
//         const movies = await Movie.findAll({where: {
//             title: cat,
//             publicationDate: {
//                 [Op.lt]: date
//             }
//         }})
//         res.status(200).json(movies)
//     } catch (error) {
//         next(error)
//     }
// })

app.get('/movies/filterAfter', async (req, res, next) => {
    try {
        const cat =  req.query.category
        const date = req.query.publicationDate
        const movies = await Movie.findAll({where: {
            category: cat,
            publicationDate: {
                [Op.gt]: date
            }
        }})
        res.status(200).json(movies)
    } catch (error) {
        next(error)
    }
})

app.get('/movies/:mid/crewmembers/sort', async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if(movie)
        {
            const crewMembers = await movie.getCrewMembers();
            crewMembers.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            })
            res.status(200).json(crewMembers);
        }
        else{
            res.status(404).json({message: "movie doesn't exist"})
        }
    } catch (error) {
        next(error)
    }
})

app.get('/movies/pagination', async (req, res, next) => {
    try {
        const movies = await Movie.findAndCountAll({
            limit: 5,
            offset: req.query.offset
        })
        res.status(200).json(movies.rows)
    } catch (error) {
        next(error)
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../gui/build/index.html'));
  });

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({message: 'error occured'});
})

app.listen(PORT, async () => {
    console.log("The server is running on http://localhost:" + PORT);
    await sequelize.sync({force: true});
})