import express from 'express';
import Category from '../models/Category';
import Item from '../models/Item';

const categoryRouter = express.Router();

categoryRouter
    .get( '/', ( req, res ) => {
        Category.find( {} ).sort( { name: 1 } ).exec( ( err, categories ) => {
            res.json( { categories } );
        });
    })

categoryRouter
    .get( '/all', ( req, res ) => {
        Category.find( {} ).sort( { name: 1 } ).exec( ( err, categories ) => {
            Item.find( {}, ( err, items ) => {
                res.json( { items, categories } );
            });
        });
    })

categoryRouter
    .route('/:categoryId')
    .get((req, res) => {
        const { categoryId } = req.params;
        Category.findById( categoryId, (err, category) => {
            Item.find( { category: categoryId }, ( err, items ) => {
                res.json( { items, categories: [ category ] } );
            });
        });
    });

categoryRouter.route( '/new' )
    .post( ( req, res ) => {
        const category = new Category( req.body );
        category.save();
        res.status( 201 ).send( category );
    })

// @TODO this will need to delete child items and notes too
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


categoryRouter
    .route( '/:categoryId/items' )
    .get( ( req, res ) => {
        const { categoryId } = req.params;
        Item.find( { category: categoryId }, ( err, items ) => {
            res.json( { items } );
        });
    });

export default categoryRouter;