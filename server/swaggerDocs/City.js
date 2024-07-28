/**
 * @swagger
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       required:
 *         - All Fields
 *       properties:
 *         name:
 *           type: ID
 *           description: City name 
 *         in_country:
 *           type: ID
 *           description: Country ID 
 *         added_by:
 *           type: ID
 *           description: Admin ID that has added this city

 
 */

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: Cities API EndPoints
 *
 */

/**
 * @swagger
 * /api/v1/cityandcountry/get/city/all:
 *    get:
 *      summary : get All cities
 *      tags : [Cities]
 *      responses :
 *           200:
 *             description : cities list returned successfully
 */

/**
 * @swagger
 * /api/v1/cityandcountry/add/city:
 *    post:
 *      summary : add New city
 *      tags : [Cities]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   $ref : '#/components/schemas/Cities'
 *      responses :
 *           200:
 *             description : city has been added to our system
 */

/**
 * @swagger
 * /api/v1/cityandcountry/get/city/:id:
 *    get:
 *      summary : get City by his ID
 *      tags : [Cities]
 *      responses :
 *           200:
 *             description : city has returned successfully
 *           400:
 *              description : city not found
 */

/**
 * @swagger
 * /api/v1/cityandcountry/remove/city/:id:
 *    delete:
 *      summary : delete City by his ID
 *      tags : [Cities]
 *      requestBody :
 *          required : true
 *      responses :
 *           200:
 *             description : city has been deleted successfully
 *           400:
 *              description : city not found
 */
