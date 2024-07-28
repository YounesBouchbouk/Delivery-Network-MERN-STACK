/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       required:
 *         - All Fields
 *       properties:
 *         name:
 *           type: ID
 *           description: Country name
 *         twoLetter:
 *           type: ID
 *           description: Country Two letters name Maroc == MA , Canada == CA
 *         added_by:
 *           type: ID
 *           description: Admin ID that has added this Country
 */

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: Cities API EndPoints
 *
 */

/**
 * @swagger
 * /api/v1/cityandcountry/get/country/all:
 *    get:
 *      summary : get All cities
 *      tags : [Countries]
 *      responses :
 *           200:
 *             description : Countries list returned successfully
 */

/**
 * @swagger
 * /api/v1/cityandcountry/add/Countries:
 *    post:
 *      summary : add New country
 *      tags : [Countries]
 *      requestBody :
 *          required : true
 *          content :
 *            application/json :
 *                schema :
 *                   $ref : '#/components/schemas/Countries'
 *      responses :
 *           200:
 *             description : Country has been added to our system
 */

/**
 * @swagger
 * /api/v1/cityandcountry/get/country/:id:
 *    get:
 *      summary : get Country by his ID
 *      tags : [Countries]
 *      responses :
 *           200:
 *             description : Country has returned successfully
 *           400:
 *              description : Cointry not found
 */

/**
 * @swagger
 * /api/v1/cityandcountry/remove/country/:id:
 *    delete:
 *      summary : delete Country by his ID
 *      tags : [Countries]
 *      requestBody :
 *          required : true
 *      responses :
 *           200:
 *             description : Country has been deleted successfully
 *           400:
 *              description : Country not found
 */
