/**
 * @swagger
 * components:
 *   schemas:
 *     Package:
 *       type: object
 *       required:
 *         - All Fields
 *       properties:
 *         sender:
 *           type: ID
 *           description: sender id
 *         title:
 *           type: string
 *           description: package title
 *         packageGroup:
 *           type: ID
 *           description: id of package group that this package belong to
 *         description:
 *           type : String
 *           description : package description
 *         packagedetails :
 *           type : ID
 *           description : package details id
 *         receiver:
 *           type : String
 *           description : receiver informations
 *         amout :
 *            type : number
 *            description : total package price
 *         isFragile:
 *            type: boolean,
 *            description : does the package fragile true / false
 *         needsCollect :
 *            type : String
 *            description : does the package needs collector true / false
 *         collectorId :
 *              type : ID
 *              description : package collector id
 *         dimentions:
 *            type : Object
 *            description : package dimentions
 */

/**
 * @swagger
 * tags:
 *   name: package_Schema
 *   description: package schema API EndPoints
 *
 */

/**
 * @swagger
 * /api/v1/package/addOne/Package:
 *    post:
 *      summary : add one package
 *      tags : [Package]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   $ref : '#/components/schemas/Package'
 *      responses :
 *           200:
 *             description : Package has been added to our system
 */

/**
 * @swagger
 * /api/v1/delivery/addMany/Package :
 *    get:
 *      summary : add many packages once
 *      tags : [Package]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   $ref : '#/components/schemas/Package'
 *      responses :
 *           200:
 *             description : packages has been aded successfully
 */

/**
 * @swagger
 * /api/v1/delivery/getAll/Package :
 *    get:
 *      summary : get Authenticated delivery zones
 *      tags : [Package]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description : all packages has been returned successfully
 */

/**
 * @swagger
 * /api/v1/delivery/getOne/Package/:packageId:
 *    get:
 *      summary : get package and packages information by id
 *      tags : [Package]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description : package has been returned successfully
 */

/**
 * @swagger
 * /api/v1/delivery/getUser/package/:userId :
 *    get:
 *      summary : get a user own packages
 *      tags : [Package]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description :  package has beeen returned successfully
 */

/**
 * @swagger
 * /api/v1/package/update/package/:packageId :
 *    patch:
 *      summary : update package information ans status
 *      tags : [Package]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description :  Package has been updated
 */

/**
 * @swagger
 * /api/v1/package/findpackageRoute :
 *    get:
 *      summary : find package routes
 *      tags : [Delivery_Zones]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description :  find route of a package
 */

/**
 * @swagger
 * /api/v1/package/find/Delivery/packages/:deliveryId :
 *    patch:
 *      summary : find a delivery zone packages
 *      tags : [Package]
 *      requestBody :
 *          required : false
 *      responses :
 *           200:
 *             description :  packages has been returned successfully
 */
