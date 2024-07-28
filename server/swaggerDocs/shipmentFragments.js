/**
 * @swagger
 * components:
 *   schemas:
 *     shipment_fragment:
 *       type: object
 *       required:
 *         - All Fields
 *       properties:
 *         shipmentId:
 *           type: ID
 *           description: shipmentId id
 *         fromCity:
 *           type: ID
 *           description: City Origin
 *         toCity:
 *           type: ID
 *           description: City Destination
 *         ChosedTarrif:
 *           type : ID
 *           description : Tarrif ID
 *         currentstatus :
 *           type : ID
 *           description : currentstatus Id of this Shipment fragment
 *         hasNext :
 *           type : ID
 *           description : does this fragment  hasNext fragment
 *         hasPrevious :
 *           type : ID
 *           description : does this fragment  hasPrevious fragment
 */

/**
 * @swagger
 * tags:
 *   name: shipment_fragments
 *   description: shipment_fragments schema API EndPoints
 *
 */
