import express from 'express';
import Category from '../models/Category';

const categoryRouter = express.Router();

categoryRouter
    .get( '/', ( req,res ) => {
        Category.find( {} ).sort( { name: 1 } ).exec( ( err, categories ) => {
            res.json( categories );
        });
    })

categoryRouter.route( '/new' )
    .post( ( req, res ) => {
        const category = new Category( req.body );
        category.save();
        res.status( 201 ).send( category );
    })

categoryRouter.route( '/delete' )
    .post( ( req, res ) => {
        const { id } = req.body;

        Category.findById( id, ( err, category ) => {
            category.remove(err => {
                if( err ){
                    res.status( 500 ).send( err );
                }
                else{
                    res.status( 204 ).send( 'Removed' );
                }
            });
        });
    })

export default categoryRouter;