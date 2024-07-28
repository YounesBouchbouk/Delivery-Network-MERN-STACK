/**
 * @swagger
 * components:
 *   schemas:
 *     Delivery_Zones:
 *       type: object
 *       required:
 *         - All Fields
 *       properties:
 *         delivery_service:
 *           type: ID
 *           description: delivery_service id
 *         from:
 *           type: ID
 *           description: City Origin
 *         to:
 *           type: ID
 *           description: City Destination
 *         estimated_days:
 *           type : number
 *           description : Zone estimated_days
 *         fees :
 *           type : ID
 *           description : Zone fees
 
 */

/**
 * @swagger
 * tags:
 *   name: Delivery_Zones
 *   description: Zones API EndPoints
 *
 */

/**
 * @swagger
 * /api/v1/delivery/getOne/service/deliveryZone/:idService:
 *    get:
 *      summary : get delivery zone by id
 *      tags : [Delivery_Zones]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   $ref : '#/components/schemas/Delivery_Zones'
 *      responses :
 *           200:
 *             description : city has been added to our system
 */

/**
 * @swagger
 * /api/v1/delivery/add/deliveryZone:
 *    post:
 *      summary : add new deliveryZones
 *      tags : [Delivery_Zones]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   $ref : '#/components/schemas/Delivery_Zones'
 *      responses :
 *           200:
 *             description : delivery zones has been added to our system
 */

/**
 * @swagger
 * /api/v1/delivery/getAll/deliveryZone :
 *    get:
 *      summary : get All  deliveryZones
 *      tags : [Delivery_Zones]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description : delivery zones has been added to our system
 */

/**
 * @swagger
 * /api/v1/delivery/getAuth/deliveryZone :
 *    get:
 *      summary : get Authenticated delivery zones
 *      tags : [Delivery_Zones]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description : delivery zone has been returned successfully
 */

/**
 * @swagger
 * /api/v1/delivery/getDelivery/deliveryZone/:userId :
 *    get:
 *      summary : return delivery zone of a delivery system (id is the id of the delivery services)
 *      tags : [Delivery_Zones]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description : Info returned successfully
 */

/**
 * @swagger
 * /api/v1/delivery/remove/deliveryZone/:id :
 *    delete:
 *      summary : remove delivery_Zone by ID
 *      tags : [Delivery_Zones]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description :  deivery Zone has been removed
 */

/**
 * @swagger
 * /api/v1/delivery/addWorkingDays :
 *    patch:
 *      summary : add workingDays of a delivery service
 *      tags : [Delivery_Zones]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description :  working days has been aded successfully
 */

/**
 * @swagger
 * /api/v1/delivery/updatephone :
 *    patch:
 *      summary : update phone number of a delivery zone
 *      tags : [Delivery_Zones]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description :  phones has been added successfully
 */

/**
 * @swagger
 * /api/v1/complete/infomation :
 *    patch:
 *      summary : coplete delivery zone information
 *      tags : [Delivery_Zones]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description :  info has been comploted successfully
 */
