import express from 'express';
import Note from '../models/Note';

const notesRouter = express.Router();

notesRouter
    .get('/', (req,res) => {
        Note.find({}).sort({created: 'desc'}).exec((err, notes) => {
            res.json(notes)
        });
    })

notesRouter.route('/new')
    .post((req, res) => {
        const note = new Note(req.body);
        note.save();
        res.status(201).send(note);
    })

notesRouter.route('/delete')
    .post((req, res) => {
        const { id } = req.body;

        Note.findById(id, (err, note) => {
            note.remove(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('Removed')
                }
            })
        })
    })

export default notesRouter;