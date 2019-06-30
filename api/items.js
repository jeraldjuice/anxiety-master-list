import express from 'express';
import moment from 'moment';
import Item from '../models/Item';

const itemRouter = express.Router();

itemRouter
    .get( '/', ( req, res ) => {
        Item.find( {} ).sort( { name: 1 } ).exec( ( err, items ) => {
            res.json( { items } );
        });
    })

itemRouter
    .post( '/new', ( req, res ) => {
        const item = new Item( req.body );

        item.save()
            .then( savedItem => {
                res.status( 201 ).send( { items: [ savedItem ] } );
            });
    })

itemRouter
    .route( '/:itemId' )
    .get( ( req, res ) => {
        const { itemId } = req.params;
        Item.findById( itemId, ( err, item ) => {
            if ( err ){
                return res.status( 500 ).send( err );
            }

            res.json( { items: [ item ] } );
        } );
    })
    // @TODO this def needs more validations
    .post( ( req, res ) => {
        const { itemId } = req.params;

        Item.findById( itemId, ( err, item ) => {
            if( err ){
                return res.status( 500 ).send( err );
            }

            const { name, description, icon, blockedBy, category, status } = req.body;

            if ( name ) {
                item.name = name;
            }

            if ( description ) {
                item.description = description;
            }

            if ( icon ) {
                item.icon = icon;
            }

            if ( blockedBy ) {
                item.blockedBy = blockedBy;
            }

            if ( category ) {
                item.category = category;
            }

            if ( status ) {
                if ( status === 'completed' ) {
                    item.lastCompleted = Date.now();

                    // Updated the due date based on the repeat data
                    if ( item.status.repeatEntity !== 'none' ) {
                        item.status.due = moment( item.status.due ).add( item.status.multiplier || 1, item.status.repeatEntity );
                    } else { // Otherwise, we remove the due date
                        item.status.due = null;
                    }
                } else if ( status === 'delete' ) {
                    item.status.due = null;
                    item.status.repeatEntity = 'none';
                    item.status.multiplier = 1;

                // Otherwise, we're just updating the data
                } else {
                    const { due, repeatEntity, multiplier } = status;

                    if ( due ) {
                        item.status.due = due;
                    }
    
                    if ( repeatEntity ) {
                        item.status.repeatEntity = repeatEntity;
                    }
    
                    if ( multiplier ) {
                        item.status.multiplier = multiplier;
                    }
                }
            }

            item.save()
                .then( savedItem => {
                    res.status( 201 ).send( { items: [ savedItem ] } );
                } );
        });
    })

// @TODO this needs to delete all notes attached to this item, and check if this item is "blocking" anything, because it iwll need to be removed too
itemRouter.route( '/delete' )
    .post( ( req, res ) => {
        const { id } = req.body;

        Item.findById( id, ( err, item ) => {
            item.remove(err => {
                if( err ){
                    res.status( 500 ).send( err );
                }
                else{
                    res.status( 204 ).send( 'Removed' );
                }
            });
        });
    })

export default itemRouter;